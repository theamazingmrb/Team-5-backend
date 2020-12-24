const controller = require('../controllers/event.controller')

module.exports = function(app){

    app.get("/events", controller.searchEvent)
    
}