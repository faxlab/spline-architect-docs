---
title: Floors, roofs, posts, and lot surfaces
description: Set up the floor inside a footprint, the roof on top and the ground of a Streets lot, with one set of controls for Wall, Building, Curve and Streets.
---

import Compare from '@site/src/components/Compare';

import FloorAlignDiagram from '@site/src/components/FloorAlignDiagram';

Walls make the shell; these settings make everything the shell contains and wears - the floor slab inside a footprint, the pitched or flat roof on top, and the ground surface of a Streets lot. The same controls appear wherever a surface can exist, so learning them once covers Wall, Building, Curve, and Streets.

<Compare
  caption="One L-shaped, two-storey Wall with a roof. Only Slope Angle changes."
  panels={[
    {src: 'img/screens/roof-grid-angle-0.webp', label: '0 degrees', detail: 'Slope Angle'},
    {src: 'img/screens/roof-grid-angle-20.webp', label: '20 degrees', detail: 'Slope Angle'},
    {src: 'img/screens/roof-grid-angle-45.webp', label: '45 degrees', detail: 'Slope Angle (default)'},
  ]}
/>

## Floor Surface

<FloorAlignDiagram />

| Control | What it does |
| --- | --- |
| **Material** | Surface material. |
| **Align To** | Where the floor sits on the wall's height: at its **Bottom** (default), **Center** or **Top**. |
| **Z Offset** | Moves the floor up or down from where Align To puts it. |
| **Inset** | Shrinks the floor inside the wall's outline by this much. Negative values grow it past the wall. |
| **Thickness** | How thick the floor slab is. Default `10`. |
| **Bends Resolution** | The spacing of the points where the floor follows a bent corner. Lower values give a smoother, heavier edge. Default `50`. |
| **UV Scale** | `1` maps one 0–1 tile per 15 m; larger values repeat more densely. |
| **Fill Color / Edges Color** | Interior and boundary vertex colors. If your material ignores vertex color, set Edges Color to the same color as Fill Color, so a flat floor stays a light mesh. |
| **Color Blur Iterations** | How softly Fill Color blends into Edges Color: more passes, softer blend. Default `5`. |
| **Surface Edge Length** | Size of the triangles inside the floor, in centimetres (default `2000`, 20 m); smaller is denser. Used only where it changes something: a floor whose outline is not flat, or whose Edges Color differs from its Fill Color. The triangle count is capped, so it cannot freeze the editor. |
| **Surface Smoothing Iterations** | How many passes smooth the heights inside the floor; the outline stays where it is. More passes give smoother grading. Default `200`, the most it takes. |

A flat floor in one color is just its outline, triangulated the way roofs are - the lightest mesh it can be. Interior points are added only where they change the result. Facade Kit `_Fast` caps are white on white, so they get this lighter floor without any change to the kit. A baked actor keeps the floor mesh it was baked with until you rebake it.

## Roof Surface

<Compare
  caption="The same roof at 45 degrees. A larger Slope Inset leaves a smaller flat top. A negative Base Inset pushes the roof out past the wall."
  panels={[
    {src: 'img/screens/roof-grid-slope-inset-small.webp', label: 'Slope Inset 100', detail: 'large flat top'},
    {src: 'img/screens/roof-grid-angle-45.webp', label: 'Slope Inset 250', detail: 'default'},
    {src: 'img/screens/roof-grid-slope-inset-large.webp', label: 'Slope Inset 600', detail: 'no flat top left'},
    {src: 'img/screens/roof-grid-base-inset-negative.webp', label: 'Base Inset -100', detail: 'overhang'},
  ]}
  columns={2}
/>

| Control | What it does |
| --- | --- |
| **Slope Angle** | How steep the roof slopes are, in degrees. Default `45`. |
| **Base Inset** | Moves the roof's outline in from the wall before the roof is built. Negative values push it out past the wall, for an overhang. Default `0`. |
| **Slope Inset** | How far in from the roof's edge the slopes reach before the roof turns flat. What is left inside is the flat top, so a larger value gives a smaller flat top. Together with Slope Angle it sets how tall the roof is. Default `250`. |
| **Offset Z** | Moves the whole roof up or down. |
| **Resolution** | How finely the roof is triangulated. `1` (default) keeps it as light as its shape allows, which suits ordinary flat and sloped roofs. Raise it only when a roof needs more triangles to deform or shade smoothly; every step multiplies the triangle count. |
| **Fill Color / Edges Color / Color Blur Iterations** | Vertex colors for the roof's faces and its edges, and how softly they blend (default `50` passes), for materials that read vertex color. |
| **Extrude** | How thick the roof faces are. Default `20`. |
| **Material Sloped Faces / Material Flat Faces** | One material for the sloped faces and one for the flat top. |
| **UV Scale** | Same 15 m baseline as floor surfaces. |
| **Convex Edge Preset / Inline Convex Edge Preset** | A Wall preset run along the ridges, such as ridge tiles. The inline preset is used when no DataTable row is picked. |
| **Concave Edge Preset / Inline Concave Edge Preset** | A Wall preset run along the valleys, where two slopes meet in a fold. |
| **Border Edge Preset / Inline Border Edge Preset** | A Wall preset run along the roof's outer edge, for gutters and eaves. |
| **Flat Top Edge Preset / Inline Flat Top Edge Preset** | A Wall preset run around the edge of the flat top, such as a low parapet. |

Edge presets reuse the Wall generator, so orient their mesh length along X and use a small, stable profile. Inline rows are convenient for one-off roofs; DataTable rows keep trim consistent across a kit.

A footprint with a narrow wing, a notch, or two nearly parallel walls gets a sloped roof with proper hips and valleys. If a footprint cannot take a sloped roof, the roof is flat and the Output Log names the actor. A baked actor keeps the roof it was baked with until you rebake it.

## Lot Surface

A Streets lot surface is built from a list of layers, each of which can produce lot ground, a sidewalk, and corner pads with their own materials. **Surface Edge Length** and **Surface Smoothing** behave exactly as they do for Floor and Roof surfaces here, so flat lot ground in one color is just its outline too. See [sidewalks and lot ground](/core-actors/streets-network#sidewalks-and-lot-ground) for the full set.

PCG's SA Get Lots can additionally emit a Ground Surface that is the top of the lot mesh itself, so it follows these settings. SA Subdivide Lots emits its own graded Ground Surface, whose spacing and smoothing are configured on that node.

## Surface failure checklist

- Close the source spline and remove self-intersections.
- Raise **Collapse Nearby Spline Point Distance** in the Wall Preset when two corner points almost touch.
- Reduce excessive inset or roof slope inset if the polygon collapses.
- Increase Surface Edge Length or reduce smoothing if generation is too dense. On a flat surface, matching Edges Color to Fill Color removes the interior points altogether.
- Confirm Booleans are tall enough and affect the intended surface types.
- For static lighting, inspect generated lightmap UVs and the per-actor/project texel density.
