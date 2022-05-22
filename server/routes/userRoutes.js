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
                return res.status(404).json({ msg: 'User not found.!'});
            if(user['isAvatarSet']) {
                return res.status(200).json({msg: 'Avatar already set'});
            }
            let payload = {};
            payload['isAvatarSet'] = true;
            payload['avatar'] = avatar;
            await User.updateOne({_id: id}, {$set: payload}, {new : true});
            return res.status(200).json({msg: 'User avatar has been set'});
        }
        catch(err) {
            return res.status(503).json({ msg: 'Internal Server Error.!' });
        }
});

router.get('/contacts/:id',
    passport.authenticate('jwt', {session: false}),
    async (req, res) => {
        const id = req.params['id'];
        try {
            let users = await User.find({_id: {$nin: [id]}})
                .select([
                    "email",
                    "username",
                    "avatar",
                    "_id",
                ]);
            
            res.status(200).json({users});
        }
        catch(error) {
            res.status(503).json({error});
        }
});

module.exports = router;