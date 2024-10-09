const EventModel = require('../models/Events.models');
const { customError } = require('../errors/errror');

const GetEvents = async (req, res, next) => {
    //This function gets all the registered events.
    //  EventModel.find({}, (err, events) => {
    //     if (err) {
    //         console.log(err);
    //         return res.status(500).json({err: "error retrieving events"});
    //     } else {
    //         res.status(200).json(events);
    //     }
    // });

    try {
        
        const events = await EventModel.find({});
        if(events.length === 0) {
            throw new customError('No events found', 404);
        }

        return res.status(200).json({payload: events});

    } catch (error) {
        // console.error(error);

        // const statusCode = error.statusCode || 500;
        // const message = error.message || "Internal server error";

        // return res.status(statusCode).json({ err: message });

        next(error);
    }
};

const GetEventById = async (req, res, next) => {
    //This functions gets an event by Id. 

    try {
        const eventId = req.params.eventId;
        const event = await EventModel.findById(eventId);

        if (!event) {
            throw new customError('Event not found', 400);
        };

        return res.status(200).json({ payload: event });

    } catch (error) {
        // console.error(error);

        // const statusCode = error.statusCode || 500;
        // const message = error.message || "Internal server error";

        // return res.status(statusCode).json({ err: message });

        next(error);
    };
};

const CreateEvent = async (req, res, next) => {
    //This function creates a new event.

    try {
        const body = req.body;

        if (!body) {
            throw new customError('No input provided', 400);
        };

        const newEvent = new EventModel(body);
        const savedEvent = await newEvent.save();  

        if (savedEvent) {
            return res.status(201).json({ msg: "event created", payload: savedEvent });      
        };
    } catch (error) {
        // console.log(error);

        // const statusCode = error.statusCode || 500;
        // const message = error.message || "Internal server error";

        // return res.status(statusCode).json({ err: message });

        next(error);
    };
};

// const PatchEvent = async (req, res) => {
//     //This functions updates only segment of event data. 
// };

const UpdateEvent = async (req, res, next) => {
    //This function updates event.

    try {
        const eventId = req.params.eventId;
        const updateData = req.body;

        const updatedEvent = await EventModel.findByIdAndUpdate(eventId, updateData, { new: true });

        if (updatedEvent) {
            return res.status(200).json({payload: updatedEvent});

        } else {
            throw new customError('Event not updated', 400);
        }


    } catch (error) {
        // console.error(error);

        // const statusCode = error.statusCode || 500;
        // const message = error.message || "Internal server error";

        // return res.status(statusCode).json({ err: message });

        next(error);
    };
};

const DeleteEvent = async (req, res, next) => {
    //This function deletes event from the database.
    try {
        const eventId = req.params.eventId;

        const deletedEvent = await EventModel.findByIdAndDelete(eventId, { new: true });
        if (deletedEvent) {
            return res.status(200).json({payload: deletedEvent});
        };
        
    } catch (error) {
        next(error);
    };
};

module.exports = {
    GetEvents,
    CreateEvent, 
    GetEventById, 
    // PatchEvent, 
    UpdateEvent, 
    DeleteEvent 
}; 