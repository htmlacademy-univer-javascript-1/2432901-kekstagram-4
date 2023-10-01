function isStringLessOrEqual (string, length) {
  return string.length <= length;
}

function isStringPalindrom (startString) {
  const string = startString.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
    }
  return reversedString === string;
}

function extractNumbers (startString) {
  const string = startString.toString();
  let number = '';
  for (let i = 0; i < string.length; i++) {
    if (Number.isNaN(parseInt(string[i], 10))){
      number += string[i];
    }
  }
  return parseInt(number, 10);
}
