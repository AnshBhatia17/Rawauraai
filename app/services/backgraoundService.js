const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

exports.removeBgFromFile = async (file) => {
  try {
    // Ensure processed folder exists
    const outputDir = path.join(__dirname, "../public/processed");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Prepare form data for Remove.bg API
    const formData = new FormData();
    formData.append("image_file", fs.createReadStream(file.path));
    formData.append("size", "auto");

    // Call Remove.bg API
    const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "X-Api-Key": process.env.REMOVE_BG_KEY,
        },
        responseType: "arraybuffer",
      }
    );
    const contentType = response.headers["content-type"];
    if (contentType.includes("application/json")) {
      const errorJson = JSON.parse(response.data.toString());
      console.error("Remove.bg API error:", errorJson);
      throw new Error(errorJson.errors[0].title);
    }
    // Save the processed image
    const outputPath = path.join(outputDir, `${file.filename}_no-bg.png`);
    fs.writeFileSync(outputPath, response.data);

    return `/processed/${file.filename}_no-bg.png`;
  } catch (error) {
    console.error(
      "Error removing background:",
      error.response?.data || error.message
    );
    throw new Error("Failed to remove background");
  }
};
