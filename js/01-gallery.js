import { galleryItems } from './gallery-items.js';

const paletteContainer = document.querySelector('.gallery');
const imageMarkup = createGalleryMarkup(galleryItems); 

paletteContainer.insertAdjacentHTML('beforeend', imageMarkup);

function createGalleryMarkup(images) {
  const markup = images.map(({ preview, original, description }) => { 
    return `
      <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
        </a>
      </div>
    `;
  })
  .join('');
  return markup;
}

let instance;

paletteContainer.addEventListener('click', onPaletteContainerClk);

function onPaletteContainerClk(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== "IMG") {
    return;
  }
  
  instance = basicLightbox.create(`
    <img src="${evt.target.dataset.source}" width="800" height="600">
  `);
  instance.show();

  
  document.addEventListener("keydown", closePicture);
}

function closePicture(event) {
  if (event.key === "Escape") {
    document.removeEventListener("keydown", closePicture);
    instance.close();
  }
}
