const fetchPokemon = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=151`;
    fetch(url)                                      // fetch the url, which then returns a promise. in that promise, define the callback which is the response. the response is an arrow function to call the response with a json method which then converts the response into json to get the body of the response. 
        .then( response => {
            return response.json(); 
        })
          
}

fetchPokemon();