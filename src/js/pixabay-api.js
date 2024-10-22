import axios from 'axios';

const API_KEY = '46638996-2a2e598d70d21a2b7de7c0e18';
const BASE_URL = 'https://pixabay.com/api/';

// Створюємо екземпляр axios з базовою конфігурацією
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  },
});

// Функція для виконання запиту на отримання зображень
export async function fetchImages(query, page = 1, perPage = 15) {
  try {
    const response = await axiosInstance.get('', {
      params: {
        q: query,
        page: page,
        per_page: perPage,
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch images');
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
