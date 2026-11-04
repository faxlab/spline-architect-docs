---
title: Make Facade Kit
description: Turn a Building preset into a fast copy made of flat textured planes, for big map imports and distant city blocks.
---

A Building preset builds every wall piece, window and cornice. That is the right cost for a building the player walks past, and a heavy one for hundreds of imported buildings. Make Facade Kit trades the detail for speed: it photographs the straight walls of a Building preset from the front, then builds a copy of the preset from flat planes that wear those photos.

The copy is an ordinary Building preset. Pick it as a style in [Import Map](/core-actors/import-map#styles), or place it like any other preset.

## Make a kit

1. Open the [Preset Library](/authoring/preset-library) and select one or more Building presets. Kits can be made from Building presets only.
2. Right-click and choose **Make Facade Kit…**. With several presets selected the entry reads **Make N Facade Kits…**.
3. Choose the settings in the **Make Facade Kit** window and press **Make**. The window remembers them for next time.
4. A progress dialog follows the work. **Cancel** stops after the step in progress and keeps the kits already made.

When the kits are done, the Preset Library selects them.

Make Facade Kit needs an open level, because the walls are photographed in it, and it needs rendering. With rendering turned off, as in a `-NullRHI` run, the textures come out plain grey.

Run it again after you change the source preset to refresh the copy in place; it overwrites the same assets. A kit cannot be made from a kit, so run it on the source preset.

## Settings

| Setting | Default | What it does |
| --- | --- | --- |
| **Section Height (pixels)** | 512 | How many texture pixels the tallest photographed wall section or floor gets. Repeated floors of each source wall share one photo, so adding floors does not blur the facade or enlarge the texture. All sections use the same sharpness. Higher is sharper but makes bigger textures. 512 suits distant city blocks; use 1024 or more for buildings you walk past. Photos may be softened to fit the texture width or the 8192-pixel height limit, or by up to 15% to keep the texture half as tall. |
| **Max Texture Width** | 2048 | The widest the texture may get, in pixels. The photographed wall lengths are packed side by side up to this width. If the longest one does not fit at the chosen section height, everything is baked a little less sharp so it does. |
| **Wall Lengths (m)** | 5, 10, 15, 30, 50 | The wall lengths photographed, in metres. Every wall segment of a building gets the one whose length is closest, stretched a little to fit. Walls much longer than the longest one get a plane that repeats the facade sideways. More lengths fit more segments without stretching but take more texture. |
| **Output Folder** | Empty | Where the `_Fast` table, its meshes and its textures go. Empty puts them next to the source table, or in `/Game/SplineArchitect/FacadeKits` for a table that ships inside a plugin. |
| **Section Floors** | The preset's own counts | One row per wall section of the source that has a floor range. **Floors** sets how many floors that section gets in the copy; `0` leaves the section out when its range allows it. **Floor Range** shows the section's own range for reference. The list appears when you make one preset at a time. With several presets, each keeps its own floor counts. |
| **Building Height (m)** | - | Read only. How tall the copy will be with these floor counts: the top of its highest wall above the footprint. |

## What you get

For a source preset `Tower` in the table `MyBuildings`, the kit is the row `Tower_Fast` in the table `MyBuildings_Fast`, next to the source table. For a table that ships inside a plugin, such as SA_Buildings, both go to `/Game/SplineArchitect/FacadeKits`. The textures, the planes and a material instance named `MI_Tower_Fast` are written to a `FacadeKits/MyBuildings/Tower_Fast` folder in that same place.

The row keeps the source's Preset Tags and adds the tag `FacadeKit`. Because it is an ordinary preset, you can edit it, and you can tick its table under **Styles** in Import Map.

- **One fixed height.** The copy is one Wall as tall as the whole facade, so the floor counts you set decide how tall it is. Import Map treats a kit like any preset with a fixed height: it picks it for buildings whose map height is close to the kit's.
- **Photographed walls.** The straight walls of the source are built at each chosen length and photographed from the front: colour, normal, roughness and metal, and the depth of recesses. The colour holds no lighting. Each wall segment of a building gets one plane, the closest length, with the Wall's **Closest Length** piece selection.
- **A flat cap.** A flat cap sits where the source's top floor is, in that floor's material. A source that has its own roof keeps it instead. A source with neither a floor nor a roof, such as a fence or a staircase, gets no cap.
- **Openings.** A window below the roofline shows the dark, matte inside of the building. A gap above it, such as a railing over a flat roof, and every gap in a source with no floor or roof, are see-through. A kit with see-through gaps switches its material to Masked; other kits stay opaque.

The planes have no thickness, so the kit's outline is flat even with Parallax on.

## Parallax

The depth of the source's recesses drives the **Parallax** switch in the kit's material. It is on by default, so windows and other recesses look set into the wall as the camera moves past, instead of painted on. It costs a few extra texture reads per pixel. Turn **Parallax** off on the kit's material instance for the cheapest facades.

| Material parameter | Default | What it does |
| --- | --- | --- |
| **Parallax** | On | The switch described above. |
| **ParallaxDepth** | 100 | How much depth the parallax shows, in centimetres from the most raised to the deepest part. Make Facade Kit sets the range it baked. Lower it for flatter facades, or use `0` for none. |
| **ParallaxCenter** | 0.5 | Where the flat plane sits in the depth, from 0 (at the most raised part) to 1 (at the deepest). Make Facade Kit puts each photo's main wall surface at 0.5, so raised parts come forward and recesses go back. Leave it as it is. |
| **UVPerCm** | Set by the kit | How far one centimetre of wall moves across the texture. Leave it as it is. |

## From a script

**Make Facade Kit**, **Get Facade Kit Settings** and **Get Facade Kit Height** are Blueprint and Python functions, in the category *Spline Architect | Facade Kit*. They open no window.

- **Get Facade Kit Settings** returns the settings used last in this project. Given a Building preset, it also fills in the floor count of every section that has a floor range.
- **Make Facade Kit** takes a table, a row and those settings. It returns the new preset, or an empty one when nothing could be made, and a message that says what was made or why not.
- **Get Facade Kit Height** returns how tall a kit would be with given settings, in centimetres.
