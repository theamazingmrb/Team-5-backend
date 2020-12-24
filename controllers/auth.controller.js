const config = require('../config/auth.config')
const db = require('../models/index')
// access to our db through User and Role
const User = db.user 
const Role = db.role 

// this will give us access to encode and decode the jwt itself - allows us to work with jwt
const jwt = require('jsonwebtoken')
// for hashing/encrypting our passwords
const bcrypt = require('bcryptjs')
// this will handle stand up
exports.signup = (req, res) => {
    // we are going to make our user object using the params returned from req
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8) // 8 is an option to pass on the hashing
    })

    // we save that user and if there is an error, we throw that error
    user.save((err, user) => {
        if (err) {
            res.status(500).send({message: err})
            return
        }

        // if there is not an error, we check if roles was passed on req.params
        if(req.body.roles) {
            Role.find({
                name: { $in: req.body.roles }
            }, (err, roles) => {
                if (err) {
                    res.status(500).send({message: err})
                    return
                }
                // pass role's id from query above to user.roles
                // expecting the role's object id as indicated in user.model.js
                user.roles = roles.map(role => role._id)
                // save our updated users
                user.save((err => {
                    if (err) {
                        res.status(500).send({message: err})
                        return
                    }
                    res.send({message: "user created successfully"})
                }))
            })
        } else {
            Role.findOne({name: "user"}, (err, role)=>{
                if (err) {
                    res.status(500).send({message: err})
                    return 
                }
                // just assign user's role id to the document
                user.roles = [role._id]
                user.save(err => {
                    if (err) {
                        res.status(500).send({message: err})
                        return
                    }
                    res.send({message: "user was registered successfully"})
                })
            })
        }
    })
}

// handles sign in
exports.signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    // populates values from the roles id we stored in the document
    // without this, it will just give back a list of id's, but populate gets the values back
    .populate("roles", "-__v")
    // exec returning our user to user
    .exec((err, user)=>{
        if(err) {
            res.status(500).send({message: err})
            return 
        }
        // user did not exist
        if(!user) {
            return res.status(404).send({message: "user not found"})
        }
        // validate the password by passing req.body password and the password returned from db
        // over to bcrypt to unhash and compare
        const passwordIsValid = bcrypt.compareSync(
            
            req.body.password, // unencrypted pw -- compares to the encrypted pw in db below
            user.password // encrypted pw saved in db
        )
        // if password is not valid, we return invalid password
        if (!passwordIsValid) {
            return res.status(401).send({accessToken: null, message: "invalid password"})
        }
        console.log(passwordIsValid)
        // if password id valid, we generate a new token
        const token = jwt.sign({id: user._id}, config.secret, {
            expiresIn: 86400 // expires token in 24 hours, user will have to sign in and request a brand new token every 24 hrs
        })
        // setting roles to pass back in our response
        let authorities = []
        for (let i = 0; i < user.roles.length; i++) {
            authorities.push("ROLE_" + user.roles[i].name.toUpperCase())
        }
        // sending the response back
        res.status(200).send({
            id: user._id, 
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        })
    })
}

// find and update user name
exports.updateUsername= (req,res)=>{

    console.log("user")
    //update profile at username
    User.findOneAndUpdate(req.body.username).then((data)=>{
        if(!data){
            return res.status(400).send({message: "No found Profile with username"})
            }else{
                res.send({message: "Username updated sucessfully"})
            }
    })
}