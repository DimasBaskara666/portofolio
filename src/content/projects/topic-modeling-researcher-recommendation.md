---
title: "Topic Modeling & Researcher Recommendation System"
domain: "ai"
year: "2025 - 2026"
status: "completed"
summary: "Controlled benchmark evaluating BERTopic with SPECTER embeddings, LDA, and NMF across 11,111 publications. BERTopic achieved the highest accuracy across all 13 recommendation metrics (NDCG@5: 0.736, MRR: 0.809), with LDA performing closely at lower compute cost."
technicalContext: "Undergraduate Thesis Research"
metrics:
  - label: "Evaluated Corpus"
    value: "11,111 publications (3,257 researchers)"
  - label: "Test Split"
    value: "652 held-out researchers"
  - label: "Top Recommendation"
    value: "BERTopic (NDCG@5: 0.736, MRR: 0.809)"
  - label: "Highest Coherence"
    value: "NMF (0.687 coherence, 18.8s runtime)"
technologies:
  - "Python"
  - "scikit-learn"
  - "BERTopic"
  - "Sentence-Transformers"
  - "pandas"
  - "NumPy"
githubUrl: "https://github.com/DimasBaskara666/researchers_placement"
architectureSteps:
  - step: 1
    label: "Corpus Extraction & Preprocessing"
    description: "Extracted and prepared 11,111 publication documents from 3,257 researchers across 12 computer science research groups."
    tag: "Ingest"
  - step: 2
    label: "Topic Modeling Comparison"
    description: "Evaluated LDA (count vectors), NMF (TF-IDF matrix), and BERTopic (SPECTER embeddings) under identical experimental pipelines."
    tag: "Model"
  - step: 3
    label: "Profile Representation"
    description: "Constructed composite researcher and research group topic vectors by averaging title and abstract representations."
    tag: "Profile"
  - step: 4
    label: "Cosine Similarity Ranking"
    description: "Ranked candidate research groups for 652 held-out test researchers using topic vector cosine similarity."
    tag: "Ranking"
  - step: 5
    label: "Benchmark Evaluation"
    description: "Benchmarked ranking across 13 metrics. Found that topic coherence does not predict recommendation performance: NMF had highest coherence but lowest recommendation accuracy."
    tag: "Evaluate"
featured: true
---

Undergraduate thesis research titled "Evaluasi Komparatif Metode Topic Modeling untuk Rekomendasi Peneliti ke Kelompok Riset". The study presents a controlled comparison of a BERTopic-based researcher-to-research-group recommendation framework against Latent Dirichlet Allocation (LDA) and Non-negative Matrix Factorization (NMF) across 11,111 publication documents from 3,257 researchers in 12 computer science research groups.

Results demonstrated that BERTopic obtained the highest score on all 13 recommendation metrics, achieving an NDCG@5 of 0.736 and an MRR of 0.809. LDA delivered recommendation quality close to BERTopic at a fraction of the compute cost (180.3s versus 971.8s execution time). NMF achieved the highest topic coherence (0.687) and fastest execution (18.8s), but ranked last on every recommendation metric. The study established that topic coherence does not reliably predict recommendation quality.
