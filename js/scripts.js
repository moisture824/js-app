//{used for arrays} while [used for objects]

(function () {
    let pokemonList =[
        {name: "Pikachu", height: 10, type: "lightening"},
        {name: "Charmander", height: 12, type: "fire"},
        {name: "Blastoise", height: 14, type: "water"},
    ];

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
})();