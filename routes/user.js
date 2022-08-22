const express = require("express")
const app = express()
const router = express.Router()

const User = require("../models/user.model")

app.use(express.json())

router.get("/", async (req, res) => {
    try {
        const response = await User.find()
        res.send({message: "Done", data: response})
    } catch (err) {
        res.send("Error : " + err)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const response = await User.findById(req.params.id)
        res.send({message: "Done", data: response})
    } catch (err) {
        res.send("Error : " + err)
    }
})

router.post("/", async (req, res) => {
    const user = new User({
        firstname: req.body.firstname,
        surname: req.body.surname,
        gender: req.body.gender,
        dob: req.body.dob,
        password: req.body.password,
        phone: req.body.phone,
        email: req.body.email
    })

    try {
        const response = await user.save()
        res.send({message: "User Save Successfully", data: response})
    } catch (err) {
        res.send("Error :" + err)
    }
})

router.post("/login",async (req,res)=>{
    const surname=req.body.surname
    const password=req.body.password
    try{
        const response=await User.findOne({surname: surname,password:password})
        if(response!==null){
            res.send({message: "Login Successfully", data: response})
        }else {
            res.send({message: "Incorrect Username Password"})
        }
    }catch (err){
        res.send("Error :" + err)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.firstname = req.body.firstname
        user.surname = req.body.surname
        user.gender = req.body.gender
        user.dob = req.body.dob
        user.password = req.body.password
        user.phone = req.body.phone
        user.email = req.body.email
        const response = await user.save()
        res.send({message: "User Updated Successfully", data: response})
    } catch (err) {
        res.send("Error :" + err)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const response = await user.remove()
        res.send({message: "User Deleted Successfully", data: response})
    } catch (err) {
        res.send("Error : " + err)
    }
})

module.exports = router