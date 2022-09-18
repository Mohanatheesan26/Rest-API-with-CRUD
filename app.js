const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb://localhost/EmployeeDB'
const bodyParser = require('body-parser')
const app = express()

mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

con.on('open', function(){
    console.log('DB Connected............')
})

const employeeRouter = require('./routes/employees')
app.use(bodyParser.json())
app.use('/employees',employeeRouter)

app.use(express.json())

const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Employee app listening on port ${port}!`))