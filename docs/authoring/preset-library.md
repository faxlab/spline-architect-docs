---
title: Preset Library and DataTables
description: Browse, save, edit, thumbnail, favorite, filter, and drag Spline Architect presets.
---

The Preset Library is the central browser for Wall, Building, Curve, Custom Piece, and Streets-compatible preset rows. Open it from the Spline Architect menu or the Architect Mode panel.

![Preset Library browsing SACity presets](/img/screens/preset-library.png)

## Library controls

| Control | What it does |
| --- | --- |
| **Category tabs** | Show one preset type at a time. Selection can auto-switch the active category when enabled in Project Settings. |
| **DataTable filter** | Enable all, disable all, or choose which source tables contribute rows. |
| **Search** | Matches display name, row name, description, type, and DataTable path. |
| **Favorites only / Favorite** | Marks rows for quick filtering without changing their DataTable content. |
| **View** | Columns, Columns + Thumbnails, Small Icons, Medium Icons, or Large Icons. |
| **Reload** | Rescans preset DataTables and metadata. |
| **Save selected actor as new preset** | Creates a row from the selected compatible actor. |
| **Update Thumbnail** | Renders and stores the selected preset's managed thumbnail. |
| **Delete** | Removes selected rows after confirmation; multi-selection can span DataTables. |
| **Open Source DataTable** | Opens the selected row's table in Unreal's DataTable editor. |

Selecting a row exposes editable metadata: **Display Name**, **Description**, **Favorite**, and optional custom **Thumbnail**. If no custom texture is supplied, supported preset types can render a managed thumbnail or fall back to a representative mesh.

## Drag and drop

- Drag a preset into the level viewport to create its actor.
- Drag a preset onto the Architect Mode panel to make it the active drawing preset.
- Use recent-preset chips for the last Wall, Building, and Curve rows without reopening the full library.

## Create the correct DataTable

In the Content Browser choose **Add → Miscellaneous → Data Table**, then select the matching row structure:

| Preset | Row structure |
| --- | --- |
| Wall | `WallPreset` |
| Building | `BuildingPreset` |
| Curve | `CurvePreset` |
| Custom Piece | `SplineArchitectCustomPiecePresetRow` |

Use separate tables for coherent asset kits or teams, not for every individual row. The library key is the preset type + DataTable asset + row name, so identical row names in different tables remain distinct.

## Saving and updating

Actor **Save Preset** and library **Save selected actor as new preset** both create rows. Choose whether the actor should switch to the saved row after save; this turns an inline setup into an instance of shared data. Editing a row in the DataTable affects every actor that references it once they regenerate, unless an actor masks that value with Parameter Overrides.

Commit the DataTable, Preset Library Data Asset, and generated managed thumbnail assets together when sharing presets through source control.
