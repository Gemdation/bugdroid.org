let currentSlide = 0;
let currentImages = [];

const prodImages = document.getElementById('prod-images');
const prodName = document.getElementById('prod-name');
const prodMaker = document.getElementById('prod-maker');
const prodYear = document.getElementById('prod-year');
const prodId = document.getElementById('prod-id');
const prodPrice = document.getElementById('prod-price');
const prodDescrip = document.getElementById('prod-descrip');
const browseSpan = document.querySelector('span.browse');
const prodContainer = document.getElementById('prod');

document.querySelectorAll('img.prev').forEach(img => {
    img.addEventListener('click', (event) => showProduct(event.currentTarget.id));
});

function showProduct(id) {
    const data = productData[id];
    if (!data) return;

    currentImages = data.images;
    currentSlide = 0;

    updateProductDisplay(data);
    browseSpan?.style.setProperty('display', 'none');
    prodContainer.style.display = 'block';
}

function updateProductDisplay(data) {
    prodImages.src = currentImages[currentSlide];
    prodName.textContent = data.name;
    prodMaker.textContent = data.maker;
    prodYear.textContent = data.year;
    prodId.textContent = data.id;
    prodPrice.textContent = data.price;
    prodDescrip.textContent = data.synopsis;

    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    const singleImage = currentImages.length <= 1;
    prevButton.disabled = singleImage;
    nextButton.disabled = singleImage;
}


function changeSlide(direction) {
    if (currentImages.length === 0) return;

    currentSlide = (currentSlide + direction + currentImages.length) % currentImages.length;
    prodImages.src = currentImages[currentSlide];
}

function nextSlide() {
    changeSlide(1);
}

function prevSlide() {
    changeSlide(-1);
}

function returnToBrowse() {
    browseSpan?.style.setProperty('display', 'block');
    prodContainer.style.display = 'none';
}