let currentSlide = 0;
let currentImages = [];

document.querySelectorAll('img.prev').forEach(img => {
    img.addEventListener('click', () => showProduct(img.id));
});

function showProduct(id) {
    const data = productData[id];
    if (!data) return;

    currentImages = data.images;
    currentSlide = 0;

    document.getElementById('prod-images').src = currentImages[currentSlide];

    document.getElementById('prod-name').textContent = data.name;
    document.getElementById('prod-maker').textContent = data.maker;
    document.getElementById('prod-year').textContent = data.year;
    document.getElementById('prod-id').textContent = data.id;
    document.getElementById('prod-price').textContent = data.price;
    document.getElementById('prod-descrip').textContent = data.synopsis;

    document.querySelector('span.browse')?.style.setProperty('display', 'none');
    document.getElementById('prod').style.display = 'block';
}

function nextSlide() {
    if (currentImages.length === 0) return;

    currentSlide = (currentSlide + 1) % currentImages.length;
    document.getElementById('prod-images').src = currentImages[currentSlide];
}

function prevSlide() {
    if (currentImages.length === 0) return;

    currentSlide = (currentSlide - 1 + currentImages.length) % currentImages.length;
    document.getElementById('prod-images').src = currentImages[currentSlide];
}

function returnToBrowse() {
    document.querySelector('span.browse')?.style.setProperty('display', 'block');
    document.getElementById('prod').style.display = 'none';
}