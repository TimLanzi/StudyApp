const express = require('express');
const bodyParser = require('body-parser');
const mysql      = require('mysql');
// https://github.com/mysqljs/mysql
const connection = mysql.createConnection({
  host     : '165.227.198.233',
  user     : 'project',
  password : 'project',
  database : 'StudyAppDB'
});

// Initialize the app
const app = express();

// https://expressjs.com/en/guide/routing.html
app.get('/problems', function (req, res) {
    connection.connect();

    connection.query('SELECT * FROM problems', function (error, results, fields) {
      if (error) throw error;
      res.send(results)
    });

    connection.end();
});

app.get('/flashcards', function(req, res) {
    connection.connect();
    
    connection.query('SELECT * FROM flashcards', function (error, results, fields) {
        if (error) throw error;
        res.send(results)
    });

   connection.end(); 
});
// Start the server
app.listen(3000, () => {
 console.log('Go to http://165.227.198.233:3000/problems to see problems');
});
