const express = require('express');
const controller = require('../controllers/users.controllers');

const userRoutes = express.Router();

userRoutes.get('/', controller.allUsers)

userRoutes.get('/:id', controller.userById)

userRoutes.post('/', controller.createUser)

userRoutes.delete('/:id', controller.deleteUser)

userRoutes.patch('/:id', controller.patchUser)

module.exports = userRoutes