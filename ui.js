import { IMG_BASE_URL, getMovieDetails } from './api.js';

// 영화 목록 표시
export function displayMovies(movies) {
    const movieListElement = document.querySelector('#movie-list');
    movieListElement.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = `
            <div class="movie-card" data-id="${movie.id}">
                <img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title} 포스터">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <p>평점: ${movie.vote_average}</p>
                </div>
            </div>
        `;
        movieListElement.innerHTML += movieCard;
    });

    // 영화 카드 클릭 이벤트
    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', () => {
            const movieId = card.getAttribute('data-id');
            getMovieDetails(movieId).then(movie => showModal(movie)); 
        });
    });
}

// 모달 영화 상세 정보 표시
export function showModal(movie) {
    document.getElementById('modal-title').innerText = movie.title;
    document.getElementById('modal-overview').innerText = `${movie.overview}`;
    document.getElementById('modal-release-date').innerText = `개봉일: ${movie.release_date || '정보 없음'}`;
    document.getElementById('modal-vote-average').innerText = `평점: ${movie.vote_average}`;
    
    const posterUrl = IMG_BASE_URL + movie.poster_path;
    document.getElementById('modal-poster').src = posterUrl;

    const modal = document.getElementById('modal');
    modal.style.display = 'block';

    const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
