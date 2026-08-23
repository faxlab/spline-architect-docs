---
title: Install and enable Spline Architect
description: Install Spline Architect from Fab or a packaged plugin and enable its Unreal Engine dependencies.
---

Install the package that matches your project's engine version exactly - a 5.8 build in a 5.8 project. Mixed versions are the single most common install problem.

## Install from Fab

1. Add [Spline Architect on Fab](https://www.fab.com/listings/356b1d13-5080-4418-893d-5a39546bc276) to your library.
2. In Epic Games Launcher, install it to the matching Unreal Engine version.
3. Open the project, then choose **Edit → Plugins**.
4. Search for **Spline Architect**, enable it, and restart the editor when prompted.

## Install a packaged copy in one project

1. Close Unreal Editor.
2. Create a `Plugins` folder beside the project's `.uproject` file if it does not exist.
3. Copy the packaged `SplineArchitect` folder into `Plugins`.
4. Reopen the project and enable **Spline Architect** under **Edit → Plugins**.

The same rule as above: never copy binaries between engine versions. Each engine gets its own package.

## Dependencies

Spline Architect enables Epic's **Geometry Scripting** plugin on every engine version.

The UE 5.8 package additionally ships the `SplineArchitectPCG` module and enables three more Epic plugins:

| Plugin | Needed for |
| --- | --- |
| **Geometry Scripting** | All generated meshes, on every engine version. |
| **PCG** | The SA PCG nodes. |
| **PCG Geometry Script Interop** | Passing generated meshes between SA nodes and PCG. |
| **Landscape Patch** | SA Landscape Patch. Without it that node cannot change the terrain. |

The UE 5.5–5.7 packages declare only Geometry Scripting. If Unreal asks to enable a dependency or to restart, accept and restart.

## Confirm the installation

After restarting:

- The main toolbar or **Tools** menu includes **Spline Architect** commands.
- The Modes panel includes **Architect Mode**.
- Placing Actors exposes the Spline Architect actor types: five on UE 5.5–5.7, and seven on UE 5.8 where Streets Network and Lot Zone are also available.
- In UE 5.8, a PCG graph's node palette finds nodes whose names begin with **SA**.

If any item is missing, see [installation troubleshooting](/reference/troubleshooting#installation-and-startup).

## Open this guide from Unreal

**Spline Architect → Documentation** opens this site.
