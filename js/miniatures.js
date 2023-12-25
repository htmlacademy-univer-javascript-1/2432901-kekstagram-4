import { showFullsizePicture } from './popup-fullsize-picture.js';

const PICTURE_SELECTOR = '.picture';
let pictures = null;

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const onPicturesContainerClick = (evt) => {
  const targetElement = evt.target.closest('.picture');
  if (targetElement) {
    const id = +targetElement.dataset.pictureId;
    const miniature = pictures.find((picture) => picture.id === id);
    showFullsizePicture(miniature);
  }
};

const createMiniature = ({url, description, likes, comments, id}) => {
  const miniature = pictureTemplate.cloneNode(true);

  miniature.dataset.pictureId = id;
  miniature.querySelector('.picture__img').src = url;
  miniature.querySelector('.picture__img').alt = description;
  miniature.querySelector('.picture__likes').textContent = likes;
  miniature.querySelector('.picture__comments').textContent = comments.length;

  return miniature;
};

const renderMiniatures = (data) => {
  const picturesListFragment = document.createDocumentFragment();
  document
    .querySelectorAll(PICTURE_SELECTOR)
    .forEach((element) => element.remove());
  pictures = data.slice();
  if (!pictures) {
    return;
  }
  pictures.forEach((picture) => {
    const miniature = createMiniature(picture);
    picturesListFragment.appendChild(miniature);
  });
  container.appendChild(picturesListFragment);
  container.addEventListener('click', onPicturesContainerClick);
};

export { renderMiniatures };
