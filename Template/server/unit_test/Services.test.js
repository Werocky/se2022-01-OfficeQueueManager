const serviceQueue = require('../modules/Services');
const db =require("../modules/DB");
//may take out to queue test
const queue = require('../modules/Queue');

beforeAll(async()=>{
    await new Promise(process.nextTick)
    await db.createConnection();
    await serviceQueue.emptyServicesQueue();
    await serviceQueue.emptyServicesPerOfficerQueue();
    
});
afterAll(async () => {

    await new Promise(process.nextTick);
});

describe("add service",()=>{
    test("add a new service",()=>{
        expect(serviceQueue.addNewService(1,'name',null)).resolves.toEqual('inserted new service');
    })
})

describe("Get services",()=>{

    test("get all services",async()=>{

        await serviceQueue.addNewService(1,'serviceOne',null);
        await serviceQueue.addNewService(2,'serviceTwo',null);
        await serviceQueue.addNewService(3,'serviceThree',null);

        await expect(s=serviceQueue.getServices()).resolves.toEqual([{Id:1,name:'serviceOne',tr:null},
        {Id:2,name:'serviceTwo',tr:null},
        {Id:3,name:'serviceThree',tr:null}])
        console.log(s)
    })
})


// may be moved to queue test
describe("get MaxUser",()=>{
    beforeEach(
        async()=>{
            await serviceQueue.emptyServicesQueue();
            await serviceQueue.addNewService(1,'serviceOne',null);
            await serviceQueue.addNewService(2,'serviceTwo',null);
            await serviceQueue.addNewService(3,'serviceThree',null);
            await queue.emptyQueue();
            await queue.addUserToQueue(0,1,12345,12);//(id,servicce,time,clientNumber)
            await queue.addUserToQueue(1,2,12345,12);
            await queue.addUserToQueue(2,1,13541,13);
        }
    );
    
    test("get the highest Number of a specific Queue",async()=>{
        await expect(serviceQueue.getMaxUser(1)).resolves.toEqual(13)
        await expect(serviceQueue.getMaxUser(2)).resolves.toEqual(12)
        await expect(serviceQueue.getMaxUser(3)).resolves.toEqual(0)
    });
})