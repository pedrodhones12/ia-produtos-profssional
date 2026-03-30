import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: "SUA_API_KEY_AQUI"
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
    res.status(500).json({ error: "Erro na IA" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
