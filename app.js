const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();
const PORT = 3000;

app.get('/:filename', (req, res) => {
  const fileName = req.params.filename;

  // prevent path traversal
  if (!/^[\w\-]+\.(pptx|pdf|docx|xlsx)$/i.test(fileName)) {
    return res.status(400).send('Invalid filename format.');
  }

  const filePath = path.join(__dirname, 'Files', fileName);

  res.download(filePath, (err) => {
    if (err) {
      console.error(`[!] Download error: ${err.message}`);
      res.status(404).send('File not found.');
    }
  });
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many download attempts from this IP, please try again later.',
});

app.use(limiter);
app.use(helmet());

app.listen(PORT, () => {
  console.log(`[*] Server running on port ${PORT}`);
});