import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);
    
} catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message || err);
    process.exit(1); 
  }
};

export default connectDb;
