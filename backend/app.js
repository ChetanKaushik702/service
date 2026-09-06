const express = require('express');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const app = express();

// error Middleware
const errorMiddlerware = require('./middlewares/error');

app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(express.json());
app.use(cookieParser());

// setting up routes
const user = require('./routes/userRoute');
const listings = require('./routes/listingRoute');
const requests = require('./routes/requestRoute');

app.use('/api/v1', user);
app.use('/api/v1', listings);
app.use('/api/v1', requests);

app.use(errorMiddlerware);

module.exports = app;
