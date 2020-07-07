const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/assessment';

app.use(express.static("public"));

//include the method-override package
const methodOverride = require('method-override');
//...
//after app has been defined
//use methodOverride.  We'll be adding a query parameter to our delete form named _method
app.use(methodOverride('_method'));

//middleware//body-parser
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

const mongoose = require('mongoose');

//... and then farther down the file
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
});
mongoose.connection.once('open', () => {
    console.log('connected to mongo');
});
//schema
const Assessment = require('./models/balance.js');

app.get('/', function(req, res) {
    res.render('index.ejs')
})

app.get('/assessment/new', function (req, res) {
    res.render('new.ejs')
})
//build schema and then create in mongo
app.post('/assessment/new', function (req, res) {
    Assessment.create(req.body, function(err, createAssessment) {
        res.redirect('/')
        if (err == null) {
            console.log('Success');
        }
    })
})


app.listen(port, function () {
    console.log('hello', port)
})