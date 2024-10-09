const express = require('express');
require('dotenv').config();
// const userController = require('./controllers/user.controllers');
// const eventController = require('./controllers/event.controller')
// // const auth = require('./controllers/auth.controllers');
const connectToMongo = require('./utils/db.utils');
const authRoutes = require("./routes/auth.routes");
const userRoutes = require('./routes/user.routes');
const eventRoutes = require('./routes/event.routes');
const { errorHandler } = require('./middlewares/error.middlewares')

const app = express();

// Middlwares.
app.use(express.json());

//Initialize database connection.
connectToMongo();

// Auth routes.
// app.post('/auth/login', auth.Login) // Login user.
// app.post('/auth/register', auth.Register) // Register user.
app.use("/auth", authRoutes)
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);

// User routes.
// app.get("api/users", userController.GetUsers) // Get all users.
// app.post("api/users", userController.CreateUser) // Create a new user.
// app.get("api/users/:userId", userController.GetUserById) // gets a user by id.
// // app.patch("api/users/:userId", controllers.PatchUser) // patch a user.
// app.put("api/users/:userId", userController.UpdateUser) // Update a user.
// app.delete("api/users/:userId", userController.DeleteUser) // Delete a user.

// Events routes.
// app.get("api/events", eventController.GetEvents) // Get all events.
// app.get("api/events/:eventId", eventController.GetEventById) // Get an event by id.
// app.post("api/events", eventController.CreateEvent) // Create a new event.
// // app.patch("api/events/:eventId", controllers.PatchEvent) // Patch an event.
// app.put("api/events/:eventId", eventController.UpdateEvent) // Update an event.
// app.delete("api/events/:eventId", eventController.DeleteEvent) // Delete an event.

app.use(errorHandler);


app.listen(process.env.PORT || 3000, () => {console.log(`listening on port: ${process.env.PORT}`)})