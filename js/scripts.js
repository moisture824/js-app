//{used for arrays} while [used for objects]

let pokemonRepository = (function () {
    let pokemonList =[
        {name: "Pikachu", height: 10, type: "lightening"},
        {name: "Charmander", height: 12, type: "fire"},
        {name: "Blastoise", height: 14, type: "water"},
    ];

// Define a function named getAll that returns the pokemonList array.
    function getAll() {
        return pokemonList;
    }
// Define a function named add that takes a single argument, pokemon, and adds it to the pokemonList array.
    function add(Snorlax) {
        pokemonList.push(Snorlax);
    }
/* This function adds a new Pokemon to an existing list by creating a new list item and button, 
setting the button text to the Pokemon's name, and appending the button to the list item and the list item to the list.*/
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
    }
// Return an object with three properties, getAll, add, & addListItem.
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem
    };

})();

// This code retrieves all Pokemon from the pokemonRepository, and for each Pokemon, adds a new list item to the list by calling the addListItem method of the pokemonRepository.
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});