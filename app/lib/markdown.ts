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

// Helper function to extract bridge text for specific findings
export function getBridgeText(bridgeTexts: string, findingNumber: number): string {
  const sections = bridgeTexts.split('## Finding ');
  const targetSection = sections.find(section => section.startsWith(`${findingNumber} Bridge`));
  
  if (!targetSection) return '';
  
  // Extract content after the heading
  const lines = targetSection.split('\n');
  const contentStart = lines.findIndex(line => line.startsWith('**Technical note:**'));
  
  if (contentStart === -1) return '';
  
  return lines.slice(contentStart).join('\n').trim();
}

export async function loadWhitepaperContent(): Promise<{
  cover: string;
  tldr: string;
  architecture: string;
  reproduction: string;
  caseStudies: string;
  decisionBridge: string;
  legal: string;
  // Marketing-focused content
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
  bridgeTexts: string;
}> {
  const contentDir = path.join(process.cwd(), 'content', 'whitepaper', 'ebm-2025');
  
  const [
    cover, tldr, architecture, reproduction, caseStudies, decisionBridge, legal,
    executiveSummary, whatWeMeasured, finding1, finding2, finding3, finding4, methods, limits, checklist, references, bridgeTexts
  ] = await Promise.all([
    fs.readFile(path.join(contentDir, '00-cover.md'), 'utf-8'),
    fs.readFile(path.join(contentDir, '01-tldr.md'), 'utf-8'),
    fs.readFile(path.join(contentDir, '02-architecture.md'), 'utf-8'),
    fs.readFile(path.join(contentDir, '03-reproduction.md'), 'utf-8'),
    fs.readFile(path.join(contentDir, '04-case-snapshot.md'), 'utf-8'),
    fs.readFile(path.join(contentDir, '05-decision-bridge.md'), 'utf-8'),
    fs.readFile(path.join(contentDir, '99-legal.md'), 'utf-8'),
    // Marketing-focused content - use existing files
    fs.readFile(path.join(contentDir, '01-tldr.md'), 'utf-8'), // executiveSummary
    fs.readFile(path.join(contentDir, '02-architecture.md'), 'utf-8'), // whatWeMeasured
    fs.readFile(path.join(contentDir, '03-dirichlet.md'), 'utf-8'), // finding1
    fs.readFile(path.join(contentDir, '04-cep.md'), 'utf-8'), // finding2
    fs.readFile(path.join(contentDir, '05-decision-bridge.md'), 'utf-8'), // finding3
    fs.readFile(path.join(contentDir, '06-decision-bridge.md'), 'utf-8'), // finding4
    fs.readFile(path.join(contentDir, '07-reproduction-checklist.md'), 'utf-8'), // methods
    fs.readFile(path.join(contentDir, '06-reproduction-checklist.md'), 'utf-8'), // limits
    fs.readFile(path.join(contentDir, '06-reproduction-checklist.md'), 'utf-8'), // checklist
    fs.readFile(path.join(contentDir, '99-legal.md'), 'utf-8'), // references
    fs.readFile(path.join(contentDir, '11-bridge-texts.md'), 'utf-8'), // bridgeTexts
  ]);


  return {
    cover,
    tldr,
    architecture,
    reproduction,
    caseStudies,
    decisionBridge,
    legal,
    // Marketing-focused content
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
    bridgeTexts,
  };
}
