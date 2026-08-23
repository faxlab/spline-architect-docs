<#
.SYNOPSIS
  Check incoming captures against the shot list before they are wired into pages.

.DESCRIPTION
  Run with no arguments to report every expected capture: present, missing, or over budget.
  Run with -Watch to re-check every few seconds while recording, so the next drop-in is
  confirmed without leaving the editor.

  Stills:  .png in static/img/screens, expected 1968x1020 (editor) or 1920x1040 (graph);
           tight UI crops are exempt from the size check.
  Clips:   .mp4 in static/img/clips, under 3 MB, with a matching .png poster beside them.

.EXAMPLE
  .\scripts\capture-intake.ps1
  .\scripts\capture-intake.ps1 -Watch
#>
param([switch]$Watch)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$root = Split-Path -Parent $PSScriptRoot
$screens = Join-Path $root 'static\img\screens'
$clips   = Join-Path $root 'static\img\clips'
$clipBudgetMB = 3.0

# id, kind, file, expected size ('editor' | 'graph' | 'crop' | $null for clips), page
$expected = @(
  @{ id='S1';  kind='still'; file='overview-sacity.png';          size='editor'; page='getting-started/overview' },
  @{ id='S2';  kind='still'; file='architect-mode.png';           size='editor'; page='getting-started/architect-mode-fundamentals' },
  @{ id='S3';  kind='still'; file='first-building-stack.png';     size='editor'; page='getting-started/first-building' },
  @{ id='S4';  kind='still'; file='wall-details.png';             size='editor'; page='core-actors/wall' },
  @{ id='S5';  kind='still'; file='streets-network.png';          size='editor'; page='core-actors/streets-network' },
  @{ id='S6';  kind='still'; file='lot-surface-layers.png';       size='editor'; page='core-actors/streets-network' },
  @{ id='S7';  kind='still'; file='streets-segment-override.png'; size='editor'; page='core-actors/streets-network' },
  @{ id='S8';  kind='still'; file='boolean-cut.png';              size='editor'; page='core-actors/boolean' },
  @{ id='S9';  kind='still'; file='preset-library.png';           size='editor'; page='authoring/preset-library' },
  @{ id='S10'; kind='still'; file='subdivide-panel.png';          size='crop';   page='authoring/architect-mode' },
  @{ id='S11'; kind='still'; file='height-mode-compare.png';      size='editor'; page='authoring/wall-presets' },
  @{ id='S12'; kind='still'; file='architect-grid-strip.png';     size='crop';   page='authoring/architect-mode' },
  @{ id='S13'; kind='still'; file='baked-output.png';             size='editor'; page='production/baking' },
  @{ id='S14'; kind='still'; file='diagnostics.png';              size='crop';   page='production/baking' },
  @{ id='S15'; kind='still'; file='pcg-streets-graph.png';        size='graph';  page='pcg/streets-city-tutorial' },
  @{ id='S16'; kind='still'; file='landscape-patch-result.png';   size='editor'; page='pcg/landscape-patch' },
  @{ id='S17'; kind='still'; file='alley-result.png';             size='editor'; page='pcg/recipes' },
  @{ id='S18'; kind='still'; file='pcg-facade-graph.png';         size='graph';  page='pcg/recipes' },
  @{ id='T1-a'; kind='clip'; file='architect-draw.mp4';       page='getting-started/architect-mode-fundamentals' },
  @{ id='T1-b'; kind='clip'; file='subdivide-preview.mp4';    page='authoring/architect-mode' },
  @{ id='T1-c'; kind='clip'; file='streets-to-pcg.mp4';       page='pcg/streets-city-tutorial' },
  @{ id='T1-d'; kind='clip'; file='unbake-rebake.mp4';        page='production/baking' },
  @{ id='T2-a'; kind='clip'; file='streets-draw-edit.mp4';    page='authoring/architect-mode' },
  @{ id='T2-b'; kind='clip'; file='streets-drag-absorb.mp4';  page='authoring/architect-mode' },
  @{ id='T2-c'; kind='clip'; file='preset-drag-multi.mp4';    page='authoring/preset-library' }
)

# The July originals, so "present" can distinguish a fresh capture from the stale file.
$sessionStart = Get-Date '2026-08-23 12:00'

function Get-Dim($path) {
  $img = [System.Drawing.Image]::FromFile($path)
  try { return @($img.Width, $img.Height) } finally { $img.Dispose() }
}

function Check {
  $rows = foreach ($e in $expected) {
    if ($e.kind -eq 'still') {
      $p = Join-Path $screens $e.file
      if (-not (Test-Path $p)) { [pscustomobject]@{ Id=$e.id; File=$e.file; Status='MISSING'; Detail=''; Page=$e.page }; continue }
      $f = Get-Item $p
      $d = Get-Dim $p
      $fresh = $f.LastWriteTime -gt $sessionStart
      $ok = switch ($e.size) {
        'editor' { $d[0] -eq 1968 -and $d[1] -eq 1020 }
        'graph'  { $d[0] -eq 1920 -and $d[1] -eq 1040 }
        'crop'   { $true }
      }
      $status = if (-not $fresh) { 'STALE (July)' } elseif (-not $ok) { 'WRONG SIZE' } else { 'ok' }
      [pscustomobject]@{ Id=$e.id; File=$e.file; Status=$status; Detail="$($d[0])x$($d[1])"; Page=$e.page }
    } else {
      $p = Join-Path $clips $e.file
      $poster = Join-Path $clips ([IO.Path]::ChangeExtension($e.file, '.png'))
      if (-not (Test-Path $p)) { [pscustomobject]@{ Id=$e.id; File=$e.file; Status='MISSING'; Detail=''; Page=$e.page }; continue }
      $mb = (Get-Item $p).Length / 1MB
      $status = if ($mb -gt $clipBudgetMB) { 'OVER BUDGET' } elseif (-not (Test-Path $poster)) { 'NO POSTER' } else { 'ok' }
      [pscustomobject]@{ Id=$e.id; File=$e.file; Status=$status; Detail=('{0:N2} MB' -f $mb); Page=$e.page }
    }
  }
  Clear-Host
  "capture intake  -  $(Get-Date -Format 'HH:mm:ss')"
  $rows | Format-Table -AutoSize | Out-String -Width 140
  $done = ($rows | Where-Object Status -eq 'ok').Count
  "$done / $($rows.Count) ready.   Next: " + (($rows | Where-Object Status -ne 'ok' | Select-Object -First 3 | ForEach-Object { $_.Id }) -join ', ')
}

if ($Watch) { while ($true) { Check; Start-Sleep -Seconds 5 } } else { Check }
