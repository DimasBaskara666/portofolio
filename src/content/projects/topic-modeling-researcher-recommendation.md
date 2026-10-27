---
title: "Topic Modeling & Researcher Recommendation System"
domain: "ai"
year: "2025 - 2026"
summary: "Comparative research study and implementation evaluating statistical and transformer-based topic models (LDA, NMF, BERTopic) with SPECTER embeddings to model academic publication corpora and recommend research collaborators."
technicalContext: "Undergraduate Thesis / Academic Research"
metrics:
  - label: "Evaluated Models"
    value: "LDA, NMF, BERTopic"
  - label: "Embedding Architecture"
    value: "SPECTER / S-BERT"
  - label: "Clustering Method"
    value: "UMAP + HDBSCAN"
technologies:
  - "Python"
  - "BERTopic"
  - "PyTorch"
  - "Sentence-Transformers"
  - "scikit-learn"
  - "UMAP"
  - "HDBSCAN"
architectureSteps:
  - step: 1
    label: "Publication Ingestion & Text Extraction"
    description: "Extract research titles, abstracts, and author metadata into a structured document collection."
    tag: "Ingestion"
  - step: 2
    label: "Dense Semantic Embeddings"
    description: "Transform textual representations into dense vector embeddings using domain-adapted SPECTER transformers."
    tag: "Embedding"
  - step: 3
    label: "Manifold Reduction & Density Clustering"
    description: "Reduce vector dimensions using UMAP and group publication neighborhoods using HDBSCAN density clustering."
    tag: "Clustering"
  - step: 4
    label: "Topic Extraction & Coherence Evaluation"
    description: "Extract topic representations via c-TF-IDF and benchmark topic coherence against LDA and NMF baselines."
    tag: "Evaluation"
  - step: 5
    label: "Researcher Profile Similarity Matching"
    description: "Match researcher publication histories against topic centroids using cosine similarity to recommend collaborator pairs."
    tag: "Matching"
featured: true
---

This research project investigates automated topic modeling techniques applied to scientific literature to discover interdisciplinary collaboration opportunities. The system compares traditional matrix factorization and generative approaches (NMF, LDA) with transformer-driven clustering (BERTopic with SPECTER embeddings).
