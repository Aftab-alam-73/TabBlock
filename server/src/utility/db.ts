import mongoose from "mongoose"

export const connectToDatabase=()=>{
mongoose.connect(process.env.DATABASE_URL!)
.then(()=>{
    console.log("Database connection established");
})
.catch((error:unknown)=>{
    console.error("Failed to establish database connection", error);
    process.exit(1); // Exit the process with an error status 
})
}