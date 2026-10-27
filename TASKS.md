# Implementation Roadmap (TASKS.md)

This document outlines the step-by-step implementation sequence for the developer portfolio. Each phase contains clear implementation steps and testable acceptance criteria.

Do not proceed with coding until the plan is reviewed and approved.

---

## Phase 1: Project setup and architectural foundation

### Tasks
- [x] Initialize an Astro project in the workspace root using the minimal template (`npm create astro@latest ./ -- --template minimal --no-install --typescript strict`).
- [x] Install required dev dependencies: `@astrojs/check`, `typescript`, `@astrojs/sitemap`.
- [x] Configure `astro.config.mjs` with production site URL, sitemap integration, and strict build checks.
- [x] Create directory structure:
  * `src/components/`: Modular UI components.
  * `src/content/projects/`: Markdown/JSON project specifications with typed schemas.
  * `src/layouts/`: Base HTML document layouts.
  * `src/styles/`: Global styles, design tokens, and CSS reset.
  * `src/types/`: TypeScript interface definitions.
  * `public/`: Static assets (fonts, resume PDF, architecture diagrams, social preview images).
- [x] Create `src/styles/tokens.css` with custom properties for color palette, typography, spacing, and border radii.
- [x] Create `src/styles/reset.css` with modern box-sizing, fluid type defaults, and focus ring baselines.

### Acceptance criteria
1. `npm run dev` starts the local server without errors or deprecation warnings.
2. `npm run build` generates a clean static build into `dist/`.
3. Design tokens resolve properly in browser dev tools.

---

## Phase 2: Core layout and navigation shell

### Tasks
- [x] Create `src/layouts/BaseLayout.astro` with HTML5 document structure, viewport meta tags, font preload tags, and skip-to-content accessibility link.
- [x] Create `src/components/SiteHeader.astro`:
  * Monospace operator mark and brand name.
  * Live status pill indicator ("Available for roles" / "Building data systems").
  * Section anchor links (`#work`, `#competencies`, `#logs`, `#contact`).
  * Direct links to GitHub and LinkedIn.
- [x] Create `src/components/TelemetryFooter.astro`:
  * Real-time local timezone clock (JavaScript runtime hydrated via `client:idle`).
  * Current research focus and learning status.
  * Site technical colophon (commit hash, Astro version, zero-JS badge).
  * Direct contact email link.

### Acceptance criteria
1. Layout renders consistently across mobile (375px), tablet (768px), and desktop (1280px) viewports.
2. Skip-to-content link functions properly with keyboard navigation (`Tab` -> `Enter`).
3. Footer clock updates accurately without layout shifts.

---

## Phase 3: Hero section and identity presentation

### Tasks
- [x] Create `src/components/Hero.astro`:
  * Primary title with name and academic background (Informatics graduate).
  * Career pillar tags: `[Data Engineering]`, `[Software Engineering]`, `[AI / ML Systems]`.
  * Concise positioning statement explaining focus on data pipelines, backend architecture, and applied ML.
  * Primary action buttons: `Download CV (PDF)` and `Explore Systems`.
- [x] Implement subtle character unscramble effect on link hover (CSS/JS micro-interaction under 150ms).
- [ ] Embed the verified resume PDF in `public/files/resume.pdf` with proper download attributes (Pending owner upload).

### Acceptance criteria
1. Hero copy passes 4.5:1 color contrast ratio against canvas background.
2. Action buttons trigger intended behaviors (instant download and smooth scroll to `#work`).
3. Screen readers announce name, title, and buttons without extraneous punctuation artifacts.

---

## Phase 4: Technical matrix and competencies

### Tasks
- [x] Define competency data structure in `src/data/competencies.ts` grouped into three pillars:
  1. Data Engineering: Storage engines, distributed computing, pipeline orchestration, data modeling.
  2. Software Engineering: Core languages, API design, microservices, containerization, CI/CD.
  3. AI / ML / NLP: Model training/fine-tuning, vector embeddings, retrieval pipelines, inference optimization.
- [x] Create `src/components/TechnicalMatrix.astro`:
  * Modular grid with distinct domain columns.
  * Interactive tags showing proficiency context and real-world tools used.
  * Explanatory note detailing engineering philosophy (correctness, reproducibility, testing).

