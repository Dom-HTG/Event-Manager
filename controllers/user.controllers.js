const express = require('express');
//Handlers for Users.

const GetUsers = (req, res) => {
    //This function gets all the users.
    res.status(200).send({"msg": "GET USERS"})
};

const CreateUser = (req, res) => {
    //This function creates a new user.
    res.status(201).send({"msg": "CREATE NEW USERS"})
};

const GetUserById = (req, res) => {
    //This function gets a user by Id.
    res.status(200).send({"msg": "GET USER BY ID"})
};

const PatchUser = (req, res) => {
    //This function updates only portion of user data.
    res.status(200).send({"msg": "PATCH USERS"})

};

const UpdateUser = (req, res) => {
    //This function updates all of the user data.
    res.status(200).send({"msg": "UPDATE USERS"})

};

const DeleteUser = (req, res) => {
    //This function deletes user from the database.
    res.status(200).send({"msg": "DELETE USERS"})

};

//Handlers for Events.

const GetEvents = (req, res) => {
    //This function gets all the registered events.
    res.status(200).send({"msg": "GET EVENTS"})

};

const CreateEvent = (req, res) => {
    //This function creates a new event.
    res.status(201).send({"msg": "CREATE NEW USER"})

};

const GetEventById = (req, res) => {
    //This functions gets an event by Id. 
    res.status(200).send({"msg": "GET EVENT BY ID"})

};

const PatchEvent = (req, res) => {
    //This functions updates only portion of event data. 
    res.status(200).send({"msg": "PATCH EVENT"})

};

const UpdateEvent = (req, res) => {
    //This function updates event.
    res.status(200).send({"msg": "UPDATE EVENT"})

};

const DeleteEvent = (req, res) => {
    //This function deletes event from the database.
    res.status(200).send({"msg": "DELETE EVENT"})

};

module.exports = {
    GetUsers, 
    CreateUser, 
    GetUserById, 
    PatchUser, 
    UpdateUser, 
    DeleteUser, 
    GetEvents,
    CreateEvent, 
    GetEventById, 
    PatchEvent, 
    UpdateEvent, 
    DeleteEvent 
};

