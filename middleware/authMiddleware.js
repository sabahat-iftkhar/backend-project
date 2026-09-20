const jwt = require("jsonwebtoken");

function authenticateToken(req,res,next) {
    const authHeader = req.headers.authorization;



    if(!authHeader){
        return res.status(401).json({
            message:"access token required"
        });
    }

    if(!authHeader.startsWith("Bearer ")){
        return res.status(400).json({
            message:"invalid authorization format"
        });
    }


    const token= authHeader.split(" ")[1];
    
    try{

        const decoded= jwt.verify(  //jwt.sign makes token and jwt.verify checks the token
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;// store the verified user information in request
        next();
    }
    catch(error){
        console.log("JWT ERROR:",error.message);

        return res.status(403).json({
            message:"invalid or expire token"
        });
    }
}

module.exports = authenticateToken;