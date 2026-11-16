---
title: Custom Piece
description: Put a door, an arch, a gap or a special corner at one spot in a wall, and the wall builds around it.
---

import ClipAside from '@site/src/components/ClipAside';
import LoopingClip from '@site/src/components/LoopingClip';

<ClipAside
  media={
    <LoopingClip
      alt="Custom pieces dragged along a facade: a doorway inserted among the shutters, shop signs overlaid on the wall, and a vertical element placed up the storeys"
      poster="img/clips/custom-piece-examples.webp"
      src="img/clips/custom-piece-examples.mp4"
    />
  }
>

A Custom Piece is the exception in a wall: the door, the arch, the gap, the one special corner. Add it from the Spline Architect menu while a Wall is selected, drag it along the path to where it belongs, and the wall regenerates around it.

In the clip: a doorway **inserted** among the ground-floor shutters - it cuts its slot - then shop signs **overlaid** on top of the generated wall, and a vertical piece assigned to a range of **Floors** so it runs up the facade.

</ClipAside>

## Actor controls

| Control | What it does |
| --- | --- |
| **Data Table Preset** | A row from a custom piece preset table, such as the starter kit's `SA_CustomPieces`. The row then drives the piece and the Custom Piece Preset below turns read-only; clear it to set the piece up by hand. Picking a preset never moves the piece along its wall. |
| **Custom Piece Preset** | The piece's own settings, described below. |
| **Location Locked** | Shows whether the piece is pinned in place. Read-only: use Lock Position and Unlock Position. |
| **Locked Location** | Where the piece is pinned. Set by Lock Position, and kept up to date as its wall moves or shifts up the stack. |
| **Lock Position / Unlock Position** | Pins the piece where it is now, or lets the wall place it along the spline again. |

Locking pins a piece against the generator sliding it along the spline. It does **not** pin it in the world: the piece travels with its wall when the wall moves, and stays put when the wall's pivot is reset or centred.

Custom pieces can also be placed from a PCG graph. Mark scattered points with [SA Set Custom Piece](/pcg/node-reference#sa-set-custom-piece) and feed them into SA Spawn Wall's or SA Spawn Curve's `Custom Pieces` pin.

## Custom Piece Preset

| Control | What it does |
| --- | --- |
| **Custom Piece Type** | **Segment** (default) replaces or overlaps part of a straight run; **Corner** replaces the corner at a spline point. |
| **Corner Type** | How a Corner piece builds the turn: Straight, Bend, Chamfer or Pipe, as in the [Wall Preset](/authoring/wall-presets#corner-and-placement). |
| **Custom Piece Mesh** | The mesh the piece places. Leave it empty to make a gap as long as Custom Piece Length. |
| **Input Key on Spline** | Where the piece sits along the spline, counted in spline points: `0` is the first point, and `1.5` lies between the second and third. |
| **Floors** | Which floors the piece appears on, such as `1,2,6-8`; empty means every floor. On a Wall the numbers count that Wall's own floors; on a Building they count the floors of the whole stack. |
| **Num Meshes** | How many copies of the mesh sit side by side in the piece's span. Default `1`. |
| **Fill Segment** | Repeats the mesh along the whole segment the piece sits on, scaling pieces that are too big so they cover it. |
| **Override Length / Custom Piece Length** | How much of the wall the piece takes up. It comes from the mesh unless Override Length is on or there is no mesh; then Custom Piece Length (default `100`) sets it. |
| **Overlap By** | Pushes the piece this far into the wall pieces beside it, to close gaps - useful on corners. |
| **Add to Scale** | Added to a Segment piece's scale on each axis. `0` (default) leaves it as fitted. |
| **Reverse Orientation** | Turns a Segment piece to face the other way. |
| **Ignore Post Generation** | Leaves out the wall's posts where the piece is, for example so no post stands in a doorway. |
| **Keep World Scale / World Scale** | Keeps the piece at exactly this scale instead of scaling it to the wall height. |
| **Add Transform** | Moves, turns and scales each copy of the piece in its own space. |
| **Insert Type** | **Insert** (default) cuts the piece into the wall, replacing the wall there. **Overlap** places it on top of the wall without cutting. |
| **Child Actor Class / Scale / Offset** | A Blueprint or actor spawned with a Segment piece, with its own scale and its offset from the piece's mesh. |

Use **Insert** for doors and gaps, **Overlap** for signs and facade attachments. If a piece should appear through PCG rather than belong to one Wall, use the [PCG prop recipes](/pcg/recipes).
