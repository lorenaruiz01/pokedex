const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {

    const promises = [];
    for (let i = 1; i <= 150; i++ ) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then( (response) => response.json()));                                      // fetch the url, which then returns a promise. in that promise, define the callback which is the response. the response is an arrow function to call the response with a json method which then converts the response into json to get the body of the response. 
    }

    Promise.all(promises).then( (results) => {
        const pokemon = results.map( (data) => ({
            name: data.name,
            id: data.id,
            image: data.sprites['front_default'],
            types: data.types.map((type) => type.type.name).join(', ')
        }));
        console.log(pokemon)
    });
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map ( pokemon => 
        `<li>
            <img src="${pokemon.image}"/>
            <h2>${pokemon.name} No.${pokemon.id}</h2>
            <p> Height: ${pokemon.height} m tall </p>
            <p>Types: ${pokemon.type}</p>
        </li>`
        );
    pokedex.innerHTML = pokemonHTMLString;
}

fetchPokemon();
