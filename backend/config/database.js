const mongoose = require('mongoose');

let connectionPromise = null;

const connectDB = () => {
    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.MONGODB_URL).then((res) => {
            console.log(`Database connected successfully to ${res.connection.host}`);
            return res.connection;
        });
    }
    return connectionPromise;
};

module.exports = connectDB;
