const Prompt = require("../models/prompts");
const { generateMarketingResponse } = require("../services/ai.services");

const askOpenAI = async (req, res) => {
  try {
    const userPrompt = req.body.prompt;
    if (!userPrompt) return res.status(400).json({ error: "Prompt is required" });

    const reply = await generateMarketingResponse(userPrompt);

    // Save to MongoDB
    const newEntry = await Prompt.create({ prompt: userPrompt, response: reply });

    res.json({ response: reply, id: newEntry._id });
  } catch (err) {
    console.error("OpenAI/Mongo Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

const getPromptHistory = async (req, res) => {
  try {
    const history = await Prompt.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch history" });
  }
};

module.exports = { askOpenAI, getPromptHistory };
