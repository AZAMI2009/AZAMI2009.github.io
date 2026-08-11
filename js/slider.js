const testimonialSlider = document.querySelector('.testimonial-slider');

if (testimonialSlider) {
  const wrapper = testimonialSlider.querySelector('.swiper-wrapper');
  const slides = Array.from(wrapper?.querySelectorAll('.swiper-slide') || []);

  if (slides.length > 1) {
    const duplicateSlides = slides.map((slide) => slide.cloneNode(true));
    duplicateSlides.forEach((clone) => {
      clone.classList.add('swiper-slide-duplicate');
      wrapper.appendChild(clone);
    });

    const prependSlides = slides.slice().reverse().map((slide) => slide.cloneNode(true));
    prependSlides.forEach((clone) => {
      clone.classList.add('swiper-slide-duplicate');
      wrapper.insertBefore(clone, wrapper.firstChild);
    });
  }

  new Swiper('.testimonial-slider', {
    loop: slides.length > 1,
    loopAdditionalSlides: 1,
    speed: 800,
    centeredSlides: false,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    slidesPerView: 1,
    slidesPerGroup: 1,
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView: 2,
        slidesPerGroup: 1
      },
      1024: {
        slidesPerView: 3,
        slidesPerGroup: 1
      }
    }
  });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;
    portfolioCards.forEach((card) => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? 'block' : 'none';
    });
  });
});
