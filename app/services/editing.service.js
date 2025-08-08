const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");

exports.sliceVideoByDurations = async ({ inputPath, outputDir, durations }) => {
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

  let startTime = 0;
  const promises = [];

  durations.forEach((duration, index) => {
    const outputFile = path.join(outputDir, `clip_${index + 1}.mp4`);
    promises.push(
      new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .setStartTime(startTime)
          .setDuration(duration)
          .output(outputFile)
          .on("end", () => resolve(outputFile))
          .on("error", reject)
          .run();
      })
    );
    startTime += duration;
  });

  return Promise.all(promises);
};
