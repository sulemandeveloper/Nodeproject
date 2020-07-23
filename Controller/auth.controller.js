const MongoServices = require('../Services/auth.services');
const bcrypt = require("bcryptjs");
const userSchema = require('../Schema/auth.schema');

module.exports.createUser = async (req , res) => {
    console.log("my data is", req.body)
    newUser = new User(req.body);
    const validation = userSchema.SignUpSchema.validate(req.body);
    if (validation.error) {
        console.log(validation.error);
        return res.status(400).json({
            message: validation.error.details[0].message,
        });
    }
    try{
        const email  = req.body.email
        console.log("email", email)

        const user = await MongoServices.checkUser(email)
        if (user) {
            res.status(401).json({
                message:"user has been already register"
            })
        }
        const data = await MongoServices.createUser(newUser)
        res.status(201).json({
            message: "Account is successfully created and email has been sent."
        });
        console.log("my data" , data)
    }
    catch(error){
        res.json(error)
    }
}


module.exports.signinUser = async (req , res) => {
    console.log("my sign in request", req.body)
    const validation = userSchema.SignInSchema.validate(req.body);
    if (validation.error) {
        console.log(validation.error);
        return res.status(400).json({
            message: validation.error.details[0].message,
        });
    }
    try{
        const {email , password} = req.body
        const user = await MongoServices.checkUser(email)
        if (user){
            // password compare
            bcrypt.compare(password , user.password).then(isMatch => {
                if(isMatch){
                    res.status(201).json({
                        message: "Successfully Login!"
                    })
                }
                else{
                    res.status(401).json({
                        message: "password is not correct"
                    })
                }
            })

        }
        else {
            res.status(404).json({
                message: "User is not register"
            })
        }
    }
    catch(error){
      res.json(error)
    }
}