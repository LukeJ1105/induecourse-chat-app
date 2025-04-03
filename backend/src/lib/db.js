import mongoose from 'mongoose';

export const connectDB = async() =>{

    try {
        const con = await mongoose.connect(process.env.DBURL);
        console.log(`Connect DB to ${con.connection.host}`)
    } catch (error) {
        console.log(`Connection to DB failed ${error}`);
    };
   
    
}