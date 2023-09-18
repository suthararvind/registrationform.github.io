const mongoose =require("mongoose");
const bcrypt =require("bcryptjs");
const employeeSchema =new  mongoose.Schema({
    Username:{
        type :String,
        required:true
    },
    password:{
        type : String,
        required: true
    },
    confirmpassword:{
        type : String,
        required: true
    },
    contact:{
        type : Number,
        required : true,
        unique :true
    },
    email:{
        type : String,
        required: true,
        unique:true
    },
    gender:{
        type : String,
        required: true
    }

})

employeeSchema.pre("save",async function(next){ //before saving password (pre) as middleware

    if(this.isModified("password")){ //agar password mofify hota h toh
        console.log(`the current password is ${this.password}`); //before encrypting
        this.password = await bcrypt.hash(this.password,10);
        console.log(`the current password is ${this.password}`); // affter encrypting

        this.confirmpassword=undefined; //confirm password wont get stored.
    }
    next();
})

//creating collections Register =>in db Registers bcz to plural
const Register =new mongoose.model("Register",employeeSchema);
module.exports =Register;