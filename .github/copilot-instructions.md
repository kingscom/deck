# Copilot Instructions — Presentation Studio

This repository is a Slidev-based presentation system. Treat presentation work as narrative design first and HTML/Vue rendering second.

## Source of truth
- Source text supplied with `/create-deck` in chat is the original user material. Do not require a Markdown file or attachment. If no source text is supplied, ask for it before generating or overwriting a deck; do not silently reuse an earlier source.
- `content/source.txt`: automatic verbatim record of the source text for the current deck. Save it when creating a deck; users do not need to prepare this file. Keep presentation requirements separate from source facts. Never invent facts, metrics, owners, dates, evidence, or causal claims not supported by the source.
- `content/source.md`: legacy source for existing decks only when `content/source.txt` does not exist. Do not use it as a fallback input for a new `/create-deck` invocation or combine it with new source text.
- `content/storyline.md`: current narrative plan. Update only when the user requests storyline/deck-level changes.
- `slides.md`: presentation entry point. Each slide must include `src: ./slides/NN-name.md` and page content must live in the referenced file.
- `slides/*.md`: one file per slide. For a slide-specific revision, modify only that slide unless a shared component must change.
- `components/*.vue`: reusable visual patterns.
- `styles/index.css`: global design system. Do not modify for a local slide request.

## Narrative rules
1. One slide = one message.
2. Use conclusion-style headlines, not section labels.
3. Compress aggressively; do not paste source paragraphs onto slides.
4. Adapt the narrative, slide count, and visual patterns to the supplied content and requested duration. Prefer 5–12 slides unless the source requires otherwise; never pad sparse material or reuse a previous deck's storyline by default.
5. Preserve the author's intent and terminology.
6. Separate fact from synthesis. Label assumptions/recommendations when needed.
7. Never fabricate quantitative data.

## Visual selection
Choose by semantic relationship:
- sequence/dependency → ProcessFlow
- ordered capability progression → MaturityFlow
- current vs target → BeforeAfter
- future phases → Roadmap
- time/order → Timeline
- two comparable sides → Comparison
- two defensible dimensions → Matrix2x2
- components/interfaces → Architecture
- sequence plus actors → Swimlane
- parallel foundations → Pillars/Cards
- verified metrics → KPI / chart
Do not force a diagram when the source does not support a relationship.

## Design rules
- 16:9 presentation canvas.
- Minimal editorial business style.
- Strong typography, generous whitespace, restrained accent color.
- Maximum 3 major content zones per slide.
- Avoid decorative gradients, stock imagery, excessive icons, glassmorphism, heavy shadows, and repeated three-card layouts.
- Do not reduce text below comfortable presentation size to fit. Split or compress instead.
- Korean content is first-class; preserve Korean wording and avoid awkward English translation unless requested.

## Revision safety
When asked to revise slide N:
1. Locate the Nth `src` entry in `slides.md`.
2. Modify only that `slides/NN-*.md` file by default.
3. Do not modify other slides, `storyline.md`, global CSS, or shared components unless explicitly required.
4. Preserve factual meaning unless the user asks to change content.
5. After revision, briefly state exactly which file changed.

## Build validation
After material changes, run `npm run build` when possible. For PDF export use `npm run export`.
