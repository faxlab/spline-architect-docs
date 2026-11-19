---
title: Lot Zone
description: Label the lots in part of a city, such as Residential or Park, so a PCG graph can build different things in each.
---

import LotZoneDiagram from '@site/src/components/LotZoneDiagram';

Draw a loop over part of your city and name it Residential. Every lot inside gets that label, so a PCG graph can put houses there and shops elsewhere.

<LotZoneDiagram />

:::info UE 5.8 only
Lot Zone exists to tag Streets lots, so it ships with Streets in the UE 5.8 package only. See [compatibility](/reference/compatibility).
:::

A Streets lot counts as inside when its centre falls inside the loop. SA Get Lots passes the label on as `SA_LotZone`, for PCG filters and branches.

| Control | What it does |
| --- | --- |
| **Zone Spline** | The closed loop that marks the zone. Edit its points with Architect Mode or the normal spline tools. |
| **Zone** | The label every lot inside gets, such as `Residential`, `Commercial`, `Park`, or `Industrial`. |

When zones overlap, the smallest-area matching Lot Zone wins. A Lot Zone overrides a per-lot Streets setting; if neither supplies a value, the Streets Network's **Lots → Default Zone** is used.

After moving or editing a Lot Zone, rebuild the Streets Network and regenerate the PCG graphs that read it. A Lot Zone only labels lots: it builds and removes nothing by itself.

### PCG example

1. Draw `Residential` and `Commercial` Lot Zones over the network.
2. Feed **SA Get Lots → Lot Boundaries** into **Filter Data By Attribute**.
3. Filter `SA_LotZone == Residential` into one **SA Spawn Building** preset and the commercial branch into another.
