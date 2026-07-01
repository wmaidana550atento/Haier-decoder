require("dotenv").config();
const path = require("path");
const express = require("express");
const { createClient } = require("@supabase/supabase-js");
const { decodeHaier } = require("./decode/decodeHaier");
const { decodeCandyHoover } = require("./decode/decodeCandyHoover");

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.error("ERRO: Cria o ficheiro .env com SUPABASE_URL e SUPABASE_ANON_KEY.");
  process.exit(1);
}

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const LAN_IP = "192.168.1.233";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/decode", async (req, res) => {
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
});

app.listen(PORT, HOST, () => {
  console.log(`Servidor à escuta em http://localhost:${PORT}`);
  console.log(`Acessível na rede local em http://${LAN_IP}:${PORT}`);
});
