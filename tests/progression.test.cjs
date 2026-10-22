const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
function boot(saved) {
 let storage=saved===null?null:JSON.stringify(saved),writes=0;
 const context=vm.createContext({localStorage:{getItem:()=>storage,setItem:(key,value)=>{storage=value;writes++;}}});
 context.window=context;
 for(const file of ['data.js','progression.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'../dist/js',file),'utf8'),context);
 return {OP:context.OP,writes:()=>writes,read:()=>JSON.parse(storage)};
}
const legacy={version:1,berries:245,completed:[0,2],selected:'zoro',chapter:2,upgrades:{hull:3},runs:7,kills:320,best:190,records:[{stage:0,char:'luffy',time:190}],settings:{sound:false,shake:false,effects:true,difficulty:'normal'},futureField:{keep:true}};
test('legacy saves gain zero tickets without losing progress or writing on load',()=>{
 const {OP,writes,read}=boot(legacy);
 assert.equal(OP.save.tickets,0);assert.equal(writes(),0);
 for(const [key,value] of Object.entries(legacy))assert.deepEqual(JSON.parse(JSON.stringify(OP.save[key])),value);
 assert.equal(OP.unlocked(OP.characters.find(c=>c.id==='zoro')),true);
 assert.equal(OP.persist(),true);assert.equal(writes(),1);
 assert.deepEqual(read(),{...legacy,tickets:0});
});
test('ticket balances survive round trips without grants or consumption',()=>{
 const {OP,read}=boot({...legacy,tickets:17});
 assert.equal(OP.save.tickets,17);OP.persist();
 const loaded=boot(read()).OP;assert.equal(loaded.save.tickets,17);
 assert.equal(loaded.load().tickets,17);assert.equal(loaded.save.berries,245);
});
test('invalid ticket balances normalize safely; valid integer balances remain intact',()=>{
 for(const value of [-3,1.5,'15',null,{},9007199254740992])assert.equal(boot({...legacy,tickets:value}).OP.save.tickets,0);
 assert.equal(boot({...legacy,tickets:0}).OP.save.tickets,0);
 assert.equal(boot({...legacy,tickets:42}).OP.save.tickets,42);
});
test('new saves and resets include zero tickets and original defaults',()=>{
 const {OP,writes}=boot(null);
 assert.equal(OP.save.version,1);assert.equal(OP.save.tickets,0);assert.equal(OP.save.berries,0);
 assert.equal(OP.defaultSave().tickets,0);assert.equal(OP.save.selected,'luffy');assert.equal(writes(),0);
});
test('only provisionally approved probabilities and costs exist; recruitment stays disabled',()=>{
 const {OP}=boot(legacy),rules=OP.recruitmentRules;
 assert.equal(rules.enabled,false);assert.equal(rules.costs[1],1);assert.equal(rules.costs[5],5);
 assert.deepEqual(Array.from(rules.rates,r=>r.percent),[1,5,24,70]);
 assert.equal(rules.rates.reduce((sum,r)=>sum+r.percent,0),100);
 assert.equal(Object.isFrozen(rules),true);assert.equal(Object.isFrozen(rules.rates),true);
 assert.equal(OP.save.tickets,0);assert.equal(OP.save.berries,245);
});
