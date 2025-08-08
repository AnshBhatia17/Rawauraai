const axios = require("axios");

exports.generateSpeakingAvatar = async ({ script, avatarUrl, voiceId }) => {
  const payload = {
    script: {
      type: "text",
      input: script,
      provider: {
        type: "microsoft",
        voice_id: voiceId || "en-US-AriaNeural"
      }
    },
    source_url: avatarUrl,
    config: {
      fluent: true
    }
  };

  const apiKey = process.env.DID_API_KEY;

  if (!apiKey) {
    console.error("❌ DID_API_KEY is missing from environment variables.");
    throw new Error("Missing D-ID API key");
  }

  const headers = {
    Authorization: `Basic ${apiKey}`,
    "Content-Type": "application/json"
  };

  console.log("📤 Sending request to D-ID API with payload:");
  console.log(JSON.stringify(payload, null, 2));

  try {
    const response = await axios.post("https://api.d-id.com/talks", payload, { headers });
    console.log("✅ D-ID response received.");
    return response.data;
  } catch (err) {
    console.error("❌ D-ID API error:", err.response?.data || err.message);
    throw err;
  }
};


exports.checkVideoStatus = async (talkId) => {
  const headers = {
    Authorization: `Basic ${process.env.DID_API_KEY}`
  };

  const url = `https://api.d-id.com/talks/${talkId}`;
  const response = await axios.get(url, { headers });

  return response.data;
};