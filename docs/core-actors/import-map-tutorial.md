---
title: Tutorial — Import a real city
sidebar_label: Tutorial — Import a city
description: Six steps from an empty level to a real city from OpenStreetMap - roads, blocks and buildings - with the default settings.
---

import AnnotatedShot from '@site/src/components/AnnotatedShot';
import ClipAside from '@site/src/components/ClipAside';
import LoopingClip from '@site/src/components/LoopingClip';

This page imports about one square kilometre of a real city with the default settings. When you want to change what gets imported, the full [Import Map](/core-actors/import-map) page explains every control.

:::info UE 5.8 only
Import Map ships with Streets in the UE 5.8 package only.
:::

:::caution Known issue: Download fails for parts of a country (fixed in 6.3.1)
In Spline Architect 6.1 to 6.3.0, **Download** *region* does nothing for a region that is part of a country: a US state, a Canadian province, or a region of Germany, France, the UK and other large countries. The server that hosts the map files moved them. Regions that are a whole country still download.

Until 6.3.1 is on Fab, get the file yourself:

1. Open [download.geofabrik.de](https://download.geofabrik.de/) in your browser, click through to your region and download its `.osm.pbf` file.
2. In the Import Map window, click **Map data**, then **Open OSM file…**, and pick that file.

Everything else works as described on this page, including the one-time wait while a new region is read.
:::

## 1. Open the window

In the editor menu bar, choose **SA → Create → Import Map…**. The Import Map window opens. Nothing in your level changes until the last step. The numbers on the picture match the steps below.

<AnnotatedShot
  native
  src="img/screens/import-map-window-full.webp"
  alt="The Import Map window on Lower Manhattan: the place search at the top, the map with the blue boundary and the preview of roads and buildings, the import options on the right, and the status line with Create Import at the bottom"
  callouts={[
    {n: 2, label: 'Find a place', x: 41.4, y: 5.3},
    {n: 3, label: 'Map data for this region', x: 88.7, y: 5.4},
    {n: 4, label: 'The boundary - drag its corners', x: 15.6, y: 35.3},
    {n: 5, label: 'Status line', x: 11.8, y: 96.9},
    {n: 6, label: 'Create Import', x: 96, y: 96.9},
  ]}
/>

Map data © OpenStreetMap contributors.

## 2. Find your place

Type a town or city into **Find a place** at the top left and pick it from the list. The map jumps there and draws a 1000 × 1000 m square around it.

## 3. Get the map data, once per region

The first time you import from a country or region, a card on the map says **This place needs map data**. Click **Download** on it. The button shows the size first, often a few hundred megabytes.

After the download, the first preview of that region takes a while - up to about 30 minutes - while the data is read. A bar at the bottom of the map shows the progress. This happens once per region; every later import there opens straight away.

## 4. Move or resize the square

<ClipAside
  media={
    <LoopingClip
      alt="A square boundary over Lower Manhattan is reshaped into a polygon by dragging its corners and adding points; once the outline settles, the preview draws the roads and building footprints inside it"
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
      alt="Create Import is clicked in the Import Map window; then the imported area is seen from above, its roads in place, while the buildings appear block by block until the whole area is built"
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
