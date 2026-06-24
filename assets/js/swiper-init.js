new Swiper(".practice-slider", {
  loop: true,
  autoplay: {
    delay: 1500,
    disableOnInteraction: false,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 12,
    },

    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },

    1200: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
});
/*slider-2 학원섹션*/
const academyData = [
  { title: "학원시설", name: "강의실 01" },
  { title: "학원시설", name: "강의실 02" },
  { title: "학원시설", name: "학원로비" },
  { title: "학원시설", name: "학원입구" },
  { title: "학원시설", name: "학원복도" },
  { title: "학원시설", name: "강의실 01" },
  { title: "학원시설", name: "강의실 02" },
  { title: "학원시설", name: "애견샤워실" },
  { title: "학원시설", name: "강의실03" },
  { title: "학원시설", name: "야외교육장" },
  { title: "학원시설", name: "야외교육장(내부)" },
];

const academyTitle = document.querySelector("#academyTitle");
const academyName = document.querySelector("#academyName");

const academySlider = new Swiper(".academy-slider", {
  loop: true,
  centeredSlides: true,
  slidesPerView: "auto",
  spaceBetween: 40,
  speed: 700,
  autoplay: {
    delay: 1800,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".academy-slider__next",
    prevEl: ".academy-slider__prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      centeredSlides: false,
      spaceBetween: 0,
    },
    768: {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 32,
    },
    1200: {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 40,
    },
  },
  on: {
    slideChange: function () {
      const index = this.realIndex;
      academyTitle.textContent = academyData[index].title;
      academyName.textContent = academyData[index].name;
    },
  },
});