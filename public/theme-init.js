// Runs synchronously in <head> (loaded as an external script so the CSP can forbid inline code).
// Sets data-theme before first paint so the page never flashes the wrong theme.
(function () {
  var theme = null;
  try {
    theme = localStorage.getItem('theme');
  } catch {
    // storage unavailable (private mode, blocked): fall back to the OS preference
  }
  if (theme !== 'light' && theme !== 'dark') {
    theme = matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  document.documentElement.dataset.theme = theme;
})();
