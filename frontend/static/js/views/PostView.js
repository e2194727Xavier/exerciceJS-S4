import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Voir film");
  }

  async getHtml() {
    const num = this.params.id;
    console.log(num);
    async function getData(url) {
      const response = await fetch(url);
      return response.json();
    }

    const data = await getData("/movies-result=night");
    const movie = data.Search.find((item) => item.imdbID === num);
    console.log(movie);
 

    return `
    <div class="movie-detail-container">
      <h1 class="movie-title">${movie.Title}</h1>
      <img src="${movie.Poster}" alt="movie poster" class="movie-poster">
      <p class="movie-info"><strong>Year:</strong> ${movie.Year}</p>
      <p class="movie-info"><strong>Type:</strong> ${movie.Type}</p>
      <a href='/films' class="back-link" data-link>Retour</a>
    </div>
    `;
  }
}
