const { createClient } = require("@supabase/supabase-js");
const { decodeHaier } = require("../decode/decodeHaier");
const { decodeCandyHoover } = require("../decode/decodeCandyHoover");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido." });
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
