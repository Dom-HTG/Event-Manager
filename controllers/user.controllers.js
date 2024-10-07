const UserModel = require('../models/User.models');
const { customError } = require('../errors/errror'); 

const GetUsers = async (req, res) => {
    //This function gets all the users.

    try {
        const users = await UserModel.find({});
        if (users.length === 0) {
            throw new customError('No users found', 404);
        };

        return res.status(200).json({payload: users});

    } catch (error) {
        console.error(error);

        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal server error";

        return res.status(statusCode).json({err: message})
    }
};

const CreateUser = async (req, res) => {
    //This function creates a new user.

    try {
        const body = req.body;
        if (!body) {
            throw new customError('No data provided', 400);
        }
       const user = new UserModel(body);
       await user.save();

       return res.status(201).json({msg: "User created successfully", payload: user});

    } catch (error) {
        console.log(error);

        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal server error";

        return res.status(statusCode).json({err: message});
    };    
};

const GetUserById = async (req, res) => {
    //This function gets a user by Id.

    try {
        const userId = req.params.userId;
        const user = await UserModel.findById(userId);

        if (!user) {
            throw new customError ('User not found', 404);
        };

        return res.status(200).json({msg: "User retrieved successfully", payload: user});

    } catch (error) {
        console.error(error);

        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal server error";

        return res.status(statusCode).json({err: message});
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
            throw new customError ('Invalid input', 400);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            throw new customError ('Updated Use not found', 404);
        };

        return res.status(200).json({msg: "User updated successfully", payload: updatedUser});

    } catch (error) {
        console.error(error);

        const statusCode = error.statusCode || 500;
        const message = error.message || "Internal server error";

        return res.status(statusCode).json({err: message});
    }
};

const DeleteUser = async (req, res) => {
    //This function deletes user from the database.

    try {
        const userId = req.params.userId;
        const deletedUser = await UserModel.findByIdAndDelete(userId);

        if (deletedUser) {
            return res.status(200).json({msg: "User deleted Successfully", payload: deletedUser});
        };

    } catch (error) {
        console.error(error);

        const statusCode = error.statusCode || 500;
        const message = error.message || "Error deleting user";

        return res.status(statusCode).json({err: message});
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

