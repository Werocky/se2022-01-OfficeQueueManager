'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const db = require('./modules/DB.js');
const {check, validationResult} = require('express-validator'); // validation middleware
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const cors = require('cors');
const serv=require('./modules/Services.js');
const queue=require('./modules/Queue.js');
const authN = require('./modules/authN.js');

/*** Set up Passport ***/

//configurating function to verify login and password
passport.use(new LocalStrategy(
  function(username, password, done) {
    authN.checkCredentials(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });
        
      return done(null, user);
    })
  }
));

// getting session from user 
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// getting user from session
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); 
    }).catch(err => {
      done(err, null);
    });
});

/*** Ending setting up passport***/ 

// init express
const app = new express();
const port = 3001;

app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};
app.use(cors(corsOptions));

/* API */
//get service-officer binding
app.get('/getServicesPerOfficer', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({error: 'cannot process request'});
  }
  serv.getServicesPerOfficer()
    .then(list => res.json(list))
    .catch(() => res.status(500).end());
});

//get Services list
app.get('/getServices', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({error: 'cannot process request'});
  }
  serv.getServices()
    .then(list => res.json(list))
    .catch(() => res.status(500).end());
});

//get queues list
app.get('/getQueues', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({error: 'cannot process request'});
  }
  queue.getQueues()
    .then(list => res.json(list))
    .catch(() => res.status(500).end());
});

//enqueue
app.post('/addToQueue',// isLoggedIn, []
  async (req, res) => {
  const errors = validationResult(res);
    if (!errors.isEmpty()) {
      return res.status(422).json({error: 'cannot process request'});
    }
  const idService = req.body.idService;
  const ticketTime = req.body.ticketTime;
  const clientWaitNumber = req.body.clientWaitNumber;
  try {
    await queue.addUserToQueue(3/* TODO: STATIC RANDOM VALUE */, idService, ticketTime, clientWaitNumber);
    console.log(req.body);
    res.status(201).end();
  } catch(err) {
    res.status(503).json({error: `Error during enqueue`});
  }
});

// get max user
app.get('/queue/:idService', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({error: 'cannot process request'});
  }
  serv.getMaxUser(req.params.idService)
  .then(el => res.json(el))
  .catch(() => res.status(500).end());
});

//served user
app.put('/userServed',// isLoggedIn, []
  async (req, res) => {
  const errors = validationResult(res);
    if (!errors.isEmpty()) {
      return res.status(422).json({error: 'cannot process request'});
    }
  const turnTime = req.body.turnTime;
  const idUser = 3; //logic to assign id to users must be implemented
  try {
    await queue.userServed(idUser, turnTime);
    console.log(req.body);
    res.status(201).end();
  } catch(err) {
    res.status(503).json({error: `Error during enqueue of user ${req.body.idUser}.`});
  }
});


/*** Users APIs ***/

// POST /sessions 
// login
app.post('/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        return res.status(401).json(info);
      }
      req.login(user, (err) => {
        if (err)
          return next(err);
        return res.json(req.user);
      });
  })(req, res, next);
});

// DELETE /sessions/current 
// logout
app.delete('/sessions/current', (req, res) => {
  req.logout( ()=> { res.end(); } );
});

// GET /sessions/current
// check if user is logged in or not
app.get('/sessions/current', (req, res) => {  if(req.isAuthenticated()) {
    res.status(200).json(req.user);}
  else
    res.status(401).json({error: 'Unauthenticated user!'});;
});

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});