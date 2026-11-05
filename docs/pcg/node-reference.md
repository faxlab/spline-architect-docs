---
title: SA PCG node reference
description: Pins, settings, outputs, attributes, and spawn modes for every Spline Architect PCG node in UE 5.8.
---

All SA nodes require the UE 5.8 Spline Architect package. Actor-reading nodes evaluate live level state and are intentionally refreshed rather than serving stale cached geometry.

## Baked sources

Keep the SA source actor when PCG needs its floor/roof identity, Streets graph, or facade recipe. Baking that actor preserves those workflows. [Converting to independent output](/production/conversion-export) creates plain actors, meshes, or Blueprints; use stock PCG geometry sampling for those outputs. SA readers require the retained SA actor and do not reconstruct its authoring identity from a converted mesh.

| Reader | Baked workflow |
| --- | --- |
| SA Sample Floor/Roof | Reads baked Wall/Building/Curve slabs with Components, Instanced, or Hierarchical Instanced output. Older bakes need one rebake to retain surface identity and the geometry needed for sampling in cooked games. |
| Streets readers | Lots, road edges/centerlines, intersections, crossings, and network boundaries remain available on baked Networks. Required data is restored on the first read after a game-level load, preserving baked mesh components. |
| SA Get Spline / SA Get Facade Frames | Read the retained authored paths and current preset settings. Changing a shared preset without rebaking can make facade points differ from frozen mesh geometry. |

SA readers exclude actors managed by PCG spawn nodes to prevent generation feeding back into itself. Bake state does not remove that exclusion.

## Actor and Streets readers

### SA Get Spline

