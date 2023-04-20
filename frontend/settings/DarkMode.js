class ThemeToggler {
  constructor(themeToggleId) {
    this.themeToggle = document.getElementById(themeToggleId);
    this.body = document.body;
    this.init();
    this.svg_background = document.querySelector('.svg_background ');
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
      this.body.classList.remove('bg-slate-200');
      this.body.classList.add('bg-gray-950');
      this.svg_background.id = 'svg_background_dark';
    } else {
      this.themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light mode';
      this.body.classList.remove('bg-gray-950');
      this.body.classList.add('bg-slate-200');
      this.svg_background.id = 'svg_background_light';
    }
  }
}

const themeToggler = new ThemeToggler('theme-toggle');