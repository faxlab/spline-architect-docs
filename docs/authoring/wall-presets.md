---
title: Wall Preset reference
description: Choose the pieces a wall is made of and how they fit the path, shape its corners, fill gaps, add posts and vary the result.
---

import ClipAside from '@site/src/components/ClipAside';
import LoopingClip from '@site/src/components/LoopingClip';

These settings decide how a wall is put together: which pieces it uses, how they fit the path, what happens at the corners and what varies from piece to piece. Open them when a wall looks stretched, gappy or too regular.

The same settings appear in a Wall actor, in each wall layer of a Building and in SA Spawn Wall, and they work the same in a shared DataTable row or inline on one actor. Everything on this page applies in all of those places.

## Preset metadata

| Control | What it does |
| --- | --- |
| **Preset Tags** | Labels such as `BaseFloor`, `Facade` or `Trim` that say what this wall is, so PCG graphs and preset searches can pick it out. They are copied to the output with the exact spelling you type, and change no geometry. |

A Wall actor and everything it generates get the Wall Preset's tags. In a Building, only the parts made by that wall layer get them; the Building actor keeps its own Building Preset tags. So a PCG graph can pick out one layer of a Building without treating the whole Building as that layer.

When you change a Wall's preset, the tags Spline Architect added for the old preset are removed. Actor Tags you added yourself stay.

## Core Dimensions

| Control | What it does |
| --- | --- |
| **Wall Height / Height Override** | The height of one floor of wall. Without **Height Override** it is taken from the tallest wall piece. In Fit Height every piece is stretched to exactly this height; in Uniform Scale it is the height the pieces reach on average. |
| **Height Mode** | How meshes are resized to reach Wall Height. **Fit Height** stretches each mesh to exactly Wall Height, and sideways to fill its slot: a flat top, but modular facade pieces get distorted. **Fit Height (Keep Depth)** does the same but leaves each mesh as deep as it was modelled, for steel frames, railings and fences. **Uniform Scale** multiplies every mesh by one shared factor on all three axes, so proportions are never distorted. |
| **Wall Length / Length Override** | The length of the slots the spline is divided into; one wall piece fills each slot. Without **Length Override** it is the length of the longest wall piece at Wall Height. An override is never shorter than `10`. |
| **Corner Length / Corner Length Override** | How big a corner is. For Chamfer, the width of the diagonal cut. For Bend and Pipe, how far the curve reaches along each wall, or its radius - **Corner Size Mode** decides. For Straight, how much is cut from each wall leg. Without the override it is taken from the Corner Mesh. Corners resize with the wall pieces when Wall Height resizes them. |
| **Corner Height Add** | For a corner mesh with something sticking out of its body, such as an ornament on top that makes it taller than the wall. Enter that extra height, and the corner is sized by its body so it lines up with the wall. |
| **Randomize Segments By** | Best Fit only. Adds random variation to the slot lengths, so the pieces do not repeat in a perfectly even rhythm. `0` (default) keeps every slot the same. |

## Wall Configuration

