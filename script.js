const yearTarget = document.getElementById("year");
const copyLinkButton = document.getElementById("copyLinkButton");
const copyStatus = document.getElementById("copyStatus");
const revealTargets = document.querySelectorAll(".reveal");

if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

if (copyLinkButton && copyStatus) {
  copyLinkButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      copyStatus.textContent = "Portfolio link copied. You can paste it anywhere.";
    } catch (error) {
      copyStatus.textContent = "Copy failed. Use the browser address bar to copy the page link.";
    }
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}
