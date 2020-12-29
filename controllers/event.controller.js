const db = require('../models/index')
// access to our db through User and Role
const Event = db.event
const Calendar = db.calendar
const Comment = db.comment
const User = db.user


// this will save event to the database
exports.saveEvent = (req, res) => {
    // we are going to make our event object using the params returned from req
    const event = new Event({
        eventId: req.body.id,
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

        // find the user making the request
        User.find({
            _id: req.userId
            // the .exec return the user found
        }).exec((err, user) => {
            // checking to see if the user has a calendar or not. If user has calendar, we add event and if user doesn't have calendar, we make on for them before adding event
            if (user.calendar) {
                // the user has a calendar that has an array of events. We push an event to this events array
                user.calendar.events.push(event)
            } else {
                const calender = new Calendar({
                    events: event
                })
                user.calendar.push(calender)
            }

        })
        res.send({
            // id: event._id, 
            // eventId: event.eventId,
            // name: event.name,
            // date: event.date,
            // location: event.location

            message: "Successfully created event"
        })
    })

    User.updateOne(
        { _id: req.userId },
        { $addToSet: { calendar: eventId } }
    )
        .then(data => {
            console.log("Found the user and added the event")
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'An error occurred while updating user calendar'
            })
        })
}

// this will show all events in the database
exports.seeEvents = (req, res) => {
    User.findOne(
        { _id: req.body.id }
    )
        .then((foundUser) => {
            res.send(foundUser.calendar)
        })
}

// this will delete an event in the database
exports.deleteEvent = (req, res) => {
    User.findOne({
        _id: req.userId
    }).then(function (foundUser) {
        foundUser.calendar.deleteOne({
            _id: req.body.id
        })
        console.log("Data deleted"); // Success 
        res.send({ message: "Data Deleted" })
    }).catch(function (error) {
        console.log(error); // Failure 
    });
}

//Comment routes work 


// This is will save comment to the database 
exports.saveComment = (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        content: req.body.content,

    })

    // this saves the comment

    comment.save((err, comment) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        res.send({
            name: comment.name,
            content: comment.content,

        })
    })
    //     Calendar.events.push(comment)
    // }
}

// this will show all comments in the database
exports.seeComments = (req, res) => {
    Comment.find()
        .then((foundComments) => {
            res.send(foundComments)
        })
}

// this will  delete comment in the database
exports.deleteComment = (req, res) => {
    Comment.deleteOne({
        _id: req.params.id
    }).then(function () {
        console.log("Comment is deleted");
        res.send({ message: " Your comment has been Deleted" })
    }).catch(function (error) {

    });
}

//route does not work 
// //routes to update calender 
// exports.update = (req,res) => {
//     const id = req.params.id;
//     Comment.findByIdAndUpdate({_id :id}, req.body).then((data)=>{
//         if(!data){
//             res.status(400).send({message: "Not found comment with id" + id});
//         }else{
//             res.send(data)
//         }
//     })
// }




