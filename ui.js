import { IMG_BASE_URL, getMovieDetails } from './api.js'; // getMovieDetails 가져오기

// 영화 목록을 화면에 표시하는 함수
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

    // 각 영화 카드에 클릭 이벤트 추가
    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', () => {
            const movieId = card.getAttribute('data-id');
            getMovieDetails(movieId).then(movie => showModal(movie)); 
        });
    });
}

// 모달에 영화 상세 정보를 표시하는 함수
export function showModal(movie) {
    document.getElementById('modal-title').innerText = movie.title;
    document.getElementById('modal-overview').innerText = `${movie.overview}`;
    document.getElementById('modal-release-date').innerText = `개봉일: ${movie.release_date || '정보 없음'}`;
    document.getElementById('modal-vote-average').innerText = `평점: ${movie.vote_average}`;
    
    const posterUrl = IMG_BASE_URL + movie.poster_path;
    document.getElementById('modal-poster').src = posterUrl;

    const modal = document.getElementById('modal');
    modal.style.display = 'block'; // 모달 표시

    // 모달 닫기 이벤트 추가
    const closeButton = document.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; // 모달 숨기기
    });

    // 모달 외부 클릭 시 모달 닫기
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none'; // 모달 숨기기
        }
    });
}
