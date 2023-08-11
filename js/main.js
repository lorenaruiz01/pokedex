const pokedex = document.getElementById('pokedex');

const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=150`;
    const responseFromUrl = await fetch(url);
    const data = await responseFromUrl.json();
    const pokemon = data.results.map( (result, index) => ({
        ...result,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index+ 1}.png`
    }));
    console.log(data.results);
    displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
    console.log(pokemon);
    const pokemonHTMLString = pokemon.map ( pokemon => 
        `<li class="card">
            <img class="card-image" src="${pokemon.image}"/>
            <h2 class="card-title">#${pokemon.id} ${pokemon.name}</h2>
            <p class="card-subtitle">Height: ${pokemon.height} m tall </p>
            <p class="card-subtitle">Types: ${pokemon.types}</p>
        </li>`
        ).join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();



//////// scratch code: 

// const promises = [];
//     for (let i = 1; i <= 150; i++ ) {
//         const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
//         promises.push(fetch(url).then( (response) => response.json()));                                      // fetch the url, which then returns a promise. in that promise, define the callback which is the response. the response is an arrow function to call the response with a json method which then converts the response into json to get the body of the response. 
//     }

//     Promise.all(promises).then( (results) => {
//         const pokemon = results.map( (data) => ({
//             name: data.name,
//             id: data.id,
//             image: data.sprites['front_default'],
//             height: data.height,
//             types: data.types.map((type) => type.type.name).join(', ')
//         }));
//         displayPokemon(pokemon);
//     });