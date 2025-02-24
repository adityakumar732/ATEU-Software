const Aunthenticated = require('../Middlewares/AauthMiddleware');

const router = require('express').Router();

router.get('/',Aunthenticated,(req,res)=>{
  console.log("logged In ", req.user)
    res.status(200).json([
        {
            name: "Mobile",
            price: 10000
        },
        {
            name: "TV",
            price: 20000
        }
    ])
})

module.exports = router;