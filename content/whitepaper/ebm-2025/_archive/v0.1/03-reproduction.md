# Research Reproduction Guide

## Prerequisites

### **Technical Requirements**
- **Python Environment**: Python 3.9+ with Poetry
- **Data Storage**: 10GB+ free space for datasets
- **Memory**: 8GB+ RAM recommended for large datasets
- **Processing**: Multi-core CPU for bootstrap analysis

### **Required Packages**
- **Core**: pandas, numpy, scipy, scikit-learn
- **Statistical**: statsmodels, scipy.stats
- **Visualization**: matplotlib, seaborn
- **Data Processing**: tqdm, joblib

## Dataset Preparation

### **1. Download Public Datasets**
```bash
# Setup Poetry environment
make setup

# Download datasets
make download-uci        # UCI Online Retail II
make download-instacart  # Instacart (requires Kaggle API)
make download-amazon     # Amazon Beauty Reviews
# dunnhumby: manual download required
```

### **2. Data Preprocessing**
```bash
# Process Amazon data
make prepare-amazon      # Combine JSON files
make process_amazon      # Convert to CSV

# Validate data quality
python scripts/utils/validate_data.py --dataset uci
python scripts/utils/validate_data.py --dataset instacart
```

## Analysis Execution

### **1. Double Jeopardy Analysis**
```bash
# Run DJ analysis
make dj

# Expected output: results/dj_bodycare.csv
# Key metric: Pearson r = 0.627 (target: ≥0.80)
```

### **2. Duplication of Purchase Analysis**
```bash
# Specification-compliant DoP analysis
make dop_ultra

# Expected outputs:
# - results/dop_dunnhumby_beauty_spec_q90_b2_m20.csv (near-miss)
# - results/dop_instacart_shampoo_specification_compliant.csv (fail)
```

### **3. CEP Analysis**
```bash
# CEP coverage analysis
python scripts/stp/run_cep_analysis.py --dataset amazon

# Expected output: results/cep_coverage_complete.csv
# Key finding: English-centric bias (r=-0.28)
```

### **4. Moderation Analysis**
```bash
# Quantile-based moderation analysis
python scripts/eb/run_moderation_analysis.py --dataset uci

# Expected output: results/moderation_bodycare.csv
# Key finding: Q4 heavy buyers R²=0.472
```

## Validation & Quality Control

### **Statistical Validation**
- **BCa Bootstrap**: B=5000 iterations for all key metrics
- **Weekly Shuffle**: Temporal randomization tests
- **Negative Controls**: Validation against random data
- **Stationarity**: Drift detection for time-series analysis

### **Reproducibility Checks**
```bash
# Run complete validation suite
make validate_all

# Check audit logs
ls logs/run_*.jsonl

# Verify figure generation
ls figs/*.png
```

## Expected Results

### **DoP Analysis Results**
- **dunnhumby beauty**: MAD=0.015863 (near-miss, gap: +0.000863)
- **Instacart shampoo**: MAD=0.021854 (fail, above 0.015 threshold)
- **Simplified version**: 2 PASS examples (unweighted MAD)

### **DJ Analysis Results**
- **Pearson correlation**: 0.627 (fail, below 0.80 target)
- **Spearman correlation**: 0.562
- **BCa 95% CI**: [0.275, 0.462] (lower bound below 0.70)

### **CEP Analysis Results**
- **Total matches**: 256 across 27 languages
- **Language bias**: r=-0.28 (p<0.01) English-centric
- **Coverage range**: 38-52% across languages

### **Moderation Analysis Results**
- **Q1 (Light buyers)**: R²=0.00001, Slope=-0.0016
- **Q2 (Moderate buyers)**: R²=0.196, Slope=0.321
- **Q3 (Heavy buyers)**: R²=0.204, Slope=0.765
- **Q4 (Heavy buyers)**: R²=0.472, Slope=3.341

## Troubleshooting

### **Common Issues**
1. **Memory errors**: Reduce dataset size or use chunked processing
2. **Bootstrap timeout**: Reduce B parameter or use parallel processing
3. **Data format errors**: Check CSV encoding and delimiter settings
4. **Missing dependencies**: Run `poetry install` to ensure all packages

### **Performance Optimization**
- Use `--n-jobs` parameter for parallel processing
- Implement chunked processing for large datasets
- Cache intermediate results to avoid recomputation
- Use SSD storage for faster I/O operations

## File Structure

```
marketing-science/
├── results/              # Analysis outputs
│   ├── dj_bodycare.csv
│   ├── dop_dunnhumby_beauty_spec_q90_b2_m20.csv
│   ├── cep_coverage_complete.csv
│   └── moderation_bodycare.csv
├── figs/                 # Generated figures
│   ├── dj_bodycare.png
│   ├── dop_heat_dunnhumby_beauty_spec_q90_b2_m20.png
│   └── buyer_moderation.png
├── logs/                 # Audit logs
│   ├── run_dj_bodycare.jsonl
│   ├── run_dop_dunnhumby_beauty_spec_q90_b2_m20.jsonl
│   └── run_cep_analysis.jsonl
└── scripts/              # Analysis scripts
    ├── eb/              # Ehrenberg-Bass analyses
    ├── stp/             # CEP analyses
    └── utils/           # Common utilities
```

*Reproduction guide for academic validation of Ehrenberg-Bass marketing science principles using public datasets.*