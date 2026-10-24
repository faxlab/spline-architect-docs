---
title: Import Map
description: Import real streets and land areas from OpenStreetMap into a Streets Network and Map Area actors, grouped under a reopenable Map Import Group.
---

:::info UE 5.8 only
Import Map builds a Streets Network, so it ships only in the UE 5.8 package with the rest of Streets. See [compatibility](/reference/compatibility).
:::

Pick a real place, draw a boundary around it, and Import Map builds a [Streets Network](/core-actors/streets-network) from the roads inside it, with every enclosed block as a lot. It can also bring in land areas - parks, water, squares, and so on - as editable **Map Area** actors. Everything one import creates sits under a **Map Import Group**, so you can reopen the import later and redo it with different choices.

The window prepares a preview after every change. Nothing in the level changes until you press **Create Import**.

## Open the window

| From | What happens |
| --- | --- |
| **SA > Create > Import Map…** in the main menu bar | Starts a new import. It lands centred on the world origin, with a new Streets Network. |
| A Streets Network's **Details > Import OSM** | Imports into that network: the boundary centre lands on the network's location, and the import uses its Street Configs. The network must be unbaked and have at least one Street Config. |
| A Map Import Group's **Details > Reopen Import Workspace** | Reopens that import. See [Reopen an import](#reopen-an-import). |

The window is titled **Import Map -** followed by the import it works on. It reopens at the size you last left it.

## 1. Get a map source

The map data has to be on your disk before anything can be imported. The bar at the top of the window holds everything for that:

| Control | What it does |
| --- | --- |
| **Choose a map source** | Lists the sources already available. A name ending in **(copy into project)** was downloaded for another project; choose it once to copy it into this one. |
| **Search place or latitude, longitude** | Type a town or city, or two numbers such as `41.3874, 2.1686`, and press Enter. The place list ships with the plugin, so searching downloads nothing. |
| **Browse Map** | Shows the whole world map, so you can find a place by eye. Downloads nothing. |
| **Open File…** | Uses an OpenStreetMap file you already have: `.osm`, `.xml`, or `.pbf`, also compressed as `.gz` or `.bz2`. |
| **Download** *region* | Appears when the place you found is outside your sources. It names the regional extract that covers the place and shows its size once checked. Nothing downloads until you click it. |
| **…** | **Open source folder**, **Show source asset** (selects the Map Source in the Content Browser), and **Storage**: **Retry source cleanup** and **Clear unfinished downloads**. |

