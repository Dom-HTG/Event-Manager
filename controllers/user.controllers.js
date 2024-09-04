//Handlers for Users.

const GetUsers = (req, res) => {
    //This function gets all the users.
};

const CreateUser = (req, res) => {
    //This function creates a new user.
};

const GetUserById = (req, res) => {
    //This function gets a user by Id.
};

const PatchUser = (req, res) => {
    //This function updates only portion of user data.
};

const UpdateUser = (req, res) => {
    //This function updates all of the user data.
};

const DeleteUser = (req, res) => {
    //This function deletes user from the database.
};

//Handlers for Events.

const GetEvents = (req, res) => {
    //This function gets all the registered events.
};

const CreateEvent = (req, res) => {
    //This function creates a new event.
};

const GetEventById = (req, res) => {
    //This functions gets an event by Id. 
};

const PatchEvent = (req, res) => {
    //This functions updates only portion of event data. 
};

const UpdateEvent = (req, res) => {
    //This function updates event.
};

const DeleteEvent = (req, res) => {
    //This function deletes event from the database.
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

