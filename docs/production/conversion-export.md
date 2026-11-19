---
title: Convert, collapse, proxy LOD, and export
description: Turn Spline Architect sources into independent actors, meshes, Blueprints, or a standalone level.
---

import Flow from '@site/src/components/Flow';

Conversion is the exit: it turns Spline Architect output into plain Unreal actors, meshes, or Blueprints that no longer need the plugin. It is one-way - which is why every dialog here ships with **Delete Original Actors** off, and why you leave it off until you have looked at the result.

<Flow
  label="Converting a Spline Architect source"
  steps={[
    {title: 'Source', text: 'A Spline Architect root actor.'},
    {title: 'Convert', text: 'To Actor, Static Mesh or Blueprint.'},
    {title: 'Plain Unreal assets', text: 'No Spline Architect needed. One-way.'},
  ]}
/>

## Unified Convert dialog

| Control | Options and effect |
| --- | --- |
| **Source Mode** | Selected, or all Spline Architect root actors. |
| **Operation** | **Convert to Actor**, **Convert to Static Mesh**, or **Convert to Blueprint**. |
| **Grouping** | Combined, Per Actor, Per Root Stack, or Per Mesh Type. |
| **Output Mode** | Components, Instanced, or Hierarchical Instanced components. |
| **Mobility** | Preserve Source, Static, Stationary, or Movable. |
| **Pivot Height** | **Lowest Point** (default) puts the pivot at the very bottom of the output. **Source Actor** keeps the source actor's pivot height - for a Building, street level, with its Under Base hanging below - so a converted building drops onto a lot at the right height. The pivot is always centred on the geometry from above. |
| **Include Attached Actors** | Captures attached actor hierarchies in the conversion scope. |
| **Bake Spline Architect Actors Before Convert** | Temporarily bakes sources so generated surfaces are captured. Keep enabled unless you intentionally want current component state only. |
| **Include Splines** | Copies Spline Components into Blueprint output. |
| **Spawn in Level** | Places converted actors or a new Blueprint instance after asset creation. |
| **Delete Original Actors** | Removes sources only after successful conversion. Leave off for the first pass. |

Quick commands **Convert Selected/Each to Mesh** and **Convert Selected/Each to BP** expose the corresponding focused options.

## Convert to Building

A Wall stack that has grown into a whole building can become a single **Building** actor. Select any wall of the stack and press **Convert to Building** in its **Preset** category; the whole stack converts, starting from its root wall.

The Building carries the stack's settings as its **own inline preset** - nothing is written to a DataTable and there is no save prompt. Meshes, materials, floors, roofs, attached custom pieces, the spline, the seed, the resolved mirror mode, and the actor's Outliner folder and attach parent all come along. It is one undo step, and works across a multi-selection.

To reuse the design elsewhere, press **Save Preset** on the new Building to save it to a DataTable; converting collapses one authored stack into one actor. It is also the return leg of the **Break** round-trip: break a Building, art-direct its walls, convert back - the result carries the changes inline while the shared row stays as it was.

:::note Baked presets are read-only
Explicitly Unbake before assigning, changing, or clearing a preset source. Conversion can still capture existing frozen output.
:::

## Building Proxy LOD

For **Convert to Static Mesh**, enable **Generate Building Proxy LOD** to add a welded footprint-and-roof proxy as LOD1 for eligible Building output. It uses the traditional non-Nanite LOD path and forces a source bake before capture.

| Control | What it does |
| --- | --- |
| **Proxy Texture Resolution** | Auto selects 512 or 1024 by exterior area, or force either resolution. Outputs Base Color, world Normal, and packed Metallic/Roughness/Specular textures. |
| **Proxy LOD Screen Size** | Threshold for switching from detailed LOD0 to proxy LOD1. |

Inspect silhouettes, roof coverage, material seams, texture projection, collision, and the transition distance in the target map. Proxy output is intentionally a distant representation, not a second editable Spline Architect model.

## Standalone level export

**Export Standalone Level** creates a separate level containing independent converted output. Choose **Output Mode**, **Mobility**, and **Grouping**. This is useful for delivery maps, streaming partitions, or projects that should consume geometry without the source actors.

Export to a new package and open it before deleting anything. Confirm materials, transforms, lighting, collision, instance custom data, attached actors, and level references.

## Safe handoff checklist

1. Save the source level.
2. Bake/Rebake Connected and inspect Diagnostics.
3. Convert with **Delete Original Actors** off.
4. Open generated assets and test the level in Play.
5. Check LODs, Nanite settings, collision, lightmaps, and materials.
6. Only then remove or archive source actors if the workflow requires it.
