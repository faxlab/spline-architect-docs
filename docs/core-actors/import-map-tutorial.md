---
title: Tutorial — Import a real city
sidebar_label: Tutorial — Import a city
description: Six steps from an empty level to a real city from OpenStreetMap - roads, blocks and buildings - with the default settings.
---

import ClipAside from '@site/src/components/ClipAside';
import LoopingClip from '@site/src/components/LoopingClip';

This page imports about one square kilometre of a real city with the default settings. When you want to change what gets imported, the full [Import Map](/core-actors/import-map) page explains every control.

:::info UE 5.8 only
Import Map ships with Streets in the UE 5.8 package only.
:::

## 1. Open the window

In the editor menu bar, choose **SA → Create → Import Map…**. The Import Map window opens. Nothing in your level changes until the last step.

## 2. Find your place

<ClipAside
  image="img/screens/import-map-window.webp"
  alt="The Import Map preview on Lower Manhattan: the boundary and the roads, building footprints and land areas inside it"
  scale={0.4}
>

Type a town or city into **Find a place** at the top left and pick it from the list. The map jumps there and draws a 1000 × 1000 m square around it.

Map data © OpenStreetMap contributors.

</ClipAside>

## 3. Get the map data, once per region

The first time you import from a country or region, a card on the map says **This place needs map data**. Click **Download** on it. The button shows the size first, often a few hundred megabytes.

After the download, the first preview of that region takes a while - up to about 30 minutes - while the data is read. A bar at the bottom of the map shows the progress. This happens once per region; every later import there opens straight away.

## 4. Move or resize the square

<ClipAside
  media={
    <LoopingClip
      alt="Typing a place name, drawing a boundary on the map, then reshaping it by dragging corners; the preview redraws roads and building footprints for each new outline"
      poster="img/clips/import-boundary.webp"
      src="img/clips/import-boundary.mp4"
    />
  }
>

Drag the cross in the middle to move the square, and drag a corner to resize it. About 1000 × 1000 m is a good size. For a larger city, do several imports side by side.

</ClipAside>

## 5. Wait for the green square

The line at the bottom of the window shows where the preview is. Wait until the small square beside it turns green and the line reads *Ready to import.* Leave every option on its default for your first import.

## 6. Create the import

<ClipAside
  media={
    <LoopingClip
      alt="After Create Import the level fills with the imported city: roads first, then the buildings appear block by block until the whole area is built"
      poster="img/clips/import-city-builds.webp"
      src="img/clips/import-city-builds.mp4"
    />
  }
>

Click **Create Import**. The roads appear first, then the buildings, block by block.

Everything the import made sits under one **Map Import Group** in the Outliner. One **Ctrl+Z** removes it all.

</ClipAside>

Roads from map data often look narrow in a game city. Select the new Streets Network and set **Minimum Road Width** to `1600` (about four lanes) to widen the thin roads at once.

## Next

- Change what gets imported - areas, bridges, building styles: [Import Map](/core-actors/import-map#3-choose-what-to-import).
- Redo the import with other choices: [Reopen an import](/core-actors/import-map#reopen-an-import).
- Edit the streets by hand: [Streets Network](/core-actors/streets-network).
