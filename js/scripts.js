let pokemonRepository = (function() {
  let pokemonList =[];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

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
  listPokemon.classList.add("list-group-item");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("btn");
  button.classList.add("btn-primary");
  button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#exampleModal');
  listPokemon.appendChild(button);
// Lines 30-32, adds the line item "listPokemon" to the container which is pokemonList defined in line 23
  if (pokemonList) {
      pokemonList.appendChild(listPokemon);
  }
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
    const typeNames = pokemon.types.map((type) => type.type.name);
    console.log(pokemon.types, typeNames);
  showModal(pokemon.name, pokemon.height, pokemon.imageUrl, typeNames);
  });
}

function showModal (title, height, imageUrl, typeNames) {
  let titleElement = document.querySelector('.modal-title');
  titleElement.innerText = title;
  let imageElement = document.querySelector('.image-holder'); //selects the image holder class that was created in the html
  let myImage = document.createElement('img'); //creates the image itself
  myImage.src = imageUrl; // add the image to the selector from line 83
  imageElement.innerHTML="";
  imageElement.appendChild(myImage); // add the image to the selector from line 83
  let heightElement = document.querySelector('.height-holder');
  heightElement.innerHTML = "<ul><li>Height: " + height + "</li><li class='my-TypeNames'>Types: " + typeNames.join(", ") + "</li></u1>";
  }

  // document.querySelector('#show-modal').addEventListener('click', () => {
  // showModal ('Modal title', 'This is the modal content');
  // });

// Return an object with its corresponding properties.
return {
  getAll: getAll,
  add: add,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails,
  showModal: showModal
};
})();

// This calls the api, runs pokemon repo & the load list
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
      });
});