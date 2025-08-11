const { mergeProfileWithBackground } = require('../services/addbackground.service.js');
    const imageService = require('../services/addbackground.service.js');

async function addBackground(req, res) {
  try {
    const { userImage, background, mergedImage } = req.body;

    // Step 1: Resize image
    await imageService.resizeImage(userImage);

    // Step 2: Merge images
    await imageService.mergeProfileWithBackground(userImage, background, mergedImage);

    res.json({ message: "Image resized and merged successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  addBackground
};
