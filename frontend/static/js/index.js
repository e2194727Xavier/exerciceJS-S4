import Dashboard from "./views/Dashboard.js"
import Films from "./views/Films.js"
import PostView from "./views/PostView.js"


//regex
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

//get params
const getParams = match =>  {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result [1])

    return Object.fromEntries(keys.map((key, i)=>{
        return [key, values[i]]
    }))
}

// un routeur
const router = async()=>{
   /*  console.log(pathToRegex("/post-view/:id")) */
    const routes = [
    {path:"/", view: Dashboard},
    {path:"/films", view:Films},/* Valeur qu'on a donner dans le index.html href */
    {path: "/post-view/:id", view:PostView}    
    ]


    // DEUXIEME ÉTAPE, on veut chercher un correspondance potentiel 
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result : location.pathname.match(pathToRegex(route.path))
        }  
    })
    //console.log(potentialMatches)
    
    
    /* Trouver la view */

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null )
    if(!match){
     /* Si on ne trouve pas, on va retourner vers la page index */
        match = {
            route: routes[0],
            result : [location.pathname]
        }
    }
    console.log(match.result)
   // console.log(match.route.view())

   const view = new match.route.view(getParams(match));
   console.log(getParams(match))
   document.querySelector("#app").innerHTML = await view.getHtml()


}

window.addEventListener("popstate",router)

/* POur naviguer */
const navigateTo = url =>{
    history.pushState(null,null,url)
    router()
}

document.addEventListener('DOMContentLoaded', () =>{

    document.body.addEventListener('click', e =>{
        if(e.target.matches("[data-link]")){
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })
    router()
})