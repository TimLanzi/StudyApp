/* Backend API */

// Grab dependencies
const crypto = require('crypto');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const mysql = require('mysql');
const regressor = require('js-regression');
const { port, secret, db } = require('./config');


// Initialize express application
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// App headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/* SHA512 Encryption functions */

// Generates the salt, a random string of length 16
const genRandomString = length => {
  return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0, length);
};

// Hashes the password using SHA512 encryption and the salt
const sha512 = (password, salt) => {
  var hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  var value = hash.digest('hex');
  //console.log(value);
  return {
    salt,
    hash: value,
  };
};

// Main hashing function. Returns the salt and the hash.
const saltHashPassword = userPassword => {
  var salt = genRandomString(16);
  var passwordData = sha512(userPassword, salt);
  //console.log('userPassword = '+userPassword);
  //console.log('salt = '+passwordData.salt);
  //console.log('passwordhash = '+passwordData.passwordHash);
  return passwordData;
}

// Used for login. Checks the passed password against the salt and hash in the DB.
const checkPassword = (salt, hash, password) => {
  var testSalt = sha512(password, salt);
  var passed = false;
  if (testSalt.hash === hash) {
    passed = true
  }
  return passed;
}

// Golden function. Keeps the SQL connection, and therefore the entire backend, alive.
var connection;
const handleDisconnect = () => {
  connection = mysql.createConnection(db);

  connection.connect(err => {
    if (err) {
      console.log('error when connecting to db: ', err);
      setTimeout(handleDisconnect, 2000);
    }
  });

  connection.on('error', err => {
    console.log('db error', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
handleDisconnect();

/* Authentication functions */
const jwtMW = exjwt({ secret });

app.get('/', jwtMW, (req, res) => {
  res.send('You are authenticated');
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send(err);
  } else {
    next(err);
  }
});

/* Login function */
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  connection.query("SELECT * FROM users WHERE username = ?", username, (err, rows, fields) => {
    if (err) {
      console.log("Error while performing query.");
    } else {
      console.log(rows);
      if(rows.length > 0) {
        if (checkPassword(rows[0].salt, rows[0].hash, password)) {
          let payload = {
            username: username,
            firstName: rows[0].firstName,
            lastName: rows[0].lastName,
            email: rows[0].email,
          };

          let token = jwt.sign(payload, secret, {expiresIn: 129000});
          res.json({
            sucess: true,
            err: null,
            token
          });
        } else {
          res.status(401).json({
            sucess:false,
            token:null,
            err: 'Username or password is incorrect'
          });
        }
      } else {
        res.status(401).json({
          sucess:false,
          token:null,
          err:'Username not registered'
        });
      }
    }
  });
});

/* Register function */
app.post("/register", (req, res) => {
  const { usernamem, password, firstName, lastName } = req.body;
  console.log('Attempting to Register', username);
  connection.query("SELECT * FROM users WHERE username = ?", username, (err, rows, fields) => {
    if (err) {
      console.log("An error occured");
      console.log(err);
    } else {
      console.log("No errors occured");
      if (rows.length > 0) {
        console.log('User already registered');
        res.status(401).json({
          sucess: false,
          token: null,
          err: 'Username already registered'
        });
      } else {
        console.log('Successfully picked unique username');

        var data = saltHashPassword(password);
        var user = {
          'username': username,
          'firstName': firstName,
          'lastName': lastName,
          'email': email,
          'salt': data.salt,
          'hash': data.hash
        };

        connection.query("INSERT INTO users SET ?", user, (err, rows, fields) => {
          if (err) {
            console.log("An error occured while trying to add user");
            console.log(err);
          } else {
            console.log("No errors occured while inserting user onto table");
            console.log(rows);
            let payload = {
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
            }
            let token = jwt.sign(payload, secret, {expiresIn: 129600});
            res.json({success:true, err:null, token});
          }
        });
      }
    }
  });
});

/* Returns a problem and its solution from the DB to the frontend */
app.get("/getProblem/:id", (req, res) => {
  connection.query(`SELECT question, solution FROM problems WHERE problem_id = ${req.params.id}`, (err, rows, fields) => {
      if (err) {
        console.log("Error while performing Query.");
      }
      res.send(rows);
      console.log(rows);
    }
  );
});

/* Returns flashcard set */
app.get("/getFlashcardSet/:token", (req, res) => {
  var decoded = jwt.decode(req.params.token);
  connection.query("SELECT setname FROM flashcard_sets WHERE username = ?", decoded.username, (err, rows, fields) => {
    if (err) {
      console.log("Error while performing Query.");
    }
    res.send(rows);
    console.log(rows);
  });
});

//Returns flashcards
app.get("/getFlashcard/:token", (req, res) => {
  var decoded = jwt.decode(req.params.token);
  connection.query("SELECT front_text, back_text FROM flashcards WHERE username = ?", decoded.username, (err, rows, fields) => {
    if (err) {
      console.log("Error while performing Query.");
    }
    res.send(rows);
    console.log(rows);
  });
});

/* Returns a problem and its solution from the DB to the frontend */
app.get("/getBaseline/", (req, res) => {
  connection.query("SELECT problem_id FROM problems ORDER BY RAND() LIMIT 15", (err, rows, fields) => {
    if (err) {
      console.log("Error while performing Query.");
    }
    res.send(rows);
    console.log(rows);
  });
});

/* Posts problem results to the DB */
app.post("/postResult", (req, res) => {
  console.log(req.body);
  const { token, problem, ans } = req.body;
  var decoded = jwt.decode(token);
  var result = {
    'username': decoded.username,
    'problem_id': problem,
    'problem_grade': ans
  };
  console.log("Attempting to enter result into DB");
  connection.query("INSERT INTO user_problem_results SET ?", result, (err, rows, fields) => {
    if (err) {
      console.log("An error occured");
      console.log(err);
    } else {
      console.log("No errors occured");
      res.json({ success: true, err: null });
    }
  });
});

//for inserting flashcards
app.post("/postFlashcard", (req, res) => {
  const { token, front, back } = req.body;
    var decoded = jwt.decode(token);
    var result = {
      'username': decoded.username,
      'front_text': front,
      'back_text': back,
      //'setname': decoded.username
    };
    console.log("Attempting to enter flashcard into DB");
    connection.query("INSERT INTO flashcards SET ?", result, (err, rows, fields) => {
      if (err) {
        console.log("An error occured");
        console.log(err);
      } else {
        console.log("No errors occured");
        res.json({ success: true, err: null });
      }
    });
});

//for inserting new flashcard sets
app.post("/postFlashcardSet", (req, res) => {
  const { token, name } = req.body;
  var decoded = jwt.decode(token);
  var result = {
    'username': decoded.username,
    'setname': name
  };
  console.log("Attempting to enter flashcard set into DB");
  connection.query("INSERT INTO flashcard_sets SET ?", result, (err, rows, fields) => {
    if (err) {
      console.log("An error occured");
      console.log(err);
    } else {
      console.log("No errors occured");
      res.json({success: true, err:null});
    }
  });
});

/* Rankings functions*/

// Function to calculate the user vector through linear regression
var calcUserVector = (userM, probM) => {   
  var data = [];
  for (var i =0; i < probM.length; i++) {
    var row = [
      probM[i].algebra, 
      probM[i].arithmetic, 
      probM[i].calculus, 
      probM[i].functions, 
      probM[i].geometry, 
      probM[i].logarithm, 
      probM[i].precalc, 
      probM[i].trigonometry, 
      probM[i].word_problem, 
      userM[i].problem_grade
    ];
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

// Function to calculate a user's rankings and send them to the front end
app.get('/getRanking/:token', (req, res) => {
  var decoded = jwt.decode(req.params.token);
  var userMatrix;
  var problemMatrix;
  
  connection.query("SELECT problem_id, problem_grade FROM user_problem_results WHERE username = ?", decoded.username, (err, rows, fields) => {
    if (err) {
        console.log(err);
    } else if (rows.length < 1) {
        res.send({ success:false });
    } else {
      console.log(rows);
      userMatrix = rows;
      let probsCompleted = rows.length;
      connection.query("SELECT problem_id, algebra, arithmetic, calculus, functions, geometry, logarithm, precalc, trigonometry, word_problem FROM problems WHERE problem_id IN (SELECT problem_id FROM user_problem_results WHERE username = ?)", decoded.username, (err, rows, fields) => {
        if (err) {
          console.log(err);
        } else {
          //console.log("hi   " + rows[0].arithmetic);
          problemMatrix = rows;
          var model = calcUserVector(userMatrix, problemMatrix);
          var rankings = [
            (model.theta[0] + model.theta[1])*10, 
            (model.theta[0] + model.theta[2])*10, 
            (model.theta[0] + model.theta[3])*10, 
            (model.theta[0] + model.theta[4])*10, 
            (model.theta[0] + model.theta[5])*10, 
            (model.theta[0] + model.theta[6])*10, 
            (model.theta[0] + model.theta[7])*10, 
            (model.theta[0] + model.theta[8])*10, 
            (model.theta[0] + model.theta[9])*10
          ];
          
          console.log("Rankings:");
          console.log(rankings);
          var sendStuff = {
            'probsCompleted':probsCompleted, 
            'algebra':rankings[0], 
            'arithmetic':rankings[1], 
            'calculus':rankings[2], 
            'functions':rankings[3], 
            'geometry':rankings[4], 
            'logarithm':rankings[5], 
            'precalc':rankings[6], 
            'trigonometry':rankings[7], 
            'word_problem':rankings[8]
          }; 
          console.log(sendStuff);
          res.send(sendStuff);
        }
      });
    }
  })
});

/* Account Settings Functions */
app.post('/updateFields', (req, res) => {
  const { firstName, lastName, email, username } = req.body;
  
  connection.query(`UPDATE users SET firstName = '${firstName}', lastName = '${lastName}', email = '${email}' WHERE username = '${req.body.username}'`, (err, rows, fields) => {
    if (err) {
      console.log('Error updating fields');
      console.log(err);
    } else {
      console.log('No errors occured');
      let payload = { username, firstName, lastName, email };
      let token = jwt.sign(payload, secret, { expiresIn: 129600 });
      res.json({ success: true, err: null, token });
    }
  });
});

app.post('/updatePassword', (req, res) => {
  const { password, username } = req.body;
  let data = saltHashPassword(password);
  
  connection.query("SELECT salt, hash FROM users WHERE username = ?", username, (err, rows, fields) => {
    if (err) {
      console.log('Error fetching old salt and hash.');
      console.log(err);
      res.json({success: false, err: err, message: 'Error fetching old salt and hash.'})
    } else if(checkPassword(rows[0].salt, rows[0].hash, password)) {
      res.json({success: false, err: null, message: 'New password must not match the old password.'});
    } else {
      connection.query(`UPDATE users SET salt = '${data.salt}', hash = '${data.hash}' WHERE username = '${username}'`, (err, rows, fields) => {
        if (err) {
          console.log('Error updating password');
          console.log(err);
        } else {
          console.log('No errors occured');
          res.json({success: true, err: null, message: 'Password changed successfully.'});
        }
      });
    }
  });
});

/* Home page functions */
const shuffleArray = a => {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

app.get('/getVideos', (req, res) => {  
  connection.query("SELECT * FROM youtube_videos", (err, rows, fields) => {
    if (err) {
      console.log('Error fetching videos');
      console.log(err);
    } else {
      rows = shuffleArray(rows);
      res.json(rows);
    }
  });
});

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));