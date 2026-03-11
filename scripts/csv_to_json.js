// scripts/csv_to_json.js
// Converts cms/Database.csv -> cms/portfolio_database.json
// No dependencies. Handles quoted CSV + commas inside quotes.

const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "..", "cms", "Database.csv");
const outputPath = path.join(__dirname, "..", "portfolio_database.json");

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (c === '"') {
      if (inQuotes && next === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && (c === "," || c === "\n" || c === "\r")) {
      if (c === "\r" && next === "\n") continue;

      row.push(cur);
      cur = "";

      if (c === "\n") {
        rows.push(row);
        row = [];
      }
      continue;
    }

    cur += c;
  }

  row.push(cur);
  rows.push(row);

  return rows.filter(r => r.some(cell => String(cell).trim() !== ""));
}

function clean(v) {
  const s = String(v ?? "").trim();
  if (s === "") return "";
  if (/^(true|false)$/i.test(s)) return /^true$/i.test(s);
  return s;
}

function maybeArray(v) {
  // Keep compatible with your stable HTML:
  // - if cell is JSON array text: ["a","b"] => array
  // - else keep as string (your HTML can handle string or array for gallery_images)
  const s = String(v ?? "").trim();
  if (!s) return "";

  if (s.startsWith("[") && s.endsWith("]")) {
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {}
  }
  return s;
}

function main() {
  const csv = fs.readFileSync(inputPath, "utf8");
  const rows = parseCSV(csv);

  const headers = rows[0].map(h => String(h).trim());
  const works = [];

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    const obj = {};

    headers.forEach((h, idx) => {
      obj[h] = clean(r[idx] ?? "");
    });

    if ("gallery_images" in obj) {
      obj.gallery_images = maybeArray(obj.gallery_images);
    }

    works.push(obj);
  }

  const out = { works };
  fs.writeFileSync(outputPath, JSON.stringify(out, null, 2), "utf8");
  console.log(`Wrote ${outputPath} (${works.length} rows)`);
}

main();