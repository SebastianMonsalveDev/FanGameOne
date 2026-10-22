const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const context = vm.createContext({OP:{}});
vm.runInContext(fs.readFileSync(path.join(__dirname,'../dist/js/campaign.js'),'utf8'),context);
const C = context.OP.Campaign;
const plain = value => JSON.parse(JSON.stringify(value));

test('ten approved islands use exact three-minute windows',()=>{
 assert.deepEqual(Array.from(C.stages,s=>s.title),['Arabasta','Skypiea','Water 7','Impel Down','Punk Hazard','Dressrosa','Whole Cake','Wano','God Valley','Elbaf']);
 for(const stage of C.stages) {
  assert.equal(stage.end-stage.start,180);
  assert.equal(C.stageAt(stage.start).id,stage.id);
  assert.equal(C.stageAt(stage.end-.001).id,stage.id);
 }
 assert.equal(C.stageAt(1800),null);
});
test('early victory never advances the global clock or changes islands',()=>{
 const run=C.create();
 C.advance(run,40);C.registerBoss(run,'fixture-main');
 const event=C.defeatBoss(run);
 assert.equal(event.rewardEligible,true);
 assert.equal(run.time,40);assert.equal(run.stageIndex,0);assert.equal(run.setsUnlocked,1);
 assert.equal(C.defeatBoss(run),null);
 assert.equal(C.registerBoss(run,'fixture-second-main'),false);
 C.advance(run,139.999);assert.equal(run.stageIndex,0);
 C.advance(run,.001);assert.equal(run.stageIndex,1);assert.equal(run.time,180);
});
test('an escaping boss gives no rewards or sets, and does not block progression',()=>{
 const run=C.create();C.registerBoss(run,'fixture-escaped');
 const events=C.advance(run,180);
 assert.equal(events[0].type,'boss-retreated');assert.equal(events[0].time,180);
 assert.equal(events[0].rewardEligible,false);assert.equal(run.bossHistory[0].status,'escaped');
 assert.equal(run.setsUnlocked,0);assert.equal(run.defeatedBosses.length,0);
 assert.equal(run.stageIndex,1);assert.equal(C.defeatBoss(run),null);
});
test('only actual main victories unlock sets; minibosses never count',()=>{
 const run=C.create();C.registerBoss(run,'fixture-mini','mini');C.defeatBoss(run);
 assert.equal(run.setsUnlocked,0);
 C.registerBoss(run,'fixture-main-a');C.defeatBoss(run);
 assert.equal(run.setsUnlocked,1);
 C.advance(run,180);C.registerBoss(run,'fixture-escaped');C.advance(run,180);
 assert.equal(run.setsUnlocked,1);
 C.registerBoss(run,'fixture-main-b');C.defeatBoss(run);
 assert.equal(run.setsUnlocked,2);
 C.advance(run,180);C.registerBoss(run,'fixture-main-c');C.defeatBoss(run);
 assert.equal(run.setsUnlocked,2);
});
test('chaos starts exactly at 30:00 even when no boss was defeated',()=>{
 const run=C.create();
 C.advance(run,1799.999);assert.equal(run.phase,'islands');assert.equal(run.stageIndex,9);
 C.registerBoss(run,'fixture-final');
 const events=C.advance(run,.001);
 assert.equal(run.phase,'chaos');assert.equal(run.time,1800);assert.equal(run.stageIndex,null);
 assert.equal(events[0].type,'boss-retreated');assert.equal(events[0].rewardEligible,false);
 assert.equal(events[1].type,'chaos-started');assert.equal(events[1].time,1800);
 assert.deepEqual(plain(C.chaosCandidates(run)),[]);
});
test('large time steps visit every boundary once, and chaos uses only defeated bosses',()=>{
 const run=C.create();C.registerBoss(run,'fixture-victor');C.defeatBoss(run);
 const events=C.advance(run,1820);
 assert.equal(events.filter(e=>e.type==='island-started').length,9);
 assert.equal(events.filter(e=>e.type==='chaos-started').length,1);
 assert.equal(C.current(run).chaosTime,20);
 const candidates=C.chaosCandidates(run);
 assert.equal(candidates.length,1);assert.equal(candidates[0].id,'fixture-victor');
 candidates[0].id='changed';assert.equal(run.defeatedBosses[0].id,'fixture-victor');
 assert.equal(C.registerBoss(run,'fixture-chaos','chaos'),true);C.defeatBoss(run);
 assert.equal(run.defeatedBosses.length,1);assert.equal(run.setsUnlocked,1);
 assert.equal(C.advance(run,1).length,0);
});
test('zero time does nothing; invalid time cannot mutate the calendar',()=>{
 const run=C.create(),before=plain(run);
 assert.equal(C.advance(run,0).length,0);assert.deepEqual(plain(run),before);
 for(const value of [-1,NaN,Infinity]) {
  assert.throws(()=>C.advance(run,value));assert.deepEqual(plain(run),before);
  assert.throws(()=>C.stageAt(value));
 }
});
test('calendar never resets existing player, skills or run progression',()=>{
 const run=C.create();
 // Future engine integration keeps these existing objects on the same run.
 run.player={hp:73,max:130};run.ranks={power:2};run.bonusSkills=['aura'];run.gold=123;run.level=6;
 const player=run.player,ranks=run.ranks,skills=run.bonusSkills;
 C.advance(run,1800);
 assert.strictEqual(run.player,player);assert.strictEqual(run.ranks,ranks);assert.strictEqual(run.bonusSkills,skills);
 assert.equal(player.hp,73);assert.equal(run.gold,123);assert.equal(run.level,6);
});
