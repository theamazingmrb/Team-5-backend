const controller = require('../controllers/event.controller')

module.exports = function(app){
    app.get("/events", controller.seeEvents)
    app.post("/events/addevent", controller.saveEvent)
    
}