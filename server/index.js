const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const authRouter = require('./routes/authRouter');
// Middlewares 
app.use(express.json());
app.use(cors());


// Route
app.use('/api/auth', authRouter);

//MongoDb Connection
mongoose.connect('mongodb://127.0.0.1:27017/authentication')
    .then(() => console.log('Connectted To MongoDb')).catch((error) => console.error("Failed To Connect"));


//Global Error Handler 
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json(
        {
            status: err.status,
            message: err.message
        }
    );
});

//Server 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(PORT);
    console.log("App running")
});