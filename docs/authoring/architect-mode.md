---
title: Architect Mode and Streets Mode
description: Complete viewport-control and settings reference for Spline Architect path editing.
---

## Architect Mode

Architect Mode creates and edits Wall, Building, and Curve paths directly in the level viewport. **Browse Presets** is the primary picker: Recent and All tabs, search, DataTable filtering, type filters, and optional thumbnails are available without leaving the mode.

### Creation controls

| Input | Action |
| --- | --- |
| Left click | Add a point. Clicking the first closes the loop; clicking the last finishes an open path. |
| Enter / Shift+Enter | Finish open / close and finish. |
| Ctrl | Lock direction to the configured angle increment. |
| G / Alt | Toggle grid / temporarily use a one-tenth fine grid. |
| Delete | Undo the last new point. |
| Escape | Cancel the current path. |
| N | Start a new path while the mode remains active. |

### Selection and editing

| Input | Action |
| --- | --- |
| Left click point or segment | Select; points can be dragged directly. |
| Ctrl+left click segment | Insert a point at the ray-correct world location. |
| Shift-drag | Marquee-select. |
| Ctrl+A / Ctrl+I | Select all / invert selection. |
| Delete | Remove selected points or segments. Deleting a complete component removes that spline component. |
| L | Toggle loop state. |
| Axis, plane, or center gizmo drag | Move selected points with the chosen axis space and snapping. |
| Shift+handle drag | Extrude from the current selection. |
| Click endpoint | Extend the path; endpoint snapping can connect to another path. |
| Right-click | Context menu for branch, split, shape, and regeneration operations. |
| Alt+left click actor | Pick a different Spline Architect actor for editing. |
| Escape | Cancel the current interaction, clear selection, or exit in successive presses. |

The branch operation can create another spline within the actor or a connected actor stack, depending on context. Segment deletion and splitting preserve valid spline components and invalidate stale point/segment selections automatically.

### Architect Mode settings

| Category | Controls |
| --- | --- |
| **Mode** | **Placement Profile**: Planar Locked fixes Z from the first click; Planar From Hit uses the first hit plane; Surface Projected follows each hit surface. **Auto Track Selection in Edit Mode** follows Outliner selection. |
| **Preset (advanced)** | **Preset Source**, plus Wall, Building, and Curve DataTable handles. The visual picker normally manages these. **Recent Preset History Size** controls remembered items. |
| **Path Creation** | **Grid Step** in world units. |
| **Snapping** | **Grid Snap Enabled**, **Angle Snap Degrees**, endpoint/point/segment screen pick radii, **Surface Offset from Hit**, and **Ignore Selected Actor When Projecting**. |
| **Gizmo** | **Enable Translate Gizmo**, **Axis Space** (World, Actor, Spline Segment), axis selection radius/length, **Show Preview Grid**, and **Preview Grid Half Cells**. |
| **Display** | Debug line thickness, arrow size, marker size, **Show Viewport Help**, and **Show Point Indices**. |

## Streets Mode

Select a Streets Network and press **Edit**. The overlay switches between Draw and Select and lets you choose the active Street Config.

![Streets Mode editing a network in SACity](/img/screens/streets-mode.png)

### Draw

- Left click adds road points and previews intersections.
- **Ctrl** applies angle snap.
- **G** toggles the Streets grid; **Alt** uses the fine grid.
- **Enter** or right-click finishes the road; **Escape** rolls back the active stroke.
- Newly created nodes inherit the selected Street Config's Auto or Manual fillet mode/radius.

### Select and edit

- Click nodes, segments, or lots; Shift adds, Ctrl toggles, and drag creates a selection rectangle.
- Drag the gizmo to move selected nodes. Click the center to cycle World, Actor, and Segment axis spaces.
- Shift-drag a selected node to extrude a new street segment.
- Ctrl-click a hovered edge to cut it with a new node.
- Drag a selected degree-two corner's fillet ring to switch it to Manual and adjust radius.
- Delete removes selected nodes/segments and prunes orphan nodes.
- Right-click segments to **Set Config**, **Make Street Straight**, **Delete Segment(s)**, or **Regenerate**. Selected segment details also expose its name/config; node details expose fillet mode and radius.

### Streets Mode settings

| Category | Controls |
| --- | --- |
| **Snapping** | Grid enabled, Grid Step, and Angle Snap Degrees. |
| **Selection** | Node/edge screen pick distances and drag-start distance. |
| **Gizmo** | Axis Space, world axis length, axis/plane pick distances, and plane half extent. |
| **Display** | Node radius, snap-ring radius, crossing radius, authored-line thickness, and ghost-line thickness. |
