const moviesEl = document.querySelector(".movies")

function searchMovie(search) {
    renderMovies(search.target.value)
}  

async function renderMovies(search) {
    const movies = await fetch(`https://www.omdbapi.com/?s=${search}&apikey=7ca89627`)
    const moviesData = await movies.json()
    const moviesData6 = moviesData.Search.slice(0, 6)
    moviesEl.innerHTML = moviesData6.map(movie => {
        
        movieHTML(movie)
    }).join('')
    console.log(moviesData6)
}

async function imdbData(ID) {
    const movie = await fetch(`http://www.omdbapi.com/?i=${ID}&apikey=7ca89627`)
    const movieData = await movie.json()
    return movieData
}

async function movieHTML(movieID) {
    const ID = movieID.imdbID
    const movieDataID = await imdbData(ID)
    return `<div class="movie">
    <figure class="movie__img--wrapper">
        <img src="${movieDataID.Poster}" alt="" class="movie__img">
    </figure>
    <div class="movie__description">
        <h3 class="movie__title">${movieDataID.Title}</h3>
        <h4 class="movie__release">${movieDataID.Year}</h4>
        <p class="movie__genres">${movieDataID.Genre}</p>
        <p class="movie__director">${movieDataID.Director}</p>
        <div class="movie__synopsis">
            ${movieDataID.Plot}
        </div>
        <p class="rating">${movieDataID.imdbRating} <i class="fas fa-star"></i></p>
    </div>
    </div>`
}
