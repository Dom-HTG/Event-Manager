const express = require('express');
const mongoose = require('mongoose');
const UserModel = require("../models/User.models").default;
const jwtAuth = require('../auth/auth');

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //Validate user input.
        if (!email || !password) {
        return res.status(400).send({ message: 'All fields are required.'});
        };

        //Login logic.
        // registeredUser = await model.User.findOne({ email });
        const registeredUser = await UserModel.findOne({ email });

        if (!registeredUser) {
            return res.status(404).send({ message: 'User not registered.' });
        };

        const hashedPass = registeredUser.password;
        const match = bcrypt.compare(password, hashedPass);

        if (match) {
            //Create new JWT token.
            const token = await jwtAuth.createToken(email);
            res.status(200).send({ 
                message: 'Login successful.', 
                tkn: token
             });
        } 
    } catch (err) {
        res.status(500).send({ message: 'Error logging in' });
    };
   

};

const Register = async (req, res) => {
    try {
        const  { firstName, lastName, email, password } = req.body;

        //validate input from user.
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).send({ msg: 'All fields are required.' });
        };

        //check if user is already registered.
        // registeredUser = await model.User.findOne({email});
        const registeredUser = await UserModel.findOne({ email });
        if (registeredUser) {
            return res.status(400).send({ msg: 'User already exists' });
        }

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
        console.log('Saved user to the database', savedUser);

        //Create new jwt token.
        const token = await jwtAuth.createToken(savedUser._id, savedUser.email);
        res.status(201).send({
            msg: 'User registered successfully', 
            tkn: token
        });

    } catch (err) {
        res.status(500).json({ 
            msg: "Error registering user.", 
            error: err
        });
    };
};

module.exports = {
    Login,
    Register
};