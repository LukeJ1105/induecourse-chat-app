//env
import dotenv from 'dotenv'
dotenv.config();
//express
import express from 'express';
import path from 'path';
//routers
import { authRouter, messageRouter } from './routers/index.js';

import cors from 'cors';
import cookieParser from 'cookie-parser'

import {app, server} from './lib/socket.js';

//DB
import { connectDB } from './lib/db.js';

//variables
const port = process.env.PORT
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
 app.use(cors({
     origin: "http://localhost:5173",
     credentials: true
 }))

//Routes
app.use('/api/v1', authRouter)
app.use('/api/v1/messages', messageRouter)

// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
// }

server.listen(port, () =>{
    console.log(`Listening on ${port}`)
    connectDB();
})



