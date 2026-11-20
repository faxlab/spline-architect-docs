---
title: Curve
description: Repeat one mesh along a path for kerbs, rails, pipes, cables and trims, upright or rolling with the path.
---

import Compare from '@site/src/components/Compare';

Curve repeats one mesh along a path: curbs, rails, pipes, trims, cables. Where Wall thinks in storeys and corners, Curve thinks in profile and flow - its one big decision is whether the profile stays upright through slopes (**Z Up**, for roads and curbs) or rolls with the path (**Transported**, for pipes and cables).

## Actor controls

| Category | Controls |
| --- | --- |
| **Preset** | **Data Table Preset**, **Rename Actor on Preset Selection**, inline **Curve Preset**, **Use Parameter Overrides** / **Parameter Overrides** to change chosen values of the row for this Curve only, and **Save Preset**. |
| **Controls** | **Seed**, **Start Snap**, **End Snap**, per-point **Fillet Radii**, **Booleans to Use**, **Reset Transform**, and **Force Regenerate**. |
| **Spline** | **Grid Size**, plus **Mirror X**, **Mirror Y**, **Flatten**, **Reverse**, and **Gridify** actions. |
| **Baking** | **Baked**, **Generation Mode**, **Bake Method**, **Baked Mobility**, **Lightmap Texel Density Override**, **Bake**, and **Unbake**. |

## Curve Preset

| Control | Options and effect |
| --- | --- |
| **Curve Meshes** | The meshes repeated along the spline. With more than one, **Mesh Selection Policy** picks among them; only **Random Compatible** uses the actor's **Seed**. |
| **Mesh Selection Policy** | **Minimum Pieces** (default) prefers the longer meshes, so the path takes as few pieces as possible. **Random Compatible** picks fitting meshes at random, the same way for the same seed, for less repetition. |
| **Profile Orientation** | **Z Up** (default) keeps the profile upright, for architectural pieces; **Transported** lets it roll through 3D bends. |
| **Default Tangent Mode** | How the path rounds its points. **Auto Fillet** (default) rounds each corner as much as the path's geometry allows. **Fixed Fillet** rounds every corner with Fillet Radius. **Fillet** takes a radius per point from the handles in the viewport. **Manual** leaves the spline's own tangents alone. |
| **Fillet Radius** | The radius every corner gets in Fixed Fillet, in world units. Default `200`. **Fillet Radii** on the actor can give single points their own. |
| **Override Profile Width / Profile Width** | Sets the exact width of the profile (default `200`). Unless Profile Height is overridden too, the height scales by the same amount, so a round pipe stays round. With a flat plane mesh, this makes a road strip that matches the junctions. |
| **Override Profile Height / Profile Height** | Sets the profile's height on its own (default `300`), for a cross-section that changes shape, such as a wide thin road or an oval pipe. This height is also used for stacking, posts and floor alignment. |
| **Overlap By** | Moves every joint between two pieces by this much on both sides. Positive values overlap the pieces to close seams; negative values open gaps. The number of pieces and their shared scale stay the same. |
| **Inset** | Moves the curve sideways off the spline: positive to the right of the path's direction, negative to the left. |
| **Piece Breaks** | Where the tiling may start again. **Continuous** (default) tiles through corners, so every piece shares one scale - best for pipes, ducts, sidewalks and rails. **Break At Corners** starts again at each rounded corner, so corners always fall on a joint. **Break At Spline Points** tiles each stretch between two points on its own. |
| **Fit Policy** | What happens when no whole number of pieces fits a run within Max Stretch and Max Shrink. **Even Stretch** (default) scales every piece in the run by the same amount to fill it exactly. **Filler Piece** keeps pieces at their own length and fills the rest with shorter meshes from the list; it needs pieces of mixed length. **Gap** keeps pieces at their own length and spreads the rest as equal gaps. |
| **Max Stretch / Max Shrink** | The most the fit tries to stretch or squash pieces to fill a run. The defaults, `1.15` and `0.85`, allow 15 % either way; past that, Fit Policy decides. |
| **Mesh Offset** | Moves every piece by this offset, for example to raise it above the spline. |
| **Scale Override** | Scales every piece by this amount, per axis. |
| **Floor Surfaces** | Same surface controls described in [Floors and roofs](/authoring/floors-roofs). Open curves close with a straight end cap. |
| **Post Configurations** | Meshes placed at points, spans, starts/ends, corners, or intervals. |
| **Material Parameters** | Include/exclude filters and scalar/vector values applied to generated materials. |

<Compare
  ratio="800 / 211"
  columns={1}
  caption="The same five points with the starter Pipe preset and three Default Tangent Modes."
  panels={[
    {src: 'img/screens/curve-tangent-manual.webp', label: 'Manual', detail: 'the spline as drawn: sharp corners here', alt: 'A teal pipe in a zig-zag with sharp corners'},
    {src: 'img/screens/curve-tangent-auto-fillet.webp', label: 'Auto Fillet', detail: 'each corner as round as it can be', alt: 'The same pipe as a smooth wave'},
    {src: 'img/screens/curve-tangent-fixed-fillet.webp', label: 'Fixed Fillet', detail: 'Fillet Radius 150 on every corner', alt: 'The same pipe with straight runs and small rounded corners'},
  ]}
/>

## Production notes

Use Z Up for roads, curbs, and trims that must remain upright through elevation changes. Use Transported for pipes or cables that should roll naturally along a 3D path; Transported pieces deform to follow a 3D bend, while straight sloped runs stay rigid. For individual corner tuning, edit **Fillet Radii** on the actor instead of duplicating a preset.
