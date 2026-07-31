# Evidence-Based Marketing Playbook
## Public-data replication audit

**Testing Ehrenberg-Bass regularities against four archived retail datasets**

> **Revision notice — July 2026**
>
> This is version 0.2. The original version 0.1 (September 2025) is archived and remains available.
>
> Re-auditing the original analysis code and logs against the published text showed that several statements in v0.1 exceeded what the code measured. Five claims are withdrawn:
>
> 1. **Top-decile Double Jeopardy deviation.** No top-decile or middle-quantile split exists in the script. The reported r=0.627 was computed across all 27 retained labels.
> 2. **R²=0.472 as response to an additional contact.** The regression contains no contact, campaign, or treatment variable. It measures adjacent-quarter frequency persistence only.
> 3. **CEP coverage rising from 38% to 52%.** No before/after comparison exists in the archived output, and the associated `<5% Δaccuracy` statement is removed with it.
> 4. **Language-bias detection across 27 languages.** The logged run retained one language and used ASINs as brand identifiers.
> 5. **Poor Dirichlet model fit.** The evaluation path predicted the sample mean for every user, so R²≈-7×10⁻⁶ evaluates a constant-mean predictor, not the fitted NBD distribution.
>
> Implementation defects were also found in the bootstrap, negative-control, and NBD evaluation paths. The remaining numerical outputs are retained as an audit trail. They are not presented as a validated replication of the Ehrenberg-Bass laws.
>
> What v0.1 got right is retained: the weighted Duplication of Purchase statistic did not cross its pre-set gate, and the simplified unweighted statistic was not substituted to manufacture a pass.

**DoP weighted MAD 0.015863 — FAIL (>0.015) · DJ Pearson r 0.627 — FAIL (<0.80) · Q4 lagged-frequency R² 0.472 — descriptive only · CEP pipeline — not validated**

---

**Author:** Kyo Harada  
**Original analysis:** September 2025<br>
**Revised public edition:** July 2026<br>
**Subject:** Marketing science replication audit

---

### Abstract

This report audits a September 2025 analysis pipeline built from the dunnhumby Complete Journey, Instacart, UCI Online Retail II, and Amazon Review Data (2018) datasets. The archived outputs contain one near-miss and several negative results. The dunnhumby Duplication of Purchase run recorded a weighted mean absolute deviation of 0.015863 against a pre-set 0.015 gate. The UCI Double Jeopardy run recorded Pearson r=0.627 against a 0.80 gate and failed its stationarity check. A buyer-frequency regression produced R²=0.472 in its highest purchase-volume quartile, but it contains no intervention variable and does not estimate a marketing effect.

Re-auditing the code narrows the claims further. The reported bootstrap intervals are percentile intervals rather than BCa intervals; the CEP parser does not match the configuration schema; and the NBD diagnostic evaluates constant-mean predictions rather than fitted NBD predictions. The numerical outputs remain useful as an audit trail. They do not yet constitute a successful replication of the Ehrenberg-Bass laws.

---

*This document reports an exploratory replication attempt. It is not a client case study, causal evaluation, or peer-reviewed result.*
