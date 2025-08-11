import mergeImages from "merge-images";

mergeImages(["/body.png", "/eyes.png", "/mouth.png"]).then(
  (b64) => (document.querySelector("img").src = b64)
);
const mergeImages = require("merge-images");
const Canvas = require("canvas"); // Required for Node.js usage

mergeImages(["./image1.png", "./image2.png"], { Canvas: Canvas }).then((b64) =>
  console.log(b64)
);
