const express = require("express");
const router = express.Router();
const { cutVideoByDurations } = require("../controllers/editing.controller");

router.post("/video/slice", cutVideoByDurations);

module.exports = router;
