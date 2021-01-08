const controller = require('../controllers/event.controller')
const { authJwt } = require('../middlewares')


module.exports = function(app){
    // routes for events
    app.get("/profile/myevents",[authJwt.verifyWebToken], controller.seeEvents) //NAOMI
    app.delete("/profile/myevents/:id", controller.deleteEvent) // PREET
    app.post("/profile/myevents/addevent",[authJwt.verifyWebToken], controller.saveEvent) // CAMILLE
    app.delete("/profile/calendar", controller.deleteEvent) // PREET

    // routes for comments work
    app.get("/events/comments/:id", [authJwt.verifyWebToken],controller.seeComments) // KRYSTLE
    app.post("/events/newcomment/:id",[authJwt.verifyWebToken], controller.saveComment) //KRYSTLE
    app.delete("/events/comment/:id", controller.deleteComment) // PREET
    app.put("/events/updatedcomment/:id", controller.updateComment) //NAOMI
    // ADDING ROUTE TO GET ONE COMMENT
    app.get("/getComment/:id",[authJwt.verifyWebToken],controller.getComment)
}

