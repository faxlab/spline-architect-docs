---
title: Adopt the baked-first workflow
description: Author a preview, freeze it with Bake, and explicitly Unbake before further edits.
---

import AnnotatedShot from '@site/src/components/AnnotatedShot';
import ClipAside from '@site/src/components/ClipAside';
import LoopingClip from '@site/src/components/LoopingClip';
import Flow from '@site/src/components/Flow';

Spline Architect assumes your production output is baked geometry, and that you get there by editing a live preview - not by committing early and hoping. One habit makes the whole plugin behave predictably: **treat baking as a checkpoint, not a finish line.**

<Flow
  label="The bake loop"
  loop
  steps={[
    {title: 'Bake', text: 'Freeze the preview as meshes.'},
    {title: 'Unbake', text: 'Bring the editable preview back.'},
    {title: 'Change', text: 'Edit the spline, preset or seed.'},
    {title: 'Rebake', text: 'Freeze it again.'},
  ]}
/>




<ClipAside
  media={
    <LoopingClip
      alt="A baked Building is unbaked from its Baking category, changed, and baked again"
      poster="img/clips/unbake-rebake.webp"
      src="img/clips/unbake-rebake.mp4"
    />
  }
>

The loop is short: unbake, change, rebake. The clip shows the whole round trip on one Building.

</ClipAside>

## The loop

1. Leave Wall, Building, Curve, and Streets actors in **Baked** generation mode while you author. This does not bake anything by itself - it declares what the output is *for*. The setting is **Generation Mode**, in the **Baking** category of the Details panel.

<AnnotatedShot
  alt="The Baking category of the Details panel, with the Generation Mode row set to Baked and outlined"
  src="img/screens/baking-generation-mode.webp"
  native
  callouts={[
    {label: 'Generation Mode: Baked or Runtime', x: 83, y: 50},
  ]}
/>

2. Edit splines, presets, custom pieces, Booleans, and seeds. The actor regenerates a live preview after every change.
3. When a design is ready, select any part of the connected stack, open the **SA** menu, and choose **Bake > Bake/Rebake Connected**. The preview becomes persistent components.

<AnnotatedShot
  alt="The SA menu in the editor menu bar, open, with the Bake entry outlined"
  src="img/screens/baking-sa-menu.webp"
  native
  callouts={[
    {label: 'SA menu > Bake: Bake/Rebake Connected, Unbake Connected, and Rebake out-of-date actors', x: 83, y: 51},
  ]}
/>

4. When you need another change, run **Unbake Connected** first (**SA > Bake**). Baked presets and spline geometry stay locked until you do; whole-actor movement remains allowed. A baked actor also shows an **Unbake** button at the top of its Details panel, in the **Baked output** category.

<AnnotatedShot
  alt="The Baked output category at the top of the Details panel of a baked Building, with the Unbake button outlined"
  src="img/screens/baking-baked-output-unbake.webp"
  native
  callouts={[
    {label: 'Unbake, in the Baked output category', x: 20, y: 72},
  ]}
/>

5. Edit the preview, inspect it, then run **Bake/Rebake Connected** again.

Shared preset edits keep existing baked output frozen. The Baked output category then reports **Preset changed since bake**. Use **Rebake out-of-date actors** - the button next to it, or **SA > Bake** - to update the affected actors when you choose to.

<AnnotatedShot
  alt="The Baked output category after the shared preset was edited, showing the Preset changed since bake message and the Rebake out-of-date actors button, outlined"
  src="img/screens/baking-preset-changed.webp"
  native
  callouts={[
    {label: 'The message, and the button that rebakes every out-of-date actor in the level', x: 95, y: 26},
  ]}
/>
## Choose a bake method

| Method | Pick it when | The cost |
| --- | --- | --- |
| **Components** | Pieces must stay individually selectable and editable after baking. | The most components and draw calls. |
| **Instanced** | The usual choice: repeated identical pieces, good draw-call behavior, instance custom data. | Instances are not ordinary editable components. |
| **Hierarchical Instanced** | Large scenes that want per-instance LOD and culling. | More overhead; editing individual instances is limited. |

Use **Static** mobility unless the output genuinely has to move - anything else costs lighting and rendering assumptions.

## Runtime generation

**Runtime** mode is for gameplay that must build or change geometry during play. Output is transient: the running game regenerates it, and no editor assets are created. It is not a faster way to author levels - before choosing it for an environment, check the gameplay cost, collision needs, replication plan, and platform budget.

Continue with [Baking and rebaking](/production/baking) for the connected commands, prebaked corners, save behavior, and Diagnostics.
