---
title: Architect Mode and Streets Mode
description: Complete viewport-control and settings reference for Spline Architect path editing.
---

import ClipAside from '@site/src/components/ClipAside';
import LoopingClip from '@site/src/components/LoopingClip';

## Architect Mode

Architect Mode creates and edits Wall, Building, and Curve paths directly in the level viewport. **Browse Presets** is the primary picker: Recent and All tabs, search, DataTable filtering, type filters, and optional thumbnails are available without leaving the mode.

### Creation controls

| Input | Action |
| --- | --- |
| Left click | Add a point. Clicking the first closes the loop; clicking the last finishes an open path. |
| Enter / Shift+Enter | Finish open / close and finish. |
| Ctrl | Lock direction to the configured angle increment. |
| G / Alt | Toggle grid / temporarily use a one-tenth fine grid. |
| C | Re-anchor the grid to the current frame without ending the path. |
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

### The grid

Three controls in the viewport bar drive the drawing grid.

![The viewport bar while drawing: Create Path, Clear Selected, Finish, Close/Open, Cancel, the Grid toggle, Spacing, and Grid Space](/img/screens/architect-grid-strip.webp)

| Control | What it does |
| --- | --- |
| **Grid** | Snap points to the grid while drawing and dragging. Shows its state, and is the same toggle as the **G** key. |
| **Spacing** | Distance between grid lines. It edits the **selected actor's** Grid Size; with nothing selected it sets the spacing new actors start with. A dash means the selected actors disagree, and nothing is written until you enter a value. |
| **Space** | Which way the grid is turned. **World** keeps every path on one shared city-wide grid starting at the world origin. **Actor Local** lines the grid up with the actor you are drawing on, so you can draw square to a building that sits at an angle. |

**The grid is captured when a path starts.** Spacing can be changed mid-path and takes effect immediately, but **orientation cannot** - a change to **Space** applies to the next path, and the status bar says so. Press **C** to re-anchor the grid explicitly without ending what you are doing.

### Which spline a command edits

**Close/Open**, **Gridify**, **Flatten**, **Reverse**, **Mirror X/Y**, **Apply Shape**, and the two transform buttons all need to know *which* spline they act on. They resolve it in this order:

1. the path you are actively editing in Architect Mode;
2. the spline component selected in the level editor;
3. the actor's only spline, if it has just one.

If an actor has several splines and nothing says which, **it is skipped rather than edited silently**, and a notification names the actors it skipped. Select the spline component, or pick a point in Architect Mode, and run the command again.

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

<ClipAside
  media={
    <LoopingClip
      alt="Drawing a road that splits a block, then dragging one node onto another so the two intersections merge"
      poster="img/clips/streets-draw-edit.webp"
      src="img/clips/streets-draw-edit.mp4"
    />
  }
>

Select a Streets Network and press **Edit**. Everything in Streets Mode sits in one bar at the bottom of the viewport; there is no side panel.

Draw cuts new roads through the network; Select moves what is there. In the clip, a new road splits a block in two, and dragging one node onto another fuses them into a single intersection.

</ClipAside>

### The bar

The bar has three rows, and every control stays in the same place whatever you select. On a narrow viewport the whole bar shrinks instead of hiding controls. Hover any control for what it does.

| Row | What it holds |
| --- | --- |
| **Status line** | What just happened, on the left. A hint for what you are doing right now, on the right. |
| **Selection row** | Actions, in groups that stay visible and grey out when that kind is not selected. **Nodes**: **Connect**, **Fuse**, **Dissolve**, **Level**. **Streets**: **Whole street**, **Straighten**, **Add node**, **Flip**. **Lots**: **Subdivide**. **Delete** sits at the end. Selecting anything opens the card above the bar: one section per kind (`STREETS · 3`), with the values. The card closes when the selection is empty. |
| **Tool row** | **New streets** (the type used for drawing and for Connect), **Select / Draw / Cut**, **Move / Rotate** and the axes they use, **Pick** (what clicks may select), **Grid** and its size in metres, **Angle** snap and its step, **Frame**, **Help** and **Exit**. |

**New streets** is only the type for streets you are about to draw, and for **Connect**. Changing a street that is already there is **Type** in the card. Type and Width apply from junction to junction.

While you draw a street, the selection row shows its length and turn angle with **Finish** and **Cancel**. During a Subdivide preview it shows the preview's controls (see [Subdivide lots](#subdivide-lots)).

### Draw

