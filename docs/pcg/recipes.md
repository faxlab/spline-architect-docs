---
title: PCG facade and prop recipes
description: Practical UE 5.8 recipes for facade grids, road-edge props, crossings, rooftops, and footprint-aware scattering.
---

## Facade attachments

![Facade frame graph in the SACity staging scene](/img/screens/pcg-facade-graph.png)

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

## Rooftop scatter

```text
SA Sample Floor/Roof
  → Filter Attribute Elements (SA_IsTopFloor == true)
  → SA Pick From Pool
  → SA Prune Footprints
  → Static Mesh Spawner / Spawn Actor
```

SA Pick From Pool writes real local bounds. SA Prune Footprints compares their rotated plan-view hulls and ignores Z separation, which is better for sloped terrain or rooftop props than world-axis 3D AABBs.

## Face props toward a sidewalk

Connect prop Points and a Road Edges/Centerlines output to **SA Orient To Spline**. Keep **Yaw Only** on for upright street furniture; choose the local axis that represents the asset's front and enable **Aim Away** if its back should face the road. Filter or scale by `SA_DistanceToSpline` downstream.
