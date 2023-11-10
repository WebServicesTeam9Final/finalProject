const express = require('express');
const router = express.Router();
// const auth = require('express-openid-connect');

// const config = {
//     //authorization configuration
// };
// router.use(auth(config));
// router.get('/', (req, res) =>{
//     res.send(req.oidc.isAutheticated() ? 'Logged in' : 'Logged out');
// })

router.use('/', require('/'))
router.use('/', require('/'))
router.use('/', require('/'))

module.exports = router;
