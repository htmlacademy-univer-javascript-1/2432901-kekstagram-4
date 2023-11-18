function countTimeInMinutes(time) {
  const [hour, minute] = time.split(':');
  return Number(hour) * 60 + Number(minute);
}

function checkTime(dayStart, dayEnd, meetingStart, meetingDuration) {
  const dayStartInMinutes = countTimeInMinutes(dayStart);
  const dayEndInMinutes = countTimeInMinutes(dayEnd);
  const meetingStartInMinutes = countTimeInMinutes(meetingStart);

  return (dayStartInMinutes <= meetingStartInMinutes && meetingStartInMinutes + meetingDuration <= dayEndInMinutes);
}

checkTime();

