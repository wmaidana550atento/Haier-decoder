// Posicoes 14, 15, 16 do codigo Haier (20 digitos) - "Manufacture Date"
// Fonte: Haier Production Coding System.pdf (2007/06), pagina 8

const yearCodes = [
  { code: "0", year: 2000 }, { code: "1", year: 2001 }, { code: "2", year: 2002 },
  { code: "3", year: 2003 }, { code: "4", year: 2004 }, { code: "5", year: 2005 },
  { code: "6", year: 2006 }, { code: "7", year: 2007 }, { code: "8", year: 2008 },
  { code: "9", year: 2009 }, { code: "A", year: 2010 }, { code: "B", year: 2011 },
  { code: "C", year: 2012 }, { code: "D", year: 2013 }, { code: "E", year: 2014 },
  { code: "F", year: 2015 }, { code: "G", year: 2016 }, { code: "H", year: 2017 },
  { code: "J", year: 2018 }, { code: "K", year: 2019 }, { code: "L", year: 2020 },
  { code: "M", year: 2021 }, { code: "N", year: 2022 }, { code: "P", year: 2023 },
  { code: "Q", year: 2024 }, { code: "R", year: 2025 }, { code: "S", year: 2026 },
  { code: "T", year: 2027 }, { code: "U", year: 2028 }, { code: "V", year: 2029 },
  { code: "W", year: 2030 }, { code: "X", year: 2031 }, { code: "Y", year: 2032 },
  { code: "Z", year: 2033 },
];

const monthCodes = [
  { code: "1", month_number: 1, name_pt: "Janeiro" },
  { code: "2", month_number: 2, name_pt: "Fevereiro" },
  { code: "3", month_number: 3, name_pt: "Março" },
  { code: "4", month_number: 4, name_pt: "Abril" },
  { code: "5", month_number: 5, name_pt: "Maio" },
  { code: "6", month_number: 6, name_pt: "Junho" },
  { code: "7", month_number: 7, name_pt: "Julho" },
  { code: "8", month_number: 8, name_pt: "Agosto" },
  { code: "9", month_number: 9, name_pt: "Setembro" },
  { code: "A", month_number: 10, name_pt: "Outubro" },
  { code: "B", month_number: 11, name_pt: "Novembro" },
  { code: "C", month_number: 12, name_pt: "Dezembro" },
];

// Dia do mes: 1-9 = 1º-9º, A-X = 10º-31º (sem I nem O)
const dayCodes = [
  { code: "1", day: 1 }, { code: "2", day: 2 }, { code: "3", day: 3 },
  { code: "4", day: 4 }, { code: "5", day: 5 }, { code: "6", day: 6 },
  { code: "7", day: 7 }, { code: "8", day: 8 }, { code: "9", day: 9 },
  { code: "A", day: 10 }, { code: "B", day: 11 }, { code: "C", day: 12 },
  { code: "D", day: 13 }, { code: "E", day: 14 }, { code: "F", day: 15 },
  { code: "G", day: 16 }, { code: "H", day: 17 }, { code: "J", day: 18 },
  { code: "K", day: 19 }, { code: "L", day: 20 }, { code: "M", day: 21 },
  { code: "N", day: 22 }, { code: "P", day: 23 }, { code: "Q", day: 24 },
  { code: "R", day: 25 }, { code: "S", day: 26 }, { code: "T", day: 27 },
  { code: "U", day: 28 }, { code: "V", day: 29 }, { code: "W", day: 30 },
  { code: "X", day: 31 },
];

module.exports = { yearCodes, monthCodes, dayCodes };
