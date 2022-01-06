/*
/ Rick Fox
/ 01-06-22
/ main postagram server application starting point
*/

const express = require('express'),
  cors = require('cors'),
  cookieParser = require('cookie-parser');

//Get the passed in PORT
const port = process.env.PORT || 3000;

// Create an express app
const app = express();

// Enable JSON parsing in the body
app.use(express.json());

// Enable CORS in the body
app.use(cors({
  credentials: true,
  origin: true
}));

// Enable cookie parsing from the request
app.use(cookieParser());

// Remove the x-powered-by header
app.disable('x-powered-by');

// Expose a general healthcheck
app.get('/_healthcheck', (req, res, next) => {
  res.sendStatus(200)
});

// Route handlers
app.use('/auth', require('./routes/auth'));
app.use('/api', require('./routes/api'));
  

// Error handler
app.use((err, req, res, next) => {
  if (err) {
    console.error(err.message);
    console.error(err.stack);
    return res.status(err.output && err.output.statusCode ? err.output.statusCode : 500).json(err.output);
  }
});

// Start the app exposing the port
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});