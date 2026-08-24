---
title: Wall
description: Complete user-facing reference for the Spline Architect Wall actor.
---

import ClipAside from '@site/src/components/ClipAside';
import LoopingClip from '@site/src/components/LoopingClip';

<ClipAside
  media={
    <LoopingClip
      alt="What stacked wall layers make: a sci-fi interior with a glowing trim band and angled upper walls, a plaza platform growing a railing, a street corner, and stepped ruin rings"
      poster="img/clips/wall-stacking.webp"
      src="img/clips/wall-stacking.mp4"
    />
  }
>

Wall is the actor everything else builds on. Give it a spline and a preset, and it fits your modular pieces along the path, resolves the corners, and adds floors, roofs, and posts. Stack Walls to make storeys; the stack is what [becomes a Building](/getting-started/first-building).

Do not read "wall" too literally. The same actor makes shopfronts, fences, and railings; with a floor surface and a curb mesh it makes planters, platforms, and plazas. Anything modular along a path is a Wall.

</ClipAside>

## Preset

| Control | What it does |
| --- | --- |
| **Data Table Preset** | Selects a `Wall Preset` row. Disabled while baked. A valid row takes priority over the inline preset. |
| **Rename Actor on Preset Selection** | Renames the actor to the selected row name. |
| **Wall Preset** | Inline configuration used when no DataTable row is selected. Its **Preset Tags** classify the Wall and generated components. See [Wall Preset reference](/authoring/wall-presets). |
| **Use Parameter Overrides** | Exposes non-destructive overrides on top of a DataTable row. |
| **Parameter Overrides** | Toggles and values for Height, Corner Size, Z Handling, Inset, Num Floors, Treat Spline Reversed, nearby-point collapse, offsets, floor surfaces, posts, material parameters, and instance custom data. |
| **Save Preset** | Saves the effective Wall setup as a DataTable row. |
| **Save Building Preset** | Serializes the selected connected Wall hierarchy as a Building Preset. |

## Controls

| Control | What it does |
| --- | --- |
| **Booleans to Use** | Explicit Boolean cutters for floor, roof, wall, custom-piece, and post output. |
| **Seed** | Drives mesh selection and random transforms. `-1` resolves to a concrete random seed; non-negative values are deterministic. |
| **Start Snap / End Snap** | Snaps the first or last point to a target actor's spline. Each includes Target Actor, Closest Point or Extend to Intersection (2D) mode, Snap Z, Add Snap Segment, and Keep Distance. |
| **Reset Transform** | Applies the actor transform to the path and returns the actor transform to its expected basis. |
| **Center Transform** | Moves the actor origin to the spline center while preserving the world-space path. |
| **Force Regenerate** | Rebuilds this Wall and its connected generation tree. |

## Stacked walls

**Add Wall to Selected** connects a new Wall to the selected one as a child. The child follows its parent's effective footprint and sits on top of it, raised by the parent's height; **Offset Stacked By** in the preset shifts a layer beyond that.

Storeys are the obvious use, but a layer can be anything: a trim band between floors, a railing on a plinth, an inset upper ring - the clip at the top of this page is all stacks. Each layer keeps its own preset, materials, and seed, so a stack composes structures no single preset could describe - and saving the stack as a preset is how a [Building](/getting-started/first-building) is born.

**Spline Architect → Insert Wall** adds a wall directly **beneath** the selected one. The selection and everything stacked above it, custom pieces included, move up by the new wall's height.

Used on the bottom wall, this slides a new base under an existing building: the new wall becomes the footprint and takes over the spline, curves and all, along with the mirror settings that the footprint defines for the whole stack. The old bottom wall keeps its custom pieces and becomes the floor above.

## Spline

| Control | Options and effect |
| --- | --- |
| **Multi Spline Mode** | **Independent** generates every spline separately; **Union** merges closed spline polygons before generation. |
| **Union Z Mode** | Reconstructs Z after 2D union: Flatten to Min Z, Average Z, Nearest Point, or Surface Trace. |
| **Mirror Mode** | None, X, Y, XY, or **Use Parent** for a connected child Wall. X/Y modes retain one side or quadrant and mirror it across the actor-local plane. The result is generation-only until applied. |
| **Invert Mirror** | Swaps which side of the actor-local mirror plane is retained. |
| **Apply Mirror to Spline** | Commits the current mirror/bisect result into authored spline points and clears the generation-only mirror. |
| **Grid Size** | Local X/Y/Z steps used by Gridify. |
| **Auto Gridify** | Re-snaps spline points to Grid Size whenever the spline changes. |
| **Mirror X / Mirror Y** | Directly mirrors authored spline points. |
| **Flatten** | Places spline points on a common Z plane. |
| **Reverse** | Reverses point order and winding. |
| **Gridify** | Snaps current spline points to Grid Size once. |

## Baking

| Control | What it does |
| --- | --- |
| **Baked** | Read-only state of persistent output. |
| **Generation Mode** | **Baked** for editor production; **Runtime** for transient gameplay generation. |
| **Bake Method** | Components, Instanced, or Hierarchical Instanced. |
| **Baked Mobility** | Static, Stationary, or Movable mobility assigned to baked components. |
| **Corner Angle Increment** | Rounds similar corner angles during corner prebaking; `0` uses Project Settings. |
| **Lightmap Texel Density Override** | Per-actor texels per meter; `0` uses Project Settings. |
| **Bake / Unbake** | Creates persistent output or restores generated editing. |
| **Prebake Corners** | Builds reusable corner variants for the actor's current angles. |

## Production notes

- **Random Fit** is deterministic for a resolved seed and cycles a shuffled, fit-aware bag; **Ordered Sequence** follows array order; **Best Fit** chooses the closest natural length that fits.
- Use **Use Parent** mirror mode on stacked child Walls so the hierarchy shares the root's symmetry.
- For bulk operations, prefer the connected commands in [Baking](/production/baking) to pressing per-actor buttons repeatedly.
