const express = require("express");
const router = express.Router();
const { askOpenAI, getPromptHistory } = require("../controllers/ai.controller");

router.post("/ask", askOpenAI);
router.get("/history", getPromptHistory);

module.exports = router;
