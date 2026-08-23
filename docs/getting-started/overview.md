---
title: Spline Architect v6
description: Build modular walls, buildings, streets, curves, and PCG-driven cities in Unreal Engine.
slug: /getting-started/overview
sidebar_position: 1
---

import Link from '@docusaurus/Link';

<div className="hero-panel">
  <div>
    <p className="small-note">USER GUIDE · UNREAL ENGINE 5.8 FIRST</p>
    <h2>Draw splines. Get buildings you can still edit.</h2>
    <p>Spline Architect fits your modular meshes along paths you draw in the viewport: walls, whole buildings, street networks, curves, and props. The result stays editable until you bake it, and baking is reversible.</p>
  </div>
  <img src="/spline-architect-docs/img/logo.png" alt="Spline Architect" />
</div>

![A street in the SACity example, built with Spline Architect](/img/screens/overview-sacity.webp)

## Choose a path

<div className="card-grid">
  <Link to="/getting-started/first-building"><strong>Build your first building</strong>Draw a Wall stack, save it as a Building Preset, and place a reusable Building.</Link>
  <Link to="/pcg/streets-city-tutorial"><strong>Generate a PCG city</strong>Turn Streets Network lots and road data into buildings, roadside props, and facade details.</Link>
  <Link to="/production/baking"><strong>Prepare production output</strong>Bake, convert, export, and check the result with Diagnostics.</Link>
</div>

## The actors

| Actor | Use it for |
| --- | --- |
| [Wall](/core-actors/wall) | Modular pieces along one or more splines, including floors, roofs, posts, and stacked walls. |
| [Building](/core-actors/building) | A reusable hierarchy of Wall presets placed on a footprint. |
| [Curve](/core-actors/curve) | Repeated or deformed meshes along a path: roads, rails, pipes, trims. |
| [Streets Network](/core-actors/streets-network) | **UE 5.8.** Connected roads, intersections, lot boundaries, surfaces, and PCG-ready city data. |
| [Lot Zone](/core-actors/lot-zone) | **UE 5.8.** A closed area that tags Streets lots for PCG filtering. |
| [Custom Piece](/core-actors/custom-piece) | A door, arch, corner, gap, or child actor placed into a Wall. |
| [Boolean](/core-actors/boolean) | Subtract or cull overlapping generated output. |

## How the workflow fits together

1. Draw and edit paths in [Architect Mode](/getting-started/architect-mode-fundamentals); use Streets Mode for road networks.
2. Save the setups you want to reuse as presets, and browse them in the [Preset Library](/authoring/preset-library).
3. While you edit, the actor shows a live generated preview. When a design is ready, **Bake Connected** turns it into persistent geometry.
4. If you later change a spline, preset, or seed, the affected output unbakes itself and shows the new preview - nothing stale survives. Look it over, then **Rebake Connected**.
5. When you no longer need Spline Architect editing at all, [convert or export](/production/conversion-export) the result to plain Unreal assets.

Step 4 is the one habit to learn: baking is a checkpoint you set deliberately, not a one-way door. The [baked-first workflow](/getting-started/baked-first-workflow) page walks through it.

**Runtime** generation exists for gameplay that must build geometry during play. It is a different contract from editor authoring - see [Runtime generation](/getting-started/baked-first-workflow#runtime-generation) before choosing it.

## Version scope

This guide shows UE 5.8. Wall, Building, Curve, Custom Piece, and Boolean also ship for UE 5.5–5.7; **Streets, Lot Zone, and the SA PCG nodes are 5.8-only**. The [compatibility page](/reference/compatibility) has the full matrix.
