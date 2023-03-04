import mongoose from 'mongoose';

async function connectDatabase() {
  try {
    mongoose.set('strictQuery', true);
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDatabase;