const router = require('express').Router();
const verify = require('./passport');

router.get('/',verify, (req,res) => {
    res.json({
        posts : {
            title : "Hi my name is darshan",
            description : "loreum ipsum loreum ipsum loreum ipsum loreum ipsum loreum ipsum"
        }
    });
});

module.exports = router;