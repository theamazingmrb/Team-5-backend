const mongoose = require('mongoose')

const Event = mongoose.model(
    "Event",
    new mongoose.Schema({
        eventId: String,
        name: String,
        date: Date,
        location: String,
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
    })
)

module.exports = Event