const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')


//Get All Employees
//=============================
router.get('/',async(req,res)=>{
    console.log(req.body)
    try {
        const employees = await Employee.find()
        res.json(employees)
    } catch (error) {
        res.send(`Error : ${error}`)
    }
})


//Find an Employee
//==================================
router.get('/:id',getEmployee,async(req,res)=>{
    res.json(res.employee)
})


//Create a new Employee
//====================================
router.post('/',async(req,res) =>{

    const empl = new Employee({
        name: req.body.name,
        address: req.body.address,
        position: req.body.position,
        status: req.body.status
    })
    try {
        const emp = await empl.save()
        res.json(emp)
    } catch (error) {
        res.send(`PostError : ${error}`)
    }
})

//Updtae Employee Details
//=====================================
router.patch('/:id',getEmployee,async(req,res) =>{
    if(req.body.name != null){
        res.employee.name = req.body.name
    }
    if(req.body.address != null){
        res.employee.address = req.body.address
    }
    if(req.body.position != null){
        res.employee.position = req.body.position
    }
    if(req.body.status != null && req.body.status == true){
        res.employee.status = true
    }
    if(req.body.status != null && req.body.status == false){
        res.employee.status = false
    }

    try {
        const updateEmployee = await res.employee.save()
        res.json(updateEmployee)
    } catch (error) {
        res.status(400).json({message: "Could not update"})
    }
})


//Delete an Employee
//==========================================
router.delete('/:id',getEmployee,async(req,res)=>{
    try {
        await res.employee.remove()
        res.json({message: 'Employee Deleted'})
    } catch (error) {
        res.status(500).json({message: 'Could not Delete'})
    }
})


//Find Employee function
//==========================================
async function getEmployee(req,res, next){
    let employee
    try {
        employee = await Employee.findById(req.params.id)
        if(employee == null){
            return res.status(404).json({message: 'Could not find the Employee'})
        }
    } catch (error) {
        res.status(500).json({message: 'Could not find the Employee'})
    }

    res.employee = employee
    next();
}

module.exports = router
