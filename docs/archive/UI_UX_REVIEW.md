# UI/UX review: Systems Engineering Portfolio

**Reviewer context**: Senior UI/UX review for a junior engineering job application portfolio. Analysis is based on full source inspection of all Astro components, CSS, content files, built HTML output, design tokens, and the original PORTFOLIO_PLAN.md. No browser rendering was available during this review; all visual assessments are derived from CSS property analysis and HTML structure in the compiled build.

---

## Strengths worth preserving

1. **Semantic HTML and accessibility**: Every section uses `aria-labelledby`, the header has `role="status"` for the availability pill, the domain filter implements proper `role="tablist"` with arrow-key roving focus, and a working skip-link is in place. The `prefers-reduced-motion` handling in both the CSS reset and the unscramble script is solid.

2. **Content collection architecture**: Typed Zod schemas for both projects and logs, `glob` loaders, and a clean separation between data (`competencies.ts`), content markdown, and presentation components. Adding or removing projects requires only a new markdown file.

3. **Zero-JS default with targeted hydration**: The only runtime JavaScript is the telemetry clock, unscramble hover effect, domain filter, and code-copy buttons. Everything else is static HTML. The build produces 3 pages in 6.6 seconds with a total CSS bundle under 24 KB.

4. **Design token discipline**: A single `tokens.css` file defines the full palette, type scale, spacing scale, radii, and motion curves. No magic numbers leak into component styles.

5. **Domain-coded color system**: Projects and competency columns use a consistent blue/emerald/amber triad mapped to data/software/AI. This makes cross-referencing between the Skills section and Project Cards intuitive.

6. **Engineering Log pages**: The `[slug].astro` route delivers clean long-form reading with proper code-copy functionality, breadcrumb navigation, and article-level JSON-LD. The prose typography (44rem max width, 1.7 line-height) is well-tuned.

---

## Problems: prioritized findings

### P0: Insufficient vertical breathing room between sections

**Where**: [index.astro](src/pages/index.astro) `.page-content`, `.section-block`, `.section-header`

The page uses `gap: var(--space-10)` (2.5rem, 40px) between the Hero, Work, Competencies, and Logs sections. For a single-page portfolio where recruiters scroll through four major content zones, 40px of separation is not enough to signal "new section." The sections visually bleed into each other because the `section-header` bottom border (a 1px hairline at 8% opacity) is the only separator, and `margin-bottom: var(--space-4)` (16px) below it compresses the header against its own content.

**Evidence**: `--space-10` is not even defined in `tokens.css`. The scale jumps from `--space-8` (2rem) to `--space-12` (3rem). CSS will treat the undefined custom property as invalid, meaning `gap` may fall back to 0 or the browser default, depending on rendering. This is either a latent bug (if the variable resolves to nothing) or a fragile behavior.

**Impact**: The entire page feels like a continuous wall of text and cards rather than discrete scannable sections.

---

### P0: Hero section lacks visual weight and vertical space

**Where**: [Hero.astro](src/components/Hero.astro) `.hero-section`

The hero has `padding-top: var(--space-6)` (24px) and `padding-bottom: var(--space-6)` (24px), with internal elements separated by `gap: var(--space-4)` (16px). For the single most important first impression of the portfolio, this feels tightly stacked. The name ("Dimas") renders at `--text-3xl` (32px, or 40px on desktop), which is reasonable, but the subline immediately below it at 18-20px and the bio paragraph at 16px create a monotonous type ramp with no visual pause.

The three pillar tags (Data Engineering, Software Engineering, AI / ML Systems) use `--text-xs` (12px) and sit only `--space-1` (4px) above the bio paragraph. Recruiters scanning the page see a block of text that is uniformly small, with the name as the only anchor.

**Evidence**: The hero-badge role indicator ("Informatics Graduate . Systems Focus") at 12px sits above the name. Reading order goes: tiny role badge, name, subline, tiny pillar tags, paragraph, buttons. There is no moment of visual rest between the identity block and the positioning copy.

---

### P0: Project cards are internally crowded

**Where**: [ProjectCard.astro](src/components/ProjectCard.astro) `.project-card`

Each project card contains six distinct information zones stacked with only `gap: var(--space-4)` (16px):

1. Meta row (domain badge + context tag + year)
2. Title (18px, semibold)
3. Summary paragraph (14px)
4. Metrics grid (with its own nested background and border)
5. Tech stack chips
6. Architecture accordion toggle
7. Footer with links

