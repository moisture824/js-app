//{used for arrays} while [used for objects]

// Define a pokemon repository object with an IIFE & initialize an empty pokemon list & set the API URL.
    let pokemonRepository = (function () {
        let pokemonList =[];
        let apiUrl = 'https://poke.api.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (
            typeof pokemon === "object" && "name" in pokemon
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
            }
    }

// Define a function named getAll that returns the pokemonList array.
    function getAll() {
        return pokemonList;
    }
/* Defines a function that creates a list item with a button for a given pokemon & appends it
to a list of pokemons in the DOM. The button event listener logs the event to the console & calls
the showDetails function for the pokemon when clicked.*/
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
        button.addEventListener("click", function(event) {
            showDetails(pokemon);
        });
    }
/* loadList fetches data from an API, processes the JSON response to create pokemon objects
with name & details URL properties & adds them to the pokemon list using the add function.
If there's an error during fetch, it is caught & logged to the console.*/
    function loadList() {
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
        })
    }
/* same as previous function + processes the JSON response to add image URL, height, & types properties
to the item & returns a promise.*/
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          console.log(pokemon);
        });
      }
// Return an object with its corresponding properties.
    return {
        getAll: getAll,
        add: add,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };

})();

/* Gets an array of all pokemon, iterates over the array using forEach & calls addListItem for each pokemon
to add a list item to the DOM.*/
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
});