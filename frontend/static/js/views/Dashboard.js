import AbstractView from "./AbstractView.js";

export default class extends AbstractView{
    constructor(params){
        super(params); /* Ca veut dire que je peux accéder au propriété et params du parent */
        this.setTitle("Accueil") 
    }

    async getHtml(){
        return `
        <div class="home-container">
          <h1 class="home-title">Accueil</h1>
          <p class="home-description">Pour voir nos <a href="/films" data-link>films</a>.</p>
        </div>
      `;
      
    }
}