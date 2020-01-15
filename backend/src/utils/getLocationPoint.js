module.exports = function getLocationPoint(latitude, longitude) {
  return {
    type: 'Point',
    coordinates: [longitude, latitude]
  };
};
