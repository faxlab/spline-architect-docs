---
title: Tutorial — Streets to a PCG city
description: Generate subdivided lots, buildings, road props, and zone variation from a Streets Network in UE 5.8.
---

import AnnotatedShot from '@site/src/components/AnnotatedShot';
import ClipAside from '@site/src/components/ClipAside';
import LoopingClip from '@site/src/components/LoopingClip';

<ClipAside
  media={
    <LoopingClip
      alt="Dragging a street node in Streets Mode; the lot re-extracts and the PCG buildings on it regenerate to the new parcel"
      poster="img/clips/streets-to-pcg.webp"
      src="img/clips/streets-to-pcg.mp4"
    />
  }
>

This tutorial starts with one Streets Network and ends with PCG-owned buildings and road props. Work in an unsaved staging level or duplicate the example map before experimenting.

Once the graph is wired, the city is live: move a street and the lots, buildings, and props regenerate to match.

</ClipAside>

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

Choose **Default Lot Config → Elevation Mode** before building the PCG graph:

- **Follow Elevation** preserves the road-derived boundary elevations;
- **Flatten to Lowest Boundary** creates a flat lot at its lowest edge;
- **Flatten to Highest Boundary** creates a flat lot at its highest edge.

Use **Lot Overrides** when one block needs a different mode. The visible surface and the boundary read by PCG will stay aligned. Flattening does not create retaining walls or cut the terrain by itself; feed the lots to [SA Landscape Patch](/pcg/landscape-patch) when the ground should follow them.

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
- Elevation Mode: Follow Elevation;
- fixed Seed.

Follow Elevation preserves each reconstructed child boundary. Lowest/Highest first reconstruct the terrain Z, then flatten every child independently to its own extreme boundary elevation. In all modes, each child's boundary spline, Dynamic Mesh, and Ground Surface agree. Use `SA_IsExterior` downstream if perimeter and interior lots need different rules.

## 5. Create a setback

Connect **Sub-Lot Boundaries** to **SA Polygon Offset**. Use a negative **Offset** for a building setback. A large inset can split or remove a narrow lot, so preview this output before spawning.

## 6. Generate buildings

Add useful **Preset Tags** to the source rows before building the selection graph:

- Building Presets: values such as `Residential`, `Commercial`, `Small`, or `Tower`;
- Wall Presets: precise generated-layer values such as `BaseFloor`, `Facade`, or `Trim`.

Connect offset Polygons to **SA Spawn Building → Footprints**, choose **Preset Source = Random From DataTable**, assign the Building Preset DataTable, and keep **Output = Data**.

For a small residential pool:

- add `Residential` and `Small` to **Filter Terms**;
- use **Term Match Mode = All**;
- **Include Row Names** is enabled by default; disable it when terms should match only authored Preset Tags.

Empty Filter Terms include the complete table. **Any** accepts rows matching at least one term. Selection is equal-probability, with replacement, and deterministic for fixed graph/footprint seeds. Only Building Preset tags classify Building rows; tags on referenced Wall Presets do not expand the candidate pool.

- Connect **Generated** to a stock **Static Mesh Spawner**.
- In the spawner choose **Mesh Selector Type = By Attribute** and **Attribute Name = `SA_Mesh`**.
- Connect **Dynamic Meshes** to **Spawn Dynamic Mesh** for floor/roof or other non-static pieces.
- To isolate individual `BaseFloor` pieces, use **Array Contains** on `SA_PresetTags`, then **Attribute Filter**.
- To keep a complete Building output tagged `Small`, use **Filter Data By Tag**.

If districts need different pools, branch by `SA_LotZone` and configure a different query on each SA Spawn Building node. This keeps district intent explicit without adding one node per Building row.

## 7. Place road-edge props

Add **SA Get Road Edges** for the same network and connect **Road Edges** to **SA Edge Placer**.

1. Add meshes or actor classes to Mesh Pool; set exactly one asset kind per entry.
2. Choose Left, Right, or Center and a Facing mode.
3. Use Packed for bounds-fitted curbs/barriers, Fixed Spacing for lamps, or Random Spacing for loose detail.
4. Add **SA Prune Footprints** when rotated props or terrain slopes make stock 3D Self Pruning unsuitable.
5. Send mesh picks to a Static Mesh Spawner by `SA_Mesh`; actor-class picks to Spawn Actor by `SA_Actor`.

## 8. Validate ownership and determinism

- Regenerate the graph twice and confirm fixed seeds produce identical lots and picks.
- Confirm the same footprints choose the same random Building rows after a second regeneration.
- Move one street node, rebuild Streets, then regenerate PCG; confirm lots and downstream output update.
- Move a Lot Zone, rebuild, regenerate, and confirm the `SA_LotZone` branch changes.
- Delete/regenerate the PCG component and confirm it cleans its own output.
- Keep SA Spawn output in Data mode unless live managed actors are a deliberate requirement.

Continue with [recipes](/pcg/recipes), [node reference](/pcg/node-reference), and [metadata](/pcg/metadata-reference).
