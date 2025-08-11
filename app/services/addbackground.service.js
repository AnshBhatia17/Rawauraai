const path = require("path");
const fs = require("fs");
const mergeImages = require("merge-images");
const { Canvas, Image } = require("canvas");
const sharp = require("sharp");

const width = 3000;  // will be decided after the frontend implementation
const height = 3000; // will be decided after the frontend implementation

async function resizeImage(userImage) {  // resizing will be finalised by the frontend team cuz we need 
// to have standard input criteria to adjust iamge for merging
  try {
    const inputPath = path.join(__dirname, "../public/processed", userImage);
    const outputDir = path.join(__dirname, "../public/resized");
    const outputPath = path.join(outputDir, userImage);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    await sharp(inputPath).resize(width, height).toFile(outputPath);
    console.log(`Resized image saved: ${outputPath}`);

    return outputPath;
  } catch (error) {
    console.error("Error resizing image:", error);
    throw error;
  }
}

async function mergeProfileWithBackground(userImage, background, mergedImage) {
  try {
    const profilePath = path.join(__dirname, "../public/resized", userImage);
    const backgroundPath = path.join(__dirname, "../public/backgrounds", background);
    const outputDir = path.join(__dirname, "../public/merged");
    const outputPath = path.join(outputDir, mergedImage);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    if (!fs.existsSync(profilePath) || !fs.existsSync(backgroundPath)) {
      throw new Error("Profile or background image not found.");
    }

    const mergedBase64 = await mergeImages(
      [
        { src: backgroundPath, width, height },
        { src: profilePath, x: 1000, y: 750 }
      ],
      { Canvas, Image }
    );

    const base64Data = mergedBase64.replace(/^data:image\/png;base64,/, "");
    fs.writeFileSync(outputPath, base64Data, "base64");

    console.log(`Merged image saved: ${outputPath}`);
    return outputPath;
  } catch (error) {
    console.error("Error merging images:", error);
    throw error;
  }
}

module.exports = {
  resizeImage,
  mergeProfileWithBackground
};
