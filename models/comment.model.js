const mongoose = require('mongoose')

const Comment = mongoose.model(
    "Comment",
    new mongoose.Schema({
        name: String,
        content: String,
    })
)

module.exports = Comment