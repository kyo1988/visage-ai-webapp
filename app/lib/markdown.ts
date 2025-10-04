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
    
                // Code blocks
                .replace(/<pre>/g, '<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-4">')
                .replace(/<code(?:\s+class="[^"]*")?>/g, (match) => {
                  // Handle both plain <code> and <code class="language-js"> etc.
                  if (match.includes('class=')) {
                    // Already has classes, merge with our classes
                    return match.replace(/class="([^"]*)"/, 'class="$1 text-sm font-mono"');
                  } else {
                    // Plain <code>, add our classes
                    return '<code class="text-sm font-mono">';
                  }
                })
                
                // Inline code - handle both plain and language-tagged code
                .replace(/<code(?:\s+class="[^"]*")?>/g, (match) => {
                  if (match.includes('class=')) {
                    // Already has classes, merge with our classes
                    return match.replace(/class="([^"]*)"/, 'class="$1 bg-gray-100 px-2 py-1 rounded text-sm font-mono"');
                  } else {
                    // Plain <code>, add our classes
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
  tldr: string;
  architecture: string;
  reproduction: string;
  caseStudies: string;
  decisionBridge: string;
  legal: string;
}> {
  const contentDir = path.join(process.cwd(), 'content', 'whitepaper', 'ebm-2025');
  
  const [cover, tldr, architecture, reproduction, caseStudies, decisionBridge, legal] = await Promise.all([
    fs.readFile(path.join(contentDir, '00-cover.md'), 'utf-8'),
    fs.readFile(path.join(contentDir, '01-tldr.md'), 'utf-8'),
    fs.readFile(path.join(contentDir, '02-architecture.md'), 'utf-8'),
    fs.readFile(path.join(contentDir, '03-reproduction.md'), 'utf-8'),
    fs.readFile(path.join(contentDir, '04-case-snapshot.md'), 'utf-8'),
    fs.readFile(path.join(contentDir, '05-decision-bridge.md'), 'utf-8'),
    fs.readFile(path.join(contentDir, '99-legal.md'), 'utf-8'),
  ]);

  return {
    cover,
    tldr,
    architecture,
    reproduction,
    caseStudies,
    decisionBridge,
    legal,
  };
}
