import type { CompetencyGroup } from '../types';

export const competencies: CompetencyGroup[] = [
  {
    id: 'data-engineering',
    title: 'Data Engineering',
    pillar: 'data',
    description:
      'Ingestion, transformation, tabular manipulation, and analytical storage with focus on data integrity and schema validation.',
    skills: [
      {
        name: 'Python (pandas / Polars)',
        context: 'Tabular data transformation, automated batch cleansing, and file ingestion pipelines.',
      },
      {
        name: 'SQL & Relational Databases (PostgreSQL / SQLite)',
        context: 'Relational schema design, normalization, table constraints, and analytical query authoring.',
      },
      {
        name: 'Embedded Analytical Storage (DuckDB)',
        context: 'Columnar storage queries, Parquet file processing, and local analytical transformation.',
      },
      {
        name: 'Data Validation & Schemas (Pydantic)',
        context: 'Enforcing data contracts, record validation rules, and structured schema definitions.',
      },
      {
        name: 'Pipeline Orchestration & Batch Workflows',
        context: 'Dependency-ordered step execution, reproducible runs, and artifact logging.',
      },
    ],
  },
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    pillar: 'software',
    description:
      'Application architecture, modular service design, desktop tooling, and containerized development environments.',
    skills: [
      {
        name: 'Python / Software Design',
        context: 'Modular architecture, object-oriented patterns, type annotations, and clean module boundaries.',
      },
      {
        name: 'Desktop Application Development (PyQt6)',
        context: 'Multithreaded GUI applications, background task workers, and interactive analysis interfaces.',
      },
      {
        name: 'Backend API Design (FastAPI / REST)',
        context: 'Contract-first API endpoints, input serialization, structured response formats, and testing.',
      },
      {
        name: 'Containerization (Docker)',
        context: 'Reproducible development environments, dependency isolation, and multi-stage container files.',
      },
      {
        name: 'Version Control & Workflows (Git / GitHub)',
        context: 'Branch management, pull request reviews, automated CI checks, and release tagging.',
      },
    ],
  },
  {
    id: 'ai-ml-nlp',
    title: 'AI / ML / NLP',
    pillar: 'ai',
    description:
      'Topic modeling, dense vector embeddings, semantic retrieval, and empirical model evaluation workflows.',
    skills: [
      {
        name: 'Topic Modeling (LDA, NMF, BERTopic)',
        context: 'Comparing traditional statistical and transformer-based topic models, coherence evaluation, and document categorization.',
      },
      {
        name: 'Semantic Embeddings (Sentence-Transformers / SPECTER)',
        context: 'Generating dense vector representations of academic publications and scientific literature.',
      },
      {
        name: 'Dimensionality Reduction & Clustering (UMAP, HDBSCAN)',
        context: 'High-dimensional projection, density-based grouping, and embedding space inspection.',
      },
      {
        name: 'Machine Learning Pipelines (scikit-learn)',
        context: 'Text feature extraction (TF-IDF), clustering, classification, and metric evaluation.',
      },
      {
        name: 'Deep Learning Basics (PyTorch)',
        context: 'Tensor operations, neural network forward passes, and embedding inference pipelines.',
      },
    ],
  },
];
