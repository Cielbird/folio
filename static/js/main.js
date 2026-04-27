// ── Dark / light mode ─────────────────────────────────────
const html = document.documentElement;
const themeBtn = document.getElementById('theme-toggle');

// Re-enable transitions after the initial paint is committed
requestAnimationFrame(() => requestAnimationFrame(() => {
  html.classList.remove('no-transition');
}));

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

// ── Mobile nav ────────────────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });

  // close when a link is tapped
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Tag filter ────────────────────────────────────────────
const filterBar = document.getElementById('tag-filter');
const postList  = document.getElementById('post-list') || document.getElementById('project-grid');

if (filterBar && postList) {
  const buttons = filterBar.querySelectorAll('.filter-btn');
  const items   = postList.querySelectorAll('.filterable');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag;

      // update active button
      buttons.forEach(b => b.classList.toggle('active', b === btn));

      // show/hide items
      items.forEach(item => {
        if (tag === 'all') {
          item.classList.remove('hidden');
        } else {
          const tags = (item.dataset.tags || '').split(' ');
          item.classList.toggle('hidden', !tags.includes(tag));
        }
      });
    });
  });
}

// ── Hover-play videos in project cards ───────────────────
document.querySelectorAll('.project-media--video video').forEach(video => {
  const card = video.closest('.project-card');
  if (!card) return;
  card.addEventListener('mouseenter', () => video.play().catch(() => {}));
  card.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; });
});
