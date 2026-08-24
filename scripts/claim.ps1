<#
.SYNOPSIS
  Claim the newest ShareX recording for a shot-list ID: name it, move it into the docs
  repo, and cut a poster frame for clips.

.DESCRIPTION
  ShareX saves with a random name into a month folder. This takes the newest file there
  (or an explicit -Path), renames it to the shot list's filename, and moves it into
  static/img/screens or static/img/clips. For a clip it also extracts a poster PNG from
  the frame at -PosterAt seconds (default 1.0) and reports the duration and size against
  the budget so a fat clip is caught before it is wired in.

.EXAMPLE
  .\scripts\claim.ps1 T1-a
  .\scripts\claim.ps1 S6
  .\scripts\claim.ps1 T1-b -PosterAt 4.5
  .\scripts\claim.ps1 S9 -Path "C:\Users\f4x11ut\Documents\ShareX\Screenshots\2026-08\abc123.png"
#>
param(
  [Parameter(Mandatory)][string]$Id,
  [string]$Path,
  [double]$PosterAt = 1.0
)
$ErrorActionPreference = 'Stop'
$root    = Split-Path -Parent $PSScriptRoot
$shareX  = 'C:\Users\f4x11ut\Documents\ShareX\Screenshots'
$screens = Join-Path $root 'static\img\screens'
$clips   = Join-Path $root 'static\img\clips'
$ffmpeg  = 'C:\Users\f4x11ut\AppData\Local\Microsoft\WinGet\Links\ffmpeg.exe'
$ffprobe = 'C:\Users\f4x11ut\AppData\Local\Microsoft\WinGet\Links\ffprobe.exe'
$clipBudgetMB = 3.0

$map = @{
  'S1'='overview-sacity.png';        'S2'='architect-mode.png';         'S3'='first-building-stack.png'
  'S4'='wall-details.png';           'S5'='streets-network.png';        'S6'='lot-surface-layers.png'
  'S7'='streets-segment-override.png';'S8'='boolean-cut.png';           'S9'='preset-library.png'
  'S10'='subdivide-panel.png';       'S11'='height-mode-compare.png';   'S12'='architect-grid-strip.png'
  'S13'='baked-output.png';          'S14'='diagnostics.png';           'S15'='pcg-streets-graph.png'
  'S16'='landscape-patch-result.png';'S17'='alley-result.png';          'S18'='pcg-facade-graph.png'
  'T1-a'='architect-draw.mp4';       'T1-b'='subdivide-preview.mp4';    'T1-c'='streets-to-pcg.mp4'
  'T1-d'='unbake-rebake.mp4';        'T2-a'='streets-draw-edit.mp4';    'T2-b'='streets-drag-absorb.mp4'
  'T2-c'='preset-drag-multi.mp4'
}
# Accept any casing: "t1-a", "T1-A", "s6" all resolve.
$match = $map.Keys | Where-Object { $_ -ieq $Id } | Select-Object -First 1
if (-not $match) { throw "Unknown shot id '$Id'. Known: $(($map.Keys | Sort-Object) -join ', ')" }
$Id = $match
$target = $map[$Id]
$isClip = $target -like '*.mp4'
$wantExt = if ($isClip) { '.mp4' } else { '.png' }

# Source: explicit, or the newest matching file anywhere under the ShareX screenshots tree.
if (-not $Path) {
  $src = Get-ChildItem $shareX -Recurse -File -Filter "*$wantExt" |
         Sort-Object LastWriteTime -Descending | Select-Object -First 1
  if (-not $src) { throw "No $wantExt found under $shareX" }
  $age = (Get-Date) - $src.LastWriteTime
  if ($age.TotalMinutes -gt 30) {
    throw "Newest $wantExt is $([int]$age.TotalMinutes) min old ($($src.Name)). Record first, or pass -Path explicitly."
  }
} else {
  $src = Get-Item $Path
  if ($src.Extension -ne $wantExt) { throw "$Id expects $wantExt, got $($src.Extension)" }
}

$destDir = if ($isClip) { $clips } else { $screens }
$dest = Join-Path $destDir $target
New-Item -ItemType Directory -Force $destDir | Out-Null
if (Test-Path $dest) { Remove-Item $dest -Force }
Move-Item $src.FullName $dest
"claimed  $Id  <-  $($src.Name)"
"         -> $dest"

if ($isClip) {
  $dur = & $ffprobe -v error -show_entries format=duration -of csv=p=0 $dest
  $dim = & $ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 $dest
  $mb  = (Get-Item $dest).Length / 1MB
  $poster = [IO.Path]::ChangeExtension($dest, '.png')
  $at = [Math]::Min($PosterAt, [double]$dur - 0.1)
  & $ffmpeg -v error -y -ss $at -i $dest -frames:v 1 $poster
  "         {0}  {1:N1} s  {2:N2} MB  poster@{3:N1}s -> {4}" -f $dim, [double]$dur, $mb, $at, (Split-Path $poster -Leaf)
  if ($mb -gt $clipBudgetMB) { Write-Warning ("OVER BUDGET: {0:N2} MB > {1} MB. Trim it or re-record tighter." -f $mb, $clipBudgetMB) }
  if ([double]$dur -gt 15) { Write-Warning ("Long: {0:N1} s. Target is 6-12 s." -f [double]$dur) }
} else {
  Add-Type -AssemblyName System.Drawing
  $img = [System.Drawing.Image]::FromFile($dest)
  try { "         $($img.Width)x$($img.Height)" } finally { $img.Dispose() }
}
