const controller = require('../controllers/profile.controller')

module.exports = function(app){

    app.get("/profile", controller.profile)
    app.post("/profile", controller.profile)
    app.delete("/profile", controller.profile)

}