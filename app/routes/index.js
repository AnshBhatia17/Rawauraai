const express = require("express");

const router = express();

router.use("/bgremove", require("./bgRemove.route"));
module.exports = router;