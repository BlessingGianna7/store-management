const {User} = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

exports.createUser = async(req,res)=>{
    try{
        const {name,email,password} = req.body

        let findUserByEmail = await User.findOne({email: email})
        if(findUserByEmail) return res.status(400).send("User with the email already exists");

        let user = new User();
        user.name = name
        user.email = email

        const salt = await bcrypt.genSalt(10)
        user.password =  await bcrypt.hash(password,salt)

        await user.save()
        res.status(200).send(user);

    }
    catch(err){
        console.error(err);
        res.status(500).send(err)
    }
}

exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body

        let findUserByEmail = await User.findOne({email: email})
        if(!findUserByEmail) return res.status(404).send("Invalid email or password!")

        let checkPassword = await bcrypt.compare(password,findUserByEmail.password)
        if(!checkPassword) return res.status(400).send("Invalid email or password!")

        const token = findUserByEmail.generateToken();

        res.status(200).send(token)

    }
    catch(err){
        console.error(err);
        res.status(500).send(err)
    }
}

exports.getProfile = async(req,res)=>{
    try{
        const token = req.header('Auth')
        if(!token) return res.status(404).send("Please provide a token")

        const object = jwt.verify(token,process.env.JWT)
        const id = object.id

        const userProfile = await User.findById(id)
        if(!userProfile) return res.status(404).send("Invalid user")

        res.status(200).send(userProfile)
    }
    catch(err){
        console.error(err);
        res.status(500).send(err)
    }
}