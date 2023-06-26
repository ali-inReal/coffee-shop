const express = require('express');
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require("body-parser")
const app = express();



app.use(cors())
app.use(bodyParser.json())

const con  = mysql.createConnection({
    user:"root",
    password:"",
    database:"wada3",
    host: "localhost"
})

con.connect((err)=>{
    if(!err)
    {
        console.log("Connected Successfully")
    }
})


app.get('/:category',(req,res)=>{
    const q = `select * from ${req.params.category}`
    con.query(q,(err,result)=>{
        if(!err)
        {
            res.send(result)
        }
        else
        {
            res.send("Query nai chali")
        }
    })
    
})

app.post('/accountant',(req,res)=>{
    console.log(req.body.order)
    for (let index = 0; index < req.body.order.length; index++) {
        const q = `insert into accountant(name,price,quantity) values ("${req.body.order[index].name}",${req.body.order[index].price},${req.body.order[index].quantity})`
        con.query(q,req.body.order,(err,result)=>{
            if(err)
            console.log(err)
        })     
        
    }
   res.send("table mein gya")
})


app.get('/accountant',(req,res)=>{
    const q = "select * from accountant"
    con.query(q,(err,result)=>{
        if(!err)
        {
            res.send(result)
        }
    })
})


app.listen(3000,()=>{
    console.log("Server Running")
})