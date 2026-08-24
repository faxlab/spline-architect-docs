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
