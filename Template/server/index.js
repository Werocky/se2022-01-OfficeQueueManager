'use strict';

const express = require('express');
const morgan = require('morgan'); // logging middleware
const db = require('./modules/DB.js');
const {check, validationResult} = require('express-validator'); // validation middleware
const passport = require('passport'); // auth middleware
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session'); // enable sessions
const cors = require('cors');

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
  db.getServicesPerOfficer()
    .then(list => res.json(list))
    .catch(() => res.status(500).end());
});

//get Services list
app.get('/getServices', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({error: 'cannot process request'});
  }
  db.getServices()
    .then(list => res.json(list))
    .catch(() => res.status(500).end());
});

//get queues list
app.get('/getQueues', (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({error: 'cannot process request'});
  }
  db.getQueues()
    .then(list => res.json(list))
    .catch(() => res.status(500).end());
});

/*
app.post('/addToQueue',// isLoggedIn, []
async (req, res) => {
const errors = validationResult(res);
  if (!errors.isEmpty()) {
  return res.status(422).json({error: 'cannot process request'});
  }
try {
 await db.addUserToQueue(req.body.idService, req.body.idUser);
 console.log(req.body);
 res.status(201).end();
} catch(err) {
 res.status(503).json({error: `Error during enqueue of user ${req.body.idUser}.`});
}
});
*/

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