const galleryReviewSlider = new Swiper(".galleryReviewSlider", {
  loop: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 80,
  speed: 700,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },

  breakpoints: {
    0: {
      spaceBetween: 24,
    },
    768: {
      spaceBetween: 80,
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