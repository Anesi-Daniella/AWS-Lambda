const { handler } = require('./index');

//Mock the axios library to simulate API responses 
jest.mock('axios', () => ({
    get: jest.fn().mockResolvedValue({
        data: [
            {
                vulnerability: "SQL Injection",
                category: "Injection",
                CWE: ["89"],
                html_url: "https://example.com/sql-injection"
            },
            {
                vulnerability: "Cross-Site Scripting",
                category: "XSS",
                CWE: ["79"],
                html_url: "https://example.com/xss"
            }
        ]
    })
}));

describe('Vulnerability Search Lambda', () => {

    // Test basic matching functionality
    test('returns matching URLs for vulnerability', async () => {
        const event = { body: JSON.stringify({ text: 'injection' }) };
        const result = await handler(event);
        const body = JSON.parse(result.body);
        
        expect(result.statusCode).toBe(200);
        expect(body).toEqual(["https://example.com/sql-injection"]);
    });

    // Test case-insensitive matching 
    test('matches are case-insensitive', async () => {
        const event = { body: JSON.stringify({ text: 'XSS' }) };
        const result = await handler(event);
        const body = JSON.parse(result.body);
        
        expect(body).toEqual(["https://example.com/xss"]);
    });


    // Test matching CWE number 
    test('matches CWE numbers', async () => {
        const event = { body: JSON.stringify({ text: '79' }) };
        const result = await handler(event);
        const body = JSON.parse(result.body);
        
        expect(body).toEqual(["https://example.com/xss"]);
    });

    // Test no matches scenario 
    test('returns empty array when no matches found', async () => {
        const event = { body: JSON.stringify({ text: 'nonexistent' }) };
        const result = await handler(event);
        const body = JSON.parse(result.body);
        
        expect(body).toEqual([]);
    });
});