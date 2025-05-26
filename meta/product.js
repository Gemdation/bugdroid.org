let currentSlide = 0;

document.querySelectorAll('img.prev').forEach(img => {
    img.addEventListener('click', () => showProduct(img.id));
});

function showProduct(id) {
    const data = productData[id];
    if (!data) return;

    data.images.forEach((src, index) => {
        const imgEl = document.getElementById(`prod-img-${index + 1}`);
        if (imgEl) {
            imgEl.src = src;
            imgEl.style.display = index === 0 ? 'block' : 'none';
        }
    });
    currentSlide = 0;

    document.getElementById('prod-name').textContent = data.name;
    document.getElementById('prod-maker').textContent = data.maker;
    document.getElementById('prod-year').textContent = data.year;
    document.getElementById('prod-id').textContent = data.id;
    document.getElementById('prod-price').textContent = data.price;
    document.getElementById('prod-descrip').textContent = data.synopsis;

    document.querySelector('span.browse')?.style.setProperty('display', 'none');
    document.getElementById('prod').style.display = 'block';
}

function returnToBrowse() {
    document.querySelector('span.browse')?.style.setProperty('display', 'block');
    document.getElementById('prod').style.display = 'none';
}

function nextSlide() {
    const slides = document.querySelectorAll('.slides');
    slides[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = 'block';
}

function prevSlide() {
    const slides = document.querySelectorAll('.slides');
    slides[currentSlide].style.display = 'none';
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    slides[currentSlide].style.display = 'block';
}