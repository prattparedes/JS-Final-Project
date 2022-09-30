const moviesEl = document.querySelector(".movies")
const movieSearch = localStorage.getItem("search")

function searchMovie(search) {
    renderMovies(search.target.value)
    localStorage.setItem("secondSearch", search.target.value)
}  

async function filterMovies(filter) {
    const sortFilter = filter.target.value
    const searchItem = localStorage.getItem("secondSearch")
    const movies = await fetch(`https://www.omdbapi.com/?s=${searchItem}&apikey=7ca89627`)
    const moviesData = await movies.json()
    const moviesData6 = moviesData.Search.slice(0, 6)
    const resultArray = await Promise.all(moviesData6.map(async (i) => await imdbData(i.imdbID)));

    if (sortFilter === 'RATING_HTL') {
        resultArray.sort((a, b) => b.imdbRating - a.imdbRating)
    }
    else if (sortFilter === 'RATING_LTH') {
        resultArray.sort((a, b) => a.imdbRating - b.imdbRating)
    }
    else if (sortFilter === 'YEAR') {
        resultArray.sort((a, b) => b.Year - a.Year)
    }

    moviesEl.innerHTML = resultArray.map(movie => movieHTML(movie)).join('')
}

async function imdbData(ID) {
    const movie = await fetch(`http://www.omdbapi.com/?i=${ID}&apikey=7ca89627`)
    const movieData = await movie.json()
    return movieData
}

async function renderMovies(search) {
    const movies = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=7ca89627`)
    const moviesData = await movies.json()
    const moviesData6 = moviesData.Search.slice(0, 6)
    const resultArray = await Promise.all(moviesData6.map(async (i) => await imdbData(i.imdbID)));
    moviesEl.innerHTML = resultArray.map(movie => movieHTML(movie)).join('')

}


function movieHTML(movie) {
    return `<div class="movie">
    <figure class="movie__img--wrapper">
        <img src="${movie.Poster}" alt="" class="movie__img">
    </figure>
    <div class="movie__description">
        <h3 class="movie__title">${movie.Title}</h3>
        <h4 class="movie__release">${movie.Year}</h4>
        <p class="movie__genres">${movie.Genre}</p>
        <p class="movie__director">${movie.Director}</p>
        <div class="movie__synopsis">
            ${movie.Plot}
        </div>
        <p class="rating">${movie.imdbRating} <i class="fas fa-star"></i></p>
    </div>
    </div>`
}

renderMovies(movieSearch)