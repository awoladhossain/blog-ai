import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "blog_app_ai",
    });
    console.log(
      `MongoDB Connected: ${conn.connection.host} DbName: ${conn.connection.name}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
