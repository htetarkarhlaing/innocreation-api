//setting up express routes
const express = require('express');
const routes = express.Router();

//importing the controllers
const { login, register } = require('../controllers/user.Contdroller')

routes.post("/users/login", login);
routes.post("/users/register", register);

module.exports = routes;