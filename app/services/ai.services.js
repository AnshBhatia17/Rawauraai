const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const generateMarketingResponse = async (prompt) => {
  const messages = [
    {
      role: "system",
      content:
        "You are a professional marketing assistant. Your job is to provide insightful, creative, and practical advice for marketing strategies, campaigns, and content writing.",
    },
    {
      role: "user",
      content: prompt,
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7,
    max_tokens: 1000,
  });

  return response.choices[0].message.content;
};

module.exports = { generateMarketingResponse };
