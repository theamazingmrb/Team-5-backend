const {authJwt} = require('../middlewares')
const controller = require('../controllers/calendar.controller')

module.exports = function(app){
    app.use( (req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-type, Accept"
        )
        next()
    })


    // CALENDAR ROUTES HERE: 

    // VIEW SEARCH RESULTS
    app.get("/events-search-results", controller.listResults)

    // ADD AN EVENT FROM SEARCH RESULTS INTO A USER'S CALENDAR'S EVENTS 
    app.post("/events-search-results",  [authJwt.verifyWebToken], controller.saveEvent)

    // VIEW A SPECIFIC EVENT IN A USER'S CALENDAR EVENT BY EVENT ID
    app.get('profile/event/:id',[authJwt.verifyWebToken], controller.viewEvent)

    // DELETE A SPECIFIC EVENT FROM A USER'S CALENDAR BY EVENT ID
    app.delete('profile/event/:id',[authJwt.verifyWebToken], controller.removeEvent)

    // VIEW A USER'S CALENDAR BY ID AND SEE ALL EVENTS LISTED
    app.put('profile/:id',[authJwt.verifyWebToken], controller.viewCalendar)

    // UPDATE A USER'S CALENDAR BY ID
    app.put('profile/:id',[authJwt.verifyWebToken], controller.updateCalendar)

}