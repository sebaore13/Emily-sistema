/* Render de car.json -> PNG (opacidad total) con lottie-web + jsdom + resvg (dev only) */
const { JSDOM } = require("jsdom");
const fs = require("fs");
const { Resvg } = require("@resvg/resvg-js");

const html = '<!doctype html><html><body><div id="c"></div></body></html>';
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

anim.addEventListener("DOMLoaded", () => {
  const svg = dom.window.document.getElementById("c").innerHTML;
  const full = `<svg xmlns="http://www.w3.org/2000/svg" width="${data.w}" height="${data.h}">${svg}</svg>`;
  fs.writeFileSync("scripts/car-frame.svg", full);

  const resvg = new Resvg(full, { fitTo: { mode: "width", value: 720 }, background: "#ffffff" });
  const png = resvg.render().asPng();
  fs.writeFileSync("scripts/car-frame.png", png);
  console.log("car-frame.png OK:", png.length, "bytes");
  process.exit(0);
});

setTimeout(() => {
  console.log("TIMEOUT");
  process.exit(2);
}, 6000);