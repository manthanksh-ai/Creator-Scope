import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = new URL(".", import.meta.url);
const html = await fs.readFile(new URL("dist/index.html", root), "utf8");
const marker = '<script id="data" type="application/json">';
const start = html.indexOf(marker);
if (start < 0) throw new Error("Embedded roster data was not found in the planner.");
const jsonStart = start + marker.length;
const jsonEnd = html.indexOf("</script>", jsonStart);
const creators = JSON.parse(html.slice(jsonStart, jsonEnd));
const sourceUrl = "https://docs.google.com/spreadsheets/d/1wL-RjBxI8ikqZACPLann_Vy2I6coBYrX3gWo0vM_GTE/edit";
const unknown = v => !v || String(v).trim() === "" || String(v).toLowerCase() === "unknown" || /^#(REF|N\/A)/i.test(String(v)) || String(v) === "Loading...";
function metric(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  let s = String(value ?? "").trim().replace(/[,₹\s]/g, "").toLowerCase();
  if (!s || s === "unknown" || s.startsWith("#") || s === "loading...") return null;
  let mult = 1;
  if (s.endsWith("k")) { mult = 1e3; s = s.slice(0, -1); }
  else if (s.endsWith("m")) { mult = 1e6; s = s.slice(0, -1); }
  else if (s.endsWith("l")) { mult = 1e5; s = s.slice(0, -1); }
  const n = Number(s);
  return Number.isFinite(n) ? n * mult : null;
}
function tier(value) {
  const n = metric(value);
  return n == null ? "Unknown" : n < 10000 ? "Nano" : n < 100000 ? "Micro" : n < 1000000 ? "Macro" : "Mega";
}
const standardHeaders = [
  "Name", "IG Link", "Followers", "Tier", "Avg Reel Views", "Gender", "Age", "City", "Languages",
  "Genre", "Content Themes", "Mom/Dad Content", "Has Child", "Past Campaigns", "Audience Gender %",
  "Audience Age %", "Audience Top Cities", "Cost per Reel", "Confidence", "Verified by me", "Sources"
];
const standardRows = creators.map(c => [
  c.name || "Unknown",
  c.igLink || "Unknown",
  metric(c.followers) ?? "Unknown",
  tier(c.followers),
  metric(c.avgReelViews) ?? "Unknown",
  unknown(c.creatorGender) ? "Unknown" : c.creatorGender,
  unknown(c.age) ? "Unknown" : c.age,
  unknown(c.city) ? "Unknown" : c.city,
  unknown(c.languages) ? "Unknown" : c.languages,
  [c.primaryGenre, c.secondaryGenre].filter(x => !unknown(x)).join(" / ") || (Array.isArray(c.genres) && c.genres.length ? c.genres.join(" / ") : "Unknown"),
  unknown(c.contentThemes) ? "Unknown" : c.contentThemes,
  unknown(c.momDadContent) ? "Unknown" : c.momDadContent,
  unknown(c.hasChild) ? "Unknown" : c.hasChild,
  unknown(c.pastCampaigns) ? "Unknown" : c.pastCampaigns,
  null,
  null,
  null,
  unknown(c.costPerReel) ? "Unknown" : metric(c.costPerReel) ?? c.costPerReel,
  c.confidence || "Low",
  "",
  [...new Set([...(c.sources || []), sourceUrl])].join("\n")
]);
const rawHeaders = ["Source Tab", "Name", "Genre", "Instagram Link", "IG Link", "Followers", "City", "Location", "Language", "YouTube Link", "Youtube", "YT Link", "Subscribers"];
const rawRows = creators.flatMap(c => (c.rosterRows || []).map(row => rawHeaders.map(h => h === "Source Tab" ? row.sourceTab || "" : row[h] ?? "")));

const wb = Workbook.create();
const coverage = wb.worksheets.add("Coverage");
const main = wb.worksheets.add("Creator Database");
const source = wb.worksheets.add("Roster Source Rows");
for (const sh of [coverage, main, source]) sh.showGridLines = false;
coverage.tabColor = "#17211c";
main.tabColor = "#789c3a";
source.tabColor = "#b9c2b9";

