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
/* The addListItem function takes a pokemon object as a parameter & adds it to a list of Pokemon. It creates a new list item
with a button that displays the Pokemon name & logs the event when clicked. The button is added to the list item, which is then
appended to the Pokemon list.*/
    function addListItem(pokemon){
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.addEventListener("click", function (event) {
            console.log(event);
        });
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }
// Return an object with four properties, getAll, add, addListItem, & showDetails.
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        showDetails: showDetails
    };

})();

// This code retrieves all Pokemon from the pokemonRepository, and for each Pokemon, adds a new list item to the list by calling the addListItem method of the pokemonRepository.
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});