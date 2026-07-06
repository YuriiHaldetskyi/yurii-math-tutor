const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const nav = document.querySelector('[data-nav]');

window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

document.querySelectorAll('[data-slider]').forEach((slider) => {
  const track = slider.querySelector('[data-slider-track]');
  const progress = slider.querySelector('[data-slider-progress]');
  const cards = [...track.children];
  const move = (direction) => track.scrollBy({ left: direction * (cards[0].getBoundingClientRect().width + 20), behavior: 'smooth' });

  slider.querySelector('[data-slider-prev]')?.addEventListener('click', () => move(-1));
  slider.querySelector('[data-slider-next]')?.addEventListener('click', () => move(1));
  track.addEventListener('scroll', () => {
    const max = track.scrollWidth - track.clientWidth;
    const ratio = max > 0 ? track.scrollLeft / max : 0;
    progress.style.transform = `translateX(${ratio * 200}%)`;
  }, { passive: true });
});

document.querySelector('[data-year]').textContent = new Date().getFullYear();
