const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true  
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        undefined: true
    },
    password: {
        type: String,
        required: true,
    }
}, {timstamps: true})

const Events = mongoose.model('Events', {
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
    publicity: {
        type: Boolean
    }
})