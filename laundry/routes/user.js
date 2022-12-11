//import express
const express = require("express")
const app = express()
app.use(express.json())

// import md5
const md5 = require("md5")

//import model
const models = require("../models/index")
const user = models.user
const outlet = models.outlet;

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

//login
app.post("/auth", async (req,res) => {
  
    let result =  await user.findOne({
        where: {username: req.body.username, password: md5(req.body.password)},
        include: [
            "outlet",
            {
                model: models.outlet,
                as : "outlet",
            }
        ]
    })
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})



app.get("/",(req, res) =>{
    user.findAll()
        .then(result => {
            res.json({
                user: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })  
})

app.get("/:id_user",(req, res) =>{
    user.findOne({ where: {id_user: req.params.id_user}})
    .then(result => {
        res.json({
            pet: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint untuk menyimpan data user, METHOD: POST, function: create
app.post("/", (req,res) => {
    let data = {
            nama: req.body.nama,
            username: req.body.username,
            password: md5(req.body.password),
            id_outlet: req.body.id_outlet,
            role: req.body.role
    }

    user.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.put("/:id_user", auth, (req, res) =>{
    let param = { 
        id_paket : req.params.id
    }
    let data = {
        nama: req.body.nama,
        username: req.body.username,
        password: req.body.password,
        id_outlet: req.body.id_outlet,
        role: req.body.role
    }

    user.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint menghapus data kelas, METHOD: DELETE, function: destroy
app.delete("/:id_user", auth, (req,res) => {
    let param = {
        id_user : req.params.id
    }
    user.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
module.exports = app
