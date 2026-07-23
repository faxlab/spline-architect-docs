---
title: SA PCG metadata reference
description: Attribute names, types, meaning, domains, and downstream usage for Spline Architect PCG data.
---

Attribute names are case-sensitive. Use Data-domain filters for whole paths/lots and element filters after sampling for individual points. PCG data tags are separate from metadata attributes; use **Filter Data By Tag** for them.

## Streets and lots

| Attribute | Type | Meaning |
| --- | --- | --- |
| `SA_SourceActor` | String | Owning source actor name. |
| `SA_LotIndex` | Int | Lot order in the current source/result. |
| `SA_LotEmpty` | Bool | Effective lot config suppresses surfaces/spawns. |
| `SA_LotArea` | Float | XY polygon area in cm². |
| `SA_LotSeed` | Int | Stable per-lot seed token. |
| `SA_LotSurfaceMaterial` | Soft Object Path | Resolved visible/top lot material. |
| `SA_LotZone` | Name | Lot Zone actor, per-lot override, or default lot zone tag. |
| `SA_IsExterior` | Bool | Subdivided lot touches its source boundary. |
| `SA_IntersectionNode` | Int | Graph node index owning an intersection. |
| `SA_CorridorIndex` | Int | Resolved road corridor index. |
| `SA_RoadSide` | Name | `Left` or `Right`. |
| `SA_CrossingIndex` | Int | Road-mouth crossing order. |
| `SA_RoadWidth` | Float | Full width at the crossing. |
| `SA_ConfigIndex` | Int | Streets Street Config index. |
| `SA_DistanceAlongSpline` | Float | Cumulative world distance on centerlines or effective splines. |

## Effective spline attributes

SA Get Spline can write:

| Attribute | Type | Meaning |
| --- | --- | --- |
| `SA_ActorType` | Name | Wall, Building, Curve, or supported source kind. |
| `SA_Preset` | Name | Effective DataTable row/preset name when available. |
| `SA_Seed` | Int | Resolved actor seed. |
| `SA_Baked` | Bool | Source actor bake state. |
| `SA_SplineClosed` | Bool | Effective path is closed. |
| `SA_MirrorMode` | Name | Resolved mirror/bisect mode. |
| `SA_StackIndex` | Int | Wall depth: root 0, child 1, and so on. |
| `SA_StackOffset` | Vector | Effective cumulative connected-layer offset. |
| `SA_WallHeight` | Float | Effective wall/profile height. |
| `SA_NumFloors` | Int | Effective floor count. |
| `SA_SegmentIndex` | Int | Segment index for per-control-point/segment semantics. |
| `SA_SegmentLength` | Float | Segment world length. |
| `SA_SegmentDirection` | Vector | World direction. |
| `SA_CornerAngle` | Float | Turn angle at the point. |
| `SA_NormalizedDistance` | Float | Distance along path normalized 0–1. |

## Facade frames

| Attribute | Type | Meaning |
| --- | --- | --- |
| `SA_SourceActor` / `SA_SourceType` / `SA_Preset` | String/Name/Name | Source identity and resolved type/preset. |
| `SA_WallId` / `SA_ParentWallId` | Name | Building hierarchy IDs. |
| `SA_PathIndex` / `SA_StackIndex` | Int | Effective path and connected-layer depth. |
| `SA_StackOffset` | Vector | Layer offset. |
| `SA_WallSide` / `SA_FacadeFace` | Name | Spline-relative side and semantic exterior/interior face. |
| `SA_SegmentIndex` | Int | Owning wall segment. |
| `SA_FloorIndex` / `SA_LocalFloorIndex` | Int | Global stack floor and floor within the current preset. |
| `SA_DistanceAlongWall` | Double | Cell position along the wall run. |
| `SA_NormalizedU` / `SA_NormalizedV` | Double | Normalized position over the resolved face. |
| `SA_NormalizedFloorV` | Double | Normalized vertical position within the current floor. |
| `SA_CellSize` | Vector | Fitted cell size in centimeters. |

## Floor and roof samples

| Attribute | Type | Meaning |
| --- | --- | --- |
| `SA_SourceActor` | String | Source Wall, Building, or Curve. |
| `SA_SurfaceType` | Name | Floor or Roof. |
| `SA_SurfaceFloor` / `SA_SurfaceRoof` | Bool | Convenient type flags. |
| `SA_FloorIndex` | Int | Sampled floor index. |
| `SA_IsTopFloor` | Bool | Sample belongs to the uppermost resolved floor. |
| `SA_Preset` | Name | Source preset. |
| `SA_Material` | Soft Object Path | Sampled surface material. |
| `SA_Slope` | Float | Surface slope in degrees. |

## Polygon, prop, and spawn output

| Attribute | Type | Meaning |
| --- | --- | --- |
| `SA_Offset` | Float | Signed polygon offset applied. |
| `SA_IslandIndex` | Int | Polygon Merge island order. |
| `SA_Mesh` | Soft Object Path | Mesh selected/generated for Static Mesh Spawner By Attribute. |
| `SA_Actor` | Soft Object Path | Actor class selected for Spawn Actor By Attribute. |
| `SA_SpawnedActor` | Soft Object Path | PCG-managed actor reference emitted in Components/Actors modes. |
| `SA_PresetTags` | Name Array | Exact applicable Building/Wall Preset tags on generated piece, Dynamic Mesh, or actor-reference output. |
| `SA_DistanceToSpline` | Double | Horizontal or 3D distance computed by SA Orient To Spline. |

## Preset tags and filtering

`SA_PresetTags` preserves the authored Name values and their component-level precision:

- a standalone Wall piece carries its Wall Preset tags;
- a Building piece carries the Building Preset tags plus only the Wall Preset tags that produced that component;
- a Building actor-reference point carries only the Building Preset tags;
- a Wall actor-reference point carries only the Wall Preset tags;
- Curve output carries an empty array because Curve presets do not define Preset Tags.

In **Data** output, static-piece points store the array on each point. Each Dynamic Mesh stores it on the Data domain. Components/Actors reference points also expose the top-level array.

To keep individual pieces with a tag such as `BaseFloor`, use stock **Array Contains** on `SA_PresetTags`, then feed its result to **Attribute Filter**. To keep or branch a complete generated output by a top-level tag such as `Small`, use **Filter Data By Tag**. Dynamic Mesh outputs also carry their precise component tags as PCG data tags.

Do not rename these attributes in the middle of a shared graph without updating every filter and stock spawner. For a stable studio graph, wrap common SA branches in PCG subgraphs and expose only high-level parameters.
