
const express = require("express");
const router = express.Router();
const videoController = require("../controllers/didai.controller");

router.post("/talk", videoController.handleAvatarTalk);
router.get("/video/:id", videoController.getVideoStatus);

module.exports = router;
