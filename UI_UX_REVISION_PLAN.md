# UI/UX revision plan

This plan addresses the findings in [UI_UX_REVIEW.md](UI_UX_REVIEW.md). Changes are organized into implementation phases, ordered by impact. Each change specifies the affected files, what to do, and when to consider it done.

---

## Design direction

**Keep**: The dark terminal aesthetic, monospace metadata accents, domain color coding, Astro static architecture, content collections, accessibility infrastructure (skip-link, focus rings, reduced-motion, ARIA), and the architecture diagram concept.

**Simplify**: Vertical spacing, card internal density, section headings, footer content, and the hero's information hierarchy.

**Remove**: The disabled "Download CV (Pending)" button, placeholder social URLs, the "HTTP 200 OK" indicator, the "Zero-JS Core" colophon label, and redundant secondary labels on section headers.

**Restructure**: The hero section's vertical rhythm, project card internal layout, Technical Matrix text density, and Engineering Log card content.

---

## Phase 1: Fix layout foundations (P0)

These changes fix structural spacing problems that affect the entire page.

### 1.1 Define missing spacing tokens

**File**: `src/styles/tokens.css`

Add the missing `--space-5` and `--space-10` values to the spacing scale:

```css
--space-5: 1.25rem;    /* 20px */
--space-10: 2.5rem;    /* 40px */
```

Insert them in sequence between `--space-4` and `--space-6`, and between `--space-8` and `--space-12`, respectively.

**Acceptance**: All components referencing `--space-5` and `--space-10` render with explicit, predictable spacing in Chrome DevTools.

### 1.2 Increase section separation

**File**: `src/pages/index.astro`

Change `.page-content` gap from `var(--space-10)` (40px) to `var(--space-16)` (64px). This gives each major section (Hero, Work, Competencies, Logs) room to breathe.

Increase `.section-header` padding-bottom from `var(--space-3)` to `var(--space-4)` and margin-bottom from `var(--space-4)` to `var(--space-6)`.

**Acceptance**: On a 1280px desktop viewport, each section header is clearly separated from both the preceding section and its own content. There is visible empty space between sections, not just a hairline border.

### 1.3 Expand hero vertical space

**File**: `src/components/Hero.astro`

- Increase `.hero-section` padding-top from `var(--space-6)` to `var(--space-12)` (48px) and padding-bottom from `var(--space-6)` to `var(--space-12)`.
- Increase the internal gap from `var(--space-4)` to `var(--space-6)` (24px).
- Add `margin-top: var(--space-2)` to `.focus-pillars` to separate the pillar tags from the heading.
- Add `margin-top: var(--space-2)` to `.hero-bio` to separate the bio from the tags.
- Add `margin-top: var(--space-4)` to `.hero-actions` (up from `--space-3`).

On desktop (640px+), consider scaling `.hero-name` from `2.5rem` to `3rem` (48px) for stronger visual anchoring.

**Acceptance**: The hero section occupies roughly 60-70% of the initial viewport on desktop. The name is the dominant visual element. There is visible vertical breathing room between each sub-element.

---

## Phase 2: Reduce card density (P0/P1)

### 2.1 Open up project card internal spacing

**File**: `src/components/ProjectCard.astro`

- Increase `.project-card` padding from `var(--space-5)` to `var(--space-6)` (24px).
- Increase the internal gap from `var(--space-4)` to `var(--space-5)` (20px).
- Increase `.metrics-grid` padding from `var(--space-3)` to `var(--space-4)`.
- Change `.metric-label` font-size from `0.65rem` to `var(--text-xs)` (0.75rem, 12px). The current 10.4px is too small for comfortable reading.
- Increase the gap between project cards in `.projects-grid` from `var(--space-5)` to `var(--space-6)`.

**Acceptance**: On desktop, each project card has visible padding between its edges and content. Metrics labels are legible without zooming.

### 2.2 Simplify Technical Matrix density

**File**: `src/components/TechnicalMatrix.astro`

- Increase `.skill-item` gap from `0.2rem` to `var(--space-1)` (4px) between name and context.
- Increase `.skills-list` gap from `var(--space-3)` to `var(--space-4)` (16px) between skill items.
- Change `.skill-name` from `--text-xs` to `--text-sm` (14px). Keep context at `--text-xs`. This creates a clearer visual hierarchy: the skill name is visually distinct from its description.
- Increase `.matrix-column` padding from `var(--space-5)` to `var(--space-6)`.

