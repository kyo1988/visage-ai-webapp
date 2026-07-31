# Decision Bridge: Research Validation Guidelines

## Do's

- **Use specification-compliant methods** (weighted MAD, BCa bootstrap)
- **Implement proper statistical controls** (weekly shuffle, negative controls)
- **Report both simplified and spec-compliant results** for transparency
- **Validate across multiple datasets** (Instacart, dunnhumby, UCI)

## Don'ts

- **Don't claim PASS when using simplified methods** (unweighted MAD)
- **Avoid language bias in CEP analysis** without normalization
- **Don't ignore near-miss results** - they provide valuable insights
- **Avoid over-interpretation of poor model fits** (Dirichlet R²≈-7e-06)

## Research Validation Checklist

### Phase 1: Data Preparation
- [ ] Download public datasets (Instacart, dunnhumby, UCI, Amazon)
- [ ] Apply consistent preprocessing (26-week window, brand normalization)
- [ ] Validate data quality (penetration ∈[0,1], frequency ≥1)

### Phase 2: Analysis Execution
- [ ] Run specification-compliant DoP analysis (weighted MAD)
- [ ] Execute DJ analysis with correlation thresholds
- [ ] Perform CEP analysis with language normalization
- [ ] Generate quantile-based moderation analysis

### Phase 3: Statistical Validation
- [ ] Apply BCa Bootstrap (B=5000) for all key metrics
- [ ] Implement weekly shuffle negative controls
- [ ] Test stationarity for time-series analysis
- [ ] Report confidence intervals and significance levels

## Key Research Findings

- **DoP Near-Miss**: 0.015863 (closest to specification-compliant PASS)
- **DJ Analysis**: Failed correlation test (r=0.627 vs 0.80 target)
- **Q4 Heavy Buyers**: R²=0.472 (strongest moderation effect)
- **Language Bias**: r=-0.28 (English-centric bias in CEP analysis)

## So What

Rigorous validation using public datasets reveals that real-world data may not always meet theoretical thresholds, providing valuable insights into market dynamics and the importance of statistical rigor in marketing science research.