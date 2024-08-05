# Vulnerability Search Lambda

This AWS Lambda function will search for vulnerability types in given text and will return matching article URLS from the SecureFlag Knowledge Base.

## Setup

1. Clone the repo:

git clone[repo-url]
cd[repo-name]


2. Install all dependencies needed:

npm i/ npm install


## Running the application locally

To run the Lambda function locally:

1. Run the following Node.js command:

node -e "const { handler } = require('./index'); handler({ body: JSON.stringify({ text: 'sql injection' }) }).then(console.log)"

This simulates an API Gateway POST request with the body `{ "text": "sql injection" }`.

2. To test with different inputs, modify the 'text value in the command above.


## Invoking the Lambda Function (Local Simulation)

While this setup doesn't use an actual API Gateway, you can simulate invoking the function by modifying the input in the Node.js command above. For example:

node -e "const { handler } = require('./index'); handler({ body: JSON.stringify({ text: 'broken auth' }) }).then(console.log)"


## Running Local Tests

To run the unit tests:

npm test

## Notes

- The function expects input in the format: `{ "text": "your search text here" }`
- It performs case-insensitive partial matching on vulnerability types.
- The function returns an array of URLs for matching articles from the SecureFlag Knowledge Base.
- CWE matching is also supported (if implemented).

## Knowledge Base

The Knowledge Base information is fetched from:
https://knowledge-base.secureflag.com/_vulnerabilities/labs.json

## Development

This project was developed using JavaScript/Node.js.
