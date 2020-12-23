const config = require('../config/auth.config')
const db = require('../models/index')
// access to our db through User and Role
const User = db.user 
const Role = db.role 
const Calendar = db.calendar 
const Event = db.event 

// this will give us access to encode and decode the jwt itself - allows us to work with jwt
const jwt = require('jsonwebtoken')
// for hashing/encrypting our passwords
const bcrypt = require('bcryptjs')

// HANDLES LISTING SEARCH RESULTS
exports.listResults = (req, res) => {
    // make an API call for the input accessed from req.body
    // list it out on the page with a button that will let the user add it to their events- AKA a form with a post action

}

// SAVES AN EVENT TO THE USER'S CALENDAR
exports.saveEvent = (req, res) => {
    // Event.insertOne({
    //     name: "Event1",
    //     date: "2021-01-01",
    //     location: "Las Vegas, NV",
    //     comments: [],
    //     username: 'user1'
    // })
    const event = new Event({
        name: "Event1",
        date: "2021-01-01",
        location: "Las Vegas, NV",
        comments: [],
        username: 'user1'
    })
    Event.save(event)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        res.status(500).send({
            message: err.message || "some error occured while creating the event."
        })
    })

    // populates values from the id we stored in the document
    // without this, it will just give back a list of id's, but populate gets the values back
    .populate("roles", "-__v")
    // exec returning our user to user
    .exec((err, user)=>{
        res.status(200).send({
            id: user._id, 
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,        
            calendar: user.calendar
        })
    })
}

// HANDLES GETTING USER'S CALENDAR
exports.viewCalendar = (req, res) => {
    // FIND CALENDAR BY ID BEING PASSED IN FROM USER ID
    const id = req.params.id

    Calendar.findById(id)
    .then((data)=>{
        if(!data)
        return res.status(400).send({message: `Not found- Calendar with id ${id}`})
        else res.send(data)
    })
}

// UDPATE A CALENDAR BY USER ID
exports.updateCalendar = (req, res) => {
    // FIND CALENDAR BY ID BEING PASSED IN FROM USER ID
    const id = req.params.id

    Calendar.updateOne(
        { _id: id }, 
        {
            $set: {
                events: []
                //event 1, event2, event3...
            }
        }
    )
    .then(
        res.send('UPDATED')
    )
    .catch((err)=>{
        res.status(500).send({
            message: err.message || "some error occurred while updating tuorials"
        })
    })
}