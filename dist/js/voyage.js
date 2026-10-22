'use strict';
/* Adapter between the approved global calendar and the existing combat engine.
 * Legacy East Blue never enters these hooks; missing islands stop at a content limit.
 */
OP.Voyage = {
 pendingStart:false,
 attach(s) {
  s.voyage={clock:OP.Campaign.create(),bankedGold:0,history:[],wave:0,nextWave:OP.Islands.balance.waveStart,miniSpawned:false};
  this.enter(OP.Islands.get('arabasta'));s.expeditionTime=0;
 },
 enter(profile) {
  const s=OP.Game.state,v=s.voyage;
  s.stage={...profile};s.bossSpawned=false;s.spawn=.1;
  v.wave=0;v.nextWave=OP.Islands.balance.waveStart;v.miniSpawned=false;
  s.enemies=[];s.bullets=[];s.effects=[];s.hazards=[];s.corpses=[];s.trails=[];s.grid.clear();
  s.player.x=1100;s.player.y=850;s.camera.x=1100;s.camera.y=850;
  OP.IslandArt.populate(s);document.getElementById('boss-hud').classList.add('hidden');
  document.getElementById('hud-stage').textContent=profile.title.toUpperCase();
  OP.Game.announce('¡Rumbo a '+profile.title+'!');
 },
 clock(dt) {
  const s=OP.Game.state,v=s.voyage,events=OP.Campaign.advance(v.clock,dt);
  s.time=v.clock.time;
  for(const event of events) {
   if(event.type==='boss-retreated') {
    // Removal deliberately bypasses hurt()/defeated(): no XP, coins, kill or set.
    v.history.push({island:s.stage.campaignId,boss:event.boss.id,outcome:'escaped',time:event.time});
   }
   if(event.type==='island-started'||event.type==='chaos-started') {
    this.checkpoint();
    const profile=event.stage&&OP.Islands.get(event.stage.id);
    if(profile)this.enter(profile);
    else {this.contentLimit();return;}
   }
  }
  const retreat=events.find(event=>event.type==='boss-retreated');
  if(retreat)OP.Game.announce((OP.Journal.names[retreat.boss.id]||retreat.boss.id)+' se retira sin recompensa · '+s.stage.title);
 },
 elapsed() {const s=OP.Game.state;return s.time-(OP.Campaign.stageAt(s.time)?.start||0)},
 spawn(id,rank='common',angle=null) {
  const s=OP.Game.state;
  // Use the original boss template for miniboss/main, never classify a mini as a main.
  const e=OP.Game.spawnEnemy(rank==='main'||rank==='mini'?id:null,angle);
  if(!e)return null;
  // A common spawn uses the current profile's ID; elites are promoted explicitly.
  if(e.id!==id) {
   const original=s.encounters?.[e.id];if(original)original.seen--;
   e.id=id;OP.Journal.encounter(s,e);
  }
  e.rank=rank;
  if(rank==='elite'){e.hp*=OP.Islands.balance.eliteHealth;e.max=e.hp;}
  if(rank==='mini'){e.boss=false;e.kind='charger';}
  if(rank==='main') {
   e.kind='ranged';e.skill=Infinity;e.encounterTimer=2;e.attackNumber=0;
   OP.Campaign.registerBoss(s.voyage.clock,id,'main');
  }
  return e;
 },
 director(dt) {
  const s=OP.Game.state,v=s.voyage,t=this.elapsed(),B=OP.Islands.balance;
  s.spawn-=dt;
  if(s.spawn<=0) {
   const count=t<20?1:t<60?2:3;
   for(let i=0;i<count;i++)this.spawn(s.stage.enemy);
   s.spawn=s.enemies.some(e=>e.boss&&!e.dead)?1.7:Math.max(.35,1.15-(1+s.time/30)*.1);
  }
  if(t>=v.nextWave) {
   v.wave++;v.nextWave+=B.waveEvery;
   for(let i=0;i<8;i++)this.spawn(s.stage.elite&&i===0?s.stage.elite:s.stage.enemy,s.stage.elite&&i===0?'elite':'common',i*.18+s.time);
   OP.Game.announce('Oleada '+v.wave+' · '+s.stage.title);
  }
  if(s.stage.mini&&!v.miniSpawned&&t>=B.miniAt) {
   if(this.spawn(s.stage.mini,'mini')){v.miniSpawned=true;OP.Game.announce('¡'+OP.Journal.names[s.stage.mini]+' entra en combate!');}
  }
  if(s.stage.bossType&&!s.bossSpawned&&t>=B.bossAt) {
   if(this.spawn(s.stage.bossType,'main')){s.bossSpawned=true;OP.Game.announce('¡'+s.stage.boss+' entra en combate!');OP.Audio.play('special');}
  }
 },
 enemyTick(e,dt) {
  if(e.id!=='crocodile')return;
  const s=OP.Game.state;
  if(e.windup) {
   e.windup.time-=dt;
   if(e.windup.time<=0) {
    const cast=e.windup;
    if(cast.kind==='blade') {
     OP.Game.enemyBullet(e,cast.angle,'#e1c18a');
     const bullet=s.bullets[s.bullets.length-1];bullet.sandBlade=true;
    } else {
     OP.EnemyAnimation?.attack(e,'storm',cast.angle);
     s.hazards.push({x:cast.x,y:cast.y,r:65,warn:0,life:5,tick:0,kind:'sandstorm'});
    }
    e.windup=null;e.encounterTimer=3.4;
   }
   return;
  }
  e.encounterTimer-=dt;
  if(e.encounterTimer<=0) {
   const kind=e.attackNumber++%2===0?'blade':'storm';
   e.windup={kind,time:kind==='blade'?.8:1.3,x:s.player.x,y:s.player.y,angle:Math.atan2(s.player.y-e.y,s.player.x-e.x)};
  }
 },
 defeated(e) {
  const s=OP.Game.state;if(e.dead)return;
  e.dead=true;s.kills++;OP.Journal.defeat(s,e);s.corpses.push({...e,life:.35});
  const rank=e.rank||'common',reward=OP.Islands.balance.rewards[rank];
  s.gold+=reward.berries;
  for(let i=0;i<reward.pieces;i++)s.drops.push({x:e.x+OP.Game.rand()*24-12,y:e.y+OP.Game.rand()*24-12,type:'xp',value:reward.xp});
  OP.Game.text(e.x,e.y-50,'+'+reward.berries+' ฿','#ffe18c');OP.Game.ring(e.x,e.y,rank==='main'?100:28,'#e5bd69',.6);
  if(rank==='main') {
   const result=OP.Campaign.defeatBoss(s.voyage.clock);
   if(result) {
    OP.Loadout.bossVictory(s,'campaign:'+s.stage.campaignId);
    s.voyage.history.push({island:s.stage.campaignId,boss:e.id,outcome:'defeated',time:s.time});
    OP.Game.updateSkills();document.getElementById('boss-hud').classList.add('hidden');
    OP.Game.announce('¡'+s.stage.boss+' derrotado! Set '+s.loadout.unlocked+' habilitado');
   }
  }
 },
 checkpoint() {
  const s=OP.Game.state,v=s.voyage;
  if(v.lastCheckpoint===s.time)return;
  OP.Journal.settle(s);
  OP.save.berries+=Math.max(0,s.gold-v.bankedGold);v.bankedGold=s.gold;
  const progress=OP.save.campaignProgress;
  for(const boss of v.clock.defeatedBosses) {
   if(!progress.defeatedBosses.includes(boss.id))progress.defeatedBosses.push(boss.id);
   const island=OP.Campaign.stages[boss.stageIndex].id;
   if(!progress.clearedIslands.includes(island))progress.clearedIslands.push(island);
  }
  OP.save.bestExpedition=Math.max(OP.save.bestExpedition||0,s.time);v.lastCheckpoint=s.time;OP.persist();
 },
 contentLimit() {
  const s=OP.Game.state;s.mode='content-limit';OP.Game.keys.clear();OP.Game.resetTouch();
  OP.UI.modal('<div class="eyebrow">CONTENIDO EN DESARROLLO</div><h2 id="modal-title">Hasta el siguiente horizonte.</h2><p>Has llegado al final de las islas disponibles en esta versión. Las siguientes conservan su orden y horario del itinerario aprobado.</p><button class="primary" id="end-voyage">Guardar resultados y volver</button>');
  document.getElementById('end-voyage').onclick=()=>this.finish(false,true);
 },
 finish(win,retreat=false) {
  const s=OP.Game.state;if(!s||OP.UI.finishHandled)return;
  OP.UI.finishHandled=true;s.mode='finished';OP.Game.keys.clear();OP.Game.resetTouch();
  this.checkpoint();OP.save.runs++;OP.save.kills+=s.kills;
  OP.save.records.unshift({campaign:'grand-line',island:s.stage.campaignId,islandTitle:s.stage.title,stage:s.stage.id,char:s.char.id,time:Math.floor(s.time),totalTime:Math.floor(s.time),kills:s.kills,gold:s.gold,level:s.level,win:false,difficulty:OP.save.settings.difficulty,expeditionId:s.expeditionId,bosses:s.voyage.history.map(b=>({...b}))});
  OP.save.records=OP.save.records.slice(0,30);OP.persist();
  OP.UI.modal(`<div class="eyebrow">${retreat?'REGRESO AL PUERTO':'EL VIAJE CONTINÚA'}</div><h2 id="modal-title">Tu expedición por Grand Line</h2><p>Tiempo total: <strong>${OP.clock(s.time)}</strong> · Nivel ${s.level}</p><div class="result-stats"><div><strong>${s.kills}</strong><small>DERROTADOS</small></div><div><strong>${s.gold}</strong><small>BERRIES OBTENIDOS</small></div></div><p>Jefes principales vencidos: ${s.voyage.clock.defeatedBosses.length}. Sets habilitados: ${s.loadout.unlocked}/2.</p><p>${s.voyage.history.map(b=>`${b.boss==='crocodile'?'Crocodile':b.boss}: ${b.outcome==='defeated'?'derrotado':'retirado sin recompensa'}`).join(' · ')||'Ningún jefe principal vencido.'}</p><div class="modal-actions"><button class="primary" id="return">Volver al puerto</button><button class="secondary" id="retry">Zarpar de nuevo</button></div>`);
  document.getElementById('return').onclick=()=>OP.UI.returnPort();document.getElementById('retry').onclick=()=>this.begin();
 },
 begin() {
  if(!OP.Art.loaded){OP.Art.ready.then(()=>this.begin());return;}
  OP.UI.close();OP.UI.finishHandled=false;document.getElementById('port').classList.add('hidden');document.getElementById('battle').classList.remove('hidden');
  this.pendingStart=true;
  try {OP.Game.start(0,OP.save.selected);} finally {this.pendingStart=false;}
  OP.Game.canvas.focus();
 }
};

