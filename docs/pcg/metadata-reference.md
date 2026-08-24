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
| `SA_StreetConfigIndex` | Int | Street Config that built the road a lot edge follows. |
| `SA_LotPerimeter` | Float | Boundary length in cm. |
| `SA_LotWidth` | Float | Frontage width of the lot, in cm. |
| `SA_LotDepth` | Float | Depth back from the frontage, in cm. |
| `SA_LotForward` | Vector | Direction the lot faces, away from its street. |
| `SA_LotFrontageCount` | Int | How many streets the lot fronts onto. |
| `SA_IsCornerLot` | Bool | Lot fronts two or more streets that meet at a corner. |
| `SA_StreetFacing` | Bool | Per boundary point: this edge runs along a street. |
| `SA_AtIntersection` | Bool | Per boundary point: this point sits at an intersection. |
| `SA_TouchesBoundary` | Bool | Per point: the edge starting here lies on the source boundary. On Gap Outlines this marks an alley mouth; on alley sides it is false. |
| `SA_CutGap` | Float | Alley width on Cut Lines and Gap Outlines. `0` when there is no gap. |
| `SA_CutPass` | Int | Which subdivision pass produced this cut line. |
| `SA_JunctionDegree` | Int | How many cut lines meet at a Cut Junction point. |
| `SA_JunctionOnBoundary` | Bool | The Cut Junction sits on the lot edge rather than inside it. |
| `SA_IslandArea` | Double | Plan-view area of a boundary island, after facet thinning. |

Lot shape metrics - `SA_LotWidth`, `SA_LotDepth`, `SA_LotForward`, `SA_LotFrontageCount`, `SA_IsCornerLot` - are what make "put shops on corner lots and houses elsewhere" a one-node filter.

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
| `SA_IsHole` | Bool | This closed shape is the hole of a larger shape, not a shape of its own. Written on every output of the nodes that can emit holes, `false` on outlines, so a filter always finds it. |
| `SA_PointCount` | Int | How many input points belong to a shape traced by SA Polygon From Points. |
| `SA_PresetRow` | Name | Custom Piece Preset row chosen by SA Set Custom Piece. |
| `SA_PresetTable` | Soft Object Path | The DataTable that row lives in. |
| `SA_ApplyToAll` | Bool | This piece point spreads to every run in reach instead of only the nearest. |
| `SA_ActorClass` | Soft Object Path | Actor class resolved for a spawned piece. |
| `SA_PCGManaged` | Tag | Actor tag on everything PCG spawns for SA. Present so SA's own getters can ignore their output and never feed it back in - do not filter on it by hand. |

## Attribute inheritance through transforms

Nodes that reshape lots pass attributes along rather than starting fresh, so a filter written against **SA Get Lots** still works after a subdivision.

**SA Subdivide Lots** emits its own `SA_LotIndex`, `SA_LotArea`, `SA_LotSeed`, and `SA_IsExterior` describing each **sub-lot**, and these override the parent's values of the same name. Every other Data-domain attribute of the parent lot rides through untouched - `SA_LotZone`, `SA_StreetConfigIndex`, `SA_RoadWidth`, `SA_LotSurfaceMaterial`, `SA_SourceActor`, and anything an upstream Add Attribute put there.

One consequence to keep in mind: inherited **shape metrics** still describe the **parent** lot. After a subdivision, `SA_LotWidth`, `SA_LotDepth`, `SA_LotForward`, `SA_LotFrontageCount`, and `SA_IsCornerLot` are the block's, not the sub-lot's.

**SA Polygon Merge** and **SA Polygon Offset** keep an attribute only when every input agrees on its value. Merging lots from two different Streets Networks drops `SA_SourceActor`; merging lots at all drops `SA_LotIndex` and `SA_LotArea`, because the island has no single answer.

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
