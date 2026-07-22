---
title: Floors, roofs, posts, and lot surfaces
description: Complete nested surface controls shared by Wall, Building, Curve, Streets, and PCG workflows.
---

## Floor Surface

| Control | What it does |
| --- | --- |
| **Material** | Surface material. |
| **Align To** | Top, Center, or Bottom of the resolved Wall/Curve height. |
| **Z Offset** | Additional vertical placement. |
| **Inset** | Positive shrinks the boundary; negative expands it. |
| **Thickness** | Extrudes the floor. |
| **Bends Resolution** | Arc sample spacing at bent corners; lower is smoother/denser. |
| **UV Scale** | `1` maps one 0–1 tile per 15 m; larger values repeat more densely. |
| **Fill Color / Edges Color** | Interior and boundary vertex colors. |
| **Color Blur Iterations** | Smooths the transition between fill and edge colors. |
| **Surface Edge Length** | Interior triangle target size; smaller is denser. Point count is capped. |
| **Surface Smoothing Iterations** | Smooths interior elevation while pinning the boundary. |

## Roof Surface

| Control | What it does |
| --- | --- |
| **Slope Angle** | Pitch in degrees. |
| **Base Inset** | Changes the source boundary; negative values create overhang. |
| **Slope Inset** | Straight-skeleton distance that determines the flat top width. |
| **Offset Z** | Moves the complete roof vertically. |
| **Resolution** | Remesh density multiplier. |
| **Fill Color / Edges Color / Color Blur Iterations** | Roof vertex-color bands and smoothing. |
| **Extrude** | Roof face thickness. |
| **Material Sloped Faces / Material Flat Faces** | Separate pitched and flat-top materials. |
| **UV Scale** | Same 15 m baseline as floor surfaces. |
| **Convex Edge Preset / Inline Convex Edge Preset** | Wall preset for ridges. The DataTable row wins when assigned. |
| **Concave Edge Preset / Inline Concave Edge Preset** | Wall preset for valleys. |
| **Border Edge Preset / Inline Border Edge Preset** | Wall preset for gutters/eaves. |
| **Flat Top Edge Preset / Inline Flat Top Edge Preset** | Wall preset around the flat top. |

Edge presets reuse the Wall generator, so orient their mesh length along X and use a small, stable profile. Inline rows are convenient for one-off roofs; DataTable rows keep trim consistent across a kit.

## Lot Surface

Streets lot layers expose **Material**, **Thickness**, **Subdivisions**, **UV Scale**, **Fill Color**, **Edges Color**, and **Color Blur Iterations**. PCG's SA Get Lots and SA Subdivide Lots can additionally emit a graded Ground Surface whose spacing and smoothing are configured on the node.

## Surface failure checklist

- Close the source spline and remove self-intersections.
- Increase point-collapse/merge distance for near-duplicate corners.
- Reduce excessive inset or roof slope inset if the polygon collapses.
- Increase Surface Edge Length or reduce smoothing if generation is too dense.
- Confirm Booleans are tall enough and affect the intended surface types.
- For static lighting, inspect generated lightmap UVs and the per-actor/project texel density.
