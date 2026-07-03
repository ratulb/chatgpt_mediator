import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { getBotResponse } from "./llm.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({ message: "OK from LLM Mediator" });
});
app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const text = await getBotResponse(prompt);
    res.status(200).send({ bot: text });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message || error });
  }
});
app.listen(5000, () => {
  console.log("Server listening on port http://localhost:" + 5000);
});
