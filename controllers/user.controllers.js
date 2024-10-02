const UserModel = require('../models/User.models');

const GetUsers = async (req, res) => {
    //This function gets all the users.

   await UserModel.find({}, (err, users) => {
        if (err) {
            console.log(err);
            return res.status(404).json({msg: "error retrieving users", err: err});
        } else if (!user) {
            return res.status(404).json({msg: "empty users"});
        } else {
            return res.status(200).json({msg: "success", payload: users});
        }
    });
};

const CreateUser = async (req, res) => {
    //This function creates a new user.

    try {
       const user = new UserModel(req.body);
       await user.save();
       return res.status(201).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json({err: "Error creating user"});
    };    
};

const GetUserById = async (req, res) => {
    //This function gets a user by Id.

    const userId = req.params.userId;

    await UserModel.findById(userId, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(404).json({msg: "error retrieving user", payload: user});
        } else if (!user) {
            return res.status(404).json({msg: "user not found"});
        };
    });
};

// const PatchUser = (req, res) => {
//     //This function updates only portion of user data.
//     res.status(200).send({"msg": "PATCH USERS"})

// };

const UpdateUser = async (req, res) => {
    //This function updates all of the user data.

    const userId = req.params.id;

    await UserModel.findByIdAndUpdate(userId, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).json({msg: "error updating user", err: err});
        } else {
            return res.status(200).json({msg: "user updated", payload: user});
        }
    });

};

const DeleteUser = async (req, res) => {
    //This function deletes user from the database.

    const userId = req.params.userId;

    await UserModel.findByIdAndDelete(userId, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({msg: "error deleting user", err: err});
        } else {
            return res.status(200).json({msg: "user deleted"});
        };
    });

};

module.exports = {
    GetUsers, 
    CreateUser, 
    GetUserById, 
    // PatchUser, 
    UpdateUser, 
    DeleteUser, 
};

