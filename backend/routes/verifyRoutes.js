const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/idToken', (req, res, next) => {
    const SECRET = process.env.SECRET;

    try {
        if(jwt.verify(req.body.idToken, SECRET)) {
            return res.status(200).json({
                status: true
            })
        }
    }
    catch(err) {
        return res.status(401).json({
            status: false
        })
    }


})

module.exports = router;