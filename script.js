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
  addStorage();
  createCard(titleInput.val(), bodyInput.val(), keyId)
};

function addStorage() {
  keyId = Date.now();
  var newIdea = JSON.stringify(new IdeaCard);
  localStorage.setItem(keyId, newIdea);
}

function createCard(title, body, key) {
    ideaStorage.prepend(
    ` 
    <article class="card" id="${key}">
    <h2 class="idea-title"> ${title}
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
  // 1. find ID - DONE
  // 2. use array method to find ID/Key match 
  // 3. localStorage.removeItem with matching key
  console.log($(this).closest('article').prop('id')); //ID found
}



});