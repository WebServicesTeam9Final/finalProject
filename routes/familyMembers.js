// "FAMILY MEMBERS" ROUTES

const routes = require('express').Router();
const familyMembersCtrl = require('../controllers/familyMembers');
// const validation = require("../middleware/validate");

// Allow All Read/Write Access
routes.get('/', familyMembersCtrl.getAll);
routes.get('/:id', familyMembersCtrl.getOne);
routes.post('/', familyMembersCtrl.addFamilyMember);
routes.put('/:id', familyMembersCtrl.updateFamilyMember);
routes.delete('/:id', familyMembersCtrl.deleteData);

module.exports = routes;