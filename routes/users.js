// "USERS" ROUTES

const routes = require('express').Router();
const usersCtrl = require('../controllers/users');
const { requiresAuth } = require('express-openid-connect');
const validation = require("../middleware/validate");

// Allow All Read Access

// Our hypothetical users collection stores passwords in cleartext, therefore, 
// we don't have a "GET ALL" planned for this collection.
// routes.get('/', usersCtrl.getAll); 
routes.get('/:id', usersCtrl.getOne);

// Allow Authorized Write Access
routes.post('/', requiresAuth(), validation.validateUser, usersCtrl.addUser);
routes.put('/:id', requiresAuth(), validation.validateUser, usersCtrl.updateUser);
routes.delete('/:id', requiresAuth(), usersCtrl.deleteData);

module.exports = routes;