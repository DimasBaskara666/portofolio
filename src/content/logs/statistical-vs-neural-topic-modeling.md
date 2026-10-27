---
title: "Statistical vs Neural Topic Modeling for Researcher Recommendation"
description: "An engineering comparison of LDA, NMF, and BERTopic applied to academic publication abstracts, examining semantic coherence, computational trade-offs, and vector-space recommendation mechanics."
publishDate: "2026-10-18"
category: "AI / ML / NLP"
tags:
  - "Topic Modeling"
  - "NLP"
  - "BERTopic"
  - "LDA"
  - "NMF"
  - "Embeddings"
readTime: "8 min read"
---

### The problem of scientific collaboration discovery

Matching researchers across departmental boundaries is a recurring challenge in academic institutions. Standard bibliographic searches rely on exact keyword matches, which stumble on the vocabulary problem: researchers in bioinformatics, statistics, and machine learning often investigate identical algorithmic problems while using entirely different vocabularies.

To address this, my undergraduate research evaluated automated topic modeling on scientific literature corpora, comparing classic statistical baselines with modern transformer-based clustering to power a researcher recommendation pipeline.

---

### Baseline 1: Latent Dirichlet Allocation (LDA)

Latent Dirichlet Allocation treats documents as probabilistic mixtures over topics, where each topic is a probability distribution over words.

```python
# Traditional LDA pipeline using scikit-learn
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.decomposition import LatentDirichletAllocation

vectorizer = CountVectorizer(max_df=0.95, min_df=2, stop_words='english')
doc_term_matrix = vectorizer.fit_transform(abstracts)

lda_model = LatentDirichletAllocation(
    n_components=15,
    random_state=42,
    learning_method='batch'
)
lda_model.fit(doc_term_matrix)
```

#### Observations and trade-offs
- **Low compute requirements**: Trained quickly on standard CPU cores using Gibbs sampling or variational inference.
- **Bag-of-words bottleneck**: Completely discards word order and syntactic structure.
- **Noise sensitivity**: Academic abstracts are relatively short (150 to 250 words). LDA struggled with sparsity, often grouping common academic phrases (such as "experimental results show" or "proposed framework") into artificial topics.
- **Forced assignment**: Every document must be assigned a distribution across all topics, even if an abstract represents an outlier that does not fit neatly into any domain cluster.

---

### Baseline 2: Non-Negative Matrix Factorization (NMF)

Non-Negative Matrix Factorization decomposes a document-term matrix $V$ (weighted with TF-IDF) into two non-negative factor matrices: $W$ (document-topic weights) and $H$ (topic-term weights):

$$V \approx W \times H$$

```python
# NMF with TF-IDF representation
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import NMF

tfidf_vectorizer = TfidfVectorizer(max_df=0.90, min_df=3, stop_words='english')
tfidf_matrix = tfidf_vectorizer.fit_transform(abstracts)

nmf_model = NMF(n_components=15, init='nndsvd', random_state=42)
W = nmf_model.fit_transform(tfidf_matrix)
H = nmf_model.components_
```

#### Observations and trade-offs
- **Superior coherence over LDA**: Because TF-IDF discounts ubiquitously occurring academic terms, NMF generated more distinct and readable topic word lists than LDA on the same abstract collection.
- **Deterministic initialization**: Using Nonnegative Double Singular Value Decomposition (NNDSVD) initialization provided consistent topic boundaries between experimental runs.
- **Still lexical**: Like LDA, NMF cannot recognize that "convolutional neural network" and "deep vision model" represent the same concept without explicit co-occurrence data.

---

### The Neural Alternative: BERTopic with Domain Embeddings

BERTopic modularizes topic modeling into distinct, swappable components:
1. **Transformer embeddings**: Dense representation extraction via Sentence-Transformers or scientific models such as SPECTER.
2. **Dimensionality reduction**: Manifold projection using UMAP.
3. **Density-based clustering**: Neighborhood grouping using HDBSCAN.
4. **Topic representation**: Class-based TF-IDF (c-TF-IDF) scoring.

```python
# Modular BERTopic configuration with domain-adapted embeddings
from bertopic import BERTopic
from sentence_transformers import SentenceTransformer
from umap import UMAP
from hdbscan import HDBSCAN

# Load scientific citation-trained embedding model
embedding_model = SentenceTransformer('allenai-specter')

# Configure manifold projection preserving local topology
umap_model = UMAP(
    n_neighbors=15,
    n_components=5,
    min_dist=0.0,
    metric='cosine',
    random_state=42
)

# Configure density clustering with minimum topic size
hdbscan_model = HDBSCAN(
    min_cluster_size=10,
    metric='euclidean',
    cluster_selection_method='eom',
    prediction_data=True
)

topic_model = BERTopic(
    embedding_model=embedding_model,
    umap_model=umap_model,
    hdbscan_model=hdbscan_model,
    calculate_probabilities=False,
    verbose=True
)

topics, _ = topic_model.fit_transform(abstracts)
```

#### Key advantages in publication analysis
- **Contextual comprehension**: Pre-trained embeddings project semantically related phrases into adjacent regions in vector space, resolving synonymy and polysemy.
- **Outlier handling via HDBSCAN**: Rather than forcing a multi-topic distribution onto an idiosyncratic or poorly scanned abstract, HDBSCAN flags unclassifiable documents as noise (label `-1`). This preserves high semantic purity within discovered topic clusters.
- **Dynamic topic reduction**: Hierarchical cluster merging allows fine-grained subtopics to be collapsed systematically without retraining the embedding layer.

---

### Connecting topic modeling to researcher recommendations

Once topics are extracted, the recommendation pipeline maps individual authors into the learned topic space. 

For each researcher:
1. Aggregate their authored publication abstracts into a composite topic weight vector $\vec{R}_i$.
2. Filter candidate collaborators who share thematic overlap but lack existing co-authorship edges in the institution graph.
3. Compute cosine similarity across topic vectors:

$$\text{Sim}(R_a, R_b) = \frac{\vec{R}_a \cdot \vec{R}_b}{\|\vec{R}_a\| \|\vec{R}_b\|}$$

```python
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def calculate_author_similarity(profile_a: np.ndarray, profile_b: np.ndarray) -> float:
    """Calculate cosine similarity between two topic distribution vectors."""
    score = cosine_similarity(profile_a.reshape(1, -1), profile_b.reshape(1, -1))
    return float(score[0][0])
```

---

### Architectural summary and engineering takeaways

1. **Match model complexity to dataset scale**: For small, clean text collections where rapid interpretation is paramount, NMF with TF-IDF provides an exceptional baseline with minimal computational overhead.
2. **Pre-trained embeddings solve the vocabulary barrier**: When text spans disparate fields, semantic embeddings (such as SPECTER) are indispensable for bridging different naming conventions.
3. **Outlier isolation protects downstream matching**: Utilizing density clustering with noise rejection prevents weak, peripheral publications from skewing a researcher's recommendation profile.
