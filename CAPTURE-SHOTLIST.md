# v6 docs capture shot list

Everything the v6 documentation still needs from a live editor. Worked through in one
session: the user drives the editor, Claude places each result into the pages.

All prose is already written and merged on `docs/v6-catch-up`. Nothing here blocks on
more writing.

---

## Before the session

**The dev host currently has no plugin binaries.** The last `PackagePluginFab.bat` run
purged `Binaries/` and `Intermediate/` from the source tree, and `SACity` junctions to it.
Rebuild with the editor closed:

```bash
"D:/Games/UE_5.8/Engine/Build/BatchFiles/Build.bat" UnrealEditor Win64 Development -Project="C:/Users/f4x11ut/Documents/Unreal Projects/SACity/SACity.uproject" -NoXGE -NoUBA -MaxParallelActions=8 -WaitMutex
```

Confirm it really built - check the mtime of
`<plugin>\Intermediate\Build\Win64\x64\UnrealEditor\Development\SplineArchitect\Module.SplineArchitect.cpp.obj`
rather than trusting the exit code.

Capture from a tree that matches what ships. The repo is currently on
`fix/unity-build-collisions` with `PackagePlugin.bat` dirty.

## Capture settings

| | |
| --- | --- |
| Editor / viewport stills | **1968 x 1020** PNG, matching the existing set |
| PCG graph stills | **1920 x 1040** PNG |
| Clips | silent MP4, H.264, **5-15 s**, looping cleanly, **under ~3 MB each** |
| Clip posters | one PNG per clip, same dimensions, from a representative frame |
| Destinations | stills to `static/img/screens/`, clips and posters to `static/img/clips/` |

Clips are committed to the docs repo, so keep them short and tight. Crop to the panel or
viewport region that matters rather than capturing the whole screen where possible.

The `LoopingClip` component and its CSS are already in place. It has been verified through
the static build only - the first real clip is also the visual check for it, so we look at
one on the page before recording the rest.

---

## A. Wrong or stale stills

### A1. `preset-library.png` - **broken, highest priority**

The current file is byte-identical to `architect-mode.png`, so the Preset Library page is
showing the Architect Mode screenshot.

- **Page:** `docs/authoring/preset-library.md`, under the intro
- **Set up:** Preset Library open, thumbnail grid view, a DataTable filter applied, several
  presets visible including at least one favorite
- **Must show:** the category tabs, search, the DataTable filter button, and the toolbar row

### A2. `architect-mode.png` - stale, and it is an AnnotatedShot

The bottom strip gained three grid controls since this was taken.

- **Page:** `docs/getting-started/architect-mode-fundamentals.md`
- **Set up:** Architect Mode active, a Wall path part-drawn, preset panel open
- **Must show:** the full bottom strip including **Grid**, **Spacing**, and **Space:**
- **Callout labels** (pin positions get placed after the shot exists):
  1. Mode and path-creation settings
  2. Preset Library
  3. Live viewport instructions
  4. Grid, spacing, and grid space
  5. Finish, close, and cancel
  6. Selected actor controls and authored data

### A3. `streets-mode.png` - stale

- **Page:** `docs/authoring/architect-mode.md`, Streets Mode section
- **Set up:** Streets Mode active, **Select** sub-mode, a lot selected
- **Must show:** the viewport bar with the **Subdivide** button visible and enabled, and the
  Street Config dropdown

### A4. Lower priority, re-shoot if time allows

`overview-sacity.png`, `streets-network.png`, `wall-details.png`,
`building-details.png`, `first-building-stack.png`, `baked-output.png`,
`diagnostics.png`, `pcg-facade-graph.png`, `pcg-streets-graph.png`. All are from 22 July
and still broadly representative; they are dated rather than wrong.

---

## B. Motion clips

These five replace the `<!-- TBD motion capture -->` markers already sitting in the pages.
Each needs a clip plus a poster still.

### B1. `streets-mode-editing`

- **Page:** `docs/authoring/architect-mode.md`, Streets Mode
- **Show:** drawing a road, then in Select mode - dragging a node, cutting an edge with
  Ctrl-click, and dragging a fillet ring on a corner
- **Caption:** Drawing and editing a street graph in Streets Mode.

### B2. `preset-library-browsing`

- **Page:** `docs/authoring/preset-library.md`
- **Show:** typing in search, switching the DataTable filter, then dragging a preset into
  the viewport. If it reads clearly, also drag a **multi-selection** so the grid placement
  is visible - that is new and hard to convey in a still.
- **Caption:** Searching, filtering, and dragging presets into the level.

### B3. `architect-mode-editing`

