const db = require('../models/index')
import React, { useState, useEffect } from 'react'
import axios from 'axios'

// access to our db through event
const Event = db.event

exports.searchEvent = (req, res) => {

    const [eventData, setEventData] = useState([])

    let location = req.body.location
    useEffect(() => {
        axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?postalCode=${location}&size=1&apikey=0wQvZLMQGzPOHkz1uaAlvIfQ8NQt8ZDe`)
            .then((res) => {
                if (err) {
                    res.status(500).send({ message: err })
                    return
                } else {
                    setEventData(res.data)
                    console.log(eventData)
                }
            })
    }, [])
    if (err) {
        res.status(500).send({ message: err })
        return
    }
}