---
title: Streets Network
description: Complete user-facing reference for roads, intersections, lots, surfaces, Streets Mode, baking, and PCG data.
---

Streets Network owns an authored graph of nodes and edges, generates road ribbons and intersections, extracts blocks as lots, applies Lot Zones, and exposes the result to SA PCG nodes.

![Streets Network result in SACity](/img/screens/streets-network.png)

## Controls and authored data

| Control | What it does |
| --- | --- |
| **Edit** | Opens Streets Mode for graph drawing and editing. |
| **Rebuild Network** | Forces complete road, intersection, lot, and surface regeneration. |
| **Add Test Grid** | Creates a temporary validation grid. Use only for evaluation, not final authored roads. |
| **Booleans to Use** | Explicit cutters for roads, intersections, and lot surfaces. |
| **Output Mode** | **Generate** builds full geometry; **Debug (Skeleton Only)** displays the graph without generated surfaces. |
| **Nodes** | Authored positions, GUIDs, and per-node fillet controls. Streets Mode is safer than manual array editing. |
| **Edges** | Authored graph connections and their Street Config assignments. |
| **Street Configs** | Named width, material, banking, default fillet, and Z-ramp definitions. |
| **Default Street Config Index** | Config assigned when an edge has no specific selection. |

### Street Config fields

| Control | What it does |
| --- | --- |
| **Name / Width / Material** | Identifies the config and defines full road width plus an optional ribbon material override. |
| **Banking / Banking Strength** | Enables road banking and controls its 0–1 strength. |
| **Default Fillet Mode / Default Fillet Radius** | Stamps Auto, Manual, or Disabled fillet behavior onto newly drawn nodes. Radius appears for Manual. |
| **Z Ramp / Z Ramp Mode / Z Ramp Control** | Smooths elevation changes and tangentially meets intersections. Auto fully eases; Manual exposes a 0–1 control. |

## Network, materials, and lots

| Control | What it does |
| --- | --- |
| **Snap Radius** | Maximum endpoint distance for merging roads into one graph node. |
| **Miter Limit** | Limits how far intersection ports push road cuts outward. |
| **Detail Sample Distance** | Centerline sample spacing for fillets and Z ramps; smaller is smoother and denser. |
| **Ribbon Material / Intersection Material** | Defaults for roads and junction patches. Intersections can fall back to the widest incoming material, then Ribbon Material. |
| **UV Tile Size** | World-unit repeat size for road, intersection, and lot-surface materials. |
| **Street Surface** | Shared fill/edge vertex colors, edge band, blur, extrusion, and related surface controls. |
| **Default Lot Config** | Fallback `Zone`, Empty state, surface override/layers, and seed override for lots without an explicit entry. |
| **Lot Overrides** | Per-lot Empty, surface, seed, Zone, and stable boundary key data. |
| **Facet Angle** | Removes nearly collinear lot boundary points; `0` disables. |
| **Seed** | Master lot and selection seed. |
| **Lot Surfaces** | Default remeshed/extruded lot surface layers. |
| **Lot Point Merge Distance** | Merges near-coincident consecutive points before generating lot actors; `0` disables. |

## Baking

| Control | What it does |
| --- | --- |
| **Baked / Generation Mode** | State and editor-vs-runtime intent. Streets defaults can differ from other actors, so set Baked for production output. |
| **Bake Method** | Components, Instanced, or Hierarchical Instanced. |
| **Bake Network as Single Mesh** | Combines road, intersection, and lot-surface meshes into one static mesh with source material slots. Building and Wall output remains separate. |
| **Baked Mobility / Lightmap Texel Density Override** | Component mobility and optional per-actor lightmap density. |
| **Bake / Unbake** | Produces persistent road output and independent lot actors, or restores generated editing. |

For viewport controls see [Streets Mode](/authoring/architect-mode#streets-mode). For data extraction and spawning see [UE 5.8 PCG](/pcg/overview).
