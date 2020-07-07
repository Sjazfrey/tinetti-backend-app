const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    PatientName: String,
    DOB: String,
    Therapist: String,
    score: Number,
    "score-1": Number,
    "score-2": Number,
    "score-3": Number,
    "score-4": Number,
    "score-5": Number,
    "score-6": Number,
    "score-7": Number,
    "score-8": Number,
    "score-9": Number,
    "score-10": Number,
    "score-11": Number,
    "score-12": Number,
    "score-13": Number,
    "score-14": Number,
    "score-15": Number,
    "score-16": Number,
    "score-17": Number,
    "score-18": Number,
    "score-19": Number


})

const Assessment = mongoose.model('assessment', assessmentSchema);

module.exports = Assessment;