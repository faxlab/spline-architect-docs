---
title: Wall Preset reference
description: Complete reference for modular wall fitting, corners, fillers, placement, randomization, materials, and instance data.
---

A Wall Preset is both a DataTable row and an inline structure. The same controls appear inside Wall actors, Building wall nodes, and SA Spawn Wall.

## Preset metadata

| Control | What it does |
| --- | --- |
| **Preset Tags** | Exact Name values such as `BaseFloor`, `Facade`, or `Trim`. They classify output without changing geometry. |

A standalone Wall actor and all of its generated components receive the Wall Preset tags. When a Building uses the Wall Preset, only components produced by that Wall layer receive its tags; the Building actor keeps only its own Building Preset tags. This precision lets PCG filter one generated layer without classifying the complete Building as that layer.

Changing Wall presets removes stale tags previously applied by Spline Architect while preserving unrelated Actor Tags you authored yourself.

## Core Dimensions

| Control | What it does |
| --- | --- |
| **Wall Height / Height Override** | Logical Z height; otherwise detected from the first Wall Mesh. |
| **Wall Length / Length Override** | Logical segment slot length; otherwise detected from the first Wall Mesh. |
| **Corner Length / Corner Length Override** | Corner target span or bend/cut size; otherwise detected from Corner Mesh. |
| **Corner Height Add** | Compensates for corner meshes with bounds above/below the wall body. |
| **Randomize Segments By** | Adds length variation only in Best Fit mode. |

## Wall Configuration

| Control | Options and effect |
| --- | --- |
| **Wall Z Handling** | Keep Z steps each segment; Keep Flat ignores point Z after the start; Follow Spline tilts pieces; Skew shears vertically while retaining a horizontal base. |
| **Skip Pieces** | None, Angled, or Flat. Useful when a kit has dedicated slope/step handling. |
| **Inset** | Lateral offset from the spline. |
| **Overlap Pieces By** | Extends neighbors to close seams. |
| **Num Floors** | Vertically repeats the preset by Wall Height. |
| **Treat Spline Reversed** | Flips effective point order and piece orientation. |
| **Collapse Nearby Spline Point Distance** | Merges consecutive near points; `0` disables. |

## Wall Meshes and fitting

| Control | What it does |
| --- | --- |
| **Wall Meshes** | Standard Static Mesh pieces. |
| **Custom Wall Meshes** | Static Mesh or Blueprint pieces with optional logical `Bounds Min XZ` / `Bounds Max XZ`. Blueprint entries generate Child Actor Components. |
| **Wall Piece Selection** | **Best Fit** chooses the closest natural-length piece that fits; **Random Fit** uses a deterministic fit-aware shuffled bag; **Ordered Sequence** repeats array order. |
| **Filler Wall Meshes** | Small pieces for residual gaps. |
| **Filler Placement** | Segment Sides, or Between/Ends Wall Meshes. Appears when valid fillers exist. |
| **Min Filler Wall Length** | Minimum gap before a filler is emitted. |
| **Keep World Scale / World Scale** | Retains authored scale instead of stretching pieces to the slot. |

Best Fit retains the raw source-length fallback when no piece fits. Filler packing can automatically place a valid filler before a main piece; there is no separate “prefer wall pieces before fillers” switch.

## Corner and placement

| Control | What it does |
| --- | --- |
| **Corner Mesh** | Asset used at turns. |
| **Corner Type** | Straight miter, Bend SplineMesh, Chamfer diagonal, or Pipe-style center-pivot bend. |
| **Overlap Corners By** | Extends corners into adjacent pieces. |
| **Offset By** | Global local-space offset for every generated element. |
| **Offset Stacked By** | Cumulative offset per vertical floor/layer. |

## Floors, roofs, posts, and variation

- **Floor Surfaces** and **Roof Surfaces** are fully listed in [Floors and roofs](/authoring/floors-roofs).
- **Post Configurations** exposes Post Mesh; placement at Corners, Spline Points, Between Segments, Custom Pieces, Periodically, or Start/End; start/end facing; direction averaging; skip start/end; period; offset; rotation; wall-height scaling; spline-up following; scale; and angled/flat skip rule.
- **Randomisation Settings → Random Transform** exposes location range, rotation range, scale range, and uniform-scale toggle.
- **Random Meshes** maps a Key Mesh to weighted alternatives, Keep Scale or Match Scale fitting, Knockout fraction, and optional 90°/180° rotation.

## Materials and instance custom data

**Material Parameters** filters by included/excluded/all materials and meshes, then sets named Float or Vector parameters. This creates per-component material behavior; keep parameter names consistent across the kit.

**Instance Custom Data Entries** is an ordered layout for Instanced/HISM output. An entry can write a generated scalar or a constant Float, Vector2, Vector3, or Color. Generated choices include indices, deterministic random values, actor seed, world orientation/scale/Z, spline distance/tangent, segment index/progress, Wall stack index, and floor index/progress. Materials read the expanded float slots by numeric index, so treat the order as an asset contract.
