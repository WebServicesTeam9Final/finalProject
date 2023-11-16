// "COMPLETED" ROUTES

const routes = require('express').Router();
const completedCtrl = require('../controllers/completed');
// const validation = require("../middleware/validate");

// Allow All Read/Write Access
routes.get('/', completedCtrl.getAll);
routes.get('/:id', completedCtrl.getOne);
routes.post('/', completedCtrl.postData);
routes.put('/:id', completedCtrl.putData);
routes.delete('/:id', completedCtrl.deleteData);

module.exports = routes;