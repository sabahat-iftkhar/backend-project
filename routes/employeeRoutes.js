const express = require("express");
const validateEmployee = require("../middleware/validateEmployee");
const validateEmployeeUpdate = require("../middleware/validateEmployeeUpdate");
const {createEmployee,getEmployees, getEmployeeID, updateEmployee, deleteEmployee}= require("../controllers/employeeController");
const db = require("../config/db");



const router = express.Router();

//get all employees
router.get("/", getEmployees);



// get one employee
router.get("/:id" , getEmployeeID);


router.post("/",validateEmployee, createEmployee);


router.patch("/:id",validateEmployeeUpdate, updateEmployee);

router.delete("/:id", deleteEmployee);

 













module.exports = router;

