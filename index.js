const axios = require('axios');

const KNOWLEDGE_BASE_URL = 'https://knowledge-base.secureflag.com/_vulnerabilities/labs.json';

exports.handler = async (event) => {
    try {
        const { text } = JSON.parse(event.body);
        const { data: knowledgeBase } = await axios.get(KNOWLEDGE_BASE_URL);
        const matches = searchMatches(text, knowledgeBase);
        
        return {
            statusCode: 200,
            body: JSON.stringify(matches),
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};

function searchMatches(text, knowledgeBase) {
    const lowercaseText = text.toLowerCase();
    return knowledgeBase
        .filter(item => {
            const lowercaseVulnerability = item.vulnerability.toLowerCase();
            const lowercaseCategory = item.category.toLowerCase();
            const matchesCWE = item.CWE.some(cwe => cwe.toLowerCase().includes(lowercaseText));
            
            return lowercaseVulnerability.includes(lowercaseText) || 
                   lowercaseCategory.includes(lowercaseText) ||
                   matchesCWE;
        })
        .map(item => item.html_url);
}