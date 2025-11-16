(function () {
  const BASE_WIDTH = 1280;
  const BASE_HEIGHT = 720;
  const BASE_FONT_SIZE = 16;
  function applyResponsiveScale() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const scaleFromWidth = Math.min(vw / 1600, 1.0);
    const scaleFromHeight = Math.min(vh / 900, 1.0);
    
    const scale = Math.max(Math.min((scaleFromWidth + scaleFromHeight) / 2, 1.0), 0.8);

    document.documentElement.style.fontSize = `${BASE_FONT_SIZE * scale}px`;
    document.documentElement.style.setProperty('--card-scale', scale.toString());

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
