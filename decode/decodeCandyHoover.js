const { monthFromISOWeek } = require("./isoWeek");

// Codigo Candy/Hoover (legado, tambem usado nalguns produtos Haier): 16 caracteres.
// 1-8=Codigo de produto | 9-10=Ano (2 digitos literais) | 11-12=Semana (2 digitos literais) | 13-16=Serie de producao
const MONTH_NAMES_PT = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

function decodeCandyHoover(code) {
  const productCode = code.slice(0, 8);
  const yearDigits = code.slice(8, 10);
  const weekDigits = code.slice(10, 12);
  const serial = code.slice(12, 16);

  const warnings = [];
  let year = null;
  let week = null;
  let mes = null;

  if (/^\d{2}$/.test(yearDigits)) {
    year = 2000 + parseInt(yearDigits, 10);
  } else {
    warnings.push(`Não foi possível interpretar o ano "${yearDigits}" (esperavam-se 2 dígitos numéricos).`);
  }

  if (/^\d{2}$/.test(weekDigits)) {
    week = parseInt(weekDigits, 10);
    if (week < 1 || week > 53) {
      warnings.push(`A semana descodificada (${week}) está fora do intervalo habitual 01-53.`);
    }
  } else {
    warnings.push(`Não foi possível interpretar a semana "${weekDigits}" (esperavam-se 2 dígitos numéricos).`);
  }

  if (year !== null && week !== null && week >= 1 && week <= 53) {
    const monthNumber = monthFromISOWeek(year, week);
    mes = MONTH_NAMES_PT[monthNumber - 1];
  }

  warnings.push(
    "O tipo de aparelho não está disponível para o formato Candy/Hoover: não foi encontrada uma tabela pública de códigos de produto na documentação disponível."
  );

  return {
    formato: "Candy / Hoover (16 dígitos)",
    tipoAparato: null,
    codigoProducto: productCode,
    fabrica: null,
    ubicacionFabrica: null,
    anio: year,
    mes,
    dia: null,
    semana: week,
    numeroSerieDia: serial,
    warnings,
  };
}

module.exports = { decodeCandyHoover };
