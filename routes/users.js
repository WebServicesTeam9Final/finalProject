// "USERS" ROUTES

const routes = require('express').Router();
const usersCtrl = require('../controllers/users');
// const validation = require("../middleware/validate");

// Allow All Read/Write Access

// Doesn't appear we have a "GET ALL" planned for this collection.
// routes.get('/', usersCtrl.getAll); 
routes.get('/:id', usersCtrl.getOne);
routes.post('/', usersCtrl.addUser);
routes.put('/:id', usersCtrl.addUser);
routes.delete('/:id', usersCtrl.deleteData);

module.exports = routes;