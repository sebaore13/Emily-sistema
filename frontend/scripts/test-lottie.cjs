/* Prueba de render de car.json con lottie-web + jsdom (dev only) */
const { JSDOM } = require("jsdom");
const fs = require("fs");

const html = '<!doctype html><html><body><div id="c" style="width:400px;height:400px"></div></body></html>';
const dom = new JSDOM(html, { pretendToBeVisual: true });

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.requestAnimationFrame = dom.window.requestAnimationFrame.bind(dom.window);

// Stub mínimo de canvas para jsdom (no se usa el renderer canvas)
dom.window.HTMLCanvasElement.prototype.getContext = function () {
  return new Proxy(
    {},
    {
      get: (_t, prop) => (typeof prop === "string" ? () => {} : undefined),
      set: () => true,
    }
  );
};

process.on("uncaughtException", (e) => {
  console.log("UNCAUGHT:", e.message);
  process.exit(3);
});

const lottie = require("lottie-web");
const data = JSON.parse(fs.readFileSync("public/animations/car.json", "utf-8"));

let anim;
try {
  anim = lottie.loadAnimation({
    container: dom.window.document.getElementById("c"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: data,
  });
  console.log("loadAnimation OK");
} catch (e) {
  console.log("ERROR loadAnimation:", e.message);
  process.exit(1);
}

anim.addEventListener("DOMLoaded", () => {
  const svg = dom.window.document.getElementById("c").innerHTML;
  console.log("DOMLoaded OK, SVG length:", svg.length);

  // Analiza cada segmento path: fill + primeras coordenadas
  const paths = [...svg.matchAll(/<(path|rect|circle)[^>]*fill="([^"]+)"[^>]*d="([^"]*)"/g)];
  console.log("elementos con fill:", paths.length);
  paths.forEach((p, i) => {
    const d = p[3];
    console.log(`#${i} fill=${p[2]} inicio=${JSON.stringify(d.slice(0, 48))} len=${d.length}`);
  });

  const ok = paths.length >= 4;
  process.exit(ok ? 0 : 2);
});

setTimeout(() => {
  const svg = dom.window.document.getElementById("c").innerHTML;
  console.log("TIMEOUT - frame:", anim.currentFrame, "isLoaded:", anim.isLoaded);
  console.log("SVG length:", svg.length);
  console.log(svg.slice(0, 900));
  process.exit(2);
}, 6000);