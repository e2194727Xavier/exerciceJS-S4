import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Films");
    console.log(params)
  }

  async getHtml() {
    async function getData(url) {
        console.log(url)
      const response = await fetch(url);
      console.log(response)
      return response.json();
    }

    const data = await getData("/movies-result=night");

    console.log(data)
    let movieList = "";
    for (let i = 0; i < data.Search.length; i++) {
      const movie = data.Search[i];
    movieList += `
    <div class="movie-item">
      <a href="/post-view/${movie.imdbID}" class="movie-link" data-link>
        ${movie.Title}"
      </a>
    </div>
    `;
    }

const movieListContainer = `<div class="movie-list-container">${movieList}</div>`;


    return `
      <h1 class="header" >Nos films</h1>
      ${movieListContainer}
    `;
  }
}
