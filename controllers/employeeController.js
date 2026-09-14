const db = require("../config/db");

function createEmployee(req,res,next) {

    const {name,department,salary}= req.body;

    const sql =`
    insert into employees(name,department,salary)
    values(?,?,?)
    `;

    db.query (sql ,[name, department, salary],(error,result)=>{
        if(error) {
            return next(error);
        }

        res.status(201).json({
            Message: "employees created successfully",
            employeeId : result.insertId
        });
    });
}

function getEmployees(req,res,next) {
    const sql = "select * from employees";

    db.query(sql,(error,results)=>{
        if(error){
            return next(error);

        }

        res.status(200).json(results);
    });
}

function getEmployeeID(req,res,next) {
    const employeeID = Number(req.params.id);

    const sql ="select * from employees where id =?";

    db.query(sql, [employeeID], (error,results)=>{
        if(error){
            return next(error);
        }
        if(results.length === 0){
            return res.status(404).json({
                message:"employee not found"
            });
        }

        res.status(200).json(results[0]);
    });

}

function updateEmployee(req, res, next) {
    const employeeID = Number(req.params.id);

    const {name, department, salary} = req.body;

    const sql=`
    update employees
    set
    name =COALESCE(?,name),
    department=COALESCE(?,department),
    salary = COALESCE(?,salary)
    where id =?
    `;

    db.query(sql,
        [name,department,salary,employeeID],(error,result)=>{
            if (error){
                return next(error);
            }

            if(result.affectedRows===0){
                return res.status(400).json({
                    message: "employee not found"
                });
            }

            res.json({
                mesage:"employee updated successfully"
            });
        }
    );
}

function deleteEmployee(req,res,next){

    const employeeID = Number(req.params.id);

    const sql ="delete from employees where id =?";

    db.query(sql , [employeeID],(error,result)=>{
        if (error){
            return next (error);
        }
        if(result.affectedRows === 0 ){
            return res.status(404).json({
                message:"employee not found"
            });
        }
        res.json({
            message:"employee deleted successfully"
        });
    });

}










module.exports ={
    createEmployee,
    getEmployees,
    getEmployeeID,
    updateEmployee,
    deleteEmployee
};