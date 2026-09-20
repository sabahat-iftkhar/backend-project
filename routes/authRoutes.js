const express = require("express");

const router = express.Router();// make separate authentication router

const {
    registerUser,
    LoginUser,
    getProfile
} = require("../controllers/authController");

const authenticateToken = require("../middleware/authMiddleware");

const {
    validateRegister,
    validateLogin
}= require("../middleware/validateAuth");



//routes
router.post("/register",validateRegister, registerUser);
router.post("/login",validateLogin, LoginUser);
router.get("/me",authenticateToken,getProfile);

module.exports = router;