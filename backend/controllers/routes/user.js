// EXPRESS ROUTER IMPORT
const express = require('express');
const router = express.Router();

// CONTROLLERS && MIDLEWARES IMPORTS
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById, read, update } = require('../controllers/user');

// ROUTES
router.get('/secret/:userId', requireSignin, isAuth, isAdmin,  (req, res) => {
    res.json({
        user: req.profile
    });
});
router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);

router.param('userId', userById);

module.exports = router;