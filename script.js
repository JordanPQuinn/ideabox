$('document').ready(function() {


// GLOBAL VARIABLES
var titleInput = $('#title-input');
var bodyInput = $('#body-input');
var saveButton = $('#save-button');
var ideaStorage = $('#idea-storage');
var searchInput = $('#search-input');
var keyId;


// EVENT LISTENERS
saveButton.on('click', submitIdea);
ideaStorage.on('click', '.delete', deleteCard);
ideaStorage.on('blur', '.idea-title, .idea-body', editIdea);
searchInput.on('keyup', searchIdeas);

// FUNCTIONS
titleInput.focus();
loadIdeas();

function loadIdeas() {
  for (var i = 0; i < localStorage.length; i++) {
    let title = JSON.parse(Object.values(localStorage)[i]).title;
    let body = JSON.parse(Object.values(localStorage)[i]).body;
    let key = JSON.parse(Object.values(localStorage)[i]).keyInStorage;
    createCard(title, body, key);
  }
}

function IdeaCard(title, body, keyInStorage) {
  this.title = title;
  this.body = body;
  this.keyInStorage = keyInStorage;
  this.quality = 'swill';
}

function submitIdea(event) {
  event.preventDefault();
  addStorage();
  createCard(titleInput.val(), bodyInput.val(), keyId);
  clearInput();
};
 
function addStorage() {
  keyId = Date.now();
  let newIdea = JSON.stringify(new IdeaCard(titleInput.val(), bodyInput.val(), keyId));
  localStorage.setItem(keyId, newIdea);
}

function createCard(title, body, key) {
  ideaStorage.prepend(
    ` 
    <article class="card" id="${key}">
    <h2 class="idea-title" contenteditable="true">${title}</h2>
    <span class="delete">
    <img src="images/delete.svg" class="delete" alt="delete-icon">
    </span>
    <p class="idea-body" contenteditable="true">${body}</p>
    <span class="upvote">
    <img src="images/upvote.svg" alt="upvote-icon">
    </span>
    <span class="downvote">
    <img src="images/downvote.svg" alt="downvote-icon">
    </span>
    <p class="bold-quality-text">quality: <span class="quality">swill</span></p>
    </article>
    `
  );
}

function deleteCard() {
  $(this).closest('article').remove();
  let keyToDelete = parseInt($(this).closest('article').prop('id'));
  for (var i = 0; i < localStorage.length; i++) {
    let key = JSON.parse(Object.values(localStorage)[i]).keyInStorage;
    if (key === keyToDelete) {
      localStorage.removeItem(key);
    }
  }
}

function clearInput() {
  titleInput.val('');
  bodyInput.val('');
}

function editIdea() {
  let ideaCardKey = parseInt($(this).closest('article').prop('id'));
  let editTitle = $(this).parent().children('.idea-title').text();
  let editBody = $(this).parent().children('.idea-body').text();
  let changedIdea = JSON.stringify(new IdeaCard(editTitle, editBody, ideaCardKey));
  localStorage[ideaCardKey] = changedIdea;
}

function searchIdeas() {
  if (searchInput.val().length === 0) {
    //hide all ideas
    console.log('all cards hidden!');
  }
  else {
    //access each title and body separately
    //test title and body for match
    var storageKeys = Object.keys(localStorage);
    storageKeys.forEach(function(n) {
      let title = JSON.parse(localStorage[n]).title;
      let body = JSON.parse(localStorage[n]).body;
      console.log(title, body);

    });


  }
}


function searchIdeas() {
  var currentSearch = $('#search-input').val();
  var bodyContent = $('.idea-body');
  var titleContent = $('.idea-title');
  for(var i = 0; i < bodyContent.length; i++) {
    if($(bodyContent[i]).text().includes(currentSearch) || ($(titleContent[i]).text().includes(currentSearch))){
      $(bodyContent[i]).closest('article').show();
    }
    else {
      $(bodyContent[i]).closest('article').hide();
    }
  }
}

});