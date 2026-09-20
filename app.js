require("dotenv").config();//encironment variable

const express = require("express");//server
const app = express();
const cors = require("cors");//cross-origin requests
const helmet= require("helmet");//security headers
const rateLimit = require("express-rate-limit");//request limiting
const employeeRoutes = require("./routes/employeeRoutes.js");
const authRoutes = require("./routes/authRoutes.js");
const errorHandler = require("./middleware/errorHandler");

const limiter = rateLimit({
    windowMs: 15 * 60 *1000,
    max: 100
});


app.use(cors());//cross-origin browser requests ke rules
app.use(helmet());//security related http headers
app.use(limiter);
app.use(express.json());//json request body ko read krnw

app.use("/employees",employeeRoutes);
app.use("/auth", authRoutes);

//error handler always after routes
app.use(errorHandler);




app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});