| Control | Options and effect |
| --- | --- |
| **Wall Z Handling** | What the wall does where the spline climbs. **Keep Z** (default) keeps every piece level and sets each one at the height **Keep Z Height From** picks, so a slope becomes a row of level pieces. **Keep Flat** builds the whole wall at the height of the lowest point. **Follow Spline** tilts each piece with the slope, for ramps and walls along terrain. **Skew** shears the pieces: the bottom stays level and the top follows the height change. **Steps** turns every slope into a staircase - see [Stairs with Steps](#stairs-with-steps). |
| **Keep Z Height From** | Keep Z only: which height a level piece on a slope sits at. **Lowest** (default) takes its lower end, so a fence panel or slab sinks into the hill at its uphill end and never floats at the downhill end. **Centre** is how Keep Z worked before 6.3. **Highest** takes the higher end, so each step piece lands at the height it climbs to, as in the shipped Stairs preset. |
| **Max Step Height** | Steps only: the highest one step may rise, in cm. Default `20`. A 300 cm rise with `20` gives 15 steps of exactly 20 cm. |
| **Max Step Depth** | Steps only: the deepest one step may be, in cm, measured flat. Default `0` = no limit. Set it to about `30` so a long, gentle slope gets extra, lower steps instead of a few stretched ones: a 100 cm rise over 600 cm gives 5 steps 120 cm deep without it, and 20 steps 30 cm deep with `30`. |
| **Skip Pieces** | Leaves pieces out of sloped segments (**Angled**) or level ones (**Flat**), for step-like walls. **None** (default) builds on every segment. |
| **Inset** | Moves the wall sideways off the spline: positive values move it outward, negative inward. |
| **Overlap Pieces By** | Lengthens each piece into its neighbours by this much. Mesh sides are rarely perfectly flat, so a small overlap closes the thin seams between pieces. Default `5`. |
| **Num Floors** | Vertically repeats the preset. Floors sit **Wall Height** apart in Fit Height mode, and the height of the tallest generated piece apart in Uniform Scale mode. |
| **Treat Spline Reversed** | Builds as if the spline ran the other way, which turns every piece to face the other side. Tick it when a wall's pieces face the wrong way. |
| **Follow Parent Segments** | Stacked walls only. Off (default): the wall divides its own path. On: it takes the joints and corners of the wall it is stacked on, puts one of its own pieces into each of the parent's bays, stretched to fit, and its posts follow the same joints. Joints are carried straight across to a wall set sideways with **Inset**, so catwalk legs, deck and rails line up on any path. Custom Piece gaps are not copied. |
| **Collapse Nearby Spline Point Distance** | Neighbouring spline points closer than this are merged into one before the corners are built, so an accidental double point does not make a tiny broken corner. Default `10`; `0` turns it off. |

### Fit Height or Uniform Scale

![The same gateway wall in Fit Height, with a flat top and the portico stretched to match the walls, and in Uniform Scale, where the portico keeps its proportions and its crown steps above the walls](/img/screens/height-mode-compare.webp)

**Fit Height** is the default and gives a guaranteed flat top: every mesh is stretched to exactly **Wall Height**, and sideways to fill its slot. A mixed-height kit is levelled, and pieces are distorted as much as it takes.

**Uniform Scale** never distorts anything. Every mesh is multiplied by one shared factor on all three axes, derived from Wall Height divided by the average height of the meshes in the preset. Three consequences follow:

- **The top varies.** A mixed-height set keeps its height differences, so Wall Height is the height the meshes reach *on average* rather than a ceiling they all meet. Use Fit Height when you need a flat top.
- **Pieces keep their real width**, so a different number fits along each segment than you would expect from the authored sizes.
- **Leftover space is filled by Filler Wall Meshes**, and fillers still stretch. A kit used in Uniform Scale wants a filler.

Stacked floors, roofs, and floor alignment all follow the same shared factor, so layers of mixed-height meshes never interpenetrate.

**Fit Height (Keep Depth)** stretches like Fit Height, in height and along the wall, but keeps each mesh as deep as it was modelled. Plain Fit Height makes a 100 cm tall piece fitted to 275 cm also 2.75 times as deep; Keep Depth leaves it at its own depth. Pieces are counted by their modelled length, so the number of pieces does not change when you change Wall Height. Corner meshes and custom pieces still scale as in Fit Height.

### Stairs with Steps

With **Wall Z Handling** set to **Steps**, every sloped part between two spline points is cut into equal steps no higher than **Max Step Height** and, when **Max Step Depth** is set, no deeper than it. Each step is one wall piece, lying level at the height of its uphill end, so every riser is the same height and the top step is flush with the flat part after it. Flat parts are left as they are and work as landings. **Apply Shape > Stair Path** draws a flat, a 3 m rise and a flat to start from.

On slopes the steps ignore **Randomize Segments By**, so they stay equal. Periodically posts still measure along the whole slope.

## Wall Meshes and fitting

| Control | What it does |
| --- | --- |
| **Wall Meshes** | The main pieces the wall is made of. Each slot gets one, chosen the way **Wall Piece Selection** says. |
| **Custom Wall Meshes** | Main pieces that are a Static Mesh or a Blueprint. **Bounds Min XZ** / **Bounds Max XZ** say how big the piece counts as for fitting, measured from its pivot (X along the wall, Y up); leave them at zero to use the asset's own size. A Blueprint entry is spawned as a child actor for every piece it places. |
| **Wall Piece Selection** | **Best Fit** chooses the closest natural-length piece that fits; **Random Fit** deals the pieces out in a shuffled order set by the wall's **Seed** - each piece once before any repeats, skipping one that does not fit the space left; **Ordered Sequence** repeats array order; **Closest Length** gives each segment one piece, the one whose length is closest to the segment's, stretched or squashed to fit it exactly. A segment far longer than the longest piece repeats that piece a few times instead of stretching it. Closest Length is made for long flat pieces such as [Make Facade Kit](/authoring/facade-kit) planes. |
| **Filler Wall Meshes** | Short pieces that fill what is left of a segment, so the main pieces are not stretched to close it. Use them for pieces that must keep their shape, such as a wall with round windows. |
| **Filler Placement** | Where fillers go. **Segment Sides** (default) puts them on both sides of each segment; **Between/Ends Wall Meshes** puts them at the start, between the main pieces and at the end. Shown once Filler Wall Meshes has an entry. |
| **Min Filler Wall Length** | The smallest gap that gets a filler; shorter gaps get none. Default `10`. |
| **Keep World Scale / World Scale** | Builds every piece at the fixed **World Scale** instead of stretching it to fit its slot. |

When no piece fits a slot, Best Fit still places one, at its own length. A filler can land before a main piece when that packs the segment better; there is no switch to always place main pieces first.

## Corner and placement

<ClipAside
  media={
    <LoopingClip
      alt="One wall corner cycling through its treatments: a dedicated corner mesh, a straight miter, a chamfer, and smooth bends"
      poster="img/clips/wall-corners.webp"
      src="img/clips/wall-corners.mp4"
    />
  }
>

How a turn is built is one choice: give it a dedicated **Corner Mesh**, or let **Corner Type** shape the wall pieces themselves - mitered square, cut on the diagonal, or carried around a curve.

</ClipAside>

| Control | What it does |
| --- | --- |
| **Corner Mesh** | A dedicated piece for turns, such as a pilaster. Leave it empty and turns get no corner piece; **Corner Type** only decides how a Corner Mesh is cut or bent. |
| **Corner Type** | How a turn is built. **Straight** (default) cuts and mirrors the piece on the corner's diagonal, for a sharp mitre. **Bend** bends the pieces around the corner, for curved walls. **Chamfer** puts one flat diagonal across the corner. **Pipe** bends like Bend, for pieces whose pivot is in their middle, such as pipes and railings. |
| **Corner Size Mode** | Bend and Pipe only: what Corner Length measures. **Leg Length** (default): every corner reaches the same distance along its walls, so sharp corners curve much tighter than open ones. **Radius**: every corner gets the same curve whatever its angle - pick it when a shape with different corner angles should look evenly rounded. |
| **Overlap Corners By** | Pushes each corner this far into the pieces beside it, to close gaps at the turn. Default `0`. |
| **Offset By** | Moves everything the wall generates, stacked floors included, by this offset - for example to sink or raise the whole wall. |
| **Offset Every Floor** | Extra shift in cm added between every floor copy of this wall (**Num Floors**), and carried up to every wall stacked on top of it. To move only the wall on top, leave this at `0` and use **Offset By** on that wall instead. Called Offset Stacked By before 6.3. |

## Floors, roofs, posts, and variation

- **Floor Surfaces** and **Roof Surfaces** are fully listed in [Floors and roofs](/authoring/floors-roofs).
- **Post Configurations** adds extra meshes at chosen places on the wall. Each entry has its own mesh, offset, rotation, scale and mirror switches. **Generation Method** says where they go:
  - **Corner Ends** (default; called On Corners before 6.3): two posts at every corner, one at each end of the corner zone, where the corner meets the straight wall on either side.
  - **Corner Points**: one post exactly on each corner point, turned halfway between the two walls. The first and last point of an open path are not corners; add Start and End for those.
  - **Between Segments**: a post at every joint between two wall pieces inside a straight run. Corners and the ends of the wall get none; add Corner Ends, Corner Points or Start and End for those.
  - **On Spline Points**, **On Custom Pieces**, **Periodically** (every **Period Distance**, default `100`) and **Start and End**, which can give each end post its own mesh and transform.

  When two entries with the same mesh would put a post on the same spot (within 1 cm, same floor), only the first entry in the list places it.

  A post grows with the wall height (**Scale To Wall Height**) unless you turn that off. By default it grows evenly in all directions, so a tall wall also makes it thicker; tick **Height Only** to stretch it upwards only, for steel legs and columns. A post stands upright unless you let it follow the spline's slope, and can skip sloped or level segments.

  **Down To Ground** lets each post reach down to the ground below it, for legs under a deck or a pier. **Off** (default) keeps the normal post. **Stretch** hangs the post from where it is placed, Post Offset included, straight down to the ground, stretched in height only, each post with its own length. **Stack** repeats the post mesh at its normal size downwards until it reaches the ground, for meshes whose texture looks wrong stretched; **Gap** (cm) is the space between copies, negative overlaps, and the last copy may sink into the ground but is never cut. **Place On Ground** keeps the post at its normal size and drops it straight down until its bottom sits on the ground, for footings and base plates under legs set to **Stretch**. The ground is anything with collision straight below within 100 m, such as landscape or meshes, never the wall's own pieces or the walls stacked with it. Where nothing is found, the normal post is kept.
- **Randomisation Settings → Random Transform** moves, turns and scales every placed piece by a random amount within the ranges you set. Keep the location range small, or pieces start to flicker through each other. With uniform scale on (default), the X range is used for all three axes, so pieces keep their proportions.
- **Random Meshes** swaps a **Key Mesh** for a weighted random pick from a list of alternatives; the Key Mesh stays in the draw. **Keep Scale** (default) keeps the replacement's own size, which can leave gaps or overlaps; **Match Scale** fits it to the original's size. **Knockout** removes that share of the pieces that use the Key Mesh, at random: `0` keeps all, `1` removes all. Two switches turn pieces at random about the up axis, by 90° steps or by 180°.

## Materials and instance custom data

**Material Parameters** sets named Float or Vector (color) parameters on the materials of the generated pieces, for example to give one wall its own tint from a shared material. Each entry applies to all materials and meshes, only the ones you list (**Include**), or all except them (**Exclude**). Keep parameter names the same across a kit, so one entry works on every piece.

**Instance Custom Data Entries** hands numbers to the material of every instance when the wall's output is Instanced or Hierarchical Instanced. Each entry writes either a value the wall works out for that piece, or a constant Float, Vector2, Vector3 or Color. The worked-out values include the piece's index, a random value that stays the same for the same seed, the actor's seed, the piece's direction, scale and height, how far along the spline or segment it sits, its layer in the stack and its floor.

The material reads the values by slot number, in list order: a worked-out value or a Float takes one slot, a Vector3 three, a Color four. Once a material relies on that order, do not reorder the entries.
