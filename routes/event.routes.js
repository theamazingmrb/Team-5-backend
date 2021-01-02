const controller = require('../controllers/event.controller')
const { authJwt } = require('../middlewares')


module.exports = function(app){
    // routes for events
    app.get("/profile/myevents",[authJwt.verifyWebToken], controller.seeEvents) //NAOMI
    app.post("/profile/myevents/addevent",[authJwt.verifyWebToken], controller.saveEvent) // CAMILLE
    app.delete("/profile/myevents/:id", controller.deleteEvent) // PREET

    // routes for comments work
    //app.get("/events/comment", controller.seeComments) // KRYSTLE
    app.post("/events/newcomment", controller.saveComment) //KRYSTLE
    app.delete("/events/comment/:id", controller.deleteComment) // PREET
    app.put("/events/updatedcomment/:id", controller.updateComment) //NAOMI
    
}