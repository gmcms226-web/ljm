function applyImageFallback(img) {
  if (img.dataset.fallbackApplied) return;
  if (img.complete && img.naturalWidth > 0) return;
  img.dataset.fallbackApplied = "true";

  const computed = window.getComputedStyle(img);
  const placeholder = document.createElement("span");
  placeholder.className = "img-placeholder";
  placeholder.style.display = "flex";
  placeholder.style.width = computed.width !== "0px" ? computed.width : "100%";
  placeholder.style.height = computed.height !== "0px" ? computed.height : "auto";
  placeholder.style.minHeight = "24px";
  placeholder.style.borderRadius = computed.borderRadius;
  placeholder.textContent = img.alt ? img.alt : "IMAGE";

  img.style.display = "none";
  img.insertAdjacentElement("afterend", placeholder);
}

document.addEventListener(
  "error",
  (e) => {
    if (e.target && e.target.tagName === "IMG") {
      applyImageFallback(e.target);
    }
  },
  true
);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("img").forEach((img) => {
    if (img.complete && img.naturalWidth === 0) {
      applyImageFallback(img);
    }
  });
});
/*강의소개 섹션*/
const courseSection = document.querySelector(".course-section");
const revealItems = document.querySelectorAll(".course-section .reveal-up");

let revealTimers = [];

function clearRevealTimers() {
  revealTimers.forEach((timer) => clearTimeout(timer));
  revealTimers = [];
}

function showCourseCards() {
  clearRevealTimers();

  revealItems.forEach((item, index) => {
    const timer = setTimeout(() => {
      item.classList.add("is-visible");
    }, index * 500);

    revealTimers.push(timer);
  });
}

function hideCourseCards() {
  clearRevealTimers();

  const reversedItems = [...revealItems].reverse();

  reversedItems.forEach((item, index) => {
    const timer = setTimeout(() => {
      item.classList.remove("is-visible");
    }, index * 300);

    revealTimers.push(timer);
  });
}

if (courseSection && revealItems.length > 0) {
  const courseObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          showCourseCards();
        } else {
          hideCourseCards();
        }
      });
    },
    {
      threshold: 0.25,
    }
  );

  courseObserver.observe(courseSection);
}
/*발바닥 효과*/
document.addEventListener("click", function (e) {
  const paw = document.createElement("div");
  paw.className = "paw-effect";
  paw.textContent = "🐾";

  paw.style.left = e.clientX + "px";
  paw.style.top = e.clientY + "px";

  document.body.appendChild(paw);

  setTimeout(() => {
    paw.remove();
  }, 700);
});
/*top버튼*/
const topBtn = document.querySelector(".top-btn");

if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
const menuBtn = document.querySelector(".header__menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const closeBtn = document.querySelector(".mobile-menu__close");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
});
/*로그인 모달 js*/
const loginOpenBtns = document.querySelectorAll(".login-open");
const loginModal = document.querySelector("#loginModal");
const loginCloseBtn = document.querySelector(".login-modal__close");

loginOpenBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    loginModal.classList.add("is-open");
  });
});

loginCloseBtn.addEventListener("click", () => {
  loginModal.classList.remove("is-open");
});

loginModal.addEventListener("click", (e) => {
  if (e.target === loginModal) {
    loginModal.classList.remove("is-open");
  }
});
