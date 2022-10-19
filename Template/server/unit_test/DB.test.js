const db = require('../modules/DB');
const dayjs = require('dayjs');

describe("Insert and display user in queue", ()=>{
    let currentTime = dayjs();
    test("Insert user in the queue", async()=>{
            var test1 = db.addUserToQueue(1, currentTime, 1);
            var test2 = db.addUserToQueue(2, currentTime, 2);
            await expect(test1).not.toBe(null);
            await expect(test1.idService).toBe(1);
            await expect(test1.clientWaitNumber).toBe(1);
            await expect(test1.ticketTime).toBe(currentTime);
            await expect(test2).not.toBe(null);
            await expect(test2.idService).toBe(2);
            await expect(test2.clientWaitNumber).toBe(2);
            await expect(test2.ticketTime).toBe(currentTime);
            await expect(true).not.toBe(null); 
        }   
    );

    test("Display user", async() =>{
        let test = db.getQueues();
        await expect(test).not.toBe(null);
        await expect(test[0].userId).toBe(1);
        await expect(test[0].idService).toBe(1);
        await expect(test[0].ticketTime).toBe(currentTime);
        await expect(test[1].userId).toBe(2);
        await expect(test[1].idService).toBe(2);
        await expect(test[1].ticketTime).toBe(currentTime);
    });
    
});