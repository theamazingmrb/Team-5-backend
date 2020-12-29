const controller = require('../controllers/event.controller')
const { authJwt } = require('../middlewares')

module.exports = function(app){
    app.get("/profile/myevents", controller.seeEvents)
    app.post("/profile/events/addevent",[authJwt.verifyWebToken], controller.saveEvent)
    app.delete("/profile/events/:id", controller.deleteEvent)
}