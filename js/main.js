document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const progressBar = document.getElementById('loadingProgress');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTopBtn = document.getElementById('backToTop');
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const promoFloating = document.getElementById('promoFloating');
  const promoFloatingClose = document.getElementById('promoFloatingClose');

  if (promoFloating && promoFloatingClose) {
    const promoClosed = localStorage.getItem('solution-promo-closed');
    if (!promoClosed) {
      setTimeout(() => {
        promoFloating.classList.add('is-visible');
      }, 900);
    }

    promoFloatingClose.addEventListener('click', () => {
      promoFloating.classList.remove('is-visible');
      localStorage.setItem('solution-promo-closed', 'true');
    });
  }

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 14;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    progressBar.style.width = `${progress}%`;
  }, 90);

  window.addEventListener('load', () => {
    progressBar.style.width = '100%';
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.style.overflowX = 'hidden';
      document.body.classList.add('page-ready');
    }, 700);
  });

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxHeight > 0 ? (scrollTop / maxHeight) * 100 : 0;
    scrollProgress.style.width = `${percent}%`;
    backToTopBtn.classList.toggle('visible', scrollTop > 500);

    if (header) {
      header.classList.toggle('scrolled', scrollTop > 24);
    }

    const sections = document.querySelectorAll('main section[id]');
    sections.forEach((section) => {
      const top = section.offsetTop - 140;
      const bottom = top + section.offsetHeight;
      if (scrollTop >= top && scrollTop < bottom) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
        });
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-links.open').forEach((openMenu) => openMenu.classList.remove('open'));
    });
  });
});
