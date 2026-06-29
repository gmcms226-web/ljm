const galleryReviewSlider = new Swiper(".galleryReviewSlider", {
  loop: true,
  centeredSlides: true,
  slidesPerView: 5,
  spaceBetween: 20,
  speed: 700,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    640: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 20,
    }
  }
});
const galleryRevealItems = document.querySelectorAll(".gallery-reveal");

const galleryRevealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if(entry.isIntersecting){
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

galleryRevealItems.forEach((item, index) => {
  item.style.transitionDelay = `${index * 120}ms`;
  galleryRevealObserver.observe(item);
});