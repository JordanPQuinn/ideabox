$('document').ready(function() {

// GLOBAL VARIABLES
var titleInput = $('#title-input');
var bodyInput = $('#body-input');
var saveButton = $('#save-button');
var ideaStorage = $('#idea-storage');

// EVENT LISTENERS
saveButton.on('click', submitIdea);
saveButton.on('click', addStorage);

// FUNCTIONS
function submitIdea(event) {
  event.preventDefault();
  ideaStorage.prepend(
    ` 
    <article class="card">
    <h2 class="idea-title"> ${titleInput.val()}
    <span class="delete">
    <img src="images/delete.svg" class="delete" alt="delete-icon">
    </span>
    </h2>
    <p class="idea-body">${bodyInput.val()}</p>
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
};

function addStorage() {
  var title = titleInput.val();
  var body = bodyInput.val();
  var newIdea = JSON.stringify({title, body});
  localStorage.setItem(Date.now(), newIdea);
}



});