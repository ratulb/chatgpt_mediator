import { getBotResponse } from "../llm.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { prompt } = req.body;
    const text = await getBotResponse(prompt);
    res.status(200).json({ bot: text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || error });
  }
}
