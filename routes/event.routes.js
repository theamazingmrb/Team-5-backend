const controller = require('../controllers/event.controller')
const { authJwt } = require('../middlewares')


module.exports = function(app){
    app.get("/profile/myevents", controller.seeEvents)
    app.post("/profile/events/addevent",[authJwt.verifyWebToken], controller.saveEvent)
    app.delete("/profile/events/:id", controller.deleteEvent)

    //routes for comments work
    app.get("/events/comment", controller.seeComments)
    app.post("/events/newcomment", controller.saveComment)
    app.delete("/events/comment/:id", controller.deleteComment)
    //app.put("/events/updatedcomment/:id", controller.updateComment)
    
}