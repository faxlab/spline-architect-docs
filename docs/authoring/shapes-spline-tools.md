---
title: Shapes and spline utilities
description: Apply, save, import, merge, mirror, gridify, flatten, reverse, and repair Spline Architect paths.
---

Spline Architect's shape library and path tools turn common footprint work into repeatable operations.

## Shape Library

Each shape entry has a stable **Shape ID**, **Display Name**, **Description**, **Category**, **Closed Loop** flag, read-only built-in status, and one or more loops of local points. Built-in shapes include common rectangles, circles, and building footprints; plugin Basic Shape meshes can also be imported as shape entries.

Use the Spline Architect menu to:

- **Apply Shape** to replace an active actor/path. Architect Mode applies only single-loop entries to the active path.
- **Save Shape** from selected spline actors for later reuse.
- **Import Shapes** from compatible Static Mesh boundary data.

Multi-loop shapes are valid for actor-level application and can drive Multi Spline polygon operations.

## Spline menu commands

| Command | Result |
| --- | --- |
| **Spline to Selected** | Copies or assigns a selected spline source to a compatible actor. |
| **Merge Spline Actors** | Combines selected compatible paths into one actor with multiple spline components. |
| **Break to Spline** | Creates ordinary spline actor data from generated/selected Spline Architect paths. |
| **Mirror X / Mirror Y** | Commits a geometric mirror to authored points. |
| **Flatten** | Sets points to a common elevation. |
| **Reverse** | Reverses point order and winding. |
| **Gridify** | Snaps points to the actor's Grid Size. |
| **Reset Transform / Center Transform** | Normalizes or recenters actor transforms while preserving world-space path geometry. |
| **Clean Invalid / Delete Invalid** | Finds and removes invalid plugin actors or connections after review. |
| **Select Roots / Filter Roots / Select Connected** | Navigates connected Wall/Building hierarchies. |

## Multi-spline polygon operations

Wall and Building actors can generate each spline independently or combine closed loops by Union. Because polygon work is solved in 2D, **Union Z Mode** decides how Z is restored: Flatten to Min Z, Average Z, Nearest Point, or Surface Trace.

For symmetry exploration, prefer generation-only **Mirror Mode**. When the result becomes authored topology, use **Apply Mirror to Spline**. This avoids permanently doubling point edits before the design is settled.
