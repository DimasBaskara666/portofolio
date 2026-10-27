---
title: "Epidemiological Outbreak Data Pipeline"
domain: "data"
year: "2024 - 2025"
summary: "Prototypical batch data pipeline designed to ingest public health surveillance records, enforce schema contracts via Pydantic, perform regional spatial joins, and store normalized analytical tables in DuckDB."
technicalContext: "Data Pipeline Prototype / Academic Study"
metrics:
  - label: "Storage Engine"
    value: "DuckDB / Parquet"
  - label: "Validation Layer"
    value: "Pydantic Schemas"
  - label: "Execution Model"
    value: "Python Batch Pipeline"
technologies:
  - "Python"
  - "DuckDB"
  - "pandas"
  - "Pydantic"
  - "SQL"
architectureSteps:
  - step: 1
    label: "Surveillance Record Ingestion"
    description: "Parse public health surveillance tables from tabular files into standardized dataframes."
    tag: "Ingest"
  - step: 2
    label: "Schema Enforcement & Validation"
    description: "Validate field types, required keys, and value bounds using structured Pydantic schemas."
    tag: "Validate"
  - step: 3
    label: "Analytical SQL Transformations"
    description: "Aggregate regional case frequencies, time-window rollups, and spatial identifiers in DuckDB."
    tag: "Transform"
  - step: 4
    label: "Columnar Storage & Query Layer"
    description: "Persist cleaned analytical tables into compressed Parquet format for fast exploratory SQL queries."
    tag: "Storage"
featured: true
---

A pipeline prototype built to explore reproducible data ingestion for epidemiological datasets. Focuses on strong data validation contracts using Pydantic and analytical storage in DuckDB.
