---
title: Preset Library and DataTables
description: Browse, save, edit, thumbnail, favorite, filter, and drag Spline Architect presets.
---

import ClipAside from '@site/src/components/ClipAside';
import LoopingClip from '@site/src/components/LoopingClip';

<ClipAside
  image="img/screens/preset-library.png"
  scale={0.25}
  alt="The Preset Library docked as a panel: category tabs, table filter, search, the toolbar, a thumbnail grid with favorites, and the selected preset's settings below"
>

Find a preset and drag it into the level, or save the actor you just tuned as a preset for next time. The Preset Library holds every Wall, Building, Curve, Custom Piece and Streets preset in your project. Open it from the Spline Architect menu or the Architect Mode panel.

It docks like any editor tab. The top half is the browser - category tabs, a DataTable filter, search, the action toolbar, and the presets themselves as a list or a thumbnail grid. The bottom half shows the selected preset's settings, so you can tweak a row without leaving the panel.

</ClipAside>


## Library controls

| Control | What it does |
| --- | --- |
| **Category tabs** | Show one preset type at a time. With the Project Setting for it on, selecting an actor switches to its tab. |
| **DataTable filter** | Choose which tables the library shows rows from, or switch them all on or off. |
| **Search** | Matches display name, row name, description, type, and DataTable path. |
| **Favorites only / Favorite** | Star the presets you use most, then show only those. Starring does not change the DataTable. |
| **View** | Columns, Columns + Thumbnails, Small Icons, Medium Icons, or Large Icons. |
| **Reload** | Reads the preset DataTables again, for example after you added rows in the DataTable editor. |
| **Save selected actor as new preset** | Makes a new row from the selected Wall, Building, Curve, Custom Piece or Streets Network. |
| **Update Thumbnail** | Renders a new thumbnail for the selected preset and keeps it with the library. |
| **Delete** | Removes selected rows after confirmation; multi-selection can span DataTables. |
| **Open Source DataTable** | Opens the selected row's table in Unreal's DataTable editor. |

### Acting on several presets at once

The right-click menu acts on the **whole selection**, and its entries name the count. **Add to Favorites**, **Duplicate**, and **Delete** all work across a multi-selection, spanning DataTables, and Delete asks once for the lot. Favoriting is a single decision for the group: if any selected preset is not yet a favorite, the action favorites them all; only when they are all favorites already does it clear them.

Right-clicking a preset that is *outside* the current selection acts on that preset alone, the same way the Content Browser behaves.

The remaining actions - Start Drawing, Apply to Selected, Create from Preset, Spawn as Attached, Insert into Stack, Overwrite, Update Thumbnail, Rename, and Open Source DataTable - need a single target and are disabled on a multi-selection.

Selecting a row exposes editable metadata: **Display Name**, **Description**, **Favorite**, and optional custom **Thumbnail**. If no custom texture is supplied, supported preset types can render a managed thumbnail or fall back to a representative mesh.

### Make a fast copy of a Building preset

Right-click a Building preset and choose **Make Facade Kit…** to make a fast, fixed-height copy of it, named `<Row>_Fast`, in a `<Table>_Fast` table. With several Building presets selected the entry reads **Make N Facade Kits…** and makes one copy of each. The new presets are selected when the work finishes. A window asks for the texture sharpness and floor counts first; see [Make Facade Kit](/authoring/facade-kit).

## Drag and drop

<ClipAside
  media={
    <LoopingClip
      alt="Several Building presets selected in the library and dragged into the viewport together, landing as a spaced cluster at the drop point"
      poster="img/clips/preset-drag-multi.webp"
      src="img/clips/preset-drag-multi.mp4"
    />
  }
>

- Drag a preset into the level viewport to create its actor. Dragging with several presets selected places **all** of them in one step and one undo: free-standing actors are arranged on a grid centred on the drop point and spaced by their measured bounds, so nothing overlaps. Custom pieces that find an owner are positioned by that owner's spline instead.
- Drag a preset onto the Architect Mode panel to make it the active drawing preset.
- Use recent-preset chips for the last Wall, Building, and Curve rows without reopening the full library.

</ClipAside>

:::tip Presets missing after reopening the library?
The active category tab and the **Favorites only** toggle are both remembered between sessions. A library that looks empty is usually filtered to a type you were last working in, or to favorites - check those two before the DataTable filter.
:::

## Create the correct DataTable

In the Content Browser choose **Add → Miscellaneous → Data Table**, then select the matching row structure:

| Preset | Row structure |
| --- | --- |
| Wall | `WallPreset` |
| Building | `BuildingPreset` |
| Curve | `CurvePreset` |
| Custom Piece | `SplineArchitectCustomPiecePresetRow` |
| Streets | `StreetsPreset` |

Use separate tables for coherent asset kits or teams, not for every individual row. The library key is the preset type + DataTable asset + row name, so identical row names in different tables remain distinct.

## Classification tags

Building, Wall and Streets rows have **Preset Tags**: labels, matched by exact spelling, that say what a preset is. PCG graphs use them to pick out generated parts and to choose Buildings from a table. Examples:

- Building: `Small`, `Residential`, `Commercial`, `Tower`;
- Wall: `BaseFloor`, `Facade`, `Trim`;
- Streets: `Residential`, `OldTown`.

Applying a Streets preset copies its tags to the Streets Network, and from there to every road, junction and lot surface it generates. Set an SA street node's actor selector to **By Tag** to read only those networks.

Tags belong to the preset row or inline preset and are included when that preset is saved. They are separate from the Preset Library's Display Name, Description, Favorite, and Thumbnail metadata. Curve presets do not expose Preset Tags.

Filter **SA Spawn Building → Random From DataTable** candidates by Building tags, not by the tags of the Wall rows a Building uses. Wall tags stay on the parts that Wall layer generates.

## Saving and updating

Actor **Save Preset** and library **Save selected actor as new preset** both create rows. When you save, choose whether the actor switches to the saved row: it then follows the shared row instead of its own inline settings. Editing a row in the DataTable changes every actor that uses it when they regenerate, except for values an actor changes with Parameter Overrides.

Commit the DataTable, Preset Library Data Asset, and generated managed thumbnail assets together when sharing presets through source control.

## Streets presets

A Streets preset holds a street look, not a street layout. Select a Streets Network, press **Save selected actor as new preset**, then apply the row to another network to give it the same finish. Applying never touches roads, junctions, lot edits or import data, and one Undo puts the old look back.

A row holds:

- **Road Material**, **Junction Material**, **Road Surface** and **Texture Tile Size**;
- the lot **Layers**, which make the sidewalks and lot ground;
- **Preset Tags**;
- with **Include Street Types** on: the **Street Types**, **Default Street Type** and **Minimum Road Width**;
- with **Include Detail Settings** on: **Road Detail Mode**, **Curve Detail**, **Detail Sample Distance** and **Facet Angle**.

Saving from a network turns both toggles on. Older rows have them off, so applying one changes only the look.

A network made by [Import Map](/core-actors/import-map) keeps its own street types, Default Street Type and Minimum Road Width, because those come from the map's roads. It takes the rest of the preset. When you apply one, the library says "Street types kept because these streets came from a map import."

To give an import a preset's look from the start, pick it under [Streets preset](/core-actors/import-map#streets-preset) in Import Map.

Each Streets preset gets a rendered thumbnail: a square block cut by a cross street, seen at an angle from above, so the road, junction and lot materials all show. When you edit the row, the library renders a new one.
