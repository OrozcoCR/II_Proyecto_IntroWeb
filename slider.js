let currentSlide = 1;

function cambiarSlide(slideIndex) {
  if (slideIndex !== currentSlide) {
    // Oculta la diapositiva actual
    document.querySelector(".slider img.active").classList.remove("active");

    // Muestra la nueva diapositiva
    document
      .querySelectorAll(".slider img")
      [slideIndex - 1].classList.add("active");

    currentSlide = slideIndex;
  }
}
