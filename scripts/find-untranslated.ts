import * as fs from 'fs';
import * as path from 'path';

const componentsDir = path.join(process.cwd(), 'components');

function findUntranslatedStrings(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  // Matches quoted strings not preceded by t(' or t.rich('
  // Using String.raw and new RegExp for complex regex with backticks.
  const regexString = String.raw`(?<!t\(['"]|t\.rich\(['"])(['"\x60])(.*?)\1`;
  const regex = new RegExp(regexString, 'g');

  lines.forEach((line, lineIndex) => {
    let match;
    while ((match = regex.exec(line)) !== null) {
      const quotedString = match[2];
      // Simple check for Japanese or English-like continuous strings
      if (
        (quotedString.match(/[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/) && quotedString.length > 1) || // Japanese characters
        (quotedString.match(/[a-zA-Z]{3,}/) && quotedString.split(' ').length > 1) // English-like phrases (more than 1 word, at least 3 letters)
      ) {
        console.warn(`[WARNING] Untranslated string found in ${filePath}:${lineIndex + 1}: "${quotedString}"`);
      }
    }
  });
}

function traverseDirectory(dir: string) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      findUntranslatedStrings(fullPath);
    }
  });
}

console.log('Starting untranslated string check...');
traverseDirectory(componentsDir);
console.log('Untranslated string check finished.');
