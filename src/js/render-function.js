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

// Функція для відображення галереї
export function renderGallery(images) {
  const galleryContainer = document.querySelector('.gallery');
  galleryContainer.innerHTML = ''; // Очищення галереї

  const galleryMarkup = images.map(createImageCard).join('');
  galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
}