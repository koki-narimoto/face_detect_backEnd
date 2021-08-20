const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey : process.env.CLARIFAI_API
});

const handleClarifaiCall = (req, res) => {
    app.models
        //.predict('53e1df302c079b3db8a0a36033ed2d15', this.state.input)
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('clarifai not working'))
}

const getImage = (req, res, knex) => {
    const {id } = req.body;
    knex('users').where('id' , '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    }).catch(err => {
        res.status(400).json('error unable to get entries');
    })
}

module.exports = {
    getImage,
    handleClarifaiCall
};