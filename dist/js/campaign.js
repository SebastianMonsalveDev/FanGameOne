'use strict';
/* GDD calendar only: no invented encounter stats, spawns, rewards or chaos scaling.
 * The East Blue engine stays separate until the new encounter content is approved.
 */
OP.Campaign = (() => {
 const ISLAND_SECONDS = 180;
 const CHAOS_AT = 1800;
 const stages = Object.freeze([
  ['arabasta','Arabasta','Crocodile / Baroque Works'],
  ['skypiea','Skypiea','Enel y sacerdotes'],
  ['water7','Water 7','CP9 · representación por definir'],
  ['impeldown','Impel Down','Magellan y guardianes'],
  ['punkhazard','Punk Hazard','Caesar, Monet y Vergo'],
  ['dressrosa','Dressrosa','Doflamingo y su familia'],
  ['wholecake','Whole Cake','Big Mom, Katakuri y comandantes'],
  ['wano','Wano','Kaido y Piratas Bestia'],
  ['godvalley','God Valley','Encuentros por definir'],
  ['elbaf','Elbaf','Enemigos y jefe por definir']
 ].map(([id,title,adversaries],index)=>Object.freeze({
  id,title,adversaries,index,start:index*ISLAND_SECONDS,end:(index+1)*ISLAND_SECONDS
 })));
 function create() {
  return {time:0,phase:'islands',stageIndex:0,boss:null,bossHistory:[],defeatedBosses:[],setsUnlocked:0};
 }
 function stageAt(time) {
  if(!Number.isFinite(time)||time<0)throw new RangeError('Tiempo de campaña inválido');
  return time<CHAOS_AT?stages[Math.floor(time/ISLAND_SECONDS)]:null;
 }
 function current(run) {
  const stage=stageAt(run.time);
  return {
   phase:run.phase,stage,time:run.time,
   islandTime:stage?run.time-stage.start:null,
   remaining:stage?stage.end-run.time:0,
   chaosTime:Math.max(0,run.time-CHAOS_AT)
  };
 }
 function registerBoss(run,id,kind='main') {
  if(!['main','mini','chaos'].includes(kind))throw new TypeError('Tipo de encuentro inválido');
  if(typeof id!=='string'||!id.trim())throw new TypeError('Identificador de jefe requerido');
  if(run.phase==='chaos'&&kind!=='chaos')return false;
  if(run.phase==='islands'&&kind==='chaos')return false;
  if(run.boss?.status==='active')return false;
  // A main encounter is unique per island; escaped/defeated bosses cannot be re-registered.
  if(kind==='main'&&run.bossHistory.some(b=>b.kind==='main'&&b.stageIndex===run.stageIndex))return false;
  const boss={id,kind,stageIndex:run.stageIndex,status:'active',startedAt:run.time};
  run.boss=boss;
  run.bossHistory.push(boss);
  return true;
 }
 function defeatBoss(run) {
  const boss=run.boss;
  if(!boss||boss.status!=='active')return null;
  boss.status='defeated';boss.endedAt=run.time;
  if(boss.kind==='main') {
   run.defeatedBosses.push({...boss});
   run.setsUnlocked=Math.min(2,run.defeatedBosses.length);
  }
  return {type:'boss-defeated',boss:{...boss},rewardEligible:true,setsUnlocked:run.setsUnlocked,time:run.time};
 }
 function advance(run,seconds) {
  if(!Number.isFinite(seconds)||seconds<0||!Number.isFinite(run.time+seconds))throw new RangeError('Avance de tiempo inválido');
  const target=run.time+seconds,events=[];
  while(run.phase==='islands'&&target>=stages[run.stageIndex].end) {
   const finished=stages[run.stageIndex];
   run.time=finished.end;
   if(run.boss?.status==='active') {
    run.boss.status='escaped';run.boss.endedAt=run.time;
    events.push({type:'boss-retreated',boss:{...run.boss},rewardEligible:false,time:run.time});
   }
   run.boss=null;
   if(run.time===CHAOS_AT) {
    run.phase='chaos';run.stageIndex=null;
    events.push({type:'chaos-started',time:CHAOS_AT});
   } else {
    run.stageIndex++;
    events.push({type:'island-started',stage:stages[run.stageIndex],time:run.time});
   }
  }
  run.time=target;
  return events;
 }
 function chaosCandidates(run) {
  return run.phase==='chaos'?run.defeatedBosses.map(b=>({...b})):[];
 }
 return Object.freeze({ISLAND_SECONDS,CHAOS_AT,stages,create,stageAt,current,registerBoss,defeatBoss,advance,chaosCandidates});
})();
