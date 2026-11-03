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

The plugin includes starter presets for Walls, Buildings, Curves and Custom Pieces. An empty library is not the expected starting point.

Clear the search text, turn off **Favorites** filtering, and select the matching category. The category and Favorites filter are remembered between sessions.

If the presets are still missing, check that your installed plugin includes the **SA_Walls**, **SA_Buildings**, **SA_Curves** and **SA_CustomPieces** DataTables in its **Content/Presets** folder. These ship with the UE 5.5–5.8 packages. If the files are missing, reinstall the complete package for your engine version using the [installation guide](/getting-started/installation).

If the presets are visible but a newly placed actor starts empty, check its default preset under **Project Settings → Plugins → Spline Architect Settings**. Existing projects can override the starter defaults. Changing a default affects new actors; assign a preset directly to an actor that is already in the level.

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

### A sloped roof came out flat

Footprints with narrow wings, notches and nearly parallel walls get sloped roofs with proper hips and valleys from 6.2. A baked actor keeps the roof it was baked with until you rebake it. If a roof is still flat after it regenerates, the Output Log names the actor: *the sloped roof of ... left its footprint, so it was made flat instead*. Check that footprint for crossing edges and near-duplicate corners.

### Boolean has no effect

Make the cutter overlap in 3D, increase Spline Extrude Distance, enable the correct Affect toggles, and confirm Target Actors is not overriding Auto Detect. Cull removes whole components; Boolean Subtract cuts their geometry.

## Baking and output

### A change unbaked my actor

That is expected. Spline Architect prevents stale persistent output after authored edits. Inspect the regenerated result and run Bake/Rebake Connected.

### Too many components or draw calls

Use Instanced or Hierarchical Instanced bake/output, consolidate compatible meshes/materials, and check that small material differences are not breaking instance groups.

### Baked lighting is poor

Enable generated lightmap UVs, set an appropriate texel density, inspect the destination UV channel, and use the Lightmap Tool for source assets. Confirm Static mobility and rebuild lighting.

Also check that **Project Settings → Rendering → Allow Static Lighting** is on. With it off, the shapes Spline Architect builds (floors, roofs, streets, merged walls, Facade Kit planes) get no lightmap UVs, whatever **Generate Lightmap UVs on Bake** says. Rebake after you change it.

### Baked meshes use Nanite, or stopped using it

Baked shapes follow **Baked Mesh Nanite** in Project Settings from their next bake or rebake. With the default, **Match Project**, they use Nanite whenever the project has Nanite turned on. Set it to **Never** to keep generated shapes non-Nanite, then run **Rebake All**. Corner and skew pieces made from your own meshes follow the source mesh's Nanite setting instead, and a mesh with a translucent material never uses Nanite. See [Nanite on baked meshes](/production/baking#nanite-on-baked-meshes).

### Conversion lost output

Enable **Bake Spline Architect Actors Before Convert**, include attached actors where needed, and wire/realize Dynamic Mesh output before expecting non-static surface pieces in a PCG Data workflow. Keep originals until validation passes.

## Import Map

### A mapped area was skipped

**Diagnostics** shows a **Review** entry such as *Skipped area 'Example Park' (way/123, Park): its outline could not be cut to the selection.* The import could not cut that one area to your boundary, or could not fill its shape safely. It leaves the area out and carries on with everything else, and the Output Log gets a warning with the same text. Click the entry to frame the spot. Only area types you ticked can be skipped. Unticking the type removes the entry, and also leaves out every other area of that type.

### Create Import is unavailable and the status line names the building limit

The selection holds more buildings than the **Building limit**, 2,000 by default. Streets and areas still preview. Raise the limit under **Heights and filters** on the Buildings tab (`0` means no limit), untick Buildings to import the rest, or draw a smaller boundary.

### The Buildings tab says there is no style to choose from

No Building preset table is ticked under **Styles**. Tables that ship inside the plugin, such as SA_Buildings, start unticked, so tick one, or save your own Building preset to a table in your project's Content. Or tick **Footprints only** to import outlines without a style.

### Replace says buildings are in parts of the level that are not loaded

A World Partition cell that holds buildings of the import is unloaded, and a replace would leave them behind. Load those parts of the level, then replace the import. Buildings you deleted do not block a replace; it brings them back.

### The search box does not find a street address

Street addresses are not searched. Type the town, or paste the address's coordinates or a plus code. See [Pasted locations](/core-actors/import-map#pasted-locations).

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
