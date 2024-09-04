const express = require("express");
const dotenv = require("dotenv").config();
const { 
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
} = require("./controllers")

const app = express();

app.get("/home", (req, res) => {
    res.status(200).json({"msg":"HOME PAGE"});
})

// User routees.

app.get("/users", GetUsers) // Get all users.
app.post("/users", CreateUser) // Create a new user.
app.get("/users/:id", GetUserById) // gets a user by id.
app.patch("/users/:id", PatchUser) // patch a user.
app.put("/users/:id", UpdateUser) // Update a user.
app.delete("/users/:id", DeleteUser) // Delete a user.

// Events routes.

app.get("/events", GetEvents) // Get all events.
app.post("/events", CreateEvent) // Create a new event.
app.get("/events/:id", GetEventById) // Get an event by id.
app.patch("/events/:id", PatchEvent) // Patch an event.
app.put("/events/:id", UpdateEvent) // Update an event.
app.delete("/events/:id", DeleteEvent) // Delete an event.


app.listen(process.env.PORT || 3000, () => {console.log(`listening on port: ${process.env.PORT}`)})