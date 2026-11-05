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
| `SA_LotPartIndex` | Int | Written by SA Get Lots. Zero-based position of this piece among the separate pieces that share the lot's settings. `0` for a lot in one piece. |
| `SA_LotPartCount` | Int | Written by SA Get Lots. How many separate pieces share the lot's settings. `1` for a lot in one piece. |
| `SA_LotEmpty` | Bool | Effective lot config suppresses surfaces/spawns. |
| `SA_LotArea` | Float | XY polygon area in cm². |
| `SA_LotSeed` | Int | Stable per-lot seed token. |
| `SA_LotSurfaceMaterial` | Soft Object Path | Resolved visible/top lot material. |
| `SA_LotZone` | Name | Lot Zone actor, per-lot override, or default lot zone tag. |
| `SA_LotElevation` | Name | The lot's Lot Elevation setting: `Follow`, `Lowest` or `Highest`. Filter on it to find flattened lots, for example to build a wall around them. |
| `SA_IsExterior` | Bool | Subdivided lot touches its source boundary. |
| `SA_IntersectionNode` | Int | Graph node index owning an intersection. |
| `SA_CorridorIndex` | Int | Resolved road corridor index. |
| `SA_RoadSide` | Name | `Left` or `Right`. |
| `SA_CrossingIndex` | Int | Road-mouth crossing order. |
| `SA_NodeDegree` | Int | Roads meeting where a crossing sits: `1` dead end, `2` the road just continues, `3`+ a real intersection. |
| `SA_RoadWidth` | Float | Full width at the crossing. |
| `SA_Raised` | Bool | True on imported bridge decks and their approach ramps, and on road footprint junctions where only raised roads meet. Written by SA Get Road Edges, SA Get Road Centerlines and its footprint shapes, so elevated roads can be filtered in or out. |
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
| `SA_MapBuildingCoverage` | Float | Written by SA Get Lots. Share of the lot, from 0 to 1, that imported [map buildings](#map-buildings) stand on. Overlaps count once and holes are excluded. |

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
| `SA_Footprint` | Name | Map footprints only: the name of the footprint that built this path. |
| `SA_TargetHeight` | Double | Map footprints only: the wall height that footprint fits, in cm. |

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
| `SA_Footprint` | Name | Map footprints only: the name of the footprint the frame belongs to. |

## Floor and roof samples

| Attribute | Type | Meaning |
| --- | --- | --- |
| `SA_SourceActor` | String | Source Wall, Building, or Curve. |
| `SA_SurfaceType` | Name | Floor or Roof. |
| `SA_FloorIndex` | Int | Zero-based included sampled floor level within the source actor, lowest first; `-1` for roofs. |
| `SA_IsTopFloor` | Bool | Floor sample belongs to the highest included sampled level of its actor; always false for roofs. |
| `SA_Preset` | Name | Source Wall/Curve preset row; Building samples retain the source Wall row. `None` for inline presets. |
| `SA_Material` | Soft Object Path | Sampled triangle's material, including component material overrides. |
| `SA_Slope` | Float | Surface slope in degrees. |

These point attributes are emitted for live and tagged baked surfaces. `SA_SurfaceFloor` and `SA_SurfaceRoof` are **mesh component tags**, not boolean point attributes. Filter sampled points with `SA_SurfaceType`.

Floor levels group sampled world heights into 50 cm bands and assume horizontal floors. Tilted or continuously sloped floors do not provide reliable architectural floor indices. Preset/include filters apply before level assignment, so excluding surfaces can renumber levels and change which level is top. Top-floor status is per actor, not a visibility, occlusion, or exterior-roof test.

## Map buildings

SA Get Map Buildings writes these on the Data domain of every footprint it outputs, on both the `Footprints` and the `Footprint Polygons 2D` pin. SA Spawn Building reads the height and the style, so a footprint keeps its map height through any chain of PCG nodes.

| Attribute | Type | Meaning |
| --- | --- | --- |
| `SA_TargetHeight` | Double | Wall height to fit, in cm: the footprint's own override when it has one, otherwise the height from the map. `0` or missing means no fit. |
| `SA_PresetRow` | Name | The Building preset row that is the footprint's style: its own, otherwise its Building's. Empty for a footprint with no style. |
| `SA_PresetTable` | Soft Object Path | The DataTable that row lives in. |
| `SA_MapBuildingSourceId` | String | Map identity of the building, such as `way/123` or `relation/456`. |
| `SA_MapBuildingName` | String | The building's name or address from the map. |
| `SA_MapBuildingKind` | Name | `House`, `Apartments`, `Commercial`, `Office`, `Industrial`, `Civic`, `Religious`, `SmallStructure` or `Unspecified`. |
| `SA_HeightSource` | Name | Where the height came from: `Reported`, `FromLevels`, `Estimated` or `Manual`. |
| `SA_MapBuildingTags` | String | The map tags the import kept, one `key=value` per line. |
| `SA_SourceActor` | String | Name of the Building actor that holds the footprint. |
| `SA_MapImportGroup` | String | Id of the Map Import Group that owns the Building. |

The map tags that feed these values are the building tags the import uses: `building`, heights, floor counts, roof, name and address.

## Map areas

SA Get Map Areas writes these on the Data domain of all three outputs, and on every vertex of `Area Polygons 2D` and every point of `Area Boundaries`.

| Attribute | Type | Meaning |
| --- | --- | --- |
| `SA_MapAreaCategory` | Name | The kind of land, by the [PCG value](/core-actors/import-map#land-area-categories) of its category, such as `Woodland`, `Park` or `Water`. Filter on this one. |
| `SA_MapAreaSourceId` | String | Map identity of the area, such as `way/123` or `relation/456`. |
| `SA_MapAreaSourceType` | Name | `Way` for a single closed outline, `Relation` for a multipolygon that can hold holes or separate parts. |
| `SA_MapAreaName` | String | The area's name. |
| `SA_MapAreaTags` | String | The original map tags, one `key=value` per line, sorted by key. |
| `SA_MapImportGroup` | String | Id of the Map Import Group that owns the area. Empty for an area outside any group. |
| `SA_MapAreaPartIndex` | Int | Zero-based number of this shape among the parts of its area. |
| `SA_MapAreaPartCount` | Int | How many separate parts the area has. `1` for an area in one piece. |
| `SA_IsHole` | Bool | This shape is a hole's outline. Written on its vertices and spline points and on the Data domain, so you can filter either the points or the whole spline. |
| `SA_IsCropEdge` | Bool | On vertices and spline points: the edge starting here was made by cutting the area off at the import boundary. It is not an edge on the map. |

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
| `SA_HasHoles` | Bool | The complete region this closed spline came from has holes, so the spline is a perimeter for placement along its edge, not a solid footprint to build on. Every ring of such a region carries it, outline and holes alike. Written by SA Get Intersections, SA Polygon Offset, SA Subdivide Lots and SA Polygon 2D To Spline. |
| `SA_PointCount` | Int | How many input points belong to a shape traced by SA Polygon From Points. |
| `SA_CityIntensity` | Float | A number from `0` to `1` written by SA Spatial Field: a per-point attribute on points, one Data-domain value on a spline or Polygon 2D. The name is whatever the node's **Attribute Name** says; this is the default. |
| `SA_PresetRow` | Name | A preset row chosen for a point or footprint: the Custom Piece Preset row chosen by SA Set Custom Piece, or the Building preset row a footprint from SA Get Map Buildings carries as its style. |
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
