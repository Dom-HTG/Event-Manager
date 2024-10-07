const express = require('express');
require('mongoose');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User.models');
const jwtAuth = require('../auth/auth');
const { customError } = require('../errors/errror'); 

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //Validate user input.
        if (!email || !password) {
            throw new customError('All fields are required', 400);
        };

        //Login logic.
        // registeredUser = await model.User.findOne({ email });
        const registeredUser = await UserModel.findOne({ email: email });

        if (!registeredUser) {
            throw new customError('User not found', 404);
        };

        //Compare passwords.
        const hashedPass = registeredUser.password;
        const match = bcrypt.compare(password, hashedPass);

        if (match) {
            //Create new JWT token.
            const token = jwtAuth.createToken(email);
            return res.status(200).send({ 
                msg: 'Login successful.', 
                tkn: token
             });
        } 
    } catch (error) {
        console.error(error);
        return res.status(error.statusCode).json({ msg: error.message });
    };
   

};

const Register = async (req, res) => {
    try {
        const  { firstName, lastName, email, password } = req.body;

        //validate input from user.
        if (!firstName || !lastName || !email || !password) {
            throw new customError('All fields are required', 400);
        };

        //check if user is already registered.
        // registeredUser = await model.User.findOne({email});
        const registeredUser = await UserModel.findOne({ email: email });

        if (registeredUser) {
            throw new customError('User already registered', 400);
        };

        //Hash the user password.
        // const salt = await bcrypt.genSalt(10);
        // const hashPassword = await bcrypt.hash(password, salt);

        //register user.
        // const newUser = new model.User ({
        //     firstName,
        //     lastName,
        //     email,
        //     // password: hashPassword
        //     password
        // });

        const newUser = new UserModel ({
            firstName,
            lastName,
            email,
            password
        });

        const savedUser = await newUser.save();
        console.log('Saved user to the database');

        //Create new JWT.
        const token = jwtAuth.createToken(savedUser._id, savedUser.email);
        return res.status(201).send({
            msg: 'User registered successfully', 
            user: {
                firstName: savedUser.firstName,
                lastName: savedUser.lastName,
                email: savedUser.email
            },
            authToken: token
        });

    } catch (error) {
        console.error(error);
        return res.status(error.statusCode).json({ msg: error.message });
    };
};

module.exports = {
    Login,
    Register
};