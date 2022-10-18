'use strict'

const db = require('./DB').db;



// class queue{

//     constructor(id,service){
//         this.id=id;
//         this.service=service;
//         this.queueList=[];
//     }
//     getId(){
//         return this.id;
//     }
//     getService(){
//         return this.service;
//     }
//     getQueue(){
//         return this.queueList;

//     }

//         pushToQueue(clientWaitNumber){
//         try{
//             this.queueList.push(clientWaitNumber);
//             db.addUserToQueue(this.service,dayjs().format(),clientWaitNumber);  
//             return;
//         }catch(error){
//             return "error adding user";
//         }

//         }
//     popFromQueue(){
//         return new Promise(
//             (resolve, reject)=>{
//                // console.log(this.queueList.length);
//             if(this.queueList.length>0)
//                 resolve(this.queueList.shift());
//             else reject("Error");
//             }
//         );
       
//     }
// }


// exports.createQueue=(id,service)=>{
//     return new queue(id,service);
// }

//get queues
exports.getQueues = () => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM Queue';
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
          
        }
        const queues = rows.map((r) => ({ Id:r.Id, clientNumber: r.clientNumber, service: r.service, ticketTime: r.ticketTime, turnTime: r.turnTime}));
        resolve(queues);
      });
    });
  };

  // add a new user when a service is selected
exports.addUserToQueue = (id, idService, ticketTime, clientNumber) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO Queue VALUES(?,?, ?, ?, ?)';
      db.run(sql, [id, idService, ticketTime, 0, clientNumber], function (err) {//null values must be filled with future implementation
        if (err) {
          reject(err);
          
        }
        resolve("user added to queue");
      });
    });
  };

  // add a new user when a service is selected
exports.userServed = (idUser, serviceId, turnTime) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE Queue SET turnTime=? WHERE service=? AND clientNumber=?';
      db.run(sql, [turnTime, serviceId, idUser], function (err) {//null values must be filled with future implementation
        if (err) {
          reject(err);
          
        }
        resolve("client "+ idUser + " Served");
      });
    });
  };

  exports.getMaxIdQueues=()=>{
    return new Promise((resolve,reject)=>{
      const sql= "SELECT Id FROM Queue ORDER BY Id DESC LIMIT 1"
      db.get(sql,(err,row)=>{
        if (err)
                reject(err);
            else
                resolve(row == undefined ? 0 : row.Id);

      })
    });
  };
  exports.emptyQueue=()=>{
    return new Promise((resolve,reject)=>{
      const sql= "DELETE FROM Queue"
      db.run(sql,[],(err)=>{
        if (err)
                reject(err);
            else
                resolve("emptied Queue");

      })
    });
  }