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
Preserve its headline, factual meaning, and source-supported content unless the user explicitly requests copy changes. Keep one key word or concise phrase in the headline highlighted with `<span class="accent">...</span>`; do not lose the blue emphasis when changing the visual treatment.
Apply all ten PPT Visualization principles in the `Visual selection` section of `.github/copilot-instructions.md`. Identify the preserved core message before selecting its visual and layout. Use Diagram First for supported relationships, flow, or structure with explicit connections, not disconnected text boxes. Establish hierarchy and whitespace, expose existing message-relevant numbers, and focus accent color on one or two key elements including the headline phrase. Choose charts by analytical purpose and retain or surface a source-supported "So What?" insight without adding claims or changing copy beyond the user's authorization.
Prefer an existing component in `components/`; use local markup when none fits.
Do not modify other slides or global styles.
Run the common seven-question final visualization check. Compare neighboring layouts for mechanical card repetition without editing them; never invent relationships or data for visual variety.
Run `npm run build` (use `npm.cmd run build` on Windows if PowerShell blocks `npm.ps1`) and report the changed file.
