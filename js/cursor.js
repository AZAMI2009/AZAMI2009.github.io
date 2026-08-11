const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let pointerX = window.innerWidth / 2;
  let pointerY = window.innerHeight / 2;
  let targetX = pointerX;
  let targetY = pointerY;

  const updateCursor = () => {
    pointerX += (targetX - pointerX) * 0.18;
    pointerY += (targetY - pointerY) * 0.18;
    cursorGlow.style.left = `${pointerX}px`;
    cursorGlow.style.top = `${pointerY}px`;
    requestAnimationFrame(updateCursor);
  };

  updateCursor();

  window.addEventListener('mousemove', (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
  });

  window.addEventListener('mousedown', () => cursorGlow.classList.add('clicked'));
  window.addEventListener('mouseup', () => cursorGlow.classList.remove('clicked'));

  document.querySelectorAll('a, button, input, textarea, .service-card, .why-card, .portfolio-card, .price-card, .blog-card, .hero-card, .testimonial-card, .process-step').forEach((element) => {
    element.addEventListener('mouseenter', () => cursorGlow.classList.add('active'));
    element.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
  });
}
