const BASE_URL = "https://api.jikan.moe/v3/search/anime";

const renderCard = data => {
  const markup = `
    <div class="card__box">
      <a href=${data.url}>
        <img src=${data.image_url} alt=${data.title} class="card-image"/>
      </a>
      <div class="card__details">
        <p class="airing"><span class=${data.airing ? "green" : "blue"}>${
    data.airing ? " Still Airing" : "Finished Airing"
  }</span></p>
        <p class="episodes">Episodes: ${
          data.episodes === 0 ? "NA" : data.episodes
        }</p>
        <p class="score">Score: ${data.score}</p>
        <p class="type">Type: ${data.type}</p>
      </div>
      <h3 class="card__title">${data.title}</h3>
    </div>   
  `;

  document
    .querySelector(".card__container")
    .insertAdjacentHTML("beforeend", markup);
};

const clearResults = () => {
  document.querySelector(".card__container").innerHTML = "";
};

const clearInput = () => {
  document.getElementById("search").value = "";
};

function getAnime(e) {
  clearResults();
  e.preventDefault();

  const form = new FormData(this);
  const query = form.get("search");

  fetch(`${BASE_URL}?q=${query}`)
    .then(res => res.json())
    .then(data => {
          Array.from(data.results).forEach(el => {
          renderCard(el);
        });
    })
    .catch(err => console.log(err));
  clearInput();
}

function init() {
  const form = document.getElementById("search__form");
  form.addEventListener("submit", getAnime);
}

document
  .querySelector(".navigation-home")
  .addEventListener("click", function() {
    clearResults();
    clearInput();
  });


window.addEventListener("load", init);
