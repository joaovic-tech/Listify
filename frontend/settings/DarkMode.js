class ThemeToggler {
  constructor(themeToggleId) {
    this.themeToggle = document.getElementById(themeToggleId);
    this.body = document.body;
    this.init();
  }

  init() {
    if (!this.themeToggle) return;
    this.themeToggle.addEventListener('click', () => {
      this.toggleTheme();
    });
  }

  toggleTheme() {
    this.body.classList.toggle('dark');

    if (this.body.classList.contains('dark')) {
      this.themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark mode';
    } else {
      this.themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light mode';
    }
  }
}

const themeToggler = new ThemeToggler('theme-toggle');
