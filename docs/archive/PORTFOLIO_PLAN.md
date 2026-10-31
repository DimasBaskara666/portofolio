# Developer Portfolio Planning Document

## 1. Reference site analysis

### Reference A: pahasara.me

#### Direct observations
- Technology stack: Next.js (App Router, Turbopack chunks), Tailwind CSS utility classes, Framer Motion for scroll/entry reveals.
- Layout: Single-column centered container capped at `max-w-3xl` (approx. 768px), generous vertical margins, dark background (`bg-background dark`), subtle top and bottom dividers.
- Header and navigation: Rounded avatar with a grayscale-to-color transition on hover, small monospace social link icons (GitHub, LinkedIn), and text navigation links (About, Blog) with scale transitions.
- Hero section: Concise one-sentence biography establishing roles (Linux enthusiast, software/data engineer), an active status row ("Currently reading..."), and a live GitHub contribution graph preview widget.
- Action items: A compact pill-shaped button for resume download (`Download CV`).
- Work section ("SELECTED WORK"): Numbered index indicator (`index / 07`), divided horizontal rows for each project.
- Project row anatomy: Project title, date badge in monospace text, two-line summary clamp, and a compact thumbnail strip on the right side with 1 to 3 preview frames plus an overflow counter badge (`+2`, `+5`).
- Footer: Social links, page anchors, copyright notice, and an absolute canvas element.

#### Inferred assumptions
- The site prioritizes quick scanning over heavy visual theatrics, making it effective for engineering recruiters who review portfolios in under thirty seconds.
- Project previews rely on thumbnail strips rather than full-width hero cards, which keeps page height controlled while still proving that a visual product exists.

---

### Reference B: jhey.dev

#### Direct observations
- Technology stack: Astro static site generator with Astro Server Islands, utility CSS, custom inline SVG animations, Vercel Web Analytics.
- Layout: Minimal, editorial composition with asymmetrical whitespace (`pt-[20vh] w-content mx-auto`), a fixed or absolute corner gem mark, and zero standard navigation chrome.
- Typography: Oversized custom SVG lettermark for the primary hero title (`Jhey Tompkins`), accented by an animated crane/claw mechanic that places the dot above the letter "i".
- Secondary type: Tight uppercase monospace metadata labels (`font-mono text-xs uppercase tracking-[0.08em]`).
- Visual signature: An animated SVG line-art bear drawing that sketches out progressively on page load using CSS stroke-dashoffset transitions.
- Project listing ("Latest"): Monospace index list with a custom cursor icon, link text, and an interactive character unscramble/decode effect on hover.
- Live telemetry bar: A persistent footer readout powered by server-side fetching, displaying:
  * Geographic location indicator ("Chillin in Split").
  * Real-time local temperature and timezone clock ("84.1°F · 17:23").
  * Steam activity readout ("ANIMAL WELL").
  * Spotify track ticker with an automatic marquee scroll.
  * Colophon with git commit hash (`Rev 176d17b`) and live viewport dimensions.

#### Inferred assumptions
- The site serves as a live exhibition of frontend craftsmanship and creative engineering.
- The telemetry bar builds personal connection without adding narrative bloat or corporate posturing.

---

## 2. Synthesis and design concept

### The core concept: Systems Engineering Terminal
Neither a pure frontend animation playground nor a dry resume list fits an engineer who works across Data Engineering, Software Engineering, and AI/ML.

Frontend portfolios rely on glossy application screenshots. Backend, data, and machine learning projects rarely produce conventional UI. When data engineers force their work into generic web mockups, the true complexity (pipeline throughput, data contracts, latency bounds, model drift safeguards) remains invisible.

The design concept combines:
1. Pahasara's scannable density, clear metadata tagging, and disciplined dark palette.
2. Jhey's technical craftsmanship, monospace telemetry readouts, and character-level micro-interactions.
3. A custom "Systems Architecture" presentation layer designed specifically for data pipelines, microservices, and machine learning workflows.

### Visual identity and aesthetic direction
- Tone: High-precision engineering instrument. Calm, dark, clean, and utilitarian.
- Background: Deep slate zinc (`#09090b` / `#0f1117`), avoiding harsh pitch black to preserve subtle edge contrast.
- Foreground: High-legibility neutral text (`#f4f4f5` primary, `#a1a1aa` secondary, `#71717a` muted).
- Accent: A single muted amber or cyan accent (`#38bdf8` or `#f59e0b`) reserved strictly for active states, live indicators, and data flow highlights.
- Linework: 1px hairline borders (`rgba(255, 255, 255, 0.08)`) to structure modular cards and metadata chips without visual weight.

