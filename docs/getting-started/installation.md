---
title: Install and enable Spline Architect
description: Install Spline Architect from Fab or a packaged plugin and enable its Unreal Engine dependencies.
---

Spline Architect is an Unreal Engine project plugin. Install the build that matches the exact engine version used by your project.

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

Do not mix binaries built for different Unreal Engine versions. A 5.8 package belongs in a 5.8 project; use the separate 5.5, 5.6, or 5.7 package for those engines.

## Dependencies

Spline Architect enables the Geometry Scripting dependency. In UE 5.8 it also includes the PCG integration module and requires Epic's **PCG** plugin. If Unreal asks to enable or restart for either dependency, accept and restart.

## Confirm the installation

After restarting:

- The main toolbar or **Tools** menu includes **Spline Architect** commands.
- The Modes panel includes **Architect Mode**.
- Placing Actors exposes the seven Spline Architect actor types.
- In UE 5.8, a PCG graph's node palette finds nodes whose names begin with **SA**.

If any item is missing, see [installation troubleshooting](/reference/troubleshooting#installation-and-startup).

## Open this guide from Unreal

Choose **Spline Architect → Documentation**. The plugin descriptor points to this site's stable root URL, so documentation links continue to work as pages evolve.
