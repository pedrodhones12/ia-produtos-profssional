

import express from "express";
import cors from "cors";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

// necessário para usar path com ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔥 SERVIR ARQUIVOS ESTÁTICOS (HTML, CSS, JS)
app.use(express.static(__dirname));

// 🔥 ROTA PRINCIPAL (resolve o erro Cannot GET /)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // ⚠️ MUITO IMPORTANTE (ver abaixo)
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
Você é a IA pessoal de Pedro Dhones.

Responda como se fosse um assistente dele.
Fale sobre:
- Projetos (Construindo Sonhos Web, IA Entrevistador, Amigo Financeiro)
- Habilidades em IA e tecnologia
- Impacto social
- Seja profissional, direto e inteligente
`
        },
        {
          role: "user",
          content: userMessage
        }
      ]
    });

    res.json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro na IA" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
