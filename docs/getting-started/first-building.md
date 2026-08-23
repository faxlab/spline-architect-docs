---
title: Build a reusable Building
description: Draw a Wall stack, save it as a Building Preset, and place the same building on any footprint.
---

A Building is a Wall stack you taught the plugin to rebuild anywhere. This page builds one the long way once - draw the stack, save it, place it - so you know exactly what the preset contains.

<!-- CAPTURE clip building-stack: select root wall -> Add Wall to Selected -> pick an upper-floor preset -> the layer lands on the footprint; repeat once more. ~10 s. -->

## 1. Draw the root Wall

Enter Architect Mode, choose a ground-floor Wall preset, and draw a closed footprint. The root Wall owns the spline; every layer you stack on it follows that same footprint.

For a first run that behaves the same every time: set **Seed** to something fixed like `42`, and get the footprint right *before* stacking - a footprint edit regenerates every layer above it.

## 2. Stack the layers

Select the root Wall and choose **Spline Architect → Add Wall to Selected**, then pick an upper-floor or roof-line preset. The new Wall connects to its parent, follows the same footprint, and stacks by its own height.

Repeat per layer, giving each one job: ground floor, repeated upper floor, parapet, trim, roof edge. **Select Connected** and **Select Roots** navigate the stack when it grows.

To slide a new storey in **underneath** an existing stack, select the bottom wall and choose **Insert Wall**. The new wall takes over the footprint and everything above it moves up, custom pieces included.

## 3. Save it as a Building Preset

Select the root Wall. In its **Preset** category, click **Save Building Preset**, and choose or create a Building Preset DataTable and a row name.

The row records the whole hierarchy: each layer's identity and parent, whether it uses a Wall DataTable row or carries its settings inline, its parameter overrides, and any random floor ranges. That is the entire building, as data - which is why the next step works.

If you only want *this* stack collapsed into a single actor and will never reuse the design, press [**Convert to Building**](/production/conversion-export#convert-to-building) instead. It carries the settings inline, with no DataTable row and no save prompt.

## 4. Place it on any footprint

In Architect Mode, switch to Building presets, select your saved row, and draw a **different** closed footprint - wider, L-shaped, whatever the block needs. The Building resolves the same layer stack onto it.

<!-- CAPTURE still building-two-footprints: the same Building Preset standing on two visibly different footprints side by side. This is the payoff frame of the page. -->

This is the point of a Building over a copied wall stack: one preset, any footprint, and an edit to the preset row updates every placement when it regenerates.

## 5. Bake the connected result

Run **Bake Connected** from the Spline Architect menu - it bakes the root and every connected layer together. If you edit anything later, the affected output unbakes itself and shows the new preview; look it over and **Rebake Connected**. That loop is the [baked-first workflow](/getting-started/baked-first-workflow).

:::note The Break round-trip
A placed Building is hard to art-direct as one actor - it is many walls. **Break** turns it back into editable connected Walls; adjust them individually, then press **Convert to Building** to collapse the result into a Building again, carrying your changes as its own inline preset. The original preset row is untouched, so every other placement keeps following it.
:::
