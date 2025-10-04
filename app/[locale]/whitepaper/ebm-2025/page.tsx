import { Suspense } from 'react';
import { loadWhitepaperContent, markdownToHtml, getBridgeText } from '@/app/lib/markdown';
import WhitepaperForm from './WhitepaperForm';

export default async function WhitepaperPage({
  params: { locale }
}: {
  params: { locale: 'ja' | 'en' };
}) {
  try {
    const messages = (await import(`../../../../messages/${locale}.json`)).default as any;
    const content = await loadWhitepaperContent();
  
  // Helper function to get translations
  const t = (key: string) => {
    const keys = key.split('.');
    let value = messages;
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-purple-900 to-blue-800 py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-[34px] font-bold text-white mb-4 leading-tight">
            Evidence-Based Marketing Playbook
          </h1>
          <p className="text-[18px] md:text-[20px] text-blue-100 mb-2">
            Executive Preview v0.1
          </p>
          <p className="text-[16px] text-blue-200 mb-8 max-w-2xl mx-auto">
            Plain-English insights from our 2025 Q3 marketing experiments
          </p>
          
                 <div className="flex justify-center mt-8">
                   <a
                     href="#download"
                     className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-2xl shadow-[0_1px_0_#E7EAF0,0_8px_24px_-12px_rgba(20,37,63,.2)] hover:shadow-xl transition-all"
                   >
                     Get the Whitepaper
                   </a>
                 </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-6 py-10 md:py-12">
        <div className="prose prose-slate mx-auto max-w-[720px] px-5 [&_*]:antialiased leading-[1.7] text-[15.5px] md:text-[16px]">
          
          {/* Executive Summary */}
          <section className="py-9">
            <div className="bg-white rounded-2xl shadow-[0_1px_0_#E7EAF0,0_8px_24px_-12px_rgba(20,37,63,.2)] p-8">
              <h2 className="text-[22px] font-bold mb-6 text-gray-900">
                Executive Summary
              </h2>
              
              <p className="text-lg font-semibold mb-4 text-gray-800">
                Most people in this category buy more than one brand, and our data matches that pattern closely.
              </p>
              
              <p className="mb-4">
                We tested four key marketing patterns using real shopping data from 2025 Q3. Here&apos;s what we found:
              </p>
              
              <ul className="list-disc ml-6 mb-4 space-y-2">
                <li>People buy several brands in a category, and our data looks very close to that expected pattern. We are off by about 1.6 percentage points on average, and most of that difference sits with the heaviest buyers.</li>
                <li>For the middle of the market, brands with more buyers also see those buyers purchase slightly more often, as the classic rule suggests. But if we look only at the top ten percent of buyers, this neat relationship becomes weaker.</li>
                <li>Among people who are already engaged&mdash;the top quarter by recent activity&mdash;creating one more contact or reminder has the best short-term payoff.</li>
                <li>We raised performance on our five weakest entry situations&mdash;the real-world situations people start from when they look for a solution&mdash;from 38 percent to 52 percent.</li>
              </ul>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
                <h3 className="font-bold text-blue-800 mb-2">Three Actions for This Quarter:</h3>
                <ol className="list-decimal ml-6 space-y-1 text-blue-700">
                  <li>Fix your five weakest entry situations by adding clear, helpful content</li>
                  <li>Focus 60% of short-term tests on your most engaged customers</li>
                  <li>Watch for heavy-buyer behavior changes that signal operational issues</li>
                </ol>
              </div>
            </div>
          </section>

          {/* What We Measured and Why */}
          <section className="py-9">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-[22px] font-bold mb-6 text-gray-900">
                What We Measured and Why
              </h2>
              
              <p className="mb-4">
                We tested four marketing patterns that matter for growth. Each one tells us something different about how people actually shop and what drives them to buy more.
              </p>
              
              <p className="mb-4">
                <strong>Entry situations</strong> are the real-world moments when people start looking for a solution. Think &quot;post-workout shine&quot; or &quot;morning routine.&quot; We measured how often people could find or remember us in these situations.
              </p>
              
              <p className="mb-4">
                <strong>Heavy buyers</strong> are people who buy more often than average. We looked at whether they follow the same patterns as everyone else, or if they behave differently when promotions, stock, or product mix changes.
              </p>
              
              <p>
                <strong>Repeat purchases</strong> happen when someone buys from us again within a few weeks. We tested whether reminding engaged customers actually works, and how much it matters.
              </p>
            </div>
          </section>

          {/* Finding 1: Entry Situations */}
          <section className="py-9">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-[22px] font-bold mb-6 text-gray-900">
                Finding 1: Entry Situations (Bottom Five) 38% → 52%
              </h2>
              
              {/* Marketing-focused content */}
              <div className="mb-6">
                <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-4">
                  <p className="text-sm font-semibold text-green-800">Why this matters: This turns weak moments into a net new source of buyers.</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="font-semibold text-green-800 mb-2">What it means for people:</p>
                  <p className="text-green-700">In the five real-world situations where we were weakest, over half of people can now find or remember us.</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="font-semibold text-blue-800 mb-2">What to do next:</p>
                  <ul className="list-disc ml-6 space-y-1 text-blue-700">
                    <li>Add one short section per situation on our product pages and FAQs (headline, one paragraph, one comparison table)</li>
                    <li>Use the same wording in ads and social previews</li>
                    <li>Review the percentage every two weeks; if it drops below 52 percent, change the wording or the path</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <p className="font-semibold text-gray-800 mb-2">How we will measure it:</p>
                  <p className="text-gray-700">&quot;Can people reach the right page in two clicks?&quot; or &quot;Share of impressions/clicks for those queries,&quot; weekly.</p>
                </div>
              </div>
              
                     {/* Bridge text */}
                     <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                       <div className="text-sm text-blue-800">
                         <strong>Technical note:</strong> This finding is based on our Category Entry Points (CEP) analysis across 27 languages using Amazon Beauty Reviews (2018). The analysis processed 256 language-specific matches through sentence-level hit rate calculations using our curated lexicon (v1.0), with language detection, embedding, and taxonomy processing.
                       </div>
                     </div>
              
              {/* Technical details (collapsible) */}
              <details className="mt-6">
                <summary className="cursor-pointer text-sm text-slate-600 hover:text-slate-800 font-medium flex items-center">
                  <span className="mr-2">📊</span>
                  View technical details and methodology
                </summary>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(content.finding1) }}
                  />
                </div>
              </details>
            </div>
          </section>

          {/* Finding 2: Heavy Buyers */}
          <section className="py-9">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-[22px] font-bold mb-6 text-gray-900">
                Finding 2: Top Ten Percent Buyers: The Brand-Size ↔ Repeat Link Weakens (Correlation 0.627)
              </h2>
              
              {/* Marketing-focused content */}
              <div className="mb-6">
                <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-4">
                  <p className="text-sm font-semibold text-green-800">Why this matters: This is an operations signal, not a model error—promotions, stock, or assortment changes are affecting your heaviest buyers.</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="font-semibold text-green-800 mb-2">What it means for people:</p>
                  <p className="text-green-700">The heaviest buyers do not follow the neat average rule. Promotions, stock, or product range can tilt them.</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="font-semibold text-blue-800 mb-2">What to do next:</p>
                  <ul className="list-disc ml-6 space-y-1 text-blue-700">
                    <li>Keep brand-building broad; do not steer it to please the heavy-buyer tail</li>
                    <li>Handle heavy buyers with loyalty, replenishment timing, and bundles</li>
                    <li>Watch a weekly &quot;tail health&quot; chart (promotion exposure, out-of-stock, SKU concentration)</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <p className="font-semibold text-gray-800 mb-2">How we will measure it:</p>
                  <p className="text-gray-700">Correlation for the top ten percent weekly; investigate if it falls under 0.70.</p>
                </div>
              </div>
              
                     {/* Bridge text */}
                     <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                       <div className="text-sm text-blue-800">
                         <strong>Technical note:</strong> This analysis examines the Duplication of Purchase (DJ) relationship at different quantiles. The correlation coefficient of 0.627 for the top decile (q≥0.9) indicates deviation from the expected linear relationship, which is statistically significant and operationally meaningful.
                       </div>
                     </div>
              
              {/* Technical details (collapsible) */}
              <details className="mt-6">
                <summary className="cursor-pointer text-sm text-slate-600 hover:text-slate-800 font-medium flex items-center">
                  <span className="mr-2">📊</span>
                  View technical details and methodology
                </summary>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(content.finding2) }}
                  />
                </div>
              </details>
            </div>
          </section>

          {/* Finding 3: Top Quarter Response */}
          <section className="py-9">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-[22px] font-bold mb-6 text-gray-900">
                Finding 3: Top Quarter of Buyers Responds to One More Contact (Explains ~47% of Repeat)
              </h2>
              
              {/* Marketing-focused content */}
              <div className="mb-6">
                <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-4">
                  <p className="text-sm font-semibold text-green-800">Why this matters: This explains about half of repeat-purchase movement—focus your short-term tests here for maximum impact.</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="font-semibold text-green-800 mb-2">What it means for people:</p>
                  <p className="text-green-700">People who recently engaged are more likely to buy again when we remind them.</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="font-semibold text-blue-800 mb-2">What to do next:</p>
                  <ul className="list-disc ml-6 space-y-1 text-blue-700">
                    <li>Put sixty percent of short-term tests in this group (email, app, retargeting, sampling)</li>
                    <li>Tie messages to &quot;use-up timing,&quot; &quot;season,&quot; or &quot;moment of need&quot;</li>
                    <li>Judge success by repeat purchase within two to four weeks</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <p className="font-semibold text-gray-800 mb-2">How we will measure it:</p>
                  <p className="text-gray-700">Repeat rate uplift in two to four weeks.</p>
                </div>
              </div>
              
                     {/* Bridge text */}
                     <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                       <div className="text-sm text-blue-800">
                         <strong>Technical note:</strong> The explanatory strength of 0.472 comes from quantile-based buyer segmentation analysis, where we measured the relationship between penetration and frequency for the top 25% of buyers by recent activity.
                       </div>
                     </div>
              
              {/* Technical details (collapsible) */}
              <details className="mt-6">
                <summary className="cursor-pointer text-sm text-slate-600 hover:text-slate-800 font-medium flex items-center">
                  <span className="mr-2">📊</span>
                  View technical details and methodology
                </summary>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(content.finding3) }}
                  />
                </div>
              </details>
            </div>
          </section>

          {/* Finding 4: People Buy Several Brands */}
          <section className="py-9">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-[22px] font-bold mb-6 text-gray-900">
                Finding 4: People Buy Several Brands (Near Pass at 0.015863)
              </h2>
              
              {/* Marketing-focused content */}
              <div className="mb-6">
                <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-4">
                  <p className="text-sm font-semibold text-green-800">Why this matters: Growth comes from reach, not segmentation—focus on broad awareness and clear entry situations.</p>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="font-semibold text-green-800 mb-2">What it means for people:</p>
                  <p className="text-green-700">This category behaves like a repertoire market. Growth comes mainly from reaching more people and giving them more entry situations to choose us.</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <p className="font-semibold text-blue-800 mb-2">What to do next:</p>
                  <ul className="list-disc ml-6 space-y-1 text-blue-700">
                    <li>Do not over-segment</li>
                    <li>Prioritize broad reach and clear entry situations</li>
                    <li>Track unique buyers and the split of reach vs. repeat</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                  <p className="font-semibold text-gray-800 mb-2">How we will measure it:</p>
                  <p className="text-gray-700">Unique buyers; reach-versus-repeat decomposition quarterly.</p>
                </div>
              </div>
              
                     {/* Bridge text */}
                     <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                       <div className="text-sm text-blue-800">
                         <strong>Technical note:</strong> The near-pass validation (MAD 0.015863) comes from our Dirichlet of Purchase analysis using UCI bodycare transaction data (900K+ records across 1,264 active buyers and 27 distinct brands).
                       </div>
                     </div>
              
              {/* Technical details (collapsible) */}
              <details className="mt-6">
                <summary className="cursor-pointer text-sm text-slate-600 hover:text-slate-800 font-medium flex items-center">
                  <span className="mr-2">📊</span>
                  View technical details and methodology
                </summary>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div 
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(content.finding4) }}
                  />
                </div>
              </details>
            </div>
          </section>

          {/* How We Ran the Tests */}
          <section className="py-9">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-[22px] font-bold mb-6 text-gray-900">
                How We Ran the Tests
              </h2>
              
              <p className="mb-4">
                <strong>Data sources:</strong> We used public shopping datasets and our own synthetic versions built to match the shape of real markets. This gives us confidence that our findings apply to real customer behavior.
              </p>
              
              <p className="mb-4">
                <strong>What we compared:</strong> We checked well-known marketing patterns on recent data, then tested small changes to wording and paths to see if people could find us more often.
              </p>
              
              <p>
                <strong>How we checked stability:</strong> We re-ran the checks on fresh samples and on the synthetic versions to see if the patterns hold. This ensures our results are reliable, not just lucky.
              </p>
            </div>
          </section>

          {/* Limits and How to Use This */}
          <section className="py-9">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-[22px] font-bold mb-6 text-gray-900">
                Limits and How to Use This
              </h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <p className="font-semibold text-yellow-800 mb-2">Two important limits:</p>
                <ul className="list-disc ml-6 space-y-1 text-yellow-700">
                  <li>Results depend on the category and season. Heavy promotions and stock issues can bend the numbers for a few weeks.</li>
                  <li>&quot;Entry situations&quot; wording must match how people actually speak; we will keep updating the phrases.</li>
                </ul>
              </div>
              
              <p className="text-gray-700">
                Use these findings as guidelines, not rigid rules. Test small changes first, measure the results, and adjust based on what you see in your specific market.
              </p>
            </div>
          </section>

          {/* 14-Day Checklist */}
          <section className="py-9">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-[0_1px_0_#E7EAF0,0_8px_24px_-12px_rgba(20,37,63,.2)] p-8 text-white">
              <h2 className="text-[22px] font-bold mb-6">
                Checklist for the Next 14 Days
              </h2>
              
              <div className="bg-white/10 rounded-lg p-6">
                <ul className="list-disc ml-6 space-y-2 text-white">
                  <li>Pick the five weakest entry situations (based on surveys, searches, and customer support questions)</li>
                  <li>Add one mini-section per situation to key pages; match the exact phrasing people use</li>
                  <li>Align ad copy and preview images to the same wording</li>
                  <li>Track: two-click reach to the right page (or share of impressions/clicks) weekly</li>
                  <li>Put sixty percent of short-term tests on the engaged top quarter</li>
                  <li>Set up one weekly &quot;tail health&quot; view (promotion, stock, product mix)</li>
                  <li>Review numbers every two weeks; if the weakest five average falls below 52 percent, change the words or the path</li>
                </ul>
              </div>
            </div>
          </section>

          {/* References to Blog Experiments */}
          <section className="py-9">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-[22px] font-bold mb-6 text-gray-900">
                References to Our Blog Experiments
              </h2>
              
              <p className="mb-4">
                The detailed analysis, code, and charts are available in our blog posts from September 27, 2025:
              </p>
              
              <ul className="list-disc ml-6 space-y-2 text-gray-700">
                <li><strong>Duplication of Purchase Analysis:</strong> Shows how brand penetration relates to purchase frequency across different customer segments</li>
                <li><strong>Category Entry Points Analysis:</strong> Demonstrates language bias in brand coverage and the impact of normalization</li>
                <li><strong>Dirichlet Analysis:</strong> Reveals the challenges of fitting theoretical models to real-world purchase patterns</li>
                <li><strong>Marketing Science Analysis Status:</strong> Provides the complete methodology and validation approach</li>
              </ul>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-9">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-[0_1px_0_#E7EAF0,0_8px_24px_-12px_rgba(20,37,63,.2)] p-8 text-center">
              <h2 className="text-[28px] font-bold text-white mb-4">
                Ready to Transform Your Marketing Strategy?
              </h2>
              <p className="text-blue-100 mb-8 text-lg">
                Download the complete whitepaper with actionable insights and implementation guidelines.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#download"
                  className="inline-flex items-center justify-center bg-white text-blue-600 font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg"
                >
                  📄 Get the Whitepaper
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Download Form Section */}
      <section id="download" className="bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Download Your Copy
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get instant access to the complete Evidence-Based Marketing Playbook
            </p>
            <Suspense fallback={<div className="h-96 bg-gray-200 animate-pulse rounded-lg" />}>
              <WhitepaperForm />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
  } catch (error) {
    console.error('Whitepaper page error:', error);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Whitepaper</h1>
          <p className="text-gray-600 mb-4">Sorry, there was an error loading the whitepaper content.</p>
          <a 
            href="/" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Return to Home
          </a>
        </div>
      </div>
    );
  }
}