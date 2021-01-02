const db = require('../models/index')
const { calendar, user } = require('../models/index')
// access to our db through User and Role
const Event = db.event
const Comment = db.comment
const User = db.user

// this will save event to the database
exports.saveEvent = (req, res) => {
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
            //console.log not working due to updateOne
            //updateOne automatically has its own console which shows if an update actually occurs
            console.log(user)
        })
        //send back the event's id and a message that shows it was successfully created
        res.send({
            id: event._id, 
            // eventId: event.eventId,
            // name: event.name,
            // date: event.date,
            // location: event.location,
            message: "Successfully created event"
        })
    })
}

// this will show all events in the database
exports.seeEvents = (req, res) => {
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
    //find the user who's events you want to see
    User.findOne({
        _id: req.userId
    })
    .populate('comments')
        // the .exec return the user found
        .exec((err, user) => {
            //send the whole user.events array so you can see the event data
            res.send(user.comments)
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




