const mongoose = require('mongoose');
const {Schema} = mongoose;

const submissionSchema = new Schema({

    language: String,
    user: String,
    code: String,
    stdin: String,
    verdict: String,
    stdout: String,
    date: {type: Date, default: Date.now},
});

const SubmissionDetails = mongoose.model('SubmissionDetails', submissionSchema);

module.exports = {SubmissionDetails};