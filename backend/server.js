const crypto = require('crypto');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
let port = require('../frontend/config').port,
    db_config = require('../frontend/config').db_config
    jwtSecret = require('../frontend/config').secret;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
var mysql = require('mysql');
var regressor = require('js-regression');

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

var connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config);

    connection.connect(function(err) {
        if (err) {
            console.log('error when connecting to db: ', err);
            setTimeout(handleDisconnect, 2000);
        }
    });

    connection.on('error', function(err) {
        console.log('db error', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect();
        }
        else {
            throw err;
        }
    });
}

handleDisconnect();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const jwtMW = exjwt({
  secret: jwtSecret
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
            let payload = {
              username: username,
              firstName: rows[0].firstName,
              lastName: rows[0].lastName,
              email: rows[0].email,
            }
            let token = jwt.sign(payload, jwtSecret, {expiresIn: 129000});
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

//for inserting new flashcard sets
app.post("/postFlashcardSet", (req, res) => {
     var decoded = jwt.decode(req.body.token);
     var result = {
        'username': decoded.username,
        'name': req.body.name
      };
      console.log("Attempting to enter flashcard set into DB");
      connection.query(
        "INSERT INTO flashcard_sets SET ?", result,
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
              'firstName': req.body.firstName,
              'lastName': req.body.lastName,
              'email': req.body.email,
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
                  let payload = {
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                  }
                  let token = jwt.sign(payload, jwtSecret, {expiresIn: 129600});
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

var calcUserVector = function(userM, probM)
{   
    var data = [];
    for (var i =0; i < probM.length; i++)
    {
        var row = [probM[i].algebra, probM[i].arithmetic, probM[i].calculus, probM[i].functions, probM[i].geometry, probM[i].logarithm, probM[i].precalc, probM[i].trigonometry, probM[i].word_problem, userM[i].problem_grade];
        data.push(row);
    }
    var regression = new regressor.LinearRegression({
        alpha: .001,
        iterations: 300,
        lambda: 0
    });

    var model = regression.fit(data);
    console.log(model);
    return model;
}

app.get('/getRanking/:token', (req, res) => {
    var decoded = jwt.decode(req.params.token);
    var userMatrix;
    var problemMatrix;
    
    connection.query(
        "SELECT problem_id, problem_grade FROM user_problem_results WHERE username = ?", decoded.username,
        function(err, rows, fields)
        {
            if (err) {
                console.log(err);
            }
            else if (rows.length < 1) {
                res.send({success:false});
            }
            else {
                console.log(rows);
                userMatrix = rows;
                let probsCompleted = rows.length;
                connection.query(
                    "SELECT problem_id, algebra, arithmetic, calculus, functions, geometry, logarithm, precalc, trigonometry, word_problem FROM problems WHERE problem_id IN (SELECT problem_id FROM user_problem_results WHERE username = ?)", decoded.username,
                    function(err, rows, fields)
                    {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            //console.log("hi   " + rows[0].arithmetic);
                            problemMatrix = rows;
                            var model = calcUserVector(userMatrix, problemMatrix);
                            var rankings = [(model.theta[0] + model.theta[1])*10, (model.theta[0] + model.theta[2])*10, (model.theta[0] + model.theta[3])*10, (model.theta[0] + model.theta[4])*10, (model.theta[0] + model.theta[5])*10, (model.theta[0] + model.theta[6])*10, (model.theta[0] + model.theta[7])*10, (model.theta[0] + model.theta[8])*10, (model.theta[0] + model.theta[9])*10];
                            console.log("Rankings:");
                            console.log(rankings);
                            var sendStuff = {'probsCompleted':probsCompleted, 'algebra':rankings[0], 'arithmetic':rankings[1], 'calculus':rankings[2], 'functions':rankings[3], 'geometry':rankings[4], 'logarithm':rankings[5], 'precalc':rankings[6], 'trigonometry':rankings[7], 'word_problem':rankings[8]}; 
console.log(sendStuff);
                            res.send(sendStuff);
                        }
                    }
                );
            }
        }
    )
});

app.listen(port, () => console.log(`Server started on port ${port}`));