That's seven content blocks inside a card with `padding: var(--space-5)` (1.25rem, 20px). On a 768px-wide container, three of these cards stack vertically with `gap: var(--space-5)` (20px) between them. The visual density is high enough that the summary paragraphs, metrics, and tech chips blur together.

The metrics grid deserves particular attention: its labels use `font-size: 0.65rem` (10.4px), which is below WCAG's practical readability threshold for body content. The metric values beside them use `--text-xs` (12px). The result is a micro-text block embedded inside an already dense card.

---

### P1: Technical Matrix section is text-heavy and hard to scan

**Where**: [TechnicalMatrix.astro](src/components/TechnicalMatrix.astro), [competencies.ts](src/data/competencies.ts)

Each competency column lists 5 skills. Each skill has a name (monospace, 12px) and a context paragraph (12px, secondary color). That is 10 lines of 12px text per column, across 3 columns, totaling roughly 30 micro-text items in a single viewport on desktop.

The context descriptions are useful for demonstrating depth, but their uniform presentation creates a "spreadsheet" feel. Nothing visually distinguishes a skill name from its context at a glance because both are `--text-xs`, both are monospace, and the only difference is color (primary vs secondary).

Additionally, the column dividers between header and skill list use `padding-bottom: var(--space-4)` and `margin-bottom: var(--space-4)`, which is adequate, but the individual skill items are separated by 1px dashed borders with only `gap: var(--space-3)` (12px). The items feel stacked on top of each other.

---

### P1: "Download CV (Pending)" disabled button is a negative first impression

**Where**: [Hero.astro](src/components/Hero.astro), lines 67-78

The hero section prominently displays a disabled "Download CV (Pending)" button with a dashed border and muted text. This immediately communicates incompleteness to a recruiter. It is the second most prominent interactive element on the page.

The TASKS.md entry confirms the resume file is pending owner upload. Until the file exists, displaying an explicitly disabled download button hurts credibility. A recruiter does not need to know about internal upload status.

---

### P1: Section headings compete with content rather than guiding the eye

**Where**: [index.astro](src/pages/index.astro) `.section-title`

Section headings ("01 // Selected Systems & Architecture", "02 // Technical Competency Matrix", "03 // Engineering Logs & Case Studies") render at `--text-sm` (14px), uppercase, monospace. This matches the terminal aesthetic, but at 14px uppercase these headings are barely larger than the 12px filter tabs and metadata below them. On a text-dense page, the heading gets lost.

The secondary label on the right side of the header ("Index / 03", "Core Domains & Context", "Technical Writeups") adds cognitive load without helping navigation. A recruiter needs to immediately understand what each section contains; the current labels read like internal UI development notes.

---

### P1: Missing `--space-5` and `--space-10` token definitions

**Where**: [tokens.css](src/styles/tokens.css)

