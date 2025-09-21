import mongoose  from "mongoose";
const connectDatabase = async() : Promise <void> => {
    try{
        const MONGO_URI = process.env.MONGODB_URI
        if(MONGO_URI != undefined){
            await mongoose.connect(MONGO_URI)
            console.log("connected successfully to mongodb")
        }
    }
    catch(error){
        console.log("mongodb connection error")
        process.exit(1)
    }
}
mongoose.connection.on("disconnected", () => console.log("connection disconnected"))
mongoose.connection.on("error", () => console.log("An error occurred"))
export default connectDatabase ;