**Acceptance**: A recruiter can scan the skill names in a column without reading the context paragraphs. The names stand out as a separate typographic tier.

### 2.3 Streamline Engineering Log cards

**File**: `src/components/EngineeringLogs.astro`

- Remove the description paragraph from the index card. The title is descriptive enough for a two-item list. The full description is already shown on the article page.
- Reduce the number of visible tags to a maximum of 3 on the index card. If a log has more tags, show the first 3. All tags remain visible on the article page.
- Remove the explicit "Read Full Article" footer link. Instead, make the entire log card title a clickable link (it already is), and add a subtle hover treatment to the full card (it already has `border-color` change on hover). The footer link is redundant.
- Increase `.log-card` padding from `var(--space-5)` to `var(--space-6)`.

**Acceptance**: Each log card is roughly 40-50% shorter on desktop. The two log entries fit in a single viewport on a 1280px screen.

---

## Phase 3: Fix hero credibility issues (P1)

### 3.1 Remove the disabled "Download CV" button

**File**: `src/components/Hero.astro`

Remove the entire `else` branch (lines 67-78) that renders the disabled `<button>` with "Download CV (Pending)". When `cvPath` is not provided, render nothing in that slot. Do not show a button that cannot be clicked.

Once the resume file is uploaded to `public/files/resume.pdf`, pass `cvPath="/files/resume.pdf"` in index.astro's Hero component. The active download button will appear automatically.

**Acceptance**: With no `cvPath` prop, only the "Explore Systems" button renders. No disabled or "pending" states are visible to visitors.

### 3.2 Strengthen section headings

**File**: `src/pages/index.astro`

- Increase `.section-title` font-size from `var(--text-sm)` (14px) to `var(--text-base)` (16px).
- Remove the right-aligned secondary labels ("Index / 03", "Core Domains & Context", "Technical Writeups"). They add visual noise without aiding navigation.

**Acceptance**: Section headings are the largest text element between the hero name and the project titles, creating a clear top-down hierarchy: name (48px) > section headings (16px uppercase) > card titles (18px).

Note: This creates a visual hierarchy issue where card titles (18px) are larger than section headings (16px). This works because the section headings use uppercase and monospace, which renders optically larger than 16px sentence-case Inter. If this feels wrong in practice, bump section headings to `var(--text-lg)` (18px).

---

## Phase 4: Clean up meta and links (P2)

### 4.1 Remove placeholder social URLs

**File**: `src/components/SiteHeader.astro`

Add conditional rendering: only render the GitHub link if `githubUrl` is not the default homepage placeholder (`https://github.com/`). Same for LinkedIn. Until real profile URLs are configured, the social links section should be empty or hidden.

Alternatively, update the defaults to the owner's actual profile URLs.

**File**: `src/components/TelemetryFooter.astro`

Update `emailAddress` default from `hello@example.com` to the owner's actual email, or conditionally hide the email link.

**Acceptance**: No link on the page navigates to a generic homepage. Every external link leads to a real destination or is not rendered.

### 4.2 Simplify footer telemetry

**File**: `src/components/TelemetryFooter.astro`

- Remove the "System Colophon" block ("Astro Static . Zero-JS Core . rev.2026.10"). It is inaccurate ("Zero-JS" when JS is present) and irrelevant to recruiters.
- Remove the "HTTP 200 OK" indicator chip from the bottom bar. It is a developer in-joke that non-technical visitors will find confusing and technical visitors will find unnecessary.
- Keep the location/clock block (it shows timezone, useful for distributed hiring), the current focus block, and the email contact link.

**Acceptance**: The footer contains: location + clock, current focus, email link, and copyright. Four items, no decorative indicators.

### 4.3 Add GitHub repository links to project content

**File**: `src/content/projects/data-pipeline.md`, `src/content/projects/research-collaboration-analyzer.md`, `src/content/projects/topic-modeling-researcher-recommendation.md`

Add `githubUrl` frontmatter to each project pointing to the actual repository. If the repositories are not yet public, consider creating them as public repos (even if the code is a work in progress) or removing the disabled "Academic Research Work" fallback text and replacing it with something that does not imply the code is unavailable.

