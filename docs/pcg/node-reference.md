---
title: SA PCG node reference
description: Pins, settings, outputs, attributes, and spawn modes for every Spline Architect PCG node in UE 5.8.
---

All SA nodes require the UE 5.8 Spline Architect package. Actor-reading nodes evaluate live level state and are intentionally refreshed rather than serving stale cached geometry.

## Actor and Streets readers

### SA Get Spline

- **Input:** none. **Output:** `Splines` (Spline).
- **Settings:** Actor Selector; Actor Type Filter bitmask; optional Preset Table + Row filter; Write Semantic Attributes.
- Reads effective generation paths—not just raw Spline Components—including borrowed/stacked splines, multi-spline polygon modes, inset/reversal, mirror expansion, and stack offsets.
- Emits actor/path semantics listed in [metadata](/pcg/metadata-reference#effective-spline-attributes).

### SA Get Lots

- **Input:** none. **Outputs:** `Lot Boundaries` (Spline), `Lot Surfaces` (Dynamic Mesh), `Ground Surface` (Surface).
- **Settings:** Actor Selector, Include Empty Lots, Facet Angle, Emit Lot Surfaces, Ground Surface Spacing, Ground Surface Smoothing Iterations.
- One closed boundary per Streets lot, optional resolved visible lot mesh, and a sampleable ground surface. All outputs use the effective default/per-lot Streets Elevation Mode.

### SA Get Intersections

- **Input:** none. **Outputs:** `Intersection Boundaries` (Spline), `Intersection Surfaces` (Surface).
- **Settings:** Actor Selector, Emit Surfaces.
- One closed boundary per generated Streets junction with `SA_IntersectionNode` and `SA_SourceActor`.

### SA Get Road Edges

- **Input:** none. **Output:** `Road Edges` (Spline).
- **Setting:** Actor Selector.
- Emits left/right open pavement borders with corridor, side, and source attributes.

### SA Get Road Centerlines

- **Input:** none. **Output:** `Road Centerlines` (Spline).
- **Setting:** Actor Selector.
- Emits one open spline per resolved corridor plus cumulative per-point distance.

### SA Get Road Crossings

- **Input:** none. **Output:** `Road Crossings` (Spline).
- **Setting:** Actor Selector.
- Emits a two-point spline across each road/intersection attachment with road width and config index.

### SA Get Network Boundary

- **Input:** none. **Outputs:** `Network Boundary` (Spline), `Network Boundary Polygons 2D` (Polygon 2D).
- **Settings:** Actor Selector; Facet Angle.
- One closed outline per connected street cluster, following the pavement in Z. **Outer boundaries only** - a grid of streets returns *one* ring around the whole grid, with the blocks inside it rather than carved out of it. Two disconnected clusters return one ring each.
- Raw outlines carry every vertex of the road meshes they were traced from. Use Facet Angle to thin them; `0` keeps every point.
- Writes `SA_IslandIndex`, `SA_IslandArea`, and `SA_SourceActor`.

### SA Get Facade Frames

- **Input:** none. **Output:** `Facade Frames` (Point).
- **Settings:** Actor Selector; U Spacing; U Distribution (Per Segment/Whole Run); V Mode (By Spacing/Per Floor Row); V Spacing or Per Floor Height Fraction; Sides (Left/Right/Both/Exterior/Interior); U start/end and V bottom/top margins; Wall Width Override.
- Points face outward through local +X and carry fitted cell bounds. Reads standalone Walls, connected stacks, and every Building Wall layer. Openings are not excluded.

### SA Sample Floor/Roof

- **Input:** none. **Output:** `Points` (Point).
- **Settings:** Actor Selector, Include Floors, Include Roofs, optional Preset Row filter, Max Surface Slope, Point Spacing, Max Samples Per Surface.
- Samples upward-facing Wall/Building/Curve surface triangles and emits floor/roof, top-floor, material, slope, preset, and source attributes.

## Polygon and lot transforms

### SA Subdivide Lots

- **Input:** `Lot Boundaries` (Spline or Polygon 2D). **Outputs:** `Sub-Lot Boundaries` (Spline), `Lot Surfaces` (Dynamic Mesh), `Ground Surface` (Surface), `Cut Lines` (Spline), `Cut Junctions` (Point), `Gap Outlines` (Spline), `Sub-Lot Polygons 2D`, `Gap Outline Polygons 2D`.
- **Settings:** Lot Target Area, Max Subdivisions, Cut Mode (Angled/Straight), Irregularity, Gap, Knockout, Boundary Filter (All/Exterior/Interior), Seed, Elevation Mode (Follow Elevation/Flatten to Lowest Boundary/Flatten to Highest Boundary), Emit Surfaces, Ground Surface Spacing, Ground Surface Smoothing Iterations.
- Reconstructs each child boundary's terrain Z first. A flattening mode then uses that child's own lowest or highest boundary point, so neighboring children can resolve to different flat elevations.
- The emitted boundary spline, Dynamic Mesh, and Ground Surface always use the same child elevation. The node is deterministic for a fixed seed and carries source/material provenance when the input provides it.
- **Cut Lines** are the division lines between sub-lots as open two-point splines; **Cut Junctions** are the points where those lines meet each other or the lot edge. With **Gap** above zero, each cut becomes an alley: Cut Lines carry the alley centreline and `SA_CutGap`, and **Gap Outlines** emits the whole alley network as one closed shape, with `SA_TouchesBoundary` per point marking alley mouths and `SA_IsHole` on loops around fully enclosed lots.
- Holes in a Polygon 2D input are **subtracted**: nothing is built inside them, straddling sub-lots are clipped, and cut lines stop at their edge. A hole-free input behaves exactly as before.
- Sub-lots inherit every Data-domain attribute of the parent lot, so `SA_LotZone` and friends survive the subdivision. See [attribute inheritance](/pcg/metadata-reference#attribute-inheritance-through-transforms) for which values describe the sub-lot and which still describe its parent.

### SA Polygon Offset

- **Input:** `Polygons` (Spline or Polygon 2D). **Outputs:** `Offset Polygons` (Spline), `Offset Polygons 2D` (Polygon 2D).
- **Settings:** signed Offset, Ground Surface Spacing, Ground Surface Smoothing Iterations.
- Negative insets and positive outsets closed 2D polygons. A large inset may split into multiple outputs or collapse completely. Writes `SA_Offset` and carries `SA_SourceActor` when present.
- Holes are offset **with** the outline - an inset grows them, an outset shrinks them. On the spline pin, loops enclosing an empty area are flagged `SA_IsHole`; on the Polygon 2D pin they are real holes.

### SA Polygon Merge

- **Input:** `Polygons` (Spline or Polygon 2D). **Outputs:** `Merged Polygons` (Spline), `Merged Polygons 2D` (Polygon 2D). **Settings:** none.
- Unions touching/overlapping closed polygons into islands; disjoint inputs stay separate. Writes `SA_IslandIndex`.
- The spline pin carries each island's **outer ring only**. An empty area enclosed by the merge survives as a real hole on the Polygon 2D pin.
- An attribute survives the merge only when **every** input agrees on it; values that differ, such as `SA_LotIndex` and `SA_LotArea`, are dropped.

### SA Polygon From Points

- **Input:** `Points` (Point, multiple connections allowed). **Outputs:** `Polygons` (Spline), `Polygons 2D` (Polygon 2D).
- **Settings:** Connect Distance Scale, Connect Distance, Default Cell Size, Expand, Simplify Tolerance, Min Area, Keep Holes.
- Traces an outline **around** a cloud of points - the footprint of a roof scan, a sampled region, a building's own points from a loop. Each connected input dataset is outlined on its own, so a loop's per-building output stays per building.
- Points join into one shape when their bounds are within reach of each other. **Connect Distance Scale** `1` means bounds must touch edge to edge; the default `1.5` also joins the diagonal neighbours of a regular grid. Raise it if one region breaks into several shapes, lower it if separate buildings bridge together. **Connect Distance** overrides the rule outright - about twice the sampler spacing is a good start.
- The raw outline runs through the outermost points, roughly half a sample spacing inside the real edge; **Expand** pushes it back out. **Simplify Tolerance** of about a third of the sample spacing removes the zigzag of scattered samples; a regular grid already comes out clean at `0`.
- **Min Area** drops stray islands. Turn **Keep Holes** off when gaps are sampling noise rather than real openings.
- Shapes come back largest first and are deterministic for a given input. Writes `SA_IslandIndex`, `SA_PointCount`, and `SA_IsHole`, and carries through every input attribute whose value is the same on all of that dataset's points.

### SA Polygon 2D To Spline

- **Input:** `Polygons` (Polygon 2D, multiple connections allowed). **Output:** `Splines` (Spline).
- **Settings:** Include Holes, Z Offset.
- The inverse of stock **Create Polygon 2D**: turns Polygon 2D data back into closed splines so the result of Polygon 2D Operation, Offset Polygon 2D, or Clip Paths can reach spline-only nodes.
- Each outline becomes one closed Linear spline, flat at the polygon's plane plus **Z Offset**.
- **Include Holes is off by default.** A hole emitted as its own spline would read as a second footprint downstream - SA Spawn Building would build inside it. Turn it on only when the next node should see the holes, and filter on `SA_IsHole`, which is written on every output (`false` on outlines) so the filter always finds the attribute.

## SA generation nodes

### SA Spawn Building

- **Input:** `Footprints` (Polyline). **Outputs:** `Generated` (Point), `Dynamic Meshes` (Dynamic Mesh).
- **Preset Source = Single Preset:** uses a Building DataTable row, falling back to the inline Building Preset when the row is unset or cannot resolve. This is the default and preserves existing graphs.
- **Preset Source = Random From DataTable:** chooses independently for every footprint from **Building Preset DataTable**. Every matching row has equal probability, selection is with replacement, and fixed graph/footprint seeds repeat.
- **Filter Terms:** empty includes every Building row. Otherwise, each term matches an exact Building **Preset Tag** or—when **Include Row Names** is enabled (default)—a case-insensitive row-name substring.
- **Term Match Mode:** **All** (default) requires every term; **Any** requires at least one. Referenced Wall Preset tags do not classify a Building row for this query.
- Candidate rows are sorted by row name before deterministic selection, so DataTable insertion order does not change the result. An invalid/wrong-struct table or a filter with no matches warns once and produces no output.
- **Other settings:** Output; Attach Options for Actors mode.

### SA Spawn Wall / SA Spawn Curve

- **Input:** `Splines` (Polyline). **Outputs:** `Generated` (Point), `Dynamic Meshes` (Dynamic Mesh).
- **Settings:** matching DataTable row or inline preset; Output; Attach Options for Actors mode.

For **SA Spawn Wall** and **SA Spawn Curve**, and for **SA Spawn Building** in Single Preset mode, a valid DataTable row wins; an unresolved configured row warns and falls back to the inline preset. Output modes:

| Output | Generated pin | Dynamic Meshes pin |
| --- | --- | --- |
| **Data** | One point per static piece with transform, bounds, `SA_Mesh`, source data, and `SA_PresetTags`. | One world-oriented Dynamic Mesh per non-static piece with applicable preset-tag metadata. |
| **Components** | One point carrying `SA_SpawnedActor` and top-level `SA_PresetTags`; the container actor and harvested components retain their applicable tags. | Empty. |
| **Actors** | One point carrying `SA_SpawnedActor` and top-level `SA_PresetTags`; actors remain PCG-managed and respect Attach Options. | Empty. |

Building-generated pieces carry Building Preset tags plus the exact Wall Preset tags that produced that component. Standalone Wall pieces carry their Wall Preset tags. Curve presets have no authored preset tags, so their array is empty. Generated datasets also carry applicable PCG data tags for **Filter Data By Tag**.

### SA Spawn Dynamic Mesh

- **Input:** `In` (Dynamic Mesh, **required**). **Output:** `Out` (Dynamic Mesh) - the inputs forwarded unchanged, tags included, so the node can sit mid-graph.
- **Settings:** Generate Collision (on by default), Collision Profile (`BlockAll` by default), Use Async Collision Cooking (advanced).
- Stock PCG's Spawn Dynamic Mesh always places its meshes with **no collision**, so a PCG-built floor, terrace, roof, or SA lot surface is scenery the player falls through. This node is the same spawner with a collision section added.
- Collision uses the mesh's own triangles, so there is no simple shape to author. Feed it the `Lot Surfaces` output of SA Get Lots or SA Subdivide Lots, or the `Dynamic Meshes` pin of any SA spawn node.
- **Two limits worth knowing before you rely on it.** AI navigation never builds a navmesh from dynamic meshes, whatever the collision setting says. And the engine silently drops complex collision above `geometry.DynamicMesh.MaxComplexCollisionTriCount` (250,000 triangles by default) - over that line the mesh is placed with no collision and the node warns, naming both numbers.
- **Target Actor** is not in the details panel; it is set through a graph override. Left unset, meshes go to the actor the graph runs on.

### SA Landscape Patch

- **Inputs:** `Areas` (Spline or Polygon 2D), `Paths` (Curve), `Props` (Point). **Output:** `Patched Shapes`.
- Deforms the landscape to match shapes from the graph - flattened lots, walkway ribbons, level pads under props - with edge fade, noise, and optional paint layers.
- Editor-only, and the only SA node that changes the world rather than just producing data. See the [full page](/pcg/landscape-patch) for its settings, the upstream selector scoping it requires, and how Settle Props keeps regeneration from looping.

## Prop and point tools

### SA Edge Placer

- **Input:** `Edges` (Polyline). **Output:** `Props` (Point).
- **Settings:** weighted Mesh/Actor Class Pool; Side (Center/Left/Right); Facing (Toward/Away/Along); Fill (Packed/Fixed/Random); conditional gap/spacing range; Lateral Offset; Z Offset; Edge Sample Spacing; normal PCG Seed.
- Each pool entry must define exactly one Mesh or Actor Class. Emits `SA_Mesh` or `SA_Actor` and exact local bounds.

### SA Pick From Pool

- **Input:** `Points` (Point). **Output:** `Picked Points` (Point).
- **Settings:** weighted Pool and Set Bounds; normal PCG Seed.
- Preserves input transforms/attributes, assigns `SA_Mesh` or `SA_Actor`, and optionally replaces point bounds with true mesh or actor collision/render bounds.

### SA Prune Footprints

- **Input:** `Points` (Point). **Output:** `Survivors` (Point).
- **Settings:** Area Similarity Factor, Max Overlap Ratio, normal PCG Seed.
- Keeps larger rotated plan-view footprints first; near-equal areas use deterministic tie-breaking. `0` overlap tolerance prunes any positive intersection. Attributes pass through.

### SA Orient To Spline

- **Inputs:** `Points` (Point), `Splines` (Curve). **Output:** `Oriented Points` (Point).
- **Settings:** Axis (+/-X, +/-Y, +/-Z), Yaw Only, Aim Away, Target Sample Spacing.
- Changes rotation only, preserves other point data, and adds `SA_DistanceToSpline`. Yaw Only uses horizontal distance and keeps props upright.

### SA Filter Spline Edges

- **Input:** `Splines` (Spline). **Outputs:** `Flagged` (Spline), `Unflagged` (Spline).
- **Setting:** Edge Flag Attribute (`SA_TouchesBoundary` by default).
- Found under **Filter** in the node palette, not Spatial.
- Splits each spline by a per-point boolean and gives back **splines, not points**, so the result still feeds SA Edge Placer, SA Landscape Patch's `Paths`, Spline Sampler, or Create Surface. The flag is read on the point each edge *starts* at.
- Consecutive edges on the same side stay one spline, and a closed loop whose edges all land on the same side stays closed.
- Its main use is SA Subdivide Lots' `Gap Outlines`: `Unflagged` is the alley sides, for trees and lanterns; `Flagged` is the alley mouths on the lot edge, for bollards.
- A spline without the named attribute sends every edge to `Unflagged`, and the node warns once.

### SA Set Custom Piece

- **Input:** `Points` (Point). **Output:** `Piece Points` (Point) - every point passes through, nothing is filtered.
- **Settings:** Preset (a Custom Piece Preset row), Apply Radius, Radius, Apply To All In Range.
- Marks scattered points as custom pieces so **SA Spawn Wall** and **SA Spawn Curve** can place gates, doors, corner posts, or crossings where the points fall. Wire its output into their `Custom Pieces` pin; union several of these first to mix piece types on one pin.
- **How a point finds its wall:** a run counts if its spline passes through the point's box **seen from above**. Height plays no part, which is what makes a flat scatter work over hilly ground - and means a merely taller point gains no extra reach. The box turns with the point, so a long thin point reaches far along its length and barely across it.
- Among the runs in reach the **closest one wins**, unless **Apply To All In Range** is on, in which case every run in reach gets a piece. That is the difference between a gate, which must not appear in two fences at once, and a junction point that should give all four sidewalks a curb ramp.
- Turn **Apply Radius** off for points that already carry their own footprint, such as SA Get Intersections or SA Get Lots output - their real shape and facing becomes the reach. A point with no size at all falls back to the nearest run at any distance.
- Points that reach nothing are simply unused, with no warning. With a level-wide scatter that is the normal majority.
- Curves only build Segment pieces; a Corner preset fed to SA Spawn Curve is placed as a Segment piece and the node says so once.

## Polygon 2D interop

SA shapes and stock PCG **Polygon 2D** data are interchangeable in both directions, so an SA lot can go through Polygon 2D Operation, Offset Polygon 2D, or Clip Paths and come back.

**Taking Polygon 2D in.** Four pins accept it explicitly: SA Subdivide Lots' `Lot Boundaries`, SA Polygon Merge's and SA Polygon Offset's `Polygons`, and SA Landscape Patch's `Areas`. Pins typed **Curve** also accept it, even though the label does not say so - that covers SA Landscape Patch's `Paths`, SA Edge Placer's `Edges`, and the `Splines`/`Footprints` inputs of the three spawn nodes.

**Giving Polygon 2D out.** Seven nodes carry an extra `... Polygons 2D` pin beside their spline output: SA Get Lots, SA Get Intersections, SA Get Network Boundary, SA Polygon Offset, SA Polygon Merge, SA Polygon From Points, and SA Subdivide Lots (twice, for sub-lots and gap outlines). Both pins are built from the same result, so they can never disagree. Wiring one of these pins takes effect immediately - there is no need to force the node to rebuild.

**Holes.** A Polygon 2D has real holes; a spline cannot, so on a spline pin a hole comes out as its own closed spline flagged `SA_IsHole`. Outlines are flagged `false` rather than left unflagged, so a **Filter Data By Attribute** on `SA_IsHole` always finds the attribute. What a hole *does* depends on the node:

| Node | What holes do |
| --- | --- |
| SA Subdivide Lots | **Subtracted.** Nothing is built inside them; straddling sub-lots are clipped and cut lines stop at the edge. |
| SA Polygon Offset | Offset **with** the outline - an inset grows them, an outset shrinks them. |
| SA Polygon Merge | Kept as real holes on the Polygon 2D pin; the spline pin carries outer rings only. |
| SA Landscape Patch `Areas` | **Filled, not carved.** The whole outline is patched, and the node warns. |
| SA Landscape Patch `Paths` | One loop band per ring - the outline and each hole. |
| SA Spawn Building / Wall / Curve | Ignored. A hole is never chained into the footprint. |

**Two conventions worth knowing.** SA rings are world-space with real per-vertex Z and wind **clockwise**; PCG polygons are flat on a plane transform with the outer ring counter-clockwise. The nodes convert both ways for you. Every SA polygon sits on a plane parallel to the ground, so when mixing SA and stock shapes in a **Polygon 2D Operation**, put the SA polygon **first** - stock ops flatten everything onto the first polygon's plane.

**Why your seeds stay stable.** Reading a polygon rotates its vertices so the same corner is always first. SA derives each lot's seed from its first vertex, so without that rule inserting an unrelated Polygon 2D Operation upstream would renumber every ring and re-randomize the whole city on the next regeneration.

## Common graph failures

| Symptom | Check |
| --- | --- |
| Getter outputs nothing | UE 5.8 package is installed; Actor Selector finds the intended actor; PCG bounds include it; source actor has regenerated valid data. |
| Lots missing | Streets form closed blocks; Output Mode is Generate; empty lots are included while debugging; Facet Angle is not over-simplifying. |
| Building node has points but no meshes | Static Mesh Spawner uses **By Attribute → `SA_Mesh`**; Dynamic Meshes is wired separately; preset row resolves to the correct struct. |
| Random Building table produces nothing | Preset Source is Random From DataTable; the table uses the Building Preset row struct; every All-mode term matches; row-name matching is enabled when relying on row substrings. |
| Preset tag filter finds nothing | Use the exact authored Name in `SA_PresetTags`; use Array Contains before Attribute Filter for individual pieces, or Filter Data By Tag for complete outputs. |
| Prop pool warns or drops entries | Each entry defines exactly one Mesh or Actor Class and has positive weight. |
| Props overlap on slopes | Pick exact bounds, then use **SA Prune Footprints** instead of stock 3D Self Pruning. |
| Facade points cross corners | Use U Distribution = Per Segment. |
| Exterior facade side appears reversed | Fix closed spline winding or use Left/Right explicitly. Open paths treat Exterior/Interior as Both. |
| Offset removes a lot | The negative inset is larger than the narrowest viable region; reduce it or filter small `SA_LotArea` first. |
| Zone filter is stale | Move/edit Lot Zone, rebuild Streets, then regenerate the PCG graph. |
| The editor never settles; the graph regenerates forever | A world-reading node upstream is left at **By Class, Actor**, so it tracks every actor - including the ones SA spawns and the landscape SA Landscape Patch writes to. Tag the source actor and select **By Tag**. |
| A `... Polygons 2D` pin gives nothing | The shape must be closed, and its plane must not be near-vertical; both are rejected on read. |
| A spawned Dynamic Mesh has no collision | Generate Collision is off, or the mesh is over the 250,000-triangle complex-collision cap (the node warns). Navigation never sees dynamic meshes either way. |
| A custom piece never appears | The run's spline must pass through the point's bounds *in plan view*; height is ignored. Check Radius, and whether the point has any size at all. |
| Holes appear as extra buildings or footprints | SA Polygon 2D To Spline has **Include Holes** on. Turn it off, or filter on `SA_IsHole`. |
