# v6 docs capture plan

Everything the documentation needs from a live editor, decided by reading every page as a
designer who has never opened the plugin. Written assuming **no images exist at all** — the
current twelve stills are all from July, two are wrong, and they are not a floor to preserve.

The user drives the editor; Claude places each result into the pages.

---

## The principle behind the list

A still earns its place when the reader must **recognise** something: a panel they have to
find, a result they should expect. A clip earns its place when the value is **in the motion**
— something updating live, something being dragged, a before-and-after inside one gesture.

Most of this site is reference tables, and reference tables do not need pictures. So the
list is deliberately short. **15 stills and 7 clips** total; four of the clips are the ones
that actually sell the product. A reference page with a screenshot that just decorates it
makes the page slower, not clearer.

Three things I would *not* capture, and why:

- **Per-node PCG screenshots.** 25 nodes, and a picture of a node's details panel tells a
  reader nothing the settings table does not. One good graph shot per workflow instead.
- **Any Details-panel shot where the page already tabulates the controls.** The Wall,
  Building, Curve, Custom Piece, Boolean, Lot Zone, and project-settings pages are all
  tables. They get one *result* shot where the actor's output is distinctive, or nothing.
- **The diagrams (`actor-hierarchy.svg`, `baking-lifecycle.svg`, `streets-pcg-flow.svg`).**
  Keep them; they do a job a screenshot cannot.

---

## Before the session

**The dev host has no plugin binaries.** The last `PackagePluginFab.bat` run purged
`Binaries/` and `Intermediate/` from the source tree, and `SACity` junctions to it. Rebuild
with the editor closed, and confirm a real compile happened (check the `.obj` mtime, not the
exit code):

```bash
"D:/Games/UE_5.8/Engine/Build/BatchFiles/Build.bat" UnrealEditor Win64 Development -Project="C:/Users/f4x11ut/Documents/Unreal Projects/SACity/SACity.uproject" -NoXGE -NoUBA -MaxParallelActions=8 -WaitMutex
```

The plugin repo is on `fix/unity-build-collisions` with `PackagePlugin.bat` dirty. Capture
from a tree that matches what ships.

**One scene for the whole session.** Every shot below is from SACity. Keep one saved camera
bookmark per area so reshoots match. Use the same time of day and the same lighting for
everything — the site should read as one place, not eleven screenshots.

## Capture settings

| | |
| --- | --- |
| Editor / viewport stills | **1968 x 1020** PNG |
| PCG graph stills | **1920 x 1040** PNG |
| Tight UI crops | native size, no upscaling; the page scales them down |
| Clips | silent MP4, H.264, **6–12 s**, loops cleanly, **under 3 MB each** |
| Clip posters | one PNG per clip, same frame size, from a frame that reads well frozen |
| Destinations | stills → `static/img/screens/`, clips and posters → `static/img/clips/` |

Clips are committed to the repo. Keep them tight: crop to the region that matters, and cut
before the action finishes so the loop point is invisible.

**Look at the first clip on the page before recording the rest.** `LoopingClip` has been
verified through the build only. Its reduced-motion fallback is the poster, so pick posters
that make sense on their own.

---

## Tier 1 — the four clips that sell the product

These are what a prospective buyer scrolls to. Get these right even if nothing else gets
recorded.

### T1-a · `architect-draw.mp4` — drawing a building

- **Page:** `getting-started/architect-mode-fundamentals.md`, replaces the TBD marker
- **Record:** Architect Mode with a Wall preset chosen. Click four corners of a footprint
  with grid snap on, close the loop on the first point, and let the wall generate. Then
  Ctrl-click a segment to insert a point and drag it outward so the building reshapes live.
- **Why a clip:** the whole promise of the plugin is "draw a line, get a building". A still
  cannot show that the building *follows* the point you drag.
- **Poster:** the finished footprint with the wall generated.
- **Caption:** Draw a footprint, and the wall follows every edit.

### T1-b · `subdivide-preview.mp4` — Streets lot Subdivide

- **Page:** `authoring/architect-mode.md`, **Subdivide lots**
- **Record:** one large lot selected in Select sub-mode. Press **Subdivide** — ghost streets
  appear. Drag **Lot Target Area** down and up so the ghosts redraw. Press **Reroll** twice.
  Press **Apply** and let the real roads generate.