---

## 3. Information architecture and sitemap

```
/ (Index)
│
├── 1. Terminal Bar (Global Header)
│   ├── Monospace status indicator (Available for work / Current focus)
│   ├── Quick navigation anchors (#work, #skills, #architecture, #about)
│   └── Social links (GitHub, LinkedIn, Email)
│
├── 2. Hero & Identity
│   ├── Name and role specification (Informatics Graduate)
│   ├── Tri-pillar focus tags: [Data Engineering] · [Software Engineering] · [AI/ML Systems]
│   ├── One-paragraph positioning statement
│   └── Primary action buttons: [Review Case Studies] [Download CV]
│
├── 3. System Telemetry (Live / Deterministic Readout)
│   ├── Active research topic (e.g., Vector embeddings, dbt DAG optimization)
│   ├── Current toolchain badge matrix
│   └── System metrics (Local time, Git revision, Build status)
│
├── 4. Technical Matrix (Skills & Competencies)
│   ├── Data Platforms (Kafka, Spark, DuckDB, PostgreSQL, dbt, Airflow)
│   ├── Backend & Infrastructure (Python, Go/TypeScript, FastAPI, Docker, Kubernetes)
│   └── AI / ML / NLP (PyTorch, Hugging Face, LangChain/LlamaIndex, Vector DBs, vLLM)
│
├── 5. Selected Works & System Architecture
│   ├── Domain filter tabs: [All] · [Data Systems] · [Software Engineering] · [AI / NLP]
│   ├── Interactive project cards featuring:
│   │   ├── Title, release year, domain classification
│   │   ├── Architectural summary and problem context
│   │   ├── Data & system metrics (throughput, latency, dataset size, model accuracy)
│   │   ├── Interactive System Topology toggle (visual data flow diagram)
│   │   └── Direct links to GitHub repository and live deployment/demo
│   └── Deep-dive case study modal or drawer for detailed post-mortems
│
├── 6. Engineering Logs / Thought Process
│   ├── Concise technical writeups covering real tradeoffs, bug post-mortems, and design decisions
│   └── Demonstration of reasoning, AI-assisted development workflows, and architectural validation
│
└── 7. Footer & Colophon
    ├── Contact channel links
    ├── PGP fingerprint or verified commit key (optional authenticity element)
    └── Technical specs of the site itself (bundle size, framework version, response latency)
```

---

## 4. Technology stack evaluation

### Selected stack: Astro + Vanilla CSS + Minimal TypeScript

| Evaluation criteria | Astro + Vanilla CSS | Next.js (App Router) | Vite + React SPA |
| :--- | :--- | :--- | :--- |
| **Initial page load** | Zero client JS by default (instant HTML) | 80KB+ React runtime hydration | 60KB+ client bundle, blank flash on cold load |
| **Markdown / Case studies** | First-class Content Collections with typed schemas | Requires MDX plugins and build configuration | Requires custom markdown parser or third-party renderer |
| **Maintenance overhead** | Minimal. Static output with zero server dependencies | High. Frequent framework upgrades and route changes | Medium. Client routing and state management required |
| **Hosting options** | Any static CDN (Cloudflare Pages, GitHub Pages, Vercel) | Node runtime or complex static export adapter | Any static CDN |
| **SEO and Core Web Vitals** | 100/100 default Performance and Accessibility | High, but prone to hydration delays | Poor initial crawl indexing without pre-rendering |

### Rationale for Astro
A personal portfolio should not require a heavy client-side JavaScript runtime. Astro delivers static, semantic HTML by default. When an interactive widget is required (such as an interactive pipeline topology viewer or telemetry clock), Astro allows component-level client hydration (`client:visible` or `client:idle`).

### Rationale for Vanilla CSS with Custom Properties
Modern CSS eliminates the need for heavyweight utility preprocessors. Using CSS custom properties (design tokens), CSS Grid, Flexbox, and native nesting provides total control over typography, micro-interactions, and animations without runtime overhead or dependency deprecation risks.

---

## 5. Design system foundation

### 5.1 Design tokens

```css
:root {
  /* Color palette */
  --bg-canvas: #09090b;
  --bg-surface: #121215;
  --bg-surface-hover: #18181c;
  --bg-subtle: #27272a;

  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-active: rgba(255, 255, 255, 0.20);
  --border-accent: rgba(56, 189, 248, 0.40);

  --text-primary: #f4f4f5;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
  --text-accent: #38bdf8;

  /* Typography scale */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, monospace;

  --text-xs: 0.75rem;     /* 12px */
  --text-sm: 0.875rem;    /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;    /* 18px */
  --text-xl: 1.25rem;     /* 20px */
  --text-2xl: 1.5rem;     /* 24px */
  --text-3xl: 2rem;       /* 32px */

  /* Spacing scale */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;

  /* Layout */
  --max-width: 48rem;     /* 768px for readable editorial column */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;
}
```

