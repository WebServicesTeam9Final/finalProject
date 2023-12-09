// "COMPLETED" ROUTES

const routes = require('express').Router();
const completedCtrl = require('../controllers/completed');
const { requiresAuth } = require('express-openid-connect');
const validation = require("../middleware/validate");

// Allow All Read Access
routes.get('/', completedCtrl.getAll);
routes.get('/:id', completedCtrl.getOne);

// Allow Authorized Write Access
routes.post('/', requiresAuth(), completedCtrl.addCompletedPerson);
routes.put('/:id', requiresAuth(), completedCtrl.updateCompletedPerson);
routes.delete('/:id', requiresAuth(), completedCtrl.deleteData);

module.exports = routes;