- **Input:** none. **Output:** `Splines` (Spline).
- **Settings:** Actor Selector; Actor Type Filter bitmask; optional Preset Table + Row filter; Write Semantic Attributes.
- Reads effective generation paths—not just raw Spline Components—including borrowed/stacked splines, multi-spline polygon modes, inset/reversal, mirror expansion, and stack offsets.
- Emits actor/path semantics listed in [metadata](/pcg/metadata-reference#effective-spline-attributes).
- On a Building that holds [map footprints](/core-actors/building#several-footprints-on-one-building), each footprint is its own path with its own seed and, when it has one, its own style in `SA_Preset`. Those paths also carry `SA_Footprint` and `SA_TargetHeight`.

### SA Get Lots

- **Input:** none. **Outputs:** `Lot Boundaries` (Spline), `Lot Surfaces` (Dynamic Mesh), `Ground Surface` (Surface), `Lot Points` (Point), `Lot Polygons 2D` (Polygon 2D).
- **Settings:** Actor Selector; Include Empty Lots (on); Facet Angle (`5` degrees, `0` keeps every point, boundaries only); Emit Lot Surfaces (on); Emit Lot Points (off); Ground Surface Spacing (`400` world units, at least `50`) and Ground Surface Smoothing Iterations (`200`, at most `200`), which only affect lots with no visible mesh.
- `Lot Boundaries` is one closed boundary per hole-free Streets lot. `Lot Surfaces` and `Ground Surface` are the top of each lot exactly as its mesh shows it, with the sidewalk, corner pads and curb height included, so props stand on what you see. Where layers overlap, the highest wins. A lot with no visible mesh gets a smoothed estimate from its edges instead. All of them use the effective default/per-lot Streets Elevation Mode.
- `Lot Points` is one point per hole-free lot, and stays empty until **Emit Lot Points** is ticked. The point sits at the lot's centre with its +X axis facing the lot's main street frontage, so a Building spawned on it addresses the street with no extra turning. Its bounds are the lot's whole footprint in that frame, at least 2 m tall. It carries the lot attributes and is seeded from `SA_LotSeed`.
- `Lot Polygons 2D` is every lot region complete, holes included: one polygon per connected piece, flat at the average height of its outer ring. Its vertices carry the street attributes `SA_StreetFacing`, `SA_AtIntersection`, `SA_IntersectionNode`, `SA_StreetConfigIndex` and `SA_RoadWidth`. It is built only while its pin is wired. Use `Lot Surfaces` or `Ground Surface` when the real ground height matters.
- **Lots with holes:** a spline cannot describe an island inside a lot, and one building box would cover it. A region that contains holes is left out of `Lot Boundaries` and `Lot Points`, and the node warns with how many it skipped. `Lot Polygons 2D` and the surfaces keep the whole region. Run the polygon through SA Subdivide Lots to get building parcels.
- Reading the surfaces is the node's slowest step on a big baked map, where they must be solved again once. It is skipped while nothing is wired to `Lot Surfaces` or `Ground Surface`, so unwire both when a graph only needs boundaries.
- Every lot carries `SA_MapBuildingCoverage`: the share of the lot, from 0 to 1, that imported [map buildings](#sa-get-map-buildings) already stand on. Overlaps count once and holes are excluded. Filter on it to keep generated buildings off land that real buildings cover.

### SA Get Map Buildings

- **Input:** none. **Outputs:** `Footprints` (Spline), `Footprint Polygons 2D` (Polygon 2D).
- **Settings:** Actor Selector, Import Group, Kinds.
- Reads the building footprints a [map import](/core-actors/import-map#buildings) brought into the level: one closed outline per footprint, at ground height, with its height, style, kind and name. Wire `Footprints` into SA Spawn Building to build them with PCG. Use `Footprint Polygons 2D` for polygon operations, such as keeping other content away from real buildings.
- **Actor Selector** defaults to **By Tag** with the tag `SA_MapBuilding`, which every Building a map import owns carries. The node tracks only those tagged actors, never every Building, so a graph that also spawns Buildings does not keep re-running itself. A copy you make of an imported Building loses the tag and is not read.
- **Import Group** limits the node to one import; leave it empty to read every import in the level. **Kinds** limits it to kinds such as House or Office; leave it empty to read every kind.
- Both outputs carry the [map building attributes](/pcg/metadata-reference#map-buildings) on the Data domain: the height to fit, the style, the map id, name, kind, height source and tags. A footprint from a **Footprints only** import has a height but no style.
- Footprints come out ordered by actor name, then footprint name, so the order is the same on every run.

### SA Get Map Areas

- **Input:** none. **Outputs:** `Area Polygons 2D` (Polygon 2D), `Area Surfaces` (Dynamic Mesh), `Area Boundaries` (Spline).
- **Settings:** Actor Selector, Import Group, Categories, Emit Surfaces, Emit Boundaries, Exclude Crop Edges From Boundaries.
- Reads the [Map Area](/core-actors/import-map#map-area-actors) actors a map import created: the woodland, parks, water, farmland and other land of a real place. Every part of an area comes out as one complete Polygon 2D with its holes, so a lake with an island stays a lake with an island. A Map Area whose outline is not valid (**Geometry Valid** is off) is skipped.
- **Actor Selector** defaults to every Map Area in the level. The node tracks only the Map Area and Map Import Group classes, so an unrelated actor changing never re-runs it.
- **Import Group** limits the node to the areas of one Map Import Group. Leave it empty to read every group, plus areas you duplicated out of a group. **Categories** lists the [land-area categories](/core-actors/import-map#land-area-categories) to read, by the names in the **Category** column. Leave it empty to read all of them.
- `Area Polygons 2D` is built whenever its pin is wired. `Area Surfaces` is the interior as a flat Dynamic Mesh with every hole cut out, ready for Mesh Sampler. It needs **Emit Surfaces** (on by default) and a wired pin. `Area Boundaries` is the outline as splines, one for the outer edge and one per hole, for placing things along the edge of an area. It needs **Emit Boundaries** (on by default) and a wired pin.
- **Exclude Crop Edges From Boundaries** (on by default): the import cuts areas off at the boundary you drew, and those cuts are not edges on the map. With this on, `Area Boundaries` leaves them out and gives each stretch of real edge as an open spline, so a hedge or fence never runs along the cut. A ring with no cut stays one closed spline. `Area Polygons 2D` and `Area Surfaces` stay closed and complete either way, and every vertex and spline point carries `SA_IsCropEdge` to tell the two kinds of edge apart.
- Every output carries the [map area attributes](/pcg/metadata-reference#map-areas) on the Data domain: category, source id and type, name, tags and import group. An area with several parts comes out as several shapes, numbered by `SA_MapAreaPartIndex` out of `SA_MapAreaPartCount`. A hole's outline carries `SA_IsHole`, on its points and on the Data domain.

### SA Get Intersections

- **Input:** none. **Outputs:** `Intersection Boundaries` (Spline), `Intersection Surfaces` (Surface), `Intersection Centers` (Point), `Intersection Polygons 2D` (Polygon 2D).
- **Settings:** Actor Selector; Emit Surfaces (on); Emit Intersection Points (off).
- `Intersection Boundaries` is one closed perimeter per resolved Streets junction surface, with `SA_IntersectionNode` and `SA_SourceActor`. Nearby connected junctions share one surface. A median hole gets its own spline flagged `SA_IsHole`, and every perimeter of a region with holes carries `SA_HasHoles`. Those perimeters are for placement along the edge, not solid building footprints: use the Polygon 2D or the surface for the complete area.
- `Intersection Surfaces` is the junction interior as a top-down Surface with median holes left open, ready for Surface Sampler.
- `Intersection Centers` is one point in the middle of each intersection, sized to that crossing's own footprint (a big junction gets a big point, a small T a small one) and at least 2 m tall. It carries `SA_IntersectionNode` and `SA_SourceActor`, and its seed comes from the junction itself, so moving the network never re-rolls what the points spawn. Use it to drop one thing per junction, such as a traffic light or a manhole, or feed it to SA Set Custom Piece with **Apply Radius** off so every sidewalk through the junction gets a curb ramp. It stays empty until **Emit Intersection Points** is ticked.
- `Intersection Polygons 2D` is the boundaries as Polygon 2D data, flat at each shape's average height, with the same attributes. Use the spline pin when the ground matters.

### SA Get Road Edges

- **Input:** none. **Output:** `Road Edges` (Spline).
- **Setting:** Actor Selector.
- Emits left/right open pavement borders with corridor, side, and source attributes.

### SA Get Road Centerlines

- **Input:** none. **Outputs:** `Road Centerlines` (Spline), `Road Footprint` (Spline), `Road Footprint Polygons 2D` (Polygon 2D).
- **Settings:** Actor Selector, Width Padding.
- `Road Centerlines` is one open spline per resolved corridor plus cumulative per-point distance (`SA_DistanceAlongSpline`). Each carries `SA_CorridorIndex`, `SA_SourceActor`, `SA_RoadWidth`, `SA_ConfigIndex` and `SA_Raised`.
- The two **Road Footprint** pins are the road surface itself, for "is this point on a road?" tests. They hold one shape per road corridor plus one per junction, because corridors stop at the junction mouths. The shapes overlap at the joins on purpose, so a point is on a road when it is inside any of them. Each pin is built only while it is wired.
- `Road Footprint` holds closed splines for hole-free shapes. A region with a hole, such as a roundabout with its island, is left out of it, because one filled spline would cover the island. `Road Footprint Polygons 2D` keeps those regions complete, with median and roundabout holes.
- **Width Padding** (world units, 100 = 1 m, default `0`) grows both footprint pins all the way round, and shrinks the holes of `Road Footprint Polygons 2D`. One test then clears everything on the road and within that distance of it, such as trees, props and buildings off the kerb. Negative values count as `0`: the road never shrinks. Only the footprints change - `Road Centerlines` and `SA_RoadWidth` always report the real road.
- Each footprint shape carries `SA_CorridorIndex`, `SA_IntersectionNode`, `SA_RoadWidth`, `SA_ConfigIndex`, `SA_SourceActor` and `SA_Raised`, with the index that does not apply set to `-1`. `SA_Raised` is true on bridge decks, their ramps, and junctions where only raised roads meet. Filter it out to keep ground scatter from clearing the ground under a bridge.

### SA Get Road Crossings

- **Input:** none. **Output:** `Road Crossings` (Spline).
- **Setting:** Actor Selector.
- Emits a two-point spline across each road/intersection attachment with road width, config index and `SA_NodeDegree` (how many roads meet there).

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
- On a Building that holds map footprints, each footprint's frames use that footprint's own style and fitted floors, and carry `SA_Footprint`. When no footprint has a style with walls, the node warns: give the Building or its footprints a style before sampling facades.

### SA Sample Floor/Roof

- **Input:** none. **Output:** `Points` (Point).
- **Settings:** Actor Selector, Include Floors, Include Roofs, optional Preset Row filter, Max Surface Slope, Point Spacing, Max Samples Per Surface.
- Samples upward-facing triangles on live or baked Wall/Building floors and roofs, and Curve floors. Reads each baked instance at its world transform; material attributes follow the sampled triangle and component overrides.
- `SA_IsTopFloor` selects the highest included sampled floor level **per actor**. It is intended for flat floors, including a roof authored as a floor. It does not identify exposed exterior surfaces, and generated roofs have `SA_IsTopFloor = false`.
- **Point Spacing** is the Poisson radius in world centimeters: use half the desired minimum distance between point centers. Sampling applies independently to source meshes/instances. **Max Samples Per Surface** caps coverage and warns when reached.
- See [rooftop scatter](/pcg/recipes#rooftop-scatter) and the exact [sample attributes](/pcg/metadata-reference#floor-and-roof-samples).

## Polygon and lot transforms

### SA Subdivide Lots

- **Input:** `Lot Boundaries` (Spline or Polygon 2D). **Outputs:** `Sub-Lot Boundaries` (Spline), `Lot Surfaces` (Dynamic Mesh), `Ground Surface` (Surface), `Cut Lines` (Spline), `Cut Junctions` (Point), `Gap Outlines` (Spline), `Sub-Lot Polygons 2D`, `Gap Outline Polygons 2D`.
- **Settings:** Lot Target Area, Max Subdivisions, Cut Mode (Angled/Straight), Irregularity, Gap, Knockout, Boundary Filter (All/Exterior/Interior), Seed, Local Seed Offset (advanced, `1337`, an extra salt - the standard Seed is the main control), Elevation Mode (Follow Elevation/Flatten to Lowest Boundary/Flatten to Highest Boundary), Emit Surfaces, Ground Surface Spacing, Ground Surface Smoothing Iterations.
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

- **Input:** `Footprints` (Curve). **Outputs:** `Generated` (Point), `Actor Pieces` (Point), `Dynamic Meshes` (Dynamic Mesh).
- **Cost:** this generates every piece of every building it is given, every time the graph regenerates. Use it where the detail shows. For a whole city, instance finished building meshes instead - see [filling lots with buildings](/pcg/streets-city-tutorial#6-fill-the-lots-with-buildings).
- **Preset Source = Single Preset:** uses a Building DataTable row, falling back to the inline Building Preset when the row is unset or cannot resolve. This is the default and preserves existing graphs.
- **Preset Source = Random From DataTable:** chooses independently for every footprint from **Building Preset DataTable**. Every matching row has equal probability, selection is with replacement, and fixed graph/footprint seeds repeat.
- **Filter Terms:** empty includes every Building row. Otherwise, each term matches an exact Building **Preset Tag** or—when **Include Row Names** is enabled (default)—a case-insensitive row-name substring.
- **Term Match Mode:** **All** (default) requires every term; **Any** requires at least one. Referenced Wall Preset tags do not classify a Building row for this query.
- Candidate rows are sorted by row name before deterministic selection, so DataTable insertion order does not change the result. An invalid/wrong-struct table or a filter with no matches warns once and produces no output.
- **Use Input Style** (on by default): builds each footprint in the style it carries, when it carries one - the `SA_PresetRow` and `SA_PresetTable` attributes that [SA Get Map Buildings](#sa-get-map-buildings) writes, naming a Building preset row. An input's style wins over Single Preset and Random From DataTable alike. Footprints without a style use this node's preset. A style row that is not a Building preset warns, and those footprints use this node's preset too. Turn the setting off to give every footprint this node's preset.
- **Fit Input Height** (on by default): fits each building's floors to the height its footprint carries, when it carries one - the `SA_TargetHeight` attribute, in centimetres, that SA Get Map Buildings writes. The style's repeating section, the wall with a floor range, gets as many floors as fit the height, the same way a [map import](/core-actors/import-map#the-repeating-section) fits them. Footprints without a height keep the style's own floors.
- **Other settings:** Output; Attach Options for Actors mode.

### SA Spawn Wall / SA Spawn Curve

- **Inputs:** `Splines` (Curve), `Custom Pieces` (Point, optional). **Outputs:** `Generated` (Point), `Actor Pieces` (Point), `Dynamic Meshes` (Dynamic Mesh).
- **Settings:** matching DataTable row or inline preset; **Custom Piece Data Table** (the fallback table for the `Custom Pieces` pin, needed only when your points name a row by hand instead of coming from [SA Set Custom Piece](#sa-set-custom-piece)); **Custom Piece Preset Row Attribute** (the point attribute that names the row, `SA_PresetRow` by default); Output; Attach Options for Actors mode.

For **SA Spawn Wall** and **SA Spawn Curve**, and for **SA Spawn Building** in Single Preset mode, a valid DataTable row wins; an unresolved configured row warns and falls back to the inline preset. Output modes:

| Output | Generated pin | Actor Pieces pin | Dynamic Meshes pin |
| --- | --- | --- | --- |
| **Data** | One point per static piece with transform, bounds, `SA_Mesh`, source data, and `SA_PresetTags`. | One point per Blueprint or actor piece, with transform, bounds and `SA_ActorClass`. Wire it to the stock Spawn Actor node with **Spawn by Attribute** on and **Spawn Attribute** set to `SA_ActorClass`. | One world-oriented Dynamic Mesh per non-static piece with applicable preset-tag metadata. |
| **Components** | One point carrying `SA_SpawnedActor` and top-level `SA_PresetTags`; the container actor and harvested components retain their applicable tags. | Empty. | Empty. |
| **Actors** | One point carrying `SA_SpawnedActor` and top-level `SA_PresetTags`; actors remain PCG-managed and respect Attach Options. | Empty. | Empty. |

Building-generated pieces carry Building Preset tags plus the exact Wall Preset tags that produced that component. Standalone Wall pieces carry their Wall Preset tags. Curve presets have no authored preset tags, so their array is empty. Generated datasets also carry applicable PCG data tags for **Filter Data By Tag**.

### SA Spawn Dynamic Mesh

- **Input:** `In` (Dynamic Mesh, **required**). **Output:** `Out` (Dynamic Mesh) - the inputs forwarded unchanged, tags included, so the node can sit mid-graph.
- **Settings:** Generate Collision (on by default), Collision Profile (`BlockAll` by default), Use Async Collision Cooking (advanced), Post Process Function Names.
- **Post Process Function Names** is a hook for your own Blueprint fix-up pass: functions on the target actor that run once every mesh has been placed. Each must take no parameters and have **Call In Editor** enabled.
- Stock PCG's Spawn Dynamic Mesh always places its meshes with **no collision**, so a PCG-built floor, terrace, roof, or SA lot surface is scenery the player falls through. This node is the same spawner with a collision section added.
- Collision uses the mesh's own triangles, so there is no simple shape to author. Feed it the `Lot Surfaces` output of SA Get Lots or SA Subdivide Lots, or the `Dynamic Meshes` pin of any SA spawn node.
- **Two limits worth knowing before you rely on it.** AI navigation never builds a navmesh from dynamic meshes, whatever the collision setting says. And the engine silently drops complex collision above `geometry.DynamicMesh.MaxComplexCollisionTriCount` (250,000 triangles by default) - over that line the mesh is placed with no collision and the node warns, naming both numbers.
- **Target Actor** is not in the details panel; it is set through a graph override. Left unset, meshes go to the actor the graph runs on.

### SA Landscape Patch

- **Inputs:** `Areas` (Spline or Polygon 2D), `Paths` (Curve), `Props` (Point). **Output:** `Patched Shapes`.
- Deforms the landscape to match shapes from the graph - flattened lots, walkway ribbons, level pads under props - with edge fade and noise. It shapes the ground only. To paint a material layer, wire the same shapes into [SA Landscape Paint](#sa-landscape-paint).
- Editor-only. With SA Landscape Paint it is one of the two SA nodes that change the world rather than just producing data. See the [full page](/pcg/landscape-patch) for its settings, the upstream selector scoping it requires, and how Settle Props keeps regeneration from looping.

### SA Landscape Paint

- **Inputs:** `Areas` (Spline or Polygon 2D), `Paths` (Curve), `Props` (Point). **Output:** `Patched Shapes` (Point or Curve) - every input, passed through unchanged.
- Paints one of the landscape's material layers inside your shapes without changing the ground height: grass on a park lot, gravel on a trail, dirt under a tree. Use it alone, or wire the same shapes into SA Landscape Patch as well to flatten and paint a park. Each node has its own **Edge Fade**, so the paint can bleed further into the surroundings than the sculpt does.
- The three input pins turn shapes into paint exactly as SA Landscape Patch turns them into terrain: see [how each pin becomes a shape](/pcg/landscape-patch#how-each-pin-becomes-a-shape). A Polygon 2D's holes are painted over, not left out.
- **Paint Layer** is the layer's name exactly as the landscape material spells it, such as `Grass`. Nothing is painted, and the node warns, when the name is empty, when the level has no landscape, when the landscape has no layer of that name, or when that layer has no **Layer Info** assigned in the landscape's Paint mode.
- Editor-only, like SA Landscape Patch. During PIE, at runtime and in a cooked build it passes its inputs through and paints nothing. The paint bakes into the landscape's shared **Patches** edit layer, so it costs nothing at runtime and hand-painted layers are untouched. The paint patches are PCG-managed components on a spawned `SA_PCG_LandscapePaint` actor. A regeneration with unchanged inputs writes nothing, regenerating replaces the paint, and Cleanup removes it.
- It changes the world, so the [selector rule](/pcg/landscape-patch#scope-the-selectors-upstream) applies to the nodes feeding it.

| Setting | Default | What it does |
| --- | --- | --- |
| **Paint Layer** | none | The landscape layer to paint. |
| **Strength** | `1` | How strongly the layer is painted inside the shapes, from `0` to `1`. `1` covers the ground completely, `0.5` lets the layers underneath show through by half, `0` paints nothing. The Edge Fade skirt fades from this strength down to nothing. |
| **Apply Order** | `0` | When several SA Landscape Paint or Patch nodes work on the same ground, a higher number is applied **later** and wins where they overlap. Grass the park at `0`, then gravel the paths across it at `1`. |
| **Edge Fade** | `200` | Width, in world units, of the band **outside** each shape where the paint fades away. Inside the shape the layer is always painted at full Strength. `0` gives a hard cut at the boundary. Paint usually looks best with a wider fade than the ground sculpt. |
| **Fade Shape** | Smooth | **Smooth** eases both ends, **Linear** is a straight ramp, **Ease Out** keeps the paint strong right up to the boundary and then thins out quickly. |
| **Path Width** | `300` | Total width, in world units, of the ribbon painted along every spline on `Paths`. At least `20`. |
| **Extend Path Ends** | On | Extends open paths half a Path Width past each end. Turn it off to cut the paint flush at the endpoints, such as where a path meets a road. Loop paths ignore it. |
| **Pad Expansion** | `200` | How far each painted pad on the `Props` pin extends beyond the prop's own footprint, in world units, before the Edge Fade begins. |
| **Landscape** | empty | Which Landscape to paint. Empty uses the landscape the shapes sit on, the first one whose bounds overlap them. Set it when the level has several. |
| **Texels Per Landscape Quad** | `1` | Advanced. Paint texture density. `1` matches the landscape's own resolution and is recommended. Higher costs memory without adding detail the landscape can show, lower softens edges. Accepts `0.25` to `4`. |

A graph made when SA Landscape Patch could still paint may hold a Patch with a **Paint Layer** set. That Patch no longer paints. It warns, naming the layer, and nothing is painted until you add an SA Landscape Paint node with that layer and wire the same shapes into its `Areas`, `Paths` and `Props` pins.

## Prop and point tools

### SA Edge Placer

- **Input:** `Edges` (Curve). **Output:** `Props` (Point).
- **Settings:** the weighted pool, placement, fitting and edge-filter settings in the table below, plus the normal PCG Seed.
- Each pool entry must define exactly one Mesh or Actor Class, and a weight of zero or less is never picked. Emits `SA_Mesh` or `SA_Actor` and exact local bounds.
- **Stay Upright** (on by default) keeps props standing straight on sloped edges, such as buildings along a street that climbs a hill. Each prop only turns to follow the edge's direction and sits at the lowest point under its footprint, so no end floats; the uphill end sinks slightly into the ground. Turn it off for fences, rails or curbs that should tilt with the slope.
- **Filling the pool:** above the list is **Add Selected Assets (or drop here)**. Select Static Meshes and Actor Blueprints in the Content Browser and press it, or drag a multi-selection straight onto it. Each asset becomes one entry at weight 1, existing entries and their weights are left alone, assets already in the pool are skipped, and anything else is ignored. See [what PCG measures a prop by](/getting-started/preparing-meshes#what-pcg-measures-a-prop-by) for how footprints are derived.

| Setting | Default | What it does |
| --- | --- | --- |
| **Mesh Pool** | empty | The weighted pool described above. Each entry's weight starts at `1`. |
| **Side** | Left | Which side of the edge props go on, relative to its travel direction. **Center** puts them on the line, **Left** and **Right** flush against it. |
| **Facing** | Away From Edge | Which way the prop's forward (+X) points: **Toward Edge**, **Away From Edge** (back flush to the edge, front into the room), or **Along Edge**. |
| **Fill** | Packed | **Packed** advances by each prop's true footprint, so mixed sizes sit end to end with no gaps and no overlaps. **Fixed Spacing** places one prop every Fixed Spacing units. **Random Spacing** advances a seeded random distance between Random Spacing Min and Max. |
| **Gap** | `0` | Packed only. Extra space between consecutive props, in world units. A negative value overlaps them. The node emits nothing when Gap would leave any pool entry with less than 1 unit of forward advance. |
| **Corner Split Angle** | `25` | Packed only, in degrees from `0` to `180`. A point where the edge's direction changes by at least this much starts a new span. Gentler bends stay one continuous run. |
| **Fit Segment** | Off | Packed only. Stretches or squeezes props along the edge, and only along the edge, so each span between corners is covered exactly with no space left at the end. The scale stays between Minimum and Maximum Fit Scale, and the node chooses how many props to use so the scale lands as close to natural size as it can. When no count fits within the limits, that span keeps the meshes' own size. Off keeps every mesh at its own size and can leave unused space at the end of a span. |
| **Minimum Fit Scale** / **Maximum Fit Scale** | `0.8` / `1.25` | Packed with Fit Segment only. The smallest and largest scale allowed along the fitted length. Both accept `0.01` and up. |
| **Fit Inside Shape** | Off | Keeps each prop's whole rotated footprint inside the closed input shape, around every hole of a Polygon 2D too. Packed placement tries other pool entries and searches past blocked corners. Closed curves are sampled using Edge Sample Spacing, and Fit Segment scales are checked after fitting, with unusable positions skipped. With a Lateral Offset, each footprint also stays that far from every edge props are placed along, so at a sharp corner a deep building is shifted or left out instead of reaching into the neighbouring street's setback or sidewalk. Open splines and incomplete region boundaries are skipped with a warning. |
| **Fixed Spacing** | `300` | Fixed Spacing fill only. Distance between props, in world units. At least `1`. |
| **Random Spacing Min** / **Random Spacing Max** | `200` / `600` | Random Spacing fill only. The shortest and longest advance between props, in world units. Each step is a seeded random distance between the two. |
| **Lateral Offset** | `0` | Extra clearance, in world units, between the edge line and the prop's bounds face, such as a building setback or a sidewalk width. With Packed fill, a row that meets a corner turning toward its props stops where it would enter the next edge's clearance, so rows meet at the inner corner instead of running on across the neighbouring sidewalk. |
| **Z Offset** | `0` | Vertical offset applied to every prop, in world units. |
| **Stay Upright** | On | Described above. |
| **Edge Sample Spacing** | `50` | Curved input splines are densified to this resolution before placement, in world units. At least `5`. |
| **Edge Filter** | All Edges | Which edges get props: every edge, only the flagged ones, or all but the flagged ones. See below. |
| **Edge Flag Attribute** | `SA_TouchesBoundary` | The true/false attribute that flags edges. Available when Edge Filter is not All Edges. |

**Edge Filter** places props on every edge (**All Edges**), only on the flagged edges (**Only Flagged Edges**), or on every edge except the flagged ones (**Skip Flagged Edges**). An edge is flagged when the attribute named in **Edge Flag Attribute** is true on the point the edge starts at, read per spline point on a spline and per vertex on a Polygon 2D. An input without the attribute counts as unflagged. SA Subdivide Lots' Gap Outlines flag the alley mouths with `SA_TouchesBoundary`, so **Skip Flagged Edges** puts trees along the alley sides only and **Only Flagged Edges** puts bollards across the mouths, with no [SA Filter Spline Edges](#sa-filter-spline-edges) in between.

### SA Pick From Pool

- **Input:** `Points` (Point). **Output:** `Picked Points` (Point).
- **Settings:** weighted Pool and Set Bounds; normal PCG Seed.
- Preserves input transforms/attributes, assigns `SA_Mesh` or `SA_Actor`, and optionally replaces point bounds with the asset's real footprint.
- The pool is filled the same way as SA Edge Placer's, through **Add Selected Assets (or drop here)** above the list, and measures assets by the same [visible bounds](/getting-started/preparing-meshes#what-pcg-measures-a-prop-by).

### SA Prune Footprints

- **Input:** `Points` (Point). **Output:** `Survivors` (Point).
- **Settings:** Area Similarity Factor, Max Overlap Ratio, normal PCG Seed.
- Keeps larger rotated plan-view footprints first; near-equal areas use deterministic tie-breaking. `0` overlap tolerance prunes any positive intersection. Attributes pass through.

### SA Orient To Spline

- **Inputs:** `Points` (Point), `Splines` (Curve). **Output:** `Oriented Points` (Point).
- **Settings:** Axis (+/-X, +/-Y, +/-Z), Yaw Only, Aim Away, Target Sample Spacing.
- Changes rotation only, preserves other point data, and adds `SA_DistanceToSpline`. Yaw Only uses horizontal distance and keeps props upright.

### SA Follow Ground

- **Inputs:** `Points` (Point), `Ground` (Surface). **Output:** `Grounded Points` (Point).
- **Settings:** Follow Slope, Max Tilt.
- Stands props on sloped lot ground without traces. Connect `Ground` to the `Ground Surface` output of SA Get Lots and turn on its Emit Lot Surfaces.
- Reads the ground height under the prop's four footprint corners, then sets its height and tilt. Facing and all other point data are kept. Connect the points after they have their mesh, because the corners come from their bounds.
- Follow Slope off keeps a prop level at the lowest ground under its corners, which suits tall things such as billboards.
- Only points sent through this node tilt, so lamps and trees can skip it and stay straight. Points outside every lot pass through unchanged.

### SA Filter Spline Edges

- **Input:** `Splines` (Spline). **Outputs:** `Flagged` (Spline), `Unflagged` (Spline).
- **Setting:** Edge Flag Attribute (`SA_TouchesBoundary` by default).
- Found under **Filter** in the node palette, not Spatial.
- Splits each spline by a per-point boolean and gives back **splines, not points**, so the result still feeds SA Edge Placer, SA Landscape Patch's `Paths`, Spline Sampler, or Create Surface. The flag is read on the point each edge *starts* at.
- Consecutive edges on the same side stay one spline, and a closed loop whose edges all land on the same side stays closed.
- Its main use is SA Subdivide Lots' `Gap Outlines`: `Unflagged` is the alley sides, for trees and lanterns; `Flagged` is the alley mouths on the lot edge, for bollards.
- A spline without the named attribute sends every edge to `Unflagged`, and the node warns once.
- SA Edge Placer has this split built in: its **Edge Filter** reads the same flag. Use SA Filter Spline Edges when the splines go anywhere else, or when you want both halves as splines.

### SA Spatial Field

- **Input:** `In` (Point, Spline or Polygon 2D). **Output:** `Out` - the same data with one number added. Found under **Metadata** in the node palette.
- **Settings:** Noise Size Meters, Randomize, Attribute Name, and the normal PCG Seed.
- Adds a number from `0` to `1` that changes smoothly across the world, from Perlin noise. A point gets it as a per-point attribute, sampled at its own position. A spline or Polygon 2D is sampled once, at the centre of its world bounds, and gets one value on the Data domain, so a whole lot or footprint shares it. Existing attributes ride through.
- Use it where "more of this here, less there" should hold across a whole city: dense downtown to sparse suburb, tall buildings clustered in districts, parking where the buildings are. The field depends only on world position, **Noise Size Meters** and the Seed, not on the input. Give every node that should agree the same **Noise Size Meters**, **Randomize** and Seed, and buildings, parking and props follow the same districts.
- Filter on the result with Filter Data By Attribute, or keep a share of it with [SA Filter Data By Rank](#sa-filter-data-by-rank) on `@Data.SA_CityIntensity`.
- **Noise Size Meters** (default `250`) is the size of one noise cell: larger values make broader districts. It accepts `0.01` and up; the slider starts at `1`.
- **Randomize** (`0` to `1`, default `0`) blends from the smooth field (`0`) to independent seeded random values (`1`). A lot's random value comes from its `SA_LotSeed` when it has one, so it does not change when other lots are added.
- **Attribute Name** (default `SA_CityIntensity`) is the float attribute written.
- An input that cannot be sampled passes through unchanged, and the node warns once. That happens with data other than points, splines or Polygon 2D, with invalid bounds, or when the attribute name already exists with a type other than float.

### SA Filter Data By Rank

- **Input:** `In` (any data). **Outputs:** `InsideFilter`, `OutsideFilter` (same data, input order kept).
- **Settings:** Rank Attribute (`@Data.SA_LotArea` by default; any whole-input number works, such as `@Data.SA_LotWidth` or the `@Data.SA_CityIntensity` that [SA Spatial Field](#sa-spatial-field) writes), Order (Smallest First / Largest First, default Smallest First), Share (0 to 1, default `0.1`).
- Keeps a share of its inputs ranked by one whole-input value: "the smallest tenth of the lots", "the largest 5% of the blocks". Unlike Filter Data By Attribute with a fixed number, the same share works on any map size.
- Share is rounded up, so any share above 0 keeps at least one input; equal values keep their input order.
- Filter out what can never qualify **first**, then rank what is left. On imported maps the smallest lots are often slivers between parallel roads - drop lots under a minimum `SA_LotWidth` / `SA_LotDepth` with Filter Data By Attribute before ranking.
- Inputs without the attribute go to `OutsideFilter`, and the node warns once.

### SA Set Custom Piece

- **Input:** `Points` (Point). **Output:** `Piece Points` (Point) - every point passes through, nothing is filtered.
- **Settings:** Preset (a Custom Piece Preset row), Apply Radius, Radius, Apply To All In Range.
- Marks scattered points as custom pieces so **SA Spawn Wall** and **SA Spawn Curve** can place gates, doors, corner posts, or crossings where the points fall. Wire its output into their `Custom Pieces` pin; union several of these first to mix piece types on one pin.
- **How a point finds its wall:** a run counts if its spline passes through the point's box **seen from above**. Height plays no part, which is what makes a flat scatter work over hilly ground - and means a merely taller point gains no extra reach. The box turns with the point, so a long thin point reaches far along its length and barely across it.
- Among the runs in reach the **closest one wins**, unless **Apply To All In Range** is on, in which case every run in reach gets a piece. That is the difference between a gate, which must not appear in two fences at once, and a junction point that should give all four sidewalks a curb ramp.
- Turn **Apply Radius** off for points that already carry their own footprint, such as SA Get Intersections or SA Get Lots output - their real shape and facing becomes the reach. A point with no size at all falls back to the nearest run at any distance.
- Points that reach nothing are unused, with no warning. With a level-wide scatter that is the normal majority.
- Curves only build Segment pieces; a Corner preset fed to SA Spawn Curve is placed as a Segment piece and the node says so once.

## Polygon 2D interop

SA shapes and stock PCG **Polygon 2D** data are interchangeable in both directions, so an SA lot can go through Polygon 2D Operation, Offset Polygon 2D, or Clip Paths and come back.

**Taking Polygon 2D in.** Six pins accept it explicitly: SA Subdivide Lots' `Lot Boundaries`, SA Polygon Merge's and SA Polygon Offset's `Polygons`, the `Areas` pin of SA Landscape Patch and SA Landscape Paint, and SA Spatial Field's `In`. Pins typed **Curve** also accept it, even though the label does not say so - that covers the `Paths` pin of both landscape nodes, SA Edge Placer's `Edges`, and the `Splines`/`Footprints` inputs of the three spawn nodes.

**Giving Polygon 2D out.** Ten nodes carry an extra `... Polygons 2D` pin beside their spline output: SA Get Lots, SA Get Intersections, SA Get Network Boundary, SA Get Road Centerlines (`Road Footprint Polygons 2D`), SA Get Map Areas (`Area Polygons 2D`), SA Get Map Buildings (`Footprint Polygons 2D`), SA Polygon Offset, SA Polygon Merge, SA Polygon From Points, and SA Subdivide Lots (twice, for sub-lots and gap outlines). Both pins are built from the same result, so they can never disagree. Wiring one of these pins takes effect immediately - there is no need to force the node to rebuild.

**Holes.** A Polygon 2D has real holes; a spline cannot, so on a spline pin a hole comes out as its own closed spline flagged `SA_IsHole`. Outlines are flagged `false` rather than left unflagged, so a **Filter Data By Attribute** on `SA_IsHole` always finds the attribute. What a hole *does* depends on the node:

| Node | What holes do |
| --- | --- |
| SA Subdivide Lots | **Subtracted.** Nothing is built inside them; straddling sub-lots are clipped and cut lines stop at the edge. |
| SA Polygon Offset | Offset **with** the outline - an inset grows them, an outset shrinks them. |
| SA Polygon Merge | Kept as real holes on the Polygon 2D pin; the spline pin carries outer rings only. |
| SA Landscape Patch `Areas` | **Filled, not carved.** The whole outline is patched, and the node warns. |
| SA Landscape Patch `Paths` | One loop band per ring - the outline and each hole. |
| SA Landscape Paint `Areas` / `Paths` | The same as SA Landscape Patch: `Areas` paints the whole outline, holes included, and `Paths` makes one loop band per ring. |
| SA Spawn Building / Wall / Curve | Ignored. A hole is never chained into the footprint. |

**Two conventions worth knowing.** SA rings are world-space with real per-vertex Z and wind **clockwise**; PCG polygons are flat on a plane transform with the outer ring counter-clockwise. The nodes convert both ways for you. Every SA polygon sits on a plane parallel to the ground, so when mixing SA and stock shapes in a **Polygon 2D Operation**, put the SA polygon **first** - stock ops flatten everything onto the first polygon's plane.

**Why your seeds stay stable.** Reading a polygon rotates its vertices so the same corner is always first. SA derives each lot's seed from its first vertex, so without that rule inserting an unrelated Polygon 2D Operation upstream would renumber every ring and re-randomize the whole city on the next regeneration.

## Common graph failures

| Symptom | Check |
| --- | --- |
| Getter outputs nothing | UE 5.8 package is installed; Actor Selector finds the intended actor; PCG bounds include it; source actor has regenerated valid data. |
| Floor/roof samples disappear after baking | Rebake older output once. Keep the source SA actor; a plain converted actor is read through stock PCG geometry sampling. Check Include Floors/Include Roofs and the preset filter. |
| A pitched roof disappears behind the top-floor filter | `SA_IsTopFloor` applies to floors. Use Include Roofs or `SA_SurfaceType == Roof` for generated roofs. |
| Lots missing | Streets form closed blocks; Output Mode is Generate; empty lots are included while debugging; Facet Angle is not over-simplifying. |
| A lot is in `Lot Polygons 2D` but not in `Lot Boundaries` or `Lot Points` | The lot has a hole. Both pins leave such regions out, and the node warns with the count. Read the region from `Lot Polygons 2D` and subdivide it. |
| SA Get Map Areas outputs nothing | The level has Map Areas from a map import. **Categories** and **Import Group** are not filtering everything out, the area's **Geometry Valid** is on, and the pin you read is wired, with **Emit Surfaces** or **Emit Boundaries** on for those two pins. |
| The road footprint pins are empty | Each is built only while it is wired. `Road Footprint` leaves out regions with holes, such as a roundabout; read `Road Footprint Polygons 2D` for those. |
| SA Landscape Paint paints nothing | **Paint Layer** is set and spelled as in the landscape material, the layer has a **Layer Info** in the landscape's Paint mode, and the level has a landscape (set **Landscape** when it has several). Open splines on `Areas` are skipped; use `Paths`. The node does nothing in PIE, at runtime or in a cooked build. |
| Building node has points but no meshes | Static Mesh Spawner uses **By Attribute → `SA_Mesh`**; Dynamic Meshes is wired separately; preset row resolves to the correct struct. |
| SA Get Map Buildings outputs nothing | The Buildings must come from a map import: they carry the `SA_MapBuilding` tag, and a copy you made of one does not. Check that Actor Selector is still **By Tag** with `SA_MapBuilding`, and that **Import Group** and **Kinds** are not filtering everything out. |
| Map buildings spawn in the node's preset, or at the preset's own height | **Use Input Style** and **Fit Input Height** must be on, and the footprints must come from SA Get Map Buildings. A **Footprints only** import carries a height but no style. Fitting needs a style with a wall section that has a floor range. |
| Random Building table produces nothing | Preset Source is Random From DataTable; the table uses the Building Preset row struct; every All-mode term matches; row-name matching is enabled when relying on row substrings. |
| Preset tag filter finds nothing | Use the exact authored Name in `SA_PresetTags`; use Array Contains before Attribute Filter for individual pieces, or Filter Data By Tag for complete outputs. |
| Prop pool warns or drops entries | Each entry defines exactly one Mesh or Actor Class and has positive weight. |
| Props overlap on slopes | Pick exact bounds, then use **SA Prune Footprints** instead of stock 3D Self Pruning. |
| Facade points cross corners | Use U Distribution = Per Segment. |
| Exterior facade side appears reversed | Fix closed spline winding or use Left/Right explicitly. Open paths treat Exterior/Interior as Both. |
| Offset removes a lot | The negative inset is larger than the narrowest viable region; reduce it or filter small `SA_LotArea` first. |
| Zone filter is stale | Move/edit Lot Zone, rebuild Streets, then regenerate the PCG graph. |
| The editor never settles; the graph regenerates forever | A world-reading node upstream is left at **By Class, Actor**, so it tracks every actor - including the ones SA spawns and the landscape SA Landscape Patch and SA Landscape Paint write to. Tag the source actor and select **By Tag**. |
| A `... Polygons 2D` pin gives nothing | The shape must be closed, and its plane must not be near-vertical; both are rejected on read. |
| A spawned Dynamic Mesh has no collision | Generate Collision is off, or the mesh is over the 250,000-triangle complex-collision cap (the node warns). Navigation never sees dynamic meshes either way. |
| A custom piece never appears | The run's spline must pass through the point's bounds *in plan view*; height is ignored. Check Radius, and whether the point has any size at all. |
| Holes appear as extra buildings or footprints | SA Polygon 2D To Spline has **Include Holes** on. Turn it off, or filter on `SA_IsHole`. |