(() => {
 const game=OP.Game,ui=OP.UI,legacyFinish=ui.finish,legacyHud=game.hud,legacyWater=game.water,legacyMap=game.renderMap,go=ui.goPirate,route=ui.campaignRoute,routePicker=ui.routePicker;
 const normalize=OP.normalizeProgress,defaults=OP.defaultSave;
 OP.defaultSave=()=>({...defaults(),campaignProgress:{defeatedBosses:[],clearedIslands:[]}});
 OP.normalizeProgress=save=>{
  const result=normalize(save),progress=save.campaignProgress||{};
  return {...result,campaignProgress:{defeatedBosses:[...new Set(Array.isArray(progress.defeatedBosses)?progress.defeatedBosses.filter(id=>typeof id==='string'):[])],clearedIslands:[...new Set(Array.isArray(progress.clearedIslands)?progress.clearedIslands.filter(id=>typeof id==='string'):[])]}};
 };
 OP.save=OP.normalizeProgress(OP.save);
 ui.finish=function(win,retreat){if(game.state?.voyage)return OP.Voyage.finish(win,retreat);return legacyFinish.call(this,win,retreat)};
 game.water=function(x,y){if(this.state?.voyage)return false;return legacyWater.call(this,x,y)};
 game.hud=function() {
  legacyHud.call(this);const s=this.state;document.querySelector('.boss-arrival').style.display='';if(!s?.voyage)return;
  const current=OP.Campaign.current(s.voyage.clock),t=OP.Voyage.elapsed(),B=OP.Islands.balance;
  document.getElementById('hud-stage').textContent=s.stage.title.toUpperCase()+' · '+OP.clock(Math.ceil(current.remaining));
  document.querySelector('.boss-arrival').style.display=s.stage.bossType?'':'none';
  document.getElementById('arrival-fill').style.width=(s.bossSpawned?100:Math.min(100,t/B.bossAt*100))+'%';
  const boss=s.enemies.find(e=>e.boss&&!e.dead);
  document.getElementById('boss-hud').classList.toggle('hidden',!boss);
  document.getElementById('objective').textContent=boss?'Derrota a '+s.stage.boss:s.stage.bossType?(s.bossSpawned?'Continúa hasta '+OP.clock(current.stage.end)+' · '+s.stage.title+' superada':s.stage.boss+' en '+OP.clock(Math.ceil(Math.max(0,B.bossAt-t)))):s.stage.title+' · continuación en desarrollo';
 };
 game.renderMap=function(){if(this.state?.voyage)return OP.IslandArt.minimap(this.state);return legacyMap.call(this)};
 ui.voyageBriefing=function() {
  this.modal('<div class="eyebrow">GRAND LINE · PRIMERA ISLA</div><h2 id="modal-title">Alabasta</h2><p>Sobrevive en el desierto frente a Baroque Works y derrota a Crocodile. Los élites y Mr. 1 dan recompensas; solo el jefe principal habilita un set.</p><p>Al llegar a <strong>03:00</strong>, Crocodile se retira si sigue vivo, sin recompensa, y comienza Skypiea. Ganar antes no adelanta el reloj.</p><div class="tip-card">WASD / flechas: mover · Espacio: esquivar · Q/E: seleccionar · R: especial.</div><p>Contenido en desarrollo · balance provisional. Skypiea dispone de escenario y oleadas iniciales.</p><div class="modal-actions"><button class="primary" id="start-voyage">¡Zarpar a Alabasta!</button><button class="secondary" data-dismiss>Volver al puerto</button></div>');
  document.getElementById('start-voyage').onclick=()=>OP.Voyage.begin();this.bindDismiss();
 };
 ui.goPirate=function(destination){if(destination==='sail')return this.voyageBriefing();return go.call(this,destination)};
 ui.campaignRoute=function(){route.call(this);document.querySelector('.campaign-pending').textContent='Alabasta está disponible con combate y jefe. Skypiea dispone de escenario y oleadas iniciales; el resto del itinerario sigue en desarrollo.';const button=document.createElement('button');button.className='primary';button.textContent='Zarpar a Alabasta';button.onclick=()=>this.voyageBriefing();document.querySelector('.campaign-itinerary').before(button)};
 ui.routePicker=function(){routePicker.call(this);document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>{const id=+b.dataset.route;if(!OP.stageUnlocked(id))return;OP.save.chapter=id;OP.persist();this.story(id)})};
})();
