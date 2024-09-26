import mongoose from "mongoose";
const connectDatabase=()=>{
mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("Connected to database")});}
export default connectDatabase;

