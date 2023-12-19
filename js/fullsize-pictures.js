const LOADED_COMMENTS_COUNT = 5;

const bigPictureElement = document.querySelector('.big-picture');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const shownCommentsElement = bigPictureElement.querySelector('.comments-shown');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const loadButtonElement = bigPictureElement.querySelector('.social__comments-loader');
const bodyElement = document.querySelector('body');

let currentCommentsCount = 0;
let comments = [];

const getCommentTemplate = (comment) => `
  <li class="social__comment">
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  </li>`;

const renderComments = () => {
  currentCommentsCount += LOADED_COMMENTS_COUNT;
  if (currentCommentsCount >= comments.length) {
    loadButtonElement.classList.add('hidden');
    currentCommentsCount = comments.length;
  } else {
    loadButtonElement.classList.remove('hidden');
  }
  const commentsSet = comments.slice(0, currentCommentsCount);
  commentsListElement.innerHTML = '';
  let commentsHTML = '';
  commentsSet.forEach((comment) => {
    commentsHTML += getCommentTemplate(comment);
  });
  commentsListElement.innerHTML = commentsHTML;
  shownCommentsElement.textContent = currentCommentsCount;
};

const onLoadButtonClick = () => {
  renderComments();
};

const initComments = () => {
  renderComments();
  loadButtonElement.addEventListener('click', onLoadButtonClick);
};

const destroyComments = () => {
  loadButtonElement.removeEventListener('click', onLoadButtonClick);
  currentCommentsCount = 0;
};

const renderPictureData = (picture) => {
  bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.social__caption').textContent = picture.description;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;
};

const closeFullsizePicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeyDown);
  destroyComments();
};

const onCancelButtonClick = () => {
  closeFullsizePicture();
};

const showFullsizePicture = (picture) => {
  comments = picture.comments.slice();
  renderPictureData(picture);
  initComments();
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeyDown);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
};

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeFullsizePicture();
  }
}


export { showFullsizePicture };
