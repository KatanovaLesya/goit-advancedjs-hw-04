function createImageCard({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  return `
      <a href="${largeImageURL}" class="photo-link">
            <div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                <div class="info">
                    <p><b>Likes:</b> ${likes}</p>
                    <p><b>Views:</b> ${views}</p>
                    <p><b>Comments:</b> ${comments}</p>
                    <p><b>Downloads:</b> ${downloads}</p>
                </div>
            </div>
        </a>
    `;
}

export function renderGallery(images) {
  const galleryContainer = document.querySelector('.gallery');

  // Додати нові зображення до існуючої галереї
  const galleryMarkup = images.map(createImageCard).join('');
  galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup); // Додавання в кінець існуючої галереї
}
