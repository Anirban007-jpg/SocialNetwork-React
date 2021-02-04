const express = require('express');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const expressValidator = require('express-validator');
const dotenv = require('dotenv')
dotenv.config();

// db
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true , useUnifiedTopology: true}).then(() => {
    console.log('database connected');
}).catch(err => {
    console.log(err);
});

mongoose.connection.on('error', err => {
    console.log(`Connection faild: ${err.message}`);
})


// MIDDLEWARES
app.use(morgan("dev"));
app.use(bodyparser.json());
app.use(expressValidator());
app.use(cookieParser());

// Controllers

// bring in routes
app.use('/', postRoutes);
app.use('/', authRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})
