---
title: Build a reusable Building
description: Create a connected Wall stack, save it as a Building Preset, and place reusable Building actors.
---

A Building is a Wall stack you taught the plugin to rebuild anywhere. This page builds one the long way once - draw the stack, save it, place it - so you know exactly what the preset contains.

![A connected Wall stack in the SACity example](/img/screens/first-building-stack.png)

![Connected Wall hierarchy becoming a Building Preset and Building actor](/img/diagrams/actor-hierarchy.svg)

## 1. Draw the root Wall

Enter Architect Mode, choose a ground-floor Wall preset, and draw a closed footprint. The root Wall owns the spline; every layer you stack on it follows that same footprint.

For a first run that behaves the same every time: set **Seed** to something fixed like `42`, and get the footprint right *before* stacking - a footprint edit regenerates every layer above it.

## 2. Add connected Wall layers

Select the root Wall and choose **Spline Architect → Add Wall to Selected**, then pick an upper-floor or roof-line preset. The new Wall connects to its parent, follows the same footprint, and stacks by its own height.

Repeat per layer, giving each one job: ground floor, repeated upper floor, parapet, trim, roof edge. **Select Connected** and **Select Roots** navigate the stack when it grows.

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

Run **Bake Connected** from the Spline Architect menu - it bakes the root and every connected layer together. If you edit anything later, the affected output unbakes itself and shows the new preview; look it over and **Rebake Connected**. That loop is the [baked-first workflow](/getting-started/baked-first-workflow).

:::note Breaking a Building
**Break** turns a placed Building back into editable connected Walls and removes the Building actor - the move when one placement needs one-off art direction. It is deliberately destructive for that actor, so duplicate it first if you still need the reusable version.
:::
