import { getMovies, API_URL_POPULAR, SEARCH_API_URL } from './api.js';
import { displayMovies } from './ui.js';

const searchForm = document.querySelector('#search_form');
const searchInput = document.querySelector('#movie_search');
const searchLabel = document.querySelector('label[for="movie_search"]');

getMovies(API_URL_POPULAR).then(data => displayMovies(data.results));

// 검색 기능
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const searchQuery = searchInput.value.trim();
    if (searchQuery) {
        const searchUrl = `${SEARCH_API_URL}${encodeURIComponent(searchQuery)}`;
        getMovies(searchUrl).then(data => displayMovies(data.results));
    }
});

searchLabel.addEventListener('click', function () {
    location.reload();
});
