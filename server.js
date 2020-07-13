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

//const usersController = require('./controllers/sessions.js');
//app.use('/users', usersController);

//image and sign in
app.get('/', function (req, res) {
    res.render('index.ejs')
})
//show all info on assessment all page
//https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
app.get('/assessment/all', function (req, res) {
    Assessment.find(function (err, assessments) {
        assessments.sort(function (param1, param2) {
            if (param1.PatientName > param2.PatientName) { // dog > cat // 15 > 24
                return 1;
            } else if (param1.PatientName < param2.PatientName) {
                return -1;
            } else {
                return 0;
            }
        })
        console.log(assessments);
        // res.send(assessments);
        res.render('showall.ejs', {
            balance: assessments
        })

    })
})


//delete 
app.delete('/assessment/:id', function (req, res) {
    Assessment.findByIdAndDelete(req.params.id, function (err, deleteLog) {
        res.redirect('/assessment/all')
    });
});

//update
app.put('/assessment/:index', function (req, res) {
    Assessment.findByIdAndUpdate(req.params.index, req.body, function (err, assessment) {
        res.redirect('/assessment/' + assessment.id)
    })
    //assessment[req.params.index] = req.body 
    //res.redirect('/fruits'); 
})

//edit
app.get('/assessment/:index/edit', function (req, res) {
    Assessment.findById(req.params.index, function (err, assessment) {
        res.render("edit.ejs", {
            balance: assessment
        });
    });
});



// new 
app.get('/assessment/new/:id?', function (req, res) {

    if (req.params.id != null) {
        Assessment.findById(req.params.id, function (err, assessment) {

            res.render('new.ejs', {
                balance: assessment
            });
        })
    } else {
        res.render('new.ejs', {
            balance: {}
        })
    }
})

//build schema and then create in mongo
app.post('/assessment/new', function (req, res) {
    Assessment.create(req.body, function (err, createAssessment) {
        res.redirect('/assessment/' + createAssessment.id)
        if (err == null) {
            console.log('Success');
        }
    })
})
//show page
app.get('/assessment/:id', function (req, res) {
    Assessment.findById(req.params.id, function (err, foundAssessment) {
        res.render('show.ejs', {
            balance: foundAssessment
        })
    })
})




app.listen(port, function () {
    console.log('hello', port)
})