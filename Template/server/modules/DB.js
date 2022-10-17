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
      console.log(officer_services);
      resolve(officer_services);
    });
  });
};

//get the full list of available services
exports.getServices = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Service';
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
exports.addUserToQueue = (idService, ticketTime, clientWaitNumber) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO Queue(service, ticketTime, clientWaitNumber) VALUES(?, ?, ?)';
      db.run(sql, [idService, ticketTime, clientWaitNumber], function (err) {//null values must be filled with future implementation
        if (err) {
          reject(err);
          return;
        }
        resolve(null);
      });
    });
  };

exports.getMaxUser = (idService) => {
  return new Promise((Resolve, reject) => {
    const sql = 'SELECT MAX(clientWaitNumber) FROM Queue WHERE service=?';
    db.all(sql, [idService],(err, row) => {
      if(err) {
        reject(err);
        return;
      }
      return row;
    } )
  })
}

// add a new user when a service is selected
exports.userServed = (idUser, turnTime) => {
  return new Promise((resolve, reject) => {
    const sql = 'UPDATE Queue SET turnTime=? WHERE Id=?';
    db.run(sql, [turnTime, idUser/* JUST A STATIC VALUE */], function (err) {//null values must be filled with future implementation
      if (err) {
        reject(err);
        return;
      }
      resolve(null);
    });
  });
};

  