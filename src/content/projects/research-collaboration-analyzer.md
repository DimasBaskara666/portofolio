---
title: "Research Collaboration Network Analyzer"
domain: "software"
year: "2025"
summary: "Modular desktop graphical application built with Python and PyQt6 for analyzing scientific co-authorship networks, computing network centrality metrics, and visualizing institutional research relationships."
technicalContext: "Desktop Application / Research Tool"
metrics:
  - label: "Architecture"
    value: "PyQt6 Desktop GUI"
  - label: "Concurrency"
    value: "QThread Worker Pools"
  - label: "Graph Engine"
    value: "NetworkX / Matplotlib"
technologies:
  - "Python"
  - "PyQt6"
  - "NetworkX"
  - "pandas"
  - "Matplotlib"
architectureSteps:
  - step: 1
    label: "Dataset Ingestion & File Parser"
    description: "Load bibliographic CSV/JSON datasets with input format validation and error handling."
    tag: "Ingest"
  - step: 2
    label: "Co-authorship Graph Construction"
    description: "Construct weighted undirected graph models representing co-authored research works and institutional affiliations."
    tag: "Graph"
  - step: 3
    label: "Multithreaded Network Calculations"
    description: "Execute graph centrality metrics (degree, betweenness, closeness) inside QThread background workers to keep UI responsive."
    tag: "Compute"
  - step: 4
    label: "PyQt6 Interactive Interface"
    description: "Present filtered subgraph views, node inspectors, and search controls in a clean desktop interface."
    tag: "Interface"
  - step: 5
    label: "Analytics & Report Export"
    description: "Export computed node metrics, cluster statistics, and high-resolution collaboration diagrams."
    tag: "Export"
featured: true
---

A desktop tool built to analyze academic collaboration structures. Uses PyQt6 for interface controls and NetworkX for network computations, utilizing multithreaded workers to prevent UI freezes during heavy graph metric computations.
