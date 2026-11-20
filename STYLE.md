# House style

The docs speak in the same voice as the editor tooltips. When unsure how to phrase
something, find a tooltip in `TooltipInventory.md` (plugin repo) that does a similar
job and match it.

The rules, with the tooltip that models each:

1. **Talk to the person doing the work.** "Click the first point to close the loop" -
   never "the user can close the loop".
2. **Say why in the same breath as what**, whenever a choice exists. Model: *"Off
   (default): the point places exactly one piece, on the run nearest to it - which is
   what you want for a gate, since a gate should not appear in two fences at once."*
3. **Concrete over abstract.** Name the button, the number, the unit. *"in world units
   (100 = 1 m)"* - not "at a configurable distance".
4. **No selling.** Banned: powerful, seamless, robust, comprehensive, effortless,
   easily, simply, "!" The product is the demo; the docs just say what happens.
5. **Short sentences, plain verbs.** If a sentence needs a second comma, try two
   sentences.
6. **Never open a page by restating its title.** Open with the thing the reader came
   to learn.
7. **Tables are for reference, prose is for understanding.** A settings table is right;
   a table of concepts usually means the prose was skipped.
8. **State limits flatly, without apology.** Model: *"AI navigation never sees dynamic
   meshes, whatever the collision setting says."*
9. **One idea per paragraph.** A reader skimming headings and first sentences should
   still get the page.
10. **Warnings earn their box.** `:::caution` only when ignoring it loses work or hangs
    the editor; everything else is a plain sentence.

## Pictures

Agreed with Kajus on 2026-11-20. Real editor captures only, never mock-ups.

- **Subject teal**, linear RGB (0.10, 0.55, 0.52): the actor or mesh the picture is about.
  Teal keeps Unreal's orange selection outline visible.
- **Markers orange**, linear RGB (0.95, 0.35, 0.02): pivots, points and anything the
  caption asks you to look at.
- **Context light grey** (0.78, 0.78, 0.76) for props the subject sits on, such as a ramp.
- **Floor plain grey** (0.32, 0.33, 0.34), no checker texture.
- All four are `/Engine/BasicShapes/BasicShapeMaterial` instances with `Color` set.
- Keep editor UI (selection outline, panels) where it helps the reader find things.
  Move light and sky actors out of frame so their icons don't sit in the shot.
- Show a picture at its own size (`AnnotatedShot native`, `Compare`), crop tight to the
  subject, at most 1000 px wide, WebP quality 90. One short caption and real alt text.
- Use the example content's real materials when the picture is about how something looks,
  not about where a part is.