- With the **Draw** tool every click places a point. With **Select**, double-click starts a street. The Draw tool stays on after a street is finished, ready for the next one.
- A new point joins the node or street under the cursor, or the one the grid puts it on. A green ring on a node, or a street drawn green, shows where it will join. The readout at the cursor says **Connect** or **New point**, with the length and the turn from the previous segment.
- Ending a street on the middle of another street makes a T-junction. Crossing a street makes an intersection.
- Hold **X** to place a free point: it ignores the grid and joins nothing.
- **Angle** snap turns new streets in steps of the angle value. Holding **Ctrl** snaps one stroke even when Angle snap is off. **Alt** uses the fine grid, one tenth of the grid size.
- **Enter**, right-click or **Finish** ends the street. **Esc** or **Cancel** throws away the street in progress; streets finished earlier are kept.
- New nodes take the street type's Auto or Manual corner and its radius.

### Select and edit

- Click nodes, streets or lots. Shift-click adds to the selection, and dragging draws a selection box. **Pick** limits clicks to nodes, streets or lots when they sit close together.
- **W** and **E**, or **Move** and **Rotate**, switch the gizmo for the selected nodes. The axis menu next to them picks World, Actor or Street axes.
- Shift-drag a selected node to extend a new street from it.
- With the **Cut** tool, click a street to cut it with a new node at the blue marker. With **Select**, Ctrl-click does the same.
- Clicking a street selects that street only. The gizmo still moves its ends. **Whole street** extends the selection from junction to junction.
- Drag the handle on a selected corner to round it by hand; the corner switches to **Manual**. **Corner** and **Radius** in the card set the same values by typing. **Reset** on the nodes section puts them back to Auto.
- Deleting a **corner** - a node with exactly two streets - joins its two streets back into one instead of leaving a hole in the road. **Dissolve** does that without deleting the streets' other ends. At a junction or a dead end, Delete removes the node with its streets as before.
- **Connect** draws a street between exactly two selected nodes, using the New streets type, and splits anything it crosses.
- Select two or more nodes and press **Fuse** to fuse them into one intersection. The node you clicked **last** is the one that stays, keeping its position and its corner; the others hand over their streets. **Level** sets the selected nodes to that same node's height. One undo step each.
- Dragging a node onto another merges them on release. A green ring marks the node it will join, and the grid counts: if the grid puts the node on a junction, it joins it. Moving a whole street, or several nodes at once, so that an end lands on a junction joins them too. A small nudge beside a close neighbour does not merge. Hold **X** while dragging to move without joining. The whole drag is one undo step.
- **Straighten** in the Streets group straightens the selected streets. Right-click a street for **Set Config**, **Make Street Straight**, **Delete Segment(s)** or **Regenerate**.
- **Esc** works backwards one step at a time: it cancels what is going on, goes back to Select, clears the selection, then leaves Streets Mode.

<ClipAside
  media={
    <LoopingClip
      alt="Dragging a corner's fillet ring to widen the bend by hand, then switching the node's Fillet Mode back to Auto"
      poster="img/clips/streets-fillet.webp"
      src="img/clips/streets-fillet.mp4"
    />
  }
>

Corners are tuned per node. Dragging the fillet ring switches the corner to **Manual** and sets its radius directly in the viewport; the node's details swap it back to **Auto** when the network should decide again.

</ClipAside>

### Subdivide lots

<ClipAside
  media={
    <LoopingClip
      alt="Subdividing a waterfront lot: ghost streets appear, the grid tightens and switches to angled cuts, then Apply builds the real roads"
      poster="img/clips/subdivide-preview.webp"
      src="img/clips/subdivide-preview.mp4"
    />
  }
>

Subdivide cuts new streets through a lot you select, previewing them live before anything is written. It is how a drawn block becomes a neighbourhood, and it is the same mechanism for greenfield and infill: draw a closed road loop, select the lot it encloses, subdivide.

**Subdivide** is in the **Lots** group of the bar and needs at least one selected lot. Press it and the selection row turns into the preview's controls: **Seed**, **Reroll**, **Merge**, **Apply** and **Cancel**. The card above the bar shows the passes and quality limits until you apply or cancel.

</ClipAside>

1. Regenerate the network first, so its lots carry stable keys. If a lot cannot be read you are told to regenerate and reselect.
2. With the **Select** tool, click the lot or lots to subdivide.
3. Press **Subdivide** in the Lots group. Ghost streets appear immediately, one colour per pass.
4. Change **Seed** and **Merge** in the bar, and the passes and guards in the card. Every edit updates the preview at once. **Reroll** shuffles the layout.
5. Press **Apply**, or Enter.

