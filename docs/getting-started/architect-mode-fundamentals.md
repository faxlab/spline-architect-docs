---
title: Architect Mode fundamentals
description: Draw, select, edit, extend, branch, snap, and finish Spline Architect paths in the viewport.
---

import AnnotatedShot from '@site/src/components/AnnotatedShot';
import ClipAside from '@site/src/components/ClipAside';
import LoopingClip from '@site/src/components/LoopingClip';

<ClipAside
  media={
    <LoopingClip
      alt="Drawing a footprint in Architect Mode; the wall regenerates as a point is dragged"
      poster="img/clips/architect-draw.webp"
      src="img/clips/architect-draw.mp4"
    />
  }
>

Architect Mode is where you draw. Pick a preset, click out a path in the viewport, and the actor generates along it as you go; the same mode edits existing paths point by point.

</ClipAside>

<AnnotatedShot
  alt="Architect Mode drawing a Building footprint in SACity, with the mode settings, the Preset Library, and the viewport bar"
  src="img/screens/architect-mode.webp"
  callouts={[
    {label: 'Mode, grid, snapping, and gizmo settings', x: 8, y: 35},
    {label: 'Preset Library with the active Building preset', x: 24, y: 20},
    {label: 'Live viewport instructions', x: 43, y: 9},
    {label: "The selected preset's authored data", x: 24, y: 70},
    {label: 'Finish, close, and cancel', x: 72, y: 96},
    {label: 'Grid toggle, spacing, and grid space', x: 85, y: 96},
  ]}
/>

## Draw a path

1. Enter **Architect Mode** from the Modes panel or the Spline Architect menu.
2. **Browse Presets** and pick a Wall, Building, or Curve preset. (Empty library? A fresh install has no presets yet - [get content to build with](/getting-started/first-building#0-get-something-to-build-with) first.)
3. Click in the viewport to add points.
4. Click the first point to close the loop - the right move for a building footprint - or click the last point or press **Enter** to finish an open run like a fence.

While drawing:

| Input | Result |
| --- | --- |
| Left click | Add a point. |
| First point | Close the loop. |
| Last point or Enter | Finish the open path. |
| Shift+Enter | Close and finish. |
| Ctrl | Lock the next segment to **Angle Snap Degrees**. |
| G | Toggle the Architect Mode grid. |
| Alt | Use one tenth of the current grid step. |
| Delete | Remove the last point. |
| Esc | Cancel the new path. |

## Edit an existing path

Select a Spline Architect actor and enter Architect Mode. Click points or segments, Shift-drag a marquee, or press **Ctrl+A** for everything. Points drag directly; the gizmo adds axis and plane handles when you want a constrained move.

| Input | Result |
| --- | --- |
| Ctrl+click a segment | Insert a point. |
| Shift+drag | Box-select points and segments. |
| Ctrl+I | Invert the current point/segment selection. |
| Delete | Remove selected points or segments. |
| L | Toggle loop state. |
| Click an endpoint | Begin extending the path. |
| Shift+drag a handle | Extrude selected geometry. |
| Right-click | Open context actions, including branching. |
| Alt+click an actor | Pick a different Spline Architect actor under the cursor. |

**Placement Profile** decides where clicks land: **Planar Locked** keeps a footprint flat, which is what architecture usually wants; **Surface Projected** follows terrain, which is what paths and fences usually want. Everything else - branching, snapping, shapes, the grid - is in the [Architect Mode reference](/authoring/architect-mode).
