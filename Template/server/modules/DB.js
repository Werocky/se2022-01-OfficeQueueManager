'use strict';

const sqlite = require('sqlite3');
const crypto = require('crypto');

//open db
// const db = new sqlite.Database('./OfficeQueueManagement.db', (err) => {
//   if(err) throw err;
// });
//create DB
class DatabaseConnection{
  static db = new sqlite.Database('./OfficeQueueManagement.db', (err) => {
    if(err) throw err;
  });

  static async createConnection(){


    await this.createTableQueues();
    
    await this.createTableServices();
    
    await this.createTableOfficerServices();
    
    await this.createTableOfficers();
    
    //for testign purposes
    await this.emptyTables();
    
    await this.populateTables();
    


  }

  static createTableOfficerServices(){
    
    return new Promise(async (resolve,reject)=>{
      const sql = "CREATE TABLE IF NOT EXISTS ServicesPerOfficer(Id INTEGER, idOfficer INTEGER, idService INTEGER )"
      this.db.run(sql, [],function (err){
          if(err)reject(err);
        else {
          resolve('Table Created');
        }
      })
    }

    )
  }
  static createTableOfficers(){
    return new Promise(async (resolve,reject)=>{
        const sql = "CREATE TABLE IF NOT EXISTS Officer (Id INTEGER PRIMARY KEY NOT NULL, hash TEXT NOT NULL,salt INTEGER NOT NULL)"
        this.db.run(sql, [],function (err){
        if(err)reject(err);
        else {
          resolve('Table Created');
        }
      })
    }

    )
  }
  static createTableServices(){
    return new Promise(async (resolve,reject)=>{
      const sql = "CREATE TABLE IF NOT EXISTS Services(Id INTEGER PRIMARY KEY NOT NULL,name TEXT, tr INTEGER)"
      this.db.run(sql, [],function (err){
        if(err)reject(err);
        else {
          resolve('Table Created');
        }
      })
    }

    )
  }
  static createTableQueues(){
    return new Promise(async (resolve,reject)=>{
      const sql = "CREATE TABLE IF NOT EXISTS Queue (Id INTEGER PRIMARY KEY UNIQUE NOT NULL, service INTEGER,ticketTime NUMERIC, turnTime INTEGER, clientNumber INTEGER)"
      this.db.run(sql, [],function (err){
        if(err)reject(err);
        else {
          resolve('Table Created');
        }
      })
    }

    )
  }

  static async emptyTables(){
    await this.emptyOfficers();
    await this.emptyServicesPerOfficer();
    await this.emptyServices();
    await this.emptyQueues(); 
  }
  static async populateTables(){
    await this.populateOfficers();
    await this.populateServicesPerOfficer();
    await this.populateServices();
    await this.populateQueues(); 
  }

  static emptyOfficers(){
    return new Promise((resolve, reject) => {
        const sql_query = "DELETE FROM Officer";
        this.db.run(sql_query, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(null);
        });
    });
}
  static emptyServicesPerOfficer(){
    return new Promise((resolve, reject) => {
        const sql_query = "DELETE FROM ServicesPerOfficer";
        this.db.run(sql_query, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(null);
        });
    });
}
  static emptyServices(){
    return new Promise((resolve, reject) => {
        const sql_query = "DELETE FROM Services";
        this.db.run(sql_query, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(null);
        });
    });
}
  static emptyQueues(){
    return new Promise((resolve, reject) => {
        const sql_query = "DELETE FROM Queue";
        this.db.run(sql_query, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(null);
        });
    });
}

static populateOfficers(){
  return new Promise(async (resolve, reject) => {
      const sql = "INSERT INTO Officer (id, hash, salt) VALUES (1,'1a42b2b340fb544339c01cf46a523f08abdf2f214b43058e163087a4ecd8dfbe',1234), " +
      "(2,'54257f503fb231a89fd579bb7b62957849de0b7ebba6c0b2d2365f8e7ab08623',3456),"+
      "(3,'6e00e9d2109ffcdd671bf950b989deffd2f9eb8e4be8bf6030bd12401598769e',982);"; 
      this.db.run(sql, [], function (err) {
          if (err)
              reject(err);
          else {
              resolve('Tables created');
          }
      });
  });
}
static populateServicesPerOfficer(){
  return new Promise(async (resolve, reject) => {
      const sql = "INSERT INTO ServicesPerOfficer (id, idOfficer, idService) VALUES (1,1,1), " +
      "(2,1,2), "+
      "(3,2,1), "+
      "(4,2,3), "+
      "(5,3,1);";

      this.db.run(sql, [], function (err) {
          if (err)
              reject(err);
          else {
              resolve('Tables created');
          }
      });
  });
}
static populateServices(){
  return new Promise(async (resolve, reject) => {
      const sql = "INSERT INTO Services(id,name,tr) VALUES (1,'serviceOne',null), " +
      "(2,'serviceTwo',null), "+
      "(5,'serviceThree',null);";

      this.db.run(sql, [], function (err) {
          if (err)
              reject(err);
          else {
              resolve('Tables created');
          }
      });
  });
}
static populateQueues(){return;} 

  
}

module.exports = DatabaseConnection;
  