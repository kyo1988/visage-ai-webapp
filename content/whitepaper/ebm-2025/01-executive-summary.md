# Executive Summary

The 2025 project should be read as a replication audit, not as a validated marketing playbook. Its strongest property is that the archived decision gates preserve unfavorable results. Its principal weakness is that several public claims exceeded what the code measured.

| Analysis | Archived result | Gate or check | Defensible conclusion |
|---|---:|---:|---|
| Duplication of Purchase, dunnhumby | weighted MAD 0.015863 | ≤0.015 | Near-miss; the run failed |
| Duplication of Purchase, Instacart | weighted MAD 0.021854 | ≤0.015 | Failed |
| Double Jeopardy, UCI | Pearson r=0.627 | ≥0.80 | Failed; stationarity also failed |
| Buyer-frequency persistence, UCI Q4 | R²=0.472 | no confirmatory gate | Descriptive association only |
| CEP lexical pipeline, Amazon | r=-0.280 | no valid language-bias test | Not interpretable because the parser and configuration schemas disagree |
| NBD diagnostic, UCI | R²≈-7×10⁻⁶ | no valid goodness-of-fit test | Not interpretable as NBD fit because predictions were set to the sample mean |

Three claims in the previous edition are withdrawn.

1. **There was no top-decile Double Jeopardy analysis.** The value r=0.627 was computed across all 27 retained labels.
2. **R²=0.472 does not measure response to an additional contact.** The model regressed transaction counts across adjacent quarters and included no contact, campaign, or treatment variable.
3. **The archive does not show CEP coverage improving from 38% to 52%.** The logged CEP run retained one language, used ASINs as brand identifiers, and produced no before/after comparison.

The negative results still matter. The weighted DoP calculation did not cross its gate, and the simplified unweighted calculation cannot be substituted to manufacture a pass. That reporting discipline should be retained when the analysis is rebuilt.

The current asset is not decision-ready or publication-ready. Publication requires corrected estimators, versioned analysis code, redistributable or checksum-verified inputs, and an independent rerun from a clean environment.
