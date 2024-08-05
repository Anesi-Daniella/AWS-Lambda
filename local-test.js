const { handler } = require('./index');

async function testLocally() {
  const testEvent = {
    body: JSON.stringify({ text: 'sql injection' })
  };

  try {
    const result = await handler(testEvent);
    console.log('Status Code:', result.statusCode);
    console.log('Response Body:', result.body);
  } catch (error) {
    console.error('Error:', error);
  }
}

testLocally();