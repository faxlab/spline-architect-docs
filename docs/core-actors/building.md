---
title: Building
description: Put a saved stack of walls on any footprint you draw, and set the style and height of buildings imported from a map.
---

Draw any footprint, and a Building puts a saved stack of walls on it: the same storeys, trims and roof, fitted to the new shape. Edit the preset once and every placement follows; edit one placement's overrides and only it changes.

![Three buildings from one Building Preset on three different footprint splines](/img/screens/building-two-footprints.webp)

## Preset and controls

| Control | What it does |
| --- | --- |
| **Data Table Building Preset** | Selects a `Building Preset` row. Disabled while baked. |
| **Rename Actor on Building Preset Selection** | When on (default), the actor takes the name of the row you pick. |
| **Building Preset** | Inline hierarchy used when no DataTable row is selected. Its **Preset Tags** classify the Building and its **Walls** array defines the generated hierarchy. |
| **Save Preset** | Saves this Building's current settings as a row in a Building Preset DataTable, ready to place on other footprints. |
| **Seed** | The number behind the random floor counts and the walls' random choices. A fixed number gives the same building every time; `-1` (default) picks a new random seed every regeneration. |
| **Grid Size / Auto Gridify** | Defines local spline snap cells and optional automatic snapping after edits. |
| **Booleans to Use** | [Boolean](/core-actors/boolean) actors that cut holes in this Building's floors, roofs and walls. |
| **Reset Transform / Center Transform** | Moves the actor's pivot to the first spline point (and sets its scale back to 1), or to the middle of the footprint. Nothing moves in the level. |
| **Force Regenerate** | Rebuilds every wall layer of the Building now. |
| **Split Footprints** | Gives each footprint of a Building that holds several its own actor. See [Several footprints on one Building](#several-footprints-on-one-building). |
| **Break** | Turns the Building back into connected Wall actors you can edit one by one, and removes the Building actor. A Building with several footprints must be split first. |

### Preset Tags

**Preset Tags** are labels such as `Small`, `Residential` or `Industrial`, matched by their exact spelling. They say what a building is, so PCG graphs and map imports can choose it, and they change no geometry.

The Building actor and every part it generates get the Building Preset's tags. Parts made by a wall layer also keep that layer's Wall Preset tags; the Building actor itself never takes Wall tags.

When you change the preset, the tags Spline Architect added for the old one are removed. Actor Tags you added yourself stay.

Tags also drive filtered Building pools and generated-piece filtering in [SA PCG](/pcg/node-reference#sa-spawn-building).

## Building Preset → Walls

Every Wall entry exposes:

| Control | What it does |
| --- | --- |
| **Wall ID** | The layer's name inside the Building, unique to it. Other layers name it in their Parent Wall ID to stand on it. |
| **Parent Wall ID** | The layer this one stands on. None makes it a ground layer. |
| **Source Type** | **Data Table** references a Wall Preset row; **Inline** embeds a full Wall Preset. |
| **Data Table Preset** | Wall row used when Source Type is Data Table. |
| **Use Parameter Overrides / Parameter Overrides** | Changes chosen values of the Wall row for this layer only, without editing the shared row. |
| **Use Random Floor Range** | Chooses a repeat count between **Min Floors** and **Max Floors** from the Building seed. Map imports also use this range to fit each building to its real height, so it marks the section that repeats. |
| **Min Floors / Max Floors** | Inclusive range for randomized stacking. **Min Floors** can be `0`: the section may then be left out entirely, and the sections above it sit on the section below. Map imports never go below **Min Floors**, so keep `1` or more on a section that must always be there, such as a tower's shaft. |
| **Inline Wall Preset** | Full Wall setup used when Source Type is Inline. |

## Spline and baking

The Building shares the Wall's **Multi Spline Mode**, **Union Z Mode**, **Mirror Mode**, **Invert Mirror**, and **Apply Mirror to Spline** controls. Baking holds **Baked**, **Generation Mode**, **Bake Method**, **Baked Mobility**, **Corner Angle Increment**, **Bake**, **Unbake**, **Prebake Corners**, **Force Regenerate** and **Break**, and they work as on a [Wall](/core-actors/wall#baking).

Use Baked mode for placed environments. **Unbake** is the reversible operation that keeps the Building actor. **Break** goes further - back to individual Walls - and pairs with **Convert to Building** as the art-direction round-trip: break, adjust the walls one by one, collapse back into a Building whose inline preset carries the changes. The shared preset row never notices.

## Several footprints on one Building

A Building usually builds one outline from its spline. It can also hold many, each as an **SA Building Footprint**: a spline component that builds like a separate building and can carry its own style, height and floor count. Ordinary splines on the same Building keep using the Building's preset. Map imports create footprints for you. To use one by hand, add the **SA Building Footprint** component to a Building.

**Split Footprints**, in the **Spline** category of the Details panel, gives every footprint but the first an actor of its own, so you can move, restyle or Break them one at a time. The first stays on the original Building. Each footprint keeps its outline, style, height and map data, nothing moves in the level, and the new Buildings start unbaked. The whole split is one undo step, and Buildings from a map import stay part of that import.

**Break** refuses on a Building that holds several footprints, because it would keep one and lose the rest. It tells you to use Split Footprints first.

Three things follow the footprint they belong to:

- A [Custom Piece](/core-actors/custom-piece) sits on the footprint nearest it and stacks by that footprint's own style and floors.
- A [Boolean](/core-actors/boolean) with **Auto Detect Targets** on looks as high as the tallest footprint style when it searches for what to cut.
- **Reset Transform** and **Center Transform** keep every footprint, and the walls they share, where they are, not only the first.

## Buildings from a map import

[Import Map](/core-actors/import-map#buildings) turns the buildings of a real place into Buildings. Each one is an ordinary Building, owned by the import's Map Import Group, with a footprint that holds the map data. Replacing the import deletes these Buildings and builds them again fresh from the map, without changes made to them. A copy of one is independent: it stays, and it is no longer part of the import.

Select an imported Building and open the **Map Building** category in Details. The first five settings are yours to change, and each change regenerates the building. The rest is read-only map data.

| Setting | What it does |
| --- | --- |
| **Style** | A Building preset row for this footprint only. Leave it empty to use the Building's own preset. |
| **Height Metres** | The height of the walls in metres, from the ground to the top of the highest wall section (roofs come on top). Tick the box beside it to replace the height from the map. |
| **Fit Floors to Height** | Fits the floor count of the style's repeating section - the wall with a floor range - so the walls end as close to the height as possible. Off uses the style's own floor counts. |
| **Allow Beyond Preset Range** | Lets the fit add floors past the style's **Max Floors** when this building is taller than the style's range. The style's **Min Floors** always holds. |
| **Floors** | An exact floor count for the repeating section. Tick the box beside it to use it; it overrides the height fit. `0` leaves that section out. |
| **Building Name** / **Kind** | The name or address from the map, and the kind of building: House, Apartments, Commercial, Office, Industrial, Civic, Religious, Small Structure or Unspecified. |
| **Imported Height Metres** / **Height Source** | The height the import found, and where it came from: **Reported** by the map, worked out **From Floors**, **Estimated** from the kind of building, or **Manual** when you override it. |
| **Imported Style** | The style the import chose for this building. |
| **Source Identity** | The map building this footprint came from, such as `way/123`. |

Changing the Building's own preset re-fits the footprints that use it.

Imported Buildings that touch share one wall: the taller building keeps it, and the shorter one leaves out its wall along the shared stretch up to its neighbour's top. See [Shared walls](/core-actors/import-map#shared-walls).

In PCG, imported Buildings carry the actor tag `SA_MapBuilding`. [SA Get Map Buildings](/pcg/node-reference#sa-get-map-buildings) reads their footprints, and SA Spawn Building can build them again from a graph.

## Roofs on irregular footprints

A footprint with a narrow wing, a notch, or two nearly parallel walls gets a sloped roof with proper hips and valleys. If a sloped roof cannot be built, it comes out flat and the Output Log names the actor. Baked Buildings keep the roof they were baked with until you rebake them. The roof settings are in [Floors, roofs, posts, and lot surfaces](/authoring/floors-roofs#roof-surface).
