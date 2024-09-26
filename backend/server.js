import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from "./config/database.js";
import cloudinary from "cloudinary";
// Handling Uncought Exception
process.on("uncaughtException",(err)=>{
    console.log(`Error :${err.message}`);
    console.log(`shutting down the server due to uncaught exception`);
    process.exit(1);
});


dotenv.config({path:"backend/config/config.env"});

// DB connection------>
connectDatabase();
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});

app.get("/",(req,res)=>{
    console.log("hello");
    res.send("hello ");

})
const server = app.listen(process.env.PORT,(req,res)=>{
    console.log("server is listening on port 8080 ");
});
// Unhandled promise rejection
process.on("unhandledRejection",err=>{
    console.log(`Error :${err.message}`);
    console.log(`shutting down server due to unhandled promise rejection`);
    server.close(()=>{
    process.exit(1);
    });
});