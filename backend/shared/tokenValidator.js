const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const SECRET = process.env.SECRET;

    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, SECRET);
        next();
    }
    catch(error) {
        res.status(401).json({ 
            error: "Unauthorized"
        });
    }
};