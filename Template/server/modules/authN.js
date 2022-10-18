'use strict';
const db = require('./DB').db;

exports.checkCredentials = (Id, password) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Officer WHERE Id = ?';
      db.get(sql, [Id], (err, row) => {
        if (err) { reject(err); }
        else if (row === undefined) { resolve(false); }
        else {
          const officerId = row.Id;
          const salt = row.salt;
          crypto.scrypt(password, salt, 64, (err, hashedPassword) => {
            if (err) reject(err);

            const passwordHex = Buffer.from(row.hash, 'hex');

            if(!crypto.timingSafeEqual(passwordHex, hashedPassword))
              resolve(false);
            else resolve(officerId); 
          });
        }
      });
    });
  };