# Finding 1: Duplication of Purchase Did Not Cross the Gate

The closest archived run used a 26-week dunnhumby beauty slice after retaining users at or above the 0.90 purchase-count quantile, requiring at least two labels per user, and requiring at least 20 buyers per label. The final matrix contained 1,735 users and 46 labels.

| Metric | Result | Gate | Decision |
|---|---:|---:|---|
| Weighted MAD | 0.015863 | ≤0.015 | FAIL |
| Gap to gate | +0.000863 | — | Near-miss |
| Unweighted MAD | 0.015143 | not the confirmatory metric | No decision |
| Logged interval | [0.014792, 0.016928] | — | Descriptive only |
| Median labels per user | 2.0 | ≥2.0 | Met |
| Negative-control MAD | 0.015629 | ≤0.05 | Met under the project rule |

The Instacart comparison was less favorable: weighted MAD=0.021854 on 1,617 users and 129 labels. Its unweighted MAD was 0.011934. The lower unweighted value cannot replace the pre-specified weighted statistic after the result is known.

## Interpretation

The narrow conclusion is that no archived specification-labelled run crossed all gates. Calling 0.015863 a near-miss is accurate; calling it a pass is not.

The distance from the gate does not show that the Duplication of Purchase law is almost verified. Fourteen filter combinations were examined, and the reported run was selected as the closest result. The threshold is also an internal project rule, not a universal rejection boundary supplied by the underlying theory. A confirmatory replication must fix the category definition, observation window, inclusion rules, duplication estimator, and decision gate before examining the new data.

## Implementation qualification

The current script copies one directional conditional duplication rate into both halves of a symmetric matrix. It also calculates weights after reducing the data to one user-label row, so the values called "purchase-count weights" are effectively retained buyer counts. The logged interval uses percentile resampling of matrix cells, not a bias-corrected and accelerated bootstrap of buyers. These defects prevent inferential use of the interval and require the point estimate to be treated as an archived pipeline output rather than a validated estimator.
