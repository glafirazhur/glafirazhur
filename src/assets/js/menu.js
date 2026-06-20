document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (!toggleBtn || !navMenu) return;

  function toggleMenu(forceState) {
    const isExpanded = forceState !== undefined ? !forceState : toggleBtn.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;

    toggleBtn.setAttribute('aria-expanded', String(nextState));
    navMenu.classList.toggle('is-active', nextState);
    document.body.classList.toggle('menu-open', nextState);
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking outside the menu or toggle button
  document.addEventListener('click', (e) => {
    const isMenuOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    if (isMenuOpen && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close menu on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const isMenuOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isMenuOpen) {
        toggleMenu(false);
        toggleBtn.focus();
      }
    }
  });

  // Handle window resizing
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      const isMenuOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
      if (isMenuOpen) {
        toggleMenu(false);
      }
    }
  });
});
