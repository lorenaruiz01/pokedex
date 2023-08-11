const pokedex = document.getElementById('pokedex');
const pokeChache = {};

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
    if(!pokeChache[id]){
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const response = await fetch(url);
        const pokemon = await response.json();
        pokeChache[id] = pokemon;
        displayPopup(pokemon);
    } else{
        displayPopup(pokeChache[id]);
    }
};

const displayPopup = (pokemon) => {
    const type = pokemon.types.map( (type) => type.type.name).join(', ');
    const image = pokemon.sprites['front_default'];
    const htmlString = `
    <div class="popup">
        <button id="closeBtn" onclick="closePopup()">Close</button>
        <div class="card">
            <img class="card-image" src="${image}"/>
            <h2 class="card-title">#${pokemon.id} ${pokemon.name}</h2>
            <p class="card-subtitle">Height: ${pokemon.height}m tall </p>
            <p class="card-subtitle">Types: ${type}</p>
        </div>
    </div>
    `;
    
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
    
    console.log(htmlString);
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchPokemon();