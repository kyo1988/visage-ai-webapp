import fs from 'fs/promises';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkGfm from 'remark-gfm';

// Markdown to HTML converter using remark
export function markdownToHtml(markdown: string): string {
  const processor = remark()
    .use(remarkGfm) // GitHub Flavored Markdown support
    .use(remarkHtml, { sanitize: false }); // Convert to HTML

  const result = processor.processSync(markdown);
  const html = String(result);

  // Apply custom styling classes
  return html
    // Headers
    .replace(/<h1>/g, '<h1 class="text-2xl font-bold mb-8 text-gray-900">')
    .replace(/<h2>/g, '<h2 class="text-xl font-bold mb-6 text-gray-900">')
    .replace(/<h3>/g, '<h3 class="text-lg font-semibold mb-4 text-gray-800">')
    
    // Paragraphs
    .replace(/<p>/g, '<p class="mb-4 text-gray-700 leading-relaxed">')
    
    // Lists
    .replace(/<ul>/g, '<ul class="list-disc ml-6 mb-6">')
    .replace(/<ol>/g, '<ol class="list-decimal ml-6 mb-6">')
    .replace(/<li>/g, '<li class="mb-2">')
    
                // Code blocks - handle <pre><code> combinations
                .replace(/<pre>/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">')
                .replace(/<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4"><code(?:\s+class="[^"]*")?>/g, (match) => {
                  // This is a code block inside <pre>, only add font classes
                  if (match.includes('class=')) {
                    return match.replace(/class="([^"]*)"/, 'class="$1 text-sm font-mono"');
                  } else {
                    return match.replace('><code', '><code class="text-sm font-mono"');
                  }
                })
                
                // Inline code - handle standalone <code> tags (not inside <pre>)
                .replace(/(?<!<pre[^>]*>)<code(?:\s+class="[^"]*")?>/g, (match) => {
                  // This is inline code, add background and padding classes
                  if (match.includes('class=')) {
                    return match.replace(/class="([^"]*)"/, 'class="$1 bg-gray-100 px-2 py-1 rounded text-sm font-mono"');
                  } else {
                    return '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono">';
                  }
                })
    
    // Horizontal rules
    .replace(/<hr>/g, '<hr class="my-8 border-gray-300">')
    
    // Bold and italic
    .replace(/<strong>/g, '<strong class="font-semibold">')
    .replace(/<em>/g, '<em class="italic">')
    
    // Clean up empty paragraphs
    .replace(/<p class="mb-4 text-gray-700 leading-relaxed"><\/p>/g, '')
    .replace(/<p class="mb-4 text-gray-700 leading-relaxed">\s*<\/p>/g, '');
}

export async function loadWhitepaperContent(): Promise<{
  cover: string;
  executiveSummary: string;
  whatWeMeasured: string;
  finding1: string;
  finding2: string;
  finding3: string;
  finding4: string;
  methods: string;
  limits: string;
  checklist: string;
  references: string;
  legal: string;
}> {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'whitepaper', 'ebm-2025');
  
    const [
      cover,
      executiveSummary,
      whatWeMeasured,
      finding1,
      finding2,
      finding3,
      finding4,
      methods,
      limits,
      checklist,
      references,
      legal,
    ] = await Promise.all([
      fs.readFile(path.join(contentDir, '00-cover.md'), 'utf-8'),
      fs.readFile(path.join(contentDir, '01-executive-summary.md'), 'utf-8'),
      fs.readFile(path.join(contentDir, '02-what-we-measured.md'), 'utf-8'),
      fs.readFile(path.join(contentDir, '03-finding-1-duplication.md'), 'utf-8'),
      fs.readFile(path.join(contentDir, '04-finding-2-double-jeopardy.md'), 'utf-8'),
      fs.readFile(path.join(contentDir, '05-finding-3-buyer-frequency.md'), 'utf-8'),
      fs.readFile(path.join(contentDir, '06-finding-4-cep.md'), 'utf-8'),
      fs.readFile(path.join(contentDir, '07-methods.md'), 'utf-8'),
      fs.readFile(path.join(contentDir, '08-limits.md'), 'utf-8'),
      fs.readFile(path.join(contentDir, '09-reproduction-checklist.md'), 'utf-8'),
      fs.readFile(path.join(contentDir, '10-references.md'), 'utf-8'),
      fs.readFile(path.join(contentDir, '99-legal.md'), 'utf-8'),
    ]);


    return {
      cover,
      executiveSummary,
      whatWeMeasured,
      finding1,
      finding2,
      finding3,
      finding4,
      methods,
      limits,
      checklist,
      references,
      legal,
    };
  } catch (error) {
    console.error('Error loading whitepaper content:', error);
    // Return default content to prevent page crash
    return {
      cover: '# Cover\n\nEvidence-Based Marketing Playbook',
      executiveSummary: '# Executive Summary\n\nOverview of key findings.',
      whatWeMeasured: '# What We Measured\n\nMetrics and methodology.',
      finding1: '# Finding 1\n\nFirst key finding.',
      finding2: '# Finding 2\n\nSecond key finding.',
      finding3: '# Finding 3\n\nThird key finding.',
      finding4: '# Finding 4\n\nFourth key finding.',
      methods: '# Methods\n\nResearch methodology.',
      limits: '# Limits\n\nStudy limitations.',
      checklist: '# Checklist\n\nImplementation checklist.',
      references: '# References\n\nSource materials.',
      legal: '# Legal\n\nTerms and conditions.',
    };
  }
}
