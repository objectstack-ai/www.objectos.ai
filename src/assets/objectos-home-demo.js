// The home page's run recording (src/components/MarketingHome.astro, see the
// DEMO_* note in its frontmatter). The video has no `src` and no `autoplay`
// in the HTML, so the browser fetches nothing for it and starts nothing on
// its own; this script is the only thing that can. It loads and plays the
// video when it nears the viewport and the reader allows motion, pauses it
// when it leaves, and never loads it under `prefers-reduced-motion: reduce`
// unless the reader presses play.
//
// Served as its own file, not inlined, so the site's script-src 'self'
// covers it without a hash; plain JavaScript because Vite copies it as is.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

for (const root of document.querySelectorAll('[data-demo]')) {
  const video = root.querySelector('video');
  const poster = root.querySelector('img');
  const toggle = root.querySelector('.demo-toggle');
  const source = video?.dataset.src;
  if (!video || !poster || !toggle || !source) continue;
  let inView = false;
  // The reader's own choice, which wins over both the viewport and the
  // motion preference: 'play' after pressing play, 'pause' after pausing.
  let choice = null;

  const sync = () => {
    const playing = !video.paused;
    toggle.dataset.state = playing ? 'playing' : 'paused';
    toggle.setAttribute('aria-label', (playing ? toggle.dataset.pauseLabel : toggle.dataset.playLabel) ?? '');
  };
  const play = () => {
    if (!video.getAttribute('src')) {
      // The poster the reader is already looking at, from the cache.
      video.poster = poster.currentSrc || poster.src;
      video.src = source;
    }
    video.muted = true;
    video.play().catch(sync);
  };
  const update = () => {
    const wanted = inView && choice !== 'pause' && (choice === 'play' || !reduceMotion.matches);
    if (wanted) {
      if (video.paused) play();
    } else if (!video.paused) {
      video.pause();
    }
  };

  video.addEventListener('play', sync);
  video.addEventListener('pause', sync);
  toggle.addEventListener('click', () => {
    choice = video.paused ? 'play' : 'pause';
    update();
  });
  reduceMotion.addEventListener('change', update);
  new IntersectionObserver(
    (entries) => {
      inView = entries.some((entry) => entry.isIntersecting);
      update();
    },
    { rootMargin: '200px 0px' },
  ).observe(root);
  toggle.hidden = false;
  sync();
}
