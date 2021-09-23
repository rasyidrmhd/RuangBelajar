function dateFormatter(date) {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("id-ID", options);
}

function timeFormatter(date) {
  const optionsTime = { hour: "2-digit", minute: "2-digit" };
  return date.toLocaleTimeString([], optionsTime);
}

module.exports = { dateFormatter, timeFormatter };
