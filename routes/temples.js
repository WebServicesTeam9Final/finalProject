// "TEMPLES" ROUTES

const routes = require('express').Router();
const templesCtrl = require('../controllers/temples');
// const validation = require("../middleware/validate");

// Allow All Read/Write Access
routes.get('/', templesCtrl.getAll);
routes.get('/:id', templesCtrl.getOne);
routes.post('/', templesCtrl.postData);
routes.put('/:id', templesCtrl.putData);
routes.delete('/:id', templesCtrl.deleteData);

module.exports = routes;