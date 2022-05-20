const express = require('express');


const router = express.Router();


/*======= Rooutes ========*/

/* 
Type: POST
Route: /api/auth/register
Access: PUBLIC
Desc: route for registering a new user 
*/

router.post('/register', (req, res) => {
    console.log('register route');
});

/* 
Type: POST
Route: /api/auth/login
Access: PUBLIC
Desc: route for user login 
*/

router.post('login', (req, res) => {

});


module.exports = router;