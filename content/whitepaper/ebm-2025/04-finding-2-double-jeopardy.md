# Finding 2: The Double Jeopardy Run Failed Its Correlation and Stationarity Checks

The UCI run retained 27 labels and 1,264 users in a 26-week slice. Across those 27 labels, buyer penetration and average transaction frequency among buyers had Pearson r=0.6269 and Spearman r=0.5624.

| Metric | Result | Gate | Decision |
|---|---:|---:|---|
| Pearson correlation | 0.627 | ≥0.80 | FAIL |
| Spearman correlation | 0.562 | descriptive | — |
| Pearson p-value | 0.00047 | not a fit gate | — |
| Logged stationarity | false | required for stable interpretation | FAIL |
| Maximum logged drift | 0.375 | ≤0.10 under the script rule | FAIL |

The result does not support the project's strong Double Jeopardy criterion. It also does not establish a failure of the empirical law. The UCI source is a UK giftware retailer, while the "bodycare" slice and label field were produced by heuristic category and brand transformations. The analysis therefore mixes a theoretical question with uncertain construct validity.

## Correction to the previous edition

The script contains no middle-quantile or top-decile Double Jeopardy split. The value r=0.627 is the correlation across all retained labels. Claims that the relationship held in the middle but weakened among the top 10% are unsupported by this run.

## Interval qualification

The logged interval [0.275, 0.462] does not contain the point estimate 0.627. Code inspection explains the mismatch: the bootstrap path computes penetration with a different denominator than the point-estimate path, and sampling users with replacement is reduced to set membership before recomputation. The interval is not used in this report.
