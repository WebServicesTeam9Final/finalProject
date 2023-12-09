// "TEMPLES" ROUTES

const routes = require('express').Router();
const templesCtrl = require('../controllers/temples');
const { requiresAuth } = require('express-openid-connect');
// const validation = require("../middleware/validate");

// Allow All Read Access
routes.get('/', templesCtrl.getAll);
routes.get('/:id', templesCtrl.getOne);

// Allow Authorized Write Access
routes.post('/', requiresAuth(), templesCtrl.addTemple);
routes.put('/:id', requiresAuth(), templesCtrl.updateTemple);
routes.delete('/:id', requiresAuth(), templesCtrl.deleteData);

module.exports = routes;