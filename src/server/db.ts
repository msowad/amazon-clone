import mongoose from 'mongoose';

type connectionType = { isConnected?: boolean };

const connection: connectionType = {};

const connect = async () => {
  if (connection.isConnected) {
    console.log('Mongoose is already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState === 1;
    if (connection.isConnected) {
      console.log('Mongoose is already connecting');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGO_URI!);

  console.log(`Mongoose connected to ${db.connection.host}`);
  connection.isConnected = db.connection.readyState === 1;
};

const disconnect = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('DB is not disconnected');
    }
  }
};

export const db = { connect, disconnect };
