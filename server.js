const express = require('express')
const bodyParser = require('body-parser')
const dbConfig = require('./config/db.config')
const cors = require("cors")

const app = express();
app.use(cors())
require('dotenv').config();



// parse requests of content-type - application/json
app.use(bodyParser.json())

//parse request of conent type = application/x--form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//Setup Mongoose
const db = require('./models/index')
const Role = db.role
const User = db.user

const dbURI = 'mongodb://dev-admin:passwordtoweak@cluster0-shard-00-00.wnln1.mongodb.net:27017,cluster0-shard-00-01.wnln1.mongodb.net:27017,cluster0-shard-00-02.wnln1.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-1d38f4-shard-0&authSource=admin&retryWrites=true&w=majority'
//  process.env.MONGODB_URI || `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`

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
