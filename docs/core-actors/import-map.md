---
title: Import Map
description: Import real streets, land areas and buildings from OpenStreetMap into a Streets Network, Map Area actors and Buildings, grouped under a reopenable Map Import Group.
---

:::info UE 5.8 only
Import Map builds a Streets Network, so it ships only in the UE 5.8 package with the rest of Streets. See [compatibility](/reference/compatibility).
:::

Pick a real place, draw a boundary around it, and Import Map builds a [Streets Network](/core-actors/streets-network) from the roads inside it, with every enclosed block as a lot. It can also bring in land areas - parks, water, squares, and so on - as editable **Map Area** actors, and the buildings as [Buildings](/core-actors/building) fitted to their real height. Everything one import creates sits under a **Map Import Group**, so you can reopen the import later and redo it with different choices.

The window prepares a preview after every change. Nothing in the level changes until you press **Create Import**.

## Open the window

| From | What happens |
| --- | --- |
| **SA > Create > Import Map…** in the main menu bar | Starts a new import. It lands centred on the world origin, with a new Streets Network. |
| A Streets Network's **Details > Import Map...** | Imports into that network: the boundary centre lands on the network's location, and the import uses its Street Configs. The network must be unbaked and have at least one Street Config. |
| A Map Import Group's **Details > Reopen Import Workspace** | Reopens that import. See [Reopen an import](#reopen-an-import). |

