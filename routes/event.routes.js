const controller = require('../controllers/event.controller')
const { authJwt } = require('../middlewares')


module.exports = function(app){
    app.use( (req, res, next) => {
        //set the header and allow use of x access token
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        )
        next()
    })

    // routes for events
    app.get("/profile/myevents", [authJwt.verifyWebToken], controller.seeEvents) //NAOMI
    app.delete("/profile/myevents/:id", controller.deleteEvent) // PREET
    app.post("/profile/myevents/addevent",[authJwt.verifyWebToken], controller.saveEvent) // CAMILLE
    app.delete("/profile/calendar", [authJwt.verifyWebToken], controller.deleteEvent) // PREET

    // routes for comments work
    app.get("/events/comments/:id", [authJwt.verifyWebToken],controller.seeComments) // KRYSTLE
    app.post("/events/newcomment/:id",[authJwt.verifyWebToken], controller.saveComment) //KRYSTLE
    app.delete("/events/comment/:id", controller.deleteComment) // PREET
    // app.put("/events/updatedcomment/:id", controller.updateComment) //NAOMI
    app.put("/event/comments/:id", controller.updateComment) //NAOMI
}