const rosterCount = rawRows.length;
const yesWithSource = creators.filter(c => (c.hasChild === "Yes" && (c.sources || []).length) || (c.momDadContent === "Yes" && c.momDadExampleUrl && (c.sources || []).length)).length;
coverage.getRange("A1:D1").values = [["MONK EXCLUSIVE CREATOR DATABASE", "", "", ""]];
coverage.getRange("A1:D1").format = { font: { name: "Arial", size: 16, bold: true, color: "#17211c" } };
coverage.getRange("A3:B8").values = [
  ["Roster snapshot", "September 2026"],
  ["Distinct creator profiles", creators.length],
  ["Original roster rows retained", rosterCount],
  ["Creators with Instagram link", creators.filter(c => !unknown(c.igLink)).length],
  ["Sensitive Yes tags with sources", yesWithSource],
  ["Audience data policy", "Insights only; cells blank until screenshots are supplied"]
];
coverage.getRange("A3:A8").format = { font: { name: "Arial", size: 10, bold: true, color: "#3e5141" } };
coverage.getRange("B3:B8").format = { font: { name: "Arial", size: 10, color: "#17211c" }, wrapText: true };
coverage.getRange("A10:C10").values = [["Field", "Known creators", "Missing / Unknown"]];
const auditFields = [
  ["Content type", c => !unknown(c.contentType)],
  ["Genre", c => (Array.isArray(c.genres) && c.genres.length > 0) || !unknown(c.primaryGenre)],
  ["Past campaigns", c => !unknown(c.pastCampaigns)],
  ["Mom/Dad content", c => c.momDadContent === "Yes" || c.momDadContent === "No"],
  ["Has child", c => c.hasChild === "Yes" || c.hasChild === "No"],
  ["Age", c => !unknown(c.age)],
  ["Language", c => !unknown(c.languages)],
  ["City", c => !unknown(c.city)],
  ["Audience gender %", c => !unknown(c.audienceGenderPct)],
  ["Audience age %", c => !unknown(c.audienceAgePct)],
  ["Avg reel views", c => !unknown(c.avgReelViews)],
  ["Cost", c => !unknown(c.costPerReel)]
];
coverage.getRange("A10:C10").format = { fill: "#17211c", font: { name: "Arial", size: 10, bold: true, color: "#FFFFFF" } };
coverage.getRange("A11:C22").values = auditFields.map(([label, predicate]) => {
  const knownCount = creators.filter(predicate).length;
  return [label, knownCount, creators.length - knownCount];
});
coverage.getRange("A11:C22").format = { font: { name: "Arial", size: 10, color: "#17211c" } };
coverage.getRange("B11:C22").format.numberFormat = "0";
coverage.getRange("A24:D26").values = [
  ["Source roster", sourceUrl, "", ""],
  ["Plan-format reference", "https://docs.google.com/spreadsheets/d/14Na7wnuSoC0k-Ib061BpL37oFitri7YQT_hpYCQh3xY/edit", "", ""],
  ["Note", "The sample plan was used for layout conventions only, not as a creator data source.", "", ""]
];
coverage.getRange("A24:A26").format = { font: { name: "Arial", size: 10, bold: true } };
coverage.getRange("B24:B26").format = { font: { name: "Arial", size: 9, color: "#405b32" }, wrapText: true };
coverage.getRange("A1:D26").format.verticalAlignment = "center";
coverage.getRange("A1:D26").format.font.name = "Arial";
coverage.getRange("A:A").format.columnWidth = 29;
coverage.getRange("B:B").format.columnWidth = 78;
coverage.getRange("C:C").format.columnWidth = 19;
coverage.getRange("D:D").format.columnWidth = 5;
coverage.getRange("A3:C26").format.borders = { insideHorizontal: { style: "thin", color: "#E6EBE5" } };

