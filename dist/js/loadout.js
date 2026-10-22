'use strict';
/* Uses only the four techniques and their combat values already in the prototype. */
OP.Loadout = {
 passiveIds:['power','health','speed','cooldown','range','magnet'],
 init(s) {
  s.loadout={selected:'main',sets:[[],[]],activeSet:0,unlocked:0,mainVictories:[],cooldowns:{},passives:['innate']};
 },
 known(s) {return ['main','special',...s.bonusSkills]},
 entries(s) {return this.known(s).map(id=>({id,name:id==='main'?s.char.weapon:id==='special'?s.char.special:OP.techniques[s.char.id][id==='aura'?1:0].name,icon:id==='main'?s.char.icon:id==='special'?'✦':id==='aura'?'◉':'➶'}))},
 active(s,id) {
  if(!s.loadout)return true;
  return s.loadout.unlocked?s.loadout.sets[s.loadout.activeSet].includes(id):s.loadout.selected===id;
 },
 select(s,id) {
  if(!this.known(s).includes(id)||s.loadout.unlocked)return false;
  s.loadout.selected=id;return true;
 },
 cycle(s,step) {
  if(!s?.loadout||s.mode!=='playing')return;
  const l=s.loadout;
  if(l.unlocked)l.activeSet=(l.activeSet+step+l.unlocked)%l.unlocked;
  else {const ids=this.known(s);l.selected=ids[(ids.indexOf(l.selected)+step+ids.length)%ids.length]}
  OP.Game.updateSkills();
 },
 assign(s,index,ids) {
  if(!s.loadout||!Number.isInteger(index)||index<0||index>=s.loadout.unlocked)return false;
  if(!Array.isArray(ids)||ids.length>4||new Set(ids).size!==ids.length||ids.some(id=>!this.known(s).includes(id)))return false;
  const other=s.loadout.sets[1-index];
  if(ids.some(id=>other.includes(id)))return false;
  s.loadout.sets[index]=[...ids];return true;
 },
 bossVictory(s,id) {
  const l=s.loadout;if(!l||l.mainVictories.includes(id))return;
  l.mainVictories.push(id);l.unlocked=Math.min(2,l.mainVictories.length);
  if(l.unlocked===1)l.sets[0]=[l.selected];
 },
 learn(s,id) {
  const l=s.loadout;if(!l)return;
  if(l.cooldowns[id]===undefined)l.cooldowns[id]=s.secondary;
 },
 allowUpgrade(s,id) {
  if(!this.passiveIds.includes(id)||!s.loadout)return true;
  return s.loadout.passives.includes(id)||s.loadout.passives.length<4;
 },
 upgraded(s,id) {
  if(this.passiveIds.includes(id)&&!s.loadout.passives.includes(id))s.loadout.passives.push(id);
  if(s.bonusSkills.includes(id))this.learn(s,id);
 },
 tick(s,dt) {
  const l=s.loadout;
  for(const id of s.bonusSkills) {
   l.cooldowns[id]=Math.max(0,(l.cooldowns[id]??s.secondary)-dt);
   if(!this.active(s,id)||l.cooldowns[id]>0||!OP.Game.nearest(s.player,550))continue;
   OP.Game.technique(id);l.cooldowns[id]=2.4*s.cdMul;
  }
  if(this.active(s,'special')&&s.special<=0&&OP.Game.nearest(s.player,s.char.id==='usopp'?285:s.char.id==='nami'?260:240))OP.Game.special();
 }
};
