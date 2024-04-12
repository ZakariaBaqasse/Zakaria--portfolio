import { connect } from "mongoose";

const connection: { isConnected?: number } = {};

export const connectToDB = async () => {
  try {
    if (connection.isConnected) {
      return;
    }
    const db = await connect(process.env.DATABASE_URL!);
    connection.isConnected = db.connections[0].readyState;
  } catch (error: any) {
    console.log("Error in connectToDB", error.message);
  }
};
