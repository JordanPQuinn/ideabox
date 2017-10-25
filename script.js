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
ideaStorage.on('click', '.upvote', upvoteIdea);
ideaStorage.on('click', '.downvote', downvoteIdea);
searchInput.on('keyup', searchIdeas);

// FUNCTIONS
titleInput.focus();
loadIdeas();

function loadIdeas() {
  for (var i = 0; i < localStorage.length; i++) {
    let title = JSON.parse(Object.values(localStorage)[i]).title;
    let body = JSON.parse(Object.values(localStorage)[i]).body;
    let key = JSON.parse(Object.values(localStorage)[i]).keyInStorage;
    let quality = JSON.parse(Object.values(localStorage)[i]).quality;
    createCard(title, body, key, quality);
  }
}

function IdeaCard(title, body, keyInStorage, quality) {
  this.title = title;
  this.body = body;
  this.keyInStorage = keyInStorage;
  this.quality = quality === undefined? 'swill' : quality;
}

function submitIdea(event) {
  event.preventDefault();
  addStorage();
  createCard(titleInput.val(), bodyInput.val(), keyId, 'swill');
  titleInput.val('');
  bodyInput.val('');
};
 
function addStorage() {
  keyId = Date.now();
  let newIdea = JSON.stringify(new IdeaCard(titleInput.val(), bodyInput.val(), keyId));
  localStorage.setItem(keyId, newIdea);
}

function createCard(title, body, key, quality) {
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
    <p class="bold-quality-text">quality: <span class="quality">${quality}</span></p>
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

function editIdea() {
  let ideaCardKey = parseInt($(this).closest('article').prop('id'));
  let editTitle = $(this).parent().children('.idea-title').text();
  let editBody = $(this).parent().children('.idea-body').text();
  let currentQuality = $(this).parent().children('.bold-quality-text').children('.quality').text();
  console.log(currentQuality);
  let changedIdea = JSON.stringify(new IdeaCard(editTitle, editBody, ideaCardKey, currentQuality));
  localStorage[ideaCardKey] = changedIdea;
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

function upvoteIdea() {
  let ideaCardKey = parseInt($(this).closest('article').prop('id'));
  let currentTitle = JSON.parse(localStorage[ideaCardKey]).title;
  let currentBody = JSON.parse(localStorage[ideaCardKey]).body;
  let currentQuality = JSON.parse(localStorage[ideaCardKey]).quality;
  if (currentQuality === 'plausible') {
    $(this).next().next().children('.quality').text('genius');
    let updatedIdea = JSON.stringify(new IdeaCard(currentTitle, currentBody, ideaCardKey, 'genius'));
    localStorage[ideaCardKey] = updatedIdea;
  }
  if (currentQuality === 'swill') {
    $(this).next().next().children('.quality').text('plausible');
    let updatedIdea = JSON.stringify(new IdeaCard(currentTitle, currentBody, ideaCardKey, 'plausible'));
    localStorage[ideaCardKey] = updatedIdea;
  }
}

function downvoteIdea() {
  let ideaCardKey = parseInt($(this).closest('article').prop('id'));
  let currentTitle = JSON.parse(localStorage[ideaCardKey]).title;
  let currentBody = JSON.parse(localStorage[ideaCardKey]).body;
  let currentQuality = JSON.parse(localStorage[ideaCardKey]).quality;
  if (currentQuality === 'plausible') {
    $(this).next().children('.quality').text('swill');
    let updatedIdea = JSON.stringify(new IdeaCard(currentTitle, currentBody, ideaCardKey, 'swill'));
    localStorage[ideaCardKey] = updatedIdea;
  }
  if (currentQuality === 'genius') {
    $(this).next().children('.quality').text('plausible');
    newQuality = 1;
    let updatedIdea = JSON.stringify(new IdeaCard(currentTitle, currentBody, ideaCardKey, 'plausible'));
    localStorage[ideaCardKey] = updatedIdea;
  }
}


});