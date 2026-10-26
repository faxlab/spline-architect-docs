---
title: PCG facade and prop recipes
description: Practical UE 5.8 recipes for facade grids, road-edge props, crossings, rooftops, and footprint-aware scattering.
---

## A street of buildings

```text
SA Get Road Edges → SA Edge Placer → Static Mesh Spawner (By Attribute: SA_Mesh)
```

The scalable way to fill a city. Author a few buildings with Spline Architect, [convert each to a static mesh](/production/conversion-export), and put those meshes in the Edge Placer's **Mesh Pool** with weights.

Set **Fill = Packed** so each building advances the placement by its own real width, **Facing = Away From Edge** so they front the street, and a **Lateral Offset** to hold them off the kerb. Differently sized buildings then line the street without gaps or overlaps.

Branch on `SA_LotZone` first to give each district its own pool. Keep [SA Spawn Building](/pcg/node-reference#sa-spawn-building) for the hero buildings the camera gets close to.

## Facade attachments

```text
SA Get Facade Frames
  → Filter Attribute Elements
  → Transform Points / Extents Modifier
  → SA Pick From Pool
  → Static Mesh Spawner (By Attribute: SA_Mesh)
```

Use **Per Segment** U distribution to prevent a cell crossing a corner. **By Spacing** creates fitted vertical cells; **Per Floor Row** creates one row at a selected fraction of each floor. Exterior/Interior follows final closed-path winding; open paths fall back to Both.

Useful filters:

- `SA_FloorIndex > 0` for upper-floor signs or balconies;
- `SA_NormalizedU` ranges to avoid corners;
- `SA_FacadeFace == Exterior` and `SA_WallSide` for orientation-specific assets;
- `SA_Preset` or `SA_WallId` to target one layer of a Building.

Facade frames intentionally do not exclude openings. Filter cells by your own semantic rules or author a mask branch when doors/windows must be avoided.

Baked SA Walls and Buildings still provide facade frames through their retained paths and preset settings. After changing a shared preset, rebake the building before relying on those frames to match its frozen mesh. Plain converted output uses generic PCG geometry instead.

## Tagged Building pools and pieces

Author broad classification on Building Presets (`Small`, `Residential`, `Industrial`) and layer-specific classification on Wall Presets (`BaseFloor`, `Facade`, `Trim`).

```text
Lot Footprints
  → SA Spawn Building
      Preset Source: Random From DataTable
      Filter Terms: Residential, Small
      Term Match Mode: All
```

The node chooses uniformly from the matching Building rows and repeats for fixed graph/footprint seeds. Leave Filter Terms empty for the complete table; switch to **Any** for a broader union. Row-name substring matching is controlled separately by **Include Row Names**.

For individual generated pieces:

```text
SA Spawn Building (Generated)
  → Array Contains (SA_PresetTags contains BaseFloor)
  → Attribute Filter
  → Static Mesh Spawner
```

For complete generated outputs, use **Filter Data By Tag** with a top-level Building tag such as `Small`. Building actors carry only Building tags; their generated components carry Building tags plus the precise Wall tags that produced them.

## Lamps along a road

```text
SA Get Road Edges → SA Edge Placer → Static Mesh Spawner
```

Set Edge Placer to Right or Left, **Facing = Away From Edge**, **Fill = Fixed Spacing**, and enter lamp spacing in centimeters. The node uses exact mesh or collision bounds, including off-center pivots, so the prop's bounds face sits flush to the edge.

## Mixed-size barriers

Use **Fill = Packed** and a weighted Mesh Pool. Placement advances by each chosen prop's true footprint plus Gap, so differently sized assets align without a shared placeholder length. Use **Edge Sample Spacing** small enough for tight curves.

## Crosswalk stripes

```text
SA Get Road Crossings → SA Edge Placer → Static Mesh Spawner
```

Each crossing is a short two-point spline across a road mouth and carries `SA_RoadWidth` and `SA_ConfigIndex`. Use those attributes to select stripe dimensions or materials by street type.

## Traffic lights at intersections

```text
SA Get Road Crossings → Filter Data By Attribute (@Data.SA_NodeDegree >= 3) → Spline Sampler (Subdivision, 0, Unbounded)
  → Filter Elements By Index (0) → Transform Points (back from the curb, yaw 180) → SA Pick From Pool → Static Mesh Spawner
```

Crossings also exist at dead ends and where a road simply continues, so filter on `SA_NodeDegree` first. The two sampled points are the crossing's ends at the curb: index `0` takes the signal pole, the other end can take a pedestrian signal. Turn on **Unbounded** on the Spline Sampler - a freshly dropped PCG Volume is small, and the sampler otherwise only samples inside it. To keep poles off the road on large imported junctions, subtract SA Get Intersections `Intersection Polygons 2D` and SA Get Road Centerlines `Road Footprint Polygons 2D` with a Difference node before picking the mesh.

## Alleys between sub-lots

[Image: A pedestrianised street between two blocks: bollards lined across the mouth where it meets the road, benches, planters, and lamps down the sides]

```text
SA Subdivide Lots (Gap > 0) → Gap Outlines → SA Filter Spline Edges → SA Edge Placer
```

Give SA Subdivide Lots a **Gap** and each cut becomes an alley instead of a shared boundary. **Gap Outlines** emits the whole alley network as one closed shape whose points carry `SA_TouchesBoundary`: `true` where the alley opens onto the lot edge, `false` along its sides.

Feed that into SA Filter Spline Edges, which splits it into two sets of splines:

- **`Unflagged`** is the alley sides. Send it to SA Edge Placer with **Facing = Toward Edge** for hedges, fences, lanterns, or bins along the backs of the plots.
- **`Flagged`** is the alley mouths. Send it to a second SA Edge Placer for bollards, a gate, or a change of ground material where the alley meets the street.

Wire **Cut Lines** to SA Landscape Patch's `Paths` in the same graph to sink the alley surface into the terrain, using the alley width as the Path Width.

## Curb ramps at every junction

```text
SA Get Intersections → SA Set Custom Piece (Apply To All In Range) → SA Spawn Wall (Custom Pieces)
```

Intersection points already carry their own footprint, so turn **Apply Radius** off and let the intersection's real shape be the reach. Turn **Apply To All In Range** on: a junction should give a ramp to *every* sidewalk running through it, not just the nearest one.

Leave Apply To All In Range off for pieces that must be unique in place, such as a gate in a fence run - otherwise one point puts a gate in every fence it touches.

## Rooftop scatter

For a **flat roof authored as a floor**, tag the intended Building or final Wall in a connected stack, select it with **Actor Selector → By Tag**, and enable **Include Floors**:

```text
SA Sample Floor/Roof
  → Filter Attribute Elements (SA_IsTopFloor == true)
  → SA Pick From Pool
  → SA Prune Footprints
  → Static Mesh Spawner / Spawn Actor
```

This works on live surfaces and baked **Components**, **Instanced**, or **Hierarchical Instanced** output. Older bakes need one rebake. Keep the SA actor as the source; for [plain converted meshes](/production/conversion-export), use stock PCG geometry sampling instead.

Top-floor status is calculated separately for each selected actor, among its included sampled floor levels. Target the final Wall explicitly when the building is a stack of separate Wall actors. The filter does not test whether a surface is visible from outside or covered by another mesh.

For a **generated roof**, enable **Include Roofs**, disable **Include Floors**, and omit the `SA_IsTopFloor` filter. Alternatively branch on `SA_SurfaceType == Roof`. Use **Max Surface Slope** or the emitted `SA_Slope` to limit props to suitable roof faces.

**Point Spacing** is a radius in world centimeters: `100` gives a minimum point-center distance of `200` on each sampled mesh/instance. Reduce it for denser placement; raise **Max Samples Per Surface** if the node warns that coverage reached its cap.

SA Pick From Pool writes real local bounds. SA Prune Footprints compares their rotated plan-view hulls and ignores Z separation, which is better for sloped terrain or rooftop props than world-axis 3D AABBs.

## Face props toward a sidewalk

Connect prop Points and a Road Edges/Centerlines output to **SA Orient To Spline**. Keep **Yaw Only** on for upright street furniture; choose the local axis that represents the asset's front and enable **Aim Away** if its back should face the road. Filter or scale by `SA_DistanceToSpline` downstream.
