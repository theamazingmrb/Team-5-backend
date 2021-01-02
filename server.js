const express = require('express')
const bodyParser = require('body-parser')
const dbConfig = require('./config/db.config')
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });


// parse requests of content-type - application/json
app.use(bodyParser.json())

//parse request of conent type = application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//Setup Mongoose
const db = require('./models/index')
const Role = db.role

//connect the mongo database
db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=>{
        console.log('Successfully connected to MongoDB')
        initial()
    })
    .catch(err => {
        console.error("Connection Error", err)
        process.exit()
    })

//simple route, do I work?
app.get('/', (req, res)=>{
    res.json({message: "Welcome to the home page"})
})

//import the routes we wrote
//this require is going to return a function and then execute that function 
require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)
require('./routes/event.routes')(app)

//set the port, listen for request
const PORT =  process.env.PORT || 8080
app.listen(PORT, ()=>{
    console.log(` running on ${PORT}`)
})

const initial = () =>{
    Role.estimatedDocumentCount((err, count)=>{
        //if no roles are present, create our new roles( admin and user)
        if(!err && count === 0){
            new Role({
                name: 'user'
            }).save(err =>{
                if(err){
                    console.log("error ==>", err)
                }
                console.log("added 'user' to roles collection")
            })
            
            new Role({
                name: 'admin'
            }).save(err =>{
                if(err){
                    console.log("error ==>", err)
                }
                console.log("added 'admin' to roles collection")
            })
        
        }
    })
}



const User = db.user
// const newUser = new User({
//     username: 'user1',
//     email: 'test1@yahoo.com',
//     password: 'password',
//     roles: [ '5ff02f076743f908c01b7b15' ],
//     events: []
// })
// newUser.save(newUser)
//User.find().then(it=>{console.log(it)})

const Event = db.event
// const newEvent= new Event ({
//     eventId: '5000',
//     name: 'TestEvent1',
//     date: new Date(),
//     location: 'SF',
//     comments: []
// })
// newEvent.save(newEvent)

//Event.find({_id:'5ff032a5af0ccd691a554141'}).then(stuff=>{console.log(stuff)})

// User.updateOne({
//     _id: '5ff0336e0128527e4014b877'
// },{
//     $addToSet: {
//         events: '5ff032a5af0ccd691a554141'
//     }
// },{
//     upsert:true
// }).then(changed=>{
//     console.log(changed)
// })

// User.find({
//     _id: '5ff0336e0128527e4014b877'
// }).populate('events').then(changed=>{
//     console.log(changed[0])
// })

const Comment = db.comment
//Comment.find().then(f=>{console.log(f)})

// const newComment = new Comment({
//     name: 'comment2',
//     content: 'Second Test',
// })
// newComment.save(newComment)
// .then(newCom=>{
//     Event.updateOne({
//         _id: '5ff032a5af0ccd691a554141'
//     },
//     {   $addToSet: { comments: newCom }
//     },{
//         upsert: true
//     })
//     .then(updateEvent=>{
//         if(updateEvent.nModified!==0){
//             console.log('Event comments updated')
//         } else {
//             console.log('No updates made to event')
//         }
//     })
// })
// .catch(err => {
//     console.error("Event DB Error", err)
//     process.exit()
// })



// User.findOne({
//     _id: '5ff0336e0128527e4014b877'
// })
// .populate('events','_id')
// .then(changed=>{
//     let eventIds = []
//     changed.events.forEach(event=>{
//         eventIds.push(event._id);
//         //console.log(eventIds)
//     })
//     Event.find({
//         _id: { $in: [eventIds]}
//     })
//     .populate('comments')
//     .then(foundEvents=>{
//         foundEvents.forEach(singleEvent=>{
//             console.log(singleEvent.comments)
//         })
//     })
//     .catch(err => {
//         console.error("Event DB Error", err)
//         process.exit()
//     })
// })
// .catch(err => {
//     console.error("User DB Error", err)
//     process.exit()
// })

// User.find({
//     _id: '5ff0336e0128527e4014b877'
// })
// .populate('events')
// .then(changed=>{
//     eventId=changed[0].events[0]._id;
//     Event.update({
//         _id: eventId
//     },{
//         $addToSet: {
//             comments: '5ff035db85266c39e43aaf57'
//         }
//     })
//     .then(foundEvent=>{
//         console.log(foundEvent)
//     })
//     .catch(err => {
//         console.error("Event DB Error", err)
//         process.exit()
//     })
// })
// .catch(err => {
//     console.error("User DB Error", err)
//     process.exit()
// })
//5ff035db85266c39e43aaf57
//User.find().then(it=>{console.log(it)})