import jwt from 'jsonwebtoken';     //Auth Js

export function generateToken(username){
    let token;
    try{
        token = jwt.sign({user:username},process.env.SECRET_KEY);
    }
    catch(err){
        console.log(err);
    }
    return token;
}
