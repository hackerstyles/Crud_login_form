const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName: {
        type:mongoose.SchemaTypes.String,
        require:true,
    },
    lastName:{
        type:mongoose.SchemaTypes.String,
        require:true,
    },
    userName:{
        type:mongoose.SchemaTypes.String,
        require:true,
    },
    emailID:{
        type:mongoose.SchemaTypes.String,
        require:true,
    },
    password:{
        type:mongoose.SchemaTypes.String,
        require:true,
    },
    CreatedAt:{
        type:mongoose.SchemaTypes.Date,
        require:true,
        Default:new Date()
    }
}) 



const user = mongoose.model('user',UserSchema);


module.exports = {user};