const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const cors = require('cors')
const Senior = require('./routes/SeniorFormsRoutes')
const FourPs = require('./routes/4PsFormsRoutes');

const app = express()

require("dotenv").config();

app.use(cors())
app.use(bodyParser.json())

app.use('/api/senior', Senior)
app.use('/api/4ps', FourPs);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server after MongoDB connection is established
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });