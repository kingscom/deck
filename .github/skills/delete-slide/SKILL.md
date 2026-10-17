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
- By default, "delete page" means remove its reference from the deck while retaining its Markdown file locally for recovery. Explain this distinction in the result. Only delete the physical slide file if the user explicitly requests that as well.

## Workflow
1. Read the target slides, adjacent slides, and `content/storyline.md` if present. Record the original ordered references, entry metadata, and file contents or hashes for preservation checks.
2. Remove exactly the selected slide blocks from `content/slides.md`, including their slide-specific frontmatter so no empty page remains. Keep all other references and their relative order unchanged.
3. Preserve deck-level frontmatter, including title, theme, canvas settings, and `addons: ['@/..']`. If the first page is removed after confirmation, retain this metadata and promote the next surviving page's `src` and slide-specific overrides into the first page without retaining the removed page's local overrides. Ask if conflicting or ambiguous frontmatter prevents a safe merge.
4. Preserve all slide files by default. If physical deletion was explicitly requested, resolve each target to an exact existing file under `content/slides/` and verify no surviving slide, entry, or shared tooling references it before deleting it. If shared, retain the file and explain why. Never delete assets, directories, or unrequested files as cleanup.
5. Update an existing `content/storyline.md` only to remove the selected plan entries and correct affected page references or totals. Do not rewrite the narrative or create a tracking document. Preserve `content/source.txt` and `content/source.md` unchanged: removing a page does not authorize deleting its source.
6. Do not rename, renumber, rewrite, or restyle surviving slide files. Preserve shared components, global styles, images, and `global-bottom.vue`. Page numbers and the total must update automatically through `SlideCurrentNo` / `SlidesTotal`, not hardcoded values.
7. If surviving slides contain explicit links to removed pages or hardcoded page references that would become incorrect, report the affected locations and ask before expanding the edit. Do not silently retarget them or claim navigation is fully validated while unresolved.
8. Keep all presentation data local under the Git-ignored `content/` folder. Do not force-add data, commit, push, or regenerate PDF/PPTX unless requested.

## Validation and report
- Verify the new reference count equals the original count minus the number of distinct selected pages. Verify the surviving reference list equals the original list with exactly those positions removed.
- Check every surviving reference resolves to an existing file, no unintended empty page was introduced, and deck metadata and surviving slide contents are preserved.
- Verify source records and retained removed-slide files are unchanged. If file deletion was requested, verify only approved, unreferenced files were deleted.
- Run `npm run build` (use `npm.cmd run build` on Windows if PowerShell blocks `npm.ps1`) and fix errors caused by the removal without unrelated changes.
- When browser access is available, check the deletion boundary and the updated last-page total. State explicitly if visual checks could not be completed.
- Report removed original page numbers and titles, the new total, later-page shifts, changed files, whether Markdown files were retained or deleted, and validation results. Mention that existing PDF/PPTX exports have not been regenerated.
