const { createClient } = require("@supabase/supabase-js");
const { decodeHaier } = require("../decode/decodeHaier");
const { decodeCandyHoover } = require("../decode/decodeCandyHoover");

function normalizeSupabaseUrl(url) {
  if (!url) return "";
  return url.trim().replace(/\/rest\/v1\/?$/i, "").replace(/\/$/, "");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
  }

  const supabaseUrl = normalizeSupabaseUrl(process.env.SUPABASE_URL);
  const supabaseAnonKey = (process.env.SUPABASE_ANON_KEY || "").trim();

  if (!supabaseUrl || !supabaseAnonKey) {
    return res.status(500).json({
      error: "Configuração em falta no servidor (SUPABASE_URL / SUPABASE_ANON_KEY).",
    });
  }

  let supabase;
  try {
    // Força validação do formato da URL para evitar crash opaco no runtime.
    new URL(supabaseUrl);
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    return res.status(500).json({
      error: "SUPABASE_URL inválida na configuração do servidor.",
    });
  }

  const raw = (req.body && req.body.code) || "";
  const code = raw.trim().toUpperCase().replace(/\s+/g, "");

  if (!code) {
    return res.status(400).json({ error: "Introduz um código de série." });
  }
  if (!/^[A-Z0-9]+$/.test(code)) {
    return res.status(400).json({ error: "O código só pode conter letras e números." });
  }
  if (code.length !== 16 && code.length !== 20) {
    return res.status(400).json({
      error: `Comprimento inválido (${code.length} caracteres). O código deve ter 16 dígitos (Candy/Hoover) ou 20 dígitos (Haier).`,
    });
  }

  try {
    const result = code.length === 20
      ? await decodeHaier(code, supabase)
      : decodeCandyHoover(code);
    res.json({ code, ...result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro interno ao descodificar o código." });
  }
};
