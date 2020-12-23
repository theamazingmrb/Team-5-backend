const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.user = require('./user.model')
db.role = require('./role.model')
db.calendar = require('./calendar.model')
db.event = require('./event.model')

db.mongoose = mongoose;

db.Roles = ['users', 'admin']

module.exports = db