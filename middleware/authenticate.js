const jwt = require('jsonwebtoken');
const User = require('../models/User');

let authenticate = (req, res, next) => {
    let token = req.header('Authorization');
	try{
		jwt.verify(token, 'secret', (err, decoded) => {
            if(err){
                const errors = {name: 'Token error in try verify'}
                console.log('jwt error')
                return res.status(401).json(errors)
            }
            User.findOne({_id: decoded.id}).then((user) => {
                if(!user){
                    errors.email = 'User not found';
                    return res.status(404).json(errors);
                }
                console.log('go next')
                req.user = user;
                next()
            }).catch(e => {
                const errors = {name: 'User not found!!'}
                console.log('user not found')
                return res.status(404).json(errors)
            })
        });
	}catch(e){
        const errors = {name: 'Token error'}
        console.log('jwt try catch')
        return res.status(401).json(errors)
    }
};

module.exports = {authenticate};