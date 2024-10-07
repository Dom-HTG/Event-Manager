const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    const user = this;

    // check if user has not been modified
    if (user.isModified("password")) {
        //Hash password.
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password, salt);
        user.password = hashPassword;

    };
    next();
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;