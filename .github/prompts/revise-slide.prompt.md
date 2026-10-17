---
agent: agent
description: Revise only a requested slide while preserving the rest of the deck.
---
Revise the slide number and change requested by the user.

Hard rules:
- Find the slide file from the ordered `src` entries in `slides.md`.
- Modify only that slide file unless the user explicitly asks for a global change.
- Do not alter facts or add unsupported evidence.
- Do not edit global CSS or shared components merely to solve one slide.
- You may change the local composition, visual pattern, copy density, and hierarchy.
- Keep one dominant message.
- Run `npm run build` after the change.
- Report the changed file path.
