
const db=require('../models/event')

exports.create=(req, res)=>{

    //create an event
    const event= new Event({
        name: req.body.name,
        artist:req.body.artist,
        location: req.body.location
    })
    
}
