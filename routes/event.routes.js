const express = require('express');
const eventControllers = require('../controllers/event.controller');

const router = express.Router();

router.get('/', eventControllers.GetEvents); // Retrieves all events.
router.post('/', eventControllers.CreateEvent); // Creates a new event.
router.get('/:userId', eventControllers.GetEventById); // Retrieve a single event by id.
router.put('/:userId', eventControllers.UpdateEvent); // Updates an event.
router.delete('/:userId', eventControllers.DeleteEvent); // Deletes an event.

module.exports = router;