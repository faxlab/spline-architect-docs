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
    <h2>Shape architecture with splines. Finish it as production geometry.</h2>
    <p>Spline Architect turns modular meshes into editable walls, reusable buildings, street networks, curves, lots, and PCG inputs. Start visually in Architect Mode, then bake connected output when the design is ready.</p>
  </div>
  <img src="/spline-architect-docs/img/logo.png" alt="Spline Architect" />
</div>

![A street in the SACity example, built with Spline Architect](/img/screens/overview-sacity.webp)

## Choose a path

<div className="card-grid">
  <Link to="/getting-started/first-building"><strong>Build your first building</strong>Draw a Wall stack, save it as a Building Preset, and place a reusable Building.</Link>
  <Link to="/pcg/streets-city-tutorial"><strong>Generate a PCG city</strong>Turn Streets Network lots and road data into buildings, roadside props, and facade details.</Link>
  <Link to="/production/baking"><strong>Prepare production output</strong>Use the baked-first lifecycle, conversion tools, proxy LODs, diagnostics, and export.</Link>
</div>

## The seven core actors

| Actor | Use it for |
| --- | --- |
| [Wall](/core-actors/wall) | Modular pieces along one or more splines, including floors, roofs, posts, and stacked walls. |
| [Building](/core-actors/building) | A reusable hierarchy of Wall presets placed on a footprint. |
| [Curve](/core-actors/curve) | Repeated or deformed meshes along a path: roads, rails, pipes, trims, and similar profiles. |
| [Streets Network](/core-actors/streets-network) | **UE 5.8.** Connected roads, intersections, lot boundaries, surfaces, and PCG-ready city data. |
| [Lot Zone](/core-actors/lot-zone) | **UE 5.8.** A closed area that assigns an `SA_LotZone` tag to Streets lots. |
| [Custom Piece](/core-actors/custom-piece) | A door, arch, corner, gap, or child actor placed into a Wall. |
| [Boolean](/core-actors/boolean) | Subtract or cull overlapping Wall, Building, Curve, and Streets output. |

## Recommended workflow

1. Prepare modular meshes with consistent axes, bounds, materials, and pivots.
2. Draw and edit paths in Architect Mode; use Streets Mode for a Streets Network.
3. Save reusable Wall, Curve, and Building presets in DataTables and browse them in the Preset Library.
4. Author in **Baked** generation mode. While you edit, Spline Architect shows the generated result.
5. Use **Bake Connected** or **Rebake Connected** when a connected design is ready for production.
6. If an authored property or spline changes, affected baked output automatically returns to an editable unbaked state. Inspect it, then rebake explicitly.
7. Convert, collapse, export, or build proxy LODs only when you no longer need Spline Architect editing.

:::tip Runtime is a different contract
Use **Runtime** generation when gameplay must create or change geometry procedurally. It is not the default production workflow for editor-authored environments.
:::

## Version scope

This guide shows UE 5.8. The Wall, Building, Curve, Custom Piece, and Boolean actors, and the authoring and baking workflows around them, also ship for UE 5.5–5.7. **Streets Network, Lot Zone, Streets Mode, and the SA PCG nodes require UE 5.8** and are absent from the older packages. See [compatibility](/reference/compatibility).
