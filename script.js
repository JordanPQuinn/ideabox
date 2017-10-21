$('document').ready(function() {


// GLOBAL VARIABLES
var titleInput = $('#title-input');
var bodyInput = $('#body-input');
var saveButton = $('#save-button');
var ideaStorage = $('#idea-storage');
var key;

// EVENT LISTENERS
saveButton.on('click', submitIdea);
loadIdeas();
//saveButton.on('click', addStorage);
$('#idea-storage').on('click', '.delete', deleteCard);

// FUNCTIONS
function submitIdea(event) {
  event.preventDefault();
  addStorage();
  createCard(titleInput.val(), bodyInput.val())
};

function createCard(title, body) {
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
    console.log('this.key', key);
}

function deleteCard() {
  var cardId = $(this).closest('article').prop('id');
  console.log($(this).closest('article')
    );
}

function addStorage() {
  var title = titleInput.val();
  var body = bodyInput.val();
  var newIdea = JSON.stringify({title, body});
  key = Date.now();
  console.log('addstoragekey', key);
  localStorage.setItem(key, newIdea);
}

function loadIdeas() {
  for (var i = 0; i < localStorage.length; i++) {
    createCard(JSON.parse(Object.values(localStorage)[i]).title, JSON.parse(Object.values(localStorage)[i]).body)
  }
}


});