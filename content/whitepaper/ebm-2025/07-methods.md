# Methods

This section describes what the archived scripts did. Labels such as "specification-compliant" and "BCa" are not adopted where the implementation does not meet those definitions.

## Data preparation

- **dunnhumby:** household transactions were joined to product metadata, mapped to a beauty category, and filtered to the most recent 26 weeks in the processed file.
- **Instacart:** orders and products were joined, product names were mapped to shampoo labels, and the most recent 26 weeks were retained.
- **UCI Online Retail II:** invoice rows were transformed into user, date, quantity, category, and derived-label fields. The source describes a giftware retailer; the beauty/bodycare mapping is project-specific.
- **Amazon Review Data (2018):** up to 1,000,000 review rows were converted to TSV and processed in 100,000-row chunks.

Counts reported in this document are post-filter counts from the audit logs, not source-dataset totals.

## Duplication of Purchase

The chosen dunnhumby run applied these conditions:

- category regex: `beauty`
- 26-week window
- user purchase-count quantile: ≥0.90
- at least two retained labels per user
- at least 20 buyers per label
- random seed: 42

The script reduced the data to one row per user-label pair and formed a binary user-label matrix. For each off-diagonal pair it calculated a conditional overlap rate. It then copied the upper-triangle value into the lower triangle. The summary statistic was the weighted mean absolute deviation of upper-triangle values from their weighted mean, using the outer product of retained label counts as weights.

The script ran 5,000 percentile resamples of off-diagonal matrix cells, a within-user week permutation, and a random label-assignment negative control. The output calls the first procedure BCa. It does not calculate bias correction or acceleration and does not resample the primary sampling unit.

## Double Jeopardy

For each retained UCI label, penetration was the number of unique buyers divided by total unique users. Average frequency was row count divided by unique buyers. Pearson and Spearman correlations were computed across labels.

The stationarity routine aggregated weekly penetration and frequency, measured first-to-last relative drift, and combined it with Kendall trend tests. The bootstrap routine attempted 5,000 user resamples, but replacement multiplicity was lost through membership filtering and its penetration denominator differed from the point-estimate denominator.

## Buyer-frequency persistence

Transaction rows were aggregated to user-quarter observations. Purchase-volume quartiles were recomputed within each quarter. Within each quartile, the script standardized the current transaction count and regressed the shifted adjacent-quarter count on it using ordinary least squares. Reported confidence intervals are t-based slope intervals from that regression.

## CEP lexical prototype

The parser detected review language, required at least 20 rows per ASIN-language cell, searched configured substrings, computed Wilson intervals for hit proportions, and correlated total review count with mean lexical coverage. The parser/configuration mismatch described in Finding 4 invalidates the intended dimension and multilingual interpretation.

## Archived evidence

| Run | Input identification | Timestamp |
|---|---|---|
| dunnhumby DoP | SHA prefix `e2470f224f7f0609` | 2025-09-27 14:12:31 |
| Instacart DoP | SHA prefix `fa486f16bde1d909` | 2025-09-27 01:01:06 |
| Amazon CEP | SHA prefix `faa6eadcba54534f` | 2025-09-27 01:22:17 |
| UCI DJ | recorded only as `loaded`; commit `unknown` | 2025-09-23 00:55:12 |
| UCI buyer frequency | recorded only as `loaded`; commit `unknown` | 2025-09-23 13:28:06 |
| UCI NBD diagnostic | recorded only as `loaded`; commit `unknown` | 2025-09-23 13:28:45 |

The absence of hashes and commit identifiers for the UCI runs prevents exact provenance reconstruction.
