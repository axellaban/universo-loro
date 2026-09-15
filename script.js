const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const root = document.documentElement;
const projects = document.querySelectorAll(".project");
let frame = 0;
let targetX = window.innerWidth * 0.7;
let targetY = window.innerHeight * 0.15;

const effectsEnabled = () => !reduceMotion.matches && finePointer.matches;

// Build the sky once. CSS moves three layers, without a continuous JS loop.
let starSeed = 6;
function starRandom() {
  starSeed = (starSeed * 1664525 + 1013904223) >>> 0;
  return starSeed / 4294967296;
}

document.querySelectorAll(".star-field").forEach((layer, depth) => {
  const stars = document.createDocumentFragment();
  const colors = ["#cadbec", "#a2e6dc", "#a7bbee", "#ece6ce"];

  for (let index = 0; index < Number(layer.dataset.stars); index += 1) {
    const star = document.createElement("span");
    const bright = depth === 2 && index % 5 === 0;
    star.className = bright ? "star star--bright" : "star";
    star.style.setProperty("--x", `${(starRandom() * 100).toFixed(2)}%`);
    star.style.setProperty("--y", `${(starRandom() * 100).toFixed(2)}%`);
    star.style.setProperty("--size", `${(.6 + depth * .4 + starRandom() * .8).toFixed(2)}px`);
    star.style.setProperty("--opacity", (.3 + starRandom() * .6).toFixed(2));
    star.style.setProperty("--starlight", colors[Math.floor(starRandom() * colors.length)]);
    star.style.setProperty("--delay", `${(-starRandom() * 10).toFixed(2)}s`);
    stars.append(star);
  }

  layer.replaceChildren(stars);
});

function renderPointer() {
  frame = 0;
  if (!effectsEnabled() || document.hidden) return;

  root.style.setProperty("--pointer-x", `${targetX}px`);
  root.style.setProperty("--pointer-y", `${targetY}px`);

  const horizontal = targetX / window.innerWidth - 0.5;
  const vertical = targetY / window.innerHeight - 0.5;
  root.style.setProperty("--space-x", `${horizontal * -24}px`);
  root.style.setProperty("--space-y", `${vertical * -18}px`);

  projects.forEach((project) => {
    const rect = project.getBoundingClientRect();
    project.style.setProperty("--card-x", `${targetX - rect.left}px`);
    project.style.setProperty("--card-y", `${targetY - rect.top}px`);
  });
}

document.addEventListener("pointermove", (event) => {
  if (!effectsEnabled() || event.pointerType === "touch") return;
  targetX = event.clientX;
  targetY = event.clientY;
  if (!frame) frame = requestAnimationFrame(renderPointer);
}, { passive: true });

function resetEffects() {
  cancelAnimationFrame(frame);
  frame = 0;
  ["--space-x", "--space-y", "--pointer-x", "--pointer-y"].forEach((property) => {
    root.style.removeProperty(property);
  });
  projects.forEach((project) => {
    project.style.removeProperty("--card-x");
    project.style.removeProperty("--card-y");
  });
}

window.addEventListener("blur", resetEffects);
document.addEventListener("visibilitychange", () => {
  root.toggleAttribute("data-motion-paused", document.hidden);
  if (document.hidden) resetEffects();
});
root.toggleAttribute("data-motion-paused", document.hidden);
reduceMotion.addEventListener("change", resetEffects);
finePointer.addEventListener("change", resetEffects);
