document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    AOS.init({
      duration: 800,
      once: true,
      offset: 70,
      easing: 'ease-out-cubic'
    });

    gsap.registerPlugin(ScrollTrigger);

    // Header Entrance Animation
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
      gsap.fromTo(
        siteHeader,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, delay: 0.1, ease: 'power3.out' }
      );
    }

    const hero = document.querySelector('.hero');
    const heroCopy = document.querySelector('.hero-copy');
    const heroCard = document.querySelector('.hero-card');

    if (hero) {
      const heroOverlay = document.createElement('div');
      heroOverlay.className = 'hero-tech-layer';
      hero.appendChild(heroOverlay);

      const symbols = ['01', '10', '◦', '◌', '∿', '⟡', '⧉', '◼'];
      Array.from({ length: 16 }, (_, index) => {
        const symbol = document.createElement('span');
        symbol.className = 'tech-symbol';
        symbol.textContent = symbols[index % symbols.length];
        symbol.style.left = `${8 + (index % 4) * 22}%`;
        symbol.style.top = `${12 + Math.floor(index / 4) * 20}%`;
        symbol.style.animationDelay = `${index * 0.12}s`;
        heroOverlay.appendChild(symbol);
      });
    }

    // Hero Content Staggered Entrance
    if (heroCopy) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } });
      const brandCard = heroCopy.querySelector('.hero-brand-card');
      const eyebrow = heroCopy.querySelector('.eyebrow');
      const heading = heroCopy.querySelector('h1');
      const heroText = heroCopy.querySelector('.hero-text');
      const strap = heroCopy.querySelector('.hero-strap');
      const actions = heroCopy.querySelector('.hero-actions');
      const profileStrip = heroCopy.querySelector('.hero-profile-strip');

      if (brandCard) tl.fromTo(brandCard, { y: 20, opacity: 0 }, { y: 0, opacity: 1, delay: 0.15 });
      if (eyebrow) tl.fromTo(eyebrow, { y: 18, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.55');
      if (heading) tl.fromTo(heading, { y: 22, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.5');
      if (heroText) tl.fromTo(heroText, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.5');
      if (strap) tl.fromTo(strap, { y: 18, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.45');
      if (actions) tl.fromTo(actions, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.45');
      if (profileStrip) tl.fromTo(profileStrip, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.4');
    }

    if (heroCard) {
      gsap.fromTo(
        heroCard,
        { y: 28, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.85, delay: 0.3, ease: 'power3.out' }
      );
    }

    // Scroll Reveal for Elements
    gsap.utils.toArray('.reveal').forEach((item) => {
      gsap.fromTo(
        item,
        { y: 36, opacity: 0, scale: 0.98, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%'
          }
        }
      );
    });

    const animatedCards = gsap.utils.toArray('.service-card, .why-card, .price-card, .portfolio-card, .blog-card, .process-step, .testimonial-card, .vision-card');
    animatedCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 24, opacity: 0, scale: 0.97 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.75,
          delay: (index % 3) * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 92%'
          }
        }
      );
    });

    // 3D Tilt for desktop screens only
    const interactiveCards = document.querySelectorAll('.service-card, .why-card, .price-card, .portfolio-card, .blog-card, .testimonial-card, .process-step, .contact-card, .hero-card, .vision-card');
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
      interactiveCards.forEach((card) => {
        card.addEventListener('mousemove', (event) => {
          const rect = card.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
          const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
          card.style.setProperty('--tilt-x', `${-y}deg`);
          card.style.setProperty('--tilt-y', `${x}deg`);
          card.classList.add('is-tilted');
        });

        card.addEventListener('mouseleave', () => {
          card.classList.remove('is-tilted');
          card.style.setProperty('--tilt-x', '0deg');
          card.style.setProperty('--tilt-y', '0deg');
        });
      });

      const heroWrap = document.querySelector('.hero-visual');
      if (heroWrap) {
        heroWrap.addEventListener('mousemove', (event) => {
          const rect = heroWrap.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width - 0.5) * 8;
          const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;
          gsap.to(heroWrap, {
            rotateY: x,
            rotateX: -y,
            transformPerspective: 1000,
            duration: 0.45,
            ease: 'power2.out'
          });
        });

        heroWrap.addEventListener('mouseleave', () => {
          gsap.to(heroWrap, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out' });
        });
      }
    }
  }
});
