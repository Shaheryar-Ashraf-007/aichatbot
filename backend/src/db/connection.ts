import { connect, disconnect } from "mongoose";

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL as string);
  } catch (error) {
    console.log("Error connecting to database", error);
    throw new Error("Error connecting to database");
  }
}


async function disconnectFromDatabase() {
  try {
    await disconnect();
  } catch (error) {
    console.log("Error disconnecting from database", error);
    throw new Error("Error disconnecting from database");
  }
}

export { connectToDatabase, disconnectFromDatabase };
