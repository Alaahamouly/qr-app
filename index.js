const express = require('express');
const fs = require('fs');
const app = express();

const PORT = process.env.PORT || 3000;
const SCAN_LIMIT = 3;
const FILE = 'scan-count.json';
const FORM_URL = 'https://docs.google.com/forms/d/18LqL7Ed3v1ynObPUEtuOEFjwyuziaYmxTeJ90PNCoXg';

if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, JSON.stringify({ count: 0 }));
}

app.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));

  if (data.count < SCAN_LIMIT) {
    data.count++;
    fs.writeFileSync(FILE, JSON.stringify(data));
    res.redirect(FORM_URL);
  } else {
    res.send('<h1>❌ This form is no longer available.</h1>');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