main.getRange("A1:U1").values = [["MONK EXCLUSIVE · CREATOR DATABASE", ...Array(20).fill("")]];
main.getRange("A1:U1").format = { font: { name: "Arial", size: 16, bold: true, color: "#17211c" } };
main.getRange("A2:U2").values = [["Roster-derived fields and sourced public enrichment. Audience columns are intentionally blank until Insights are uploaded.", ...Array(20).fill("")]];
main.getRange("A2:U2").format = { font: { name: "Arial", size: 9, italic: true, color: "#68736d" } };
main.getRangeByIndexes(3, 0, 1, standardHeaders.length).values = [standardHeaders];
main.getRangeByIndexes(4, 0, standardRows.length, standardHeaders.length).values = standardRows;
main.getRange("A4:U4").format = { fill: "#17211c", font: { name: "Arial", size: 9, bold: true, color: "#FFFFFF" }, wrapText: true, verticalAlignment: "center" };
main.getRangeByIndexes(4, 0, standardRows.length, standardHeaders.length).format = { font: { name: "Arial", size: 9, color: "#17211c" }, verticalAlignment: "center", wrapText: false };
main.getRange("A4:U190").format.borders = { insideHorizontal: { style: "thin", color: "#E8ECE8" } };
main.getRange("C5:C190").format.numberFormat = "#,##0";
main.getRange("E5:E190").format.numberFormat = "#,##0";
main.getRange("R5:R190").format.numberFormat = "₹#,##0";
main.getRange("S5:S190").conditionalFormats.add("containsText", { text: "Low", format: { fill: "#FFF1DA", font: { color: "#805111" } } });
main.getRange("A:A").format.columnWidth = 24;
main.getRange("B:B").format.columnWidth = 36;
main.getRange("C:C").format.columnWidth = 14;
main.getRange("D:D").format.columnWidth = 12;
main.getRange("E:E").format.columnWidth = 16;
main.getRange("F:F").format.columnWidth = 14;
main.getRange("G:G").format.columnWidth = 12;
main.getRange("H:H").format.columnWidth = 33;
main.getRange("I:I").format.columnWidth = 21;
main.getRange("J:K").format.columnWidth = 36;
main.getRange("L:N").format.columnWidth = 22;
main.getRange("O:Q").format.columnWidth = 20;
main.getRange("R:R").format.columnWidth = 17;
main.getRange("S:T").format.columnWidth = 16;
main.getRange("U:U").format.columnWidth = 60;
main.getRange("A2:U2").format.rowHeight = 24;
main.getRange("A4:U4").format.rowHeight = 32;
main.freezePanes.freezeRows(4);

source.getRange("A1:M1").values = [rawHeaders];
source.getRangeByIndexes(1, 0, rawRows.length, rawHeaders.length).values = rawRows;
source.getRange("A1:M1").format = { fill: "#17211c", font: { name: "Arial", size: 9, bold: true, color: "#FFFFFF" }, wrapText: true };
source.getRangeByIndexes(1, 0, rawRows.length, rawHeaders.length).format = { font: { name: "Arial", size: 9, color: "#17211c" } };
source.getRange("A:A").format.columnWidth = 27;
source.getRange("B:B").format.columnWidth = 25;
source.getRange("C:C").format.columnWidth = 34;
source.getRange("D:E").format.columnWidth = 38;
source.getRange("F:F").format.columnWidth = 14;
source.getRange("G:H").format.columnWidth = 30;
source.getRange("I:I").format.columnWidth = 18;
source.getRange("J:L").format.columnWidth = 38;
source.getRange("M:M").format.columnWidth = 15;
source.getRange("A1:M1").format.rowHeight = 32;
source.freezePanes.freezeRows(1);

wb.recalculate();
const outputPath = fileURLToPath(new URL("Monk_Exclusive_Creator_Database.xlsx", root));
const output = await SpreadsheetFile.exportXlsx(wb);
await output.save(outputPath);
const check = await wb.inspect({ kind: "sheet,table", maxChars: 2500, tableMaxRows: 4, tableMaxCols: 5 });
console.log(check.ndjson);
const preview = await wb.render({ sheetName: "Coverage", range: "A1:C26", scale: 1, format: "png" });
await fs.writeFile(fileURLToPath(new URL("database-preview.png", root)), new Uint8Array(await preview.arrayBuffer()));
console.log("Saved " + outputPath + " with " + creators.length + " creators and " + rawRows.length + " original roster rows.");
