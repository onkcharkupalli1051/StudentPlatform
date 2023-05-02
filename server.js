const express = require('express')
const colors = require('colors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectDB = require('./config/db');
const cors = require('cors')

//dotenv config
dotenv.config();

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

//routes
app.use('/api/v1/user', require('./routes/userRoute'))
app.use('/api/v1/admin', require('./routes/adminRoute'))

//port
const port = process.env.PORT || 8080

//listen port
app.listen(port, () => {
    console.log(colors.bgCyan.white(`Server Running in ${process.env.DEV_MODE} mode on port ${port}`));
})

