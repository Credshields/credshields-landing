const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'dist');
const assetExtensions = new Set([
  '.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.ico',
  '.avif', '.woff', '.woff2', '.ttf', '.otf', '.eot', '.pdf'
]);

const copyDirs = ['css', 'js', 'images', 'CredShields_Logos'];
const copyFiles = fs.readdirSync(root).filter((file) => {
  const ext = path.extname(file).toLowerCase();
  return ext === '.html';
});

const deployKey = (
  process.env.COMMIT_REF ||
  process.env.CACHED_COMMIT_REF ||
  process.env.DEPLOY_ID ||
  Date.now().toString(36)
).slice(0, 12);

function versionedUrl(url) {
  const trimmed = url.trim();
  if (
    !trimmed ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) ||
    trimmed.startsWith('//')
  ) {
    return url;
  }

  const hashIndex = trimmed.indexOf('#');
  const hash = hashIndex >= 0 ? trimmed.slice(hashIndex) : '';
  const withoutHash = hashIndex >= 0 ? trimmed.slice(0, hashIndex) : trimmed;
  const queryIndex = withoutHash.indexOf('?');
  const pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  const ext = path.extname(pathname).toLowerCase();

  if (!assetExtensions.has(ext)) return url;

  const separator = queryIndex >= 0 ? '&' : '?';
  return `${withoutHash}${separator}v=${deployKey}${hash}`;
}

function rewriteHtml(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  html = html.replace(/\b(href|src)=("([^"]+)"|'([^']+)')/gi, (match, attr, quoted, doubleValue, singleValue) => {
    const quote = quoted[0];
    const value = doubleValue || singleValue || '';
    return `${attr}=${quote}${versionedUrl(value)}${quote}`;
  });

  html = html.replace(/\bsrcset=("([^"]+)"|'([^']+)')/gi, (match, quoted, doubleValue, singleValue) => {
    const quote = quoted[0];
    const value = doubleValue || singleValue || '';
    const rewritten = value.split(',').map((candidate) => {
      const parts = candidate.trim().split(/\s+/);
      if (!parts[0]) return candidate;
      parts[0] = versionedUrl(parts[0]);
      return parts.join(' ');
    }).join(', ');
    return `srcset=${quote}${rewritten}${quote}`;
  });

  fs.writeFileSync(filePath, html);
}

function rewriteCss(filePath) {
  let css = fs.readFileSync(filePath, 'utf8');

  css = css.replace(/url\((["']?)([^"')]+)\1\)/gi, (match, quote, value) => {
    return `url(${quote}${versionedUrl(value)}${quote})`;
  });

  fs.writeFileSync(filePath, css);
}

function walk(dir, visitor) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, visitor);
    } else {
      visitor(fullPath);
    }
  }
}

function hashBuildManifest() {
  const hash = crypto.createHash('sha256');
  walk(outDir, (filePath) => {
    const relative = path.relative(outDir, filePath);
    hash.update(relative);
    hash.update(fs.readFileSync(filePath));
  });
  return hash.digest('hex').slice(0, 12);
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

for (const dir of copyDirs) {
  const from = path.join(root, dir);
  if (fs.existsSync(from)) {
    fs.cpSync(from, path.join(outDir, dir), {
      recursive: true,
      filter: (source) => !path.basename(source).startsWith('.')
    });
  }
}

for (const file of copyFiles) {
  fs.copyFileSync(path.join(root, file), path.join(outDir, file));
}

walk(outDir, (filePath) => {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.html') rewriteHtml(filePath);
  if (ext === '.css') rewriteCss(filePath);
});

console.log(`Built dist with cache key ${deployKey}`);
console.log(`Build manifest ${hashBuildManifest()}`);
