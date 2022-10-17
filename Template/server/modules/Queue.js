'use strict'

const db = require('./DB').db;
import dayjs from 'dayjs'


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
          return;
        }
        const queues = rows.map((r) => ({ userId: r.userId, idService: r.idService, ticketTime: r.ticketTime, turnTime: r.turnTime}));
        resolve(queues);
      });
    });
  };

  // add a new user when a service is selected
exports.addUserToQueue = (idService, ticketTime, idUser) => {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO Queue VALUES(?, ?, ?, ?)';
      db.run(sql, [idUser/* JUST A STATIC VALUE */, idService, ticketTime, 0], function (err) {//null values must be filled with future implementation
        if (err) {
          reject(err);
          return;
        }
        resolve(null);
      });
    });
  };