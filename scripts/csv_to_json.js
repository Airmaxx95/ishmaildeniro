// scripts/csv_to_json.js
// Converts cms/Database.csv -> portfolio_database.json (top-level ARRAY)
// No dependencies. Robust CSV parsing (quotes, commas in quotes, CRLF).
// Keeps values as strings; converts "true"/"false" to booleans; trims whitespace.

const fs = require("fs");
const path = require("path");

// INPUT: exported from your spreadsheet
const INPUT_CSV = path.join(__dirname, "..", "cms", "Database.csv"); // capital D

// OUTPUT: keep legacy shape your site expects (root file)
const OUTPUT_JSON = path.join(__dirname, "..", "portfolio_database.json");

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];

    if (c === '"') {
      // Escaped quote inside quoted field: ""
      if (inQuotes && next === '"') {
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    // Field separators and line breaks (only when not in quotes)
    if (!inQuotes && (c === "," || c === "\n" || c === "\r")) {
      // Handle CRLF
      if (c === "\r" && next === "\n") {
        // treat as newline, but skip this \r (the \n will be handled by this branch only if we don't skip)
        // easiest: push cell now, then push row, and skip \n via i++ below
      }

      row.push(cell);
      cell = "";

      // Newline ends row
      if (c === "\n" || c === "\r") {
        rows.push(row);
        row = [];

        // If CRLF, skip the \n
        if (c === "\r" && next === "\n") i++;
      }

      continue;
    }

    cell += c;
  }

  // Flush last cell/row
  row.push(cell);
  rows.push(row);

  // Remove completely empty trailing rows
  return rows.filter(r => r.some(v => String(v).trim() !== ""));
}

function normaliseHeader(h) {
  // Keep headers exactly, but trim BOM/whitespace
  return String(h ?? "")
    .replace(/^\uFEFF/, "") // BOM
    .trim();
}

function cleanValue(v) {
  const s = String(v ?? "").trim();

  if (s === "") return "";

  // Convert literal booleans (optional but helpful)
  if (/^(true|false)$/i.test(s)) return /^true$/i.test(s);

  return s;
}

function buildObjectsFromRows(rows) {
  if (!rows.length) return [];

  const headers = rows[0].map(normaliseHeader);

  // Basic sanity: ignore completely blank headers
  const usable = headers.map((h, idx) => ({ h, idx })).filter(x => x.h !== "");

  const out = [];

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];

    // Skip rows that are fully empty
    const hasAny = row.some(v => String(v ?? "").trim() !== "");
    if (!hasAny) continue;

    const obj = {};
    for (const { h, idx } of usable) {
      obj[h] = cleanValue(row[idx] ?? "");
    }

    out.push(obj);
  }

  return out;
}

function main() {
  if (!fs.existsSync(INPUT_CSV)) {
    console.error(`Missing CSV: ${INPUT_CSV}`);
    process.exit(1);
  }

  const csvText = fs.readFileSync(INPUT_CSV, "utf8");

  const rows = parseCSV(csvText);
  const objects = buildObjectsFromRows(rows);

  // IMPORTANT: output is a TOP-LEVEL ARRAY (legacy format)
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(objects, null, 2), "utf8");

  console.log(`✅ Wrote ${OUTPUT_JSON}`);
  console.log(`   Rows: ${objects.length}`);
}

main();