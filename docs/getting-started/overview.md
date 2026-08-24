---
title: Spline Architect v6
description: Build modular walls, buildings, streets, curves, and PCG-driven cities in Unreal Engine.
slug: /getting-started/overview
sidebar_position: 1
hide_title: true
---

import Link from '@docusaurus/Link';

<div className="hero-shot">
  <img className="hero-shot__bg" src="/spline-architect-docs/img/screens/overview-sacity.webp" alt="A street in the SACity example, built with Spline Architect" />
  <div className="hero-shot__top">
    <img className="hero-shot__logo" src="/spline-architect-docs/img/logo.png" alt="Spline Architect" />
    <p className="hero-shot__tagline">Streamline your level design</p>
    <p className="hero-shot__note">Unreal Engine Plugin Documentation</p>
  </div>
  <span className="hero-shot__version">v6.0.0</span>
</div>

## The three systems

<div className="card-grid">
  <Link to="/core-actors/wall"><strong>Walls</strong>Modular pieces along a spline: corners, floors, roofs, posts, doors. Everything starts here.</Link>
  <Link to="/core-actors/building"><strong>Buildings</strong>Save a wall stack once, rebuild it on any footprint you draw.</Link>
  <Link to="/core-actors/streets-network"><strong>Streets</strong>Draw roads; get intersections, lots, and PCG-ready city data. UE 5.8.</Link>
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
