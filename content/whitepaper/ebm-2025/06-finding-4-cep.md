# Finding 4: The CEP Run Is a Failed Measurement Prototype

The archived Amazon run processed 1,000,000 review rows and wrote 256 aggregate rows covering 58 ASINs. It reported Pearson r=-0.280 between total review count per ASIN and mean lexical hit rate.

That coefficient is not evidence of language bias. The audit log shows one retained language (`en`) and 27 excluded language codes. The run therefore did not compare 27 languages.

## Why the intended construct was not recovered

Two schema mismatches change the meaning of the output.

1. The CEP configuration is organized as `language → dimension → terms`, while the parser expects `dimension → language → terms`. The output consequently records `en` as the sole CEP category rather than quality, value, innovation, sustainability, and convenience.
2. The parser passes ASIN values into a nested brand-normalization dictionary that expects brand-name keys. The retained "brands" are therefore product identifiers.

The variable named penetration is total review count, not buyer penetration. The value r=-0.280 is a correlation between ASIN review volume and the malformed lexical-coverage output.

## Withdrawn claim

No logged result or archived output contains a before/after test showing bottom-five CEP coverage rising from 38% to 52%. The previous edition converted two percentages into an intervention result without an observed intervention. That claim, and the associated `<5% Δaccuracy` statement, are removed.

## NBD diagnostic

The archive also reports NBD parameters and R²≈-7×10⁻⁶. The fitting routine estimates NBD parameters, but the evaluation path predicts the same sample mean for every user. The resulting R² evaluates a constant-mean predictor, not the fitted NBD distribution and not a full NBD-Dirichlet model. It cannot be used to claim that the Dirichlet model fits poorly.
