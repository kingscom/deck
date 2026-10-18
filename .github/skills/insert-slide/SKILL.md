---
name: insert-slide
description: "Insert a new Slidev slide at a requested page without replacing existing slides. Use for /insert-slide, adding a slide, inserting a page before or after another slide, 슬라이드 추가, 장표 삽입."
argument-hint: "Specify the insertion page or before/after position, and the content to add."
user-invocable: true
---
# Insert Slide

Add one new slide to the existing deck at the requested position. Do not regenerate the deck or replace an existing slide.
All project file paths below are relative to the workspace root, not this skill folder.

## Input and position
- Read `.github/copilot-instructions.md` first.
- Require an existing `content/slides.md`. If it is missing, explain that `/create-deck` must create a deck first; do not silently generate one.
- Resolve positions using the ordered `src` entries in `content/slides.md`, counting the cover as page 1. Resolve `src` paths relative to that entry, not the workspace root. Never infer a page number from its filename.
- For a deck with T pages, "insert at page N" or "N페이지에 삽입" means the new slide becomes page N and the previous page N and later pages move back. Valid insertion positions are 1 through T+1; T+1 appends.
- "Before page N" inserts at N. "After page N" inserts at N+1. These reference an existing page, so N must be between 1 and T. "At the end" appends at T+1.
- Preserve the cover as the first page by default. If inserting at page 1 would move it, ask whether the user intends to put a new slide before the cover or insert after it.
- If the position or content is missing, ambiguous, or out of range, ask one focused question at a time before changing files. If the user explicitly requests multiple slides, agree their positions and order before editing; otherwise add exactly one.
- Use supplied text or an explicit source section as the factual basis. If the user names a topic already supported by the current source, use that material. Never invent evidence, metrics, dates, owners, or causal claims.

## Workflow
1. Read `content/slides.md`, its cover, and the slides immediately before and after the insertion point, when present. Read the relevant parts of `content/source.txt` (or legacy `content/source.md` only if no snapshot exists), `content/storyline.md` if present, existing components, and styles.
2. Record the original ordered references and original contents of existing slides so validation can detect accidental edits.
3. Compose one source-supported message with a conclusion-style headline. Keep the headline continuous rather than forcing a two-line split; let long text wrap naturally and use two lines only when needed. Highlight one key word or concise phrase with `<span class="accent">...</span>` so the blue emphasis remains even on a one-line headline. Match the deck's language and visual system, use comfortable presentation text sizes, and reuse components only when their semantics fit.
4. Create a new, unique file under `content/slides/` without overwriting or renaming existing files. A filename such as `05-insert-topic.md` is acceptable even if its prefix later differs from its displayed page number; add a suffix if necessary to avoid collisions. Actual order always comes from `content/slides.md`.
5. Insert exactly one `src: ./slides/<new-file>.md` reference at the resolved position, in its own Slidev frontmatter block. Keep deck metadata, existing references, and their relative order intact. Do not create an empty slide. For insertion at the first position after explicit confirmation, preserve the deck-level frontmatter and replace only its first `src`, moving the old reference into the next slide block.
6. Preserve all existing slide files, images, shared components, global styles, and `global-bottom.vue`. Do not hardcode page numbers: the automatic `SlideCurrentNo` / `SlidesTotal` footer must update from the new order. If that footer is missing, report it and ask before expanding the change to shared tooling.
7. If the request supplies new source material, append it verbatim as an additional source section in local `content/source.txt`, preserving the earlier source. If only legacy `content/source.md` exists, copy its full text into `content/source.txt` before appending. If neither exists, create the snapshot from the supplied material. Do not replace an existing source record or record your own synthesis as source.
8. Update an existing `content/storyline.md` only to add this slide to the ordered plan and correct affected page references or counts. Insertion is authorization for this narrow plan update, not for a narrative rewrite. Do not create a storyline file merely for bookkeeping.
9. Keep all presentation data under the Git-ignored `content/` folder: source records, storylines, entry, slides, attached assets in `content/public/`, and exports in `content/dist/`. Reference public assets by URL such as `/image.png`. Never force-add presentation data. Copy user attachments without modifying the originals or overwriting existing assets.

## Validation and report
- Verify the page count increased by exactly one, the new reference appears exactly once at the requested position, every referenced file exists, and removing the new reference reproduces the original ordered references.
- Verify all pre-existing slide files are unchanged and the cover remains first unless the user explicitly approved otherwise.
- Run `npm run build` (use `npm.cmd run build` on Windows if PowerShell blocks `npm.ps1`) and fix errors caused by this insertion.
- When browser access is available, inspect the inserted slide and page numbering, including the updated last-page total. Check overflow, clipping, and footer overlap; report if visual validation could not be completed.
- Report the new slide's actual page number, new total, changed files, and validation result. Explain that later pages shifted; do not commit or push unless requested.
