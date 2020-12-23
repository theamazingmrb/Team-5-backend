const { verifySignUp } = require('../middlewares')
const controller = require('../controllers/auth.controller')

module.exports = function(app){
    // set header and allow use of x access token (we will use this to pass our token)
    app.use( (req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        )
        next()
    })
    
    // set up signup route and pass middlewares to check username, email, and roles
    app.post("/api/auth/signup",
    [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup)

    app.post("/api/auth/signin", controller.signin)
}    
