const express = require("express");

const router = express();
<<<<<<< HEAD

router.use("/bgremove", require("./bgRemove.route"));
=======
router.use("/api", require("./ai.routes"))
router.use("/api", require("./didai.routes"))
>>>>>>> beaaf6af2ea45a24bacce5ca69779ee08fa8bae2
module.exports = router;