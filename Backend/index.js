const express = require("express");
const app = express();
const allRoutes = require("./routes.js");
const request = require('request');
const axios = require('axios');
const cors = require(cors);


// It parses incoming requests with JSON payloads
app.use(express.json());

app.use(cors());

// Applying All Routes
app.use(allRoutes);

// Handling Errors
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});




app.listen(8000, () => console.log("Server is running on port 8000"));
