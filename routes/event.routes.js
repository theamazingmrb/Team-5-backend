const controller = require('../controllers/event.controller')
const { authJwt } = require('../middlewares')


module.exports = function(app){
    app.get("/profile/myevents",[authJwt.verifyWebToken], controller.seeEvents)
    app.post("/profile/myevents/addevent",[authJwt.verifyWebToken], controller.saveEvent)
    app.delete("/profile/myevents/:id", controller.deleteEvent)

    //routes for comments work
    // adding event IDs to request params so that comments are associated to a specific event

    // TEST EVENT: 5ff032a5af0ccd691a554141


    app.get("/events/comment/:id",
    // [authJwt.verifyWebToken],
    controller.seeComment)
    app.post("/events/newcomment/:id",
    // [authJwt.verifyWebToken],
     controller.saveComment)
    app.delete("/events/comment/:id",
    // [authJwt.verifyWebToken],
     controller.deleteComment)
    app.put("/events/editcomment/:id", 
    // [authJwt.verifyWebToken],
    controller.updateComment)
    
}