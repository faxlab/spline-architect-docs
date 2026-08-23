---
title: Custom Piece
description: Complete user-facing reference for inserted and overlapping Wall pieces.
---

Custom Piece replaces or overlays part of a Wall with a door, arch, window module, gap, special corner, or child actor. Add it from the Spline Architect menu while a Wall is selected, then position it along the target path.

## Actor controls

| Control | What it does |
| --- | --- |
| **Custom Piece Preset** | Full placement and asset configuration described below. |
| **Location Locked** | Read-only state showing whether manual movement is constrained. |
| **Locked Location** | World position restored when the actor is locked and moved. |
| **Lock Position / Unlock Position** | Captures the current location or allows movement again. |

Locking pins a piece against the generator sliding it along the spline. It does **not** pin it in the world: the piece travels with its wall when the wall moves, and stays put when the wall's pivot is reset or centred.

Custom pieces can also be placed from a PCG graph. Mark scattered points with [SA Set Custom Piece](/pcg/node-reference#sa-set-custom-piece) and feed them into SA Spawn Wall's or SA Spawn Curve's `Custom Pieces` pin.

## Custom Piece Preset

| Control | What it does |
| --- | --- |
| **Custom Piece Type** | **Segment** replaces/overlaps a straight span; **Corner** replaces a corner. |
| **Corner Type** | Straight, Bend, Chamfer, or Pipe behavior for a Corner piece. |
| **Custom Piece Mesh** | Mesh to generate; leave empty to create a gap of Custom Piece Length. |
| **Input Key on Spline** | Position along the spline in point-index space. |
| **Floors** | Segment floor selection such as `1,2,6-8`; empty means all floors. |
| **Num Meshes** | Repetition count inside the custom span. |
| **Fill Segment** | Repeats across the complete owning segment and scales oversized pieces to cover it. |
| **Override Length / Custom Piece Length** | Uses a logical span instead of mesh X bounds. |
| **Overlap By** | Extends into adjacent wall output to hide seams. |
| **Add to Scale** | Additive per-axis scale for Segment pieces. |
| **Reverse Orientation** | Flips a Segment piece. |
| **Ignore Post Generation** | Suppresses posts at locations covered by the piece. |
| **Keep World Scale / World Scale** | Keeps authored proportions and exposes an explicit scale. |
| **Add Transform** | Local location, rotation, and scale offset. |
| **Insert Type** | **Insert** cuts a slot; **Overlap** places the piece over normal wall generation. |
| **Child Actor Class / Scale / Offset** | Spawns a Blueprint/Actor child and adjusts its scale and position. |

Use **Insert** for doors and gaps, **Overlap** for signs and facade attachments. If a piece should appear through PCG rather than belong to one Wall, use the [PCG prop recipes](/pcg/recipes).
