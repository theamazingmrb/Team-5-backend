const db = require('../models/index')
const { user } = require('../models/index')
// access to our db through User and Role
const Event = db.event
const Comment = db.comment
const User = db.user

// this will save event to the database
exports.saveEvent = (req, res) => {
    console.log(req.body)
    console.log("REACHING THE POST ROUTE")
    // we are going to make our event object using the params returned from req
    const event = new Event({
        eventId: req.body.eventId,
        name: req.body.name,
        date: req.body.date,
        location: req.body.location
    })

    // we save that event and if there is an error, we throw that error
    event.save((err, event) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        // update the user making the request by grabbing their id
        User.updateOne(
            { _id: req.userId },
            // addToSet allows new additions to an array 
            // this adds the saved event to the events array
            { $addToSet: { events: event } }
        )
            //in order to execute the update, you have to call .exec
            .exec((err, user) => {
                //updateOne automatically has its own console which shows if an update actually occurs
                console.log(user)
                if (err) {
                    res.status(500).send({ message: err })
                    return
                }
            })
    })
    //send back the event's id and a message that shows it was successfully created
    res.send({
        id: event._id,
        message: "Successfully created event"
    })
}

// this will show all events in the database
exports.seeEvents = (req, res) => {
    if (err) {
        console.log(err)
        res.status(500).send({ message: err })
        return
    }
    //find the user who's events you want to see
    User.findOne({
        _id: req.userId
    })
        //make sure to pull in the actual event data not just the ObjectIds
        //.populate will pull in the actual data
        .populate('events')
        // the .exec return the user found
        .exec((err, user) => {
            //send the whole user.events array so you can see the event data
            res.send(user.events)
            if (err) {
                res.status(500).send({ message: err })
                return
            }
        })
}

exports.deleteEvent = (req, res) => {
    console.log("MADE IT TO THE ROUTE")
    let eventId = req.params.id
    console.log(eventId)
    Event.deleteOne({
        _id: req.params.id
    }).exec((err, event) => {
        // console.log(event)
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        User.updateOne(
            { _id: req.userId },
            // pull removes items from an array 
            // this removes the saved event from the events array
            { $pull: { events: { $in: [ event ] } } }
        ).exec((err, user) => {
            // res.send({ message: " Your user has been updated" })
            if (err) {
                console.log(err)
                return
            }
            console.log(user)
        })
        // res.send({ message: " Your event has been deleted" })
    })
    res.send({ message: " Your event has been deleted from the user" })
}

// This is will save comment to the database 
exports.saveComment = (req, res) => {
    // create a new comment isntance
    const comment = new Comment({
        name: req.body.name,
        content: req.body.content
    })
    // this saves the comment
    comment.save((err, comment) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        // update the event to include the new comment
        Event.updateOne(
            { _id: req.params.id },
            // appending new comment to this event's comments array
            { $addToSet: { comments: comment } },
            { upsert: true }
        )
            .then(updateEvent => {
                if (updateEvent.nModified !== 0) {
                    console.log('Event comments updated')
                } else {
                    console.log('No updates made to event')
                };
                Event.findOne(
                    { _id: req.params.id }
                )
                    .populate('comments')
                    .then(updatedEvent => {
                        res.send(updatedEvent)
                    })
            })
            .then(
            )
            .catch(err => {
                console.error("Event DB Error", err)
                process.exit()
            })
    })
}

// shows comments made by the user for the event specified in the request
exports.seeComments = (req, res) => {
    //find user's event IDs so we can check them against the param id's being entered so that the current user can only access their own events' comments 
    User.findOne({
        _id: req.userId
    })
        //get the event ids from their events array
        .populate('events', '_id')
        .then(userData => {
            //res.send(userData)
            let eventIds = []
            //push the eventIDs associated with this user into the empty array so we can check it with the req prarms id
            if (userData.events) {
                userData.events.forEach(event => {
                    eventIds.push(event._id.toString())
                })
                // if the event ID in the req params is a match, pull the comment data for it 
                if (eventIds.includes(req.params.id.toString())) {
                    Event.findOne({
                        _id: req.params.id
                    })
                        .populate('comments')
                        .then(foundEvents => {
                            console.log("THESE ARE ALL THE FOUND EVENTS",foundEvents)
                            //res.send(foundEvents.comments)
                            res.send(foundEvents)
                        })
                        .catch(err => {
                            console.error("Event DB Error", err)
                            process.exit()
                        })
                } else {
                    res.send('Event does not exist for this user!')
                }
            } else {
                res.send('No events added yet!')
            }
        })
        .catch(err => {
            console.error("User DB Error", err)
            process.exit()
        })
}

// this will  delete comment in the database
exports.deleteComment = (req, res) => {

    Comment.deleteOne({
        _id: req.params.id
    }).then(function () {
        console.log("Comment is deleted");
        res.send({ message: " Your comment has been Deleted" })
    }).catch(err => {
        console.error("User DB Error", err)
        process.exit()
    })

}


// //routes to update comment 
exports.updateComment = (req, res) => {
    const id = req.params.id
    // you have to add the items in
    Comment.findByIdAndUpdate(id, { name: req.body.name, content: req.body.content }).then((data) => {
        if (!data) {
            res.status(400).send({ message: "Not found comment with id" + id });
        } else {
            res.send(data)
        }
    })
}

// ======= NEW ROUTE FOR GETTING INFO FOR A SINGLE COMMENT ======
exports.getComment = (req,res) => {
    const id = req.params.id
    Comment.find({_id: id}).then((data)=>{
        if(!data){
            res.status(400).send({message: "Cannot find comment ID:" + id});
        }else{
            res.send(data)
        }
    })
}
