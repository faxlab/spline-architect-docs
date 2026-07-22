---
title: Migrate from v5 to v6
description: Back up, upgrade assets, adopt Architect Mode and baked-first generation, and replace legacy generators with UE 5.8 PCG.
---

Treat the v6 upgrade as an authoring-workflow migration, not only a binary replacement. Upgrade a copy or source-controlled branch and keep a working v5 build until representative maps pass.

## Before opening in v6

1. Back up the project and plugin.
2. Save important procedural results and record preset DataTables/seeds.
3. Convert irreplaceable legacy generated output to independent assets if it cannot be reconstructed.
4. Install the v6 package matching the target engine. Use UE 5.8 if the replacement PCG workflows are required.

## What changed

| v5 concept | v6 workflow |
| --- | --- |
| Draw/utility-widget path creation | **Architect Mode** with creation, point/segment editing, branching, snapping, shapes, and preset picker. |
| Ad-hoc preset browsing | **Preset Library** with DataTable filters, search, favorites, thumbnails, drag/drop, and metadata. |
| Wall groups copied by hand | Connected Wall stack → **Save Building Preset** → reusable **Building** actor. |
| Editor preview treated as final | **Baked-first** generation, automatic unbake after authored changes, explicit Bake/Rebake Connected. |
| MultiBuilding actor | UE 5.8: **Streets Network → SA Get Lots → SA Subdivide Lots → SA Spawn Building**. |
| Legacy Prop Spawner | UE 5.8: **SA Edge Placer**, normal Surface/Spline Samplers, **SA Pick From Pool**, **SA Prune Footprints**, and stock spawners. |
| Raw spline-only PCG reads | **SA Get Spline** for the effective generation path and semantic attributes. |

MultiBuilding and the legacy Prop Spawner are not user-facing v6 actors. Existing baked/static output can remain as ordinary Unreal content, but procedural authoring should move to the PCG graph equivalents.

## Presets and actor checks

- Open each Wall/Building/Curve DataTable and confirm its row structure.
- Check inline vs DataTable precedence and Parameter Overrides.
- Save deterministic seeds for assets that must not change.
- Inspect connected Wall parent IDs after loading complex stacks.
- Verify Custom Piece floor strings, insert/overlap behavior, and child actors.
- Rebuild Streets and check lot keys/zones before connecting PCG.

## Production checks

1. Open representative levels in v6 and allow generation to settle.
2. Compare paths, piece packing, corners, floors, roofs, materials, and Booleans.
3. Bake/Rebake Connected and inspect Diagnostics.
4. Test one Convert-to-Mesh, Convert-to-Blueprint, and standalone export flow used by the project.
5. In UE 5.8, rebuild legacy city/prop workflows as PCG graphs and validate cleanup plus deterministic regeneration.
6. Only retire the v5 branch after visual, collision, lighting, and gameplay checks pass.

## Current v6 highlights

v6 adds Architect Mode, reusable Building presets, the Preset Library and managed thumbnails, semantic Streets and Lot Zones, Curve improvements, reversible connected baking, diagnostics and baked asset tracking, unified conversion/export with optional Building proxy LOD, pivot/lightmap tools, deterministic Wall piece layout policies, and the UE 5.8 SA PCG node suite.
