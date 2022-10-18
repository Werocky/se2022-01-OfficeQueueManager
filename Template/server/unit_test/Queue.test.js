const queue = require('../modules/Queue');
const db =require("../modules/DB");

//Tests of no longer used part
// describe("create new Queue", ()=>{
//     test(
        
//         "create new queue correctly", async()=>{
//             var testQueue= queue.createQueue(1,"serviceTest");
//             await expect(testQueue).not.toBe(null);
//             await expect(testQueue.getId()).toBe(1);
//             await expect(testQueue.getService()).toBe("serviceTest");
//             await expect(testQueue.getQueue()).toEqual([]);
//         }   
//     );
//     test("create more than one queue",async()=>{
//         var testQueue=[];
//         testQueue[0]= queue.createQueue(1,"serviceTest");
//         testQueue[1]= queue.createQueue(2,"serviceTest2");
//         await expect(testQueue).not.toBe(null);
//         await expect(testQueue[0]).not.toBe(null);
//         await expect(testQueue[0].getId()).toBe(1);
//         await expect(testQueue[0].getService()).toBe("serviceTest");
//         await expect(testQueue[0].getQueue()).toEqual([]);
//         await expect(testQueue[1]).not.toBe(null);
//         await expect(testQueue[1].getId()).toBe(2);
//         await expect(testQueue[1].getService()).toBe("serviceTest2");
//         await expect(testQueue[1].getQueue()).toEqual([]);
//     });
   
// });
// describe.only ("Push/Pop client numbers into queue",()=>{
//     test(
//         "push new client into queue correctly",()=>{
//             const testQueue=[];
//             testQueue[0]= queue.createQueue(1,"serviceTest");
//             testQueue[1]= queue.createQueue(2,"serviceTest2");
//             testQueue[0].pushToQueue('ST101');
//             testQueue[0].pushToQueue('ST102');
//             expect(testQueue[0].getQueue()).toEqual(['ST101','ST102']);
//            // console.log(testQueue[0].getQueue());        
//         }
//     )

//     test(
//         "pops(shifts) client from queue correctly",async()=>{
//             const testQueue=[];
//             testQueue[0]= queue.createQueue(1,"serviceTest");
//             testQueue[1]= queue.createQueue(2,"serviceTest2");
//             testQueue[0].pushToQueue('ST101');
//             testQueue[0].pushToQueue('ST102');
//             testQueue[0].pushToQueue('ST103');
//             var nextNumber;
//             await expect(nextNumber=testQueue[0].popFromQueue()).resolves.toEqual('ST101');
//             expect(testQueue[0].getQueue()).toEqual(['ST102','ST103']);      
     
//         }
//     )
//     test.only(
//         "trie to pop(shift) client from empty queue",async()=>{
//             const testQueue=[];
//             testQueue[0]= queue.createQueue(1,"serviceTest");
//             testQueue[1]= queue.createQueue(2,"serviceTest2");
//             testQueue[0].pushToQueue('ST101');
//             testQueue[0].pushToQueue('ST102');
//             testQueue[0].pushToQueue('ST103');
//             var nextNumber;
//             await expect(nextNumber=testQueue[1].popFromQueue()).rejects.toEqual('Error');
     
//         }
//     )
// })
beforeAll(async()=>{
    await new Promise(process.nextTick)
    await db.createConnection();
    await queue.emptyQueue();
});
afterAll(async () => {

    await new Promise(process.nextTick);
});
describe("get Queues/Id",()=>{
    beforeEach(async()=>{
        await queue.emptyQueue();
    });
    afterEach(async()=>{
        await queue.emptyQueue();
    });
    test("get all queues (empty)", async()=>{
        await expect(q=queue.getQueues()).resolves.toEqual([]);
        // console.log(q);
    })
    test("get Max ID",async()=>{
        await expect(queue.getMaxIdQueues()).resolves.toEqual(0);
    })  
    //get non empty queues
    test("get NON empty queue list", async()=>{
        await queue.addUserToQueue(0,1,12345,12);
        await queue.addUserToQueue(1,2,12345,12);
        await queue.addUserToQueue(2,1,13541,13);
        
        await expect(q=queue.getQueues()).resolves.toEqual([
            {Id:0,clientNumber:12,service:1, ticketTime:12345,turnTime:0},
            {Id:1,clientNumber:12,service:2, ticketTime:12345,turnTime:0},
            {Id:2,clientNumber:13,service:1, ticketTime:13541,turnTime:0}
        ]);
        //console.log(q);
    })
    test("get HighestID queue list", async()=>{
        await queue.addUserToQueue(0,1,12345,12);
        await queue.addUserToQueue(1,2,12345,12);
        await queue.addUserToQueue(2,1,13541,13);
        
        await expect(queue.getMaxIdQueues()).resolves.toEqual(2);
        //console.log(q);
    })
})

describe("add new client to Queue", ()=>{
    beforeEach(async()=>{
        await queue.emptyQueue();
    });
    afterEach(async()=>{
        await queue.emptyQueue();
    });
    test("add new client to Queue correctly",async()=>{
        await expect(queue.addUserToQueue(0,1,12345,12)).resolves.toEqual("user added to queue")
        await expect(q=queue.getQueues()).resolves.toEqual([{Id:0,clientNumber:12,service:1, ticketTime:12345,turnTime:0}]);
    })
    test("error adding client to Queue",async()=>{
        await queue.addUserToQueue(0,1,12345,12);
        await expect(queue.addUserToQueue(0,2,123124,14)).rejects.not.toEqual(null);
    });
} )

describe("Served client",()=>{
    beforeEach(async()=>{
        await queue.emptyQueue();
        await queue.addUserToQueue(0,1,12345,12);
        await queue.addUserToQueue(1,2,12345,12);
        await queue.addUserToQueue(2,1,13541,13);
    });
    afterEach(async()=>{
        await queue.emptyQueue();
    });

    test.only("correctly Serve a client",async()=>{
        await expect(queue.userServed(12,1,89898)).resolves.toEqual("client 12 Served");
    });

})