const express = require('express');
const model = require('../models/models');
const bcrypt  = require('bcrypt');
const mongoose = require('mongoose');

const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        //Validate user input.
        if (!email || !password) {
        return res.status(400).send({ message: 'All fields are required.'});
        };

        //Login logic.
        registeredUser = await model.User.findOne({ email });

        if (!registeredUser) {
            return res.status(404).send({ message: 'User not registered.' });
        };

        const hashedPass = registeredUser.password
        const match = bcrypt.compare(password, hashedPass)

        if (!match) {
            res.status(404).send({ message: 'Password mismatch.' });
        } else {
            res.status(200).send({ message: 'Login successful.' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Error logging in' });
    }
   

};

const Register = async (req, res) => {
    try {
        const  { firstName, lastName, email, password } = req.body;

        //validate input from user.
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).send({ msg: 'All fields are required.' });
        };

        //check if user is already registered.
        registeredUser = await model.User.findOne({email});
        if (registeredUser) {
            return res.status(400).send({ msg: 'User already exists' });
        }

        //Hash the user password.
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //register user.
        const newUser = new model.User ({
            firstName,
            lastName,
            email,
            password: hashPassword
        });

        await newUser.save();
        res.status(201).send({ msg: 'User registered successfully' });

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