### Acceptance criteria
1. Grid adapts from single-column on mobile to three-column on desktop.
2. All technical tags render with semantic markup (`<ul>` and `<li>`).
3. Information hierarchy allows a recruiter to scan core tools in under ten seconds.

---

## Phase 5: Selected works and system architecture visualizer

### Tasks
- [x] Define the Astro Content Collection schema for projects in `src/content.config.ts`:
  * Fields: `title`, `domain` (data | software | ai), `year`, `summary`, `technicalContext`, `metrics`, `technologies`, `githubUrl`, `liveUrl`, `architectureSteps`, `featured`.
- [x] Create content files for key portfolio projects:
  * Project 1 (Data Engineering): Epidemiological Outbreak Data Pipeline (batch prototype).
  * Project 2 (Software Engineering): Research Collaboration Network Analyzer (PyQt6 desktop tool).
  * Project 3 (AI / ML / NLP): Topic Modeling & Researcher Recommendation System (LDA, NMF, BERTopic).
- [x] Create `src/components/DomainFilter.astro`:
  * Interactive filter tabs (`All`, `Data Systems`, `Software Engineering`, `AI / ML`).
  * Lightweight vanilla JS filter mechanism with graceful static fallback.
- [x] Create `src/components/ProjectCard.astro`:
  * Project title, domain badge, date badge, and technical context.
  * Verified metrics strip without fabricated numbers.
  * Concise problem and solution description.
  * Expandable System Topology toggle.
- [x] Create `src/components/ArchitectureDiagram.astro`:
  * Visual pipeline flow with project-specific nodes and connectors.
  * Mobile fallback displaying a clean vertical execution list and accessible text alternative.

### Acceptance criteria
1. Filtering by domain shows only relevant projects without jump or layout flicker.
2. Clicking the Architecture toggle expands the pipeline visualizer smoothly.
3. Every project has working links to code repositories and reproducible documentation.

---

## Phase 6: Engineering logs and thought process demonstration

### Tasks
- [x] Create `src/content/logs/` content collection for engineering post-mortems and technical decisions:
  * Log A: Verifying AI-Assisted Code Changes with Structured Test Harnesses (`src/content/logs/verifying-ai-assisted-development.md`).
  * Log B: Statistical vs Neural Topic Modeling for Researcher Recommendation (`src/content/logs/statistical-vs-neural-topic-modeling.md`).
- [x] Create `src/components/EngineeringLogs.astro`:
  * Chronological list with title, category glyph, publication date, reading time, summary description, and tag chips.
  * Direct read links opening dedicated clean reading pages.
- [x] Create `src/pages/logs/[slug].astro` for full markdown rendering with custom code block styling, copy buttons, fallback copying, and breadcrumb navigation.
- [x] Integrate `EngineeringLogs` into `src/pages/index.astro` under the `#logs` section.

### Acceptance criteria
1. Code blocks display with clear syntax highlighting and a working one-click copy button with visual feedback.
2. Case studies clearly present problem framing, alternatives considered, and measurable outcomes.
3. Reading experience maintains clean typography (max 44rem width for body copy).

---

## Phase 7: Optimization, accessibility, and final audit

### Tasks
- [x] Implement SEO metadata component `src/components/SEO.astro`:
  * Title and description tags.
  * OpenGraph image generator or pre-rendered card (`public/og-image.png`).
  * JSON-LD ProfilePage schema documenting credentials and skills.
- [x] Add `@media (prefers-reduced-motion: reduce)` overrides to disable all animations for users with motion sensitivity.
- [ ] Conduct accessibility audit using Chrome DevTools Lighthouse and keyboard navigation checks.
- [x] Verify production bundle size and asset loading:
  * Total page transfer under 100KB uncompressed.
  * Zero third-party tracker scripts.
  * Self-hosted or system fonts.
- [x] Perform cross-browser testing (Chrome and Edge verified; Firefox and Safari/WebKit unavailable on host).

### Acceptance criteria
1. Lighthouse scores achieve:
   * Performance: 98+
   * Accessibility: 100
   * Best Practices: 100
   * SEO: 100
2. Page functions completely with JavaScript disabled (graceful degradation for static content).
3. All interactive elements have visible, high-contrast focus indicators.
