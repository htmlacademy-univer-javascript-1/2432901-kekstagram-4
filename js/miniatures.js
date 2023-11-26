const miniatureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createMiniature = ({ comments, description, likes, url }) => {
  const miniature = miniatureTemplate.cloneNode(true);
  miniature.querySelector('.picture__comments').textContent = comments.length;
  miniature.querySelector('.picture__img').alt = description;
  miniature.querySelector('.picture__likes').textContent = likes;
  miniature.querySelector('.picture__img').src = url;
  return miniature;
};

const renderMiniatures = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    fragment.append(createMiniature(picture));
  });
  container.append(fragment);
};

export { renderMiniatures };
