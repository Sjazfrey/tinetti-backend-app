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
//image and sign in
app.get('/', function(req, res) {
    res.render('index.ejs')
})
//show all info on assessment all page
app.get('/assessment/all', function (req, res){
    Assessment.find(function(err, assessments){
        // res.send(assessments);
        res.render('showall.ejs', {
            balance:assessments
        })
        
    })    
})
// edit route
app.put('/balance/:index', function (req, res) {
    balance[req.params.index] = req.body
    res.redirect('/balance');
})

// //delete 
// app.delete('/assessment/:id', function(req, res) {
//     Assessment.findByIdAndDelete(req.params.id,  function (err, deleteLog) {
//         res.redirect('/');
//     });   
// });


// new 
app.get('/assessment/new', function (req, res) {
    res.render('new.ejs')
})
//build schema and then create in mongo
app.post('/assessment/new', function (req, res) {
    Assessment.create(req.body, function(err, createAssessment) {
        res.redirect('/assessment/' + createAssessment.id)
        if (err == null) {
            console.log('Success');
        }
     })
})
//show page
app.get('/assessment/:id', function (req, res){
    Assessment.findById(req.params.id, function (err, foundAssessment){
        res.render('show.ejs', {
            balance:foundAssessment
        })
    })
})




app.listen(port, function () {
    console.log('hello', port)
})