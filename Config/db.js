import mongoose from "mongoose";

const connectDb2 = async () => {
  try {
    const connectionData = await mongoose.connect(process.env.MONGO_URI);
    console.log(` connected to MongoDB: ${connectionData.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

export { connectDb2 };
