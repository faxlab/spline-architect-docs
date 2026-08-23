---
title: Migrate from v5 to v6
description: Upgrade a copy, learn what replaced your v5 workflow, and retire the old branch only after checks pass.
---

v6 changes how you author, not just what version number the plugin reports. Upgrade **a copy** of the project - or a source-controlled branch - and keep the v5 build openable until your maps have passed the checks at the bottom of this page.

## Before opening in v6

1. Back up the project and the old plugin package.
2. Note the preset DataTables and seeds your maps depend on.
3. If a legacy generated result cannot be reconstructed, convert it to independent assets first.
4. Install the v6 package matching your engine. Streets and the PCG replacements need UE 5.8 - see [compatibility](/reference/compatibility).

## What replaced your v5 workflow

| You used in v5 | You use in v6 |
| --- | --- |
| Draw/utility-widget path creation | [Architect Mode](/authoring/architect-mode) - drawing, editing, branching, snapping, and shapes in the viewport. |
| Ad-hoc preset browsing | The [Preset Library](/authoring/preset-library): search, filters, favorites, thumbnails, drag and drop. |
| Wall groups copied by hand | A connected stack saved as a **Building Preset**, placed as a [Building](/core-actors/building) on any footprint. |
| Treating the preview as final | The [baked-first workflow](/getting-started/baked-first-workflow): explicit Bake Connected, automatic unbake on change. |
| **MultiBuilding** | UE 5.8 PCG: Streets lots → [SA Subdivide Lots](/pcg/node-reference#sa-subdivide-lots) → SA Spawn Building. |
| **Legacy Prop Spawner** | UE 5.8 PCG: [SA Edge Placer](/pcg/node-reference#sa-edge-placer), samplers, SA Pick From Pool, SA Prune Footprints. |

MultiBuilding and the Prop Spawner are gone from v6, not hidden. Their baked output survives as ordinary content, but new procedural work goes through the PCG graph.

## Check your content

- Open each Wall, Building, and Curve DataTable and confirm the rows load with the expected struct.
- Actors using **Parameter Overrides**: confirm the override still masks the value you meant it to.
- Assets that must not change appearance: pin their **Seed** to a fixed value now.
- Complex connected stacks: check parent IDs after loading.
- Custom Pieces: verify floor strings and Insert/Overlap behavior.

## Retire v5 only after this passes

1. Open your representative maps in v6 and let generation settle.
2. Compare piece packing, corners, floors, roofs, materials, and Boolean cuts against the v5 result.
3. **Bake/Rebake Connected**, then read [Diagnostics](/production/baking#diagnostics-and-baked-asset-registry).
4. Run one of each conversion flow your project uses - to mesh, to Blueprint, or standalone export.
5. Rebuild one legacy MultiBuilding or Prop Spawner setup as a PCG graph and confirm it regenerates deterministically.

When those pass on your own maps - not before - retire the v5 branch.
