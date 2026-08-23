---
title: Build a reusable Building
description: Create a connected Wall stack, save it as a Building Preset, and place reusable Building actors.
---

This workflow builds a reusable Building from the same Wall layers you can inspect and art-direct individually.

![A connected Wall stack in the SACity example](/img/screens/first-building-stack.png)

![Connected Wall hierarchy becoming a Building Preset and Building actor](/img/diagrams/actor-hierarchy.svg)

## 1. Draw the root Wall

Enter Architect Mode, choose a ground-floor Wall preset, and draw a closed footprint. The root Wall owns the spline used by the connected stack.

For a predictable first result:

- use a deterministic **Seed** such as `42`;
- leave **Multi Spline Mode** at Independent;
- keep **Generation Mode** at Baked;
- correct the footprint before adding upper layers.

## 2. Add connected Wall layers

Select the root Wall and choose **Spline Architect → Add Wall to Selected**. Choose an upper-floor or roof-line preset. The new Wall is connected to its parent and follows the same effective footprint with its own cumulative **Offset Stacked By** and preset controls.

Repeat for additional layers. Use **Select Connected** or **Select Roots** to inspect the hierarchy. Every layer should have a unique role: ground floor, repeated upper floor, parapet, trim, or roof edge.

To slide a new storey in **underneath** an existing stack, select the bottom wall and choose **Insert Wall**. The new wall takes over the footprint and everything above it moves up, custom pieces included.

## 3. Save a Building Preset

Select the root Wall. In its **Preset** category, click **Save Building Preset**. Choose or create a Building Preset DataTable and a row name.

If you only want this one stack collapsed into a single actor and do not need to reuse the design, press [**Convert to Building**](/production/conversion-export#convert-to-building) instead - it carries the settings inline, with no DataTable row.

The saved hierarchy records:

- a stable `Wall ID` for each layer and its `Parent Wall ID`;
- whether the layer uses a Wall DataTable row or an inline Wall preset;
- per-layer parameter overrides;
- optional random floor ranges.

## 4. Place the reusable Building

In Architect Mode, switch to Building presets and select the row you saved. Draw a new closed footprint. Spline Architect creates a Building actor whose **Building Preset** resolves the saved Wall hierarchy onto that footprint.

You can also place a Building actor, assign **Data Table Building Preset**, and use its spline tools. Turn on **Rename Actor on Building Preset Selection** to keep Outliner labels aligned with row names.

## 5. Bake the connected result

Use **Bake Connected** from the Spline Architect menu. This bakes the root and every connected layer with a consistent bake method and mobility. If you change a spline, preset, seed, or relevant control later, the affected output automatically unbakes. Review the regenerated building and run **Rebake Connected**.

:::note Breaking a Building
The Building actor's **Break** button decomposes it into editable connected Wall output and removes the Building. Use it when a reusable preset needs one-off art direction. It is intentionally a destructive conversion of that actor, so duplicate first if the reusable version must remain.
:::
