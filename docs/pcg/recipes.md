---
title: PCG facade and prop recipes
description: Node chains for common city jobs in UE 5.8 - buildings along streets, facade attachments, road-edge props, crossings, alleys and rooftops.
---

import NodeChain from '@site/src/components/NodeChain';

Ready-made PCG graphs for the jobs a city keeps asking for: buildings along a street, signs on facades, lamps along roads, signals at crossings, props in alleys and on rooftops. Each recipe gives the node chain first, then the settings that matter. Build it in your graph and tune from there; the [node reference](/pcg/node-reference) has every pin and setting.

## A street of buildings

<NodeChain nodes={[{"name": "SA Get Road Edges"}, {"name": "SA Edge Placer"}, {"name": "Static Mesh Spawner", "notes": ["By Attribute: SA_Mesh"]}]} />

The scalable way to fill a city. Author a few buildings with Spline Architect, [convert each to a static mesh](/production/conversion-export), and put those meshes in the Edge Placer's **Mesh Pool** with weights.

Set **Fill = Packed** so each building advances the placement by its own real width, **Facing = Away From Edge** so they front the street, and a **Lateral Offset** to hold them off the kerb. Differently sized buildings then line the street without gaps or overlaps. On a corner lot each row stops where the other street's offset begins, so no building reaches onto the corner sidewalk.

