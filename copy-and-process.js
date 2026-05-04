const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const SRC = "/Users/vishalchauhan/Documents/claude-workspace/credshields/credshields-landing-upgrade/credshields-landing/";
const DEST = "/Users/vishalchauhan/Documents/claude-workspace/credshields/credshields-landing-upgrade/credshields-upgrade/";

const files = [
  "about.html",
  "smart-contract-audits.html",
  "dapp-protocol-security.html",
  "blockchain-security.html",
  "wallet-security.html",
  "continuous-monitoring.html",
  "security-training.html",
  "ai-security-tools.html",
  "web3-protocol-security.html",
  "stablecoins.html",
  "realwordassets.html",
  "crosschainbridge.html",
  "payments.html",
  "fintech-security.html",
  "saas-security.html",
  "healthcare-security.html",
  "gaming-security.html",
  "recently-audited.html",
  "ecosystem.html",
  "brand-guidelines.html",
  "careers.html",
  "Institutions.html",
  "vc-crypto-funds.html",
  "owasp-smart-contract-top-10-2025.html",
  "owasp-smart-contract-top-10-2026.html",
];

// Ensure destination directory exists
if (!fs.existsSync(DEST)) {
  fs.mkdirSync(DEST, { recursive: true });
  console.log(`Created destination directory: ${DEST}`);
}

let passed = 0;
let failed = 0;

for (const file of files) {
  const srcPath = path.join(SRC, file);
  const destPath = path.join(DEST, file);

  // --- Copy ---
  if (!fs.existsSync(srcPath)) {
    console.error(`⚠️  SKIP  ${file} — not found in source`);
    failed++;
    continue;
  }

  fs.copyFileSync(srcPath, destPath);
  console.log(`✅ Copied  ${file}`);

  // --- Process ---
  try {
    execSync(`node js/remove-classes.js ${file}`, {
      cwd: DEST,
      stdio: "inherit",
    });
    console.log(`✅ Processed  ${file}\n`);
    passed++;
  } catch (err) {
    console.error(`❌ remove-classes.js failed for ${file}\n`);
    failed++;
  }
}

console.log("─".repeat(40));
console.log(`Done — ${passed} succeeded, ${failed} failed.`);
