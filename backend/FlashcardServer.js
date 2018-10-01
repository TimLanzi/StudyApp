const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = 3001;
var mysql = require("mysql");
var isConnected = false;
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
*/

var connection = mysql.createConnection({
  host: "localhost",
  user: "project",
  password: "project",
  database: "StudyAppDB"
  /*
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'studyApp'
  */

});

    connection.connect();

app.get("/getProblem/:id", (req, res) => {
    connection.query(
      "SELECT question, solution FROM problems WHERE problem_id = "+req.params.id,
      function(err, rows, fields)
      {
        if (err) {
          console.log("Error while performing Query.");
        }
        res.send(rows);
        console.log(rows);
      }
    );
//    connection.end();
  
});

app.listen(port, () => console.log(`Server started on port ${port}`));
