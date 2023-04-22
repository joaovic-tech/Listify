class ThemeToggler {
  constructor(themeToggleId) {
    this.themeToggle = document.getElementById(themeToggleId);
    this.body = document.body;
    this.svg_background = document.querySelector('.svg_background ');
    this.init();
  }

  init() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Recupera o tema do local storage, se existir
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || isDarkMode) {
      this.body.classList.add('dark', 'bg-gray-950')
      this.svg_background.id = 'svg_background_dark';
      this.themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark mode';
    } else {
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

      // Remove o tema do local storage
      localStorage.removeItem('theme');
    }
  }
}

const themeToggler = new ThemeToggler('theme-toggle');
