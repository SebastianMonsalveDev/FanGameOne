'use strict';
/* Playable content profiles. All timing, stats and rewards below are PROVISIONAL.
 * Baselines reuse game.js: main boss at 90 s, enemy waves at 20/+25 s,
 * boss HP/damage, projectile damage/speed, and existing XP/Berry denominations.
 * No new random drop rates, recruitment rules or permanent balance are introduced.
 */
OP.Islands = {
 balance:Object.freeze({
  label:'Provisional · base del prototipo',bossAt:90,miniAt:60,
  waveStart:20,waveEvery:25,eliteHealth:2,
  rewards:Object.freeze({
   common:Object.freeze({berries:1,xp:4,pieces:1}),
   elite:Object.freeze({berries:5,xp:8,pieces:1}),
   mini:Object.freeze({berries:25,xp:3,pieces:7}),
   main:Object.freeze({berries:80,xp:8,pieces:15})
  })
 }),
 definitions:{
  arabasta:{id:0,campaignId:'arabasta',title:'Alabasta',theme:'desert',enemy:'baroque',elite:'baroque_elite',mini:'mr1',bossType:'crocodile',boss:'Crocodile',color:'#d8b77b',complete:true},
  skypiea:{id:1,campaignId:'skypiea',title:'Skypiea',theme:'sky',enemy:'sky_guard',elite:null,mini:null,bossType:null,boss:null,color:'#e8e3c6',complete:false}
 },
 get(id) {return this.definitions[id]||null}
};
