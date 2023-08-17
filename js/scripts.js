// {used for arrays} while [used for objects]

let pokemonRepository = (function() {
  let modalContainer = document.querySelector ('#modal-container');

  function showModal (title, text) {
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
    contentElement.innerText = text;

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

  function showDialog(title, text) {
    showModal(title, text);
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

    // We want to focuse the confirmButton so that the user can simply press Enter
    confirmButton.focus();
    // Return a promise that resolves when confirmed, else rejects
    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', hideModal);
      confirmButton.addEventListener('click', () => {
        dialogPromiseReject = null; //Reset this
        hideModal();
        resolve();
    });
    
    // This can be used to reject from other functions
      dialogPromiseReject = reject;
    });
  }

  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
      alert('confirmed!');
    }, () => {
      alert('not confirmed');
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
  // since this is also triggered when clicking INSIDE the modal
  // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  document.querySelector('show-modal').addEventListener('click', () => {
    showModal ('Modal title', 'This is the modal content');
  });

  })();