- **Why a clip:** this is the best thing in the August work and it is *entirely* about live
  feedback. Two passes in different configs so two ghost colours show.
- **Poster:** the ghost-street frame before Apply.
- **Caption:** Subdivide previews the new streets live; Apply commits them in one step.

### T1-c · `streets-to-pcg.mp4` — edit a street, the city follows

- **Page:** `pcg/streets-city-tutorial.md`, replaces the TBD marker
- **Record:** viewport with PCG-owned buildings on subdivided lots. In Streets Mode, drag
  one street node a few metres. Lots re-extract, buildings regenerate to the new parcels.
- **Why a clip:** proves the pipeline is live end-to-end, which no amount of graph
  screenshots can.
- **Poster:** the city after regeneration.
- **Caption:** Move a street and the lots, buildings, and props regenerate to match.

### T1-d · `unbake-rebake.mp4` — the baked-first loop

- **Page:** `production/baking.md`, replaces the TBD marker
- **Record:** a baked Building. Change **Num Floors** in the details panel. The output
  drops back to an editable preview and regenerates taller. Press **Rebake Connected**.
- **Why a clip:** "automatic unbake" is an abstract sentence until you watch baked geometry
  come alive under an edit. This is the feature people are most likely to misunderstand.
- **Poster:** mid-state, the unbaked preview with the extra floor.
- **Caption:** An authored change unbakes the output by itself; rebaking is a deliberate step.

---

## Tier 2 — clips where the motion is the information

### T2-a · `streets-draw-edit.mp4`

- **Page:** `authoring/architect-mode.md`, Streets Mode, replaces the TBD marker
- **Record:** draw a road with three points and Enter. Switch to Select. Drag a node, drag
  a corner's fillet ring wider, Ctrl-click an edge to cut it.
- **Caption:** Draw roads, then move nodes, widen fillets, and cut edges in Select mode.

### T2-b · `streets-drag-absorb.mp4`

- **Page:** `authoring/architect-mode.md`, Select and edit
- **Record:** a cluster of four or five near-identical intersection nodes. Raise **Node
  Merge Radius** so the ring is obviously visible, then drag one node slowly through the
  cluster, swallowing them one by one.
- **Why a clip:** the merge-radius ring and the swallow-as-you-pass behaviour cannot be
  described faster than they can be watched.
- **Caption:** Drag a node through a cluster to merge the intersections it passes.

### T2-c · `preset-drag-multi.mp4`

- **Page:** `authoring/preset-library.md`, replaces the TBD marker
- **Record:** type in search, switch a DataTable filter, then select **three** presets and
  drag them into the viewport together so the grid placement is visible.
- **Why a clip and not a still:** the search and filter are fine as a still, but multi-drag
  placement is new and its behaviour (a non-overlapping grid at the drop point) is
  impossible to infer from a frame.
- **Caption:** Search, filter, and drag several presets into the level at once.

---

## Tier 3 — stills that orient the reader

### Overview and getting started

| # | File | Page | Set up and show |
| --- | --- | --- | --- |
| S1 | `overview-sacity.png` | `getting-started/overview.md` hero | **The money shot.** A finished SACity street with buildings, roads, and props from a low three-quarter angle. No UI, or minimal UI. This is the first thing anyone sees and it should look like a place, not a screenshot. |
| S2 | `architect-mode.png` | `architect-mode-fundamentals.md` — **AnnotatedShot** | Architect Mode active, a path half-drawn, preset panel open. Full bottom strip visible including **Grid / Spacing / Space:**. Callouts: 1 Mode settings · 2 Preset Library · 3 viewport instructions · 4 grid, spacing, space · 5 finish/close/cancel · 6 selected-actor controls. |
| S3 | `first-building-stack.png` | `first-building.md` | A three-layer connected stack selected, Outliner showing the hierarchy. The existing one is fine if the stack shows ground / facade / parapet clearly. |

### Actors — one result shot each, only where the output is distinctive

