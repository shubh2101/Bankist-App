"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const section1 = document.getElementById("section--1");
const allSections = document.querySelectorAll(".section");
const header = document.querySelector("header");
const logo = document.querySelector(".nav__logo");

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// cookieMessage

// const message = document.createElement("div");
// message.classList.add("cookie-message");
// message.innerHTML = `We use cookies for improved functionality and analytics. <button class = 'btn btn--close-cookie'>Got it</button>`;

// header.append(message);
// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     message.remove();
//   });
// message.style.background = "#37383d";
// message.style.width = "120%";
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 10 + "px";

// Making cookie fixed

// const cookie = document.querySelector(".cookie-message");
// const cookieHeight = cookie.getBoundingClientRect().top;
// // console.log(cookieHeight);
// cookie.style.position = "fixed";
// cookie.style.top = `${cookieHeight}px`;

// console.log(logo.getAttribute("designer"));

// data Attributes
// console.log(logo.dataset.versionNumber);

// scrolling Modern way
const btnScrollTo = document.querySelector(".btn--scroll-to");
btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

// event delegation in nav links for smooth scrolling

const navLinks = document.querySelector(".nav__links");
navLinks.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// tabbed components
const tabContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabContents = document.querySelectorAll(".operations__content");
tabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  // active content
  tabContents.forEach((c) => c.classList.remove("operations__content--active"));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

// menu fade animation
const nav = document.querySelector(".nav");
const handleOver = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblings.forEach((el) => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleOver.bind(0.5));
nav.addEventListener("mouseout", handleOver.bind(1));

// sticky navigation
// const initCords = section1.getBoundingClientRect()
// console.log(initCords)

// window.addEventListener('scroll', function(e){
//   console.log(this.scrollY)
//   if (this.scrollY > initCords.top) {
//     nav.classList.add('sticky')
//   } else nav.classList.remove('sticky')
// })

// Intersection observer API
// const callbkFn = function(entries, observer){
// entries.forEach(entry => {
//   console.log(entry)
// })
// }
// // callback function called when moving into the view and moving out of the view
// const obsOptions = {
//   root : null,
//   threshold : 0.1 , // % of the target which we are obsering should be visible
// }

// const observer = new IntersectionObserver(callbkFn, obsOptions);
// observer.observe(section1)

// implementation
// when the header is completely out of the view port then we want sticky nav

// sticky nav using intersection observer API
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight)
const stickyNavFn = function (entries) {
  const [entry] = entries;
  // console.log(entry)
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNavFn, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// section reveal
const sectionReveal = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.15,
});
const sections = document.querySelectorAll("section");
sections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

// lazy loading
const imgsBefore = document.querySelectorAll(".lazy-img");
imgsBefore.forEach(function (img, i) {
  if (i % 2 == 0) {
    img.style.transform = "translateX(-20%)";
  } else img.style.transform = "translateX(20%)";
});
const imgTargets = document.querySelectorAll("img[data-src]");
const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  // replacing src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  entry.target.classList.add("animate");
  entry.target.style.transform = "translateX(0)";

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.7,
  // rootMargin: "200px",
});
imgTargets.forEach(function (img) {
  imgObserver.observe(img);
});

// Animation features slide
const textSlides = document.querySelectorAll(".features__feature");
const animateSlide = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.add("built_in_animate");
};

const textObserver = new IntersectionObserver(animateSlide, {
  root: null,
  threshold: 0.7,
  // rootMargin: "200px",
});
textSlides.forEach(function (slide) {
  textObserver.observe(slide);
});

// Slider
const btnRight = document.querySelector(".slider__btn--right");
const btnLeft = document.querySelector(".slider__btn--left");
// const slider = document.querySelector(".slider");
// slider.style.transform = "scale(0.4) translateX(-1200px)";
// slider.style.overflow = "visible";

const slides = document.querySelectorAll(".slide");
// slides.forEach((s, i) => (s.style.transform = `translate(${100 * i}%)`));
// 0%, 100%, 200%, 300%

// creating dots(breadCrumbs)
const dotContainer = document.querySelector(".dots");
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class='dots__dot' data-slide="${i}"></button>`
    );
  });
};
createDots();

// activating dot

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide='${slide}']`)
    .classList.add("dots__dot--active");
};

// Next Slide
let currSlide = 0;
let maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translate(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);
activateDot(0);

const nextSlide = function () {
  if (currSlide == maxSlide - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
  activateDot(currSlide);
};
const prevSlide = function () {
  if (currSlide == 0) {
    currSlide = maxSlide - 1;
  } else {
    currSlide--;
  }
  goToSlide(currSlide);
  activateDot(currSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

// document.addEventListener("keydown", function (e) {
//   const bounding = btnLeft.getBoundingClientRect();
//   if (bounding.top <= window.innerHeight) {
//     if (e.key == "ArrowRight") nextSlide();
//     else if (e.key == "ArrowLeft") prevSlide();
//   }
// });

//
const keySlide = function (e) {
  // console.log(e);
  if (e.key == "ArrowRight") nextSlide();
  e.key == "ArrowLeft" && prevSlide();
};

const keySlider = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  entry.isIntersecting && document.addEventListener("keydown", keySlide);
  if (!entry.isIntersecting) {
    document.removeEventListener("keydown", keySlide);
  }
};
const btnObserver = new IntersectionObserver(keySlider, {
  root: null,
  threshold: 0.4,
});
const slider = document.getElementById("slider");
btnObserver.observe(slider);

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

// scrolling back to top on refresh
window.onbeforeunload = () => {
  window.scrollTo(0, 0);
};
