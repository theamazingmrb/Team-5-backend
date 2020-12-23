const mongoose = require('mongoose')

const Calendar = mongoose.model(
    "Calendar",
    new mongoose.Schema({
        events: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event"
        }]
    })
)

module.exports = Calendar