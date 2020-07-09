const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
    PatientName: String,
    TestDate: String,
    Therapist: String,
    score: Number,
    "score1": Number,
    "score2": Number,
    "score3": Number,
    "score4": Number,
    "score5": Number,
    "score6": Number,
    "score7": Number,
    "score8": Number,
    "score9": Number,
    "score10": Number,
    "score11": Number,
    "score12": Number,
    "score13": Number,
    "score14": Number,
    "score15": Number,
    "score16": Number,
    "score17": Number,
    "score18": Number,
    "score19": Number


})

const Assessment = mongoose.model('assessment', assessmentSchema);

module.exports = Assessment;