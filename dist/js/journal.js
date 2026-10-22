'use strict';
OP.Journal = {
 names:{marine:'Marina',pirate:'Pirata',cat:'Piratas del Gato Negro',kriegr:'Armada de Krieg',fishman:'Hombres pez',morgan:'Morgan',buggy:'Buggy',kuro:'Kuro',krieg:'Don Krieg',arlong:'Arlong',baroque:'Agente Baroque Works',baroque_elite:'Élite Baroque Works',mr1:'Mr. 1 · Daz Bones',crocodile:'Crocodile',sky_guard:'Guardián de Skypiea'},
 encounter(s,e) {
  s.encounters ||= {};
  s.encounters[e.id] ||= {seen:0,defeated:0};s.encounters[e.id].seen++;
 },
 defeat(s,e) {
  s.encounters ||= {};s.encounters[e.id] ||= {seen:1,defeated:0};s.encounters[e.id].defeated++;
 },
 settle(s) {
  const bestiary=OP.save.bestiary ||= {};
  for(const [id,counts] of Object.entries(s.encounters||{})) {
   const entry=bestiary[id] ||= {seen:0,defeated:0};
   entry.seen+=counts.seen;entry.defeated+=counts.defeated;
  }
  s.encounters={};
  const records=OP.save.characterRecords ||= {};
  const record=records[s.char.id] ||= {stages:0,kills:0,best:0};
  record.stages++;record.kills+=s.kills-(s.journalKillsSettled||0);record.best=Math.max(record.best,(s.expeditionTime||0)+s.time);
  s.journalKillsSettled=s.kills;
 }
};
(() => {
 const normalize=OP.normalizeProgress,defaults=OP.defaultSave;
 const count=n=>Number.isSafeInteger(n)&&n>=0?n:0;
 const duration=n=>Number.isFinite(n)&&n>=0?n:0;
 OP.defaultSave=()=>({...defaults(),bestiary:{},characterRecords:{},bestExpedition:0});
 OP.normalizeProgress=save=>{
  const result=normalize(save),bestiary={},characterRecords={};
  for(const id of Object.keys(OP.Journal.names)) {
   const value=save.bestiary?.[id];if(value&&typeof value==='object')bestiary[id]={seen:count(value.seen),defeated:count(value.defeated)};
  }
  for(const c of OP.characters) {
   const value=save.characterRecords?.[c.id];if(value&&typeof value==='object')characterRecords[c.id]={stages:count(value.stages),kills:count(value.kills),best:duration(value.best)};
  }
  return {...result,bestiary,characterRecords,bestExpedition:duration(save.bestExpedition)};
 };
 OP.save=OP.normalizeProgress(OP.save);
})();
