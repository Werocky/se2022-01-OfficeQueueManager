const db = require('./DB').db;

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
  