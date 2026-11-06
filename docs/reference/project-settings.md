---
title: Project settings
description: Complete reference for Spline Architect project-wide defaults - what new actors start with, baking, the generated mesh folder, Streets materials, lightmaps, and performance controls.
---

**Edit → Project Settings → Plugins → Spline Architect Settings** holds the project-wide defaults. A value set on an actor always wins over these.

The panel groups its controls into five categories: **Settings**, **Bake**, **Lightmaps**, **Preset Library**, and **Performance**. This page splits the long **Settings** category by topic.

## New actors

These controls decide what an actor starts with when you place it. They never change an actor that already exists.

| Control | Default | What it does |
| --- | --- | --- |
| **Default Wall Preset** | `Wall` row of the starter kit's `SA_Walls` table | The preset a newly placed Wall starts on. Pick any row from any wall preset table, the starter kit's or your own. Clear it and new Walls start with an empty inline preset that you set up on the actor itself. |
| **Default Building Preset** | `Building` row of `SA_Buildings` | The same for a newly placed Building. |
| **Default Curve Preset** | `Pipe` row of `SA_Curves` | The same for a newly placed Curve. |
| **Default Custom Piece Preset** | `Door` row of `SA_CustomPieces` | The same for a newly placed Custom Piece. |
| **Default Generation Mode** | Baked | How a newly placed actor generates. **Baked** builds real static mesh assets in the editor and saves them with the level, so the geometry is there to light, export and ship. Use it for anything you intend to keep. **Runtime** builds throwaway meshes when the game starts and saves no assets. Use it for actors that only need to exist while playing. Any actor can be switched afterwards. |
| **Default Bake Method** | Instanced | The method a new actor bakes with: Components, Instanced, or Hierarchical Instanced. See [Method and mobility](/production/baking#method-and-mobility). |
| **Default Baked Mobility** | Static | The mobility baking gives the components it creates: Static, Stationary, or Movable. |

Default Generation Mode, Default Bake Method, and Default Baked Mobility apply to newly placed Walls, Buildings, Curves, and Streets Networks. A Blueprint class built on one of them keeps the values saved in the Blueprint.

## Corners, bends, scale, and level save

| Control | Default | What it does |
| --- | --- | --- |
| **Corner Angle Increment** | 5 | Corner angles are rounded to the nearest step of this many degrees before baking, so a run of nearly identical corners shares one baked mesh instead of producing a new one each. 5 keeps the mesh count low on ordinary city work. Lower it (1, or 0.5) when corners must match their exact angle and you can afford more unique baked meshes. |
| **Default Bends Resolution** | 50 | Distance between arc sample points for floor boundaries and curved corners, in world units. Accepts 1 to 100; the slider stops at 50. |
| **On Level Save Action** | Nothing | The bake action performed when you save the level: Nothing, Rebake Unbaked, Rebake All, or Unbake All. **Nothing** is the safest team default because it avoids a large implicit save-time mutation. |
| **Auto Normalize Actor Scale** | On | When you move a Spline Architect actor whose scale is not 1,1,1, the scale is applied to the spline points, which keeps their world shape, and the actor is reset to 1,1,1. This lets you resize actors with the scale gizmo while generation stays correct. |

## Generated mesh folder

| Control | Default | What it does |
| --- | --- | --- |
| **Generated Asset Folder Override** | Empty | One content folder for every mesh asset Spline Architect generates. |

Empty keeps the locations the plugin has always used. Meshes that belong to a level go to a `<LevelName>_Baked` folder next to the level. Corner and skew pieces made from your own meshes go to a `Baked` folder beside the source mesh. An unsaved level has no folder yet, so its meshes go to `/Game/SplineArchitect/Generated/<MapName>_Baked/` until you save it.

Point the setting at a content folder, for example `/Game/MyProject/SAGenerated`, to collect all of them in one predictable place instead. That makes them easy to find, review and delete.

Meshes that already exist are not moved. Only meshes generated after the change go to the new folder. A value that is not a valid content folder path is ignored: meshes go to their default location, and the Output Log says so once. [Make Facade Kit](/authoring/facade-kit) has its own **Output Folder** and does not use this setting.

## Streets materials

These four materials set the look of a Streets Network you place from now on. Existing networks are not changed.

| Control | Default | Fills on the new network | What it does |
| --- | --- | --- | --- |
| **Default Street Ribbon Material** | `M_RoadMat_Inst` | **Road Material** | The road surface. The shared adaptive material reads each road's width and marking style. Choose your own material to change the default look. |
| **Default Street Surface Material** | `M_RoadMat_Inst` | **Junction Material** and **Corner Pad Material** | The intersections and corner pads. A custom material also supplies the lot cap when Default Street Cap Material is empty, so intersections and lot ground share one surface. With the standard road material, an empty cap setting uses the shipped sidewalk instead. |
| **Default Street Cap Material** | Empty | **Lot Ground Material** | The main lot cap. Empty uses the shipped tiling sidewalk when Default Street Surface Material is the standard road, or inherits a custom Surface material. An explicit cap material overrides that fallback. |
| **Default Street Skirt Material** | `MI_Sidewalk` | **Sidewalk Material** | The sidewalk border band. The default is the shipped continuous curb-and-paving material. An empty or unavailable material falls back to the shipped sidewalk. |

**Road Material** and **Junction Material** sit on the network itself. The other three sit on the first layer of **Sidewalks & Lot Ground → Layers**. See [Streets Network](/core-actors/streets-network) for each control.

## Bake

| Control | Default | What it does |
| --- | --- | --- |
| **Baked Mesh Nanite** | Match Project | Whether the shapes Spline Architect builds when you bake (floors, roofs, streets, merged walls, Facade Kit planes) use Nanite. **Match Project** uses Nanite whenever the project has Nanite turned on. **Always** uses it even when the project has it off. **Never** turns it off; pick it for mobile, VR and forward-rendering projects. Corner and skew pieces made from your own meshes always keep your mesh's Nanite setting, whichever you pick. A mesh with a translucent material never uses Nanite. Collision stays exactly as before. Meshes already baked change only when you rebake them. |

See [Nanite on baked meshes](/production/baking#nanite-on-baked-meshes) for when to pick each choice.

## Lightmaps

| Control | Default | What it does |
| --- | --- | --- |
| **Generate Lightmap UVs on Bake** | On | Creates a lightmap channel (UV channel 1) for baked static mesh assets, so they work with baked lighting and GPU Lightmass without manual setup. For the shapes Spline Architect builds (floors, roofs, streets, merged walls, Facade Kit planes) it takes effect only when the project allows static lighting (**Project Settings → Rendering → Allow Static Lighting**); a Lumen or fully dynamic project skips them automatically, which makes baking faster. Corner and skew pieces made from your own meshes follow this setting alone. Disable it to skip lightmap UVs everywhere. Meshes already baked change only when you rebake them. |
| **Lightmap Texel Density** | 10 | Lightmap texels per meter. Resolution derives from this and each mesh's surface area, rounds to a power of two, and clamps from 32 to 512. Accepts 1 to 100; the slider runs from 2 to 40. Greyed out while Generate Lightmap UVs on Bake is off. |
| **Lightmap UV Padding** | 4 | Approximate spacing, in texels, between generated lightmap UV islands, which prevents light bleeding. Higher means more padding at the cost of usable lightmap area. It affects only the lightmap UVs Spline Architect generates, not meshes that inherit a source asset's UVs. Accepts 2 to 16; the slider runs from 2 to 8. Greyed out while Generate Lightmap UVs on Bake is off. |
| **Set Component Lightmap Resolution on Bake** | On | Sets a lightmap resolution override on each baked component, so the chosen texel density holds across pieces of different sizes. It uses Lightmap Texel Density, or a per-actor density override, which takes priority. Disable it to leave each mesh's default lightmap resolution untouched. |

## Preset Library

| Control | Default | What it does |
| --- | --- | --- |
| **Auto Switch Preset Category on Selection** | Off | Changes the library tab to match a newly selected actor type. |

The Preset Library asset path, managed thumbnail root, and baked registry are compatibility-managed internal settings and are not normally shown for editing. Keep their generated assets under source control when presets/bakes are shared. The older baked-mesh package root is deprecated and no longer used: reusable baked meshes save next to their source mesh.

## Performance

| Control | Default | What it does |
| --- | --- | --- |
| **Enable Instanced Generation** | On | Generates unbaked wall preview and runtime output as instanced static meshes, one component per unique mesh, instead of one component per piece. Bake to Components is unaffected. Disable only to restore the legacy per-piece pipeline. |
| **Async Task Tick Budget Seconds** | 0.005 | Maximum time per frame for async generation tasks. Lower values reduce hitching, higher values speed up generation. Accepts 0.001 to 0.1; the slider stops at 0.05. |
| **Idle Async Task Tick Budget Seconds** | 0.02 | The budget used while the editor is idle, meaning no mouse or keyboard input for a moment. It is larger than the interactive budget so queued generation finishes faster when nobody is being hitched. Same range. |
| **Edit Request Debounce Seconds** | 0.25 | Delay before regeneration starts after editing a property. Prevents regeneration on every slider tick. Accepts 0.05 to 2; the slider stops at 1. Counts as 0 while Finish Generation In One Tick is on. |
| **Defer Generation While Dragging** | On | Holds off rebuilding while you drag a Spline Architect actor, one of its components, or a spline point, then rebuilds once when you let go. This keeps a big wall or street network from rebuilding on every mouse move. Turn it off to watch the geometry follow the drag continuously, at the cost of a far heavier drag. |
| **Defer Dynamic Mesh Collision** | On | Builds collision for generated meshes once at the end of a rebuild instead of after every change made to them along the way. Cooking collision is one of the slowest parts of generating, and the finished result is identical either way. Turn it off only if something in your setup needs collision to be correct part-way through a rebuild. |
| **Finish Generation In One Tick** | Off | Finishes a rebuild the moment it starts, all in one go, instead of spreading it over the next few frames. Editor only: a packaged game already builds everything in one go, so this cannot change how your shipped game behaves. With it on, an edit is completely rebuilt before you get the editor back, which makes editing feel exact and predictable. The cost is that the editor freezes for the whole rebuild, with no progress bar, and on a large Streets Network or a big Building that can be many seconds. Leave it off for city-scale work. |

Two of these also have console variables: `sa.DeferGenerationWhileDragging` and `sa.DeferDynamicMeshCollision`, each set to `1` or `0`. Once something sets one - the console, an ini file, or `-dpcvars` - it wins over the project setting. Until then, the project setting decides.

:::note Some settings are remembered per user, not here
The Pivot Tool's and Lightmap Tool's **Overwrite Existing**, the **Delete Original Actors** choices in the Convert, Collapse to Mesh, and Convert to Blueprint dialogs, the Preset Library's view mode, category tab, and favorites filter, the Streets Mode grid, angle step and Subdivide recipe, and the remembered destination folders are all editor preferences stored per user and per project. They are not part of Project Settings and are not checked in with the project.
:::

Architect Mode, Streets Mode, toolbar, selection, conversion, and Preset Library view preferences are editor-per-user settings. They are described on the relevant pages and should not be treated as shared project defaults.
