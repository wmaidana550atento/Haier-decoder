const { isoWeek } = require("./isoWeek");

// Codigo Haier: 20 caracteres alfanumericos.
// 1=Categoria | 2=Tipo de produto | 3-5=Modelo base | 6=Versao | 7=Finalidade
// 8-9=Caracteristica comercial | 10-11=Caracteristica de producao
// 12-13=Fabrica | 14=Ano | 15=Mes | 16=Dia | 17-20=Serie do dia
async function decodeHaier(code, supabase) {
  const categoryCode = code[0];
  const factoryCode = code.slice(11, 13);
  const yearCode = code[13];
  const monthCode = code[14];
  const dayCode = code[15];
  const dailySerial = code.slice(16, 20);

  const [
    { data: categoryData },
    { data: factoryData },
    { data: yearData },
    { data: monthData },
    { data: dayData },
  ] = await Promise.all([
    supabase.from("appliance_category").select("name_pt").eq("code", categoryCode).maybeSingle(),
    supabase.from("factory").select("name, location_note").eq("code", factoryCode).maybeSingle(),
    supabase.from("year_code").select("year").eq("code", yearCode).maybeSingle(),
    supabase.from("month_code").select("month_number, name_pt").eq("code", monthCode).maybeSingle(),
    supabase.from("day_code").select("day").eq("code", dayCode).maybeSingle(),
  ]);

  const warnings = [];
  if (code.includes("I") || code.includes("O")) {
    warnings.push('O código contém "I" ou "O", letras que o padrão Haier nunca utiliza. Verifica se o código foi transcrito corretamente.');
  }
  if (!categoryData) warnings.push(`Categoria de produto desconhecida: "${categoryCode}".`);
  if (!factoryData)  warnings.push(`Código de fábrica desconhecido: "${factoryCode}".`);
  if (!yearData)     warnings.push(`Código de ano desconhecido: "${yearCode}".`);
  if (!monthData)    warnings.push(`Código de mês desconhecido: "${monthCode}".`);
  if (!dayData)      warnings.push(`Código de dia desconhecido: "${dayCode}".`);

  let week = null;
  if (yearData && monthData && dayData) {
    week = isoWeek(yearData.year, monthData.month_number, dayData.day);
  }

  return {
    formato: "Haier (20 dígitos)",
    tipoAparato:     categoryData ? categoryData.name_pt      : null,
    fabrica:         factoryData  ? factoryData.name           : null,
    ubicacionFabrica:factoryData  ? factoryData.location_note  : null,
    anio:            yearData     ? yearData.year              : null,
    mes:             monthData    ? monthData.name_pt          : null,
    dia:             dayData      ? dayData.day                : null,
    semana:          week,
    numeroSerieDia:  dailySerial,
    warnings,
  };
}

module.exports = { decodeHaier };
