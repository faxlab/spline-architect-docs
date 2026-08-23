---
title: Architect Mode fundamentals
description: Draw, select, edit, extend, branch, snap, and finish Spline Architect paths in the viewport.
---

import AnnotatedShot from '@site/src/components/AnnotatedShot';
import LoopingClip from '@site/src/components/LoopingClip';

Architect Mode is the main viewport workflow for Wall, Building, and Curve paths. It combines preset selection, path creation, point/segment editing, grid and surface placement, and a screen-space transform gizmo.

<LoopingClip
  caption="Draw a footprint, and the wall follows every edit."
  poster="img/clips/architect-draw.png"
  src="img/clips/architect-draw.mp4"
/>

<AnnotatedShot
  alt="Architect Mode in SACity with its preset panel and viewport controls"
  src="img/screens/architect-mode.png"
  callouts={[
    {label: 'Mode and path-creation settings', x: 5, y: 31},
    {label: 'Preset Library', x: 14, y: 17},
    {label: 'Live viewport instructions', x: 44, y: 20},
    {label: 'Finish, close, cancel, and grid actions', x: 54, y: 69},
    {label: 'Selected actor controls and authored data', x: 82, y: 48},
  ]}
/>

## Draw a path

1. Enter **Architect Mode** from the Modes panel or Spline Architect menu.
2. Choose **Browse Presets**, then select a Wall, Building, or Curve preset.
3. Click in the viewport to add points.
4. Click the first point to close the loop, click the last point to finish an open path, or press **Enter** to finish.

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

Select a Spline Architect actor and enter Architect Mode. Click points or segments, Shift-drag a marquee, or press **Ctrl+A** to select all editable elements. Drag a point directly or use the axis, plane, and center handles.

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

Use **Planar Locked** placement for architectural footprints and **Surface Projected** when points should follow terrain or another surface. Full settings and advanced path operations are in [Architect Mode reference](/authoring/architect-mode).
