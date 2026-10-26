---
name: revise-slide
description: "Revise one Slidev slide while preserving the rest of the deck. Use for /revise-slide, editing a specific slide, shortening slide copy, or adjusting one page's composition."
argument-hint: "Specify the slide number and requested change."
user-invocable: true
---
# Revise Slide

Revise the slide number and change requested by the user.
All project file paths below are relative to the workspace root, not this skill folder.
Read `.github/copilot-instructions.md` before editing. If the slide number or requested change is missing or ambiguous, ask one focused question before changing files.

Hard rules:
- Find the slide file from the ordered `src` entries in `content/slides.md`, resolving paths relative to that entry. Slide files live in `content/slides/`; copied attachments go in `content/public/` and use URLs such as `/image.png`.
- Modify only that slide file unless the user explicitly asks for a global change.
- Do not alter facts or add unsupported evidence.
- Do not edit global CSS or shared components merely to solve one slide.
- You may change the local composition, visual pattern, copy density, and hierarchy.
- Keep one dominant message.
- Apply all ten PPT Visualization principles in the `Visual selection` section of `.github/copilot-instructions.md`: message before visual, Diagram First for supported relationships, explicit connections, meaningful layout variety, hierarchy, whitespace, prominent message-relevant numbers, purpose-driven charts with a source-supported "So What?", and accent color focused on one or two key elements including the headline phrase. Disconnected text boxes are not visualization; do not invent facts or relationships to fit a layout.
- Keep the governing headline as a continuous sentence; avoid manual line breaks unless its length genuinely requires two lines, and prefer natural wrapping.
- Keep one key word or concise phrase in the governing headline highlighted with `<span class="accent">...</span>`; do not remove the blue emphasis when simplifying or reflowing the headline.
- Run `npm run build` after the change (use `npm.cmd run build` on Windows if PowerShell blocks `npm.ps1`).
- Run the common seven-question final visualization check on the revised slide; check neighboring layout repetition without changing other slides.
- Report the changed file path.
