const express = require('express');
const userController = require('../controllers/user.controllers');

const router = express.Router();

router.get('/', userController.GetUsers); // Retrieve all users.
router.post('/', userController.CreateUser); // Create new user.
router.get('/:userId', userController.GetUserById); // Retrieve single user by id.
router.put('/:userId', userController.UpdateUser); //Update a user.
router.delete('/:userId', userController.DeleteUser); // Delete a user.

module.exports = router;