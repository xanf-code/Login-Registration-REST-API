const jwt = require('jsonwebtoken');

module.exports = function (req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(400).send("ACCESS DENIED!");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SEC);
        req.user = verified;
        next();
    } catch (e) {
        res.status(400).send('Invalid Token');
    }
};