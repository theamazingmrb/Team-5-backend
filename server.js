const express = require('express')
const bodyParser = require('body-parser')
const dbConfig = require('./config/db.config')
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
require('dotenv').config()
app.use(cors({origin:true}))

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

const dbURI = process.env.MONGODB_URI || `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`

//connect the mongo database
db.mongoose
    .connect(dbURI, {
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
const Event = db.event
const Comment = db.comment







// const newComment = new Comment({
//     name: 'eksdfoisdjf',
//     content: 'FOURTH Test',
// })
// newComment.save(newComment)
// Event.updateOne(
//     { _id: '5ff0beb9e86e3717de2a7301' },
//     { $addToSet: {comments: newComment} }
// )
// .then(changed=>{
//     console.log(changed)
//     User.findOne({ _id: '5ff0336e0128527e4014b877' })
//     .populate('events','comments')
//     .then(userData=>{
//         console.log(userData)
//     })
// })
// .catch(err => {
//     console.error("User DB Error", err)
//     process.exit()
// })

// const newEvent= new Event ({
//     eventId: '5000',
//     name: 'TestEvent1',
//     date: new Date(),
//     location: 'SF',
//     comments: [newComment]
// })
// newEvent.save(newEvent)

// const newUser = new User({
//     username: 'user1',
//     email: 'test1@yahoo.com',
//     password: 'password',
//     roles: [ '5ff02f076743f908c01b7b15' ],
//     events: [newEvent]
// })
// newUser.save(newUser)

// const newEvent= new Event ({
//     eventId: '7',
//     name: 'Another event',
//     date: new Date(),
//     location: 'NY',
//     comments: []
// })
//newEvent.save(newEvent)
// User.updateOne(
//     { _id: '5ff0336e0128527e4014b877' },
//     { $addToSet: {events: newEvent} }
// )
// .populate('events')
// .then(changed=>{
//     console.log(changed)
//     User.findOne({ _id: '5ff0336e0128527e4014b877' })
//     .populate('events')
//     .then(userData=>{
//         console.log(userData)
//     })
// })
// .catch(err => {
//     console.error("User DB Error", err)
//     process.exit()
// })



//5ff035db85266c39e43aaf57
// User.findOne({ _id: '5ff0336e0128527e4014b877' })
// .populate('events','comments')
// .then(it=>{
//     let commIds =[]
//     it.events.forEach(event=>{
//         Comment.find({_id: event.comments},{_id:1})
//         .then(commentData=>{
            
//             commentData.forEach(cData=>{
//                 if(cData._id){
//                     //console.log(`${cData._id}`)
//                     commIds.push(cData._id.toString())
//                 }
//             })
//             console.log(commIds)
//         })
//     })
    
// })

User.find()
.then(it=>{
    console.log(it)
    
})


    // Event.findOne({
    //     _id: '5ff032a5af0ccd691a554141'
    // })
    // .populate('comments')
    // .then(updateEvent=>{
    //     console.log(updateEvent)
    // })
    // .catch(err => {
    //     console.error("Event DB Error", err)
    //     process.exit()
    // })

//Comment.find().then(x=>{console.log(x)})
