---
title: Tutorial — Streets to a PCG city
description: Generate subdivided lots, buildings, road props, and zone variation from a Streets Network in UE 5.8.
---

import AnnotatedShot from '@site/src/components/AnnotatedShot';

This tutorial starts with one Streets Network and ends with PCG-owned buildings and road props. Work in an unsaved staging level or duplicate the example map before experimenting.

<AnnotatedShot
  alt="The validated SACity Streets and PCG graph"
  src="img/screens/pcg-streets-graph.png"
  callouts={[
    {label: 'Preview and debug-object viewport', x: 20, y: 33},
    {label: 'Road-edge prop branch', x: 43, y: 43},
    {label: 'Lots, subdivision, and Building branch', x: 57, y: 46},
    {label: 'Selected-node settings', x: 82, y: 31},
  ]}
/>

## 1. Author the street graph

1. Place a **Spline Architect Streets Network**.
2. Add at least one Street Config with a width and material.
3. Press **Edit**, choose Draw, and create connected roads that enclose one or more blocks.
4. Press Enter to finish each stroke. In Select mode, straighten intended spans and adjust fillet rings.
5. Set **Output Mode = Generate** and press **Rebuild Network**.

Confirm that intersection patches are closed and visible and that block interiors resolve as lots. If not, fix the authored graph before adding PCG.

## 2. Add semantic zones

Draw closed Lot Zone actors over parts of the blocks and set names such as `Residential`, `Commercial`, and `Park`. Rebuild the Streets Network after moving a zone. The smallest overlapping zone wins.

## 3. Read lots into PCG

Create a PCG Graph on a PCG Volume or PCG Component whose bounds include the network. Add **SA Get Lots**:

- configure **Actor Selector** to find the intended Streets Network;
- keep **Include Empty Lots** enabled while debugging so `SA_LotEmpty` stays visible;
- enable **Emit Lot Surfaces** only if the graph will sample or spawn on them;
- use Ground Surface spacing/smoothing appropriate to the terrain.

Inspect the **Lot Boundaries** output. Each closed spline carries `SA_LotIndex`, `SA_LotEmpty`, `SA_LotArea`, `SA_LotSeed`, `SA_LotZone`, `SA_LotSurfaceMaterial`, and `SA_SourceActor`.

## 4. Filter and subdivide

Add **Filter Data By Attribute** after Lot Boundaries and keep `SA_LotEmpty == false`. Branch by `SA_LotZone` if different districts need different presets.

Feed a branch to **SA Subdivide Lots**. Start with:

- Lot Target Area: `6,000,000 cm²`;
- Max Subdivisions: `2`;
- Cut Mode: Angled;
- Irregularity: `0.25`;
- Gap: a small firebreak/alley width;
- Knockout: `0` while validating;
- Boundary Filter: All;
- fixed Seed.

Use `SA_IsExterior` downstream if perimeter and interior lots need different rules.

## 5. Create a setback

Connect subdivided **Lot Boundaries** to **SA Polygon Offset**. Use a negative **Offset** for a building setback. A large inset can split or remove a narrow lot, so preview this output before spawning.

## 6. Generate buildings

Connect offset Polygons to **SA Spawn Building → Footprints**. Assign a Building Preset DataTable row and choose **Output = Data**.

- Connect **Generated** to a stock **Static Mesh Spawner**.
- In the spawner choose **Mesh Selector Type = By Attribute** and **Attribute Name = `SA_Mesh`**.
- Connect **Dynamic Meshes** to **Spawn Dynamic Mesh** for floor/roof or other non-static pieces.

If a district uses another Building Preset, branch before SA Spawn Building rather than changing rows per output point.

## 7. Place road-edge props

Add **SA Get Road Edges** for the same network and connect **Road Edges** to **SA Edge Placer**.

1. Add meshes or actor classes to Mesh Pool; set exactly one asset kind per entry.
2. Choose Left, Right, or Center and a Facing mode.
3. Use Packed for bounds-fitted curbs/barriers, Fixed Spacing for lamps, or Random Spacing for loose detail.
4. Add **SA Prune Footprints** when rotated props or terrain slopes make stock 3D Self Pruning unsuitable.
5. Send mesh picks to a Static Mesh Spawner by `SA_Mesh`; actor-class picks to Spawn Actor by `SA_Actor`.

## 8. Validate ownership and determinism

- Regenerate the graph twice and confirm fixed seeds produce identical lots and picks.
- Move one street node, rebuild Streets, then regenerate PCG; confirm lots and downstream output update.
- Move a Lot Zone, rebuild, regenerate, and confirm the `SA_LotZone` branch changes.
- Delete/regenerate the PCG component and confirm it cleans its own output.
- Keep SA Spawn output in Data mode unless live managed actors are a deliberate requirement.

Continue with [recipes](/pcg/recipes), [node reference](/pcg/node-reference), and [metadata](/pcg/metadata-reference).
