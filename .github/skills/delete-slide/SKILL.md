---
name: delete-slide
description: "Remove requested pages from a Slidev deck while preserving other slides. Use for /delete-slide, deleting a specific page, removing slides, 특정 페이지 삭제, 슬라이드 삭제, 장표 삭제."
argument-hint: "Specify the page number, page numbers, or range to remove."
user-invocable: true
---
# Delete Slide

Remove only the requested pages from the presentation, not the entire deck.
All project file paths below are relative to the workspace root, not this skill folder.

## Input and safety
- Read `.github/copilot-instructions.md` and require an existing `content/slides.md`. If it is missing, report that there is no deck to edit; do not create one.
- Resolve page numbers from the ordered `src` entries in `content/slides.md`, counting the cover as page 1 and resolving file paths relative to the entry. Never infer positions from filenames or the selected editor file.
- Accept one page, an explicit list, or an explicit inclusive range. Interpret all requested numbers against the same original deck order, deduplicate them, and validate every number before editing. Do not delete sequentially against shifting page numbers.
- If a target is missing, ambiguous, not an integer, or outside 1 through the original total, ask one focused question before changing anything. A topic-based request must identify a unique page; otherwise ask which page.
- Before removing the cover, ask for confirmation and explain that the next page will become the first page. Do not invent a replacement cover.
- Do not remove every page or the sole remaining page. Ask which page to retain; do not leave an empty or unbuildable entry.
- Decide how to treat each removed slide's Markdown file. Removing the `src` reference is always required; the file itself is either retained or deleted:
  - **Delete file**: the request says to delete the file too (for example "파일도 삭제", "완전 삭제", "permanently", "delete the file").
  - **Retain file**: the request says to keep, archive, or exclude only (for example "발표에서만 제외", "복구 가능하게").
  - If the request does not say which, ask one focused question with both options before editing. Explain that `content/` is Git-ignored, so a deleted slide file cannot be restored from Git.
  - Retaining the file is the safe default only when the user declines to answer.

## Workflow
1. Read the target slides, adjacent slides, and `content/storyline.md` if present. Record the original ordered references, entry metadata, and file contents or hashes for preservation checks.
2. Remove exactly the selected slide blocks from `content/slides.md`, including their slide-specific frontmatter so no empty page remains. Keep all other references and their relative order unchanged.
3. Preserve deck-level frontmatter, including title, theme, canvas settings, and `addons: ['@/..']`. If the first page is removed after confirmation, retain this metadata and promote the next surviving page's `src` and slide-specific overrides into the first page without retaining the removed page's local overrides. Ask if conflicting or ambiguous frontmatter prevents a safe merge.
4. Handle slide files according to the chosen mode. If retaining, leave them untouched. If deleting, process only after the `src` references are removed:
   - Resolve each target to one exact, existing `.md` file directly under `content/slides/`; reject any path outside that folder, any wildcard, and any directory.
   - Verify no surviving `src` entry, other slide, or shared tooling references it. If it is still referenced, retain it and explain why.
   - Delete each approved file individually (for example `Remove-Item -LiteralPath <exact path>`), never with recursive or pattern-based commands.
   - Never delete `content/public/` assets, `content/source.txt`, `content/source.md`, directories, or any other file as cleanup, even if the slide used them. Mention assets that are now unused instead of removing them.
5. Renumber surviving file names so every referenced slide file's `NN-` prefix equals its new page number (zero-padded; see "Slide file numbering" in `.github/copilot-instructions.md`). Only files after the first removed page change (their numbers go down); earlier files keep their names. Keep each slug and each file's content unchanged. Rename in two phases (to temporary names, then to final names) so names never collide, then update every `src` reference in `content/slides.md` and the file-name column of `content/storyline.md`. Do this after the retain/delete decision in step 4 has been applied. Files retained from removed pages are not renumbered; if a renumbered name would collide with one, prefix the retained file with `removed-` instead of overwriting it.
6. Update an existing `content/storyline.md` only to remove the selected plan entries and correct affected page references, file names, or totals. Do not rewrite the narrative or create a tracking document. Preserve `content/source.txt` and `content/source.md` unchanged: removing a page does not authorize deleting its source.
7. Do not rewrite or restyle surviving slide contents. Preserve shared components, global styles, images, and `global-bottom.vue`. Page numbers and the total must update automatically through `SlideCurrentNo` / `SlidesTotal`, not hardcoded values.
8. If surviving slides contain explicit links to removed pages or hardcoded page references that would become incorrect, report the affected locations and ask before expanding the edit. Do not silently retarget them or claim navigation is fully validated while unresolved.
9. Keep all presentation data local under the Git-ignored `content/` folder. Do not force-add data, commit, push, or regenerate PDF/PPTX unless requested.

## Validation and report
- Verify the new reference count equals the original count minus the number of distinct selected pages. Verify the surviving reference list equals the original list with exactly those positions removed (compare slugs; prefixes have been renumbered).
- Verify every surviving file's `NN-` prefix equals its page number, no temporary names remain, and `content/storyline.md` file names match `content/slides.md`.
- Check every surviving reference resolves to an existing file, no unintended empty page was introduced, and deck metadata and surviving slide contents are preserved (compare content hashes, ignoring renamed paths).
- Verify source records are unchanged. In retain mode, verify the removed slide files' contents are unchanged. In delete mode, verify exactly the approved files no longer exist, that nothing else was deleted, and that surviving files' contents are unchanged.
- Run `npm run build` (use `npm.cmd run build` on Windows if PowerShell blocks `npm.ps1`) and fix errors caused by the removal without unrelated changes.
- When browser access is available, check the deletion boundary and the updated last-page total. State explicitly if visual checks could not be completed.
- Report removed original page numbers and titles, the new total, later-page shifts, the renamed files (old → new), changed files, whether Markdown files were retained or deleted (list deleted file paths, and note they cannot be restored from Git), unused assets left in place, and validation results. Mention that existing PDF/PPTX exports have not been regenerated.
