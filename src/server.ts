import app from "./app";
import connectDatabase from "./utils/database";

const PORT = process.env.PORT || 5006;
const startServer = async() : Promise<void>=>{
     try{
        await connectDatabase();

        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        })
     }catch(error){
        process.exit(1)
     }    
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('❌ Uncaught Exception:', err.message);
  process.exit(1);
});

startServer()
