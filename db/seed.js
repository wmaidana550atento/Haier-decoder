const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

const categories = require("./data/categories");
const factories = require("./data/factories");
const { yearCodes, monthCodes, dayCodes } = require("./data/dateCodes");

const DB_PATH = path.join(__dirname, "haier.db");
const SCHEMA_PATH = path.join(__dirname, "schema.sql");

function seed() {
  if (fs.existsSync(DB_PATH)) fs.unlinkSync(DB_PATH);

  const db = new Database(DB_PATH);
  db.exec(fs.readFileSync(SCHEMA_PATH, "utf8"));

  const insertCategory = db.prepare(
    "INSERT INTO appliance_category (code, name_pt, name_en) VALUES (?, ?, ?)"
  );
  const insertFactory = db.prepare(
    "INSERT INTO factory (code, category, name, location_note) VALUES (?, ?, ?, ?)"
  );
  const insertYear = db.prepare("INSERT INTO year_code (code, year) VALUES (?, ?)");
  const insertMonth = db.prepare(
    "INSERT INTO month_code (code, month_number, name_pt) VALUES (?, ?, ?)"
  );
  const insertDay = db.prepare("INSERT INTO day_code (code, day) VALUES (?, ?)");

  const seedAll = db.transaction(() => {
    for (const c of categories) insertCategory.run(c.code, c.name_pt, c.name_en);
    for (const f of factories) insertFactory.run(f.code, f.category, f.name, f.location_note);
    for (const y of yearCodes) insertYear.run(y.code, y.year);
    for (const m of monthCodes) insertMonth.run(m.code, m.month_number, m.name_pt);
    for (const d of dayCodes) insertDay.run(d.code, d.day);
  });

  seedAll();
  db.close();
  console.log(`Base de dados gerada em ${DB_PATH}`);
}

if (require.main === module) {
  seed();
}

module.exports = seed;
