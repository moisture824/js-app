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
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
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
  showModal(pokemon.name, pokemon.height, pokemon.imageUrl)
    console.log(pokemon);
  });
}

let modalContainer = document.querySelector('#modal-container');
  
function showModal (title, height, imageUrl) {
  modalContainer.innerHTML = '';
  let modal = document.createElement('div');
  modal.classList.add('modal');
  let closeButtonElement = document.createElement('button');
  closeButtonElement.classList.add('modal-close');
  closeButtonElement.innerText = 'Close';
  closeButtonElement.addEventListener('click', hideModal);
  let titleElement = document.createElement ('h1');
  titleElement.innerText = title;
  let contentElement = document.createElement ('p');
  contentElement.innerText = height;
  let myImage = document.createElement('img');
  myImage.src = imageUrl;
  modal.appendChild(myImage);
  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modalContainer.appendChild(modal);
  modalContainer.classList.add('is-visible');
  }
let dialogPromiseReject;

function hideModal() {
  let modalContainer = document.querySelector ('#modal-container');
  modalContainer.classList.remove('is-visible');
  if (dialogPromiseReject) {
  dialogPromiseReject ();
  dialogPromiseReject = null;
  }
}

modalContainer.addEventListener('click', (e) => {
  // since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
  let target = e.target;
  if (target === modalContainer) {
      hideModal();
  }
  });
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