const inputMovie = document.getElementById("input-search");
const btnSearch = document.getElementById("search-btn");
const searchArea = document.querySelector(".search-area");
const imageArea = document.querySelector(".image-area");
const errorArea = document.querySelector(".error");
const plotArea = document.querySelector(".plot-area");
const backgroundCard = document.querySelector(".background-card");
const apiKey = "5588c251";

window.onload = function () {
  backgroundCard.classList.add("background-card-size");
};

function showError(error) {
  const messageError = document.createElement("p");
  messageError.textContent = error;
  messageError.classList.add("error-msg");
  errorArea.appendChild(messageError);

  setTimeout(() => {
    messageError.remove();
  }, 2000);
}

function searchMovie() {
  const movieQuery = inputMovie.value;
  const url = `http://www.omdbapi.com/?t=${movieQuery}&apikey=${apiKey}`;

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      if (data.Response == "True") {
        imageArea.innerHTML = `
      <img src=${data.Poster} alt="movie-poster" class="poster">
    <div class="details-text">
    <div class="new-box">
        <h1 class="data-title">${data.Title}</h1>
        <span><i class="fa-solid fa-star"></i></span>
        <span>${data.imdbRating}/10</span>
    <div class="crters">
        <P>${data.Year}</p>
        <p>${data.Rated}</p>
        <p>${data.Runtime}</p>
    </div>
    <div class="crters2">
    <p class="genre">${data.Genre.split(",").join("</p><p class='genre'>")}</p>
    </div>
    </div>

    <div class="dir-wri-act">

    <div class="shared">
    <h4 class="texts">Director</h4> 
    <p class="texts">${data.Director}</p>
    </div>

    <div class="shared">
    <h4 class="texts">Writer</h4> 
    <p class="texts">${data.Writer}</p>
    </div>

    <div class="shared language-special">
    <h4 class="texts">Language</h4> 
    <p class="texts">${data.Language}</p>
    </div>

    <div class="shared">
    <h4 class="texts">Country</h4> 
    <p class="texts">${data.Country}</p>
    </div>

    </div>

    </div>
    

    `;
        plotArea.innerHTML = `
    <div class="plot-area">
      <h2 class="plot-title">Plot</h2> 
        <p class="plot-text">${data.Plot}</p>
      <h2 class="plot-title">Cast</h2> 
        <p class="plot-text">${data.Actors}</p>
      <h2 class="plot-title">Awards</h2> 
        <p class="plot-text">${data.Awards}</p>
    </div>
    `;
      }
    })
    .then(() => {
      inputMovie.value = "";
    });
}

inputMovie.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && e.target.value === "") {
    showError("Please enter a valid movie name");
  }
  if (e.key === "Enter" && e.target.value !== "") {
    backgroundCard.classList.remove("background-card-size");
    searchMovie();
  }
});

btnSearch.addEventListener("click", function () {
  if (inputMovie.value !== "") {
    backgroundCard.classList.remove("background-card-size");
    searchMovie();
  } else {
    showError("Please enter a valid movie name");
  }
});
