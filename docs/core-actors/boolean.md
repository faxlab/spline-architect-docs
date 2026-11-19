---
title: Boolean
description: Cut openings through generated walls, floors and roofs, or remove the pieces inside a volume.
---

Cut a hole where the generator would otherwise build: an opening through a facade, a gap in a floor or roof. A Boolean is a cutter made from the Static Mesh and Spline shapes you add to it. It either cuts the shape out of what it overlaps, or removes the overlapping pieces whole.

![A Boolean's extruded spline cutter, shown in red, carving a rounded bite out of a tower's facade](/img/screens/boolean-cut.webp)

## Shape

| Control | What it does |
| --- | --- |
| **Boolean UV Scale** | How often the texture repeats on the cutter's own preview mesh. It does not change what is cut. |
| **Spline Extrude Distance** | Distance a spline cutter extrudes along its up direction. Make it tall enough to pass through every target. |
| **Materials** | Read-only materials gathered from child meshes for preview. |
| **Borrow Spline From Parent** | Also cuts with the spline of the Wall or Building the Boolean is attached to, as if that shape were drawn on the Boolean. Off (default): a Boolean attached to an actor only to move with it cuts with its own shapes only. |
| **Boolean Mesh Component** | The cutter's combined shape, built from the Static Mesh and Spline components you add. Read-only. |

## Targets

| Control | What it does |
| --- | --- |
| **Auto Detect Targets** | Cuts every Spline Architect actor whose bounds overlap the Boolean. Ignored while Target Actors has entries. |
| **Target Actors** | Only these actors are cut. Leave it empty to let Auto Detect Targets find them. |
| **Affect Floors / Affect Roofs / Affect Walls** | Which parts are cut: floors, roofs, and walls - wall pieces, Custom Pieces and posts. |
| **Wall Mode** | **Boolean Subtract** cuts the Boolean's shape out of what it overlaps. **Cull** removes every overlapping piece whole. |

## Build a cutter

1. Place a Spline Architect Boolean.
2. Add one or more Static Mesh Components or Spline Components as children.
3. For a spline shape, draw a closed loop and increase **Spline Extrude Distance** beyond the target height.
4. Leave **Auto Detect Targets** on for a local cutter, or populate **Target Actors** for strict control.
5. Enable the affected output types and choose Subtract or Cull.

Subtract is suited to openings and shaped cuts. Cull is faster and more predictable when the intended result is to remove complete repeated pieces. Baked output remains safe: an authored Boolean change causes affected generated output to unbake before it is rebuilt.
