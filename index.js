const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// env config
dotenv.config();

// connecting to database
mongoose.connect(
    process.env.CONN_DB,
{ useNewUrlParser: true , useUnifiedTopology: true},
() => console.log("Connected to Database"));

// Private Route
const postRoute = require('./routes/forumAccess');

// routing
const authRoute = require('./routes/auth');

app.use(express.json());

//@Middleware
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);

// connecting to routes
app.listen(3000, () => console.log("Server Running"));