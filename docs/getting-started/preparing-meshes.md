---
title: Prepare modular meshes
description: Prepare pivots, axes, bounds, materials, UVs, and dimensions for predictable Spline Architect generation.
---

import AnnotatedShot from '@site/src/components/AnnotatedShot';
import AxesDiagram from '@site/src/components/AxesDiagram';

A mesh fits a wall or curve best when its length runs along X, its height along Z, and its pivot sits at a bottom corner or bottom center. Spline Architect compensates for imperfect meshes, but a consistent kit means cleaner corners and fewer overrides.

<AxesDiagram />

You can learn the whole plugin on the example content - come back here when you bring your own kit.

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

The included starter kit follows these rules. The orange dot on each piece marks its pivot: every piece has it at the bottom centre, and every piece's length runs along X.

<AnnotatedShot
  native
  src="img/screens/meshes-starter-kit-pivots.webp"
  alt="The six starter-kit meshes in a row on a plain floor, tinted teal, with an orange dot at each pivot: wall, short wall, filler, door wall, column and railing post"
  callouts={[
    {label: 'SM_Wall: 241 cm long, 300 cm high', x: 9.6, y: 15},
    {label: 'SM_ShortWall: 241 cm long, 73 cm high', x: 26.5, y: 54},
    {label: 'SM_WallFiller: 66 cm wide, for small gaps', x: 45.3, y: 19},
    {label: 'SM_WallDoor: same size as SM_Wall, with an opening', x: 57.4, y: 20},
    {label: 'SM_Column: a post for corners and spline points', x: 81.5, y: 5},
    {label: 'SM_RailingPost: a small post for fences', x: 95.5, y: 66},
  ]}
/>

## Scale and dimensions

Author at Unreal scale: 1 Unreal Unit = 1 centimeter. When **Wall Length**, **Wall Height**, or **Corner Length** overrides are off, Spline Architect derives them from mesh bounds. Turn an override on only when logical dimensions should differ from the raw asset.

Use **Keep World Scale** when a piece must retain its authored proportions. Otherwise generation scales pieces to the resolved slot and height. Custom Wall Mesh entries can define explicit pivot-relative logical `Bounds Min XZ` and `Bounds Max XZ` for an asset whose visual bounds are not its fitting bounds.

## Materials, Nanite, collision, and lightmaps

- Keep material slots stable across variants if they share preset material overrides.
- Nanite is compatible with generated and baked static meshes, subject to the normal Unreal limitations of the output component type. The **Baked Mesh Nanite** project setting decides whether the shapes Spline Architect builds when you bake use it; see [Nanite on baked meshes](/production/baking#nanite-on-baked-meshes).
- Configure source collision for repeated static pieces. Newly collapsed static meshes should be checked after conversion.
- For baked/static lighting, enable generated lightmap UVs in [Project Settings](/reference/project-settings) or use the [Lightmap Tool](/production/editor-tools#lightmap-tool).

## What PCG measures a prop by

The SA prop pools measure an asset by its **visible bounds**, not its collision. A prop with tight or missing collision still reserves the room its mesh occupies, which is what keeps packed placement and footprint pruning honest.

For a Blueprint prop, every visible component counts: static and skeletal meshes, instanced meshes and all their instances, shapes, and any child actor's own geometry. Editor-only visualizers such as arrows and billboards are ignored. A Blueprint with no visible geometry at all falls back to a small placeholder box, so a prop that packs suspiciously tightly is usually one whose geometry is spawned at runtime rather than present in the class.

## Fix a pivot without leaving Unreal

Select one or more Static Mesh assets and open **SA → Tools → Pivot Tool**. Choose Min, Center, Max, or Keep per axis, decide whether to overwrite or create suffixed assets, then apply. See [Pivot Tool](/production/editor-tools#pivot-tool) for every option.
