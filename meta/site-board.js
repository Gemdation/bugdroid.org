let currentSlide = 0;
let currentImages = [];

// Get references to all necessary elements at the start
const prodImages = document.getElementById('prod-images');
const prodName = document.getElementById('prod-name');
const prodMaker = document.getElementById('prod-maker');
const prodYear = document.getElementById('prod-year');
const prodId = document.getElementById('prod-id');
const prodPrice = document.getElementById('prod-price');
const prodDescrip = document.getElementById('prod-descrip');
const browseSpan = document.querySelector('div.board');
const prodContainer = document.getElementById('prod');
const brandingElements = document.querySelectorAll('.branding'); // Get all elements with class 'branding'
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');


document.querySelectorAll('div.board img').forEach(img => {
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
    
    // Hide all branding elements when a product is shown
    brandingElements.forEach(element => {
        element.style.display = 'none';
    });
}

function updateProductDisplay(data) {
    prodImages.src = currentImages[currentSlide];
    prodImages.alt = data.name.replace(/^YouTube\s+/i, '').trim();

    prodName.textContent = data.name;
    prodMaker.textContent = data.maker;
    prodYear.textContent = data.year;
    prodId.textContent = data.id;
    prodPrice.textContent = data.price;
    prodDescrip.textContent = data.synopsis;

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

    // Show all branding elements when returning to browse view
    brandingElements.forEach(element => {
        // You might need to adjust 'block' based on the element's default display type
        // For example, if it's a span, you might want 'inline' or 'inline-block'.
        // Or you can set it to an empty string '' to revert to its default CSS display.
        element.style.display = 'block';
    });
}