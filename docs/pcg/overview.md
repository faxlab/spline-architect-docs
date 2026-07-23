---
title: UE 5.8 PCG integration
description: Use Spline Architect actors as semantic inputs and generation kernels in Unreal Engine 5.8 PCG graphs.
---

The `SplineArchitectPCG` module is available in the UE 5.8 package. It exposes effective SA splines, Streets lots and road data, facade cells, floor/roof samples, polygon tools, bounds-aware prop tools, and Wall/Curve/Building generation nodes.

![Streets Network to PCG data flow](/img/diagrams/streets-pcg-flow.svg)

## Design principle

SA PCG nodes separate authored meaning from spawned output:

1. **Read** live Spline Architect actors: lots, road edges, crossings, intersections, facades, surfaces, or effective generation splines.
2. **Transform** boundaries and points: subdivide, offset, merge, sample, orient, choose assets, and prune footprints.
3. **Generate** Wall, Curve, or Building data—or feed normal PCG spawners.

Prefer the **Data** output mode on SA Spawn nodes. It emits static pieces as points with `SA_Mesh` for Unreal's Static Mesh Spawner and non-static pieces as Dynamic Mesh data. Building and Wall output also carries precise `SA_PresetTags`, so one generated layer can be filtered without splitting the generation graph by asset. PCG then owns the normal spawn lifecycle and keeps the Outliner clean.

## First graph

For a city block, use:

```text
SA Get Lots (Lot Boundaries)
  → Filter Data By Attribute (SA_LotEmpty == false)
  → SA Subdivide Lots
  → SA Polygon Offset (negative setback)
  → SA Spawn Building (Data)
      Generated → Static Mesh Spawner (By Attribute: SA_Mesh)
      Dynamic Meshes → Spawn Dynamic Mesh
```

For road props:

```text
SA Get Road Edges
  → SA Edge Placer
  → SA Prune Footprints
  → Static Mesh Spawner (By Attribute: SA_Mesh)
```

## Data domains and filtering

Getter nodes write whole-object attributes to the **Data** domain and, where useful, mirror them to spline control points/elements. Use **Filter Data By Attribute** to keep or branch complete lots, crossings, intersections, or paths. Use **Filter Attribute Elements** after sampling when the decision is per point.

Spawn output adds two complementary tag paths:

- use **Array Contains** on `SA_PresetTags`, then **Attribute Filter**, to select individual static pieces or precise Dynamic Mesh data such as `BaseFloor`;
- use **Filter Data By Tag** to keep a complete generated output classified by a top-level Building or Wall tag such as `Small`.

Examples:

- whole lots: `SA_LotZone`, `SA_LotEmpty`, `SA_IsExterior`;
- sampled surfaces: `SA_IsTopFloor`, `SA_SurfaceType`, `SA_Slope`;
- facade cells: `SA_FloorIndex`, `SA_NormalizedU`, `SA_FacadeFace`.

## Actor output modes

| Mode | Result |
| --- | --- |
| **Data** | Recommended. Static pieces become points with `SA_Mesh` and precise `SA_PresetTags`; non-static pieces use tagged Dynamic Mesh data. |
| **Components (collapse actor)** | Harvests generated components onto a PCG-managed container and destroys the transient SA actor. The container receives top-level preset tags; harvested components retain precise tags. |
| **Actors** | Leaves PCG-managed `SA_PCG_*` actors in a `PCG_SplineArchitect` Outliner folder. They receive top-level preset tags, are recreated on graph regeneration, and should not be hand-edited. |

PCG graphs are procedural ownership boundaries. Bake editor-authored SA actors normally; let the PCG component manage anything it spawns.
