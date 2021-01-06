const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models/index')
const User = db.user
const Role = db.role

// this function will verify our web token
verifyWebToken = (req, res, next) => {
    //first we declare our token which is passed in our headers
    let token = req.headers['x-access-token']
    console.log(req)
    //if no token given, we respond with an error
    if(!token) {
        return res.status(403).send({message: 'No token provided'})
    }

    // We try to verify the token
    // passing the tokden the config secret
    //then json is going to give an error or decode the token
    // uses the secret to decode the token
    jwt.verify(token, config.secret, (err, decoded) => {
        if (err){
            return res.status(403).send({message: `${err}`})
        }
        // set userid to decoded id (id stored inside jwt)
        req.userId = decoded.id
        next()
    })
}

//another function to verify if admin or not

isAdmin = (req, res, next) => {
    // .exec returns the user we want to have access to (.then does not return the user)
    User.findOne({_id: req.userId}).exec((err, user)=> {
        if(err){
            return res.status(500).send({message: err})
        }
        // once you get the user back (if user exists), check to see if the user's role is in our db
        Role.find({
            // $in is an operator in mongo 
            _id: { $in: user.roles}
        }, (err, roles) => {
            if(err){
                return res.status(500).send({message: err})
            }
            // loop through the returned roles and check if theres an admin role
            for(let i=0; i < roles.length; i++){
                if(roles[i].name === 'admin'){
                    //next is an express function specifically
                    next()
                    return
                }
            }
            //if no admin role found, send status 403 message
            res.status(403).send({message: 'Requires admin role'})
        })
    })
    
}

const authJwt = {
    verifyWebToken, 
    isAdmin
}

module.exports = authJwt