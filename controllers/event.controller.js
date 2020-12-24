const db = require('../models/index')
// access to our db through User and Role
const Event = db.event

// this will save event to the database
exports.saveEvent = (req, res) => {
    // we are going to make our user object using the params returned from req
    const event = new Event({
        name: req.body.name,
        date: req.body.date,
        location: req.body.location,
        image: req.body.image,
    })

    // we save that user and if there is an error, we throw that error
    event.save((err, event) => {
        console.log("EVENT SAVED??")
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        res.send({
            id: event._id, 
            name: event.name,
            date: event.date,
            location: event.location,
            image: event.image
        })
    })
}

// this will show all events in the database
exports.seeEvents = (req, res) => {
    Event.find()
    .then((foundEvents)=>{
        res.send(foundEvents)
    })
}