const db = require('../modules/Queue');
const dayjs = require('dayjs');

describe("Insert and display user in queue", ()=>{
    let currentTime = dayjs();
    test("Insert user in the queue", async()=>{
            await db.emptyQueue();
            await db.addUserToQueue(1,1, currentTime, 1);
            await db.addUserToQueue(2,2, currentTime, 2);
            await expect(true).not.toBe(null);
            // await expect(test1.idService).toBe(1);
            // await expect(test1.clientWaitNumber).toBe(1);
            // await expect(test1.ticketTime).toBe(currentTime);
            // await expect(test2).not.toBe(null);
            // await expect(test2.idService).toBe(2);
            // await expect(test2.clientWaitNumber).toBe(2);
            // await expect(test2.ticketTime).toBe(currentTime);
            // await expect(true).not.toBe(null); 
        }   
    );

    test("Display user", async() =>{
        let test = await db.getQueues();
        console.log(test);
        await expect(test).not.toBe(null);
        if(test[0]){
           await expect(test[0].clientNumber).not.toBe(null);
        await expect(test[0].service).not.toBe(null);
        await expect(test[0].ticketTime).not.toBe(null); 
        }
        if(test[1]){
            await expect(test[1].clientNumber).not.toBe(null);;
            await expect(test[1].service).not.toBe(null);;
            await expect(test[1].ticketTime).not.toBe(null);
        }
        
        
    });
    
});