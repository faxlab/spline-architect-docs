---
title: Streets Network
description: Complete user-facing reference for roads, intersections, lots, surfaces, Streets Mode, baking, and PCG data.
---

:::info UE 5.8 only
Streets Network, Streets Mode, and Lot Zone ship only in the UE 5.8 package. See [compatibility](/reference/compatibility).
:::

You draw the roads; Streets Network builds everything they imply. From a graph of nodes and edges it generates the road ribbons and intersections, extracts every enclosed block as a lot with its own surface, and hands the whole structure - roads, junctions, lots, zones - to the SA PCG nodes to build on.

To start from a real place instead of drawing, [Import Map](/core-actors/import-map) builds the network from OpenStreetMap roads.

![A generated Streets Network on an island: road ribbons with filleted junctions, every enclosed block extracted as a lot, and the authored node graph over the top](/img/screens/streets-network-hero.webp)

## The Details panel

Settings are grouped the way you work: **Controls**, **Streets**, **Sidewalks & Lot Ground**, **Lots**, **Output & Baking**, and a folded **Advanced** section for fine-tuning. Every setting has a tooltip.

### Controls

| Control | What it does |
| --- | --- |
| **Edit Streets** | Opens Streets Mode to draw and edit roads, junctions and lots. |
| **Rebuild Network** | Regenerates roads, junctions, lots and surfaces from scratch. |
| **Import Map...** | Opens [Import Map](/core-actors/import-map) to fill this network with real streets from OpenStreetMap. Replaces the streets already in it; one Undo restores them. |
| **Review Issues** | Lists the places the last generation flagged - left-out map sections, width conflicts, failed lots - and frames each one. See [Review Issues](/core-actors/import-map#review-issues). |
| **Reset to Streets Defaults** | Puts the network's look back to what a newly placed Streets actor has: street types (4 and 8 lanes), road and junction materials, sidewalks and lot ground, Minimum Road Width and the default lot settings. Your roads, per-lot edits, seed and booleans stay. Asks first; one Undo restores the previous settings. |

### Streets

| Control | What it does |
| --- | --- |
| **Street Types** | The kinds of road the network builds - each has a name, width, road material, corner rounding and ramp settings. |
| **Default Street Type** | Picked by name: the type new roads use, and that roads without a type of their own fall back to. |
| **Minimum Road Width** | Narrowest any road may be, in centimetres; `0` turns it off. Thinner roads - from a street type or from imported map data - are widened to it, and lots, sidewalks and PCG follow. Roads you set by hand (Segment Override or Manual Width) keep their width. `1600` is about four lanes. |
| **Road Material / Junction Material** | Materials for road surfaces and the junctions where roads meet. A street type with its own material uses that; an empty Junction Material uses the widest road's material, then the Road Material. |
| **Texture Tile Size** | How often road, junction and lot-ground textures repeat: one tile per this many centimetres. |
| **Road Surface** | Vertex colors and the darker edge band along roads and junctions, for materials that read them. |

#### Street type fields

| Control | What it does |
| --- | --- |
| **Name / Width / Material** | Identifies the type and sets the full road width plus an optional road material. |
| **Default Fillet Mode / Default Fillet Radius** | Stamps Auto, Manual, or Disabled corner rounding onto newly drawn junctions. Radius appears for Manual. |
| **Z Ramp / Z Ramp Mode / Z Ramp Control** | Smooths height changes so roads meet junctions tangentially. Auto fully eases; Manual exposes a 0–1 control. |

### Per-segment overrides

![One selected segment with Override This Segment ticked: its Segment Config gives it a greater width and a bridge-road material, and in the viewport the dark, wider segment runs up to the ordinary roads on either side](/img/screens/streets-segment-override.webp)

A street type is shared by every segment using it. To give **one** segment its own width, material, or elevation ramp, select it in Streets Mode and tick **Override This Segment** in the **Selected Segments** panel, then edit **Segment Config** below it.

The override starts as a copy of the type the segment was already using, so ticking the box changes nothing until you edit a field - it never snaps the road to some unrelated default.

Only **Width**, **Material**, and the **Z Ramp** controls change an existing segment. Name is cosmetic, and the two **Default Fillet** fields apply only while drawing *new* streets, so they do nothing here.

:::caution An overridden segment is built on its own
It does not blend into the road it sits in: it keeps its own width and material right up to the segments on either side. That is what makes a single wider segment possible, and also what makes a subtle width change look like a seam. Override a whole road by giving it its own street type instead.
:::

**Clear Override** hands every selected segment back to the shared type, in one undo step. Overrides live on the segment itself, so splitting, joining, or merging streets carries them along.

For PCG, `SA_RoadWidth` on crossings reflects an override; `SA_ConfigIndex` keeps meaning the shared type's index.

## Sidewalks and lot ground

![Wireframe view of generated Streets geometry: road ribbons with their curb edge, the triangle fans of the intersection patches, and each lot's ground ringed by a denser sidewalk band that follows the boundary and fans into pads at the corners](/img/screens/lot-surface-layers.webp)

The wireframe shows what one layer builds. Each lot has ground made of evenly sized triangles, a tighter band just inside its edge - the sidewalk - and a fan of triangles at every street corner where a corner pad sits. Roads and junctions are separate meshes with their own curb edge.

**Sidewalks & Lot Ground → Layers** is a list. Each layer is built in order and can contribute three separate meshes, each with its own switch and material. A layer's header sums it up, for example *Lot ground · Sidewalk 5 m · Corner pads 3 m*. Inside, settings are grouped by the mesh they build:

| Group | Settings |
| --- | --- |
| **Lot Ground** | **Generate Lot Ground**, **Lot Ground Material**, **Curb Height** (raises lot ground and sidewalk together into a raised block with a curb), **Curb Lean**, **Curb Bevel**. |
| **Sidewalk** | **Generate Sidewalk**, **Sidewalk Width**, **Sidewalk Slope** (Follow Surface, Level Across, Minimum, Maximum), **Sidewalk Material**, **Sidewalk Texture Repeat**, **Flip Sidewalk Texture**. Also works for curbs, verges and planted borders. |
| **Corner Pads** | **Generate Corner Pads**, **Corner Radius**, **Corner Pad Material**. |
| **Vertex Colors** (folded) | Fill and edge colors and how softly they blend, for materials that read vertex color. |
| **Advanced** (folded) | **Surface Edge Length** and **Surface Smoothing** (as on Wall and Curve floors), **Lot Ground Texture Scale**, **Sidewalk Texture Aspect Ratio**. |

**Generate Lot Ground** and **Generate Sidewalk** are independent, so a layer can be ground, a sidewalk ring with an open middle, both, or neither.

Three behaviours are worth knowing before you author a curb:

- **Minimum and Maximum Sidewalk Slope flatten the whole layer** - sidewalk, corner pads and lot ground together. Flattening only the sidewalk would tear it off the ground on a sloped street.
- **Corner pads never rise.** With a **Curb Height** above zero the ground and sidewalk rise together while the pad stays at street level, so every corner reads as a dropped curb. That is deliberate.
- **Give a corner pad and its junction the same material.** Pads continue the junction's texture coordinates, so a shared material makes the corner seamless.

Layers are all built at the lot's ground height - there is no automatic vertical offset between them. Separation comes from **Curb Height**, or from a flattening Sidewalk Slope.

A lot too narrow for its **Sidewalk Width** is built as plain ground with no sidewalk, and Review Issues lists it.

Corner rounding changes only how the lot *looks*. The footprint PCG reads is the original outline, so **SA Get Lots** returns the same boundary whether corner pads are on or off.

## Lots

| Control | What it does |
| --- | --- |
| **Lot Seed** | Seed for everything placed on lots. Change it to get a different city on the same streets; `-1` picks a new random result every regeneration. |
| **Lot Elevation** | How lots meet sloped streets - see below. |
| **Leave Lots Empty** | Builds nothing on lots: no ground, sidewalks or spawned content, just the streets. Lots you change in Streets Mode keep their own setting. |
| **Default Zone** | Zone name every lot gets for PCG filtering (`SA_LotZone`), such as Residential or Park. A [Lot Zone](/core-actors/lot-zone) actor or a lot's own zone takes priority. |

To give **one** lot its own zone, leave it empty, give it its own sidewalks, or reroll it, select it in Streets Mode - the **Edit Lots** button in the panel opens it.

If a network made in an older version still has a hidden default-lot surface override switched on, a yellow warning appears here: lots then ignore the Sidewalks & Lot Ground layers (and are built bare when that list is empty). **Use Sidewalks & Lot Ground** fixes it in one click.

### Lot elevation modes

| Mode | Result |
| --- | --- |
| **Follow Elevation** | Default. Preserves the heights inherited from the surrounding roads. |
| **Flatten to Lowest Boundary** | Moves the complete lot boundary and surface to its lowest boundary height. |
| **Flatten to Highest Boundary** | Moves the complete lot boundary and surface to its highest boundary height. |

The mode is resolved per lot before its surface is built, so the viewport surface, the extracted boundary, baked or broken lot output and **SA Get Lots** all use the same height. A lot's own setting in Streets Mode wins over Lot Elevation.

Flattening changes the lot surface only. It does not cut the terrain by itself; Curb Height still applies. To make the terrain follow a lot, use [SA Landscape Patch](/pcg/landscape-patch).

## Output, baking and advanced settings

| Control | What it does |
| --- | --- |
| **Output Mode** | **Generate** builds full geometry; **Debug (Skeleton Only)** shows the graph without generated surfaces. |
| **Booleans to Use** | Explicit cutters for roads, junctions and lot surfaces. |
| **Advanced → Snap Radius** | Maximum endpoint distance for merging roads into one junction. |
| **Advanced → Miter Limit** | Limits how far junctions push road cuts outward. |
| **Advanced → Road Detail Mode / Curve Detail / Detail Sample Distance** | Geometry detail for roads: Adaptive keeps straight roads light; smaller values give smoother, denser curves and ramps. |
| **Advanced → Facet Angle** | Removes nearly straight lot boundary points; `0` disables. |
| **Advanced → Lot Point Merge Distance** | Merges near-coincident points before generating lot actors; `0` disables. |
| **Advanced → Show Import Guides / Owning Map Import Group** | Reference splines for bridges, tunnels and ramps from map imports, and the import group that owns this network. |

### Per-lot sidewalks

Select a lot in Streets Mode and tick **Use Surface Override** in the **Selected Lots** panel to give it its own **Surface Layers** - lot ground, sidewalk and corner pads - instead of the network's Sidewalks & Lot Ground layers. **Clear Override** returns it to the network's layers.

Per-lot Zone, tags, and surface overrides survive ordinary street editing - adding a point to a road no longer drops the settings on the lots either side of it.

## Baking

| Control | What it does |
| --- | --- |
| **Baked / Generation Mode** | State and editor-vs-runtime intent. Streets defaults can differ from other actors, so set Baked for production output. |
| **Bake Method** | Components, Instanced, or Hierarchical Instanced. |
| **Bake Network as Single Mesh** | Combines road, intersection, and lot-surface meshes into one static mesh with source material slots. Building and Wall output remains separate. |
| **Baked Mobility / Lightmap Texel Density Override** | Component mobility and optional per-actor lightmap density. |
| **Bake / Unbake** | Produces persistent road output and independent lot actors, or restores generated editing. |

## Editing the network

Beyond drawing, Streets Mode can cut a selected lot into blocks with new streets - see [Subdivide lots](/authoring/architect-mode#subdivide-lots) - fuse nodes into one intersection, and join a corner's two streets when its node is deleted.

Two behaviours changed with how selection and transforms work:

- **Marquee selection** catches a segment that spans the box, not only one that starts and ends inside it, and a box dropped inside a large block selects that block.
- **Scaling a Streets Network** bakes the scale into the graph and returns the actor to scale 1, like every other Spline Architect actor. Node positions and manual fillet radii scale with it; road **widths do not**, because street types are shared.

For viewport controls see [Streets Mode](/authoring/architect-mode#streets-mode). For data extraction and spawning see [UE 5.8 PCG](/pcg/overview).
