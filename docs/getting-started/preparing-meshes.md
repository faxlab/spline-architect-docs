---
title: Prepare modular meshes
description: Prepare pivots, axes, bounds, materials, UVs, and dimensions for predictable Spline Architect generation.
---

Good modular assets make every preset easier to author. Spline Architect can compensate for imperfect meshes, but a consistent asset kit produces cleaner corners, fewer overrides, and more predictable baking.

## Coordinate contract

| Axis | Wall and Curve convention |
| --- | --- |
| **X** | Piece length: the direction that follows the spline. |
| **Y** | Piece depth or profile width. Positive Y is the actor's outward/right side. |
| **Z** | Height. |

Place the pivot at a repeatable connection point. For a wall piece, a bottom corner or bottom center is usually easiest. Corner meshes need a pivot that matches the intended bend or miter center. Spline Architect fits from asset bounds, so remove hidden collision helpers or stray vertices that inflate those bounds.

## Build a useful kit

- At least one straight Wall mesh with a known natural X length and Z height.
- Optional shorter straight pieces for **Best Fit** packing.
- Optional filler pieces for small residual gaps.
- A corner mesh if the preset uses a mesh-driven corner.
- Door, arch, or gap assets for Custom Pieces.
- Post meshes for corners, spline points, starts/ends, or periodic placement.
- Materials that expose consistent scalar/vector parameters if presets will randomize them.

## Scale and dimensions

Author at Unreal scale: 1 Unreal Unit = 1 centimeter. When **Wall Length**, **Wall Height**, or **Corner Length** overrides are off, Spline Architect derives them from mesh bounds. Turn an override on only when logical dimensions should differ from the raw asset.

Use **Keep World Scale** when a piece must retain its authored proportions. Otherwise generation scales pieces to the resolved slot and height. Custom Wall Mesh entries can define explicit pivot-relative logical `Bounds Min XZ` and `Bounds Max XZ` for an asset whose visual bounds are not its fitting bounds.

## Materials, Nanite, collision, and lightmaps

- Keep material slots stable across variants if they share preset material overrides.
- Nanite is compatible with generated and baked static meshes, subject to the normal Unreal limitations of the output component type.
- Configure source collision for repeated static pieces. Newly collapsed static meshes should be checked after conversion.
- For baked/static lighting, enable generated lightmap UVs in [Project Settings](/reference/project-settings) or use the [Lightmap Tool](/production/editor-tools#lightmap-tool).

## Fix a pivot without leaving Unreal

Select one or more Static Mesh assets and open **Spline Architect → Pivot Tool**. Choose Min, Center, Max, or Keep per axis, decide whether to overwrite or create suffixed assets, then apply. See [Pivot Tool](/production/editor-tools#pivot-tool) for every option.
