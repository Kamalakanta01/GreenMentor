let mongoose = require("mongoose");

let userSchema = mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
})

let userModule = mongoose.model("User",userSchema);

module.exports={userModule}