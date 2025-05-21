const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.get('/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, 'Files', fileName);
  res.download(filePath);
});

app.listen(PORT, () => {
  console.log(`[*] Server running on port ${PORT}`);
});