The window is titled **Import Map -** followed by the import it works on. It reopens at the size you last left it. A new import starts from the choices, map data, view and boundary you closed the last new import with; see [Remembered choices](#remembered-choices).

## 1. Find a place and its map data

Finding a place downloads nothing. The map data has to be on your disk before anything can be imported, and the row at the top of the window holds everything for that:

| Control | What it does |
| --- | --- |
| **Find a place** (search box) | Type a town or city and pick it from the list of up to eight matches, or press Enter for the best one. The list of places ships with the plugin. Choosing a place moves the map there and puts a 1000 × 1000 m boundary around it. On the world map you can also double-click a spot. |
| **Recent** | Goes back to a place you visited, with the boundary you left it with. It lists the last eight places, newest first, and remembers them for this project. The place on the map joins the list when you leave it or close the window. |
| **Map data** | Shows the map data in use - its name and size, **Saved import** while a reopened import runs on its own saved copy, or **None yet** - and opens a menu to switch it, get more or tidy up. |

### Pasted locations

The search box also reads a location you paste in. A **Go to** row appears under it; press Enter to move there.

- Decimal coordinates, latitude first: `41.93, -87.77`.
- Degrees, minutes and seconds with N, S, E or W, as Google Maps writes them: `41°55'52"N 87°46'32"W`.
- A Google Maps plus code, either the full code or a short code followed by its town: `W6JF+FQ4 Chicago`.

Street addresses are not searched. When you type an address, or a town with its state, the box offers to move to the town instead. Paste the address's coordinates to land on the exact spot.

### The Map data menu

| Section | Entry | What it does |
| --- | --- | --- |
| **Map data in this project** | One entry per source, with its size | Switches to that data. A mark shows the one in use. Switching never downloads anything, and the boundary stays where it is unless you are on the world map. A name ending in **(copy into project)** was downloaded for another project; choose it once to copy it into this one. |
| **Get map data** | **Download** *region* (*size*) | Appears when the place you found is outside your data. It names the regional extract that covers the place and shows its size once checked. Nothing downloads until you click it. A region this project already holds reads **Use** *region* **(already in this project)** instead, and nothing is downloaded. |
| | **Open OSM file…** | Uses an OpenStreetMap file you already have: `.osm`, `.xml`, or `.pbf`, also compressed as `.gz` or `.bz2`. It is copied into this project. |
| **Manage** | **Show in folder** | Opens the folder under the project's `MapSources` that holds the data in use. |
| | **Show Map Source asset** | Selects the data's Map Source asset in the Content Browser, to inspect, rename or delete it. |
| | **Retry source cleanup** | Retries removing files left behind by a Map Source asset you deleted. Shared data and data being read is kept. |
| | **Clear unfinished downloads** | Removes interrupted transfers and redundant download copies under the project's Saved folder. Sources in the project and your original files are kept. |

Regional extracts come from [Geofabrik](https://download.geofabrik.de/). A region is a country or a part of one, so a download can run to hundreds of megabytes. The size on the button tells you before you commit.

When you pick a place, the window first checks the map data this project already holds. If some of it covers the place, the window switches to it for you, downloaded regions first. It never offers to download a region this project already holds.

If the data in use does not reach the place at all, a card on the map says **This place needs map data**. It offers **Download** *region* (or **Use** *region* when the project already holds it) and **Open OSM file…**. When no ready-made download covers the place, only **Open OSM file…** is offered. Data that covers just part of your boundary needs no card: it prepares what is there. See [Missing coverage](#missing-coverage).

The first time you choose a large source, building its road index can take a few minutes. After that it opens straight away. The progress card at the bottom of the map shows downloads and that first reading, with a bar and a percentage. **Cancel** on it stops the work. A cancelled download picks up where it stopped when you download the same region again. Cancelling the first reading of a file keeps nothing from that pass, so opening the file again starts the reading over.

### Areas and building outlines are read per place

Roads come from the road index of the whole file. Mapped areas and building outlines are read differently: for the place you are looking at, the first time you look at it. The result is kept in small map tiles, so the place shows at once the next time and works offline.

While a place is being read, a card at the bottom left of the map shows the step, a bar and **Cancel**. Streets stay on the map and every button keeps working. **Cancel** stops the read; moving the map starts it again.

- Areas are read for views up to about 6 km across.
- Building outlines are read for views up to about 3 km across, and only while the **Map building outlines** eye on the Buildings tab is on.
- Zoom out further and no read starts. Places you have read before still draw.

Preparing a selection reads whatever it needs the same way, and shows its steps on the progress card.

### Where the files go

Every source you download or open is copied into the project, so the project carries its own map data:

- **`<Project>/MapSources`** holds the copied map file. Your original file is never moved or deleted.
- **`Content/MapSources`** holds a small **Map Source** asset per source. Delete that asset in the Content Browser to remove the source and its files.
- **`<Project>/Saved/SplineArchitect/MapData`** holds the road index of each source and the map tiles of the places you have read. They are rebuilt when missing, so they never need to go into version control.
- **`<Project>/Saved/SplineArchitect/Elevation`** holds the height data that [Ground heights](#ground-heights) downloaded. It is downloaded again when missing.

Spline Architect 6.1 also built a whole-region area index in that folder (`areas-v1-…` files), and it could grow to gigabytes. 6.2 reads areas and buildings per place and builds no such index. It deletes the old files by itself after the first successful read of a place.

Keep `MapSources` with the project. A teammate needs it to start a new import or widen an existing one; without it they can still reopen an import within the area it already covers.

## 2. Draw the boundary

The map pans with a left, right, or middle drag, and zooms with the mouse wheel. The **?** button lists every map and boundary shortcut.

Choosing a place puts a 1000 × 1000 m boundary on the map. To draw your own, open **Draw**:

- **Rectangle** - drag on the map. **Shift**+drag draws a new rectangle at any time.
- **Polygon** - click corners. Click the first corner, double-click, or press **Enter** to finish; **Backspace** removes the latest corner and **Escape** cancels. A polygon can have up to 512 corners, and one that crosses itself must be fixed before it is used.

To change the boundary you have:

- Drag a corner to resize a rectangle or move a polygon corner.
- Drag the small dot in the middle of an edge to add a corner. Double-click a corner, or hover it and press **Delete**, to remove it.
- Drag the cross in the middle to move the whole boundary, and the ring above it to rotate it. Inside the boundary, **Alt**+drag rotates and **Ctrl**+drag scales.
- Click the size readout below the map (for example `1000 × 800 m`) to type an exact **Width (m)** and **Height (m)**.

**Fit** (or **F**) frames the boundary. **Ctrl+Z** and **Ctrl+Y** undo and redo boundary edits only - never level changes. **Draw > Clear boundary** removes it.

About 1000 × 1000 m is a good size for one import. Do a larger city as several imports side by side: each becomes its own Streets Network, and roads are cut where the pieces meet. With styled buildings in a dense city, use pieces of about 500 × 500 m instead: every styled building generates real walls, roughly a tenth of a second each with detailed styles.

### Turn the map

Real street grids rarely run north-south. Turning the map turns the import with it, so a city's main street can line up with world X and your editor grid. The geographic area you selected stays the same.

- **Align > Make street horizontal** or **Make street vertical**, then click a straight street.
- Right-click a street and choose **Align map to this street**.
- Type an angle in **Rotation (°)**.
- **Align > North up**, or a click on the compass, puts north back at the top. Dragging the compass points north somewhere else.

### Missing coverage

A red-hatched part of the boundary is outside the map data. **Show missing coverage** frames it. You can still import: **Create Import** asks to confirm, and only the covered part is imported. To fill the gap, download or choose map data that covers it.

## 3. Choose what to import

The sidebar has three tabs: **Roads**, **Areas** and **Buildings**. Each tab is one layer of the import.

- The tick box on a tab turns the whole layer on or off. Unticking keeps your choices on the tab for next time. Ticking a layer with nothing ticked inside it ticks every type.
- The number beside the tab's name says how many features the layer brings in, once the preview is ready. On Buildings it reads **over limit** when the selection holds more buildings than the Building limit.
- Roads start on. Areas and Buildings start off.

The Roads and Areas tabs list their types. Each row has a colour swatch, the type's name, and three columns:

- **Count** - how many features of that type are inside the boundary. It shows `—` while the preview is being prepared.
- The **eye** - shows or hides that type's outlines on the map. It changes only the view, never the import.
- The **tick box** - imports that type. Changing it prepares the preview again.

The eye and the tick box in the header switch a whole column on or off. Hover a type's name to highlight it on the map, and click it to frame it. The search box above the list filters the types without changing what is imported.

**Reset to defaults**, under the tabs, puts every choice on all three tabs back to the built-in one. The map data, boundary and map view stay.

### Ground heights

**Ground heights**, the tick box under the tabs, sets roads, map areas and buildings on the real ground of the place - its hills, slopes and valleys - instead of one flat plane. It is off by default, and existing imports keep their flat heights.

- Heights are metres above sea level, with sea level at the import's own height. Imports of neighbouring places, placed side by side, line up.
- Bridges and tunnels run straight between their ends, so a bridge spans its valley instead of following the ground under it.
- Each building stands on the lowest ground under its outline, so on a slope it stands into the hill rather than floating above its low side.
- The height data is free, from Terrain Tiles. The first import of a place downloads it, which needs the internet, behind a progress dialog you can cancel. It is then kept in the project's Saved folder for every later import there. Tick the box again to retry a cancelled or failed download.
- Without the data the import stays flat and says so: the status line reads **Flat: ground heights unavailable** and Diagnostics gives the reason. When it works, the status line ends with **On ground heights** and the data's credit.

An import made with Ground heights carries an extra credit line; see [Credit the height data](#credit-the-height-data).

### Road categories

Every road type except **Paths / reference only** is imported by default. The width is the one used when the map gives none; see [Width estimates](#width-estimates).

| Roads label | Covers | Width when unknown |
| --- | --- | --- |
| **Motorways / trunk roads** | Motorways and trunk roads. | 7.5 m one-way, 14 m two-way |
| **Primary roads** | Main connecting roads. | 10 m |
| **Secondary roads** | Secondary connecting roads. | 8 m |
| **Local connecting roads** | Tertiary and other local connecting roads. | 7 m |
| **Residential / unclassified** | Residential and unclassified roads. | 6 m |
| **Shared streets** | Streets where pedestrians and vehicles share the surface. | 4.5 m |
| **Service / access** | **Driveways**, **Parking aisles**, **Alleys**, and **Other access roads**. Click **Show access-road types** to choose them one by one. | 4 m |
| **Paths / reference only** | Walking, cycling, and other ways that are not roads. Outlines only - they are never generated. | - |

Under the list, four folds hold the settings that shape the streets. **Bridges, tunnels and ramps** starts open; the others start folded. Every change prepares the preview again. **Include reference guides in level** and the **Street segment limit** sit below the folds.

### Street shape

| Setting | Default | What it does |
| --- | --- | --- |
| **Join map sections** | On | The map often splits one road into several sections. On treats them as one street, so the points where sections meet can go. Junctions, traffic changes, and bridge layers always keep their points. |
| **Simplify (m)** | 0.5 | The largest distance a street may move when points are removed. Higher leaves fewer points, which are faster and easier to edit; `0` keeps every map point. |
| **Keep bends above (°)** | 15 | Bends at or above this angle always stay. Raise it to allow more simplification. |
| **Use dominant road settings** | On | On each nearly straight stretch between junctions, uses the road profile that covers most of its length - width, Street Config, name, road class, and markings. Short changes in the map data then stop breaking a street into pieces. |
| **Keep each road one width** | On | Gives each continuous road the width that covers most of its length, so it never narrows or widens mid-street. Off keeps each map section's own width. |
| **Roads at the boundary** | Crop at boundary | How roads that leave the boundary end. See below. |
| **Distance (m)** | 100 | How far **Extend exiting roads** follows a road past the boundary. |

The fold counts the street points the preview keeps ("N street points kept, M removed."). Turn on **Display > Street points** to see every point the streets keep before you import.

The **Roads at the boundary** choices:

- **Crop at boundary** cuts each road's centreline at the boundary. Pavement and junctions can reach slightly past it.
- **Extend exiting roads** follows each real road leaving the boundary for **Distance (m)**. Side streets along the way are not collected, and no roads are invented.
- **Remove clipped tails** removes road ends the boundary cut, back to the last junction inside it. Real dead ends stay, but a road that only crosses the boundary can disappear entirely.

Map areas are always clipped to the boundary, whatever this is set to.

### Bridges, tunnels and ramps

| Setting | Default | Choices |
| --- | --- | --- |
| **Bridges** | Raise over roads | **Raise over roads**: a bridge that passes over another imported road becomes its own raised road with approach ramps. Other bridges stay on the ground. **Keep on the ground**: every bridge joins the ground streets, overlapping any road it crosses. **Leave out**: bridges are not generated, so the road stops at each end. |
| **Tunnels** | Leave out | **Leave out**: the road stops at each tunnel mouth. **Keep on the ground**: the tunnel becomes a surface road, which suits short underpasses. Passages through buildings always stay on the ground. |
| **Slip roads and ramps** | Keep on the ground | **Keep on the ground**: slip roads and motorway ramps join the streets like any other road. **Leave out**: they are not generated. Ramp sections tagged as bridges or tunnels follow those choices instead. |
| **Raised height per layer (m)** | 6 | How high a raised bridge sits for each map layer. Six metres clears a truck on the road below. |
| **Ramp steepness (%)** | 7 | Average climb of the ramps up to a raised bridge. A bridge whose ramps would run into a junction stays on the ground, so a steeper value raises more bridges. |

The last two apply only while **Bridges** is **Raise over roads**.

Raised roads are generated apart from the ground streets they pass over. **SA Get Road Edges** marks their edges with `SA_Raised`, so a PCG graph can put railings or supports along them.

### Width estimates

Where the map reports a road's width, that width is used. Where it does not, **When width is missing** decides:

- **Use category width** (default) uses the category widths listed under **Category fallback widths (m)**. Lane counts are ignored, so a road whose lane count changes keeps one width.
- **Estimate from lane count** multiplies the road's lane count by **One lane (m)** (default 3.25 m). Roads without a lane count fall back to the category widths.

**Slip road / ramp** (default 5 m) is the width for slip roads and motorway ramps. Most ramps have one lane, so they would look far too wide at their road class's width; a ramp is never made wider than its class.

These widths are artistic estimates, not survey measurements, and they exclude sidewalks. A width you set by hand after importing always wins.

### Materials

**Road material** is used by every road without a category material. Open **Per road type** to give a road category its own material; **Service / access parent** covers all four access-road kinds at once. A category material changes the road surface only - never its width or markings. Clear the asset to go back to **Inherited**.

**Include reference guides in level** (off by default) adds orange, editor-only splines for road sections the import leaves out, such as tunnels you chose to leave out. They never become roads or lots and never appear in the game.

### Land-area categories

No area type is imported by default. Each ticked type creates one **Map Area** actor per mapped area inside the boundary. The list groups the types into Nature, Land use, Facilities, and Public space.

**Category** is what the Map Area's own **Category** setting shows. **PCG value** is the name PCG sees, in `SA_MapAreaCategory` and in street-lot labels - filter on that one.

| Areas label | Category | PCG value | Covers |
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

The count of a type you have not ticked is approximate: it can include an area that only touches the boundary's bounding box. It becomes exact once you tick the type.

An area that cannot be cut to the boundary or filled is left out instead of stopping the import, and is listed in [Diagnostics](#diagnostics).

### Buildings

Tick **Buildings** to bring in the map's building footprints. Each building becomes a [Building](/core-actors/building) with its own outline and a height from the map. Unless you tick **Footprints only**, it also gets a style: a Building preset from your own tables, with its floors fitted to the map height.

A building comes in whole when the centre of its largest outline lies inside your boundary, so buildings are never cut at the boundary. A courtyard in an outline is filled. Buildings the map places below ground, such as a station's train hall under a street, are never imported.

| Setting | Default | What it does |
| --- | --- | --- |
| **Map building outlines** (eye) | On | Shows the map's building outlines while you browse, when the view is closer than about 3 km. The first look at a place reads its buildings, with progress on the map; after that they show at once. Never changes the import. |
| **Footprints only** | Off | Creates the Buildings with only their footprint and map data and no style, so nothing generates. Use them from PCG, attach your own SA actors, or give them a style later. Greys out the Styles list. |
| **Actors** | One per building | How many Building actors the buildings come in. See below. |
| **Skip buildings outside lots** | Off | Leaves out buildings that stand on no street lot, such as in parks, rail yards or between ramps. A building counts as on a lot when its centre or most of its corners are on it. It needs Roads on, because lots come from the streets. The preview shows the buildings it leaves out dimmed, and a wall they shared with a neighbour is no longer shared. |

Under these settings sit two folds: **Styles** (open) and **Heights and filters** (folded).

#### Actors

| Choice | What you get |
| --- | --- |
| **One per building** | One Building actor per map building. The easiest to move, delete or restyle one at a time. |
| **One per lot** | One Building actor per street lot, holding every building on that lot. It needs streets in the same import; without them each building gets its own actor. A building on no lot keeps an actor of its own. |
| **One for all** | One Building actor holding every imported building. The fewest actors in the level. |

Each building keeps its own footprint, style and height whichever you pick. The preview outlines the buildings that share an actor in one bright colour. A shared actor takes the style most of its buildings use, and a building gets a style of its own only where it differs.

#### Styles

The **Styles** fold lists every Building preset table in your project. Tick the tables the import may choose from. Each ticked table gets a colour, shown beside it and used for its buildings on the map.

Tables under your project's Content start ticked when they hold rows. Tables that ship inside the plugin, such as **SA_Buildings**, start unticked, so tick one to get styled buildings from the starter kit. With no table ticked, the Buildings tab says: *No style to choose from: tick at least one table with Building presets.* Presets with no wall pieces, and low presets that never reach 2.5 m, such as fences, are not offered as styles.

For each building the import picks the preset whose walls, once their floors are fitted, come closest to the map height. Among presets that come about equally close:

- A preset whose **Preset Tags** include the building's kind is preferred. The kinds are House, Apartments, Commercial, Office, Industrial, Civic and Religious; House and Apartments also accept the tag `Residential`.
- A preset that reaches the height inside its own floor range wins over one stretched past its **Max Floors**.
- A preset whose facade pieces fit the footprint's narrow side wins over one that would squeeze them.

What remains is chosen by a stable pick per building, so a street of similar buildings does not repeat one preset.

#### The repeating section

A preset can stretch to a map height only if one of its wall sections has **Use Random Floor Range** on. That section is the repeating section. When several sections have a range, the one with the tallest single floor repeats.

With **Fit floors to height** on, the import gives the repeating section the floor count that brings the building's top closest to the map height. The count never goes below the section's **Min Floors**. It never goes above **Max Floors** either, unless you tick **Allow more floors than the style's range**. A preset with no floor range has one fixed height, so it suits buildings of about that height.

Set **Min Floors** to `0` on a section that may disappear; the sections above it then sit on the section below. Keep it at `1` or more on a section every building must have, such as a tower's shaft. For a fast preset that skips most of the geometry, see [Make Facade Kit](/authoring/facade-kit).

#### Heights and filters

| Setting | Default | What it does |
| --- | --- | --- |
| **Fit floors to height** | On | Fits each building's floor count to its map height, inside the floor range of its style's repeating section. Off uses each style's own floor counts. |
| **Allow more floors than the style's range** | Off | Lets a fit add floors past a style's **Max Floors** when the map building is taller. A style's **Min Floors** always holds. |
| **Skip small structures** | On | Leaves out garages, sheds, carports, kiosks and roofs without walls. |
| **Minimum footprint (m²)** | 15 | Footprints smaller than this, in square metres, are left out. |
| **Floor height (m)** | 3.2 | Height of one floor, in metres, used when the map gives a floor count instead of a height. |
| **Building limit** | 2,000 | The most buildings one import brings in. See [Limits](#limits). |

A building's height comes from the map's `height` (or `building:height`) tag, minus its `roof:height` tag when it has one, so the walls fit the part below the roof. With no height, the import multiplies the map's floor count by **Floor height (m)**. With neither, it estimates from the kind of building, varied by about a floor either way so a street of unmapped houses is not one flat line.

#### Shared walls

Buildings that touch share one wall. Row houses are the usual case. Two outline edges count as shared when they lie on the same line, within 15 cm and about 2 degrees, and overlap by at least a metre. The import records the shared stretch on both footprints.

When the Buildings generate, the taller building keeps the wall. The shorter one leaves out its wall along the shared stretch, for the floors that end at or below its neighbour's top. When both are the same height, one of them keeps the wall, so a shared stretch never gets two walls or none. Change the height of either building and its neighbours rebuild to match.

#### What the tab tells you

Below the settings the tab sums up the preview:

- how many buildings the selection holds, and how many Building actors they come in when you group them;
- how many were left out and why: underground, small structures, below the minimum area, or an unusable outline;
- where the heights came from: the map, floor counts, or an estimate;
- how many are shorter than your smallest style or taller than your tallest.

On the map, each building is filled in the colour of the preset table its style comes from, and grey when it has no style. The legend lists each table with its building count; hover it to see the presets in use. Buildings that share one actor share an outline colour.

### Limits

Each layer has a limit that stops a huge selection stalling the editor by surprise. `0` means no limit.

| Limit | Where | Default |
| --- | --- | --- |
| **Street segment limit** | Bottom of the Roads tab | 20,000 |
| **Map area limit** | Bottom of the Areas tab | 2,000 |
| **Building limit** | Buildings tab, under **Heights and filters** | 2,000 |

Over the street or area limit, preparation stops with a message that names the limit to raise. Over the Building limit, the streets and areas still preview and import. The status line says how many buildings the selection holds, and **Create Import** waits until you raise the limit, untick Buildings, or draw a smaller boundary.

### Remembered choices

When you close the window on a new import, it remembers your choices on all three tabs, the **Display** options, the map data, the map view, the boundary and the window size. The next new import starts from them. Only map data that is already in the project and prepared is reopened: opening the window never starts a download or an index.

They are stored per user and per project. A reopened import always uses its own saved choices instead.

## 4. Check the preview

The line at the bottom of the window says where the preview stands - for example *Ready to import.* or *Waiting to prepare the latest selection…* It also counts the buildings that will be imported and, with **Skip buildings outside lots** on, how many it left out. The square beside it is green when the import is ready, amber with partial coverage or too many buildings, red when preparation failed or found nothing, blue while preparing, and grey while the window waits for map data or a boundary. While a preview is being prepared, **Cancel** stops it; after a failure or a pause, **Retry** prepares it again from the data already on disk.

The map shows the prepared result on top of the source outlines. **Display** adds two optional overlays:

- **Generated street lots** shows the lots the roads will enclose.
- **Street points** shows the prepared street lines and every point they keep.

Hover a road or an area for a short summary, and click it to pin a card. A road's card gives its name, category, whether it is one-way, its width and where that width came from, its material, and whether it will be imported. **Original map tags** lists the raw OpenStreetMap data.

### Road assignments

**Road assignments** chooses which Street Config each group of imported roads uses. Roads are grouped by road class, direction, lane count, and reported width. The Street Config supplies the look of the road; each road keeps its own imported width.

:::tip Roads look too thin?
Map data reports real-world widths, which often look narrow in a game city. Set **Minimum Road Width** on the Streets Network (for example `1600`, about four lanes) to widen every thinner road at once - no re-import needed. Roads you set by hand keep their width.
:::

When the button reads **Road assignments (3)**, three groups have no usable config - usually because a saved config was renamed or deleted. Assign them before you import. **Assign all … unresolved groups** gives every unresolved group the same config.

### Diagnostics

**Diagnostics** lists everything the preparation wants you to know, over the map. Click an entry, or use **Previous** and **Next**, to frame it. The number on the button counts only the entries worth a look.

| Entry | Meaning |
| --- | --- |
| **Reference only** | Map ways that were not turned into streets - footpaths, cycleways, sidewalks, and anything your bridge and tunnel choices leave out. Normal for any city. |
| **Reviewable overlap** | The pavement is complete, but separate roads overlap, for example a bridge kept on the ground. Its markings may need adjusting. |
| **Missing geometry** | Pavement or an area that could not be built. The affected spot has no surface and is left out of the lots. |
| **Review** / **Notice** | Anything else to check, such as a bridge that could not be raised. |
| **Review**: *Skipped area* | A mapped area the import could not use. The entry names the area, its map id and its category, and says why: *its outline could not be cut to the selection* or *its shape could not be filled safely*. The import leaves that one area out and carries on. It counts in the number on the button, clicking it frames the spot, and the Output Log gets a warning with the same text. |

Only the types you ticked can produce a skipped area. Unticked types are counted but never cut, so a damaged park cannot block an import of buildings.

## 5. Create or replace

**Create Import** builds the result in the level as one undo step:

- a new **Map Import Group**,
- a **Streets Network** holding the imported roads, if Roads is on,
- one **Map Area** actor per imported area,
- the **Buildings**, if Buildings is on.

It stays unavailable while the preview is out of date, while there is nothing to import, and while the selection is over the Building limit.

If the boundary has missing coverage, you are asked to confirm first. Only available data is imported, and the boundary you drew is kept.

When the window was opened from an import group, the button reads **Replace Import Group** instead. Replacing rebuilds the group's Streets Network, Map Areas and Buildings from the current choices.

:::caution Replacing discards hand edits
**Replace Import Group** throws away every change made since the import: street edits, lot settings, reshaped Map Areas, and any change to the imported Buildings. The Buildings are deleted and built again fresh from the map. **Import Map...** on a Streets Network does the same to the streets already in it. One **Ctrl+Z** restores everything as it was. To keep an edited Map Area or Building, duplicate it on its own first - a copy made that way belongs to no group, so a replace never touches it.
:::

Replacing brings back imported Buildings you deleted. A Building in a World Partition cell that is not loaded blocks the replace until you load that part of the level.

A baked Streets Network must be unbaked before it can be replaced.

## Reopen an import

Select the **Map Import Group** and press **Reopen Import Workspace** in its Details. The window opens with the import's map data, boundary, rotation, road settings, area types and building choices, and the main button reads **Replace Import Group**. **Import Map...** on a Streets Network that came from an import reopens its group the same way.

The group keeps a copy of the map data it imported: its roads, areas and buildings. You can reopen it and change any choice without the original source - on another computer, for example - as long as the boundary stays inside the area it already covers. To widen it, the window shows **Choose source**, which opens the **Map data** menu: pick map data that covers the larger area.

**Duplicate Import Group** copies the group together with its Streets Network, Map Areas and Buildings as a separate import, which can be replaced on its own later. The copied Buildings start unbaked.

## After the import

### The Streets Network

The imported network is an ordinary [Streets Network](/core-actors/streets-network). Edit it in [Streets Mode](/authoring/architect-mode#streets-mode), tag its lots with [Lot Zones](/core-actors/lot-zone), and fill it with [PCG](/pcg/overview).

Each imported segment also carries its own road data. Select it in Streets Mode and the card shows it as ordinary street fields. **Width from** says whether the width came from the street type, the map, or a width you typed. **One-way** and **Lane markings** are the map's one-way flag and centre-line style. **Flip** in the bar reverses a one-way street. **Extra material data** stays under Advanced. The map's own width and category remain on the segment for the network's Details panel:

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

The **SA Get Map Areas** PCG node reads Map Areas into a graph, with the type's [PCG value](#land-area-categories) in `SA_MapAreaCategory`.

### The imported Buildings

Each imported building is an ordinary [Building](/core-actors/building#buildings-from-a-map-import) owned by the Map Import Group. Its actor is named after the building's name or address on the map, or **Building** followed by its map id when the map gives neither. Grouped actors are named **Lot N Buildings (M)** or **Map Buildings (N)**. Every imported Building carries the actor tag `SA_MapBuilding`. A copy you make of one belongs to no import and loses the tag.

The Map Import Group has three commands for its Buildings:

| Command | What it does |
| --- | --- |
| **Select Buildings** | Selects every Building this import created, for example to move them together or change them all at once. |
| **Bake Buildings** | Bakes every Building this import created, so they keep their meshes and stop regenerating each time the level opens. |
| **Unbake Buildings** | Unbakes them, so footprints, styles and heights can be edited again. |

A styled import holds many components until you bake it, so bake the Buildings once you are happy with them. In PCG, [SA Get Map Buildings](/pcg/node-reference#sa-get-map-buildings) reads the footprints with their height, style and kind, and [SA Get Lots](/pcg/node-reference#sa-get-lots) reports how much of each lot they cover.

### Label street lots from areas

On the Map Import Group, **Use Areas to Label Street Lots** (off by default) gives each street lot the category of the imported area that overlaps it most, as its `SA_LotZone`. Lots in a park become `Park`, and so on. A [Lot Zone](/core-actors/lot-zone) actor or a per-lot setting still wins.

## Credit OpenStreetMap

Map data from OpenStreetMap is © OpenStreetMap contributors and licensed under the Open Database License (ODbL). Wherever a map built from it is shown or shipped - a game, a trailer, screenshots - credit it where people can see it, for example on the credits screen:

> © OpenStreetMap contributors

Link to [openstreetmap.org/copyright](https://www.openstreetmap.org/copyright) where a link is possible. That page also explains the extra share-alike terms that apply if you publish the map data itself rather than a game made with it. The credit text is stored with every Map Source and every import, so you can look it up later.

## Credit the height data

An import made with [Ground heights](#ground-heights) also uses Terrain Tiles height data: USGS 3DEP in the United States, SRTM elsewhere. Wherever you show or ship such an import, carry this credit line next to the OpenStreetMap one:

> Terrain Tiles, accessed from https://registry.opendata.aws/terrain-tiles

The import's stored credit text includes it, and the plugin's `Resources/MapData/NOTICE.txt` lists it too.
