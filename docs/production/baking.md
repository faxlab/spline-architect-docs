---
title: Baking and rebaking
description: Turn the live preview into meshes saved with the level, unbake to change it again, and choose bake method, mobility, Nanite and lightmaps.
---

import AnnotatedShot from '@site/src/components/AnnotatedShot';
import ClipAside from '@site/src/components/ClipAside';
import Compare from '@site/src/components/Compare';
import LoopingClip from '@site/src/components/LoopingClip';

Bake when a design is ready: the live preview becomes meshes saved with the level, and stays exactly as it is until you unbake it. Baking is reversible. **Unbake** brings the editable preview back, because the Spline Architect actor remains the source of the design.

<AnnotatedShot
  alt="A baked Building with its Baking category open: the static mesh components it produced, and the Bake, Unbake, and Break actions"
  src="img/screens/baked-output.webp"
  callouts={[
    {label: 'Baked output: one component per piece', x: 40, y: 45},
    {label: 'The components the bake produced', x: 88, y: 17},
    {label: 'Bake, Unbake, Prebake Corners, Break', x: 88, y: 40},
    {label: 'Baked state, mode, method, mobility', x: 88, y: 48},
  ]}
/>

## Commands

| Command | Scope |
| --- | --- |
| **Bake/Rebake Connected** | Refreshes selected roots and connected Wall stacks. This is the normal production command. |
| **Unbake Connected** | Restores spline-driven editing for the connected selection. |
| **Bake Unbaked** | Bakes only unbaked Spline Architect roots in the level. |
| **Rebake out-of-date actors** | Refreshes frozen actors whose presets changed, including older untracked bakes. |
| **Rebake All** | Refreshes every compatible root. Use after a shared preset change only when the scope is understood. |
| **Unbake All** | Restores all baked roots to generated editing. |
| Actor **Bake / Unbake** buttons | Operate on one placed actor. Prefer connected commands for hierarchies. |

## Frozen snapshots and explicit Unbake

<ClipAside
  media={
    <LoopingClip
      alt="A baked Building is unbaked from its Baking category, changed, and baked again"
      poster="img/clips/unbake-rebake.webp"
      src="img/clips/unbake-rebake.mp4"
    />
  }
>

Baked actors keep their geometry until you explicitly unbake or rebake them. Their preset and spline geometry are read-only; the Details panel says **Baked - click Unbake to edit** and provides the Unbake action. Moving or rotating the whole actor remains allowed.

</ClipAside>

Use **Unbake Connected**, edit the preview, then **Bake/Rebake Connected**. Editing a borrowed source spline or a shared preset never discards another actor's baked geometry.

When a shared preset changes, baked actors show **Preset changed since bake**. **Rebake out-of-date actors** updates affected snapshots in the current level in one action. Older bakes without preset tracking are included until they have been explicitly rebaked once.

## Method and mobility

<Compare
  caption="One Building baked three ways. The pictures are the same on purpose: the bake method changes how the pieces are stored, not how they look."
  columns={3}
  panels={[
    {src: 'img/screens/bake-methods-components.webp', label: 'Components', detail: '194 static mesh components'},
    {src: 'img/screens/bake-methods-instanced.webp', label: 'Instanced', detail: '8 components + 25 ISM, 186 instances'},
    {src: 'img/screens/bake-methods-hierarchical-instanced.webp', label: 'Hierarchical Instanced', detail: '8 components + 25 HISM, 186 instances'},
  ]}
/>

