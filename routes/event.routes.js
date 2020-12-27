const controller = require('../controllers/event.controller')

module.exports = function(app){
    app.get("/events", controller.seeEvents)
    app.post("/events/addevent", controller.saveEvent)
    app.delete("/events/:id", controller.deleteEvent)
    app.get("/events/comment", controller.seeComments)
    app.post("/events/newcomment", controller.saveComment)
    app.delete("/events/comment/:id", controller.deleteComment)
}