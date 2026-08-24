---
title: Adopt the baked-first workflow
description: Author in Baked mode, let stale output unbake itself, and rebake deliberately.
---

Spline Architect assumes your production output is baked geometry, and that you get there by editing a live preview - not by committing early and hoping. One habit makes the whole plugin behave predictably: **treat baking as a checkpoint, not a finish line.**

import ClipAside from '@site/src/components/ClipAside';
import LoopingClip from '@site/src/components/LoopingClip';

<ClipAside
  media={
    <LoopingClip
      alt="A baked Building is edited, drops back to an editable preview, regenerates, and is rebaked"
      poster="img/clips/unbake-rebake.webp"
      src="img/clips/unbake-rebake.mp4"
    />
  }
>

## The loop

1. Leave Wall, Building, Curve, and Streets actors in **Baked** generation mode while you author. This does not bake anything by itself - it declares what the output is *for*.
2. Edit splines, presets, custom pieces, Booleans, and seeds. The actor regenerates a live preview after every change.
3. When a design is ready, select any part of the connected stack and run **Bake Connected**. The preview becomes persistent components.
4. Change something later and the affected output **unbakes itself**, back to a live preview. Spline Architect never silently re-commits a bake, and it never leaves stale baked geometry standing either.
5. Look at the regenerated result, then run **Rebake Connected**.

</ClipAside>

The point of step 4: you can always trust what you see. If it is baked, it matches its inputs; if an input changed, you are looking at the new preview and the rebake is yours to make.

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
