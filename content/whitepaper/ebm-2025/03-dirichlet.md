# Dirichlet Analysis: NBD Model Validation

## Purpose

To test the NBD-Dirichlet model's ability to fit real-world purchase data and validate its theoretical predictions against public dataset evidence.

## Model Implementation

- **Method**: Maximum Likelihood Estimation (MLE)
- **Data**: UCI bodycare transactions (900K+ records)
- **Validation**: P-P plot analysis for goodness-of-fit

## Key Results

| Metric | Value | Interpretation |
|--------|-------|----------------|
| R² | -7.0e-06 | Poor model fit |
| Std Dev | 181.9 | High variance in purchase data |
| MLE Status | ✅ Converged | Model parameters estimated |

## Statistical Validation

- **P-P Plot**: Shows weak fit across quantiles
- **High Variance**: Purchase data exhibits extreme variability
- **Illustrative Only**: Model fit insufficient for statistical inference

## Dataset Characteristics

- **Users**: 1,264 active buyers
- **Brands**: 27 distinct brands
- **Categories**: Bodycare, haircare, fragrance, nailcare
- **Time Period**: 26-week rolling window

## So What

The NBD-Dirichlet model shows poor fit with real-world data (R²≈-7e-06), suggesting that theoretical models may require significant adaptation for practical application in diverse market contexts.