---
title: Unreal Engine compatibility
description: Feature matrix and package differences for Spline Architect v6 on UE 5.5 through 5.8.
---

Spline Architect v6 ships separate binary packages for each supported Unreal Engine version. Always install the package that exactly matches the project engine.

| Feature | UE 5.5 | UE 5.6 | UE 5.7 | UE 5.8 |
| --- | :---: | :---: | :---: | :---: |
| Wall, Building, Curve | ✓ | ✓ | ✓ | ✓ |
| Streets Network and Streets Mode | ✓ | ✓ | ✓ | ✓ |
| Lot Zone, Custom Piece, Boolean | ✓ | ✓ | ✓ | ✓ |
| Architect Mode and Preset Library | ✓ | ✓ | ✓ | ✓ |
| Baked/runtime generation and bake methods | ✓ | ✓ | ✓ | ✓ |
| Convert, collapse, standalone export, proxy LOD | ✓ | ✓ | ✓ | ✓ |
| Diagnostics, Pivot Tool, Lightmap Tool | ✓ | ✓ | ✓ | ✓ |
| **SplineArchitectPCG module and SA PCG nodes** | — | — | — | **✓** |

The older packages omit only the PCG module; Streets support remains available. Pages outside the UE 5.8 PCG section describe the shared v6 workflow unless a page says otherwise.

## Moving a project between engine versions

1. Back up or branch the project.
2. Close Unreal Editor.
3. Remove the old packaged plugin folder from the project's `Plugins` directory.
4. Install the package matching the target engine.
5. Convert/open a copy of the project, not the only source project.
6. Let assets resave, then test representative Walls, Buildings, Streets, baking, and conversion.

Do not share one mutable plugin `Binaries` directory between engines. An “Entry Point Not Found,” missing module, or build-ID error usually means the package and engine do not match.

## PCG on older projects

To use the new SA PCG workflows, upgrade the project to UE 5.8 and install the 5.8 plugin package. Existing ordinary Spline Architect actors from a 5.5–5.7 project can then feed the nodes after asset conversion/resave and validation.
