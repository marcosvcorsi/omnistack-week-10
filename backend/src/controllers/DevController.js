const axios = require('axios');
const Dev = require('../models/Dev');

const parseStringAsArray = require('../utils/parseStringAsArray');
const getLocationPoint = require('../utils/getLocationPoint');

const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = response.data;

      const techList = parseStringAsArray(techs, ', ');

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techList,
        location: getLocationPoint(latitude, longitude)
      });

      const sendSocketMessageTo = findConnections(
        {
          latitude,
          longitude
        },
        techList
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return res.json(dev);
  },

  async update(req, res) {
    const { id } = req.params;

    const { techs, latitude, longitude } = req.body;

    const techList = parseStringAsArray(techs, ', ');

    await Dev.updateOne(
      {
        _id: id
      },
      {
        $set: {
          techs: techList,
          location: getLocationPoint(latitude, longitude)
        }
      }
    );

    return res.json({ message: 'User updated' });
  },

  async destroy(req, res) {
    const { id } = req.params;

    await Dev.deleteOne({
      _id: id
    });

    return res.json({ message: 'User deleted' });
  }
};
