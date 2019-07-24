const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: '78bb0d5ffbbf4c31ba9abb16c243499e'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('enteries', 1)
  .returning('enteries')
  .then(enteries => {
    res.json(enteries[0]);
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}