| # | File | Page | Set up and show |
| --- | --- | --- | --- |
| S4 | `wall-details.png` | `core-actors/wall.md` | Replace with a **result** shot: one wall showing corner handling, a door custom piece, and posts. The current details-panel shot duplicates the table beneath it. |
| S5 | `streets-network.png` | `core-actors/streets-network.md` hero | A network from above at a slight angle: intersections with fillets, lots visible as surfaces. |
| S6 | `lot-surface-layers.png` | `streets-network.md`, **Lot surface layers** | Close and angled. A lot with **Generate Skirt** and **Generate Fillet** on, distinct skirt material, **Thickness** > 0 so the dropped kerb shows at a corner pad. This is the one place a picture explains three paragraphs. |
| S7 | `streets-segment-override.png` | `streets-network.md`, **Per-segment overrides** | One segment selected with **Override This Segment** ticked and a visibly wider width. Show both the **Selected Segments** panel and the wider segment so the "does not blend" caveat is visible. |
| S8 | `boolean-cut.png` | `core-actors/boolean.md` | A Boolean spline cutter punching an archway through a wall. Cheap to set up, and Boolean is the actor whose result is least obvious from its controls. |

No new shots for Building, Curve, Custom Piece, or Lot Zone. Their pages are control tables
and the behaviours are covered by S3, S4, and the Streets shots.

### Authoring

| # | File | Page | Set up and show |
| --- | --- | --- | --- |
| S9 | `preset-library.png` | `authoring/preset-library.md` | **Currently broken** — it is a copy of `architect-mode.png`. Thumbnail grid, a DataTable filter applied, a favorite visible, the toolbar row. |
| S10 | `subdivide-panel.png` | `authoring/architect-mode.md`, **Subdivide lots** | Tight crop of the **Subdivide Preview** panel: two pass rows, one collapsed so its summary reads, **Guards** expanded with Min Block Width at Auto, and the "N street(s) across M lot(s)" line. |
| S11 | `height-mode-compare.png` | `authoring/wall-presets.md`, **Fit Height or Uniform Scale** | **Side by side**: the same mixed-height kit on two identical walls, one Fit Height (flat top, stretched pieces) and one Uniform Scale (varied top, true proportions, a filler visible). Words cannot carry this comparison; one image can. |
| S12 | `architect-grid-strip.png` | `authoring/architect-mode.md`, **The grid** | Tight crop of the bottom strip with **Grid** checked, a value in **Spacing**, and the **Space:** combo dropped open showing World / Actor Local. |

### Production

| # | File | Page | Set up and show |
| --- | --- | --- | --- |
| S13 | `baked-output.png` | `production/baking.md` — **AnnotatedShot** | Keep the existing framing if it still matches: baked instanced output plus the actor's Baking category. Callouts as today. |
| S14 | `diagnostics.png` | `baking.md`, Diagnostics | Keep. It is a table of a table and that is fine here; the reader needs to recognise the window. |

### PCG

| # | File | Page | Set up and show |
| --- | --- | --- | --- |
| S15 | `pcg-streets-graph.png` (1920x1040) | `streets-city-tutorial.md` — **AnnotatedShot** | The tutorial's graph, re-shot so the **Sub-Lot Boundaries** pin name is visible. Callouts as today. |
| S16 | `landscape-patch-result.png` | `pcg/landscape-patch.md` | **SKIPPED 2026-08-23** - no sloped-landscape scene ready in SACity. The page stands on its tables; add this when a terrain map exists (the #294 example project work is a natural moment). |
| S17 | `alley-result.png` | `pcg/recipes.md`, **Alleys between sub-lots** | Top-down-ish view of a subdivided block with Gap > 0: alley corridors between sub-lots, hedges along the sides, bollards at the mouths. |
| S18 | `pcg-facade-graph.png` | `recipes.md`, **Facade attachments** | Keep the existing shot. |

That is the whole list: **18 stills (3 kept, 4 re-shot, 11 new) and 7 clips.**

---

## What I would cut first if the session runs short

In order: S8 (Boolean), T2-c (multi-drag — a still of the library is acceptable), S12
(grid strip — the table describes it), S17 (alley result). Everything in Tier 1 and S6, S9,
S11, S16 are not negotiable — those are the pages where words are doing a job a picture
should be doing.

---

## After the session

1. Drop files into `static/img/screens/` and `static/img/clips/`.
2. Claude wires each in, adds `LoopingClip` blocks, removes the five TBD markers, places
   `AnnotatedShot` pin coordinates, and deletes whichever July stills were replaced.
3. `npm run typecheck && npm run build` — broken links and anchors throw.
4. `npm run serve`, check every clip plays and loops cleanly, and check a clip with the OS
   reduce-motion setting on to confirm the poster fallback.
5. Mark PR #4 ready. **Do not deploy** — publication stays frozen until Fab approval, #295.
