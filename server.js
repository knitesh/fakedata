const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000; // Replace with your desired port number
app.use(express.json());
// POST method route
app.post('/SFcore.do', (req, res) => {
console.log(req.body)
  const  methodName  = req.body.request.requestInfo.method;


  if (!methodName) {
    return res.status(400).json({ error: 'Method name is missing in the request payload' });
  }
  // Read the JSON file
  fs.readFile(`_fakedata/${methodName}.json`, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      // Parse the JSON data
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
