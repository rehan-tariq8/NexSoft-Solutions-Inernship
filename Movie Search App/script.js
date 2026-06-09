const API_KEY = "9afab51f";

const movieContainer =
document.getElementById("movieContainer");

const searchInput =
document.getElementById("searchInput");

const searchBtn =
document.getElementById("searchBtn");

const loader =
document.getElementById("loader");

const pageNumber =
document.getElementById("pageNumber");

const prevBtn =
document.getElementById("prevBtn");

const nextBtn =
document.getElementById("nextBtn");

const modal =
document.getElementById("movieModal");

const movieDetails =
document.getElementById("movieDetails");

const closeModal =
document.getElementById("closeModal");

let currentPage = 1;
let currentQuery = "avengers";

async function fetchMovies(query,page=1){

    loader.classList.remove("hidden");

    try{

        const response =
        await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`
        );

        const data =
        await response.json();

        movieContainer.innerHTML = "";

        if(data.Response === "False"){

            movieContainer.innerHTML =
            "<h2>No movies found.</h2>";

            return;
        }

        data.Search.forEach(movie => {

            const card =
            document.createElement("div");

            card.className =
            "movie-card";

            card.innerHTML = `
            <img src="${movie.Poster}"
            alt="${movie.Title}">

            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            </div>
            `;

            card.addEventListener(
            "click",
            ()=>fetchMovieDetails(movie.imdbID)
            );

            movieContainer.appendChild(card);
        });

    }

    catch(error){

        movieContainer.innerHTML =
        "<h2>Something went wrong.</h2>";
    }

    finally{

        loader.classList.add("hidden");
    }
}

async function fetchMovieDetails(id){

    const response =
    await fetch(
    `https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`
    );

    const movie =
    await response.json();

    movieDetails.innerHTML = `
    <div class="details">

        <img src="${movie.Poster}">

        <div>

            <h2>${movie.Title}</h2>

            <p><strong>Year:</strong>
            ${movie.Year}</p>

            <p><strong>Genre:</strong>
            ${movie.Genre}</p>

            <p><strong>Rating:</strong>
            ${movie.imdbRating}</p>

            <p><strong>Plot:</strong>
            ${movie.Plot}</p>

        </div>

    </div>
    `;

    modal.style.display = "block";
}

searchBtn.addEventListener("click",()=>{

    currentQuery =
    searchInput.value.trim();

    currentPage = 1;

    pageNumber.textContent =
    currentPage;

    fetchMovies(currentQuery);
});

nextBtn.addEventListener("click",()=>{

    currentPage++;

    pageNumber.textContent =
    currentPage;

    fetchMovies(
    currentQuery,
    currentPage
    );
});

prevBtn.addEventListener("click",()=>{

    if(currentPage > 1){

        currentPage--;

        pageNumber.textContent =
        currentPage;

        fetchMovies(
        currentQuery,
        currentPage
        );
    }
});

closeModal.addEventListener("click",()=>{

    modal.style.display = "none";
});

window.onclick = (e)=>{

    if(e.target === modal){

        modal.style.display = "none";
    }
};

fetchMovies(currentQuery);