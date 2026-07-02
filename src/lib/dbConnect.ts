import mongoose from 'mongoose';

type connectionObject = {
    isConnected?: number;
};

const connection: connectionObject = {}

async function dbConnect() {
    if(connection.isConnected) {
        console.log("Already connected to database");
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/nids",{});
        connection.isConnected = db.connections[0].readyState;
        console.log("Connected to database");
    } catch (error) {
        console.error("Error connecting to database:", error);
        process.exit(1); // Exit the process with an error code
    }
}

export default dbConnect;