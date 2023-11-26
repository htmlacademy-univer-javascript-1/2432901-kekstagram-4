function countTimeInMinutes(time) {
  const [hour, minute] = time.split(':');
  return Number(hour) * 60 + Number(minute);
}

isStringLessOrEqual();
function isStringPalindrom (startString) {
  const string = startString.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i]; }
  return reversedString === string;
}
isStringPalindrom();

function checkTime(dayStart, dayEnd, meetingStart, meetingDuration) {
  const dayStartInMinutes = countTimeInMinutes(dayStart);
  const dayEndInMinutes = countTimeInMinutes(dayEnd);
  const meetingStartInMinutes = countTimeInMinutes(meetingStart);

  return (dayStartInMinutes <= meetingStartInMinutes && meetingStartInMinutes + meetingDuration <= dayEndInMinutes);
}

checkTime();


