import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
import route from './routes/route.js';
import cookieParser from "cookie-parser";

//Handling routes
const app = express();
// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization"
}));
app.use(express.static('images'));
app.use(express.json());
app.use(route);
app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Your server is running ta port: ${PORT}`);
})


//Connection with mongoDB
dotenv.config();
const UNAME = process.env.DB_USERNAME;
const PASSWD = process.env.DB_PASSWORD;
const URL = `mongodb://localhost:27017/websiteMainDB`;
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:');
});