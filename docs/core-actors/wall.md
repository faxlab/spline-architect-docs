---
title: Wall
description: Fit modular pieces along a path for facades, fences, railings and kerbs, and stack walls into storeys.
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

Draw a path, and a Wall fits your modular pieces along it, turns the corners, and adds floors, roofs and posts. Stack Walls to make storeys; the stack is what [becomes a Building](/getting-started/first-building). Everything else in Spline Architect builds on it.

Do not read "wall" too literally. The same actor makes shopfronts, fences, and railings; with a floor surface and a curb mesh it makes planters, platforms, and plazas. Anything modular along a path is a Wall.

</ClipAside>

## Preset

| Control | What it does |
| --- | --- |
| **Data Table Preset** | Selects a `Wall Preset` row. Disabled while baked. A valid row takes priority over the inline preset. |
| **Rename Actor on Preset Selection** | When on (default), the actor takes the name of the row you pick. |
| **Wall Preset** | The Wall's own settings, used and editable when no DataTable row is picked. Its **Preset Tags** label the Wall and what it generates. See [Wall Preset reference](/authoring/wall-presets). |
| **Use Parameter Overrides** | Lets this one Wall change chosen values of its DataTable row without editing the row. Available when a row is picked. |
| **Parameter Overrides** | Toggles and values for Height, Corner Size, Z Handling, Inset, Num Floors, Treat Spline Reversed, nearby-point collapse, offsets, floor surfaces, posts, material parameters, and instance custom data. |
| **Save Preset** | Saves this Wall's current settings as a row in a Wall Preset DataTable, ready to reuse. |
| **Convert to Building** | Replaces this Wall and the whole stack it belongs to, including walls below it, with one Building actor that builds the same result. Meshes, materials, floors, roofs, attached custom pieces and the seed come along; the settings become the Building's own preset, and nothing is written to a DataTable. Undo brings the walls back. To reuse the design, press **Save Preset** on the new Building. |

## Controls

| Control | What it does |
| --- | --- |
| **Booleans to Use** | [Boolean](/core-actors/boolean) actors that cut this Wall. What each one cuts - floors, roofs, or wall pieces, custom pieces and posts - is set on the Boolean. |
| **Seed** | The number behind random piece choice and random transforms. A fixed number such as `42` gives the same wall every time; `-1` (default) picks a new random seed every regeneration. |
| **Start Snap / End Snap** | Snaps the first or last point to a target actor's spline. Each includes Target Actor, Closest Point or Extend to Intersection (2D) mode, Snap Z, Add Snap Segment, and Keep Distance. |
| **Reset Transform** | Moves the actor's pivot to the first spline point, turns it to face the first segment and sets its scale back to 1. Nothing moves in the level. On a stack, use it on the bottom wall. |
| **Center Transform** | Moves the actor's pivot to the middle of the spline points, so the move gizmo sits in the centre of the wall. Nothing moves in the level. |
| **Force Regenerate** | Rebuilds this Wall and every wall connected to it. |

## Stacked walls

**Add Wall to Selected** connects a new Wall to the selected one as a child. The child follows its parent's effective footprint and sits on top of it, raised by the parent's height; **Offset Every Floor** in the preset shifts a layer beyond that, and **Offset By** moves only that layer. Turn on **Follow Parent Segments** in the child's preset when its pieces and posts should sit at the parent's joints, as the deck, rails and legs of a catwalk do - see [Wall Configuration](/authoring/wall-presets#wall-configuration).

Storeys are the obvious use, but a layer can be anything: a trim band between floors, a railing on a plinth, an inset upper ring - the clip at the top of this page is all stacks. Each layer keeps its own preset, materials, and seed, so a stack composes structures no single preset could describe - and saving the stack as a preset is how a [Building](/getting-started/first-building) is born.

**Spline Architect → Insert Wall** adds a wall directly **beneath** the selected one. The selection and everything stacked above it, custom pieces included, move up by the new wall's height.

Used on the bottom wall, this slides a new base under an existing building: the new wall becomes the footprint and takes over the spline, curves and all, along with the mirror settings that the footprint defines for the whole stack. The old bottom wall keeps its custom pieces and becomes the floor above.

## Spline

| Control | Options and effect |
| --- | --- |
| **Multi Spline Mode** | **Independent** generates every spline separately; **Union** merges closed spline polygons before generation. |
| **Union Z Mode** | Union merges the shapes as seen from above, so their heights are restored afterwards: **Flatten to Min Z** (default), **Average Z**, **Nearest Point**, or **Surface Trace**. |
| **Mirror Mode** | Draw half a symmetric shape and let the Wall build the other half. **X** and **Y** keep one side of the actor's own X or Y plane and mirror it; **XY** keeps one quarter. **Use Parent** (default) makes a stacked Wall follow the bottom wall's symmetry. The spline itself is unchanged until you press Apply Mirror to Spline. |
| **Invert Mirror** | Off (default) keeps the negative side of the mirror plane and mirrors it to the positive side; on keeps the positive side. |
| **Apply Mirror to Spline** | Writes the mirrored shape into the spline points and turns the mirror off, so you can edit both halves by hand. |
| **Grid Size** | The grid Gridify snaps points to, in the actor's own space: X and Y across, Z up. Default `500 × 500 × 100`. |
| **Auto Gridify** | Snaps the spline points to Grid Size every time the spline changes. |
| **Mirror X / Mirror Y** | Mirrors the spline points themselves, once. |
| **Flatten** | Sets every spline point to the height of the first point. |
| **Reverse** | Reverses the spline's direction, which turns the pieces to face the other side. |
| **Gridify** | Snaps current spline points to Grid Size once. |

## Baking

| Control | What it does |
| --- | --- |
| **Baked** | Shows whether the Wall is baked. Read-only: use Bake and Unbake. |
| **Generation Mode** | **Baked** (default) builds meshes in the editor and saves them with the level. **Runtime** builds them when the game runs and saves nothing. |
| **Bake Method** | **Instanced** (default) groups identical meshes into instances, which draws faster and lets [Instance Custom Data](/authoring/wall-presets#materials-and-instance-custom-data) reach the material. **Hierarchical Instanced** also handles detail and culling per instance, for large scenes. **Components** makes every mesh its own component, so each can be moved after baking. |
| **Baked Mobility** | **Static** for the best performance and baked lighting; **Movable** if the baked parts must move at runtime; or **Stationary**. |
| **Corner Angle Increment** | When corners are prebaked, their angles are rounded to this step in degrees, so similar corners share one baked variant. `0` uses Project Settings. |
| **Lightmap Texel Density Override** | Lightmap density for this actor's baked meshes, in texels per metre. `0` uses Project Settings. |
| **Bake / Unbake** | Creates persistent output or restores generated editing. |
| **Prebake Corners** | Bakes the corner variants for the Wall's current corner angles ahead of time, so other corners can reuse them. |

## Production notes

- **Random Fit** gives the same result for the same seed: it deals the pieces out in a shuffled order, skipping pieces too long for the space left. **Ordered Sequence** follows the list order; **Best Fit** chooses the piece whose own length fits best; **Closest Length** gives each segment one piece, the closest in length.
- Use **Use Parent** mirror mode on stacked child Walls so the hierarchy shares the root's symmetry.
- For bulk operations, prefer the connected commands in [Baking](/production/baking) to pressing per-actor buttons repeatedly.
