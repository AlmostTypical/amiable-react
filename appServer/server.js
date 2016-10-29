const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.sendFile(path.normalize(`${__dirname}/../public/index.html`));
});

app.listen(9001, function () {
  console.log('Listening on port 9001');
});