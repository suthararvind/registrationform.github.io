const mongoose =require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/youtubeRegistration",{

}).then(()=>{
    console.group(`connection successful`);
}).catch((e)=>{
    console.group(`no connection is established`);
})
