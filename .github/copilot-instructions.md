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
Apply these PPT Visualization principles when creating, inserting, revising, redesigning, or reviewing slides. Choose the visual that communicates the core message fastest, not merely a way to arrange text.

### 1. Message before visualization
Define one core message first, then select its semantic relationship and visual:
- comparison: two-column comparison or Bar Chart
- change: BeforeAfter or Transition
- process/dependency: ProcessFlow, Chevron, or Step
- time/future phases: Timeline or Roadmap
- structure: Hierarchy, Layer, or Architecture
- relationships: Relationship Map or Network
- cause and effect: Cause → Effect
- classification: Matrix; use 2x2 only with two defensible dimensions
- numerical comparison: Bar / Column Chart
- trend: Line Chart
- composition/share: Stacked Bar / Donut
- key numbers: Big Number + Supporting Evidence
- ordered capability progression: MaturityFlow
- sequence plus actors: Swimlane
- genuinely parallel foundations: Pillars/Cards, not a default layout
These are visual patterns, not guaranteed component names. Reuse existing components when semantics fit; otherwise use local markup. Never invent relationships, causal links, values, or evidence to make a visual work.

### 2. Diagram First
When the source supports relationships, flow, or structure, prefer a diagram even if prose could explain it. A row of boxes containing descriptions is not visualization. For example, show a supported problem → cause → direction of change → expected outcome as a connected structure rather than four disconnected text boxes. Do not force a diagram when no relationship is supported.

### 3. Visual hierarchy
Make importance immediately visible in this order: core message / key number, major structure and relationships, supporting evidence and explanation, then supplementary information. Use size, position, weight, whitespace, and restrained color emphasis; do not give all information equal visual weight.

### 4. Layout by meaning
Do not mechanically repeat card layouts. Choose left-to-right for change, flow, or causality; top-to-bottom for hierarchy or progressive detail; center-to-outside for a core concept and its components; two columns for comparison or As-Is / To-Be; three columns for three genuine axes; a Matrix for classification by two criteria; Full Visual for processes, Architecture, or Roadmap; and Chart + Insight for data and interpretation.

### 5. Make numbers visible
Do not bury a message-relevant number in a sentence. Show the key value prominently, with a short meaning label and supporting evidence. For example, a supplied claim that 72% of participants use AI can become a large 72% with an AI-use label and supporting text. This example is not deck data: use only source-supported values, retain units, denominators, scope, and qualifications, and do not turn incidental numbers into KPIs.

### 6. Chart selection and insight
Use a chart only when it serves the message, not merely because data exists:
- comparison: Bar; numerical comparison may also use Column
- change over time: Line
- composition/share: Stacked Bar / Donut, only with a valid whole and supported shares
- comparison across many categories: Horizontal Bar
- exact values matter: Table
- one to three key numbers: KPI / Big Number
Avoid unnecessary 3D charts, excessive legends, gridlines, and decoration. Every chart must include a concise, source-supported "So What?" insight in its headline or nearby annotation; label recommendations or synthesis and never imply unsupported causality.

### 7. Meaningful emphasis
Focus accent color on one or two key elements per slide, including the required headline emphasis. Use Neutral for basic information, Accent for core information, and Light / Muted for supporting information. Do not color every element; color conveys meaning rather than decoration.

### 8. Explicit connections
Do not merely line up boxes in a process or relationship visual. Use arrows, lines, grouping, position, and size to make the supported relationship immediately clear: sequence, containment, influence, Input / Output, branching, or Feedback Loop. Distinguish different connection meanings rather than implying every link is causal.

### 9. Whitespace and grouping
Do not fill empty space for its own sake. Prioritize readability over information volume. Keep related elements close and separate elements with different meanings. Compress explanation before reducing comfortable presentation text size.

### 10. Final visualization check
After creating or changing each slide, and when reviewing a deck, check:
- Is the core message visible within three seconds?
- Do the headline and visual tell the same story?
- Is the structure understandable without reading explanatory prose?
- Are there unnecessary boxes?
- Is the most important information immediately apparent?
- Are supported relationships and flows expressed visually?
- Has the deck avoided mechanically repeating the same card layout?
Where possible, reduce explanation and communicate through structure, position, size, connectors, and charts. For covers or slides without a supported relationship, assess hierarchy and message clarity without inventing a diagram.

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
