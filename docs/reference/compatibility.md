---
title: Unreal Engine compatibility
description: Feature matrix and package differences for Spline Architect v6 on UE 5.5 through 5.8.
---

Spline Architect v6 ships separate binary packages for each supported Unreal Engine version. Always install the package that exactly matches the project engine.

| Feature | UE 5.5 | UE 5.6 | UE 5.7 | UE 5.8 |
| --- | :---: | :---: | :---: | :---: |
| Wall, Building, Curve | ✓ | ✓ | ✓ | ✓ |
| Custom Piece, Boolean | ✓ | ✓ | ✓ | ✓ |
| Architect Mode and Preset Library | ✓ | ✓ | ✓ | ✓ |
| Floors, roofs, shapes, stacked walls | ✓ | ✓ | ✓ | ✓ |
| Baked/runtime generation and bake methods | ✓ | ✓ | ✓ | ✓ |
| Convert, collapse, standalone export, proxy LOD | ✓ | ✓ | ✓ | ✓ |
| Diagnostics, Pivot Tool, Lightmap Tool | ✓ | ✓ | ✓ | ✓ |
| **Streets Network, Streets Mode, Lot Zone** | — | — | — | **✓** |
| **SplineArchitectPCG module and SA PCG nodes** | — | — | — | **✓** |

The UE 5.5, 5.6, and 5.7 packages exclude **both** the PCG module and the entire Streets feature. Their archives contain no Streets source, no Streets content, and no Streets Mode, so the Streets Network and Lot Zone actors do not appear in Place Actors and the road materials and textures are not installed. Everything else is the shared v6 workflow, and pages outside the UE 5.8 sections describe it unless a page says otherwise.

Lot Zone exists only to tag Streets lots, so it ships with Streets and is equally 5.8-only.

## Moving a project between engine versions

1. Back up or branch the project.
2. Close Unreal Editor.
3. Remove the old packaged plugin folder from the project's `Plugins` directory.
4. Install the package matching the target engine.
5. Convert/open a copy of the project, not the only source project.
6. Let assets resave, then test representative Walls, Buildings, baking, and conversion.

Do not share one mutable plugin `Binaries` directory between engines. An “Entry Point Not Found,” missing module, or build-ID error usually means the package and engine do not match.

## Moving a UE 5.8 project down to 5.5–5.7

A level that contains Streets Networks, Lot Zones, or SA PCG nodes cannot be opened intact on an older engine — those classes are not in the older packages, so the actors load as missing and the nodes disappear from the graph. Bake or convert that output to ordinary Unreal content first, then move the project.

## Streets and PCG on older projects

To use the Streets and SA PCG workflows, upgrade the project to UE 5.8 and install the 5.8 plugin package. Existing Wall, Building, Curve, Custom Piece, and Boolean actors authored in a 5.5–5.7 project keep working after asset conversion/resave, and can then feed the PCG nodes.
