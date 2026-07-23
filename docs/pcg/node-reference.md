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

- **Input:** `Lot Boundaries` (Spline). **Outputs:** `Lot Boundaries` (Spline), `Lot Surfaces` (Dynamic Mesh), `Ground Surface` (Surface).
- **Settings:** Lot Target Area, Max Subdivisions, Cut Mode (Angled/Straight), Irregularity, Gap, Knockout, Boundary Filter (All/Exterior/Interior), Seed, Elevation Mode (Follow Elevation/Flatten to Lowest Boundary/Flatten to Highest Boundary), Emit Surfaces, Ground Surface Spacing, Ground Surface Smoothing Iterations.
- Reconstructs each child boundary's terrain Z first. A flattening mode then uses that child's own lowest or highest boundary point, so neighboring children can resolve to different flat elevations.
- The emitted boundary spline, Dynamic Mesh, and Ground Surface always use the same child elevation. The node is deterministic for a fixed seed and carries source/material provenance when the input provides it.

### SA Polygon Offset

- **Input/Output:** `Polygons` (Spline).
- **Settings:** signed Offset, Ground Surface Spacing, Ground Surface Smoothing Iterations.
- Negative insets and positive outsets closed 2D polygons. A large inset may split into multiple outputs or collapse completely. Writes `SA_Offset` and carries `SA_SourceActor` when present.

### SA Polygon Merge

- **Input/Output:** `Polygons` (Spline). **Settings:** none.
- Unions touching/overlapping closed polygons into islands; disjoint inputs stay separate. Writes `SA_IslandIndex`. `SA_SourceActor` survives only when every input agrees.

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

## Prop and point tools

### SA Edge Placer

- **Input:** `Edges` (Polyline). **Output:** `Props` (Point).
- **Settings:** weighted Mesh/Actor Class Pool; Side (Center/Left/Right); Facing (Toward/Away/Along); Fill (Packed/Fixed/Random); conditional gap/spacing range; Lateral Offset; Z Offset; Edge Sample Spacing; normal PCG Seed.
- Each pool entry must define exactly one Mesh or Actor Class. Emits `SA_Mesh` or `SA_Actor` and exact local bounds.

### SA Pick From Pool

- **Input/Output:** `Points` (Point).
- **Settings:** weighted Pool and Set Bounds; normal PCG Seed.
- Preserves input transforms/attributes, assigns `SA_Mesh` or `SA_Actor`, and optionally replaces point bounds with true mesh or actor collision/render bounds.

### SA Prune Footprints

- **Input/Output:** `Points` (Point).
- **Settings:** Area Similarity Factor, Max Overlap Ratio, normal PCG Seed.
- Keeps larger rotated plan-view footprints first; near-equal areas use deterministic tie-breaking. `0` overlap tolerance prunes any positive intersection. Attributes pass through.

### SA Orient To Spline

- **Inputs:** `Points` (Point), `Splines` (Polyline). **Output:** `Points` (Point).
- **Settings:** Axis (+/-X, +/-Y, +/-Z), Yaw Only, Aim Away, Target Sample Spacing.
- Changes rotation only, preserves other point data, and adds `SA_DistanceToSpline`. Yaw Only uses horizontal distance and keeps props upright.

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
