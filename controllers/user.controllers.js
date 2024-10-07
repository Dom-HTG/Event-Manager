const UserModel = require('../models/User.models');

const GetUsers = async (req, res) => {
    //This function gets all the users.

    try {
        const users = await UserModel.find({});
        if (users.length === 0) {
            throw new Error('No users found');
        }
        return res.status(200).json({payload: users});
    } catch (error) {
        return res.status(error.status).json({err: error.message})
    }
};

const CreateUser = async (req, res) => {
    //This function creates a new user.

    try {
        const body = req.body;
        if (!body) {
            throw new Error('No data provided');
        }
       const user = new UserModel(body);
       await user.save();
       return res.status(201).json({payload: user});
    } catch (err) {
        console.log(err);
        return res.status(err.status).json({err: err.message});
    };    
};

const GetUserById = async (req, res) => {
    //This function gets a user by Id.

    try {
        const userId = req.params.userId;
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }
        return res.status(200).json({payload: user});
    } catch (error) {
        console.error(error);
        return res.status(err.status).json({err: error.message})
    }

};

// const PatchUser = (req, res) => {
//     //This function updates only portion of user data.
//     res.status(200).send({"msg": "PATCH USERS"})

// };

const UpdateUser = async (req, res) => {
    //This function updates all of the user data.

    try {
        const userId = req.params.userId;
        const updateData = req.body;
        if (!updateData) {
            throw new Error('Invalid input');
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            throw new Error('Updated Use not found');
        }
        return res.status(200).json({payload: updatedUser});
    } catch (error) {
        console.error(error);
        return res.status(error.status).json({err: error.message});
    }
};

const DeleteUser = async (req, res) => {
    //This function deletes user from the database.

    try {
        const userId = req.params.userId;
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (deletedUser) {
            return res.status(200).send({deletedUser: deletedUser});
        };
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: error.message, msg: "Error deleting user"});
    };
};

module.exports = {
    GetUsers, 
    CreateUser, 
    GetUserById, 
    // PatchUser, 
    UpdateUser, 
    DeleteUser, 
};

