# Vulnerability Search Lambda

This AWS Lambda function will search for vulnerability types in given text and will return matching article URLS from the SecureFlag Knowledge Base.

## Setup

1. Clone the repo:

git clone[AWS-Lambda]
cd[AWS-Lambda]


2. Install all dependencies needed:

npm i/npm install


## Running and Testing Lambda function locally

To test the Lambda function locally as if it were being called through API Gateway, follow these steps:
1. Ensure you have Node.js installed on your system


2. Install Express - npm install express


3. Create a file named server.js in your project root - you can also do this by typing the command: 

touch server.js in your terminal 


Ensure the server.js file has the following content: 

/////////////////////////////////////////////////

const express = require('express');
const { handler } = require('./index');

const app = express();
app.use(express.json());

app.post('/search', async (req, res) => {
  const result = await handler({ body: JSON.stringify(req.body) });
  res.status(result.statusCode).json(JSON.parse(result.body));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

///////////////////////////////////////////////////

(This sets up a simple Express.js server to simulate an API Gateway for the lambda function)

4. Start the local server:  

     node server.js


 5. Open Postman and create a new POST request:
 The URL will be: http://localhost:3000/search

 The Headers will be: Key: Content-Type
                      Value: application/json

For the Body select "raw" and choose "JSON"


For the payload you can enter:

{
    "text": "sql injection"
}

6. Send the request. You should receive a response with matching URLs from the knowledge base

You can also try this other payload:

{"text": "XSS"}

## Running Unit Tests

Execute unit tests by running:

npm test


## To Note 

- The Lambda function requires internet connection to fetch data from the SecureFlag Knowledge Base
- The function performs case-insensitive partial matching on vulnerability names, categories and CWE numbers.
- The function returns an array of URLs for matching articles from the SecureFlag Knowledge Base.

## Knowledge Base
The Knowledge Base information is fetched from:
https://knowledge-base.secureflag.com/_vulnerabilities/labs.json

## Development
This project was developed using JavaScript/Node.js.
