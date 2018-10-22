const crypto = require('crypto');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 3001;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
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
/*
        var found = 0;
        var newStr = "";
        var index = 0;
        var question = rows[0].question;
        var i = 0;
        for (i = 0; i < question.length; i++)
        {
          if(question[i] === '$' && found === 0)
          {
            found = 1;
            newStr = newStr + '<MathJax.Node inline formula={\"';
          }
          else if (question[i] === '$' && found === 1)
          {
            found = 0;
            newStr = newStr + '\"} />';
          }
          else
          {
            newStr = newStr + question[i];
          }
        }
        rows[0].question = newStr;
*/
        res.send(rows);
        console.log(rows);
      }
    );

});

app.listen(port, () => console.log(`Server started on port ${port}`));
