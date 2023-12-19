import { showFullsizePicture } from './fullsize-pictures.js';

const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
let pictures = null;

const onPicturesContainerClick = (evt) => {
  const targetElement = evt.target.closest('.picture');
  if (targetElement) {
    const id = targetElement.dataset.pictureId;
    const [miniature] = pictures.filter((picture) => picture.id === +id);
    showFullsizePicture(miniature);
  }
};

const createMiniature = ({url, description, likes, comments, id}) => {
  const miniature = miniatureTemplate.cloneNode(true);

  miniature.dataset.pictureId = id;
  miniature.querySelector('.picture__img').src = url;
  miniature.querySelector('.picture__img').alt = description;
  miniature.querySelector('.picture__likes').textContent = likes;
  miniature.querySelector('.picture__comments').textContent = comments.length;
  return miniature;
};

const renderMiniatures = (data) => {
  pictures = data.slice();
  if (pictures){
    const fragment = document.createDocumentFragment();
    pictures.forEach((picture) => {
      const miniature = createMiniature(picture);
      fragment.appendChild(miniature);
    });

    container.appendChild(fragment);
    container.addEventListener('click', onPicturesContainerClick);
  }
};

export {renderMiniatures};
