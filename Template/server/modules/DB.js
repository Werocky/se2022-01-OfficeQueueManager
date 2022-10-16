'use strict';

const sqlite = require('sqlite3');
const crypto = require('crypto');

//open db
const db = new sqlite.Database('./OfficeQueueManagement.db', (err) => {
  if(err) throw err;
});


//get the full list of available courses
exports.getServicesPerOfficer = () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM ServicesPerOfficer';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const officer_services = rows.map((r) => ({ id: r.id, idOfficer: r.idOfficer, idService: r.idService}));
      resolve(officer_services);
    });
  });
};

//get the full list of available services
exports.getServices = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Services';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const services = rows.map((r) => ({ id: r.id, name: r.name, tr: r.tr}));
        resolve(services);
      });
    });
  };

//get queues
exports.getQueues = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Queue';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        const queues = rows.map((r) => ({ userId: r.userId, idService: r.idService, ticketTime: r.ticketTime, turnTime: r.turnTime}));
        resolve(queues);
      });
    });
  };

// add a new user when a service is selected
exports.addUserToQueue = (idService, idUser) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO Queue (userId, idService, tickeTime, turnTime) VALUES(?, ?, ?, ?)';
      db.run(sql, [idUser, idService, 0, 0], function (err) {//null values must be filled with future implementation
        if (err) {
          reject(err);
          return;
        }
        resolve(null);
      });
    });
  };

  