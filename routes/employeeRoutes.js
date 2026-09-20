const express = require("express");
const validateEmployee = require("../middleware/validateEmployee");
const validateEmployeeUpdate = require("../middleware/validateEmployeeUpdate");
const {
    createEmployee,
    getEmployees,
    getEmployeeID, 
    updateEmployee, 
    deleteEmployee
}= require("../controllers/employeeController");

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole");
const db = require("../config/db");



const router = express.Router();

//get all employees
router.get("/",authenticateToken, getEmployees);


// get one employee
router.get("/:id" , getEmployeeID);


router.post("/", authenticateToken,
    authorizeRole("admin"),
    validateEmployee,
    createEmployee
);


router.patch("/:id",
    authenticateToken,
    authorizeRole("admin"),
    validateEmployeeUpdate,
    updateEmployee);

router.delete("/:id",
    authenticateToken,
    authorizeRole("admin"), 
    deleteEmployee);

 













module.exports = router;

