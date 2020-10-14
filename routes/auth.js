const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {RegistrationValidation, LoginValidation} = require('../validation');

router.post('/register', async (req,res) => {

    const {error} = RegistrationValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // @check user exists
    const userexist = await User.findOne({email : req.body.email});
    if(userexist) return res.status(400).send("User Already Exists in the database");

    // @Hashing Password
    const salt = await bcrypt.genSalt(10);
    const hash_pass = await bcrypt.hash(req.body.password, salt);

    // @New User
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hash_pass
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/login' , async (req,res) => {
    const {error} = LoginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // @Check User Exists?
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send("You need to Register before trying to login!");

    // Password is correct ?
    const password_check = await bcrypt.compare(req.body.password , user.password);
    if(!password_check) return res.status(400).send("Password is worng!");

    // Create, Assign and Display token!
    const token = jwt.sign({_id: user._id,email: user.email}, process.env.TOKEN_SEC);
    res.header('auth-token',token).send(token);

    res.send("Successfully LoggedIn!"); 
});

module.exports = router;