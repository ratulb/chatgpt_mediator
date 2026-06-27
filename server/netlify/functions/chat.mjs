import { getBotResponse } from "../../llm.js";

export const handler = async (event) => {
  try {
    const { prompt } = JSON.parse(event.body);
    const text = await getBotResponse(prompt);
    return {
      statusCode: 200,
      body: JSON.stringify({ bot: text }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message || error }),
    };
  }
};
