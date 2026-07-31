# Reproduction and Publication Checklist

The current archive is not reproducible from the public report alone. This checklist defines the work required before the study can be described as a replication.

## Freeze the research design

- [ ] Define each market and category without post-result filtering.
- [ ] Define the brand unit and publish the normalization table.
- [ ] Fix the observation window and buyer-inclusion rule before analysis.
- [ ] Justify each decision gate from prior literature or label it explicitly as exploratory.
- [ ] Separate exploratory parameter search from a held-out confirmatory run.

## Repair the estimators

- [ ] Compute both directional duplication rates or use a symmetric overlap statistic whose denominator is defined in advance.
- [ ] Resample buyers or households, preserving replacement multiplicity.
- [ ] Implement an actual BCa interval, including bias correction and acceleration, or rename the interval.
- [ ] Run temporal controls on non-deduplicated event data and specify the null being tested.
- [ ] Use identical definitions in the Double Jeopardy point estimate and bootstrap.
- [ ] Define buyer quartiles from a fixed baseline period and evaluate later periods out of sample.
- [ ] Align the CEP parser with the lexicon schema and join ASINs to verified brand metadata.
- [ ] Evaluate NBD probabilities or quantiles generated from the fitted model rather than a constant mean.

## Freeze provenance

- [ ] Place the analysis code in version control and record a commit SHA in every run.
- [ ] Record full SHA-256 hashes for every raw and processed input.
- [ ] Publish dataset acquisition dates, licenses, and transformation scripts.
- [ ] Lock the Python version and dependencies.
- [ ] Store result tables and figures outside an opaque archive with a manifest of hashes.

## Validate from a clean environment

- [ ] Acquire each dataset from its documented source.
- [ ] Rebuild processed inputs without reusing local caches.
- [ ] Run unit tests on a small hand-checkable buyer-brand matrix.
- [ ] Recompute all primary statistics from one documented command.
- [ ] Confirm that a second operator obtains identical outputs.
- [ ] Measure actual runtime before making any time-to-reproduce claim.

## Publication gate

- [ ] Report all attempted specifications or register the confirmatory one in advance.
- [ ] Distinguish failure of a project threshold from failure of a theory.
- [ ] Release code and non-restricted derived artifacts.
- [ ] Obtain an independent statistical review.
- [ ] Submit the corrected study as a replication attempt only after the above items pass.

## Archived output names

The September 2025 audit trail identifies these primary outputs:

- `results/dop_dunnhumby_beauty_spec_q90_b2_m20.csv`
- `results/dop_instacart_shampoo_specification_compliant.csv`
- `results/dj_bodycare.csv`
- `results/moderation_bodycare.csv`
- `results/cep_coverage_complete.csv`
- `results/dirichlet_bodycare.csv`

These filenames identify the historical snapshot. They are not evidence that the current pipeline reproduces from a clean checkout.
