# v6 docs — session plan

The order we follow to get from "prose done, no pictures" to "PR ready to merge". Each step
ends with a checkpoint so a session can stop there and resume cleanly.

Roles: the user drives the editor and records; Claude sets up scenes via MCP where it
helps, places every capture into the pages, and keeps the build green.

---

## Step 0 — Bring the host back to life

**Goal:** an editor that runs the plugin from the tree we are documenting.

1. Confirm the plugin repo is on a tree matching what ships. It is currently on
   `fix/unity-build-collisions` with `PackagePlugin.bat` dirty — stash or commit that first,
   or switch to `main`.
2. Build the editor target, editor closed:
   ```bash
   "D:/Games/UE_5.8/Engine/Build/BatchFiles/Build.bat" UnrealEditor Win64 Development -Project="C:/Users/f4x11ut/Documents/Unreal Projects/SACity/SACity.uproject" -NoXGE -NoUBA -MaxParallelActions=8 -WaitMutex
   ```
3. Confirm a **real** compile happened — `Binaries/Win64` has DLLs and the
   `Module.SplineArchitect.cpp.obj` mtime is now. "Result: Succeeded" in two seconds means
   nothing built; purge `SACity\Intermediate\Build` and go again.
4. Launch SACity. Open the gallery map. Start MCP: `ModelContextProtocol.StartServer 8963`.

**Checkpoint:** the editor is open, SA actors generate, Claude can reach it over MCP.

---

## Step 1 — Look at one clip on the page

**Goal:** prove the motion pipeline end-to-end before recording seven clips into it.

Already done ahead of the session with a stand-in clip (2026-08-23): `LoopingClip` lays
out at the full content width with the caption beneath, plays, loops, and the poster
resolves. What remains is the part only a real recording can answer:

1. Record **T1-a, drawing a building** with ShareX (Shift+PrintScreen starts, again stops).
2. Run `.\scripts\claim.ps1 T1-a` — it names the file, moves it in, cuts a poster, and
   warns if it is over 3 MB or longer than 15 s.
3. Claude wires it into `architect-mode-fundamentals.md`; the dev server reloads.
4. Look at it: crop, length, loop point, caption. In Chrome DevTools → Rendering →
   *Emulate CSS media feature prefers-reduced-motion* → confirm the poster shows instead.
5. Fix anything **now**, while there is one clip to re-export, not seven.

**Checkpoint:** one real clip live on a page and the recipe settled.

### The capture loop, for every item after this

```
record in ShareX  →  .\scripts\claim.ps1 <ID>  →  "claimed"  →  Claude wires it  →  page reloads  →  look  →  next
```

`.\scripts\capture-intake.ps1 -Watch` in a second terminal shows the running tally.

ShareX defaults were adjusted for this (backup in `Documents\ShareX\Backup\`): PNG is
never auto-converted to JPEG, video is CRF 23 / preset slow instead of a fixed 25 Mbps,
and no audio track is encoded.

---

## Step 2 — The hero and the four selling clips

**Goal:** the material a buyer actually scrolls to. Done first so that if the session ends
here, the site is already better than before.

In this order, because each scene sets up the next:

| | Capture | Scene |
| --- | --- | --- |
| S1 | `overview-sacity.png` — the hero | Finished SACity street, low three-quarter, minimal UI. Save the camera as a bookmark; we return to it. |
| T1-b | `subdivide-preview.mp4` | One large lot, two passes in different configs. Subdivide, drag target area, Reroll twice, Apply. |
| T1-c | `streets-to-pcg.mp4` | Same block, now with PCG buildings on the sub-lots. Drag one node; watch the city follow. |
| T1-d | `unbake-rebake.mp4` | A baked Building from the hero shot. Change Num Floors, it unbakes and grows, Rebake Connected. |

Claude places each into its page as it lands and removes the matching TBD marker.

**Checkpoint:** hero replaced, four Tier-1 clips live, build green, commit pushed.

---

## Step 3 — The stills that replace paragraphs

**Goal:** the three pictures doing a job words are currently failing at, plus the one that
is outright broken.

| | Capture | Why it matters |
| --- | --- | --- |
| S9 | `preset-library.png` | Currently a copy of the Architect Mode shot. Broken on the live page. |
| S11 | `height-mode-compare.png` | Same mixed-height kit on two walls, Fit Height vs Uniform Scale, side by side. Replaces three paragraphs of explanation. |
| S6 | `lot-surface-layers.png` | Skirt + corner pads + Thickness > 0, close and angled, dropped kerb visible. |
| S16 | `landscape-patch-result.png` | Flattened park on a slope, path cut through, pad under a bench. Result, not graph. |

**Checkpoint:** the four pages where a reader was most likely to give up now have their
picture.

---

## Step 4 — Orientation stills and the remaining clips

**Goal:** everything else on the list, in the order of the pages a new user reads.

1. **Getting started:** S2 `architect-mode.png` (AnnotatedShot, six callouts), S3
   first-building stack if the existing one is stale.
2. **Streets:** S5 network hero, S7 segment override, S10 Subdivide panel crop, then clips
   T2-a draw/edit and T2-b drag-absorb.
3. **Authoring:** S12 grid strip crop, clip T2-c multi-preset drag.
4. **Actors and production:** S4 wall result shot, S8 Boolean archway, S13/S14 re-check
   the existing baking and diagnostics shots.
5. **PCG:** S15 tutorial graph re-shot with `Sub-Lot Boundaries` visible, S17 alley result,
   S18 keep.

Claude places `AnnotatedShot` pin coordinates once each annotated still exists — they
cannot be guessed ahead of the capture.

**Checkpoint:** all 18 stills and 7 clips in, five TBD markers gone, July stills that were
replaced deleted from `static/img/screens/`.

If the session runs short, cut in this order: S8, T2-c, S12, S17.

---

## Step 5 — Close

1. `npm run typecheck && npm run build` — the config throws on any broken link or anchor.
2. `npm run serve`. Walk the site top to bottom once, as a reader, on the built output.
   Check every clip loops, every poster reads frozen, and nothing scrolls horizontally on
   a narrow window.
3. Update `CAPTURE-SHOTLIST.md` to record what was captured and what was cut, so the next
   docs pass starts from truth.
4. Mark [PR #4](https://github.com/faxlab/spline-architect-docs/pull/4) ready for review.
   The user reads it on the rendered site, not the diff.
5. Merge to `main`. **This does not publish** — the deploy is a separate manual
   `workflow_dispatch` with Deploy enabled, gated on Fab approval per
   faxlab/SplineArchitect#295.

---

## What comes after, and is not this plan

- The Fab cutover itself: GitHub Pages → Actions source, run the workflow with Deploy,
  verify search, redirects, and GA4 on the public URL. Tracked in #295.
- #292 listing copy, #293 gallery and trailer, #294 example project. The hero shot and
  the four Tier-1 clips are reusable for #293 — record them knowing that.
- #366 agent-facing docs. A fast follow, not a launch blocker.
