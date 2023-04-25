class ThemeToggler {
  constructor(themeToggleId) {
    this.body = document.body;
    this.themeToggle = document.getElementById(themeToggleId);
    this.svg_background = document.querySelector('.svg_background ');
    this.init();
  }

  init() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || isDarkMode) {
      this.body.classList.add('dark', 'bg-gray-950')
      this.svg_background.id = 'svg_background_dark';
      this.themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark mode';
    }
    if (savedTheme === 'light') {
      this.body.classList.remove('dark');
      this.body.classList.add('bg-slate-200');
      this.svg_background.id = 'svg_background_light';
      this.themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light mode';
    }

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

      // Salva o tema no local storage
      localStorage.setItem('theme', 'dark');
    } else {
      this.themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light mode';
      this.body.classList.remove('bg-gray-950');
      this.body.classList.add('bg-slate-200');
      this.svg_background.id = 'svg_background_light';
      
      localStorage.setItem('theme', 'light');
    }
  }
}

const themeToggler = new ThemeToggler('theme-toggle');
