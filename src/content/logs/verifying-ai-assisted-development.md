---
title: "Verifying AI-Assisted Code Changes with Structured Test Harnesses"
description: "Why accepting generated code based on model self-reports introduces silent failure modes, and how to construct deterministic verification pipelines using type checking, static builds, and runtime inspection."
publishDate: "2026-10-15"
category: "Software Engineering"
tags:
  - "AI-Assisted Development"
  - "Testing"
  - "TypeScript"
  - "Code Quality"
  - "Verification"
readTime: "6 min read"
---

### The false confidence of model self-reports

When developing software with AI assistance, the most common trap is accepting generated code based solely on the assistant's optimistic summary. Language models routinely produce explanations that sound authoritative, claiming all edge cases are handled and all requirements are met. 

In practice, generated code often harbors subtle failure modes:
1. Strict type mismatches that only surface during compilation.
2. Unhandled null references inside event closures or intervals.
3. Phantom links or routes that point to non-existent assets.
4. Broken keyboard navigation states that pass superficial visual inspection.

Treating AI assistance as a reliable pair programmer requires shifting from passive trust to an active, deterministic verification harness.

---

### Layer 1: Strict compiler and type checks

Static analysis provides the first line of defense against hallucinations. Generated TypeScript code frequently assumes loose compiler settings or ignores strict null checks.

A concrete example occurred during this portfolio's telemetry footer development. A DOM lookup for a live clock element was declared at the top of a function, and then referenced inside an update closure executed by `setInterval`:

```typescript
// Initial generated implementation: passes loose linting, fails strict null analysis
function initClock(): void {
  const clockEl = document.getElementById('telemetry-clock');
  if (!clockEl) return;

  function updateTime(): void {
    // TypeScript strict mode error ts(18047): 'clockEl' is possibly 'null'
    clockEl.textContent = new Date().toLocaleTimeString();
  }

  setInterval(updateTime, 1000);
}
```

Because TypeScript cannot guarantee that the closure variable remains unchanged between turns of the event loop, strict mode flags `clockEl` as possibly null. Running `npm run check` immediately caught the error:

```typescript
// Verified implementation: local binding with explicit type assertion
function initClock(): void {
  const clockEl = document.getElementById('telemetry-clock');
  if (!clockEl) return;

  const targetEl: HTMLElement = clockEl;

  function updateTime(): void {
    targetEl.textContent = new Date().toLocaleTimeString();
  }

  updateTime();
  setInterval(updateTime, 1000);
}
```

If the development workflow had relied only on checking whether files were saved without running `astro check`, this type defect would have lingered unnoticed.

---

### Layer 2: Production static build validation

Development servers (such as Vite in dev mode) use on-demand module evaluation. Consequently, files with schema mismatches or broken imports may not be parsed until a browser specifically navigates to that page.

In contrast, running `npm run build` forces the static site generator to compile every route, parse every content collection record against its Zod schema, and verify all build assets:

```bash
# Deterministic verification command
npm run build
```

During schema migration for project content collections, dev mode allowed pages to render while a schema validation warning was quietly logged. The static build failed immediately, halting the process until every markdown frontmatter block matched the updated schema.

---

### Layer 3: Verified behavior versus successful builds

A green build indicates syntactic and structural validity. It does not prove that the user experience is correct.

A prime example is optional content handling. When designing the portfolio hero action buttons, the original specification requested a `Download CV` button pointing to `public/files/resume.pdf`. A naive implementation would generate an active anchor tag:

```html
<!-- Syntactically valid, but functionally broken when the file does not exist -->
<a href="/files/resume.pdf" download="resume.pdf">Download CV</a>
```

If the actual PDF file has not yet been uploaded by the repository owner, clicking this button triggers a 404 network error. The build succeeds, but the user experience fails.

A verified approach requires inspecting the filesystem first:
1. Verify whether the target asset exists.
2. If absent, render an accessible disabled state (`<button disabled aria-disabled="true">`) with a descriptive tooltip explaining that the file is pending upload.
3. Expose a typed prop allowing the link to activate automatically once the file is placed in the expected directory.

---

### A repeatable verification checklist

To maintain high code quality when using AI-assisted workflows, follow a strict verification sequence before committing any change:

1. **Run diagnostics**: Execute `npm run check` or `tsc --noEmit`. Do not accept warnings or suppressed errors.
2. **Execute production builds**: Run `npm run build` to confirm static entry points and content schemas pass validation.
3. **Inspect the live rendered DOM**: Fetch the generated HTML or inspect the browser page to verify that elements actually render with the expected hierarchy and contrast.
4. **Test missing data states**: Verify that components degrade gracefully when optional properties are omitted.
5. **Audit accessibility**: Check keyboard navigation (`Tab` and `Shift+Tab`) and confirm that focus indicators are clearly visible.

AI-assisted coding accelerates implementation speed, but software reliability remains an engineering discipline governed by automated testing and skeptical verification.
