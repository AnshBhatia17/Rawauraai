const express = require("express");

const router = express();

router.use("/bgremove", require("./bgRemove.route"));
router.use("/api", require("./ai.routes"))
router.use("/api", require("./didai.routes"))
module.exports = router;