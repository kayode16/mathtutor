(() => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-nav');
  function closeNav() { navToggle?.setAttribute('aria-expanded', 'false'); navToggle?.setAttribute('aria-label','Open navigation'); nav?.classList.remove('open'); }
  navToggle?.addEventListener('click', () => { const expanded = navToggle.getAttribute('aria-expanded') === 'true'; navToggle.setAttribute('aria-expanded', String(!expanded)); navToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation'); nav?.classList.toggle('open', !expanded); });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNav(); });
  const programme = document.querySelector('#curriculum');
  document.querySelectorAll('[data-curriculum]').forEach(a => a.addEventListener('click', () => { if (programme) programme.value = a.dataset.curriculum; }));
  document.querySelectorAll('[data-plan]').forEach(a => a.addEventListener('click', () => { const challenge = document.querySelector('#challenge'); if (challenge && !challenge.value.trim()) challenge.value = `I would like information about the ${a.dataset.plan} plan. `; }));
  const year = document.querySelector('#year'); if(year) year.textContent = new Date().getFullYear();
})();
