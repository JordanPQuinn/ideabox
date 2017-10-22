$('document').ready(function() {


// GLOBAL VARIABLES
var titleInput = $('#title-input');
var bodyInput = $('#body-input');
var saveButton = $('#save-button');
var ideaStorage = $('#idea-storage');
var keyId;

// EVENT LISTENERS
saveButton.on('click', submitIdea);
$('#idea-storage').on('click', '.delete', deleteCard);


// FUNCTIONS
loadIdeas();

function submitIdea(event) {
  event.preventDefault();
  addStorage();
  createCard(titleInput.val(), bodyInput.val())
};

function createCard(title, body) {
    ideaStorage.prepend(
    ` 
    <article class="card" id="${keyId}">
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
  var cardId = $(this).closest('article').prop('id');
  console.log($(this).closest('article').prop('id'));
}

function addStorage() {
  keyId = Date.now();
  var newIdea = JSON.stringify(new IdeaCard);
  localStorage.setItem(keyId, newIdea);
}

function loadIdeas() {
  for (var i = 0; i < localStorage.length; i++) {
    createCard(JSON.parse(Object.values(localStorage)[i]).title, JSON.parse(Object.values(localStorage)[i]).body)
  }
}

function IdeaCard() {
  this.title = titleInput.val();
  this.body = bodyInput.val();
  this.keyId = keyId;
}


});