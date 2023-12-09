// "COMPLETED" ROUTES

const routes = require('express').Router();
const completedCtrl = require('../controllers/completed');
// const validation = require("../middleware/validate");

// Allow All Read/Write Access
routes.get('/', completedCtrl.getAll);
routes.get('/:id', completedCtrl.getOne);
routes.post('/', completedCtrl.addCompletedPerson);
routes.put('/:id', completedCtrl.updateCompletedPerson);
routes.delete('/:id', completedCtrl.deleteData);
routes.get('/?gender=Female', completedCtrl.getAll);

module.exports = routes;