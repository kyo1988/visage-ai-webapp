# Dataset Analysis Snapshots

## Dataset 1: Instacart Online Grocery (2017)

### **Dataset Profile**
- **Source**: Kaggle competition data
- **Categories**: Beauty & personal care products
- **Records**: 5M+ transactions
- **Users**: 1,617 active buyers
- **Brands**: 129 distinct brands
- **Time Period**: 26-week rolling window

### **Analysis Results**
- **DoP Analysis**: Weighted MAD = 0.021854 (FAIL - above 0.015 threshold)
- **Simplified Version**: MAD = 0.011934 (PASS - unweighted method)
- **Statistical Validation**: BCa 5000 bootstrap, weekly shuffle tests
- **Key Finding**: Specification-compliant analysis fails, simplified version passes

### **Key Insights**
- Real-world data may not meet theoretical thresholds
- Method choice significantly impacts results
- Statistical rigor reveals data limitations

---

## Dataset 2: dunnhumby The Complete Journey

### **Dataset Profile**
- **Source**: dunnhumby vendor data
- **Categories**: Beauty and personal care
- **Records**: 2.5M+ transactions
- **Users**: 1,735 active buyers
- **Brands**: 46 distinct brands
- **Time Period**: 26-week rolling window

### **Analysis Results**
- **DoP Analysis**: Weighted MAD = 0.015863 (NEAR-MISS - closest to PASS)
- **Gap from Threshold**: +0.000863 (0.015863 vs 0.015 target)
- **Statistical Validation**: All controls passed (BCa CI, weekly shuffle, negative controls)
- **Key Finding**: Best near-miss result across all datasets

### **Key Insights**
- Closest approach to specification-compliant validation
- High-quality data enables better model performance
- Near-miss results provide valuable research insights

---

## Dataset 3: UCI Online Retail II

### **Dataset Profile**
- **Source**: UCI Machine Learning Repository
- **Categories**: Bodycare, haircare, fragrance, nailcare
- **Records**: 900K+ transactions
- **Users**: 1,264 active buyers
- **Brands**: 27 distinct brands
- **Time Period**: 26-week rolling window

### **Analysis Results**
- **DJ Analysis**: Pearson r = 0.627 (FAIL - below 0.80 threshold)
- **Moderation Analysis**: Q4 heavy buyers R² = 0.472 (strongest relationship)
- **Dirichlet Model**: R² = -7.0e-06 (poor fit)
- **Key Finding**: Mixed validation results across different principles

### **Key Insights**
- Buyer moderation effects clearly demonstrated
- Theoretical models show poor fit with real data
- Segment-specific analysis reveals important patterns

---

## Dataset 4: Amazon Beauty Reviews (2018)

### **Dataset Profile**
- **Source**: UCSD/Julian McAuley dataset
- **Categories**: Beauty product reviews
- **Records**: 110K+ reviews
- **Languages**: 27 languages analyzed
- **Matches**: 256 CEP matches identified
- **Time Period**: 2018 data snapshot

### **Analysis Results**
- **CEP Analysis**: English-centric bias detected (r = -0.28, p<0.01)
- **Language Coverage**: 52% English, 38% Japanese, 45% Spanish
- **Statistical Validation**: Wilson CI, H1 correlation analysis
- **Key Finding**: Significant language bias in brand coverage

### **Key Insights**
- Multilingual analysis reveals cultural biases
- Language normalization essential for fair comparison
- Review data limitations for transaction-based analysis

---

## Cross-Dataset Analysis

### **Common Findings**
1. **Specification-Compliant Challenges**: Most datasets fail strict thresholds
2. **Method Sensitivity**: Simplified vs spec-compliant methods show different results
3. **Data Quality Impact**: Higher quality data enables better model performance
4. **Statistical Rigor**: Proper controls reveal data limitations
5. **Theoretical Gaps**: Real-world data may not meet theoretical expectations

### **Validation Results Summary**
- **DoP Analysis**: 1 near-miss (dunnhumby), 1 fail (Instacart)
- **DJ Analysis**: 1 fail (UCI - r=0.627 vs 0.80 target)
- **CEP Analysis**: 1 complete with bias detection (Amazon)
- **Moderation Analysis**: 1 complete with clear effects (UCI)

### **Research Implications**
- Public datasets provide valuable validation opportunities
- Statistical rigor essential for meaningful results
- Near-miss results offer important research insights
- Method transparency crucial for reproducibility

*Analysis based on publicly available datasets for academic research validation of Ehrenberg-Bass marketing science principles.*