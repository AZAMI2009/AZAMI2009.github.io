const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.site-header');

if (menuToggle && navLinks) {
  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !navLinks.classList.contains('open');
    navLinks.classList.toggle('open', isOpen);
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      document.body.classList.add('nav-open');
      if (header) header.classList.remove('header-hidden');
    } else {
      document.body.classList.remove('nav-open');
    }
  };

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking links
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && navbar && !navbar.contains(e.target)) {
      toggleMenu(false);
    }
  });

  // Close menu on ESC key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      toggleMenu(false);
    }
  });
}

// Smart Navbar Hide on Scroll Down / Show on Scroll Up
if (header) {
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateNavbarVisibility = () => {
    const currentScrollY = window.scrollY;
    const isNavOpen = navLinks && navLinks.classList.contains('open');

    if (currentScrollY <= 20) {
      header.classList.remove('header-hidden');
    } else if (!isNavOpen && currentScrollY > lastScrollY && currentScrollY > 80) {
      // Scroll Down -> Slide Up & Hide
      header.classList.add('header-hidden');
    } else if (currentScrollY < lastScrollY) {
      // Scroll Up -> Slide Down & Show
      header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbarVisibility);
      ticking = true;
    }
  }, { passive: true });
}
