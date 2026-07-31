# What We Measured

The project combined four datasets that differ in sampling frame, market definition, and unit of observation. Their outputs cannot be pooled as if they described one market or one period.

| Dataset | Role in the archive | Logged analysis sample |
|---|---|---:|
| dunnhumby Complete Journey | Duplication of Purchase | 1,735 households, 46 retained labels |
| Instacart Online Grocery Shopping 2017 | Duplication of Purchase comparison | 1,617 users, 129 retained labels |
| UCI Online Retail II | Double Jeopardy, buyer-frequency persistence, NBD diagnostic | 1,264 users and 27 labels for DJ; 1,666 users for the quarterly analysis; 1,648 users for NBD |
| Amazon Review Data (2018) | lexical CEP prototype | 1,000,000 review rows processed; 58 ASINs in the retained output |

## Research questions

### 1. Duplication of Purchase

The intended question was whether cross-brand buyer duplication remains close to a common level in a repertoire market. The project summarized off-diagonal duplication values with a weighted mean absolute deviation and compared the result with an internal gate of 0.015.

### 2. Double Jeopardy

The UCI run correlated each retained label's buyer penetration with its average transaction frequency among buyers. The internal gate required Pearson r≥0.80 and a lower confidence bound of at least 0.70.

### 3. Purchase-frequency persistence

Users were assigned to purchase-volume quartiles within each calendar quarter. Within each quartile, the script regressed one quarter's transaction count on the adjacent observed quarter's transaction count. This measures within-user frequency persistence under the script's grouping rule. It does not measure response to advertising, reminders, or incremental contact.

### 4. CEP lexical coverage

The intended construct was the prevalence of Category Entry Point language in product reviews. The implemented run searched a multilingual lexicon, aggregated hits by ASIN and detected language, and correlated average lexical coverage with review count. A configuration-schema mismatch prevents the output from measuring the intended CEP dimensions or multilingual coverage.

## What was not measured

The project did not observe a 2025 Q3 client market, did not run a marketing intervention, did not estimate incremental sales, did not compare a 38% baseline with a 52% post-treatment value, and did not test Double Jeopardy separately in middle and top buyer quantiles.
