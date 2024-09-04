const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const controllers = require("./controllers/user.controllers");
const auth = require("./controllers/auth.controllers");

const app = express();

app.use(express.json());

const connectToMongoDB = async () => {
	mongoose.connect(process.env.MONGODB_URL)
		.then(() => {
			console.log("database connection established");
		})
		.catch((error) => {
			console.error("Error connecting to MongoDB:", error);
		});
};

connectToMongoDB();

// Auth routes.
app.post("/auth/login"); // Login user.
app.post("/auth/register");

// User routee.

app.get("/users", controllers.GetUsers); // Get all users.
app.post("/users", controllers.CreateUser); // Create a new user.
app.get("/users/:id", controllers.GetUserById); // gets a user by id.
app.patch("/users/:id", controllers.PatchUser); // patch a user.
app.put("/users/:id", controllers.UpdateUser); // Update a user.
app.delete("/users/:id", controllers.DeleteUser); // Delete a user.

// Events routes.

app.get("/events", controllers.GetEvents); // Get all events.
app.post("/events", controllers.CreateEvent); // Create a new event.
app.get("/events/:id", controllers.GetEventById); // Get an event by id.
app.patch("/events/:id", controllers.PatchEvent); // Patch an event.
app.put("/events/:id", controllers.UpdateEvent); // Update an event.
app.delete("/events/:id", controllers.DeleteEvent); // Delete an event.

app.listen(process.env.PORT || 3000, () => {
	console.log(`listening on port: ${process.env.PORT}`);
});
