const mongoose = require('mongoose')

const Event = mongoose.model(
    "Event",
    new mongoose.Schema({
        name: String,
        date: Date,
        location: String, 
        image: String,
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
    })
)

module.exports = Event