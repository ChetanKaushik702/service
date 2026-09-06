require('dotenv').config({ path: 'backend/config/config.env' });
const cloudinary = require('cloudinary');
const app = require('./app');
const connectDB = require('./config/database');

// handling uncaught errors
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err}`);
    console.log('Shutting down the server due to uncaught exceptions.');
    process.exit(1);
})

connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// unhandled promise rejection error
process.on('unhandledRejection', (err) => {
    console.log('Error:', err);
    console.log('Shutting down the server due to unhandler promise rejections.');

    server.close(() => {
        process.exit(2);
    })
})