| Setting | Guidance |
| --- | --- |
| **Components** | Choose when each piece must stay its own component, so you can move or edit it after baking. |
| **Instanced** | The default for repeated pieces: groups identical meshes into instances and passes [instance custom data](/authoring/wall-presets#materials-and-instance-custom-data) to their materials. |
| **Hierarchical Instanced** | Choose for large repeated sets that gain from per-instance detail levels and culling. |
| **Static mobility** | Best default for environment output and baked lighting. |
| **Stationary / Movable** | Use only when later transforms or gameplay require them. |

Bulk **Set Generation Mode**, **Set Bake Method**, and **Set Mobility** commands apply a consistent configuration to the current selection. Mixed selections show an indeterminate state rather than guessing.

A newly placed actor starts with the **Default Generation Mode**, **Default Bake Method**, and **Default Baked Mobility** from [Project settings](/reference/project-settings#new-actors).

## Corner variants

**Prebake Corners** generates reusable corner meshes for the current wall angles. **Corner Angle Increment** rounds nearby angles to reduce unique assets; `0` inherits the Project Settings value. Lower increments preserve exact architecture but increase asset count.

## Where baked meshes are saved

Meshes that belong to a level go to a `<LevelName>_Baked` folder next to the level. Corner and skew pieces made from your own meshes go to a `Baked` folder beside the source mesh. To collect every generated mesh in one folder, set **Generated Asset Folder Override** in [Project settings](/reference/project-settings#generated-mesh-folder). Meshes that already exist are not moved.

## Nanite on baked meshes

**Baked Mesh Nanite**, in **Project Settings → Plugins → Spline Architect Settings → Bake**, decides whether the shapes Spline Architect builds when you bake use Nanite. Those shapes are floors, roofs, streets, merged walls, and [Make Facade Kit](/authoring/facade-kit) planes. Nanite draws a large baked city in far fewer draw calls and keeps its shadows cheap with Virtual Shadow Maps, so on a desktop or console project it is usually the fastest choice.

| Choice | What it does |
| --- | --- |
| **Match Project** (default) | Uses Nanite when the project has Nanite turned on. |
| **Always** | Uses Nanite even when the project has it turned off. |
| **Never** | Never uses Nanite. Pick it for mobile, VR and forward-rendering projects. |

- Corner and skew pieces made from your own meshes always keep your mesh's Nanite setting, whichever choice you make. Turn Nanite off on those meshes too if you need no Nanite at all.
- A mesh with a translucent material never uses Nanite.
- Collision does not change with this setting.
- Meshes already baked change only when you bake them again. After changing the setting, use **Rebake All** to apply it to the baked actors in the level.

## Lightmaps

When **Generate Lightmap UVs on Bake** is enabled, Spline Architect creates lightmap UVs for baked mesh assets. Resolution derives from project or per-actor texel density, rounds to a power of two, and stays within the supported range. **Set Component Lightmap Resolution on Bake** applies the result to components.

For the shapes Spline Architect builds - floors, roofs, streets, merged walls, and Make Facade Kit planes - the UVs are built only when the project also allows static lighting (**Project Settings → Rendering → Allow Static Lighting**). A Lumen or fully dynamic project skips them automatically, which makes baking faster. Corner and skew pieces made from your own meshes follow **Generate Lightmap UVs on Bake** alone. Turn that setting off to skip lightmap UVs everywhere.

Static and GPU Lightmass projects should keep both on, and can use the [Lightmap Tool](/production/editor-tools#lightmap-tool) to repair source assets that need independent control. Meshes already baked change only when you bake them again.

## Diagnostics and baked asset registry

Open **Spline Architect → Diagnostics**.

- **Actor Overview** lists actor type, generation/bake state, preset, seed, component counts, triangles, and timing. Columns can be hidden.
- **Baked Assets** lists registry entries, category, source, usage state, and triangle count. Filter by category/usage or search by name.
- Context actions select actors, set generation mode, set bake method, bake/unbake selected actors, and inspect assets.

![The Diagnostics window listing every Spline Architect actor with its type, state, preset, seed, component and triangle counts](/img/screens/diagnostics-window.webp)

Never delete an apparently unused baked asset only from the Content Browser without checking Diagnostics and Unreal referencers. Conversion/export assets are independent and may be referenced outside the current level.
