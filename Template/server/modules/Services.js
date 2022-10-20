const db = require('./DB').db;

//get the full list of available services per officer
exports.getServicesPerOfficer = () => {
  return new Promise(async(resolve, reject) => {
    const sql = 'SELECT * FROM ServicesPerOfficer';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const officer_services = rows.map((r) => ({ Id: r.Id, idOfficer: r.idOfficer, idService: r.idService}));
      resolve(officer_services);
    });
  });
};

//get the full list of available services per officer
exports.getServicesPerId = (Id) => {
  return new Promise(async(resolve, reject) => {
    const sql = 'SELECT * FROM ServicesPerOfficer WHERE idOfficer=? ';
    db.all(sql, [Id], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const servicesWithId = rows.map((r) => ({ Id: r.Id, idOfficer: r.idOfficer, idService: r.idService}));
      resolve(servicesWithId);
    });
  });
};

  //get the full list of available services
exports.getServices = () => {
  return new Promise(async(resolve, reject) => {
    const sql = 'SELECT * FROM Services';
    db.all(sql, [], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      const services = rows.map((r) => ({ Id: r.Id, name: r.name, tr: r.tr}));
      resolve(services);
    });
  });
};
//should be moved to QUEUE
exports.getMaxUser = (idService) => {
  return new Promise(async(resolve, reject) => {
    const sql = 'SELECT clientNumber FROM Queue WHERE service=? ORDER BY clientNumber DESC LIMIT 1';
    db.get(sql, [idService],(err, row) => {
      if(err) {
        reject(err);
        
      }
        resolve(row == undefined ? 0 : row.clientNumber);
    } )
  })
}
  
exports.emptyServicesQueue=()=>{
  return new Promise(async(resolve,reject)=>{
    const sql= "DELETE FROM Services"
    db.run(sql,[],(err)=>{
      if (err)
              reject(err);
          else
              resolve("emptied Queue");

    })
  });
}

exports.emptyServicesPerOfficerQueue=()=>{
  return new Promise(async(resolve,reject)=>{
    const sql= "DELETE FROM ServicesPerOfficer"
    db.run(sql,[],(err)=>{
      if (err)
              reject(err);
          else
              resolve("emptied Queue");

    })
  });
}

exports.addNewService=(id, name, tr)=>{
  return new Promise(async(resolve,reject)=>{
    const sql= "INSERT INTO Services (Id,name,tr) VALUES (?,?,?)"
    db.run(sql,[id,name,tr],function(err){
      if(err)reject(err);
      else resolve('inserted new service');
    })
  });
}

exports.getCurrentUser=(serviceId)=>{
  return new Promise(async(resolve,reject)=>{
    const sql= "SELECT max(clientNumber) as cNum from Queue where turnTime=0 and service=?"
      db.get(sql,[serviceId] ,  (err,row)=> {  // <-- NB: function, NOT arrow function so this.lastID works
        if (err) {
          reject(err);
          return;
        }
      resolve(row.cNum);
      })
    })};