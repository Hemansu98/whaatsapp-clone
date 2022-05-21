const express = require('express');

// bring all routes
const auth = require('./authRoutes');
const user = require('./userRoutes');

const router = express.Router();

// configure all routers
router.use('/auth', auth);
router.use('/user', user);

module.exports = router;