const mongoose = require('mongoose')

const Event = mongoose.model(
    "Event",
    new mongoose.Schema({
        name: String,
        date: String,
        location: String, 
        comments: [],
    })
)

module.exports = Event