### 5.2 Reusable component inventory
1. `SiteHeader`: Sticky minimal header with logo mark, navigation anchors, and status indicator.
2. `StatusPill`: Pulsing status badge indicating current availability or active learning focus.
3. `ProjectCard`: Structured project presentation with domain badge, metric readout, and preview drawer.
4. `ArchitectureDiagram`: SVG/CSS modular block diagram illustrating data pipelines and service interactions.
5. `TelemetryBar`: Footer instrumentation showing UTC time, git revision, and platform environment.
6. `SkillTag`: Monospace competency tag with category indicator.
7. `CaseStudyModal`: Focus overlay displaying complete project post-mortems with problem, solution, and results.

### 5.3 Responsive behavior
- Mobile (< 640px): Single-column linear layout. Telemetry items stack vertically. Navigation switches to compact top bar. Pipeline diagrams switch from horizontal flow to vertical step-by-step cards.
- Tablet (640px to 1024px): Two-column technical matrix, horizontal project cards with inline metric badges.
- Desktop (> 1024px): Centered readable column with subtle fixed margin indicators, expanded hover details, and interactive diagram toggles.

### 5.4 Accessibility standards (WCAG 2.1 AA)
- Contrast ratio: Minimum 4.5:1 for body copy and 3:1 for large headers and interface boundaries.
- Keyboard navigation: Visible focus rings (`outline: 2px solid var(--text-accent); outline-offset: 2px`) on all interactive buttons and links.
- Screen readers: Aria labels on icon-only links, descriptive alt text on architectural graphics, semantic HTML headings (`h1` through `h4`).
- Motion preferences: Strict compliance with `@media (prefers-reduced-motion: reduce)` disabling non-essential transitions.

### 5.5 SEO strategy
- Structured data: JSON-LD profile schema identifying author, credentials (Informatics Degree), job titles, and primary code repositories.
- Metadata: Open Graph and Twitter Card tags with pre-rendered preview image.
- Canonical URLs and automated sitemap generation via `@astrojs/sitemap`.

---

## 6. Interaction audit: High-value utility vs decorative friction

To ensure the portfolio remains professional, maintainable, and fast, every interactive element is evaluated on genuine communication value.

| Interaction element | Type | Value assessment | Decision |
| :--- | :--- | :--- | :--- |
| **Interactive Pipeline Diagram** | Architecture | Explains complex data flows and backend components that have no graphical UI. Demonstrates engineering clarity. | **Retain (High Value)** |
| **Code / Metric Copy Button** | Functional | Allows recruiters and leads to copy GitHub clone URLs, package names, or benchmark numbers in one click. | **Retain (High Value)** |
| **Domain Filter (Data / SE / AI)** | Navigation | Lets visitors filter directly to their specific hiring focus without scrolling past unrelated work. | **Retain (High Value)** |
| **Deterministic Telemetry Clock** | Personal context | Establishes timezone, active projects, and work rhythm without heavy API calls. | **Retain (High Value)** |
| **Character Scramble on Hover** | Micro-interaction | Subtle text reveal on links (inspired by Jhey.dev). Adds personality when kept under 150ms. | **Retain (Moderate Value)** |
| **Custom Canvas Cursor Trails** | Decorative | Adds input lag, drains laptop battery, and distracts from content consumption. | **Reject (Friction)** |
| **Audio / Sound Effects** | Decorative | Unsolicited audio triggers violate accessible web design and annoy recruiters. | **Reject (Friction)** |
| **Heavy 3D WebGL Backgrounds** | Decorative | High memory footprint, long load times, zero relevance to data/backend engineering. | **Reject (Friction)** |

---

## 7. Strategy for showcasing AI-assisted development and thought process

The portfolio explicitly highlights how modern AI tooling is integrated responsibly:
- **Architecture over syntax**: Case studies document the initial architectural design, the prompts and constraints applied, the automated testing harness, and the human code reviews that corrected subtle hallucinations or inefficiencies.
- **Verification rigor**: Each AI-assisted project highlights test suites, data validation schemas (Great Expectations, Pydantic), and benchmark tests that guarantee system correctness.
- **Thought process documentation**: Writeups articulate *why* a particular database, queue, or model was chosen over alternatives, demonstrating independent judgment rather than passive AI generation.
