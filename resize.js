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

  // Not even sure if this works
  function startSiteChangeWatcher(intervalMs = 30000) {
    const url = window.location.origin + window.location.pathname;
    let lastSignature = null;

    async function checkOnce() {
      try {
        const res = await fetch(url, {
          method: 'GET',
          cache: 'no-store',
        });

        const etag = res.headers.get('ETag');
        const lastModified = res.headers.get('Last-Modified');

        let signature = etag || lastModified;

        if (!signature) {
          const text = await res.text();
          signature = `${text.length}:${text.slice(0, 64)}`;
        }

        if (lastSignature === null) {
          lastSignature = signature;
          return;
        }

        if (signature !== lastSignature) {
          window.location.reload();
        }
      } catch (e) {
        console.error('Site change watcher error:', e);
      }
    }

    checkOnce();
    setInterval(checkOnce, intervalMs);
  }

  window.addEventListener('resize', applyResponsiveScale);
  window.addEventListener('orientationchange', applyResponsiveScale);
  document.addEventListener('DOMContentLoaded', () => {
    applyResponsiveScale();
    startSiteChangeWatcher();
  });
})();
