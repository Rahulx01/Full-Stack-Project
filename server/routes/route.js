import express from 'express';
import userSchema from '../models/userSchema.js';
import { generateToken } from './jw_token.js';
import { generateUniqueString } from './generateRoomCode.js';
import activeRoomSchema from '../models/activeRoom.js';
const rrr = (req, res, next) => {
    console.log("from middleware");
    next();
}

const route = express.Router();
// Define your routes...
route.get('/', async (req, res) => {
    try {
        const JWtoken = req.headers.authorization? req.headers.authorization : (req.headers.cookie).replace("JWtoken=", "");
        if (JWtoken == undefined) return res.status(401).json({message:"The token is undefined!"});
        const user = await userSchema.findOne({ token: JWtoken });
        if (user)   return res.status(200).json(user); // User is logged in
        else    return res.status(401).json({message:"The token is undefined!"});  // User is not logged in

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


route.post('/login', async (req, res) => {
    const { uname, passwd } = req.body;
    if (!uname || !passwd) {
        return res.json({ msg: "Please enter credentials in the proper manner" });
    }
    const user = await userSchema.findOne({ username: uname, password: passwd });
    if (user) {
        // Username and password combination exists in MongoDB

        let token = generateToken(uname);
        try {
            res.cookie("JWtoken", token, {
                expires: new Date(Date.now() + 6900000),
                withCredentials: true,
                httpOnly: true,
                secure: true,
                sameSite: "None"
            });
            user.token = token;
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            console.log("I am catch error " + e);
        }
    } else {
        // Username and password combination does not exist in MongoDB
        return res.status(404).json({ msg: "Invalid username or password." });
    }
});


route.post('/Yudhister', async (req, res) => {
    //console.log(req.body.email);
    const { email, uname, passwd, ProfilePic } = req.body;
    try {
        if (!email || !uname || !passwd) {
            return res.status(422).json({ error: "Plz filled the field properly" });
        }
        if (await userSchema.findOne({ username: uname })) {
            return res.status(422).json({ error: "This username already exists!" });
        }
        let token = generateToken(uname);
        const newUser = new userSchema({
            email: email,
            username: uname,
            password: passwd,
            points: 0,
            token: token,
            ProfilePic:ProfilePic
        });
        res.cookie("JWtoken", token, {
            expires: new Date(Date.now() + 2592000),
            withCredentials: true,
            httpOnly: true,
            secure: true,
            sameSite: "None"
        });
        await newUser.save();
        res.status(201).json({user:newUser});
    } catch (err) {
        console.log("This is from yudhister error ", err);
    }
});

route.get("/host",async (req,res) => {
    
    const JWtoken = req.headers.authorization? req.headers.authorization : (req.headers.cookie).replace("JWtoken=", "");
    const user = await userSchema.findOne({ token: JWtoken });
    if(!user) return res.status(200).json({message:"User not logsged in"});
    let roomCode;
    try{
        let room = true;
        while(room){
            roomCode = generateUniqueString(10);
            room = await activeRoomSchema.findOne({roomCode:roomCode});
        }
        const newRoom = new activeRoomSchema({
            roomCode: roomCode,
            host: user.username
        });
        await newRoom.save();
    }catch(e){
        console.log("The error is : ",e);
    }
    // console.log("room code : ",roomCode);
    return res.status(200).json({message:"Succesfull",roomCode:roomCode});
});

route.get('/:roomcode',async (req,res) => {
    const JWtoken = req.headers.authorization? req.headers.authorization : (req.headers.cookie).replace("JWtoken=", "");
    const user = await userSchema.findOne({ token: JWtoken });
    const roomcode = req.params.roomcode;
    const room = await activeRoomSchema.findOne({roomCode:roomcode});
    if(room){
        if(user && room.host == user.username) return res.status(200).json({message:"you r host",room: room});
        else{
            room.members.addToSet(user.username);
            await room.save();
            return res.status(201).json({message:"you r member",room: room});
        }
    }
    return res.status(203).json({message:"No room found"});
})

export default route;
