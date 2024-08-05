const { handler } = require('./index');

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
    test('returns matching URLs for vulnerability', async () => {
        const event = { body: JSON.stringify({ text: 'injection' }) };
        const result = await handler(event);
        const body = JSON.parse(result.body);
        
        expect(result.statusCode).toBe(200);
        expect(body).toEqual(["https://example.com/sql-injection"]);
    });

    test('matches are case-insensitive', async () => {
        const event = { body: JSON.stringify({ text: 'XSS' }) };
        const result = await handler(event);
        const body = JSON.parse(result.body);
        
        expect(body).toEqual(["https://example.com/xss"]);
    });

    test('matches CWE numbers', async () => {
        const event = { body: JSON.stringify({ text: '79' }) };
        const result = await handler(event);
        const body = JSON.parse(result.body);
        
        expect(body).toEqual(["https://example.com/xss"]);
    });
});