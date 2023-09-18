const express = require("express");
const app = express();
const path =require("path");
const hbs =require("hbs");
const Register =require("./models/registers");
const bcrypt =require("bcryptjs");
require("./db/conn");

const {json} =require("express");

const  port = process.env.PORT||3000;

const static_path =path.join(__dirname,"../public");
const template_path =path.join(__dirname,"../src/views"); 
const partials_path =path.join(__dirname,"../src/partials"); 

app.use(express.json()); //help for postman data showing.
//getting form data ,send to backend
app.use(express.urlencoded({extended:false}));



app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);


app.get("/register",(req,res)=>{
    res.render("register");
})
app.get("/login",(req,res)=>{
    res.render("login");
})




//receiving registraton data and sending it to database 
app.post("/register", async (req,res)=>{
    try{
        const password =req.body.password;
        const cpassword =req.body.confirmpassword;

        if(password === cpassword ){
            const registerEmployee=new Register({
                Username:req.body.Username,
                email :req.body.email,
                password:req.body.password,
                confirmpassword:req.body.confirmpassword,
                contact:req.body.contact,
                email:req.body.email,
                gender:req.body.gender
            })

            //code at registers.js
            const registered =await registerEmployee.save();
            res.status(201).render("index");

        }else if(password !== cpassword){
            res.send("Password is not matching");
        }else if(Username === null){
            res.send("Please enter email")
        }

    } catch(error){
        res.status(400).send("Please enter details");
    }
})


//login check
app.post("/login",async(req,res)=>{
    try {
        const Usernam =req.body.Username;
        const password =req.body.password;

        console.log(`${Usernam} and password is ${password}`);

        const name=await Register.findOne({Username:Usernam});

        const isMatch =await bcrypt.compare(password, name.password);
        if(isMatch){
            res.status(201).render("index");
        }else{
            res.send("Password is not matching");
        }
    } catch (error) {
        res.status(400).send("Not authentified");
    }
})
 
/*app.get("/",(req,res)=>{
    res.send("Hello from arvind suthar")
}); for reading public folder*/


/*encrypting the password
const bcrypt =require("bcryptjs");
const securepassword =async(password)=>{ 
    const passwordHash =await bcrypt.hash(password,10); //encoding the password 10 is no.of rounds
    console.log(passwordHash);
    const passwordmatch =await bcrypt.compare(password,passwordHash); //comparing the password 
    console.log(passwordmatch);
}
securepassword("password"); */


app.listen(port,()=>{
    console.log(`server is running on port no ${port}`);
});