export const API_KEY = '3768879ae0777dcb5496a70e6608b415';
export const API_URL_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=3768879ae0777dcb5496a70e6608b415&language=ko-KR&page=1`;
export const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=3768879ae0777dcb5496a70e6608b415&language=ko-KR&query=`;
export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// 영화 목록 불러오기
export function getMovies(url) {
    return fetch(url)
        .then(response => response.json()) // 첫 번째 then: 응답을 JSON으로 변환
        .then(data => data) // 두 번째 then: 변환된 데이터를 반환
        .catch(error => console.error('영화 데이터를 불러오는 중 에러:', error));
}

// 영화 상세 정보 불러오기
export function getMovieDetails(id) {
    const MOVIE_DETAILS_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`;
    return fetch(MOVIE_DETAILS_URL)
        .then(response => response.json()) // 첫 번째 then: 응답을 JSON으로 변환
        .then(data => data) // 두 번째 then: 변환된 데이터를 반환
        .catch(error => console.error('영화 상세 정보를 불러오는 중 에러:', error));
}
