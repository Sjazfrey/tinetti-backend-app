const session = require('express-session');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const router = express.Router();
const User = require('../models/users.js');

app.use(session({
    secret: "tinettiappbyme",
    resave: false,
    saveUninitialized: false
}));

// localhost:3000/users/new
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

//...farther down the page
router.post('/', (req, res) => {
    User.create(req.body, (err, createdUser)=>{
        res.redirect('/');    
    });
});

//const hashedString = bcrypt.hashSync('yourStringHere', bcrypt.genSaltSync(10));
//bcrypt.compareSync('yourGuessHere', hashedString);

app.get('/', function (req, res){
    // req.session.
})

module.exports = router;