![A two-pass Subdivide preview: an 8-lane arterial pass and a finer default pass, their ghost streets in two colours over the selected lot, with Guards, Merge, Seed, and Apply beneath](/img/screens/subdivide-panel.webp)

#### Passes

Each row in **Passes** is one cutting pass, run top to bottom, each working on the blocks the previous one left. A coarse pass followed by a finer one gives arterials first and side streets inside them.

| Control | What it does |
| --- | --- |
| **Enabled** | Skip this pass without losing its settings or disturbing the others. |
| **Street Config** | Which street config the pass's roads are built from, picked by name from the network's own configs. **Default** follows the network default. |
| **Lot Target Area** | The block size this pass aims for, in real square world units. |
| **Max Subdivisions** | Ceiling on how many times one block may be cut. |
| **Cut Mode** | **Straight** cuts square to each lot's longest edge, alternating with the perpendicular direction, for rectangular grid-like blocks that follow the lot's own orientation rather than the world axes. **Angled** cuts across the long axis with a random tilt, for organic irregular blocks. |
| **Irregularity** | How much the cut position and angle wander. At `0` a block is split exactly down the middle by **area**, deterministically. |

Adding a pass prefills it at half the previous pass's target area, so one click visibly changes the preview.

#### Guards

**Guards** are quality limits applied to every pass. A cut that fails one is rejected and another is tried; a block whose every attempt is rejected stays whole. Guards never consume randomness, so switching one on or off never reshuffles the rest of the layout.

- **Min Block Width** - the narrowest mean width a block may end up with. `-1` is **Auto**, which scales itself from the smallest enabled pass's Target Area, so asking for smaller blocks does not require lowering this by hand. `0` turns it off.
- **Min Road Angle** - the shallowest angle at which a new street may meet the road it ends on. `0` turns it off.
- **Min Junction Spacing** - how far apart new junctions must be. `-1` derives it from the network's own merge radius.

If nothing subdivides, the status bar names the effective value that rejected everything - including what Auto resolved to - and points at the control to change.

#### Merge

**Merge** dissolves a fraction of the street sections **once, after every pass has run**, fusing the blocks on either side. That is what turns a plain grid into L, T, and U shaped blocks. It can never strand a street: no dissolve is allowed to leave a junction with only one street attached, so dead ends are impossible.

#### Applying

**Apply** is purely additive - it never wipes existing streets. New endpoints weld into the roads they meet, and the status line reports how many welded away. The whole thing is one undo step.

Afterwards the lot selection clears, because the subdivided faces are new lots with new keys. To cut again inside a resulting block, let the network regenerate and reselect.

:::caution One click dismisses the preview
Any left click in the viewport and any Delete cancel the preview silently - it behaves like a popover. Clicks on the bar and the card do not. Esc, right-click and **Cancel** cancel it with a message. Nothing was written, so cancelling reverts nothing, but the settings you were tuning go with it. **Apply before doing anything else.**
:::

Your passes, guards, merge, and seed are remembered between sessions, per user, from the **last applied** run. Cancelling saves nothing, and there is no named-preset mechanism for them.

:::note Gap is a PCG setting, not a Streets Mode one
The **Gap**, **Cut Lines**, and **Gap Outlines** features belong to the [SA Subdivide Lots](/pcg/node-reference#sa-subdivide-lots) PCG node, which subdivides lot *shapes* in a graph. In Streets Mode a cut becomes a real road with a width from its street config, so there is no gap to set.
:::

### Streets Mode settings

| Category | Controls |
| --- | --- |
These are remembered per user and per project. The bar edits all of them except the Subdivide recipe, which is saved from your last applied run.

| Category | Controls |
| --- | --- |
| **Snapping** | Grid on or off, **Grid Step** (in world units, 100 = 1 m; the bar shows it in metres), and **Angle Snap Degrees** for Ctrl while drawing. |
| **Selection** | **Selection Filter**: the **Pick** menu in the bar. |
| **Gizmo** | **Axis Space**: World, Actor or Street axes for Move and Rotate. |
| **Subdivide** | Passes, guards, merge and seed of the last applied Subdivide. |

How close the mouse must come to join a node or a street, and the size of lines and handles, are fixed. They grow with the viewport's size and the screen's scaling, so there is nothing to tune.
