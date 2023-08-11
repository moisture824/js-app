//{sed for arrays} while [used for objects]

let pokemonRepository = (function () {
    let pokemonList =[
        {name: "Pikachu", height: 10, type: "lightening"},
        {name: "Charmander", height: 12, type: "fire"},
        {name: "Blastoise", height: 14, type: "water"},
    ];

// Define a function named getAll that returns the pokemonList array
    function getAll() {
        return pokemonList;
    }
// Define a function named add that takes a single argument, pokemon, and adds it to the pokemonList array
    function add(pokemonitem) {
        pokemonList.push(pokemonitem);
    }
// Return an object with two properties, getAll and add, which are assigned the values of the getAll and add functions, respectively
    return {
        getAll: getAll,
        add: add
    };

})();

    // Use the forEach() function to iterate over each element in the pokemonList array
    pokemonList.forEach(function(pokemon) {
        // Check if the height of the current pokemon is greater than or equal to 14
        if (pokemon.height >= 14) {
            // If the height is greater than or equal to 14, write the name and height of the pokemon to the document, along with a message indicating that it is big
            document.write(pokemon.name + " (height: " + pokemon.height + ") - Wow that's big!<br><br>");
        } else {
            // If the height is less than 14, write only the name and height of the pokemon to the document
            document.write(pokemon.name + " (height: " + pokemon.height + ")<br><br>");
        }
    });