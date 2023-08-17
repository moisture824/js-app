//{used for arrays} while [used for objects]

// Define a pokemon repository object with an IIFE & initialize an empty pokemon list & set the API URL.
    let pokemonRepository = (function () {
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

// Load the list of pokemons from the API, then get all pokemons and add a list item for each pokemon to the DOM
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});

// Show a modal with a given title and text when a button is clicked.
(function showModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.add('is-visible');
  })();
  
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal();
  });

// showModal function will be able to accept both the title & text as parameters (i.e., anytime showModal is declared, a title & text argument must be assigned.
(function showModal(title, text) {
    let modalContainer = document.querySelector('#modal-container');
  
    // Clear all existing modal content
    modalContainer.innerHTML = '';
  
    let modal = document.createElement('div');
    modal.classList.add('modal');
  
    // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
  
    let titleElement = document.createElement('h1');
    titleElement.innerText = title;
  
    let contentElement = document.createElement('p');
    contentElement.innerText = text;
  
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);
  
  
  
    modalContainer.classList.add('is-visible');
  })();
  
  document.querySelector('#show-modal').addEventListener('click', () => {
    showModal('Modal title', 'This is the modal content!');
  });  

//Defines the emailInput & passwordInput as variables
    let emailInput = document.querySelector('#emailInput');
    let passwordInput = document.querySelector('#passwordInput');

// Validate the fields once the user starts typing in them
emailInput.addEventListener('input', validateEmail);
passwordInput.addEventListener('input', validatePassword);


// To validate email
(function validateEmail() {
    let value = emailInput.value;
    let hasAtSign = value.indexOf('@') > -1;
    let hasDot =  value.indexOf('.') > -1;
    return value && hasAtSign && hasDot;
})();

// To validate password
(function validatePassword() {
    let value = passwordInput.value;
    return value && value.length >= 8;
})();

// Message displayed if there is an error
(function showErrorMessage(input, message) {
    let container = input.parentElement; // The .input-wrapper
  
    // Check and Remove any existing errors
    let error = container.querySelector('.error-message');
    if (error) {
      container.removeChild(error);
    }
  
    // Now add the error if the message isn’t empty
    if (message) {
      let error = document.createElement('div');
      error.classList.add('error-message');
      error.innerText = message;
      container.appendChild(error);
    }
  })();

  // These are error message templates
    (function validateEmail() {
        let value = emailInput.value;
    
        if (!value) {
        showErrorMessage(emailInput, 'Email is a required field.');
        return false;
        }
    
        if (value.indexOf('@') === -1) {
        showErrorMessage(emailInput, 'You must enter a valid email address.');
        return false;
        }
    
        if (value.indexOf('.') === -1) {
        showErrorMessage(emailInput, 'You must enter a valid email address.');
        return false;
        }
  
  
    showErrorMessage(emailInput, null);
    return true;
})();

// This is a password error message
function validatePassword() {
    let value = passwordInput.value;
  
    if (!value) {
      showErrorMessage(passwordInput, 'Password is a required field.');
      return false;
    }
  
    if (value.length < 8) {
      showErrorMessage(passwordInput, 'The password needs to be at least 8 characters long.');
      return false;
    }
  
    showErrorMessage(passwordInput, null);
    return true;
  }
  
// Validates forms
    function validateForm() {
        let isValidEmail = validateEmail();
        let isValidPassword = validatePassword();
        return isValidEmail && isValidPassword;
    }

// Close the modal
    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');
    }

// Allows for the close button to work to exit file.
    let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

// Allows for the esc button to work to exit file.
    window.addEventListener('keydown', (e) => {
        let modalContainer = document.querySelector('#modal-container');
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        hideModal();  
        }
    });

// Allows for clicking outside the modal to exit the file.
    modalContainer.addEventListener('click', (e) => {
/* Since this is also triggered when clicking INSIDE the modal,
we only want to close if the user clicks directly on the overlay.*/
        let target = e.target;
        if (target === modalContainer) {
        hideModal();
        }
    });

// Action once you click confirm or cancel
document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
      alert('confirmed!');
    }, () => {
      alert('not confirmed');
    });
  });  

// Confirming action
document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?');
  });

// The showDialog function is going to accept a title and text as parameters, and the title and text will be used to engage in a dialog with the user, by asking the user to confirm an action. You will then provide the user with options (buttons) to confirm or cancel.
function showDialog(title, text) {
  showModal(title, text);

  // We have defined modalContainer here
  let modalContainer = document.querySelector('#modal-container');

  // We want to add a confirm and cancel button to the modal
  let modal = modalContainer.querySelector('.modal');

  let confirmButton = document.createElement('button');
  confirmButton.classList.add('modal-confirm');
  confirmButton.innerText = 'Confirm';

  let cancelButton = document.createElement('button');
  cancelButton.classList.add('modal-cancel');
  cancelButton.innerText = 'Cancel';

  modal.appendChild(confirmButton);
  modal.appendChild(cancelButton);

  // We want to focus the confirmButton so that the user can simply press Enter
  confirmButton.focus();
}

// showDialog now returns a promise
function showDialog(title, text) {
    // [...] Your existing code
  
    // Return a promise that resolves when confirmed, else rejects
    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', () => {
        hideModal();
        reject();
      });
      confirmButton.addEventListener('click', () => {
        hideModal();
        resolve();
      })
    });
  }

// Dialog always rejects if closed
    let dialogPromiseReject; // This can be set later, by showDialog

    function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');

    if (dialogPromiseReject) {
        dialogPromiseReject();
        dialogPromiseReject = null;
    }
    }

    let container = document.querySelector('#image-container');

    letmyImage = document.createElement('img');

    MediaKeyMessageEvent.src='https://unsplash.com/photos/l1SEP7nf2XU';

    container.appendChild(myImage);
  