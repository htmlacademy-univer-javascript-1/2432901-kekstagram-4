import { generateID, getRandomArrayElement, getRandomInteger } from './util.js';

const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 30;
const COMMENT_MIN_COUNT = 1;
const COMMENT_MAX_COUNT = 2;
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'Мне кажется, что я выгляжу просто шикарно. Надеюсь, что это кажется не только мне',
  'Все мои волки делают АуФ',
  'Ещё один день. Ещё одно фото.',
  'Самое любимое время года у меня - лето, оно таинственно прекрасно #лето #красота #отдых #развлечения',
  'Сериальчики, вкусняшки, плед и чай - что ещё может быть лучше осенью #',
  'Настроение - пятница',
  'Нет, я не в Дубае #я #не #отдыхаю',
  'Не стыдись того, кто ты есть. Меняйся для себя в лучшую сторону #мотивация #любовькжизни #доброеутро',
  'Ну фотка',
  'Как мало нужно для счастья... Жду комменты'
];

const NAMES = [
  'Евдоким',
  'Авдотья',
  'Кирилл',
  'Августин',
  'Елизавета',
  'Стейси',
  'Вася',
  'Гена',
  'Лена',
  'Лев'
];

const generateCommentID = generateID();

const createMessage = () => Array.from(
  { length: getRandomInteger(COMMENT_MIN_COUNT, COMMENT_MAX_COUNT) },
  () => getRandomArrayElement(COMMENTS),
).join(' ');

const createComment = () => ({
  id: generateCommentID(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMessage(),
  name: getRandomArrayElement(NAMES),
});

const createPicture = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(LIKE_MIN_COUNT, LIKE_MAX_COUNT),
  comments: Array.from(
    { length: getRandomInteger(0, COMMENT_COUNT) },
    createComment,
  ),
});

const getPictures = () => Array.from (
  { length : PICTURE_COUNT },
  (_, pictureIndex) => createPicture(pictureIndex + 1),
);

export {getPictures};
