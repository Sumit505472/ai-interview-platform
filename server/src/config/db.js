import mongoose from "mongoose"
const DBConnection=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("mongoDB Connected");
    }
    catch(err){
    console.error("DB connection failed", err);
    process.exit(1);
    }
}
export default DBConnection;