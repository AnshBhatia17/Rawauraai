const express = require("express");
const router = express.Router();
const ImageController = require("../controllers/imageMergerController");

router.post("/addBg", ImageController.addBackground);
module.exports = router;