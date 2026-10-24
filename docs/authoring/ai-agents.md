---
title: AI agents (MCP)
description: Let an AI assistant build and edit Spline Architect content through Unreal Engine 5.8's built-in MCP server.
---

An AI assistant connected to Unreal through MCP can place Walls, Buildings and Curves, shape their paths, lay out streets, add SA PCG nodes, save presets and convert results - through the same code paths the editor's own buttons use, and with one undo step per change. You stay in the editor and can undo, adjust or take over at any point.

:::info UE 5.8 only
The MCP server ships with Unreal Engine 5.8 as an Experimental plugin. Spline Architect's agent tools need it and are not available on 5.5-5.7. See [compatibility](/reference/compatibility).
:::

## Connect an assistant

1. In **Edit > Plugins**, enable **Model Context Protocol** (it brings the Toolset Registry and Python with it) and **All Toolsets** (Epic's own editor, PCG and asset tools), then restart the editor.
2. Start the server: type `ModelContextProtocol.StartServer 8963` in the console, or turn on **Auto Start Server** in **Editor Preferences > Plugins > Model Context Protocol** so it starts with the editor.
3. Point your assistant's MCP client at `http://localhost:8963/mcp` (Streamable HTTP). For Claude Code, for example: `claude mcp add --transport http unreal http://localhost:8963/mcp`.

There is nothing to set up in Spline Architect. When the Toolset Registry is present, the plugin registers its tools and guides at editor start; projects without MCP do not load any of it.

## What the assistant gets

| Toolset | What it covers |
| --- | --- |
| **SplineArchitectTools** | The guides and this manual; every actor type and setting with its tooltip; presets and shapes; spawning, shaping, stacking, presets, Spline Architect menu commands, baking, saving presets, converting; a summary of what an actor generated. |
| **SplineArchitectStreetsTools** | Streets networks: draw streets (crossings become intersections, as in Streets Mode), change road profiles, move and round junctions, delete streets and junctions, read the lots. Import real streets and land areas from OpenStreetMap sources you have downloaded. |
| **SplineArchitectPCGTools** | The SA PCG nodes: list them, read their pins and settings, add them to a graph. Epic's PCG tools then connect and configure them like any other node. |

The assistant reads the same tooltips you see in the Details panel, so a clear tooltip helps both of you. It also gets three working guides - general, Streets, and PCG - written for agents: the preset-first workflow, units, and the traps that cost time, such as the actor selector that makes the editor lag.

## What it does and does not do

- Authored actor and street edits are undoable. **Ctrl+Z** undoes the assistant's last action like your own.
- Commands that open a dialog are not available to it - it cannot click one, and an open dialog would block the editor. Save Preset and Convert have dialog-free versions instead.
- Saving a preset writes the preset table to disk immediately, exactly like the **Save Preset** button. Everything else waits for you to save (**File > Save All**).
- Converting keeps the original actors unless you ask it to delete them.
- An assistant can add an existing map file, inspect regional extract sizes, and start a download after you confirm the region and size. Once a source is ready, it can import areas by place name or coordinates and passes on the required OpenStreetMap attribution.
- Baked SA actors stay frozen. The assistant must explicitly Unbake before changing their presets or spline geometry; it can still move the whole actor. Shared preset edits leave baked output intact until you choose Rebake.

## Getting good results

- **Describe your presets.** In the [Preset Library](/authoring/preset-library), give presets a display name and a one-line description of their look and use. An assistant picks presets by those descriptions; with only row names like `SmallBuilding_3` it has to guess.
- **Ask in level-design terms.** "A 40 m walled courtyard with two shops inside" works; the assistant chooses presets, draws the footprints and checks what was generated.
- **Expect coarse geometry in the first screenshot.** A freshly generated building can show Nanite's low-detail placeholder - large triangles, torn-looking facades - until its meshes stream in, especially while the editor window is in the background. Capture again before treating it as a fault.
- **Keep heavy city fills in PCG.** For whole districts, have the assistant set up SA PCG graphs rather than placing hundreds of Buildings by hand; see [PCG integration](/pcg/overview).

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| The Spline Architect toolsets do not appear | Check that **Model Context Protocol** and **All Toolsets** are enabled and the editor was restarted. Python must be enabled too. After plugin changes, run `ModelContextProtocol.RefreshTools`. |
| The assistant cannot add an "SA ..." node to a PCG graph | It is using Epic's PCG toolset, which lists only engine nodes. Point it at **SplineArchitectPCGTools**. |
| Every action is slow or the assistant reports a timeout | A modal dialog or a long generation is blocking the editor. Close the dialog; large Streets networks can take seconds to regenerate. |
