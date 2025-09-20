const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the current directory
app.use(express.static('.'));

// Handle SPA routing - serve index.html for any route that doesn't match a file
app.get('*', (req, res) => {
  // Check if the request is for a specific HTML file
  if (req.path.endsWith('.html')) {
    res.sendFile(path.join(__dirname, req.path));
  } else if (req.path === '/') {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    // For other routes, try to serve the file or fallback to index.html
    const filePath = path.join(__dirname, req.path);
    res.sendFile(filePath, (err) => {
      if (err) {
        res.sendFile(path.join(__dirname, 'index.html'));
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Bedrock Community Site is running on http://localhost:${PORT}`);
  console.log(`📁 Serving static files from: ${__dirname}`);
});