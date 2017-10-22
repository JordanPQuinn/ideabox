$('document').ready(function() {


// GLOBAL VARIABLES
var titleInput = $('#title-input');
var bodyInput = $('#body-input');
var saveButton = $('#save-button');
var ideaStorage = $('#idea-storage');
var keyId;


// EVENT LISTENERS
saveButton.on('click', submitIdea);
ideaStorage.on('click', '.delete', deleteCard);
ideaStorage.on('mousedown', '.idea-body', editBody)


// FUNCTIONS
loadIdeas();

function loadIdeas() {
  for (var i = 0; i < localStorage.length; i++) {
    let title = JSON.parse(Object.values(localStorage)[i]).title;
    let body = JSON.parse(Object.values(localStorage)[i]).body;
    let key = JSON.parse(Object.values(localStorage)[i]).keyId;
    createCard(title, body, key);
  }
}

function IdeaCard() {
  this.title = titleInput.val();
  this.body = bodyInput.val();
  this.keyId = keyId;
}

function submitIdea(event) {
  event.preventDefault();
<<<<<<< HEAD
  prepend(titleInput.val(), bodyInput.val())
=======
  addStorage();
  createCard(titleInput.val(), bodyInput.val(), keyId);
  clearInput();
>>>>>>> dc2e0b14f857ebb107393ca160362b9957a66a44
};

function addStorage() {
  keyId = Date.now();
  var newIdea = JSON.stringify(new IdeaCard);
  localStorage.setItem(keyId, newIdea);
}

function createCard(title, body, key) {
    ideaStorage.prepend(
    ` 
<<<<<<< HEAD
    <article class="card">
    <h2 class="idea-title" contenteditable="true"> ${title}
=======
    <article class="card" id="${key}">
    <h2 class="idea-title"> ${title}
>>>>>>> dc2e0b14f857ebb107393ca160362b9957a66a44
    <span class="delete">
    <img src="images/delete.svg" class="delete" alt="delete-icon">
    </span>
    </h2>
    <p class="idea-body">${body}</p>
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
  for (var i = 0; i < localStorage.length; i++) {
    let key = JSON.parse(Object.values(localStorage)[i]).keyId;
    var keyToDelete = parseInt($(this).closest('article').prop('id'));
    // console.log(key);
    // console.log(parseInt($(this).closest('article').prop('id')));
    if (key === keyToDelete) {
      // console.log('test works');
      localStorage.removeItem(key);
    }
  }
}

<<<<<<< HEAD
function loadIdeas() {
  for (var i=0; i<Object.keys(localStorage).length; i++) {
    prepend(JSON.parse(Object.values(localStorage)[i]).title, JSON.parse(Object.values(localStorage)[i]).body)
=======
function clearInput() {
  titleInput.val('');
  bodyInput.val('');
}

//Function overview: searches to see if the key for the current article is equal.
//If so, grab the storedBody information. 
//Next step will be to set the storedBody information to the editedBody information.

function editBody() {
  var bodyToEdit = $(this).closest('.idea-body');
  console.log(bodyToEdit.text());
  bodyToEdit.prop('contenteditable', 'true');
  for (var i = 0; i < localStorage.length; i++) {
    let key = JSON.parse(Object.values(localStorage)[i]).keyId;
    var keyToEdit = parseInt($(this).closest('article').prop('id'));
    if(key === keyToEdit) {
      var storedBody = (JSON.parse(Object.values(localStorage)[i]).body);
      console.log(storedBody);
    }
>>>>>>> dc2e0b14f857ebb107393ca160362b9957a66a44
  }
}


});