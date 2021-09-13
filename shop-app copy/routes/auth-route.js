const router = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth =  require('../middleware/check-auth')
router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.json({ success: false, message: "Hasing issue" })
        } else {
            const user = new User({
                displayName: req.body.displayName,
                email: req.body.email,
                password: hash,
            })
            user.save()
                .then((_) => {
                    res.json({ success: true, message: "account has been created" })
                })
                .catch((err) => {
                    if (err.code === 11000) {
                        return res.json({ success: false, message: "Email already Exists" })
                    }
                    res.json({ success: false, message: "Auth Failed" })
                })
        }
    })
});

router.post('/login', (req, res) => {
    User.find({email: req.body.email})
        .exec()
        .then((result) => {
            if(result.length < 1) {
                return res.json({success: false, messgae: "User not found"})
            }
            const user = result[0];
            bcrypt.compare(req.body.password, user.password, (err, ret) => {
                if(ret) {
                    const payload = {
                        userId : user._id
                    }
                    const token  = jwt.sign(payload, "webBatch")
                    return res.json({success: true, token:token, message: "Login Successful"})
                }else{
                    return res.json({success: false, message: "Password do not macthed"})
                }
            })
        }).catch(err => {
            res.json({success: false, messsgae: "Auth Failed"})
        })
})

router.get('/profile', checkAuth,  (req, res) => {
    const userId = req.userData.userId;
    User.findById(userId)
        .exec()
        .then((result) => {
            res.json({success: true, data: result})
        }).catch(err => {
            res.json({success: false, message: "Server error"})
        }) 
})

module.exports = router