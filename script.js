const slides = [
  {
    image: "assets/img/journal.png",
    alt: "Journal con fotos impresas HP Sprocket",
    label: "Journal",
    caption:
      "Guardá ideas, viajes y momentos cotidianos en páginas que se sienten tuyas.",
  },
  {
    image: "assets/img/uso 3.png",
    alt: "Impresora HP Sprocket en una mesa de festival",
    label: "Momentos",
    caption:
      "Imprimí salidas, recitales y viajes en recuerdos que podés compartir en el momento.",
  },
  {
    image: "assets/img/usos 2.png",
    alt: "Escritorio con fotos impresas HP Sprocket en la pared",
    label: "Decoración",
    caption:
      "Armá collages, paredes y rincones con fotos que acompañan tu espacio.",
  },
  {
    image: "assets/img/uso 4.png",
    alt: "HP Sprocket guardada en una mochila durante un festival",
    label: "Portabilidad",
    caption:
      "Llevala en la mochila o cartera y tenela lista para imprimir donde estés.",
  },
];

const activeImage = document.querySelector(".active-slide img");
const activeCaption = document.querySelector(".slide-caption");
const slidesTrack = document.querySelector(".slides");
const sideImages = document.querySelectorAll(".side-slide");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const usageDots = document.querySelectorAll(".usage-dot");
const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const partDots = document.querySelectorAll(".part-dot");
const partPanels = document.querySelectorAll("[data-part-panel]");
const partInfoCards = document.querySelectorAll(".part-info");
const faqItems = document.querySelectorAll(".faq-list details");
const appCarousel = document.querySelector(".app-carousel");
const appCarouselFrame = document.querySelector(".app-carousel-frame");
const appCarouselImage = document.querySelector(".app-carousel-image");
const appDots = document.querySelectorAll(".app-dot");
const appSteps = document.querySelectorAll(".app-step");
let currentSlide = 0;
let currentAppSlide = 0;
let appDragStart = 0;
let usageDragStart = 0;
let isDraggingUsage = false;

const appSlides = [
  {
    image: "assets/img/app 1.png",
    alt: "Pantalla de selecciÃ³n de fotos en la app HP Sprocket",
  },
  {
    image: "assets/img/app 2.png",
    alt: "Pantalla de ediciÃ³n en la app HP Sprocket",
  },
  {
    image: "assets/img/app 3.png",
    alt: "Pantalla de impresiÃ³n en la app HP Sprocket",
  },
];

function renderSlides() {
  const prevIndex = (currentSlide + slides.length - 1) % slides.length;
  const nextIndex = (currentSlide + 1) % slides.length;

  activeImage.src = slides[currentSlide].image;
  activeImage.alt = slides[currentSlide].alt;
  activeCaption.innerHTML = `<strong>${slides[currentSlide].label}</strong><span>${slides[currentSlide].caption}</span>`;
  sideImages[0].src = slides[prevIndex].image;
  sideImages[1].src = slides[nextIndex].image;
  usageDots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === currentSlide);
  });
}

function goToSlide(direction) {
  slidesTrack.style.setProperty("--slide-shift", direction > 0 ? "18px" : "-18px");
  slidesTrack.classList.add("is-changing");

  window.setTimeout(() => {
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    renderSlides();
    slidesTrack.classList.remove("is-changing");
  }, 180);
}

function goToUsageSlide(index) {
  const direction = index > currentSlide ? 1 : -1;
  slidesTrack.style.setProperty("--slide-shift", direction >= 0 ? "18px" : "-18px");
  slidesTrack.classList.add("is-changing");

  window.setTimeout(() => {
    currentSlide = (index + slides.length) % slides.length;
    renderSlides();
    slidesTrack.classList.remove("is-changing");
  }, 180);
}

function renderAppSlide(direction = 0) {
  appCarouselImage.style.setProperty("--app-slide-shift", direction >= 0 ? "16px" : "-16px");
  appCarouselImage.classList.add("is-changing");

  window.setTimeout(() => {
    appCarouselImage.src = appSlides[currentAppSlide].image;
    appCarouselImage.alt = appSlides[currentAppSlide].alt;
    appDots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentAppSlide);
    });
    appSteps.forEach((step, index) => {
      step.classList.toggle("is-active", index === currentAppSlide);
    });
    appCarouselImage.classList.remove("is-changing");
  }, 160);
}

function goToAppSlide(index) {
  const direction = index > currentAppSlide ? 1 : -1;
  currentAppSlide = (index + appSlides.length) % appSlides.length;
  renderAppSlide(direction);
}

function shiftAppSlide(direction) {
  goToAppSlide(currentAppSlide + direction);
}

renderSlides();

prevButton.addEventListener("click", () => goToSlide(-1));

nextButton.addEventListener("click", () => goToSlide(1));

usageDots.forEach((dot, index) => {
  dot.addEventListener("click", () => goToUsageSlide(index));
});

if (slidesTrack) {
  slidesTrack.addEventListener("pointerdown", (event) => {
    isDraggingUsage = true;
    usageDragStart = event.clientX;
    slidesTrack.setPointerCapture(event.pointerId);
  });

  slidesTrack.addEventListener("pointerup", (event) => {
    if (!isDraggingUsage) return;

    const dragDistance = event.clientX - usageDragStart;
    isDraggingUsage = false;

    if (Math.abs(dragDistance) > 36) {
      goToSlide(dragDistance < 0 ? 1 : -1);
    }
  });

  slidesTrack.addEventListener("pointercancel", () => {
    isDraggingUsage = false;
  });
}

appDots.forEach((dot, index) => {
  dot.addEventListener("click", () => goToAppSlide(index));
});

appSteps.forEach((step, index) => {
  step.addEventListener("click", () => goToAppSlide(index));
});

if (appCarousel && appCarouselFrame) {
  appCarouselFrame.addEventListener("pointerdown", (event) => {
    appDragStart = event.clientX;
    appCarouselFrame.setPointerCapture(event.pointerId);
  });

  appCarouselFrame.addEventListener("pointerup", (event) => {
    const dragDistance = event.clientX - appDragStart;

    if (Math.abs(dragDistance) > 36) {
      shiftAppSlide(dragDistance < 0 ? 1 : -1);
    }
  });
}

menuToggle.addEventListener("click", () => {
  const isOpen = siteHeader.classList.toggle("is-menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Cerrar menu" : "Abrir menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteHeader.classList.remove("is-menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  });
});

partDots.forEach((dot) => {
  dot.setAttribute("aria-expanded", String(dot.classList.contains("is-active")));

  dot.addEventListener("click", () => {
    const selectedPart = dot.dataset.part;
    const shouldOpen = !dot.classList.contains("is-active");

    dot.classList.toggle("is-active", shouldOpen);
    dot.setAttribute("aria-expanded", String(shouldOpen));

    partPanels.forEach((panel) => {
      if (panel.dataset.partPanel === selectedPart) {
        panel.classList.toggle("is-active", shouldOpen);
      }
    });
  });
});

partInfoCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 760px)").matches) {
      const shouldOpen = !card.classList.contains("is-mobile-open");

      partInfoCards.forEach((item) => {
        item.classList.remove("is-mobile-open");
      });

      card.classList.toggle("is-mobile-open", shouldOpen);
    }
  });
});

faqItems.forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    faqItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.open = false;
      }
    });
  });
});
