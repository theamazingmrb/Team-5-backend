const {authJwt} = require('../middlewares')
const controller = require('../controllers/event.controller')
const db=require('../models/index')

module.exports = function(app){

    app.get("/events", controller.event) 
}