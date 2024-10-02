const express = require('express');
const dotenv = require('dotenv').config();
const controllers = require('./controllers/user.controllers');
const auth = require('./controllers/auth.controllers');
const db = require('./utils/db.utils');

const app = express();

// Middlwares.
app.use(express.json());

//Initialize database connection.
db.connectToMongoDB();

// Auth routes.
app.post('/auth/login', auth.Login) // Login user.
app.post('/auth/register', auth.Register) // Register user.


// User routes.
app.get("/users", controllers.GetUsers) // Get all users.
app.post("/users", controllers.CreateUser) // Create a new user.
app.get("/users/:id", controllers.GetUserById) // gets a user by id.
app.patch("/users/:id", controllers.PatchUser) // patch a user.
app.put("/users/:id", controllers.UpdateUser) // Update a user.
app.delete("/users/:id", controllers.DeleteUser) // Delete a user.

// Events routes.
app.get("/events", controllers.GetEvents) // Get all events.
app.get("/events/:id", controllers.GetEventById) // Get an event by id.
app.post("/events", controllers.CreateEvent) // Create a new event.
app.patch("/events/:id", controllers.PatchEvent) // Patch an event.
app.put("/events/:id", controllers.UpdateEvent) // Update an event.
app.delete("/events/:id", controllers.DeleteEvent) // Delete an event.


app.listen(process.env.PORT || 3000, () => {console.log(`listening on port: ${process.env.PORT}`)})