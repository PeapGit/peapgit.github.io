(function () {
  const BASE_WIDTH = 1280;
  const BASE_HEIGHT = 720;
  const BASE_FONT_SIZE = 13;

  function applyResponsiveScale() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const scaleFromWidth = Math.min(vw / 1600, 1.1);
    const scaleFromHeight = Math.min(vh / 900, 1.1);

    const scale = Math.max(Math.min((scaleFromWidth + scaleFromHeight) / 2, 1.1), 0.85);

    document.documentElement.style.fontSize = `${BASE_FONT_SIZE * scale}px`;

    const tiltCard = document.querySelector('.tilt-card');
    if (tiltCard) {
      tiltCard.style.transformOrigin = 'center';
      tiltCard.style.scale = `${scale}`;
    }
  }

  window.addEventListener('resize', applyResponsiveScale);
  window.addEventListener('orientationchange', applyResponsiveScale);
  document.addEventListener('DOMContentLoaded', applyResponsiveScale);
})();
