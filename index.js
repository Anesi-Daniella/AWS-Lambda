const axios = require('axios');

//URL of the secureFlag knowledge Base where vulnerability data is fetched
const KNOWLEDGE_BASE_URL = 'https://knowledge-base.secureflag.com/_vulnerabilities/labs.json';

exports.handler = async (event) => {
    try {
        // extract the text from the event body
        const { text } = JSON.parse(event.body);

        // Fetch knowledge base from  the external API 
        const { data: knowledgeBase } = await axios.get(KNOWLEDGE_BASE_URL);

        // search for matching vulnerabilities based on the input text
        const matches = searchMatches(text, knowledgeBase);
        
        // Return the successful response with matched URLs
        return {
            statusCode: 200, //success status 
            body: JSON.stringify(matches), //convert array of URLs to JSON string
        };
    } catch (error) {
        console.error('Error:', error);
        // return 500 error response in case of any failure
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};

function searchMatches(text, knowledgeBase) {
 // convert input text to lowercase for case-insensitive matching
    const lowercaseText = text.toLowerCase();

    // filter knowledge base to find matches on vulnerability name, category or cwe
    return knowledgeBase
        .filter(item => {
            const lowercaseVulnerability = item.vulnerability.toLowerCase();
            const lowercaseCategory = item.category.toLowerCase();

            // checks if cwe number matches the text input
            const matchesCWE = item.CWE.some(cwe => cwe.toLowerCase().includes(lowercaseText));
            
            // returns true if input text matches any part of the vulnerability information 
            return lowercaseVulnerability.includes(lowercaseText) || 
                   lowercaseCategory.includes(lowercaseText) ||
                   matchesCWE;
        })
        // map the matched items to their corresponding URLs
        .map(item => item.html_url);
}
module.exports = { handler: exports.handler };