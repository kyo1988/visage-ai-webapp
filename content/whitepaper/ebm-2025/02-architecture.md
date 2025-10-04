# Technical Architecture

## Pipeline Overview

The Ehrenberg-Bass validation pipeline processes publicly available datasets through three core stages to test theoretical predictions against real-world evidence. Our approach begins with comprehensive data collection and validation, followed by rigorous model testing and analysis, culminating in results that can be independently reproduced.

**Data Collection & Validation** forms the foundation of our analysis, utilizing public retail basket datasets containing over 5 million transactions across beauty categories. We apply consistent preprocessing protocols including 26-week rolling windows and brand normalization to ensure data quality. Our statistical rigor is maintained through BCa 5000 bootstrap procedures, weekly shuffle tests, and negative controls, with all analyses tested against theoretical requirements (MAD≤0.015, r≥0.80).

**Model Testing & Analysis** encompasses three key methodologies. The Dirichlet analysis employs NBD model fitting with P-P plot validation, revealing poor statistical fit (R²≈-7e-06) that highlights the challenges of applying theoretical models to real-world data. Our CEP analysis processes 256 language-specific matches across 27 languages, detecting significant language bias in brand coverage assessment. Quantile-based buyer segmentation analysis provides insights into how different customer segments respond to marketing interventions.

**Results & Reproduction** demonstrate the practical implications of our findings. DoP analysis shows near-miss validation (0.015863 vs 0.015 threshold), while DJ analysis reveals that models fit well at mid-quantiles but deviate significantly in the top decile (r=0.627 vs 0.80 target). Quantile band analysis shows clear progression from Q1 to Q4 (R²: 0.00001→0.472), with all analyses designed to regenerate from pinned environments within one hour.

## Implications

Rigorous validation reveals that real-world data may not always meet theoretical thresholds, providing valuable insights into market dynamics and the importance of statistical rigor in marketing science research.