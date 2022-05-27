$('document').ready(() => {
    $('#searchForm').on('submit', (event) => {
        event.preventDefault();
        const searchText = $('#searchText').val();
        getMovies(searchText);
    })
})

const getMovies = (searchText) => {
    axios.get("http://www.omdbapi.com/?s=" + searchText + "&apikey=5775e1ab")
        .then((response) => {
            console.log(response.data)
            let movies = response.data.Search;
            let output = "";
            movies.forEach(movie => {
                output += `
                <div class="output col-md-4 pt-3 bg-dark rounded text-center my-3 me-3">
                    <img class="rounded" src=${movie.Poster} />
                    <h4 class="text text-white text-center my-3">${movie.Title}</h4>
                    <button onclick="movieSelected('${movie.imdbID}')" class="button mt-4 p-2 rounded">Description</button>
                </div>
            `
            });
            $('#movies').html(output)
        })
        .catch((error) => {
            console.log(error)
        })
}

const movieSelected = (id) => {
    sessionStorage.setItem('movieId', id)
    window.location = "movie.html";
}

    movieDescription = () => {
    let movieId = sessionStorage.getItem('movieId')
    
    axios.get("http://www.omdbapi.com/?i=" + movieId + "&apikey=5775e1ab")
        .then((response) => {
            console.log(response.data)
            let movies = response.data;
            let output1 = "";
            let output2 = "";
            output1 += `
                <div class="col-md-4">
                    <img class="p-3 ms-5" src=${movies.Poster} />
                </div>
                <div class="col-md-8">
                    <h2 class="text-white p-3">${movies.Title}</h2>
                    <ul class="text-white bg-dark rounded">
                        <li><strong>Genre: </strong>${movies.Genre}</li>
                        <li><strong>Released: </strong>${movies.Released}</li>
                        <li><strong>Rated: </strong>${movies.Rated}</li>
                        <li><strong>Imdb Rating: </strong>${movies.imdbRating}</li>
                        <li><strong>Director: </strong>${movies.Director}</li>
                        <li><strong>Writer: </strong>${movies.Writer}</li>
                        <li><strong>Actor: </strong>${movies.Actors}</li>
                    </ul>
                </div>
            `
            $('#moviePage').html(output1)
            output2 += `
                <div>
                    <h3 class="plot text-white pt-3 ps-3">Plot</h3>
                </div>
                <div>
                    <p class="text-white ps-3">${movies.Plot}</p>
                </div>
                <div class="ms-4 mb-4 pt-2">
                    <a class="links" href="http://imdb.com/title/${movies.imdbID}" target="_blank">Watch Movie</a>
                    <a class="links ms-3" href="index.html">Go Back to Search</a>
                </div>
            `
            $('#moviePage2').html(output2)
        })
        
        .catch((error) => {
            console.log(error)
        })
}
