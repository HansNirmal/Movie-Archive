const API_URL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&year=2023&api_key=d9787004add9269adad9fa4991979a63'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=d9787004add9269adad9fa4991979a63&query="'

const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

//Get Movies List
getMovies(API_URL)


async function getMovies (url) {
    const res = await fetch (url)
    const data = await res.json()

    showMovies(data.results)
}


// Display Movies List
function showMovies(movies){
    main.innerHTML = '' //set main element to empty

    //populate the movies data in html cards/fields
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie //destructure and extract the following data
        
        const movieElement = document.createElement('div') //create a div
        movieElement.classList.add('movie') //add a class named - movie to the div

        //movie class Div : content
        movieElement.innerHTML = `
        
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>

             </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>`

        main.appendChild(movieElement)
    })
}


//Function to change rating color
function getClassByRate(vote){
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5){
        return 'orange'
    } else return 'red';
}


//Function to search movies
form.addEventListener('submit', (e) =>{
    e.preventDefault()

    const searchTerm = search.value
    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''

    }
    else{
        window.location.reload()
    }
})