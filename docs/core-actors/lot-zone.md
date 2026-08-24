---
title: Lot Zone
description: Assign semantic zone tags to Streets Network lots for PCG filtering.
---

:::info UE 5.8 only
Lot Zone exists to tag Streets lots, so it ships with Streets in the UE 5.8 package only. See [compatibility](/reference/compatibility).
:::

Lot Zone is a lightweight semantic actor. Its closed spline stamps a `Name` value onto every Streets lot whose centroid falls inside it. SA Get Lots emits that value as `SA_LotZone` for PCG filters and branching.

| Control | What it does |
| --- | --- |
| **Zone Spline** | Closed boundary. Edit its points with Architect Mode or the normal spline tools. |
| **Zone** | Name written to matching lots, such as `Residential`, `Commercial`, `Park`, or `Industrial`. |

When zones overlap, the smallest-area matching Lot Zone wins. A Lot Zone overrides a per-lot Streets setting; if neither supplies a value, the Streets Network's **Default Lot Config → Zone** is used.

After moving or editing a Lot Zone, rebuild the Streets Network and regenerate dependent PCG graphs. Lot Zones are metadata only: they do not directly create or remove road geometry.

### PCG example

1. Draw `Residential` and `Commercial` Lot Zones over the network.
2. Feed **SA Get Lots → Lot Boundaries** into **Filter Data By Attribute**.
3. Filter `SA_LotZone == Residential` into one **SA Spawn Building** preset and the commercial branch into another.
