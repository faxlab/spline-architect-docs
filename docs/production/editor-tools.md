---
title: Diagnostics, pivot, and lightmap tools
description: Production utilities for actor inspection, seed control, mesh pivots, lightmap UVs, and toolbar customization.
---

## Diagnostics

Use [Diagnostics and the baked registry](/production/baking#diagnostics-and-baked-asset-registry) before large rebakes, cleanup, or conversion. It is the authoritative view of current actor/bake state and tracked baked assets.

## Randomize Seeds

**Randomize Seeds** assigns new seeds to every Spline Architect actor in the level. Runtime and unbaked actors regenerate; baked output is intentionally left unchanged. To avoid an unexpected scene-wide change, duplicate the level or record important seeds before using it.

## Pivot Tool

Select Static Mesh assets in the Content Browser, then choose **Spline Architect → Pivot Tool**.

| Control | What it does |
| --- | --- |
| **Pivot X / Y / Z** | Anchor each axis at Min, Center, Max, or Keep. Defaults are center X/Y and minimum Z. |
| **Pivot Transform** | Adds a precise transform to the bounds-derived anchor. |
| **Overwrite Existing** | Repairs the selected mesh assets in place. |
| **Suffix** | When overwrite is off, creates copies such as `_pivot`. |

Use copies first when the asset is already referenced. Moving a pivot preserves the visible mesh placement in the asset but changes how new actors, fitting bounds, and downstream tools interpret its origin.

**Overwrite Existing**, the pivot anchors, the transform, and the suffix are remembered between sessions.

### Reset and Center Transform on an actor

The **Reset Transform** and **Center Transform** buttons on a Spline Architect actor move only the actor's own pivot. Everything it carries stays exactly where it was in the world - the spline points, and the attached actors including custom pieces. Reset Transform also preserves tangents and point types, so the curve between the points keeps its shape.

A **locked** custom piece is pinned against the generator sliding it along its spline, not against its wall moving. It travels with the building.

## Lightmap Tool

## Lightmap Tool

Select Static Mesh assets, then open **Spline Architect → Lightmap Tool**.

| Control | What it does |
| --- | --- |
| **Unwrap Method** | Fresh Unwrap (PatchBuilder), Fresh Unwrap (XAtlas), or cheap Repack Existing UVs. Repack requires a clean, non-overlapping source channel. |
| **Source Channel** | Existing UV channel for Repack. |
| **Initial Patch Count / Merging Angle Threshold** | PatchBuilder density and island merging. |
| **XAtlas Max Iterations** | Quality/time control for XAtlas. |
| **Channel Mode** | Override a specific channel (never UV0) or append the next free channel. Unreal supports up to eight channels. |
| **Target Channel** | Destination for Override Specific Channel. Existing data there is replaced. |
| **Use Texel Density / Texel Density** | Computes resolution from mesh size and texels per meter. |
| **Explicit Resolution** | Forced power-of-two resolution when density is off. |
| **UV Padding** | Texel gutter between islands. |
| **Overwrite Existing / Suffix** | Repairs in place or writes copies such as `_lm`. |

PatchBuilder is the safest default for broken source UVs. XAtlas can reduce stretch on some meshes. Repack is fast but cannot repair overlapping UV topology.

## Pinned toolbar

The Spline Architect toolbar can pin commands, presets, and shape entries. Use it for the small set of operations repeated by your team—typically Architect Mode, Add Wall to Selected, Bake/Rebake Connected, Preset Library, Diagnostics, and Convert. Pinned state and recent shapes are editor-user settings, not shared project content.
