# Reproduction Checklist: 1-Hour Validation

## Steps

1. **Data Download**: Download public datasets (Instacart, dunnhumby, UCI, Amazon)
2. **DoP Analysis**: Run specification-compliant weighted MAD calculation
3. **DJ Analysis**: Execute correlation analysis with threshold testing
4. **CEP Processing**: Perform multilingual coverage analysis with bias detection
5. **Moderation Analysis**: Generate quantile-based buyer segmentation

## Deliverables

**Generated Files:**
- `results/dop_dunnhumby_beauty_spec_q90_b2_m20.csv` (DoP near-miss results)
- `results/dj_bodycare.csv` (DJ analysis results)
- `results/cep_coverage_complete.csv` (CEP analysis results)
- `results/moderation_bodycare.csv` (quantile moderation results)
- `figs/dop_heat_dunnhumby_beauty_spec_q90_b2_m20.png` (DoP heatmap)

## Requirements

**Environment:** Python 3.9+, Poetry, pandas, numpy, scipy, scikit-learn

**Data Sources:** Public datasets (Instacart, dunnhumby, UCI, Amazon)

**Validation:** BCa Bootstrap (B=5000), weekly shuffle, negative controls, stationarity tests

## Quick Start

```bash
# Setup environment
make setup

# Download datasets
make download-uci
make download-instacart
make download-amazon

# Run analyses
make dj
make dop_ultra
make validate_all
```

## So What

Systematic reproduction enables independent validation of Ehrenberg-Bass principles using public datasets, ensuring transparency and reproducibility in marketing science research.
