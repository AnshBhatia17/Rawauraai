const backgroundService = require('../services/backgraoundService');
import fs from "fs";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.removeBackground = async (req, res) => {
  try {
    const file = req.file; // assuming multer is used
    console.log("Received removeBackground request with file:", file);
    if (!file) {
      console.log("No file uploaded");
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageUrl = await backgroundService.removeBgFromFile(file);
    console.log("backgroundService.removeBgFromFile result:", imageUrl);
    res.json({ imageUrl });
    console.log("removeBackground endpoint finished!");
  } catch (error) {
    console.error("removeBackground endpoint error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.generateBackground = async(req, res) =>{
  try{
    const originalImagePath = path.join(__dirname, "../public/uploads/original.png");
    const maskImagePath = path.join(__dirname, "../public/processed/xyz.png");
    const response = await openai.images.edit({
    model: "gpt-image-1",  
    prompt: req.body.prompt,
    image: [fs.createReadStream(originalImagePath)],   // Your original image
    mask: fs.createReadStream(maskImagePath),       // Transparent background image
    size: "1024x1024"  
  });

  // Save the new image
  const image_base64 = response.data[0].b64_json;
  fs.writeFileSync("output.png", Buffer.from(image_base64, "base64"));
}catch{

}
  
}