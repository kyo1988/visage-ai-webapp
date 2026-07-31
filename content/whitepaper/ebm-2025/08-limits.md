# Limits and Claim Boundaries

## 1. The datasets do not form one market

The analyses use grocery orders, household retail transactions, giftware invoices, and product reviews. Market boundaries, buyer identifiers, observation windows, and label construction differ. Agreement or disagreement across these outputs cannot be attributed to one common consumer process without a harmonized design.

## 2. Category and brand validity are unresolved

The UCI source is a UK giftware retailer. Its bodycare category and brand-like labels were created by project heuristics; retained labels include product-description tokens rather than verified beauty brands. The Amazon pipeline retained ASINs rather than normalized brands. These transformations weaken every claim that depends on a stable brand or category unit.

## 3. The DoP estimator requires reimplementation

- Directional conditional duplication was forced into a symmetric matrix by copying one direction.
- Purchase rows were deduplicated before the values used as weights were counted.
- The interval is a percentile interval over pairwise cells, not a BCa interval over independent buyers or households.
- The weekly shuffle check is applied after each user-label pair has been reduced to one row, making repeated weeks structurally unavailable.
- The best run was selected after multiple filter combinations were tried.

These conditions prevent the near-miss from functioning as a confirmatory statistical test.

## 4. The Double Jeopardy interval is invalid

The point estimate and bootstrap use different penetration denominators. Bootstrap draws with replacement are collapsed to membership, so repeated users receive no additional weight. The logged interval excludes the point estimate and is not interpretable. The stationarity check also failed.

## 5. The Q4 regression is non-causal

Purchase-volume quartiles are defined from contemporaneous outcomes, and the model contains no intervention. Higher Q4 R² can arise from the larger variance and persistence of high-volume buyers. No budget allocation or contact-frequency recommendation follows from this regression.

## 6. The CEP and NBD diagnostics do not test their named constructs

The CEP parser and lexicon schemas disagree, leaving one malformed category and one retained language. The NBD evaluation compares observations with a constant mean instead of predictions from the fitted distribution. Neither result can confirm or reject the corresponding theory.

## 7. Reproduction has not been demonstrated

The raw data are not bundled with the public report. Instacart and dunnhumby require account- or terms-mediated acquisition. The local analysis folder is not tied to a recorded Git commit, three logs record the input only as `loaded`, and the advertised one-hour end-to-end guarantee was never evidenced by a clean-room run.

## 8. There was no external review

No peer review, preregistration, or independent replication occurred. Thresholds were project-defined and should not be treated as universal theory tests.

## Claim boundary

The archive supports only this claim: a 2025 exploratory pipeline recorded a near-miss DoP summary and several negative or uninterpretable diagnostics, while preserving enough logs to identify what must be rebuilt. It does not support causal marketing recommendations, validation of the Ehrenberg-Bass laws, or a published failure-to-replicate conclusion.