Branch on `SA_LotZone` first to give each district its own pool. Keep [SA Spawn Building](/pcg/node-reference#sa-spawn-building) for the hero buildings the camera gets close to.

## Facade attachments

<NodeChain nodes={[{"name": "SA Get Facade Frames"}, {"name": "Filter Attribute Elements"}, {"name": "Transform Points / Extents Modifier"}, {"name": "SA Pick From Pool"}, {"name": "Static Mesh Spawner", "notes": ["By Attribute: SA_Mesh"]}]} />

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

<NodeChain nodes={[{"name": "Lot Footprints"}, {"name": "SA Spawn Building", "notes": ["Preset Source: Random From DataTable", "Filter Terms: Residential, Small", "Term Match Mode: All"]}]} />

The node chooses uniformly from the matching Building rows and repeats for fixed graph/footprint seeds. Leave Filter Terms empty for the complete table; switch to **Any** for a broader union. Row-name substring matching is controlled separately by **Include Row Names**.

For individual generated pieces:

<NodeChain nodes={[{"name": "SA Spawn Building", "notes": ["Generated"]}, {"name": "Array Contains", "notes": ["SA_PresetTags contains BaseFloor"]}, {"name": "Attribute Filter"}, {"name": "Static Mesh Spawner"}]} />

For complete generated outputs, use **Filter Data By Tag** with a top-level Building tag such as `Small`. Building actors carry only Building tags; their generated components carry Building tags plus the precise Wall tags that produced them.

## Imported map buildings

An import with **Footprints only** leaves the buildings as outlines with their map data and no style, so nothing generates in the level. A graph can build them instead, in a style you choose:

<NodeChain nodes={[{"name": "SA Get Map Buildings", "notes": ["Footprints"]}, {"name": "SA Spawn Building", "notes": ["Use Input Style, Fit Input Height"], "branches": [{"label": "Generated", "to": "Static Mesh Spawner (By Attribute: SA_Mesh)"}, {"label": "Dynamic Meshes", "to": "Spawn Dynamic Mesh"}]}]} />

Each footprint arrives with its map height in `SA_TargetHeight`. **Fit Input Height** gives the style's repeating section the floors that fit that height, the way a [map import](/core-actors/import-map#the-repeating-section) does. **Use Input Style** builds a footprint in the style it carries. A footprint from a Footprints only import carries none, so it takes the node's preset. Set **Preset Source** to **Random From DataTable** to spread several styles across the buildings.

A styled import has already built its Buildings in the level, so a graph that builds them again would double them. Use a Footprints only import for this recipe.

To keep generated content off land that real buildings already cover, filter lots on the share they cover:

<NodeChain nodes={[{"name": "SA Get Lots", "notes": ["Lot Boundaries"]}, {"name": "Filter Data By Attribute", "notes": ["SA_MapBuildingCoverage < 0.5, for example"]}, {"name": "SA Subdivide Lots"}]} />

`SA_MapBuildingCoverage` runs from 0 to 1 on each lot. Overlapping buildings count once and holes are excluded. Choose the threshold that suits your map.

## Lamps along a road

<NodeChain nodes={[{"name": "SA Get Road Edges"}, {"name": "SA Edge Placer"}, {"name": "Static Mesh Spawner"}]} />

Set Edge Placer to Right or Left, **Facing = Away From Edge**, **Fill = Fixed Spacing**, and enter lamp spacing in centimeters. The node uses exact mesh or collision bounds, including off-center pivots, so the prop's bounds face sits flush to the edge.

## Mixed-size barriers

Use **Fill = Packed** and a weighted Mesh Pool. Placement advances by each chosen prop's true footprint plus Gap, so differently sized assets align without a shared placeholder length. Use **Edge Sample Spacing** small enough for tight curves.

## Crosswalk stripes

<NodeChain nodes={[{"name": "SA Get Road Crossings"}, {"name": "SA Edge Placer"}, {"name": "Static Mesh Spawner"}]} />

Each crossing is a short two-point spline across a road mouth and carries `SA_RoadWidth` and `SA_ConfigIndex`. Use those attributes to select stripe dimensions or materials by street type.

## Traffic lights at intersections

<NodeChain nodes={[{"name": "SA Get Road Crossings"}, {"name": "Filter Data By Attribute", "notes": ["@Data.SA_NodeDegree >= 3"]}, {"name": "Spline Sampler", "notes": ["Subdivision, 0, Unbounded"]}, {"name": "Filter Elements By Index", "notes": ["0"]}, {"name": "Transform Points", "notes": ["back from the curb, yaw 180"]}, {"name": "SA Pick From Pool"}, {"name": "Static Mesh Spawner"}]} />

Crossings also exist at dead ends and where a road simply continues, so filter on `SA_NodeDegree` first. The two sampled points are the crossing's ends at the curb: index `0` takes the signal pole, the other end can take a pedestrian signal. Turn on **Unbounded** on the Spline Sampler - a freshly dropped PCG Volume is small, and the sampler otherwise only samples inside it. To keep poles off the road on large imported junctions, subtract SA Get Intersections `Intersection Polygons 2D` and SA Get Road Centerlines `Road Footprint Polygons 2D` with a Difference node before picking the mesh.

## Alleys between sub-lots

<NodeChain nodes={[{"name": "SA Subdivide Lots", "notes": ["Gap > 0"]}, {"name": "Gap Outlines"}, {"name": "SA Filter Spline Edges"}, {"name": "SA Edge Placer"}]} />

Give SA Subdivide Lots a **Gap** and each cut becomes an alley instead of a shared boundary. **Gap Outlines** emits the whole alley network as one closed shape whose points carry `SA_TouchesBoundary`: `true` where the alley opens onto the lot edge, `false` along its sides.

![An alley between brick buildings seen from the street: bollards and a planter with benches across its mouth, lamps along both sides](/img/screens/alley-result.webp)

Feed that into SA Filter Spline Edges, which splits it into two sets of splines:

- **`Unflagged`** is the alley sides. Send it to SA Edge Placer with **Facing = Toward Edge** for hedges, fences, lanterns, or bins along the backs of the plots.
- **`Flagged`** is the alley mouths. Send it to a second SA Edge Placer for bollards, a gate, or a change of ground material where the alley meets the street.

When both halves only go to SA Edge Placer, skip the split. Feed `Gap Outlines` straight into each Edge Placer and set its **Edge Filter**: **Skip Flagged Edges** places along the alley sides, **Only Flagged Edges** places across the mouths. Keep SA Filter Spline Edges for splines that go to other nodes as well.

Wire **Cut Lines** to SA Landscape Patch's `Paths` in the same graph to sink the alley surface into the terrain, using the alley width as the Path Width.

## Curb ramps at every junction

<NodeChain nodes={[{"name": "SA Get Intersections", "notes": ["Intersection Centers"]}, {"name": "SA Set Custom Piece", "notes": ["Apply To All In Range"]}, {"name": "SA Spawn Wall", "notes": ["Custom Pieces"]}]} />

Tick **Emit Intersection Points** on SA Get Intersections and wire its `Intersection Centers` pin. Those points already carry their own footprint, so turn **Apply Radius** off and let the intersection's real shape be the reach. Turn **Apply To All In Range** on: a junction should give a ramp to *every* sidewalk running through it, not just the nearest one.

Leave Apply To All In Range off for pieces that must be unique in place, such as a gate in a fence run - otherwise one point puts a gate in every fence it touches.

## Rooftop scatter

For a **flat roof authored as a floor**, tag the intended Building or final Wall in a connected stack, select it with **Actor Selector → By Tag**, and enable **Include Floors**:

<NodeChain nodes={[{"name": "SA Sample Floor/Roof"}, {"name": "Filter Attribute Elements", "notes": ["SA_IsTopFloor == true"]}, {"name": "SA Pick From Pool"}, {"name": "SA Prune Footprints"}, {"name": "Static Mesh Spawner / Spawn Actor"}]} />

This works on live surfaces and baked **Components**, **Instanced**, or **Hierarchical Instanced** output. Older bakes need one rebake. Keep the SA actor as the source; for [plain converted meshes](/production/conversion-export), use stock PCG geometry sampling instead.

Top-floor status is calculated separately for each selected actor, among its included sampled floor levels. Target the final Wall explicitly when the building is a stack of separate Wall actors. The filter does not test whether a surface is visible from outside or covered by another mesh.

For a **generated roof**, enable **Include Roofs**, disable **Include Floors**, and omit the `SA_IsTopFloor` filter. Alternatively branch on `SA_SurfaceType == Roof`. Use **Max Surface Slope** or the emitted `SA_Slope` to limit props to suitable roof faces.

**Point Spacing** is a radius in world centimeters: `100` gives a minimum point-center distance of `200` on each sampled mesh/instance. Reduce it for denser placement; raise **Max Samples Per Surface** if the node warns that coverage reached its cap.

SA Pick From Pool writes real local bounds. SA Prune Footprints compares their rotated plan-view hulls and ignores Z separation, which is better for sloped terrain or rooftop props than world-axis 3D AABBs.

## Face props toward a sidewalk

Connect prop Points and a Road Edges/Centerlines output to **SA Orient To Spline**. Keep **Yaw Only** on for upright street furniture; choose the local axis that represents the asset's front and enable **Aim Away** if its back should face the road. Filter or scale by `SA_DistanceToSpline` downstream.
