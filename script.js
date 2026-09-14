const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
const cursorLight = document.querySelector(".cursor-light");
const projects = document.querySelectorAll(".project");
let pendingFrame = 0;
let pointerX = 0;
let pointerY = 0;

const effectsEnabled = () => !motionQuery.matches && pointerQuery.matches;

document.addEventListener("pointermove", (event) => {
  if (!effectsEnabled() || event.pointerType === "touch") return;
  pointerX = event.clientX;
  pointerY = event.clientY;

  if (pendingFrame) return;
  pendingFrame = requestAnimationFrame(() => {
    pendingFrame = 0;
    if (!effectsEnabled() || document.hidden) return;
    cursorLight.style.transform = `translate(${pointerX}px, ${pointerY}px)`;
    cursorLight.classList.add("is-active");

    projects.forEach((card) => {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty("--glow-x", `${pointerX - bounds.left}px`);
      card.style.setProperty("--glow-y", `${pointerY - bounds.top}px`);
    });
  });
}, { passive: true });

const resetLight = () => {
  cancelAnimationFrame(pendingFrame);
  pendingFrame = 0;
  cursorLight.classList.remove("is-active");
};

document.addEventListener("pointerout", (event) => {
  if (!event.relatedTarget) resetLight();
});
window.addEventListener("blur", resetLight);
motionQuery.addEventListener("change", resetLight);
pointerQuery.addEventListener("change", resetLight);
document.addEventListener("visibilitychange", () => {
  document.querySelectorAll(".light").forEach((light) => {
    light.style.animationPlayState = document.hidden ? "paused" : "running";
  });
  if (document.hidden) resetLight();
});
