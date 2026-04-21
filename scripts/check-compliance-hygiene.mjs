#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
// Only scan active source and runtime config surfaces.
// Historical/migration docs are intentionally excluded to avoid false positives.
const scanRoots = ['app', 'components', 'lib', '.env.example', 'package.json', 'vercel.json'];
const textExt = new Set(['.ts', '.tsx', '.js', '.jsx', '.md', '.json', '.env', '.example']);

const forbiddenRules = [
  {
    name: 'legacy_backend_domain',
    regex: /https:\/\/visage-ai-api\.vercel\.app/g,
    message: 'Legacy backend domain found; canonical is https://api.visageaiconsulting.com',
  },
  {
    name: 'legacy_crystalai_route',
    regex: /\/api\/v2\/crystalai\//g,
    message: 'Legacy /api/v2/crystalai/* route found in webapp active source.',
  },
  {
    name: 'sensitive_next_public_email',
    regex: /NEXT_PUBLIC_(EMAIL_|ADMIN_EMAIL)/g,
    message: 'Sensitive email env var should not use NEXT_PUBLIC_* naming.',
  },
  {
    name: 'sensitive_next_public_api_token',
    regex: /NEXT_PUBLIC_(FASTAPI_TOKEN|API_AUTH_TOKEN)/g,
    message: 'Sensitive API token env var should not use NEXT_PUBLIC_* naming.',
  },
];

function shouldScan(filePath) {
  const basename = path.basename(filePath);
  if (basename.startsWith('.env')) return true;
  const ext = path.extname(filePath);
  return textExt.has(ext);
}

function walk(entryPath, out = []) {
  if (!fs.existsSync(entryPath)) return out;
  const stat = fs.statSync(entryPath);
  if (stat.isFile()) {
    out.push(entryPath);
    return out;
  }
  for (const name of fs.readdirSync(entryPath)) {
    if (name === 'node_modules' || name === '.next' || name === '.git') continue;
    walk(path.join(entryPath, name), out);
  }
  return out;
}

const findings = [];

for (const root of scanRoots) {
  const absolute = path.join(repoRoot, root);
  for (const file of walk(absolute)) {
    if (!shouldScan(file)) continue;
    const content = fs.readFileSync(file, 'utf8');
    for (const rule of forbiddenRules) {
      const matches = [...content.matchAll(rule.regex)];
      if (matches.length === 0) continue;
      for (const match of matches) {
        findings.push({
          rule: rule.name,
          message: rule.message,
          file: path.relative(repoRoot, file),
          match: match[0],
        });
      }
    }
  }
}

if (findings.length > 0) {
  console.error('✖ Compliance hygiene check failed.');
  for (const finding of findings) {
    console.error(`- [${finding.rule}] ${finding.file}: ${finding.message} (${finding.match})`);
  }
  process.exit(1);
}

console.log('✔ Compliance hygiene check passed.');
