const express = require("express");

const app = express();

const employeeRoutes = require("./routes/employeeroutes.js");

const errorHandler = require("./middleware/errorHandler");



app.use(express.json());

app.use("/employees",employeeRoutes);

app.use(errorHandler);




app.listen(3000, () => {
    console.log("Server running on port 3000");
});