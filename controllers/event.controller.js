const db = require('../models/index')
const { calendar, user } = require('../models/index')
const { events } = require('../models/user.model')
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
    console.log(req.userId)
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
// exports.deleteEvent = (req, res) => {
//     console.log(req.userId)
//     User.findOne({
//         _id: req.userId
       
//     }).then(function (foundUser) {
//         console.log(foundUser)
//         foundUser.calendar.remove({
//             _id: req.body.id
//         })
//         console.log("Data deleted"); // Success 
//         res.send({ message: "Data Deleted" })
//     }).catch(function (error) {
//         console.log(error); // Failure 
//     });
// }
exports.deleteEvent = (req, res)=>{
    Event.deleteOne({
        _id: req.params.id
    }).then(function () {
        console.log("Event is deleted");
        res.send({ message: " Your event has been Deleted" })
    }).catch(function (error) {

    });
// this is another way to delete an event

    // const id = req.userId
    // Event.remove(
    //     {_id: id}
    // ).then(data => {
    //     if(!data) {
    //         res.status(404).send({
    //             message: `can’t delete id=${id}`
    //         });
    //     } else res.send({message: “event deleted”})
    //     })
    //     .catch(err => {
    //         res.send(500).send({
    //             message: “error deleting event with id=” + id
    //         })
    // });
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
    // Comment.deleteOne({
    //     _id: req.params.id
    // }).then(function () {
    //     console.log("Comment is deleted");
    //     res.send({ message: " Your comment has been Deleted" })
    // }).catch(function (error) {

    // });

}


// //routes to update comment 
exports.updateComment = (req,res) => {
    const id = req.params.id
    // you have to add the items in
    Comment.findByIdAndUpdate(id, {name:req.body.name, content: req.body.content}).then((data)=>{
        if(!data){
            res.status(400).send({message: "Not found comment with id" + id});
        }else{
            res.send(data)
        }
    })
}