Regional extracts come from [Geofabrik](https://download.geofabrik.de/). A region is a country or a part of one, so a download can run to hundreds of megabytes. The size on the button tells you before you commit.

### Where the files go

Every source you download or open is copied into the project, so the project carries its own map data:

- **`<Project>/MapSources`** holds the copied map file. Your original file is never moved or deleted.
- **`Content/MapSources`** holds a small **Map Source** asset per source. Delete that asset in the Content Browser to remove the source and its files.
- **`<Project>/Saved/SplineArchitect/MapData`** holds the search indexes built from each source. They are rebuilt when missing, so they never need to go into version control.

The first time you choose a large source, building its index can take a few minutes. After that it opens straight away.

Keep `MapSources` with the project. A teammate needs it to start a new import or widen an existing one; without it they can still reopen an import within the area it already covers.

## 2. Draw the boundary

The map pans with a left, right, or middle drag, and zooms with the mouse wheel. The **?** button lists every map and boundary shortcut.

Choosing a source puts a starter boundary on the map. To draw your own, open **Draw**:

- **Rectangle** - drag on the map. **Shift**+drag draws a new rectangle at any time.
- **Polygon** - click corners. Click the first corner, double-click, or press **Enter** to finish; **Backspace** removes the latest corner and **Escape** cancels. A polygon can have up to 512 corners, and one that crosses itself must be fixed before it is used.

To change the boundary you have:

- Drag a corner to resize a rectangle or move a polygon corner.
- Drag the small dot in the middle of an edge to add a corner. Double-click a corner, or hover it and press **Delete**, to remove it.
- Drag the cross in the middle to move the whole boundary, and the ring above it to rotate it. Inside the boundary, **Alt**+drag rotates and **Ctrl**+drag scales.
- Click the size readout below the map (for example `1000 × 800 m`) to type an exact **Width (m)** and **Height (m)**.

**Fit** (or **F**) frames the boundary. **Ctrl+Z** and **Ctrl+Y** undo and redo boundary edits only - never level changes. **Draw > Clear boundary** removes it.

About 1000 × 1000 m is a good size for one import. Do a larger city as several imports side by side: each becomes its own Streets Network, and roads are cut where the pieces meet.

### Turn the map

Real street grids rarely run north-south. Turning the map turns the import with it, so a city's main street can line up with world X and your editor grid. The geographic area you selected stays the same.

- **Align > Make street horizontal** or **Make street vertical**, then click a straight street.
- Right-click a street and choose **Align map to this street**.
- Type an angle in **Rotation (°)**.
- **Align > North up**, or a click on the compass, puts north back at the top. Dragging the compass points north somewhere else.

### Missing coverage

A red-hatched part of the boundary is outside the map source. **Show missing coverage** frames it. You can still import: **Create Import** asks to confirm, and only the covered part is imported. To fill the gap, download or choose a source that covers it.

## 3. Choose what to import

The sidebar has two tabs: **Layers** decides *what* comes in, **Settings** decides *how*.

The **Layers** tab lists road and area categories with three columns:

- **Count** - how many features of that kind are inside the boundary. It shows `—` while the preview is being prepared.
- **Outlines** - shows or hides that category's outlines on the map. It changes only the view, never the import.
- **Import** - generates that category. Changing it prepares the preview again.

The checkboxes in each header switch a whole column on or off. Hover a category name to highlight it on the map, and click it to frame it. The search boxes filter the lists without changing what is imported.

### Road categories

Every road category except **Paths / reference only** is imported by default. The width is the one used when the map gives none; see [Width estimates](#width-estimates).

| Layers label | Covers | Width when unknown |
| --- | --- | --- |
| **Motorways / trunk roads** | Motorways and trunk roads. | 7.5 m one-way, 14 m two-way |
| **Primary roads** | Main connecting roads. | 10 m |
| **Secondary roads** | Secondary connecting roads. | 8 m |
| **Local connecting roads** | Tertiary and other local connecting roads. | 7 m |
| **Residential / unclassified** | Residential and unclassified roads. | 6 m |
| **Shared streets** | Streets where pedestrians and vehicles share the surface. | 4.5 m |
| **Service / access** | **Driveways**, **Parking aisles**, **Alleys**, and **Other access roads**. Click **Show access-road types** to choose them one by one. | 4 m |
| **Paths / reference only** | Walking, cycling, and other ways that are not roads. Outlines only - they are never generated. | - |

### Land-area categories

No area category is imported by default. Each ticked category creates one **Map Area** actor per mapped area inside the boundary. The window groups them into Nature, Land use, Facilities, and Public space.

**Category** is what the Map Area's own **Category** setting shows. **PCG value** is the name PCG sees, in `SA_MapAreaCategory` and in street-lot labels - filter on that one.

| Layers label | Category | PCG value | Covers |
| --- | --- | --- | --- |
| **Woodland** | Woodland | `Woodland` | Woodland and forest. |
| **Grass and scrub** | Grass | `Grass` | Grass, meadow, scrub, heath, and similar planted ground. |
| **Parks and gardens** | Parks | `Park` | Public parks, gardens, and village greens. |
| **Water** | Water | `Water` | Lakes, ponds, reservoirs, basins, and other mapped water. |
| **Farmland** | Farmland | `Farmland` | Farmland, orchards, vineyards, and plant nurseries. |
| **Residential** | Residential | `Residential` | Residential land use. |
| **Commercial and retail** | Commercial | `Commercial` | Commercial and retail land use. |
| **Industrial and construction** | Industrial | `Industrial` | Industrial, construction, railway, and brownfield land. |
| **Allotments** | Allotments | `Allotments` | Community allotments and garden plots. |
| **Parking** | Parking | `Parking` | Mapped parking areas. |
| **Education** | Education | `Education` | School, college, university, and kindergarten grounds. |
| **Recreation and sport** | Recreation | `Recreation` | Sports, playground, recreation-ground, and pitch areas. |
| **Healthcare** | Healthcare | `Healthcare` | Hospital and clinic grounds. |
| **Cemeteries** | Cemeteries | `Cemetery` | Cemeteries and graveyards. |
| **Pedestrian areas** | Pedestrian Areas | `Pedestrian` | Areas mapped for pedestrians, including pedestrian streets drawn as areas. |
| **Squares** | Squares | `Square` | Public squares and plazas. |

## 4. Settings

Everything on the **Settings** tab starts at a built-in choice that makes clean, game-ready streets. **Reset to defaults** puts this tab and the **Layers** tab back to those choices; the source, boundary, and map view stay.

### Street points

| Setting | Default | What it does |
| --- | --- | --- |
| **Join map sections** | On | The map often splits one road into several sections. On treats them as one street, so the points where sections meet can go. Junctions, traffic changes, and bridge layers always keep their points. |
| **Simplify (m)** | 0.5 | The largest distance a street may move when points are removed. Higher leaves fewer points, which are faster and easier to edit; `0` keeps every map point. |
| **Keep bends above (°)** | 15 | Bends at or above this angle always stay. Raise it to allow more simplification. |

Turn on **Display > Street points** to see every point the streets keep before you import.

### Roads

| Setting | Default | What it does |
| --- | --- | --- |
| **Use dominant road settings** | On | On each nearly straight stretch between junctions, uses the road profile that covers most of its length - width, Street Config, name, road class, and markings. Short changes in the map data then stop breaking a street into pieces. |
| **Keep each road one width** | On | Gives each continuous road the width that covers most of its length, so it never narrows or widens mid-street. Off keeps each map section's own width. |
| **Roads at the boundary** | Crop at boundary | How roads that leave the boundary end. See below. |

The **Roads at the boundary** choices:

- **Crop at boundary** cuts each road's centreline at the boundary. Pavement and junctions can reach slightly past it.
- **Extend exiting roads** follows each real road leaving the boundary for **Distance (m)** (default 100 m). Side streets along the way are not collected, and no roads are invented.
- **Remove clipped tails** removes road ends the boundary cut, back to the last junction inside it. Real dead ends stay, but a road that only crosses the boundary can disappear entirely.

Map areas are always clipped to the boundary, whatever this is set to.

### Materials

**Road material** is used by every road without a category material. Open **Category materials** to give a road category its own material; **Service / access parent** covers all four access-road kinds at once. A category material changes the road surface only - never its width or markings. Clear the asset to go back to **Inherited**.

**Include reference guides in level** (off by default) adds orange, editor-only splines for road sections the import leaves out, such as tunnels you chose to leave out. They never become roads or lots and never appear in the game.

### Width estimates

Where the map reports a road's width, that width is used. Where it does not, **When width is missing** decides:

- **Use category width** (default) uses the category widths listed under **Category fallback widths (m)**. Lane counts are ignored, so a road whose lane count changes keeps one width.
- **Estimate from lane count** multiplies the road's lane count by **One lane (m)** (default 3.25 m). Roads without a lane count fall back to the category widths.

**Slip road / ramp** (default 5 m) is the width for slip roads and motorway ramps. Most ramps have one lane, so they would look far too wide at their road class's width; a ramp is never made wider than its class.

These widths are artistic estimates, not survey measurements, and they exclude sidewalks. A width you set by hand after importing always wins.

### Bridges, tunnels and ramps

| Setting | Default | Choices |
| --- | --- | --- |
| **Bridges** | Raise over roads | **Raise over roads**: a bridge that passes over another imported road becomes its own raised road with approach ramps. Other bridges stay on the ground. **Keep on the ground**: every bridge joins the ground streets, overlapping any road it crosses. **Leave out**: bridges are not generated, so the road stops at each end. |
| **Tunnels** | Leave out | **Leave out**: the road stops at each tunnel mouth. **Keep on the ground**: the tunnel becomes a surface road, which suits short underpasses. Passages through buildings always stay on the ground. |
| **Slip roads and ramps** | Keep on the ground | **Keep on the ground**: slip roads and motorway ramps join the streets like any other road. **Leave out**: they are not generated. Ramp sections tagged as bridges or tunnels follow those choices instead. |
| **Raised height per layer (m)** | 6 | How high a raised bridge sits for each map layer. Six metres clears a truck on the road below. |
| **Ramp steepness (%)** | 7 | Average climb of the ramps up to a raised bridge. A bridge whose ramps would run into a junction stays on the ground, so a steeper value raises more bridges. |

Raised roads are generated apart from the ground streets they pass over. **SA Get Road Edges** marks their edges with `SA_Raised`, so a PCG graph can put railings or supports along them.

### Remembered choices

When you close the window on a new import, it remembers your **Layers** and **Settings** choices, the map source, and the map view, and the next new import starts from them. They are stored per user and per project. The boundary is never remembered: every new import starts with a fresh one.

## 5. Check the preview

The line at the bottom of the window says where the preview stands - for example *Ready to import.* or *Waiting to prepare the latest selection…* While a preview is being prepared, **Cancel** stops it; after a failure or a pause, **Retry** prepares it again from the data already on disk.

The map shows the prepared result on top of the source outlines. **Display** adds two optional overlays:

- **Generated street lots** shows the lots the roads will enclose.
- **Street points** shows the prepared street lines and every point they keep.

Hover a road or an area for a short summary, and click it to pin a card. A road's card gives its name, category, whether it is one-way, its width and where that width came from, its material, and whether it will be imported. **Original map tags** lists the raw OpenStreetMap data.

### Road assignments

**Road assignments** chooses which Street Config each group of imported roads uses. Roads are grouped by road class, direction, lane count, and reported width. The Street Config supplies the look of the road; each road keeps its own imported width.

When the button reads **Road assignments (3)**, three groups have no usable config - usually because a saved config was renamed or deleted. Assign them before you import. **Assign all … unresolved groups** gives every unresolved group the same config.

### Diagnostics

**Diagnostics** lists everything the preparation wants you to know, over the map. Click an entry, or use **Previous** and **Next**, to frame it. The number on the button counts only the entries worth a look.

| Entry | Meaning |
| --- | --- |
| **Reference only** | Map ways that were not turned into streets - footpaths, cycleways, sidewalks, and anything your bridge and tunnel choices leave out. Normal for any city. |
| **Reviewable overlap** | The pavement is complete, but separate roads overlap, for example a bridge kept on the ground. Its markings may need adjusting. |
| **Missing geometry** | Pavement or an area that could not be built. The affected spot has no surface and is left out of the lots. |
| **Review** / **Notice** | Anything else to check, such as a bridge that could not be raised. |

## 6. Create or replace

**Create Import** builds the result in the level as one undo step:

- a new **Map Import Group**,
- a **Streets Network** holding the imported roads, if any road category is ticked,
- one **Map Area** actor per imported area.

If the boundary has missing coverage, you are asked to confirm first. Only available data is imported, and the boundary you drew is kept.

When the window was opened from an import group, the button reads **Replace Import Group** instead. Replacing rebuilds the group's Streets Network and Map Areas from the current choices.

:::caution Replacing discards hand edits
**Replace Import Group** throws away every change made since the import: street edits, lot settings, and reshaped Map Areas. **Import OSM** on a Streets Network does the same to the streets already in it. One **Ctrl+Z** restores everything as it was. To keep an edited Map Area, duplicate it on its own first - a copy made that way belongs to no group, so a replace never touches it.
:::

A baked Streets Network must be unbaked before it can be replaced.

## Reopen an import

Select the **Map Import Group** and press **Reopen Import Workspace** in its Details. The window opens with the import's source, boundary, rotation, road settings, and area categories, and the main button reads **Replace Import Group**. **Import OSM** on a Streets Network that came from an import reopens its group the same way.

The group keeps a copy of the map data it imported. You can reopen it and change any choice without the original source - on another computer, for example - as long as the boundary stays inside the area it already covers. To widen it, the window shows **Choose source**: pick a source that covers the larger area.

**Duplicate Import Group** copies the group together with its Streets Network and Map Areas as a separate import, which can be replaced on its own later.

## After the import

### The Streets Network

The imported network is an ordinary [Streets Network](/core-actors/streets-network). Edit it in [Streets Mode](/authoring/architect-mode#streets-mode), tag its lots with [Lot Zones](/core-actors/lot-zone), and fill it with [PCG](/pcg/overview).

Each imported segment also carries its own road data. Select it in Streets Mode and open **Imported road** in the **Selected Segments** panel:

| Setting | What it does |
| --- | --- |
| **Width** / **Width Source** | The surface width in use, in world units, and where it came from: **Reported** by the map, **Estimated**, **Matched** to the rest of the road, **Manual**, or **Config** (the Street Config's width). Read only. |
| **Manual Width** | Your own surface width for this segment, in world units (100 = 1 m). `0` returns to the imported width. |
| **One Way** | One-way roads get no centre line between opposing traffic. |
| **Marking Style** | `0` automatic, `1` unmarked, `2` dashed centre, `3` solid centre, `4` double solid centre. |
| **Category** / **Level** | The road category from the map, and whether the segment is on the **Ground** or **Raised**. Read only. |
| **Extra Material Data** | Extra numbers handed to the road material. The first goes to Custom Primitive Data index 8. |

**Show Import Guides** on the network shows or hides the orange reference guides.

### Review Issues

After generation, **Review Issues** in the Streets Network's Details opens the **Street Review** window with every place that needs attention: sections left out, width conflicts, and lots that failed. Click an entry to select the network and frame that spot; it is ringed in orange. The button shows how many entries there are, for example **Review Issues (4)**.

### Map Area actors

A Map Area is data for PCG to build on - not a terrain or vegetation mesh. It holds the area's outline as closed, editable splines, one per separate part and one per hole.

| Setting | What it does |
| --- | --- |
| **Area Name** | The name from the map. Unnamed areas use their category. |
| **Category** | The kind of land. Change it to change how PCG filters the area and how it labels street lots. |
| **Boundary Splines** | The outline. Move spline points to reshape the area. |
| **Validate Edited Boundaries** | Checks the outline after editing. An outline that crosses itself, or a hole outside its outer edge, is left out of PCG until it is fixed. |
| **Geometry Valid** / **Validation Message** | Whether the outline is usable, and which spline to repair if not. |
| **Source Tags** | The original OpenStreetMap data, for advanced filtering. |

The **SA Get Map Areas** PCG node reads Map Areas into a graph, with the category's [PCG value](#land-area-categories) in `SA_MapAreaCategory`.

### Label street lots from areas

On the Map Import Group, **Use Areas to Label Street Lots** (off by default) gives each street lot the category of the imported area that overlaps it most, as its `SA_LotZone`. Lots in a park become `Park`, and so on. A [Lot Zone](/core-actors/lot-zone) actor or a per-lot setting still wins.

## Credit OpenStreetMap

Map data from OpenStreetMap is © OpenStreetMap contributors and licensed under the Open Database License (ODbL). Wherever a map built from it is shown or shipped - a game, a trailer, screenshots - credit it where people can see it, for example on the credits screen:

> © OpenStreetMap contributors

Link to [openstreetmap.org/copyright](https://www.openstreetmap.org/copyright) where a link is possible. That page also explains the extra share-alike terms that apply if you publish the map data itself rather than a game made with it. The credit text is stored with every Map Source and every import, so you can look it up later.
