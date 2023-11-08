import mongoose from 'mongoose';

const user = mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    points:Number,
    token:{
        type:String
    },
    ProfilePic:String
});

const userSchema = mongoose.model('user',user);

export default userSchema;    