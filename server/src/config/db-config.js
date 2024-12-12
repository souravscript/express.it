import mongoose from "mongoose";

const MONGO_PASSWORD="wOvnYV3vrrLkJi3J"
const MONGO_URI="mongodb+srv://souravshivam1857:wOvnYV3vrrLkJi3J@express-db.xzfcd.mongodb.net/express-db?retryWrites=true&w=majority&appName=express-db"

export const connectToDatabase = async () => {
    try{
        if (mongoose.connections[0].readyState) {
            // If already connected, return the existing connection
            return;
          }
          if (!MONGO_URI) {
            throw new Error('Please define the MONGODB_URI in the .env.local file');
          }
        
          const connect=await mongoose.connect(MONGO_URI);
          if(connect){
            console.log("DB connected")
          }
    }catch(err){
        console.log("error at ",err)
    }
  };
  
  