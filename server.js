const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const request = require('request');
const { PORT } = require('./config.js');
const { API_KEY } = require('./config.js');

const dataDirectory = path.join(__dirname, 'data'); 

app.get('/movies=:id', function (req, res) {
  const movies = req.params.id;
  console.log(movies);

  const url = 'https://omdbapi.com/?s=' + movies + '&apikey=' + API_KEY;

  request.get({
    url: url,
    json: true,
    headers: { 'User-agent': 'request' }
  }, (err, response, data) => {
    if (err) {
      console.log('Error:', err);
      res.status(500).send('Error fetching data');
    } else if (response.statusCode !== 200) {
      console.log('Status Code:', response.statusCode);
      res.status(500).send('Error fetching data');
    } else {
      console.log(data);
      const newData = JSON.stringify(data);

      const filePath = path.join(dataDirectory, movies + '.json'); 

      fs.writeFile(filePath, newData, err => {
        if (err) {
          console.log('Error:', err);
          res.status(500).send('Error saving data');
        } else {
          console.log('Success');
          res.end('Success');
        }
      });
    }
  });
});

app.get('/movies-result=:movies', function (req, res) {
  const movies = req.params.movies;
  const filePath = path.join(dataDirectory, movies + '.json'); 

  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading data file');
    } else {
      res.send(JSON.parse(data));
    }
  });
});


app.use('/static', express.static(path.resolve(__dirname, 'frontend', 'static')));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT || 4001, () => {
  console.log('Server running on port', PORT);
});
