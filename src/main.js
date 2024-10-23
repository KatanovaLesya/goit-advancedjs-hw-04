import { fetchImages } from './js/pixabay-api';
import { renderGallery } from './js/render-function';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css'; // Підключення стилів

const form = document.getElementById('search-form');
const galleryContainer = document.querySelector('.gallery');
const loadMoreButton = document.getElementById('load-more');
const loader = document.querySelector('.loader');
let currentPage = 1;
let currentQuery = '';
let isLoading = false;
const perPage = 15;
let totalImagesLoaded = 0;
let totalHits = 0;
let lightbox = null;

// Ініціалізація SimpleLightbox
function initializeLightbox() {
  lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'title',
    captionPosition: 'bottom',
    captionDelay: 250,
  });
}

// Оновлення SimpleLightbox
function refreshLightbox() {
  if (lightbox) {
    lightbox.refresh();
  } else {
    initializeLightbox();
  }
}

// Функція для обробки сабміту форми
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  currentQuery = form.query.value.trim();
  if (!currentQuery) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term.',
    });
    return;
  }
  currentPage = 1; // Скинути номер сторінки
  totalImagesLoaded = 0; // Скинути кількість завантажених зображень
  galleryContainer.innerHTML = ''; // Очищення попередніх результатів при новому пошуку
  loadMoreButton.style.display = 'none'; // Приховати кнопку "Load more"
  await loadImages(); // Завантаження першої сторінки
});

// Функція для завантаження зображень
async function loadImages() {
  if (isLoading) return;
  isLoading = true;
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage, perPage);
    totalHits = data.totalHits; // Отримуємо загальну кількість зображень

    if (data.hits.length === 0 && currentPage === 1) {
      iziToast.warning({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query.',
      });
      hideLoader();
      isLoading = false;
      return;
    }

    renderGallery(data.hits); // Додати зображення до галереї
    refreshLightbox(); // Оновити або ініціалізувати SimpleLightbox
    currentPage += 1; // Збільшити номер сторінки для наступного запиту
    totalImagesLoaded += data.hits.length; // Оновити кількість завантажених зображень

    // Перевірити, чи досягнуто кінця колекції
    if (totalImagesLoaded >= totalHits) {
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
      loadMoreButton.style.display = 'none'; // Приховати кнопку "Load more"
    } else {
      loadMoreButton.style.display = 'block'; // Показати кнопку "Load more", якщо є ще зображення
    }

    smoothScroll(); // Виклик функції плавного прокручування
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again later.',
    });
  } finally {
    hideLoader();
    isLoading = false;
  }
}

// Функція для плавного прокручування сторінки
function smoothScroll() {
  const { height: cardHeight } = galleryContainer.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// Обробник події для кнопки "Load more"
loadMoreButton.addEventListener('click', () => {
  loadImages(); // Завантажити наступну сторінку зображень
});

// Функції для керування індикатором завантаження
function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

// Ініціалізація SimpleLightbox при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
  initializeLightbox();
});
