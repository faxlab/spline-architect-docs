---
title: Diagnostics, pivot, and lightmap tools
description: See every actor and baked asset in one window, reroll seeds, and fix mesh pivots and lightmap UVs before meshes go into a kit.
---

Small tools for the work around generation: check every Spline Architect actor and baked asset in one window, give a whole level new seeds, fix a mesh's pivot or lightmap UVs before it goes into a kit, and pin the commands you use every day.

<div className="card-grid">
  <a href="#diagnostics"><strong>Diagnostics</strong>Every actor and baked asset in one window.</a>
  <a href="#randomize-seeds"><strong>Randomize Seeds</strong>New seeds for the whole level.</a>
  <a href="#pivot-tool"><strong>Pivot Tool</strong>Move a mesh's pivot to its bottom center, or anywhere on its bounds.</a>
  <a href="#lightmap-tool"><strong>Lightmap Tool</strong>Fix lightmap UVs before the mesh goes into a kit.</a>
  <a href="#pinned-toolbar"><strong>Pinned toolbar</strong>Pin the commands you use every day.</a>
</div>

## Diagnostics

Use [Diagnostics and the baked registry](/production/baking#diagnostics-and-baked-asset-registry) before large rebakes, cleanup, or conversion. It shows the current state of every actor and every tracked baked asset.

![The Diagnostics window listing every Spline Architect actor with its type, state, preset, seed, component and triangle counts](/img/screens/diagnostics-window.webp)

## Randomize Seeds

Assigns new seeds to every actor in the level - unbaked and Runtime actors regenerate, baked output stays put. It is scene-wide, so record the seeds you care about first.

## Pivot Tool

Select Static Mesh assets in the Content Browser, right-click them and choose **Pivot Tool**. It is also in the editor menu bar under **SA → Tools**.

![The Content Browser right-click menu of a Static Mesh: Pivot Tool and Lightmap Tool among the Static Mesh actions, with the Pivot Tool tooltip "Adjust the pivot of selected Static Mesh assets."](/img/screens/mesh-context-menu.webp)

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

Select Static Mesh assets in the Content Browser, right-click them and choose **Lightmap Tool**, or use **SA → Tools → Lightmap Tool**.

| Control | What it does |
| --- | --- |
| **Unwrap Method** | Fresh Unwrap (PatchBuilder), Fresh Unwrap (XAtlas), or cheap Repack Existing UVs. Repack requires a clean, non-overlapping source channel. |
| **Source Channel** | Repack only: the existing UV channel to repack. Default `0`. |
| **Initial Patch Count / Merging Angle Threshold** | PatchBuilder only. Initial Patch Count (default `100`) is how many patches the unwrap starts from; raise it for large meshes so their islands do not come out big and stretched. Merging Angle Threshold (default `45`) is the angle, in degrees, that decides when islands merge. |
| **XAtlas Max Iterations** | XAtlas only. More passes (default `2`) are slower but can reduce stretch. |
| **Channel Mode** | Override a specific channel (never UV0) or append the next free channel. Unreal supports up to eight channels. |
| **Target Channel** | Destination for Override Specific Channel. Existing data there is replaced. |
| **Use Texel Density / Texel Density** | Computes resolution from mesh size and texels per meter. |
| **Explicit Resolution** | The lightmap resolution used when Use Texel Density is off, rounded up to a power of two. Default `128`. |
| **UV Padding** | Empty space between UV islands, in texels. Default `4`. |
| **Overwrite Existing / Suffix** | On: repairs the original asset, which changes its lightmap for every actor that uses the mesh. Off (default): writes a copy with the suffix, such as `_lm`, and leaves the original alone. |

PatchBuilder is the safest default for broken source UVs. XAtlas can reduce stretch on some meshes. Repack is fast but cannot repair overlapping UV topology.

## Pinned toolbar

Pin the commands, presets, and shapes you reach for daily. It is on by default and purely for comfort; pinned state is a per-user setting, not project content.
