# Finding 3: High-Volume Buyers Showed Stronger Adjacent-Quarter Frequency Association

The quarterly UCI analysis assigned users to purchase-volume quartiles within each quarter, then regressed transaction frequency in one observed quarter on the adjacent observed quarter within each quartile. The predictor was standardized before estimation.

| Purchase-volume quartile | Observations | Users | Standardized slope | R² |
|---|---:|---:|---:|---:|
| Q1 | 126 | 107 | -0.002 | 0.00001 |
| Q2 | 88 | 76 | 0.321 | 0.196 |
| Q3 | 77 | 67 | 0.765 | 0.204 |
| Q4 | 190 | 120 | 3.341 | 0.472 |

Q4 had the strongest within-sample association. The result says that adjacent-quarter transaction counts were more predictable among the highest purchase-volume observations under this grouping rule.

## What the model does not identify

There is no marketing-contact variable, treatment assignment, campaign exposure, stock measure, or price control in the regression. R²=0.472 therefore does not mean that one additional contact causes repeat purchase, nor that the model explains 47% of incremental sales.

The script names the shifted value `freq_t1`, but the shift points to the previous recorded quarter. Quartile membership is calculated from purchase volume in each quarter rather than from a fixed pre-period. These choices allow outcome-related grouping and make the Q1–Q4 comparison partly mechanical. A causal or predictive follow-up must define a fixed baseline cohort, preserve time direction, hold out later periods, and introduce the exposure whose effect is being estimated.
