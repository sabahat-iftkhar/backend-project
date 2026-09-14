function validateEmployee(req,res,next){

    const {name,department,salary} = req.body;

    if(typeof name !== "string" || !name.trim()){
        return res.status(400).json({
            message: "Name must be a non-empty string"
        });
    }

    if(typeof department !== "string" || !department.trim()){
        return res.status(400).json({
            message: "Department must be a non-empty string"
        });
    }

    if(typeof salary !== "number" || salary <= 0){
        return res.status(400).json({
            message: "Salary must be a positive number"
        });
    }
    req.body.name = name.trim();
    req.body.department = department.trim();

    next();
}

module.exports = validateEmployee;