const { sliceVideoByDurations } = require("../services/editing.service");

exports.cutVideoByDurations = async (req, res) => {
  try {
    const { videoPath, durations } = req.body;

    if (!videoPath || !durations || !Array.isArray(durations)) {
      return res.status(400).json({ error: "videoPath and durations[] are required." });
    }

    const outputDir = "./output_clips";
    const clips = await sliceVideoByDurations({ inputPath: videoPath, outputDir, durations });

    res.json({ clips });
  } catch (err) {
    console.error("Error slicing video:", err);
    res.status(500).json({ error: "Failed to slice video." });
  }
};
