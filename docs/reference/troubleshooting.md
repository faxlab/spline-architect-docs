---
title: Troubleshooting and FAQ
description: Fix installation, generation, corners, surfaces, baking, PCG, conversion, lighting, and performance problems.
---

## Installation and startup

### Plugin was built for a different engine version

Close Unreal, replace the plugin with the exact UE 5.5/5.6/5.7/5.8 package, and remove stale copied packages from other project plugin locations. Do not copy only DLLs between builds.

### The plugin or SA nodes are missing

Enable Spline Architect and its dependencies, then restart. Streets Network, Lot Zone, Streets Mode, and the SA PCG nodes exist **only in the UE 5.8 package** — they are absent from the 5.5, 5.6, and 5.7 archives, so a missing Streets Network actor on an older engine is expected, not a broken install. See [compatibility](/reference/compatibility).

## Actor generation

### The Preset Library is empty

Nothing is wrong - a fresh install has no presets, because presets are built from your meshes and the plugin does not ship meshes. Open the [example project](https://github.com/faxlab/SplineArchitectExampleProject) for ready-made presets, or [make one from your own meshes](/getting-started/first-building#0-get-something-to-build-with). If you had presets and they vanished, check the library's category tab and Favorites filter - both are remembered between sessions.

### A Wall is empty

- Assign a valid Wall Mesh or Custom Wall Mesh.
- Confirm the DataTable uses the `WallPreset` row structure and the row still exists.
- Check Skip Pieces, Custom Piece gaps, knockout, and Booleans.
- Make the spline long enough for the logical Wall Length, or add shorter/filler pieces.
- Force Regenerate after fixing an asset reference.

### Corners have gaps or spikes

- Verify mesh bounds and pivot, then correct Corner Length/Height Add.
- Add small Overlap Pieces/Overlap Corners values.
- Remove near-duplicate path points or increase Collapse Nearby Spline Point Distance.
- Use the corner type that matches the asset: Straight, Bend, Chamfer, or Pipe.
- Prebake the actual angles and choose a sensible Corner Angle Increment.

### The actor changes every rebuild

Set a non-negative Seed. A `-1` seed resolves once to a concrete value, but duplicated/imported legacy actors should still be inspected and saved with an explicit resolved seed when exact reproducibility matters.

### A spline command skipped my actor

**Close/Open**, **Gridify**, **Flatten**, **Reverse**, **Mirror**, and **Apply Shape** refuse to guess when an actor has more than one spline, and tell you which actors they skipped. Select the spline component in the level editor, or pick a point on the path in Architect Mode, then run the command again. Actors with a single spline are unaffected.

### A transformed actor behaves strangely

Use Reset Transform or keep Auto Normalize Actor Scale enabled. Avoid leaving non-unit scale on spline-driven actors; bake it into points instead.

## Floors, roofs, and Booleans

### Floor/roof is missing

Close the spline, fix self-intersections, reduce inset, and remove near-duplicate corners. A roof slope inset larger than the viable polygon can collapse the result.

### Boolean has no effect

Make the cutter overlap in 3D, increase Spline Extrude Distance, enable the correct Affect toggles, and confirm Target Actors is not overriding Auto Detect. Cull removes whole components; Boolean Subtract cuts their geometry.

## Baking and output

### A change unbaked my actor

That is expected. Spline Architect prevents stale persistent output after authored edits. Inspect the regenerated result and run Bake/Rebake Connected.

### Too many components or draw calls

Use Instanced or Hierarchical Instanced bake/output, consolidate compatible meshes/materials, and check that small material differences are not breaking instance groups.

### Baked lighting is poor

Enable generated lightmap UVs, set an appropriate texel density, inspect the destination UV channel, and use the Lightmap Tool for source assets. Confirm Static mobility and rebuild lighting.

### Conversion lost output

Enable **Bake Spline Architect Actors Before Convert**, include attached actors where needed, and wire/realize Dynamic Mesh output before expecting non-static surface pieces in a PCG Data workflow. Keep originals until validation passes.

## PCG

See the [node failure table](/pcg/node-reference#common-graph-failures). Also confirm `sa.PCGAutoRefresh` remains at its default `1`; setting it to `0` intentionally requires manual PCG regeneration after SA edits.

## Performance

- Increase edit debounce if slider scrubbing triggers excessive work.
- Lower the interactive task budget if viewport hitches matter more than completion time.
- Increase the idle budget to drain queued generation faster after input stops.
- Reduce surface density, smoothing iterations, roof resolution, and PCG sample counts before changing architecture.
- Use Debug (Skeleton Only) while editing a large Streets graph.

## Where is MultiBuilding or Prop Spawner?

They were removed from the v6 authoring surface. Their scalable replacement is the UE 5.8 PCG workflow: Streets lots + SA Subdivide Lots + SA Spawn Building for city parcels, and Edge Placer / Surface Sampler + Pick From Pool for props. See [migration](/reference/migration-v6).
