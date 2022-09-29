function SearchMovieIndex(event) {
    localStorage.setItem("search", event.target.value);
    window.location.href = `${window.location.origin}/Final%20Project/movies.html` //this REROUTES to the same url of the page
}