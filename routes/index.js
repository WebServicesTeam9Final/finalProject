const express = require('express');
const router = express.Router();
const tools = require('../tools');
const { auth } = require('express-openid-connect');

// Pull in root controller.
const rootCtrl = require('../controllers');

// Load additional routers.
const apiDocs = require('./swagger');
const completed = require('./completed');
const familyMembers = require('./familyMembers');
const temples = require('./temples');
const users = require('./users');

// Authorization configuration
const config = {
    authRequired: true,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

if (process.env.npm_lifecycle_event !== 'test') {
  router.use(auth(config));
  tools.log('OpenID Connect initialized.');
}

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

// req.isAuthenticated is provided from the auth router
router.get('/status', rootCtrl.statusRoute);

module.exports = router;
