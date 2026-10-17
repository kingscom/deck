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
- Find the slide file from the ordered `src` entries in `slides.md`.
- Modify only that slide file unless the user explicitly asks for a global change.
- Do not alter facts or add unsupported evidence.
- Do not edit global CSS or shared components merely to solve one slide.
- You may change the local composition, visual pattern, copy density, and hierarchy.
- Keep one dominant message.
- Run `npm run build` after the change (use `npm.cmd run build` on Windows if PowerShell blocks `npm.ps1`).
- Report the changed file path.
