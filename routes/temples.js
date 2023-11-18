// "TEMPLES" ROUTES

const routes = require('express').Router();
const templesCtrl = require('../controllers/temples');
// const validation = require("../middleware/validate");

// Allow All Read/Write Access
routes.get('/', templesCtrl.getAll);
routes.get('/:id', templesCtrl.getOne);
routes.post('/', templesCtrl.addTemple);
routes.put('/:id', templesCtrl.updateTemple);
routes.delete('/:id', templesCtrl.deleteData);

module.exports = routes;