module.exports = function parseStringAsArray(arrayAsString, splitString) {
  return arrayAsString.split(splitString).map(item => item.trim());
};
