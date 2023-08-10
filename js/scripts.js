//{used for arrays} while [used for objects]

let pokemonList =[
    {name: "Pikachu", height: 10, type: "lightening"},
    {name: "Charmander", height: 12, type: "fire"},
    {name: "Blastoise", height: 14, type: "water"},
];

// This code uses a for loop to iterate over each item in a list called pokemonList
for (let i=0; i <pokemonList.length; i++) {
// For each item in the list, the code creates a variable called pokemon and assigns it the value of the current item
    let pokemon = pokemonList[i];
   
// If the height is greater than or equal to 14, the code writes the Pokémon's name, height, and the label "Wow that's big!" on the website's DOM
    if (pokemon.height >= 14) {
        document.write(pokemon.name + " (height: " + pokemon.height +  ") - Wow that's big!<br><br>");
    } else {
    // If the height is less than 14, only the Pokémon's name and height are written on the website's DOM
        document.write(pokemon.name + " (height: " + pokemon.height + ")<br><br>");
        }
    }
