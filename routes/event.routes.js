const controller = require('../controllers/event.controller')
const { authJwt } = require('../middlewares')


module.exports = function(app){
    app.get("/profile/myevents",[authJwt.verifyWebToken], controller.seeEvents)
    app.post("/profile/myevents/addevent",[authJwt.verifyWebToken], controller.saveEvent)
    app.delete("/profile/myevents/:id", controller.deleteEvent)

    //routes for comments work
    app.get("/events/comment", controller.seeComments)
    app.post("/events/newcomment", controller.saveComment)
    app.delete("/events/comment/:id", controller.deleteComment)
    //app.put("/events/updatedcomment/:id", controller.updateComment)
    
}