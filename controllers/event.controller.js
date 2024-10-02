const EventModel = require('../models/Events.models');
require('mongoose');

const GetEvents = (req, res) => {
    //This function gets all the registered events.
    EventModel.find({}, (err, events) => {
        if (err) {
            console.log(err);
            return res.status(500).json({err: "error retrieving events"});
        } else {
            res.status(200).json(events);
        }
    });

};

const GetEventById = async (req, res) => {
    //This functions gets an event by Id. 

    const eventId = req.params.eventId;

    await EventModel.findById(eventId, (err, event) => {
        if (err) {
            console.log(err);
            return res.status(500).json({err: "error retrieving event"});
        } else if (!event) {
            return res.status(404).json({msg: "event not found"});
        } else {
            return res.status(200).json(event);
        }
    });

};

const CreateEvent = async (req, res) => {
    //This function creates a new event.

    try {
        const event = req.body;
        await event.save();  
        return res.status(201).json({msg: "event created", payload: event});      
    } catch (err) {
        console.log(err);
        return res.status(500).json({err: "error creating event"});
    };
};

// const PatchEvent = async (req, res) => {
//     //This functions updates only segment of event data. 
// };

const UpdateEvent = async (req, res) => {
    //This function updates event.

    const eventId = req.params.id;
    
    await EventModel.findByIdAndUpdate(eventId, (err, event) => {
        if (err) {
            console.log(err);
            return res.status(500).json({err: "error updating event"});
        } else {
            return res.status(200).json({msg: "event updated"});
        }
    });
};

const DeleteEvent = async (req, res) => {
    //This function deletes event from the database.

    const eventId = req.params.id;

    await EventModel.findByIdAndDelete(eventId, (err)=> {
        if (err) {
            console.log(err);
            return res.status(500).json({msg: "error deleting event"});
        } else {
            return res.status(200).json({msg: "event deleted"});
        };
    });

};

module.exports = {
    GetEvents,
    CreateEvent, 
    GetEventById, 
    // PatchEvent, 
    UpdateEvent, 
    DeleteEvent 
}; 