The spacing scale defines 1, 2, 3, 4, 6, 8, 12, and 16. However, components reference `--space-5` (used in `.project-card`, `.matrix-column`, `.log-card`, and `--space-10` (used in `.page-content gap`). Neither is defined in tokens.css. CSS custom properties that reference undefined values resolve to `initial`, which means `gap: initial` is effectively `gap: normal` (0 for flexbox). 

This creates an unpredictable layout that may appear intentionally cramped or may silently break across browsers.

---

### P2: Google Fonts dependency adds blocking render time

**Where**: [BaseLayout.astro](src/layouts/BaseLayout.astro), lines 57-62

The layout loads Inter (3 weights) and JetBrains Mono (3 weights) via Google Fonts with `display=swap`. This adds two DNS lookups (`fonts.googleapis.com`, `fonts.gstatic.com`) and a render-blocking stylesheet request. On cold loads or slow connections, the site will flash system fonts before custom fonts load.

For a portfolio targeting 98+ Lighthouse performance, this is the primary performance bottleneck. The plan document (section 4) claims "self-hosted or system fonts," but the implementation uses Google Fonts externally.

---

### P2: Social links point to placeholder URLs

**Where**: [SiteHeader.astro](src/components/SiteHeader.astro), lines 13-14; [TelemetryFooter.astro](src/components/TelemetryFooter.astro), line 10

- GitHub URL defaults to `https://github.com/` (the GitHub homepage, not a profile)
- LinkedIn URL defaults to `https://linkedin.com/` (the LinkedIn homepage, not a profile)
- Email defaults to `hello@example.com`

Clicking these links takes a recruiter to generic homepages. This is worse than having no links at all because it appears functional but delivers nothing.

---

### P2: All project links say "Academic Research Work" (no repositories linked)

**Where**: All three project markdown files in `src/content/projects/`

Every project card footer renders `<span class="project-link-disabled">Academic Research Work</span>` because no `githubUrl` is set. None of the three projects link to a code repository or any external artifact. For a portfolio whose entire purpose is to demonstrate engineering capability, having zero clickable proof-of-work is a significant credibility gap.

---

### P2: Footer telemetry section overloads with meta information

**Where**: [TelemetryFooter.astro](src/components/TelemetryFooter.astro)

The footer contains four telemetry blocks (location/clock, current focus, system colophon, direct communication) plus a bottom bar with copyright and an "HTTP 200 OK" indicator. The "HTTP 200 OK" badge with a green dot is a fun detail, but recruiters will not understand it as anything other than decoration. The "Zero-JS Core" label is technically inaccurate since the page does include JavaScript for the clock, unscramble effect, filter, and code-copy. The "Astro Static" and `rev.2026.10` labels take up space without helping the visitor.

The footer currently occupies roughly 200px of vertical space on desktop. For a junior portfolio, this real estate could be simplified.

---

### P2: Engineering Log cards duplicate information

**Where**: [EngineeringLogs.astro](src/components/EngineeringLogs.astro)

Each log card shows: category, date, read time, title, description, tag chips, and a "Read Full Article" link. The description field (from frontmatter) is often a restatement of the title. For example:

- Title: "Statistical vs Neural Topic Modeling for Researcher Recommendation"
- Description: "An engineering comparison of LDA, NMF, and BERTopic applied to academic publication abstracts..."

These two are close enough that showing both inside a compact card wastes vertical space. The tag chips (6 tags for the topic modeling log) add another 20-30px of height that could be deferred to the article page itself.

---

### P3: Architecture diagrams overflow horizontally on mid-range screens

**Where**: [ArchitectureDiagram.astro](src/components/ArchitectureDiagram.astro)

On desktop (768px+), the diagram switches to a horizontal flex row with `overflow-x: auto`. The AI/ML project has 5 architecture steps, each with `min-width: 12rem` (192px). That requires 960px of content width plus connector spacing, but the container is capped at 768px (the `--max-width` token). The diagram will overflow and require horizontal scrolling. There is no visual hint (gradient fade, scroll indicator) to communicate this.

---

### P3: No visible active state for navigation links

**Where**: [SiteHeader.astro](src/components/SiteHeader.astro) `.nav-link`

The header navigation links (Work, Skills, Logs, Contact) have hover styles but no active/current indicator. On a single-page portfolio, there is no route-based active state. Adding a scroll-spy or hash-based highlight would help orientation, but the current implementation has no mechanism for it.

---

### P3: Mobile header wrapping adds significant vertical overhead

**Where**: [SiteHeader.astro](src/components/SiteHeader.astro), mobile media query at 600px

Below 600px, the header splits into two rows: brand + status on top, nav links + social icons below (separated by a border-top). The nav links then flex-wrap, potentially creating a third row. On a 375px screen, the sticky header could consume 100-120px of viewport height. For a content-dense page, this pushes the hero section well below the fold.

---

## Assumptions requiring validation

1. **Token bug**: Whether `--space-5` and `--space-10` resolve to usable values or silently fail depends on browser behavior. This should be tested in Chrome, Firefox, and Safari DevTools.

2. **Font loading performance**: The actual FOUT (flash of unstyled text) timing and CLS impact of the Google Fonts dependency should be measured with Lighthouse in a throttled connection simulation.

3. **Mobile card density**: Without a device preview, the exact viewport thresholds where project cards, metrics grids, and architecture diagrams cause layout issues are inferred from CSS breakpoints rather than observed.

4. **Contrast ratios**: The `--text-muted` value was updated from the plan's `#71717a` to `#8a8a93` in tokens.css. Whether this passes 4.5:1 against `--bg-canvas` (#09090b) and `--bg-surface` (#121215) should be verified with a contrast checker. `#8a8a93` on `#09090b` calculates to approximately 5.5:1, which passes AA. But `#71717a` on `#121215` would be closer to 3.8:1, which fails AA for small text.

5. **Recruiter behavior**: The assumption that recruiters spend under 30 seconds scanning is from PORTFOLIO_PLAN.md. If the actual audience includes hiring managers who read more carefully, some of the "reduce text" recommendations may need adjustment.
