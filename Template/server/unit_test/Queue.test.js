const queue = require('../modules/Queue');
import dayjs from 'dayjs'

describe("create new Queue", ()=>{
    test(
        
        "create new queue correctly", async()=>{
            var testQueue= queue.createQueue(1,"serviceTest");
            await expect(testQueue).not.toBe(null);
            await expect(testQueue.getId()).toBe(1);
            await expect(testQueue.getService()).toBe("serviceTest");
            await expect(testQueue.getQueue()).toEqual([]);
        }   
    );
    test("create more than one queue",async()=>{
        var testQueue=[];
        testQueue[0]= queue.createQueue(1,"serviceTest");
        testQueue[1]= queue.createQueue(2,"serviceTest2");
        await expect(testQueue).not.toBe(null);
        await expect(testQueue[0]).not.toBe(null);
        await expect(testQueue[0].getId()).toBe(1);
        await expect(testQueue[0].getService()).toBe("serviceTest");
        await expect(testQueue[0].getQueue()).toEqual([]);
        await expect(testQueue[1]).not.toBe(null);
        await expect(testQueue[1].getId()).toBe(2);
        await expect(testQueue[1].getService()).toBe("serviceTest2");
        await expect(testQueue[1].getQueue()).toEqual([]);
    });
   
});
describe.only ("Push/Pop client numbers into queue",()=>{
    test(
        "push new client into queue correctly",()=>{
            const testQueue=[];
            testQueue[0]= queue.createQueue(1,"serviceTest");
            testQueue[1]= queue.createQueue(2,"serviceTest2");
            testQueue[0].pushToQueue('ST101');
            testQueue[0].pushToQueue('ST102');
            expect(testQueue[0].getQueue()).toEqual(['ST101','ST102']);
           // console.log(testQueue[0].getQueue());        
        }
    )

    test(
        "pops(shifts) client from queue correctly",async()=>{
            const testQueue=[];
            testQueue[0]= queue.createQueue(1,"serviceTest");
            testQueue[1]= queue.createQueue(2,"serviceTest2");
            testQueue[0].pushToQueue('ST101');
            testQueue[0].pushToQueue('ST102');
            testQueue[0].pushToQueue('ST103');
            var nextNumber;
            await expect(nextNumber=testQueue[0].popFromQueue()).resolves.toEqual('ST101');
            expect(testQueue[0].getQueue()).toEqual(['ST102','ST103']);      
     
        }
    )
    test.only(
        "trie to pop(shift) client from empty queue",async()=>{
            const testQueue=[];
            testQueue[0]= queue.createQueue(1,"serviceTest");
            testQueue[1]= queue.createQueue(2,"serviceTest2");
            testQueue[0].pushToQueue('ST101');
            testQueue[0].pushToQueue('ST102');
            testQueue[0].pushToQueue('ST103');
            var nextNumber;
            await expect(nextNumber=testQueue[1].popFromQueue()).rejects.toEqual('Error');
     
        }
    )
})