**Acceptance**: At least one project card has a working "Repository" link that opens a real GitHub page.

---

## Phase 5: Performance and polish (P2/P3)

### 5.1 Self-host fonts

**File**: `src/layouts/BaseLayout.astro`, `public/fonts/` (new directory)

Download Inter (400, 500, 600) and JetBrains Mono (400, 500) as WOFF2 files. Add `@font-face` declarations in `src/styles/fonts.css` with `font-display: swap`. Remove the Google Fonts `<link>` tags and `<link rel="preconnect">` tags.

This eliminates two DNS lookups and an external stylesheet dependency.

**Acceptance**: Lighthouse Performance score improves. No network requests to `fonts.googleapis.com` or `fonts.gstatic.com` appear in the Network panel.

### 5.2 Add horizontal scroll indicators to architecture diagrams

**File**: `src/components/ArchitectureDiagram.astro`

For the horizontal overflow case (768px+), add a gradient fade on the right edge when the content overflows. A simple CSS approach:

```css
.architecture-flow {
  position: relative;
}

.architecture-flow::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 3rem;
  background: linear-gradient(to right, transparent, var(--bg-canvas));
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--transition-fast);
}

/* Show gradient only when overflow exists - needs JS to toggle a class */
```

Alternatively, reduce `min-width` from `12rem` to `10rem` to fit 5 steps within 768px.

**Acceptance**: Architecture diagrams with 5 steps do not require horizontal scrolling, or scrolling is visually indicated.

### 5.3 Consider a mobile hamburger or collapse for header navigation

**File**: `src/components/SiteHeader.astro`

Below 600px, if the nav links and social icons create a third row, the sticky header consumes too much viewport. Options:

- Option A: Collapse the nav links behind a toggle button on mobile, keeping only the brand and status pill visible by default.
- Option B: Remove the status pill on mobile to reduce header height. Keep all nav links in a single row.

Option B is simpler and requires no additional JavaScript.

**Acceptance**: The sticky header on a 375px viewport is no taller than 64px (one row of brand + nav links).

---

## Implementation order

| Order | Phase | Effort estimate | Files changed |
|-------|-------|----------------|---------------|
| 1 | 1.1 Spacing tokens | 5 min | `tokens.css` |
| 2 | 1.2 Section separation | 10 min | `index.astro` |
| 3 | 1.3 Hero expansion | 15 min | `Hero.astro` |
| 4 | 3.1 Remove disabled CV button | 5 min | `Hero.astro` |
| 5 | 2.1 Project card spacing | 15 min | `ProjectCard.astro`, `index.astro` |
| 6 | 3.2 Section heading size | 10 min | `index.astro` |
| 7 | 2.2 Matrix density | 15 min | `TechnicalMatrix.astro` |
| 8 | 2.3 Log card streamline | 20 min | `EngineeringLogs.astro` |
| 9 | 4.2 Footer cleanup | 15 min | `TelemetryFooter.astro` |
| 10 | 4.1 Placeholder URLs | 10 min | `SiteHeader.astro`, `TelemetryFooter.astro` |
| 11 | 4.3 GitHub repo links | 10 min | 3 content markdown files |
| 12 | 5.1 Self-host fonts | 30 min | `BaseLayout.astro`, new `fonts.css`, `public/fonts/` |
| 13 | 5.2 Diagram scroll hints | 20 min | `ArchitectureDiagram.astro` |
| 14 | 5.3 Mobile header | 20 min | `SiteHeader.astro` |

Total estimated effort: approximately 3-4 hours for all phases.

---

## What not to change

- **Astro framework**: No reason to migrate. The static site generation model is the right choice.
- **Vanilla CSS**: No need to add Tailwind or a CSS framework. The token system works well.
- **Content collections**: The typed schema approach is clean and maintainable.
- **Accessibility infrastructure**: The ARIA attributes, focus indicators, and motion preferences are well-implemented.
- **Dark color scheme**: The zinc/slate palette is appropriate for the technical audience.
- **Architecture diagrams**: The concept is unique and differentiating for a data/ML portfolio. The diagrams just need scroll handling, not removal.
- **Unscramble micro-interaction**: It is subtle, respects reduced-motion, and costs almost nothing in bundle size.
- **Three-pillar domain structure**: Data / Software / AI is a clear information architecture that maps directly to job categories.
