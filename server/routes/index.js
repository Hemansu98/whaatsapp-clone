const express = require('express');

// bring all routes
const auth = require('./userRoutes');

const router = express.Router();

// configure all routers
router.use('/api/auth', auth);

module.exports = router;