# Copilot Instructions — Presentation Studio

This repository is a Slidev-based presentation system. Treat presentation work as narrative design first and HTML/Vue rendering second.

## Source of truth
- Source text supplied with `/create-deck` in chat is the original user material. Do not require a Markdown file or attachment. If no source text is supplied, ask for it before generating or overwriting a deck; do not silently reuse an earlier source.
- `content/source.txt`: automatic verbatim record of the source text for the current deck. Save it when creating a deck; users do not need to prepare this file. Keep presentation requirements separate from source facts. Never invent facts, metrics, owners, dates, evidence, or causal claims not supported by the source.
- `content/source.md`: legacy source for existing decks only when `content/source.txt` does not exist. Do not use it as a fallback input for a new `/create-deck` invocation or combine it with new source text.
- `content/storyline.md`: current narrative plan. Update only when the user requests storyline/deck-level changes.
- `content/slides.md`: presentation entry point. Each slide must include `src: ./slides/NN-name.md` relative to this entry and page content must live in the referenced file. Set `addons: ['@/..']` in deck headmatter to load shared components, styles, and global overlays from the workspace root. Slidev's `@/` anchors this path to the entry folder.
- `content/slides/*.md`: one file per slide. For a slide-specific revision, modify only that slide unless a shared component must change.
- `components/*.vue`: reusable visual patterns.
- `styles/index.css`: global design system. Do not modify for a local slide request.

## Local presentation data
- Keep all presentation data under the Git-ignored `content/` folder: source records, storylines, `content/slides.md`, `content/slides/`, `content/public/`, and `content/dist/`. Do not recreate presentation data folders at the workspace root.
- Store presentation-specific assets in `content/public/` and exports in `content/dist/`. Public assets are referenced by URL (for example `/image.png`), not by filesystem location. Shared tooling stays at the workspace root. Do not embed source material or deck-specific assets in tracked skills, shared components, styles, or documentation.
- Do not force-add ignored presentation data or remove its ignore rules. Commit shared presentation tooling only, unless the user explicitly changes this policy.

## Narrative rules
1. One slide = one message.
2. Use conclusion-style headlines, not section labels. Write each headline as a continuous sentence; do not insert a manual line break just to force a two-line layout. Let long headlines wrap naturally, and use two lines only when the text needs the extra space. In every governing headline, emphasize one key word or concise phrase with `<span class="accent">...</span>` so the deck's blue accent remains visible; do not rely on a line break for emphasis or color only punctuation.
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
- Every new deck starts with a dedicated cover containing a source-supported title and concise subtitle. Do not invent presenter, organization, or date metadata.
- Every slide, including the cover, shows an automatic bottom-right `current / total` page number starting at 1. Use the root `global-bottom.vue` with Slidev's `SlideCurrentNo` and `SlidesTotal`; never hardcode numbers in slide files. Keep footer space clear and preserve numbering during revisions.
- Minimal editorial business style.
- Strong typography, generous whitespace, restrained accent color.
- Maximum 3 major content zones per slide.
- Avoid decorative gradients, stock imagery, excessive icons, glassmorphism, heavy shadows, and repeated three-card layouts.
- Do not reduce text below comfortable presentation size to fit. Split or compress instead.
- Korean content is first-class; preserve Korean wording and avoid awkward English translation unless requested.

## Revision safety
When asked to revise slide N:
1. Locate the Nth `src` entry in `content/slides.md`.
2. Modify only that `content/slides/NN-*.md` file by default.
3. Do not modify other slides, `storyline.md`, global CSS, or shared components unless explicitly required.
4. Preserve factual meaning unless the user asks to change content.
5. After revision, briefly state exactly which file changed.

## Slide insertion
- Use `/insert-slide` to add a page without replacing an existing slide. Count positions from ordered `src` entries in `content/slides.md`, including the cover as page 1.
- "Insert at page N" makes the new slide page N and shifts later pages back; "after page N" inserts at N+1. Ask before moving the cover away from the first position.
- Add a unique slide file and its `src` reference; preserve existing slide files, filenames, relative order, metadata, and shared styles. Automatic page numbering must follow the new order.
- A slide insertion permits a narrow update of the existing storyline's order/count and appending newly supplied material to the local source snapshot, not a deck-wide rewrite.

## Slide deletion
- Use `/delete-slide` to remove requested pages using the original ordered `src` entries in `content/slides.md`, including the cover as page 1.
- Remove only selected references and their slide blocks; preserve metadata and the surviving order. Confirm cover removal and never leave an empty deck.
- Retain removed slide files locally unless physical file deletion was explicitly requested. Never delete shared assets or source records as a side effect.
- A page deletion permits a narrow update of the existing storyline's order/count, not rewriting surviving slides. Automatic page numbering follows the surviving order.

## Build validation
After material changes, run `npm run build` when possible. For PDF export use `npm run export`.
