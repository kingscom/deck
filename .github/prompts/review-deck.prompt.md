---
agent: agent
description: Review the whole deck for narrative, density, consistency, and rendering issues.
---
Review `content/source.txt` (the source text automatically recorded from chat), `content/storyline.md`, `slides.md`, and all referenced slide files. For an existing deck without `content/source.txt`, use legacy `content/source.md` instead; do not combine the two. If neither source record exists, ask the user to paste the original text before assessing factual support.
Check:
- storyline continuity
- one-message-per-slide discipline
- unsupported claims
- repeated layouts
- excessive text density
- weak headline hierarchy
- inconsistent terminology
- visual pattern misuse
- overflow or build errors

First provide a concise issue list by slide number. Do not rewrite slides until the user approves, unless the user explicitly asked to fix them.
