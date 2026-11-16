# Picture plan

Dated 2026-11-16, made from an audit of commit d72ed0b.
Nothing in it is decided by the owner yet.

Star = top 10. Who: **A** = an agent can capture it by driving the editor; **O** = needs the owner; **A+O** = agent sets up, owner approves. "Agent can capture" is a judgement, not yet tested.

| # | Page | Must make clear | Form | In frame | Who |
|---|---|---|---|---|---|
| 1★ | authoring/wall-presets | What each Wall Piece Selection mode does | Labelled 4-up | Same 3-piece kit on one 20 m straight wall: Best Fit, Random Fit, Ordered Sequence, Closest Length | A |
| 2★ | authoring/wall-presets | How a wall treats a slope | Labelled 4-up | One spline rising 3 m over 20 m: Wall Z Handling Keep Z, Keep Flat, Follow Spline, Skew; side-on | A |
| 3★ | authoring/floors-roofs | What the roof numbers do | 2×3 grid | Same L footprint: Slope Angle 0 / 20 / 45; Slope Inset small / large (flat top); Base Inset negative (overhang) | A |
| 4★ | core-actors/building | One preset gives many buildings | Row of 5 | Same footprint and preset, Seed 1–5, repeating section Min 3 / Max 9 floors, repeating section tinted | A |
| 5★ | core-actors/custom-piece | Insert versus Overlap versus gap | 3-up | Same wall, same spot: door with Insert, sign with Overlap, empty mesh as a gap | A |
| 6★ | core-actors/curve | Z Up versus Transported | Side by side | Same path that climbs and turns; a kerb in Z Up, a pipe in Transported, then each in the wrong mode | A |
| 7★ | core-actors/streets-network | What each Lot Height choice does on a hill | Labelled 4-up | Same hillside block: Follow Slope, Level at Low Side, Level at High Side, Level at Main Street; step walls visible | A |
| 8★ | core-actors/streets-network | What a sidewalk layer is made of | Annotated still, replaces the wireframe | Close three-quarter view of one corner: road, junction, corner pad, sidewalk, lot ground, curb, step wall, each labelled | A |
| 9★ | core-actors/import-map | The whole import in five steps | Five annotated screenshots or one loop | Find a place, draw boundary, tick Roads / Areas / Buildings, green status square, result in level | O |
| 10★ | pcg/overview | Read, transform, generate | 4-step strip, same camera | One block: lot boundary, after SA Subdivide Lots, after SA Polygon Offset, after SA Spawn Building | A |
| 11 | production/baking | Bake is a reversible checkpoint; what each method produces | Loop plus 3-up | The unbake-rebake clip; then one building as Components / Instanced / Hierarchical Instanced with component count in each label | A |
| 12 | authoring/wall-presets | Corner types at a glance | Labelled 5-up still above the existing clip | Same 90° corner: Corner Mesh, Straight, Bend, Chamfer, Pipe; light floor | A |
| 13 | authoring/wall-presets | Why a kit wants a filler | Side by side | 17.3 m wall with 4 m pieces: no filler (stretched) versus Filler Wall Meshes; Filler Placement Segment Sides versus Between | A |
| 14 | authoring/wall-presets | Fit Height versus Uniform Scale (reshoot) | Side by side | Same gateway wall, front-on, no gizmo or selection, a guide line at Wall Height | A |
| 15 | authoring/wall-presets | Inset, Overlap Pieces By, Offset Stacked By | Three strips of 3 values | Inset −50 / 0 / 50; Overlap 0 / 10; Offset Stacked By 0 / −30 on a 3-floor stack | A |
| 16 | authoring/wall-presets (posts) | Where posts can go | 6-up grid | One fence: Corners, Spline Points, Between Segments, Periodically (400), Start/End, Custom Pieces | A |
| 17 | authoring/wall-presets | What Seed and Knockout change | Loop under 8 s, or 3-up | One facade with Random Meshes: Seed stepping 1–5; Knockout 0 / 0.25 / 0.5 | A |
| 18 | core-actors/wall | What a stack is | Annotated exploded still, first image on the page | One building pulled apart: base, repeating floors, trim band, roof edge, labelled | A+O |
| 19 | core-actors/wall | Mirror Mode | 4-up top-down | Same half-drawn spline: None, X, Y, XY | A |
| 20 | authoring/floors-roofs | Which roof edge preset is which | Annotated still | One hipped roof, colour-coded: ridge (Convex), valley (Concave), eave (Border), Flat Top edge | A |
| 21 | authoring/floors-roofs | Floor Align To, Inset, Thickness | Cutaway side view, 3-up | Same wall: Align To Top / Center / Bottom; Inset 0 / 50; Thickness 0 / 30 | A |
| 22 | core-actors/custom-piece | Floors, Num Meshes, Fill Segment | Grid | 5-floor wall: Floors `1`, `2-4`, empty; Num Meshes 1 / 3; Fill Segment on | A |
| 23 | core-actors/curve | Tangent modes and Fillet Radius | Grid, top-down | Same zigzag: Manual, Auto Fillet, Fixed Fillet at 100 / 300 / 600 | A |
| 24 | core-actors/curve | What Curve is for | One labelled still | Kerb, rail, pipe, cable, trim in one scene | O |
| 25 | core-actors/streets-network | Curb Height, Corner Radius, Corner Segment Length | 3×3 grid | Same corner: Curb Height 0 / 15 / 30; Corner Radius 0 / 300 / 800; Segment Length 0 / 200 / one cut | A |
| 26 | core-actors/streets-network | Per-segment override (reshoot) | Annotated crop | Viewport plus only the Segment fold, box around Override This Segment and Width | A+O |
| 27 | Streets Mode section | What the three-row bar holds | Annotated crop | The bar alone: status line, selection row, tool row | O |
| 28 | core-actors/lot-zone | A zone labels the lots inside it | Top-down still | Two zone loops (Residential, Commercial), lots tinted by zone, different buildings in each | A |
| 29 | core-actors/import-map | Map versus result | Side by side | Import Map preview of a 1000 × 1000 m area and the same area top-down in the level | O picks the place |
| 30 | core-actors/import-map | Building options | 3-up | Same block: Footprints only, styled, Facade Kit style; then Fit floors to height off / on | A |
| 31 | core-actors/import-map | Ground heights | Side by side | Same hilly import, low side camera: off (flat) / on | A |
| 32 | core-actors/import-map | Where everything is in the window | Annotated screenshot | Search, Map data menu, Draw / Align, three tabs, status square, Create Import | O |
| 33 | authoring/facade-kit | What a kit trades away | Close / far pair | Source preset and its Fast copy at 5 m and at 150 m, triangle counts in labels; Parallax off / on | A |
| 34 | pcg/node-reference | What each key node does | Small before/after card per node | SA Get Lots, SA Subdivide Lots, SA Polygon Offset, SA Prune Footprints, SA Get Facade Frames, SA Follow Ground | A |
| 35 | pcg/node-reference | Edge Placer Fill and Facing | Grid | One street edge: Packed / Fixed Spacing / Random Spacing; Facing Away / Toward / Along; Fit Segment off / on | A |
| 36 | pcg/landscape-patch | What the node does to terrain | Before / after | Sloped park lot flattened, path cut through, pad under a bench | A+O |
| 37 | pcg/recipes | The result of each recipe | One still per recipe | The alley picture; then lamps, crosswalks, traffic lights, rooftop scatter | A |
| 38 | production/conversion-export | Proxy LOD | Before / after | One building and its proxy, triangle counts in labels | A |

