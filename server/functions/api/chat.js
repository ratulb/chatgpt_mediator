import { getBotResponse } from "../../llm.js";

export async function onRequest(context) {
  const req = context.request;
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }
  try {
    const { prompt } = await req.json();
    const text = await getBotResponse(prompt);
    return new Response(JSON.stringify({ bot: text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: error.message || error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
