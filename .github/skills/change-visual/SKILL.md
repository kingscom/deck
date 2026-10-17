---
name: change-visual
description: "Change one Slidev slide's visual pattern without changing its factual message. Use for /change-visual, redesigning a slide layout, changing a diagram, or improving visual hierarchy."
argument-hint: "Specify the slide number and desired visual change."
user-invocable: true
---
# Change Visual

All project file paths below are relative to the workspace root, not this skill folder.
Read `.github/copilot-instructions.md` and locate the requested slide using the ordered `src` entries in `content/slides.md`, resolving paths relative to that entry. Slide files live in `content/slides/`, and presentation assets in `content/public/` use URLs such as `/image.png`. If the target slide or visual request is missing or ambiguous, ask one focused question before editing.
Change only the requested slide's visual treatment.
Preserve its headline, factual meaning, and source-supported content unless the user explicitly requests copy changes.
Choose a visual pattern based on semantic relation, not decoration.
Prefer an existing component in `components/`; use local markup when none fits.
Do not modify other slides or global styles.
Run `npm run build` (use `npm.cmd run build` on Windows if PowerShell blocks `npm.ps1`) and report the changed file.
