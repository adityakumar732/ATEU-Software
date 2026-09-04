
const jwt = require('jsonwebtoken')

const Aunthenticated = (req,res,next)=>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403)
        .json({message: "Unauthorized, JWT token is require"});
    }
    try{
       const token = auth.startsWith("Bearer ")
    ? auth.split(" ")[1]
    : auth;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({message: "Unauthorized, JWT token wrong or expired"});
    }
}

module.exports = Aunthenticated;


