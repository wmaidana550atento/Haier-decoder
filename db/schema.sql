CREATE TABLE IF NOT EXISTS appliance_category (
  code TEXT PRIMARY KEY,
  name_pt TEXT NOT NULL,
  name_en TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS factory (
  code TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  location_note TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS year_code (
  code TEXT PRIMARY KEY,
  year INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS month_code (
  code TEXT PRIMARY KEY,
  month_number INTEGER NOT NULL,
  name_pt TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS day_code (
  code TEXT PRIMARY KEY,
  day INTEGER NOT NULL
);
