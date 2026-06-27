import OpenAI from "openai";

function getClient() {
  const baseURL = process.env.LLM_BASE_URL || undefined;
  const apiKey = process.env.LLM_API_KEY || process.env.OPENAI_API_KEY || "sk-placeholder";
  return new OpenAI({ apiKey, baseURL });
}

function getModel() {
  return process.env.LLM_MODEL || "gpt-4o-mini";
}

async function mockResponse(prompt) {
  return `Mock response to: "${prompt}"`;
}

async function llmResponse(prompt) {
  const openai = getClient();
  const response = await openai.chat.completions.create({
    model: getModel(),
    messages: [{ role: "user", content: prompt }],
    temperature: 0.1,
    max_tokens: 2000,
  });
  return response.choices[0].message.content;
}

const PROVIDERS = {
  mock: mockResponse,
  openai: llmResponse,
  ollama: llmResponse,
  generic: llmResponse,
};

export async function getBotResponse(prompt) {
  const provider = process.env.LLM_PROVIDER || "openai";
  const handler = PROVIDERS[provider];
  if (!handler) {
    throw new Error(`Unknown LLM_PROVIDER: "${provider}". Use: ${Object.keys(PROVIDERS).join(", ")}`);
  }
  return handler(prompt);
}
