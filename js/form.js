import { initScale, initEffects, resetEffects} from './scale.js';
const VALID_SYMBOLS = /^#[a-zа-ё0-9]{1,19}$/i;
const VALID_FILE_TYPES = ['jpg', 'jpeg', 'png'];
const MAX_HASHTAG_COUNT = 5;

const ErrorText = {
  INVALID_HASHTAGS_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE_HASHTAG: 'Неуникальный хэштег',
  INVALID_PATTERN_HASHTAG: 'Неправильный хэштег',
  INVALID_DESCRIPTION: 'Слишком длинный комментарий',
};

const bodyElement = document.querySelector('body');
const overlayElement = bodyElement.querySelector('.img-upload__overlay');
const cancelButtonElement = overlayElement.querySelector('.img-upload__cancel');
const inputUploadElement = bodyElement.querySelector('.img-upload__input');
const formElement = bodyElement.querySelector('.img-upload__form');
const hashtagFieldElement = formElement.querySelector('.text__hashtags');
const descriptionFieldElement = formElement.querySelector('.text__description');


const isValidFileType = () => {
  const file = inputUploadElement.files[0];
  const isValid = VALID_FILE_TYPES.some((type) => file.name.endsWith(type));
  if (isValid) {
    return true;
  }
};

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const isTextFieldFocused = () =>
  document.activeElement === hashtagFieldElement ||
  document.activeElement === descriptionFieldElement;

const normilizeHashtags = (hashtagString) => hashtagString.trim().split(' ').filter((hashtag) => hashtag.length > 0);

const validateDescription = (value) => value.length <= 140;

const validateHashtagCount = (value) => normilizeHashtags(value).length <= MAX_HASHTAG_COUNT;

const validateHashtagSymbols = (value) => normilizeHashtags(value).every((hashtag) => VALID_SYMBOLS.test(hashtag));

const validateUniqueHashtag = (value) => {
  const lowerCaseHashtags = normilizeHashtags(value).map((hashtag) => hashtag.toLowerCase());
  return lowerCaseHashtags.length === new Set(lowerCaseHashtags).size;
};

const initHashtagValidation = () => {
  pristine.addValidator(hashtagFieldElement, validateUniqueHashtag, ErrorText.NOT_UNIQUE_HASHTAG);
  pristine.addValidator(hashtagFieldElement, validateHashtagCount, ErrorText.INVALID_HASHTAGS_COUNT);
  pristine.addValidator(hashtagFieldElement, validateHashtagSymbols, ErrorText.INVALID_PATTERN_HASHTAG);
};

const initDescriptionValidation = () => {
  pristine.addValidator(descriptionFieldElement, validateDescription, ErrorText.INVALID_DESCRIPTION);
};

const initValidation = () => {
  initHashtagValidation();
  initDescriptionValidation();
};

const onFormElementSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

const openEditPopup = () => {
  bodyElement.classList.add('modal-open');
  overlayElement.classList.remove('hidden');

  document.addEventListener('keydown', onDocumentKeyDown);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  formElement.addEventListener('submit', onFormElementSubmit);
};

const closeEditPopup = () => {
  bodyElement.classList.remove('modal-open');
  overlayElement.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeyDown);
  cancelButtonElement.removeEventListener('click', onCancelButtonClick);
  formElement.removeEventListener('submit', onFormElementSubmit);

  formElement.reset();
  pristine.reset();
  resetEffects();
};

const onInputUploadElementChange = () => {
  if (isValidFileType()){
    openEditPopup();
    initValidation();
    initScale();
    initEffects();
  }
};

function onDocumentKeyDown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    closeEditPopup();
  }
}

function onCancelButtonClick() {
  closeEditPopup();
}

const initEditPopup = () => {
  inputUploadElement.addEventListener('change', onInputUploadElementChange);
};

export { initEditPopup };
