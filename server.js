const { json } = require('express');
const express = require('express');
const bcryptNodejs = require('bcrypt-nodejs');
const cors = require('cors');
const { decodeBase64 } = require('bcryptjs');
const Clarifai = require('clarifai');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
/*
const knex = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'kokinarimoto',
        password : '',
        database : 'face_detect_db'
    }
});
*/
const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString : process.env.DATABASE_URL,
        ssl: true
    }
});

// console.log(knex.select('*').from('users'));
// knex.select('*').from('users').then(data => {
//     console.log(data);
// });
  

const app = express();

app.use(express.json());
app.use(cors());

// app.get('/', (req, res) => {
//     res.json(database.users)
// })
// when starting your npm server with node, do PORT = 3000 node server.js
// app.listen(process.env.PORT, ()=>{
//    console.log(`app is running on port ${process.env.PORT}`);
//})
// can do the same for any variable PORT can be renamed as anything
// 

app.get('/', (req, res)=> { res.send(knex.users) })

app.post('/signin', (req,res) => {signin.handleSignIn(req, res, knex, bcryptNodejs)})

app.post('/register', (req,res) => {register.handleRegister(req, res, knex, bcryptNodejs)})

app.get('/profile/:id', (req,res) => {profile.getId(req, res, knex)})

app.put('/image', (req,res) => {image.getImage(req, res, knex)})

app.post('/imageurl', (req,res) => {image.handleClarifaiCall(req, res)})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on port 3000${process.env.PORT}`);
})