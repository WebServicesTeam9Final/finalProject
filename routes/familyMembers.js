// "FAMILY MEMBERS" ROUTES

const routes = require('express').Router();
const familyMembersCtrl = require('../controllers/familyMembers');
const { requiresAuth } = require('express-openid-connect');
// const validation = require("../middleware/validate");

// Allow All Read Access
routes.get('/', familyMembersCtrl.getAll);
routes.get('/:id', familyMembersCtrl.getOne);

// Allow Authorized Write Access
routes.post('/', requiresAuth(), familyMembersCtrl.addFamilyMember);
routes.put('/:id', requiresAuth(), familyMembersCtrl.updateFamilyMember);
routes.delete('/:id', requiresAuth(), familyMembersCtrl.deleteData);

module.exports = routes;