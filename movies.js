const moviesEl = document.querySelector(".movies")
console.log(moviesEl)

function searchMovie(search) {
    renderMovies(search.target.value)
}  

async function renderMovies(search) {
    const movies = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=7ca89627`)
    const moviesData = await movies.json()
    console.log(moviesData.Search)
    moviesEl.innerHTML = moviesData.Search.map(movie => movieHTML(movie)).join('')
}

function movieHTML(movie) {
    return `<div class="movie">
    <figure class="movie__img--wrapper">
        <img src="${movie.Poster}" alt="" class="movie__img">
    </figure>
    <div class="movie__description">
        <h3 class="movie__title">${movie.Title}</h3>
        <h4 class="movie__release">${movie.Year}</h4>
        <p class="movie__genres">Action, Adventure, Comedy</p>
        <p class="movie__director">James Gunn</p>
        <div class="movie__synopsis">
            The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father the ambitious celestial being Ego.
        </div>
        <p class="rating">7.8 <i class="fas fa-star"></i></p>
    </div>
    </div>`
}

renderMovies('Fast')