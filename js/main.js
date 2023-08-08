const fetchPokemon = () => {
    const url = `https://pokeapi.co/api/v2/pokemon/1`;
    fetch(url)                                      // fetch the url, which then returns a promise. in that promise, define the callback which is the response. the response is an arrow function to call the response with a json method which then converts the response into json to get the body of the response. 
        .then( response => {
            return response.json(); 
        })
        .then( data => {                                // response.json returns another promise so then we call .then again to get the data and console.log the data
            console.log(data);
            const pokemon = {
                name: data.name,
                id: data.id,
                image: data.sprites['front_default'],
                types: data.types.map((type) => type.type.name).join(', ')      // use map() method to iterate over each types element to create new array of types then join() those type names into a string separate by commas
            };
            console.log(pokemon);
        });       
};

fetchPokemon();