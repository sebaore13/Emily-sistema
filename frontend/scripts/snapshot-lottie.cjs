/* Render de car.json -> PNG para inspección visual (dev only) */
const { JSDOM } = require("jsdom");
const fs = require("fs");
const { loadSVGFromString, createCanvas } = require("@napi-rs/canvas");

const html = '<!doctype html><html><body><div id="c" style="width:400px;height:400px"></div></body></html>';
const dom = new JSDOM(html, { pretendToBeVisual: true });

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);

dom.window.HTMLCanvasElement.prototype.getContext = function () {
  return new Proxy({}, { get: (_t, p) => (typeof p === "string" ? () => {} : undefined), set: () => true });
};

const lottie = require("lottie-web");
const data = JSON.parse(fs.readFileSync("public/animations/car.json", "utf-8"));

const anim = lottie.loadAnimation({
  container: dom.window.document.getElementById("c"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  animationData: data,
});

anim.addEventListener("DOMLoaded", async () => {
  const svg = dom.window.document.getElementById("c").innerHTML;
  const svgFull = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">${svg.replace(/<clipPath[\s\S]*?<\/clipPath>/, "")}</svg>`;
  try {
    const img = await loadSVGFromString(svgFull);
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 400, 400);
    ctx.drawImage(img, 0, 0, 400, 400);
    fs.writeFileSync("scripts/snapshot-frame0.png", canvas.toBuffer("image/png"));
    console.log("PNG guardado OK");

    // Avanza 15 frames (momento de rebote) y captura otro frame
    anim.goToAndStop(15, true);
    anim.addEventListener("DOMLoaded", async () => {
      const svg2 = dom.window.document.getElementById("c").innerHTML;
      const img2 = await loadSVGFromString(
        `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">${svg2.replace(/<clipPath[\s\S]*?<\/clipPath>/, "")}</svg>`
      );
      const c2 = createCanvas(400, 400);
      const x2 = c2.getContext("2d");
      x2.fillStyle = "#ffffff";
      x2.fillRect(0, 0, 400, 400);
      x2.drawImage(img2, 0, 0, 400, 400);
      fs.writeFileSync("scripts/snapshot-frame15.png", c2.toBuffer("image/png"));
      console.log("Frame 15 PNG guardado OK");
      process.exit(0);
    });
  } catch (e) {
    console.log("ERROR snapshot:", e.message);
    process.exit(1);
  }
});

setTimeout(() => {
  console.log("TIMEOUT");
  process.exit(2);
}, 8000);