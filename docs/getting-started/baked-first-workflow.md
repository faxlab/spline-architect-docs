---
title: Adopt the baked-first workflow
description: Author a preview, freeze it with Bake, and explicitly Unbake before further edits.
---

Spline Architect assumes your production output is baked geometry, and that you get there by editing a live preview - not by committing early and hoping. One habit makes the whole plugin behave predictably: **treat baking as a checkpoint, not a finish line.**




## The loop

1. Leave Wall, Building, Curve, and Streets actors in **Baked** generation mode while you author. This does not bake anything by itself - it declares what the output is *for*.
2. Edit splines, presets, custom pieces, Booleans, and seeds. The actor regenerates a live preview after every change.
3. When a design is ready, select any part of the connected stack and run **Bake Connected**. The preview becomes persistent components.
4. When you need another change, run **Unbake Connected** first. Baked presets and spline geometry stay locked until you do; whole-actor movement remains allowed.
5. Edit the preview, inspect it, then run **Bake/Rebake Connected**.

Shared preset edits keep existing baked output frozen. The Details panel reports **Preset changed since bake**; use **Rebake out-of-date actors** to update affected snapshots deliberately. Older untracked bakes require one explicit rebake.

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
