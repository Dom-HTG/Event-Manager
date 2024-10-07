const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fee: {
        type: Number,
        required: false
    },
    cover: {
        type: String,
        required: false
    }, 
    owner: {
        type: String
    },
    public: {
        type: Boolean,
        default: true
    }
}, {Timestamp: true})

const Events = mongoose.model('Event', eventSchema);

module.exports = Events;