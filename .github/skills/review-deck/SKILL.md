---
name: review-deck
description: "Review a Slidev presentation for narrative, density, source fidelity, consistency, and rendering issues. Use for /review-deck, reviewing a deck, checking unsupported claims, or auditing slide quality."
argument-hint: "Optionally specify review priorities or explicitly request fixes."
user-invocable: true
---
# Review Deck

All project file paths below are relative to the workspace root, not this skill folder.
Read `.github/copilot-instructions.md` before reviewing.
Apply all ten PPT Visualization principles in its `Visual selection` section and run its seven-question final visualization check on every slide. Assess message-first visual choice, Diagram First for supported relationships, explicit connections, hierarchy, meaningful layout variety, prominent message-relevant numbers, purpose-driven chart selection, a source-supported "So What?" for every chart, accent color focused on one or two key elements including the headline phrase, and purposeful whitespace. Flag disconnected text-box rows masquerading as diagrams, unsupported causal links or data, and missing source qualifications. Do not demand a diagram when the source supports no relationship.
Review `content/source.txt` (the source text automatically recorded from chat), `content/storyline.md`, `content/slides.md`, and all referenced files in `content/slides/`, resolving `src` paths relative to the entry. Assets live in `content/public/`, outputs in `content/dist/`. For an existing deck without `content/source.txt`, use legacy `content/source.md` instead; do not combine the two. If neither source record exists, ask the user to paste the original text before assessing factual support.
Check:
- storyline continuity
- one-message-per-slide discipline
- unsupported claims
- repeated layouts
- excessive text density
- weak headline hierarchy
- missing blue accent emphasis on the key phrase in governing headlines
- inconsistent terminology
- visual pattern misuse
- overflow or build errors

First provide a concise issue list by slide number. Do not rewrite slides until the user approves, unless the user explicitly asked to fix them.