- **Page:** `docs/getting-started/architect-mode-fundamentals.md`
- **Show:** drawing a path with grid snap, dragging a point, Ctrl-click inserting a point,
  and a branch from the right-click menu
- **Caption:** Drawing and editing a path in Architect Mode.

### B4. `streets-pcg-regen`

- **Page:** `docs/pcg/streets-city-tutorial.md`
- **Show:** editing the Streets Network and the PCG-owned buildings regenerating to match,
  then a Cleanup removing them
- **Caption:** Streets edits flow through the graph, and Cleanup removes what PCG owns.

### B5. `unbake-rebake`

- **Page:** `docs/production/baking.md`
- **Show:** changing an authored property on a baked actor, the output returning to an
  editable preview by itself, then **Rebake Connected**
- **Caption:** An authored change unbakes the affected output; rebaking is explicit.

### B6 and B7 - decide during the session

Two things a still cannot really convey. Record them if the session is going well:

- **`streets-drag-absorb`** - dragging a node through a cluster, with the merge-radius ring
  visible, swallowing nodes as it goes. Page: `docs/authoring/architect-mode.md`.
- **`subdivide-preview`** - passes and guards being tuned while the ghost streets update
  live, ending in Apply. Page: `docs/authoring/architect-mode.md`. This is the single best
  advertisement for the feature.

---

## C. New stills for the new prose

### C1. `subdivide-preview.png`

- **Page:** `docs/authoring/architect-mode.md`, **Subdivide lots**
- **Set up:** a large lot selected, preview active, at least **two enabled passes** with
  different Street Configs so more than one ghost colour shows
- **Must show:** the multi-coloured ghost streets over the lot, and the viewport bar showing
  **Apply / Reroll / Cancel**

### C2. `subdivide-panel.png`

- **Page:** same section
- **Set up:** the **Subdivide Preview** panel with two pass rows, one collapsed so its
  summary line reads, and the **Guards** section expanded
- **Must show:** pass rows, Guards with **Min Block Width** at its Auto value, Merge, Seed,
  and the live "N street(s) across M lot(s)" summary

### C3. `landscape-patch-graph.png` (1920 x 1040)

- **Page:** `docs/pcg/landscape-patch.md`
- **Must show:** SA Landscape Patch with all three input pins wired - lots into `Areas`,
  cut lines or a drawn spline into `Paths`, tagged props into `Props`

### C4. `landscape-patch-result.png`

- **Page:** same
- **Must show:** the terrain result - a flattened park lot on sloping ground with a path
  ribbon cut through it and a pad under a prop. Ideally the same scene as C3.

### C5. `lot-surface-layers.png`

- **Page:** `docs/core-actors/streets-network.md`, **Lot surface layers**
- **Set up:** a lot with a layer using **Generate Skirt** and **Generate Fillet**, a distinct
  Skirt Material, and **Thickness** above zero
- **Must show:** the skirt band, the corner pads, and the dropped kerb where the extruded
  band meets a flat pad. Close and angled rather than top-down.

### C6. `architect-grid-strip.png`

- **Page:** `docs/authoring/architect-mode.md`, **The grid**
- **Must show:** the bottom strip cropped tight, with **Grid** checked, a value in
  **Spacing**, and the **Space:** combo open showing **World** and **Actor Local**

### C7. `streets-segment-override.png`

- **Page:** `docs/core-actors/streets-network.md`, **Per-segment overrides**
- **Set up:** one segment selected with **Override This Segment** ticked and a visibly
  different **Width**
- **Must show:** the **Selected Segments** panel and the wider segment in the viewport, so
  the "does not blend into its road" caveat is visible rather than just described

### C8. `pcg-pool-add-assets.png`

- **Page:** `docs/pcg/node-reference.md`, SA Edge Placer
- **Must show:** the **Add Selected Assets (or drop here)** row above a populated pool,
  ideally mid-drag from the Content Browser

### C9. `alley-gap-outlines.png` (1920 x 1040)

- **Page:** `docs/pcg/recipes.md`, **Alleys between sub-lots**
- **Must show:** either the graph (Subdivide with Gap into Filter Spline Edges into two Edge
  Placers) or the result with props along alley sides and bollards at the mouths. The result
  is more persuasive if only one fits.

---

## After the session

1. Drop files into `static/img/screens/` and `static/img/clips/`.
2. Claude wires each into its page, adds `LoopingClip` blocks, removes the five
   `<!-- TBD motion capture -->` markers, and places `AnnotatedShot` pin coordinates.
3. `npm run typecheck && npm run build` - broken links and anchors throw.
4. `npm run serve` and check the clips play, the posters show, and reduced motion falls
   back to the still.
5. Open the PR. **Do not deploy** - publication stays frozen until Fab approval per #295.
