const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://dayronpc24:xUSTFkJhxw1xeXmr@cluster0.dqkhnyl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const dbConnect = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Database connection error: ', err);
    }
};

const dbDisconnect = async () => {
    try {
        await mongoose.connection.close();
        console.log('Database disconnected successfully');
    } catch (err) {
        console.error('Database disconnection error: ', err);
    }
};

module.exports = {
    dbConnect,
    dbDisconnect
};