const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const User = mongoose.model('UserModel');

const router = express.Router();


/*
Type:- PATCH
Route:- /user/setavatar/:id
Access:- Private
Desc:- Route for setting user avatar
*/
router.patch('/setavatar/:id', 
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        let { avatar } = req.body;
        let id = req.params['id'];
        try {
            let user = await User.findById(id);
            if(!user) 
                res.status(404).json({ msg: 'User not found.!'});
            let payload = {};
            payload['isAvatarSet'] = true;
            payload['avatar'] = avatar;
            await User.updateOne({_id: id}, {$set: payload}, {new : true});
            return res.status(200);
        }
        catch(err) {
            res.status(503).json({ msg: 'Internal Server Error.!' });
        }
});

module.exports = router;