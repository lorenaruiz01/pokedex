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
    displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map ( (pokemon) => 
        `<li class="card" onclick="selectPokemon(${pokemon.id})" >
            <img class="card-image" src="${pokemon.image}"/>
            <h2 class="card-title">#${pokemon.id} ${pokemon.name}</h2>
        </li>`
        ).join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const individualPokemonData = await response.json();
    displayPopup(individualPokemonData);
};

const displayPopup = (individualPokemonData) => {
    const type = individualPokemonData.types.map( (type) => type.type.name).join(', ');
    const htmlString = `
    <div class="popup">
        <button id="closeBtn" onclick="closePopup()">Close</button>
        <div class="card">
            <img class="card-image" src="${pokemon.image}"/>
            <h2 class="card-title">#${pokemon.id} ${pokemon.name}</h2>
            <p class="card-subtitle">Height: ${pokemon.height} m tall </p>
            <p class="card-subtitle">Types: ${pokemon.types}</p>
        </div>
    </div>
    `
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


// inside displayPokemon function:
            // <p class="card-subtitle">Height: ${pokemon.height} m tall </p>
            // <p class="card-subtitle">Types: ${pokemon.types}</p> 