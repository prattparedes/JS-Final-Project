function SearchMovieIndex(event) {
    const animationEl = document.querySelector('.header__moving-animation--wrapper')
    animationEl.innerHTML = 
    `<figure>
    <img src="./Assets/MovieTape.svg" alt="" class="movietape--animation">
    </figure>`
    
    animationEl.classList += ' moving'
    setTimeout(() => {
        localStorage.setItem("search", event.target.value);
        window.location.href = `${window.location.origin}/Final%20Project/movies.html` //this REROUTES to the same url of the page
    }, 1000)
}

function alertPopUp() {
    window.alert('Function Not Implemented')
}
