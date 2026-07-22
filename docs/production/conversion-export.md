---
title: Convert, collapse, proxy LOD, and export
description: Turn Spline Architect sources into independent actors, meshes, Blueprints, or a standalone level.
---

Conversion is a one-way handoff from Spline Architect authoring to independent Unreal output. Leave source deletion off until the converted result has been inspected.

## Unified Convert dialog

| Control | Options and effect |
| --- | --- |
| **Source Mode** | Selected, or all Spline Architect root actors. |
| **Operation** | **Convert to Actor**, **Convert to Static Mesh**, or **Convert to Blueprint**. |
| **Grouping** | Combined, Per Actor, Per Root Stack, or Per Mesh Type. |
| **Output Mode** | Components, Instanced, or Hierarchical Instanced components. |
| **Mobility** | Preserve Source, Static, Stationary, or Movable. |
| **Include Attached Actors** | Captures attached actor hierarchies in the conversion scope. |
| **Bake Spline Architect Actors Before Convert** | Temporarily bakes sources so generated surfaces are captured. Keep enabled unless you intentionally want current component state only. |
| **Include Splines** | Copies Spline Components into Blueprint output. |
| **Spawn in Level** | Places converted actors or a new Blueprint instance after asset creation. |
| **Delete Original Actors** | Removes sources only after successful conversion. Leave off for the first pass. |

Quick commands **Convert Selected/Each to Mesh** and **Convert Selected/Each to BP** expose the corresponding focused options.

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
