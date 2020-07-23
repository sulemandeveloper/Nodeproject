const express =require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const user = require("./Router/auth.router");
const bodyParser = require("body-parser");

mongoose.connect(process.env.MONGODB_CONNECTION_STRING,{
    useNewParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("DB Connected"))
.catch((error) => {
    console.log("error connection" , error.message)
})
const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.get('/',(req, res) => res.json("api is correct successfully"))

app.use(bodyParser.json());
app.use("/user" , user)
const PORT =process.env.PORT || 3002

app.listen(PORT , () => {
    console.log(`server start on: ${PORT}`)
})