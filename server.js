const express = require('express');
const { handler } = require('./index');

// initialise express app
const app = express();
app.use(express.json());

// Define the POST endpoint at the search path, the endpoint acts as a substitute to the lambda function handler
app.post('/search', async (req, res) => {

// send the response from the lambda fnc to the client
  const result = await handler({ body: JSON.stringify(req.body) });
  // set HTTP status code and the json parsed response body
  res.status(result.statusCode).json(JSON.parse(result.body));
});

// define the port number on which the server will listen 
const PORT = 3000;

// start the server and listen on the specified port and log message to the console once the server is running 
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));