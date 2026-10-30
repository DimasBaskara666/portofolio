---
title: "MECUT Radar"
domain: "data"
year: "2026"
status: "completed"
summary: "Automated technology news ingestion and alerting pipeline collecting from RSS feeds, Hacker News, and GitHub APIs with deduplication, keyword relevance filtering, SQLite storage, and Telegram dispatch."
technicalContext: "Automated Data Ingestion & Alert Pipeline"
metrics:
  - label: "Execution Schedule"
    value: "Scheduled cron every 3 hours"
  - label: "State Persistence"
    value: "Orphan db-state Git branch (Rp0 cloud cost)"
  - label: "Database Engine"
    value: "SQLite WAL with integrity checks"
  - label: "Test Coverage"
    value: "16 pytest modules with mocked network fixtures"
technologies:
  - "Python"
  - "SQLite"
  - "GitHub Actions"
  - "Telegram Bot API"
  - "pytest"
  - "YAML"
githubUrl: "https://github.com/DimasBaskara666/mecut-radar"
architectureSteps:
  - step: 1
    label: "Multi-Source Extraction"
    description: "Fetch technology news items from configured RSS feeds, Hacker News Firebase API, and GitHub Search API."
    tag: "Ingest"
  - step: 2
    label: "Schema Normalization"
    description: "Standardize external payloads into unified article data structures with timestamp and URL validation."
    tag: "Normalize"
  - step: 3
    label: "Deduplication & Keyword Scoring"
    description: "Verify uniqueness against SQLite history, then calculate deterministic keyword weights to filter relevant items."
    tag: "Filter"
  - step: 4
    label: "Atomic State Persistence"
    description: "Write records to SQLite WAL, execute PRAGMA integrity checks, and commit snapshots to the db-state branch."
    tag: "Persist"
  - step: 5
    label: "Telegram Notification"
    description: "Format markdown alert messages and send unsent relevant articles to designated Telegram channels."
    tag: "Dispatch"
featured: true
---

A lightweight technology news ingestion and notification system for the MECUT workflow. The pipeline runs automatically on scheduled GitHub Actions runners with database state preserved across ephemeral runs on a dedicated Git branch, requiring zero external server infrastructure.
