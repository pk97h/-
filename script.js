import { getMovies, API_URL_POPULAR, SEARCH_API_URL } from './api.js'; // API 관련 모듈 가져오기
import { displayMovies } from './ui.js'; // UI 관련 모듈 가져오기

const searchForm = document.querySelector('#search_form');
const searchInput = document.querySelector('#movie_search');
const searchLabel = document.querySelector('label[for="movie_search"]'); // 영화 검색 레이블 선택

// 페이지 로드 시 인기 영화 불러오기
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

// 영화 검색 레이블 클릭 이벤트 추가
searchLabel.addEventListener('click', function () {
    location.reload(); // 페이지 새로 고침
});
