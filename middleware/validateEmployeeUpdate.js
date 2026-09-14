const validateEmployeeUpdate = (req, res, next) => {

    const { name, department, salary } = req.body;

    if (name !== undefined && (typeof name !== "string" || !name.trim())) {
        return res.status(400).json({
            message: "Name must be a non-empty string"
        });
    }

    if (department !== undefined && (typeof department !== "string" || !department.trim())) {
        return res.status(400).json({
            message: "Department must be a non-empty string"
        });
    }

    if (salary !== undefined && (typeof salary !== "number" || salary <= 0)) {
        return res.status(400).json({
            message: "Salary must be a positive number"
        });
    }

    next();
};

module.exports = validateEmployeeUpdate;