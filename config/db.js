import mongoose from "mongoose";
import config from "config";

const db = config.get("mongoURI");

const connectionDB = async () => {
  try {
    const connection = await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const url = `${connection.connection.host}:${connection.connection.port}`;
    console.log(`MongDB is connected on ${url}`);
  } catch (error) {
    console.log(error);
    // EXIT PROCCESS WITH FAILURE
    process.exit(1);
  }
};

export default connectionDB;
