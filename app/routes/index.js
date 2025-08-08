const express = require("express");

const router = express();
router.use("/api", require("./ai.routes"))
module.exports = router;