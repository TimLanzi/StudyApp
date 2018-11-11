const crypto = require('crypto');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 3001;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
//const jwtDecode = require('jwt-decode');
var mysql = require('mysql');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var genRandomString = function(length){
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex')
          .slice(0, length);
};

var sha512 = function(password, salt){
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  var value = hash.digest('hex');
  //console.log(value);
  return {
    salt:salt,
    hash:value
  };
};

function saltHashPassword(userPassword){
  var salt = genRandomString(16);
  var passwordData = sha512(userPassword, salt);
  //console.log('userPassword = '+userPassword);
  //console.log('salt = '+passwordData.salt);
  //console.log('passwordhash = '+passwordData.passwordHash);
  return passwordData;
}

function checkPassword(salt, hash, password)
{
  var testSalt = sha512(password, salt);
  var passed = false;
  if (testSalt.hash === hash)
  {
    passed = true
  }
  return passed;
}

//saltHashPassword('project');

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var connection = mysql.createConnection({
  host: "localhost",
  user: "project",
  password: "project",
  database: "StudyAppDB"
});

connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const jwtMW = exjwt({
  secret: 'keyboard cat 4ever'
});

app.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  connection.query(
    "SELECT * FROM users WHERE username = ?", req.body.username,
    function(err, rows, fields)
    {
      if (err)
      {
        console.log("Error while performing query.");
      }
      else {
        console.log(rows);
        if(rows.length > 0)
        {
          if (checkPassword(rows[0].salt, rows[0].hash, password))
          {
            let token = jwt.sign({username: username}, 'keyboard cat 4ever', {expiresIn: 129000});
            res.json({
              sucess: true,
              err: null,
              token
            });
          }
          else
          {
            res.status(401).json({
              sucess:false,
              token:null,
              err: 'Username or password is incorrect'
            });
          }
        }
        else
        {
          res.status(401).json({
            sucess:false,
            token:null,
            err:'Username not registered'
          });
        }
      }
    }
  );
});

app.get('/', jwtMW, (req, res) => {
  res.send('You are authenticated');
});

app.use(function (err, req, res, next){
  if(err.name === 'UnauthorizedError'){
    res.status(401).send(err);
  }
  else {
    next(err);
  }
});


app.post("/postResult", (req, res) => {
    console.log(req.body);
      var decoded = jwt.decode(req.body.token);
//      console.log(decoded.username);
      var result = {
        'username': decoded.username,
        'problem_id': req.body.problem,
        'problem_grade': req.body.ans
      };
      console.log("Attempting to enter result into DB");
      connection.query(
        "INSERT INTO user_problem_results SET ?", result,
        function(err, rows, fields)
        {
          if(err)
          {
            console.log("An error occured");
            console.log(err);
          }
          else
          {
            console.log("No errors occured");
            res.json({success: true, err:null});
          }
        });
});

//for inserting flashcards
app.post("/postFlashcard", (req, res) => {
     var decoded = jwt.decode(req.body.token);
     var result = {
        'username': decoded.username,
        'frontText': req.body.question,
        'backText': req.body.answer
      };
      console.log("Attempting to enter flashcard into DB");
      connection.query(
        "INSERT INTO flashcardTest SET ?", result,
        function(err, rows, fields)
        {
          if(err)
          {
            console.log("An error occured");
            console.log(err);
          }
          else
          {
            console.log("No errors occured");
            res.json({success: true, err:null});
          }
        });
});


app.post("/register", (req, res) => {
  console.log('Attempting to Register',req.body.username);
  connection.query(
    "SELECT * FROM users WHERE username = ?", req.body.username,
    function(err, rows, fields)
    {
      if(err)
      {
        console.log("An error occured");
        console.log(err);
      }
      else
      {
        console.log("No errors occured");
        if (rows.length > 0)
        {
            console.log('User already registered');
            res.status(401).json({
            sucess:false,
            token:null,
            err:'Username already registered'
          });
        }
        else
        {
            console.log('Successfully picked unique username');

            var data = saltHashPassword(req.body.password);
            var user = {
              'username': req.body.username,
              'salt': data.salt,
              'hash': data.hash
            };
            connection.query(
              "INSERT INTO users SET ?", user,
              function(err, rows, fields)
              {
                if(err)
                {
                  console.log("An error occured while trying to add user");
                  console.log(err);
                }
                else
                {
                  console.log("No errors occured while inserting user onto table");
                  console.log(rows);
                  let token = jwt.sign({username: req.body.username}, 'keyboard cat 4ever', {expiresIn: 129600});
                  res.json({success:true, err:null, token});
                }
              });
 
        }
      }
    }
  );

    });


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

});


app.listen(port, () => console.log(`Server started on port ${port}`));
