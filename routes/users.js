// "USERS" ROUTES

const routes = require('express').Router();
const usersCtrl = require('../controllers/users');
const { requiresAuth } = require('express-openid-connect');
// const validation = require("../middleware/validate");

// Allow All Read Access

// Doesn't appear we have a "GET ALL" planned for this collection.
// routes.get('/', usersCtrl.getAll); 
routes.get('/:id', usersCtrl.getOne);

// Allow Authorized Write Access
routes.post('/', requiresAuth(), usersCtrl.addUser);
routes.put('/:id', requiresAuth(), usersCtrl.updateUser);
routes.delete('/:id', requiresAuth(), usersCtrl.deleteData);

module.exports = routes;