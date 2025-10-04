# Technical Architecture

## Pipeline Overview

The Ehrenberg-Bass validation pipeline processes publicly available datasets through four core stages to test theoretical predictions against real-world evidence.

### 1. **Data Collection**
- **Instacart**: 5M+ transactions across beauty categories
- **dunnhumby**: 2.5M+ transactions (beauty & personal care)
- **UCI**: 900K+ transactions (bodycare, haircare, fragrance)
- **Amazon**: Review data for CEP analysis (256 matches, 27 languages)

### 2. **Specification Validation**
- **Invariants**: Penetration∈[0,1], frequency≥1 (buyers), duplication symmetry
- **Statistical Rigor**: BCa 5000 bootstrap, weekly shuffle tests, negative controls
- **Threshold Testing**: Against theoretical requirements (MAD≤0.015, r≥0.80)

### 3. **Model Testing**
- **Dirichlet**: NBD model fitting with P-P plot validation (R²≈-7e-06)
- **CEP**: Multilingual coverage analysis with language bias detection
- **Moderation**: Quantile-based buyer segmentation analysis

### 4. **Results & Validation**
- **DoP Analysis**: Near-miss validation (0.015863 vs 0.015 threshold)
- **DJ Analysis**: Failed correlation test (r=0.627 vs 0.80 target)
- **Quantile Bands**: Q1-Q4 progression (R²: 0.00001→0.472)

## So What

Rigorous validation reveals that real-world data may not always meet theoretical thresholds, providing valuable insights into market dynamics and the importance of statistical rigor in marketing science research.