## Rules for all visuals

- **One idea per picture.** If the caption needs "and", make two pictures.
- **Comparisons:** same actor, same spline, same camera, same light, one setting changed. The setting name and value go in each panel. Two to six panels.
- **Stage:** one neutral level with the light checker floor and a fixed afternoon sun. No black void.
- **Clean viewport:** Game View on, no gizmo, no selection outline, no cursor, unless the spline or handle is the subject.
- **Framing:** three-quarter view for buildings; straight top-down for footprints, streets and lots; side-on for heights and slopes.
- **UI shots:** crop to the control and its result; at most six callouts; a box around the one setting that matters; dark editor theme.
- **Clips:** under 8 seconds, one action, loop cleanly, silent, poster frame showing the end result.
- **Prefer a still grid to a clip** for a set of values; use a clip only for an action.
- **Size:** capture at 1920 wide or more, WebP quality 90, clips under 3 MB. Text in a picture must be readable at the 800 px column width.
- **Placement:** directly under the first two sentences of the page or section, never after the table.
- **Alt text** states what differs between panels.

## Structure changes the audit suggested (not decided, they change page addresses)

- Split `core-actors/import-map.md` into a five-step walkthrough and a reference page.
- Move Streets Mode out of `authoring/architect-mode.md` into the Streets category.
- Merge the two Architect Mode pages, and `getting-started/baked-first-workflow.md` into `production/baking.md`.
- Move `authoring/facade-kit.md` next to Building. Give posts their own section.
