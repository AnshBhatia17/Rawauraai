const { generateSpeakingAvatar,checkVideoStatus } = require("../services/didai.service");

exports.handleAvatarTalk = async (req, res) => {
  try {
    const { prompt, avatarUrl, voiceId } = req.body;

    if (!prompt || !avatarUrl) {
      return res.status(400).json({ error: "Prompt and avatarUrl are required." });
    }

    // Use prompt directly as the script
    const videoData = await generateSpeakingAvatar({ script: prompt, avatarUrl, voiceId });

    res.json({
      script: prompt,
      video: videoData,
    });
  } catch (err) {
    console.error("Error generating avatar talk:", err.message);
    res.status(500).json({ error: "Failed to generate video." });
  }
};



exports.getVideoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Video ID is required." });

    const status = await checkVideoStatus(id);

    res.json({
      id,
      status: status.status,
      videoUrl: status.result_url || null
    });
  } catch (err) {
    console.error("❌ Error fetching video status:", err.message);
    res.status(500).json({ error: "Failed to fetch video status." });
  }
};
