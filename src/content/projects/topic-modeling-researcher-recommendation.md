---
title: "Topic Modeling & Researcher Recommendation System"
domain: "ai"
year: "2025 - 2026"
status: "completed"
summary: "Comparative research study evaluating LDA, NMF, and BERTopic with SPECTER embeddings across 11,111 publication documents to recommend researcher-to-group placements, achieving a top Test NDCG@5 of 0.8127 with NMF."
technicalContext: "Undergraduate Thesis Research"
metrics:
  - label: "Evaluated Corpus"
    value: "11,111 publications"
  - label: "Test Split"
    value: "652 held-out researchers"
  - label: "Best Configuration"
    value: "NMF + Cosine (NDCG@5: 0.8127)"
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
    description: "Extracted and prepared 11,111 publication documents from 3,257 researchers across 12 CSRankings areas."
    tag: "Ingest"
  - step: 2
    label: "Topic Modeling Comparison"
    description: "Evaluated LDA (count vectors), NMF (TF-IDF matrix), and BERTopic (SPECTER embeddings) under identical train/test splits."
    tag: "Model"
  - step: 3
    label: "Researcher Profile Construction"
    description: "Constructed composite researcher and research group topic vectors from publication representations."
    tag: "Profile"
  - step: 4
    label: "Cosine Similarity Ranking"
    description: "Ranked candidate research groups for 652 held-out test researchers using topic vector cosine similarity."
    tag: "Ranking"
  - step: 5
    label: "Multi-Metric Evaluation"
    description: "Benchmarked ranking quality using Precision@K, Recall@K, F1@K, NDCG@K, and Mean Reciprocal Rank (MRR)."
    tag: "Evaluate"
featured: true
---

Undergraduate thesis research titled "Evaluasi Komparatif Metode Topic Modeling untuk Rekomendasi Peneliti ke Kelompok Riset". The study evaluates whether topic distributions derived from publication titles and abstracts can accurately match researchers to specialized computer science research groups.
