'use strict'

const db = require('./DB').db;

class queue{

    constructor(id,service){
        this.id=id;
        this.service=service;
        this.queueList=[];
    }
    getId(){
        return this.id;
    }
    getService(){
        return this.service;
    }
    getQueue(){
        return this.queueList;
    }

    pushToQueue(clientWaitNumber){
        this.queueList.push(clientWaitNumber);
    }
    popFromQueue(){
        return new Promise(
            (resolve, reject)=>{
               // console.log(this.queueList.length);
            if(this.queueList.length>0)
                resolve(this.queueList.shift());
            else reject("Error");
            }
        );
       
    }
}


exports.createQueue=(id,service)=>{
    return new queue(id,service);
}


exports.PushToQueue = (clientWaitNumber,queue) => {
    
}
    
exports.popsFromQueue = ()=>{

}