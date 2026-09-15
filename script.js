const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const root = document.documentElement;
const doodles = document.querySelectorAll(".doodle");
let frame = 0;
let targetX = window.innerWidth * 0.7;
let targetY = window.innerHeight * 0.15;

const effectsEnabled = () => !reduceMotion.matches && finePointer.matches;

function renderPointer() {
  frame = 0;
  if (!effectsEnabled() || document.hidden) return;

  root.style.setProperty("--pointer-x", `${targetX}px`);
  root.style.setProperty("--pointer-y", `${targetY}px`);

  const horizontal = targetX / window.innerWidth - 0.5;
  const vertical = targetY / window.innerHeight - 0.5;
  doodles.forEach((doodle, index) => {
    const depth = (index + 1) * 4;
    doodle.style.translate = `${horizontal * depth}px ${vertical * depth}px`;
    doodle.style.rotate = `${horizontal * (index % 2 ? -5 : 5)}deg`;
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
  doodles.forEach((doodle) => {
    doodle.style.removeProperty("translate");
    doodle.style.removeProperty("rotate");
  });
}

window.addEventListener("blur", resetEffects);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) resetEffects();
});
reduceMotion.addEventListener("change", resetEffects);
finePointer.addEventListener("change", resetEffects);
