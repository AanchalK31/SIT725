// server.js
const http = require('http');
const url = require('url');

// HTML content with UI form
const htmlPage = `
<!DOCTYPE html>
<html>
<head>
  <title>Locate a Socket Demo</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f6f8fb; text-align: center; margin-top: 50px; }
    .card { display: inline-block; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
    input { padding: 10px; margin: 10px; width: 120px; border-radius: 8px; border: 1px solid #ccc; }
    button { padding: 10px 20px; border: none; border-radius: 8px; background: #007BFF; color: white; cursor: pointer; }
    button:hover { background: #0056b3; }
    #result { margin-top: 20px; font-size: 18px; font-weight: bold; color: green; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Welcome to Locate a Socket Demo</h1>
    <p>Enter two numbers to add (calculated on the server):</p>
    <input type="number" id="a" placeholder="First number" />
    <input type="number" id="b" placeholder="Second number" />
    <br/>
    <button onclick="addNumbers()">Add</button>
    <div id="result"></div>
  </div>

  <script>
    async function addNumbers() {
      const a = document.getElementById('a').value;
      const b = document.getElementById('b').value;
      const resultDiv = document.getElementById('result');

      if (a === '' || b === '') {
        resultDiv.style.color = 'red';
        resultDiv.textContent = 'Please enter both numbers.';
        return;
      }

      try {
        const res = await fetch(\`/add?a=\${a}&b=\${b}\`);
        const data = await res.json();

        if (data.error) {
          resultDiv.style.color = 'red';
          resultDiv.textContent = data.error;
        } else {
          resultDiv.style.color = 'green';
          resultDiv.textContent = \`Result: \${data.result}\`;
        }
      } catch (err) {
        resultDiv.style.color = 'red';
        resultDiv.textContent = 'Error contacting server';
      }
    }
  </script>
</body>
</html>
`;

// Create server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Route: GET /
  if (path === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlPage);

  // Route: GET /add?a=5&b=3
  } else if (path === '/add' && req.method === 'GET') {
    const a = parseFloat(query.a);
    const b = parseFloat(query.b);

    if (isNaN(a) || isNaN(b)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid numbers' }));
    } else {
      const result = a + b;
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ result }));
    }

  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
});
