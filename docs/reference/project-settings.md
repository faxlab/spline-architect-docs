---
title: Project settings
description: Complete reference for Spline Architect project-wide defaults, baking, lightmaps, preset behavior, and performance controls.
---

**Edit → Project Settings → Plugins → Spline Architect Settings** holds the project-wide defaults. A value set on an actor always wins over these.

## Settings

| Control | What it does |
| --- | --- |
| **Corner Angle Increment** | Default rounding in degrees for reusable baked corner variants. |
| **Default Bends Resolution** | Arc sample distance for floor boundaries and curved corners. |
| **Default Wall Preset** | Inline setup assigned to newly spawned Wall actors before a row is chosen. |
| **Default Baked Mobility** | Initial Static, Stationary, or Movable mobility. |
| **Default Bake Method** | Initial Components, Instanced, or Hierarchical Instanced method. |
| **On Level Save Action** | Nothing, Rebake Unbaked, Rebake All, or Unbake All. **Nothing** is the safest team default because it avoids a large implicit save-time mutation. |
| **Auto Normalize Actor Scale** | Applies non-unit actor scale to spline points while preserving world shape, then resets the actor to 1,1,1. |

:::note Some settings are remembered per user, not here
The Pivot Tool's and Lightmap Tool's **Overwrite Existing**, the **Delete Original Actors** choices in the Convert, Collapse to Mesh, and Convert to Blueprint dialogs, the Preset Library's view mode, category tab, and favorites filter, the Streets Mode **Node Merge Radius** and Subdivide recipe, and the remembered destination folders are all editor preferences stored per user and per project. They are not part of Project Settings and are not checked in with the project.
:::

## Bake

| Control | Default | What it does |
| --- | --- | --- |
| **Baked Mesh Nanite** | Match Project | Whether the shapes Spline Architect builds when you bake (floors, roofs, streets, merged walls, Facade Kit planes) use Nanite. **Match Project** uses Nanite whenever the project has Nanite turned on. **Always** uses it even when the project has it off. **Never** turns it off; pick it for mobile, VR and forward-rendering projects. Corner and skew pieces made from your own meshes always keep your mesh's Nanite setting, whichever you pick. A mesh with a translucent material never uses Nanite. Collision stays exactly as before. Meshes already baked change only when you rebake them. |

See [Nanite on baked meshes](/production/baking#nanite-on-baked-meshes) for when to pick each choice.

## Lightmaps

| Control | What it does |
| --- | --- |
| **Generate Lightmap UVs on Bake** | Creates a lightmap channel for baked static mesh assets. For the shapes Spline Architect builds (floors, roofs, streets, merged walls, Facade Kit planes) it takes effect only when the project allows static lighting (**Project Settings → Rendering → Allow Static Lighting**); a Lumen or fully dynamic project skips them automatically, which makes baking faster. Corner and skew pieces made from your own meshes follow this setting alone. Disable it to skip lightmap UVs everywhere. Meshes already baked change only when you rebake them. |
| **Lightmap Texel Density** | Global texels per meter. Resolution derives from surface area, rounds to a power of two, and clamps from 32 to 512. |
| **Lightmap UV Padding** | Approximate texel gutter between generated islands. |
| **Set Component Lightmap Resolution on Bake** | Applies the derived resolution to baked components; a per-actor density override takes priority. |

## Preset Library

| Control | What it does |
| --- | --- |
| **Auto Switch Preset Category on Selection** | Changes the library tab to match a newly selected actor type. |

The Preset Library asset path, managed thumbnail root, and baked registry are compatibility-managed internal settings and are not normally shown for editing. Keep their generated assets under source control when presets/bakes are shared.

## Performance

| Control | What it does |
| --- | --- |
| **Enable Instanced Generation** | Groups identical unbaked/runtime Wall pieces into ISM components. Bake-to-Components is unaffected. Disable only to restore the legacy per-piece preview pipeline. |
| **Async Task Tick Budget Seconds** | Maximum generation work per interactive frame. Lower values reduce hitches but take longer to finish. |
| **Idle Async Task Tick Budget Seconds** | Larger budget used after the editor has been idle briefly. |
| **Edit Request Debounce Seconds** | Wait before rebuilding after property edits, preventing regeneration for every slider tick. |

Architect Mode, Streets Mode, toolbar, selection, conversion, and Preset Library view preferences are editor-per-user settings. They are described on the relevant pages and should not be treated as shared project defaults.
