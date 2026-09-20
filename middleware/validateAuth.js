function validateRegister(req,res,next) {
    const{name, email, password}= req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            message:"Name,email and password are required"
        });
    }
    next();
}


function validateLogin(req,res,next){
    const{email,password}= req.body;

    if(!email ||!password){
        return res.status(400).json({
            message:"email and password are required"
        });
    }
    if(!email.includes("@")){
        return res.status(400).json({
            message:"please enter a valid email"
        });
    }
    if(password.length < 8){
        return res.status(400).json({
            message:"password must be at least 8 characters"
        });
    }
    next();
}



module.exports = {
    validateRegister,
    validateLogin
};