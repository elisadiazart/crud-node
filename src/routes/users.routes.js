const express = require('express');
const controller = require('../controllers/users.controllers');

const userRoutes = express.Router();

userRoutes.get('/', controller.allUsers)

userRoutes.get('/:id', controller.userById)

module.exports = userRoutes