---
title: SA Landscape Patch
description: Shape the landscape from PCG - flatten lots, cut walkways, and press level pads under props, with edge fade, noise, and paint layers.
---

SA Landscape Patch makes the terrain conform to shapes built in the graph. Flatten a park lot so its ground meets the lot surface exactly, cut a walkway ribbon along a path, or press a level pad under a placed prop so it does not float or sink.

It is the one SA node that **changes the world** rather than only producing data. That makes two of its rules unusually important: the [tracking hazard](#scope-the-selectors-upstream) and [Settle Props](#settle-props-and-regenerating-forever).

:::info UE 5.8 only
This node ships in the UE 5.8 package and needs Epic's **Landscape Patch** plugin, which the package enables for you. It works in the **editor only** - during PIE, at runtime, and in a cooked build it passes its inputs through and changes nothing.
:::

## Pins

| Pin | Type | Feed it |
| --- | --- | --- |
| `Areas` | Spline, Polygon 2D | Closed shapes whose whole surface the terrain should meet - lots, plazas. SA Get Lots (filtered to park lots), SA Subdivide Lots, SA Polygon Merge, SA Polygon Offset, SA Get Network Boundary, or any Polygon 2D. |
| `Paths` | Curve | Lines the terrain should follow as a ribbon - walkways, trails, ring roads. Also accepts Polygon 2D and Landscape Splines. |
| `Props` | Point | Points with bounds. Each becomes a level pad at the prop's base, its footprint grown by Pad Expansion. |
| `Patched Shapes` | Point, Curve | Every input, passed through unchanged. Chain into surface creation, sampling, or spawning as usual. |

All three inputs are optional - an unwired pin simply contributes nothing. `Patched Shapes` always forwards its inputs, whether or not the terrain was touched, so the rest of the graph never depends on the patch having run.

### How each pin becomes a shape

- **Areas** use the closed outline. An **open** spline here is skipped with a warning - put it on `Paths` instead. A Polygon 2D's **holes are filled, not carved**; the node warns and names the hole count. For a band around a loop rather than a filled disc, use `Paths`.
- **Paths** become a ribbon of **Path Width**. An open spline makes a path with ends; a **closed** spline makes a **loop path** - a band following the loop with its middle left untouched. A Polygon 2D makes one loop path per ring, its outline and each hole. A Landscape Spline makes one path per landscape segment.
- **Props** use each point's bounds, flat at the bottom of the prop, grown outward by **Pad Expansion**.

## Settings

| Setting | What it does |
| --- | --- |
| **Write Mode** | **Shape Surface** moves terrain to each shape's own heights. **Noise Only** leaves the base terrain alone and adds just the Noise and Height Offset inside the shapes - a masked ground-roughening brush. |
| **Apply Order** | When several SA Landscape Patch nodes shape the same ground, higher paints **later** and wins where they overlap. Flatten a park at 0, carve paths into it at 1, press prop pads on top at 2. Stable across regenerations. |
| **Blend** | **Set Height** moves terrain in both directions. **Raise Only** never digs below existing terrain - good for parks on rolling ground. **Lower Only** never lifts it - good for sunken plazas. Not used in Noise Only mode. |
| **Edge Fade** | Width of the blend band **outside** each shape where surrounding terrain ramps to meet the edge. Inside the shape the terrain always matches exactly. `0` gives a hard vertical edge. |
| **Fade Shape** | **Smooth** eases both ends (most natural), **Linear** is a straight ramp, **Ease Out** keeps the boundary steep and flattens into the surroundings. |
| **Height Offset** | Raises or sinks the whole patched area relative to the shape's surface. |
| **Landscape** | Leave empty to use the landscape the shapes sit on. Set it explicitly when the level has several. |
| **Texels Per Landscape Quad** | Advanced. `1` matches the landscape's own resolution and is recommended - higher costs memory without adding detail the landscape can show, lower softens edges. |

**Paths:** **Path Width** is the total ribbon width. **Extend Path Ends** extends open paths half a width past each end (a capped end); turn it off to cut flush where the path meets a road. Loop paths have no ends and ignore it.

**Props:** **Pad Expansion** is how far each pad extends beyond the prop's own footprint before the Edge Fade begins. **Settle Props** is advanced and explained [below](#settle-props-and-regenerating-forever).

**Noise:** **Noise Amount** is how far the noise pushes terrain up and down (`0` keeps it perfectly smooth). **Noise Scale Meters** is the feature size - small is choppy, large is long rolling undulation. **Noise Edge Fade** ramps noise up from zero at the boundary inward, so shape edges stay exact while the interior gets the full unevenness. **Noise Texture** replaces the built-in noise with a texture's red channel, where mid-gray means no change.

Each shape gets its own deterministic noise variation from its `SA_LotSeed`, so the same lot roughens the same way every regeneration.

**Paint Layer:** tick **Paint Layer** and name a layer to also paint it inside each shape, with the same Edge Fade. The layer must exist on the landscape's material **and** have a Layer Info assigned, or nothing is painted and the node warns.

## Scope the selectors upstream

This node changes the landscape. PCG regenerates any component whose change-tracking keys match a changed actor - so if a **world-reading node upstream** is left at its default **By Class, Actor**, it tracks *every* actor in the level, the landscape included. This node then changes the landscape, which re-triggers the graph, which patches again, forever.

The SA street getters are already scoped to the Streets Network class. Any stock **Get Actor Data** or **Get Spline Data** feeding this node needs the same treatment: tag the source actors and select **By Tag**.

If the editor will not settle after adding this node, check the source getters' selectors before anything else.

## Settle Props and regenerating forever

A prop projected onto the landscape - a Surface Sampler on the landscape, or a Projection node - lands on the very pad this node just wrote underneath it. Its Z moves, so the pad is rewritten, so the landscape changes, so the graph regenerates. With a **Height Offset**, noise, or a mesh whose pivot sits above its base, the ground drifts a little further on every lap.

**Settle Props** (on by default) stops that. Each pad keeps the ground height its prop had when it was **first** placed on that spot. Only height changes caused by this node's own patches are ignored:

- a prop that has **moved sideways** settles again at its new position;
- a prop whose ground changed **for another reason** settles again from that new height;
- a prop sitting in the echo of this node's own writes keeps its remembered height.

Turn it off only if a pad must follow every height change of its prop.

**To forget every settled height and start over:** Cleanup the PCG component, then Generate. There is no separate reset control.

For a log of which props anchored, moved, or were new on each run, set `sa.LandscapePatch.SettleLog 1`.

## Convergence and cleanup

The patches are PCG-managed components on a spawned `SA_PCG_LandscapePatches` actor. A regeneration whose inputs did not change writes nothing at all, and Cleanup restores the unpatched landscape - so this node is safe to leave in a graph you regenerate constantly.

## Upgrading a graph made before the Areas/Paths/Props pins

The earlier version of this node had a single `Shapes` pin. Spline connections migrate to **Areas** automatically. **Point connections do not** - re-drag them onto **Props** once, or the props will patch nothing.

## Example: a park with a path through it

1. **SA Get Lots** into **Filter Data By Attribute** on `SA_LotZone` = `Park`, into `Areas`.
2. A drawn spline through the park, read with **Get Spline Data** scoped **By Tag**, into `Paths`. Set **Path Width** to the walkway width and turn **Extend Path Ends** off where it meets a road.
3. **Get Actor Data**, scoped **By Tag** to the placed benches and trees, into `Props`.
4. Set **Blend** to **Raise Only** so the park never digs into the surrounding hillside, **Edge Fade** to a few metres, and a small **Noise Amount** with **Noise Edge Fade** so the lot borders stay exact.
5. Chain `Patched Shapes` onward to build the park's surface and scatter on it.

For a second node carving something on top of this one, give it a higher **Apply Order**.
