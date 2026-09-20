const bcrypt = require("bcrypt");
const db = require ("../config/db");
const jwt = require("jsonwebtoken");


async function registerUser(req,res,next) {
    try{
        const {name,email,password}=req.body;

        const cleanName= name.trim();
        const cleanEmail = email.trim().toLowerCase();

        const hashedPassword = await bcrypt.hash(password,10);

        const sql = `
        insert into users(name,email,password)
        values(?,?,?)
        `;

        db.query(sql,
            [cleanName,cleanEmail,hashedPassword],
            (error,result)=>{
                if(error){
                    return next (error);
                }
                res.status(201).json({
                    message:"user registered successsfully",
                    userID: result.insertId
                });
            }
        );
    } catch(error){
        next(error);
    }
}

async function LoginUser(req,res,next){
    try{
        const {email,password} = req.body;
        const cleanEmail= email.trim().toLowerCase();

        const sql =`select *from users where email = ?`; //? it is parameterized query to prevent sql injection
        
        db.query(sql,[cleanEmail],async (error,results) =>{
            if(error){
                return next(error);
            }
            if (results.length ===0){
                return res.status(401).json({
                    message:"invalid email or password"
                });
            }
            const user = results[0];

            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );
            if(!passwordMatch){
                return res.status(401).json({
                    message:"invalid email or password"
                });
            }

            const token = jwt.sign(
                {id: user.id , email: user.email ,role: user.role},
                process.env.JWT_SECRET,
                {expiresIn:"1h"}
            );



            res.json({
                message:"login successful",
                token: token//left side token means response field ka naam and right side token means jwt token we created through jwt.sign()
            });
        });
    } catch(error){
        next(error);
    }
}

async function getProfile(req, res,next) {
    try{
        const sql=`
        select id ,name,email,created_at,role
        FROM users
        where id=?
        `;
        
        db.query(sql,[req.user.id],(error,results)=>{
            if(error){
                return next(error);
            }
            if(results.length==0){
                return res.status(404).json({
                    message:"user not found"
                });
            }
            res.json({
                user: results[0]
            });
        });
    } catch(error){
        next(error);
    }
}


module.exports ={
    registerUser,
    LoginUser,
    getProfile
};