// API 관련 상수
const API_KEY = '3768879ae0777dcb5496a70e6608b415'; // TMDB에서 가져온 내 API키
const API_URL_POPULAR = `https://api.themoviedb.org/3/movie/popular?api_key=3768879ae0777dcb5496a70e6608b415&language=ko-KR&page=1`; // TMDB 인기영화 API
const SEARCH_API_URL = `https://api.themoviedb.org/3/search/movie?api_key=3768879ae0777dcb5496a70e6608b415&language=ko-KR&query=`; // TMDB 영화검색 API
const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500'; // TMDB 제공 영화 이미지 URL (영화에 대한 poster_path가 반환되고 w500 크기를 찾고 있는 경우 전체 이미지 URL)

// 영화 목록을 가져오는 함수
function getMovies(url) { // 영화 목록을 가져오기 위한 함수 선언
    return fetch(url) // fetch로 API가져올거임. 나중에 url자리에 API_URL_POPULAR, SEARCH_API_URL 가져와야함
        .then(response => response.json()) // json으로 변환
        .catch(error => console.log('영화 데이터를 불러오는 중 에러:', error)); // 에러 떳을 때
}

// 영화 상세 정보를 가져오는 함수
function getMovieDetails(id) { // 개별 영화의 정보를 가져오기 위한 함수 선언
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=3768879ae0777dcb5496a70e6608b415&language=ko-KR`) // fetch로 ${id}에 해당하는 영화 가져오는 API
        .then(response => response.json()) // json으로 변환
        .catch(error => console.log('영화 상세 정보를 불러오는 중 에러:', error)); // 에러 떳을 때
}

// 페이지 로드 시 인기 영화 불러오기
getMovies(API_URL_POPULAR).then(data => displayMovies(data.results)); // getMovies에 인기영화목록 API를 매개변수로 넣고, displayMovies에 API로 가져온 데이터의 results배열을 넣음

// 영화 목록을 화면에 표시하는 함수 (영화카드)
function displayMovies(movies) { // displayMovies 함수 선언
    const movieListElement = document.querySelector('#movie-list'); // 영화 목록을 표시할 영역인 #movie-list를 변수 movieListElement에 담음
    movieListElement.innerHTML = ''; // 영화 목록 초기화 (안그럼 영화카드 계속 추가됨)

    movies.forEach(movie => { // displayMovies의 매개변수 movies에 forEach로 반복작업 시킴
        const movieCard = ` <!-- 변수 movieCard 선언 -->
            <div class="movie-card" data-id="${movie.id}"> <!-- 영화 카드 / data-id에 movie의 id를 담음. 그럼 그 id를 가진 영화의 카드가 됨 -->
                <img src="${IMG_BASE_URL}${movie.poster_path}" alt="${movie.title} 포스터"> <!-- 포스터 이미지 / 이미지 주소 = TMDB 제공 영화 이미지 URL + result배열의 poster_path -->
                <div class="movie-info"> <!-- 영화 정보 div (영화 제목, 영화 평점 넣을 div) -->
                    <h3>${movie.title}</h3> <!-- result배열의 title -> 영화 제목 -->
                    <p>평점: ${movie.vote_average}</p> <!-- result배열의 vote_average -> 영화 평점 -->
                </div>
            </div>
        `;
        movieListElement.innerHTML += movieCard; // movieListElement에 movieCard를 넣음. innerHTML은 내용 추가가 아니라 아예 변경이라서 movieListElement에 계속 값을 저장하며 movieCard 더함
    });

    // 각 영화 카드에 클릭 이벤트 추가
    document.querySelectorAll('.movie-card').forEach(card => { // movie-card 가져와서 forEach로 반복
        card.addEventListener('click', () => { // 이벤트리스너로 클릭이벤트 넣음
            const movieId = card.getAttribute('data-id'); // 변수 movieId 선언. movie-card의 data-id="${movie.id}"를 담음
            getMovieDetails(movieId).then(movie => showModal(movie)); // 개별 영화의 정보를 가져오기 위한 함수인 getMovieDetails에 매개변수로 movieId를 넣어서 해당 id의 영화정보를 가져오고, 그 데이터를 showModal에 전달
        }); // 그래서 클릭하면 개별 영화의 id를 받은 showmodal이 열림
    });
}

// 모달에 영화 상세 정보를 표시하는 함수
function showModal(movie) { // showModal 함수에 개별 영화 정보가 담긴 매개변수 movie를 넣어서 정보를 가져옴
    document.getElementById('modal-title').innerText = movie.title; // 모달 타이틀에 영화 타이틀 넣음
    document.getElementById('modal-overview').innerText = movie.overview; // 모달 오버뷰에 영화 오버뷰 넣음
    document.getElementById('modal-release-date').innerText = `개봉일: ${movie.release_date || '정보 없음'}`; // 모달 개봉일에 영화 개봉일 넣거나 정보없음 넣음
    document.getElementById('modal-vote-average').innerText = `평점: ${movie.vote_average}`; // 모달 평점에 영화 평점 넣음

    const posterUrl = IMG_BASE_URL + movie.poster_path; // 변수 posterUrl 선언하여 IMG_BASE_URL + 각 영화정보가 담긴 movie의 poster_path 주소 = 각 영화 주소
    document.getElementById('modal-poster').src = posterUrl; // modal-poster의 src에 각 영화 주소를 담고있는 posterUrl를 넣음

    const modal = document.getElementById('modal'); // 변수 modal에 html의 #modal을 가져옴
    modal.style.display = 'block'; // 모달을 화면에 표시하는 스타일 설정

    // 모달 닫기 이벤트 추가
    const closeButton = document.querySelector('.close-button'); // 변수 closeButton에 html의 .close-button을 가져옴
    closeButton.addEventListener('click', () => { // closeButton에 클릭이벤트 추가
        modal.style.display = 'none'; // 모달을 숨기는 스타일 설정
    });

    // 모달 외부 클릭 시 모달 닫기
    window.addEventListener('click', (event) => { // 윈도우에 클릭이벤트 추가
        if (event.target === modal) { // 만약 타겟이 모달이라면 (모달이 화면 전체 크기라서 타겟이 모달일 때임. 모달 컨텐츠는 타겟이 아님)
            modal.style.display = 'none'; // 모달을 숨기는 스타일 설정
        }
    });
}

// 검색 기능
const searchForm = document.querySelector('#search_form'); // 변수 searchForm에 html의 search_form을 가져옴
const searchInput = document.querySelector('#movie_search'); // 변수 searchInput html의 movie_search을 가져옴
const searchLabel = document.querySelector('label[for="movie_search"]'); // 변수 searchLabel html의 label[for="movie_search"]을 가져옴

searchForm.addEventListener('submit', function (e) { // 영화 검색 폼에 제출이벤트 넣음
    e.preventDefault(); // preventDefault는 이벤트의 기본 동작을 막아주는 메서드임. submit의 기본 동작은 페이지 새로고침과 서버로 데이터 전송임
    const searchQuery = searchInput.value.trim(); // searchQuery는 사용자가 영화 제목을 입력하는 상자고, trim은 입력값의 앞뒤 공백을 없애줌
    if (searchQuery) { // 만약 입력값이면
        const searchUrl = `${SEARCH_API_URL}${encodeURIComponent(searchQuery)}`; // 변수 searchUrl에 영화 검색 주소 (SEARCH_API_URL + searchQuery) 넣음. encodeURIComponent는 사용자가 입력한 문자열을 안전하게 URL 형식으로 변환해주는 함수
        getMovies(searchUrl).then(data => displayMovies(data.results)); // getMovies에 매개변수로 searchUrl을 넣음 -> 이 데이터를 displayMovies에 전달하여 매개변수로 API로 가져온 데이터의 results배열을 넣고 displayMovies는 영화카드 만듬
    }
});

// 영화 검색 레이블 클릭 이벤트 추가
searchLabel.addEventListener('click', function () { // 헤더의 영화 검색에 클릭 이벤트 추가
    location.reload(); // 페이지를 새로고침하는 js메서드
});

// import { ~~~ } from '가져온 위치'; : 다른 모듈에서 내보낸 변수, 함수, 클래스 등을 현재 파일로 가져오기
// export ~~~ : 모듈에서 변수, 함수, 클래스 등을 다른 파일에서 사용할 수 있도록 내보내기
