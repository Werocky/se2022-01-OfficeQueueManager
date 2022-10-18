const db = require('../modules/DB');
describe("Db creation", ()=>{
    test(
        
        "DB creation test", async()=>{
           expect(db.createConnection()).resolves.not.toBe(null) ;
        }   
    );
    
   
});