import { Schema, model } from 'mongoose';
import { genSalt, hash } from 'bcryptjs';

// const mongoose = require('mongoose');
// require('bcryptjs');

const userScheme = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {Timestamp: true})

userScheme.pre("save", function (next) {
    const user = this;
    // check if user has not been modified
    if (!user.ismodified("password")) return next();

    //Hash password.
    const salt =  genSalt(10);
    const hashPassword =  hash(user.password, salt);
    user.password = hashPassword;
});

const UserModel = model('User', userScheme);

export default UserModel;