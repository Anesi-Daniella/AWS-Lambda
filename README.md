# Vulnerability Search Lambda

This AWS Lambda function searches for vulnerability types in given text and returns matching article URLs from the SecureFlag Knowledge Base.

## Instructions

1. **Setup:**
    - Clone the repository:
      ```bash
      git clone [AWS-Lambda]
      cd [AWS-Lambda]
      ```
    - Install dependencies:
      ```bash
      npm install
      ```

2. **Running and Testing Locally:**
    - Ensure Node.js is installed on your system.
    - Install Express:
      ```bash
      npm install express
      ```
    - Create a file named `server.js` in your project root:
      ```bash
      touch server.js
      ```
    - Add the following content to `server.js`:
      ```javascript
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
      ```
      *(This sets up a simple Express.js server to simulate an API Gateway for the Lambda function.)*
    - Start the local server:
      ```bash
      node server.js
      ```
    - Test using Postman:
        - Create a new **POST** request with URL: `http://localhost:3000/search`
        - Set **Headers**:
            - Key: `Content-Type`
            - Value: `application/json`
        - **Body** (select "raw" and choose "JSON"):
          ```json
          { "text": "sql injection" }
          ```
        - Send the request. You should receive a response with matching URLs from the knowledge base. You can also test with:
          ```json
          { "text": "XSS" }
          ```

3. **Running Unit Tests:**
    - Execute unit tests by running:
      ```bash
      npm test
      ```

4. **Notes:**
    - The Lambda function requires an internet connection to fetch data from the SecureFlag Knowledge Base.
    - It performs case-insensitive partial matching on vulnerability names, categories, and CWE numbers.
    - The function returns an array of URLs for matching articles.

5. **Knowledge Base:**
    - Information is fetched from:
      [https://knowledge-base.secureflag.com/_vulnerabilities/labs.json](https://knowledge-base.secureflag.com/_vulnerabilities/labs.json)

6. **Development:**
    - This project was developed using **JavaScript/Node.js**.
