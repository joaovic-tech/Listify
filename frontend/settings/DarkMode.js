class ThemeToggler {
  constructor(themeToggleId) {
    this.body = document.body;
    this.themeToggle = document.getElementById(themeToggleId);
    this.svgBackground = document.querySelector('.svg_background');
    window.addEventListener('scroll', this.handleScroll.bind(this));
    this.init();
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    
    if (scrollTop > headerHeight) {
      this.body.classList.add('h-auto');
      this.body.classList.remove('h-screen');
    } else {
      this.body.classList.add('h-screen');
      this.body.classList.remove('h-auto');
    }
  }

  init() {
    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || isDarkMode) {
      this.body.classList.add('dark', 'from-gray-800', 'to-gray-950');
      this.svgBackground.id = 'svg_background_dark';
      this.themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark mode';
    } else if (savedTheme === 'light') {
      this.body.classList.remove('dark');
      this.body.classList.add('from-slate-200', 'to-slate-300');
      this.svgBackground.id = 'svg_background_light';
      this.themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light mode';
    }

    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', this.toggleTheme.bind(this));
    }
  }

  toggleTheme() {
    const darkTheme = this.body.classList.toggle('dark');

    if (darkTheme) {
      this.themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark mode';
      this.body.classList.remove('from-slate-200', 'to-slate-300');
      this.body.classList.add('from-gray-800', 'to-gray-950');
      this.svgBackground.id = 'svg_background_dark';
      localStorage.setItem('theme', 'dark');
    } else {
      this.themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light mode';
      this.body.classList.remove('from-gray-800', 'to-gray-950');
      this.body.classList.add('from-slate-200', 'to-slate-300');
      this.svgBackground.id = 'svg_background_light';
      localStorage.setItem('theme', 'light');
    }
  }
}

const themeToggler = new ThemeToggler('theme-toggle');
