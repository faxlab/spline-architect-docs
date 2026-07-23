---
title: Curve
description: Complete user-facing reference for the Spline Architect Curve actor and Curve Preset.
---

Curve fits repeated meshes along a spline using architectural Z-up or transported 3D frames. Use it for curbs, rails, pipes, trims, cables, paths, and floor-surface strips.

## Actor controls

| Category | Controls |
| --- | --- |
| **Preset** | **Data Table Preset**, **Rename Actor on Preset Selection**, inline **Curve Preset**, and **Save Preset**. |
| **Controls** | **Seed**, **Start Snap**, **End Snap**, per-point **Fillet Radii**, **Booleans to Use**, **Reset Transform**, and **Force Regenerate**. |
| **Spline** | **Grid Size**, plus **Mirror X**, **Mirror Y**, **Flatten**, **Reverse**, and **Gridify** actions. |
| **Baking** | **Baked**, **Generation Mode**, **Bake Method**, **Baked Mobility**, **Lightmap Texel Density Override**, **Bake**, and **Unbake**. |

## Curve Preset

| Control | Options and effect |
| --- | --- |
| **Curve Meshes** | Static meshes tiled along the spline. |
| **Mesh Selection Policy** | Selects from multiple curve meshes by the current policy for each resolved span. |
| **Profile Orientation** | **Z Up** keeps architectural profiles upright; **Transported** carries roll through 3D bends. |
| **Default Tangent Mode** | Manual, Fillet, Auto Fillet, or Fixed Fillet tangent generation. |
| **Fillet Radius** | Uniform radius when Fixed Fillet is selected; per-point actor values can override it. |
| **Override Mesh Width / Mesh Width** | Uses a logical profile width instead of the first mesh's Y bounds. |
| **Override Mesh Height / Mesh Height** | Uses a logical height for stacking, posts, and floor alignment instead of mesh Z bounds. |
| **Overlap By** | Positive overlap closes seams; negative values create a gap. |
| **Inset** | Lateral offset; positive is outward/right. |
| **Mesh Offset** | Local position adjustment per tile. |
| **Scale Override** | Per-axis multiplier for all curve pieces. |
| **Floor Surfaces** | Same surface controls described in [Floors and roofs](/authoring/floors-roofs). Open curves close with a straight end cap. |
| **Post Configurations** | Meshes placed at points, spans, starts/ends, corners, or intervals. |
| **Material Parameters** | Include/exclude filters and scalar/vector values applied to generated materials. |

## Production notes

Use Z Up for roads, curbs, and trims that must remain upright through elevation changes. Use Transported for pipes or cables that should roll naturally along a 3D path. For individual corner tuning, edit **Fillet Radii** on the actor instead of duplicating a preset.
