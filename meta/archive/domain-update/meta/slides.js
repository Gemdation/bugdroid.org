// Multiple slideshows can't be on one page.
let currentSlide = 0;
const slides = document.querySelectorAll('.slides');
function showSlide(index) {slides.forEach((slide, i) => {slide.style.display = (i === index) ? 'block' : 'none';});}
function nextSlide() {currentSlide = (currentSlide + 1) % slides.length;showSlide(currentSlide);}
function prevSlide() {currentSlide = (currentSlide - 1 + slides.length) % slides.length; showSlide(currentSlide);} showSlide(currentSlide);

// <div class="cotaniner">
// <img class="slides">
// <button onclick="prevSlide()">◀</button>
// <button onclick="nextSlide()">▶</button>