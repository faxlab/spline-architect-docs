---
title: Building
description: Complete user-facing reference for the Spline Architect Building actor.
---

A Building maps a reusable hierarchy of Wall definitions onto one or more footprint splines. It is the production-friendly replacement for rebuilding the same connected Wall stack by hand.

![Building actor and its Building Preset controls in SACity](/img/screens/building-details.png)

## Preset and controls

| Control | What it does |
| --- | --- |
| **Data Table Building Preset** | Selects a `Building Preset` row. Disabled while baked. |
| **Rename Actor on Building Preset Selection** | Renames the actor to the row name. |
| **Building Preset** | Inline hierarchy used when no DataTable row is selected. Its **Walls** array is described below. |
| **Save Preset** | Saves the effective Building configuration as a DataTable row. |
| **Seed** | Controls random floor ranges and downstream Wall randomization. `-1` resolves randomly; non-negative values repeat. |
| **Grid Size / Auto Gridify** | Defines local spline snap cells and optional automatic snapping after edits. |
| **Booleans to Use** | Explicit cutters for generated floors, roofs, and walls. |
| **Reset Transform / Center Transform** | Normalizes or recenters the actor while preserving its path. |
| **Force Regenerate** | Rebuilds the generated Wall hierarchy. |
| **Break** | Decomposes the Building into editable connected Wall/child output, then removes the Building actor. |

## Building Preset → Walls

Every Wall entry exposes:

| Control | What it does |
| --- | --- |
| **Wall ID** | Unique stable identifier inside the hierarchy. |
| **Parent Wall ID** | Parent layer; None makes this a root/ground layer. |
| **Source Type** | **Data Table** references a Wall Preset row; **Inline** embeds a full Wall Preset. |
| **Data Table Preset** | Wall row used when Source Type is Data Table. |
| **Use Parameter Overrides / Parameter Overrides** | Changes selected Wall values without editing the shared row. |
| **Use Random Floor Range** | Chooses a repeat count between **Min Floors** and **Max Floors** from the Building seed. |
| **Min Floors / Max Floors** | Inclusive range for randomized stacking. |
| **Inline Wall Preset** | Full Wall setup used when Source Type is Inline. |

## Spline and baking

The Building shares the Wall's **Multi Spline Mode**, **Union Z Mode**, **Mirror Mode**, **Invert Mirror**, and **Apply Mirror to Spline** controls. Baking exposes **Baked**, **Generation Mode**, **Bake Method**, **Baked Mobility**, **Corner Angle Increment**, **Lightmap Texel Density Override**, **Bake**, **Unbake**, and **Prebake Corners**.

Use Baked mode for placed environments. **Break** is for one-off art direction; **Unbake** is the reversible operation that preserves the Building actor.
