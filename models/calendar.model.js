const mongoose = require('mongoose')

const Calendar = mongoose.model(
    "Calendar",
    new mongoose.Schema({
        events: []
    })
)

module.exports = Calendar