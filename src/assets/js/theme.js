(function () {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    // Determine current theme, falling back to OS preference if none is saved
    const currentTheme = document.documentElement.getAttribute('data-theme') || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Toggle theme value
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    // Apply the new theme attribute and native color-scheme override
    document.documentElement.setAttribute('data-theme', newTheme);
    document.documentElement.style.colorScheme = newTheme;

    // Save choice to localStorage
    localStorage.setItem('theme', newTheme);
    
    toggleBtn.setAttribute('aria-label', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`);
    toggleBtn.setAttribute('title', `Switch to ${newTheme === 'dark' ? 'light' : 'dark'} mode`);
  });
})();
