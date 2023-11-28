const express = require('express');
const router = express.Router();
const { auth } = require('express-openid-connect');

const config = {
    //authorization configuration
    authRequired: true,
    auth0Logout: true,
    secret: process.env.SESSION_SECRET,
    baseURL: '',
    clientID: '',
    issuerBaseURL: ''
};
router.use(auth(config));

router.get('/', (req, res) =>{
    res.send(req.oidc.isAutheticated() ? 'Logged in' : 'Logged out');
})

// Pull in root controller.
const rootCtrl = require('../controllers');

// Pull in additional routers.
const apiDocs = require('./swagger');
const completed = require('./completed');
const familyMembers = require('./familyMembers');
const temples = require('./temples');
const users = require('./users');

// Establish routes.

// ROOT ROUTE 
router.get('/', rootCtrl.defaultRoute);

// API DOCS
router.use('/api-docs', apiDocs);

// COMPLETED
router.use('/completed', completed);

// FAMILY MEMBERS
router.use('/family-members', familyMembers);

// TEMPLES
router.use('/temples', temples);

// USERS
router.use('/users', users)

module.exports = router;
