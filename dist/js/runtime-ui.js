'use strict';
(() => {
 const ui=OP.UI,game=OP.Game;
 const start=game.start,skills=game.updateSkills,finish=ui.finish,pool=ui.upgradePool,choose=ui.chooseUpgrade,levelUp=ui.levelUp,go=ui.goPirate,crew=ui.crew,logbook=ui.logbook,spawn=game.spawnEnemy;
 game.spawnEnemy=function(bossId=null,angle=null) {
  const s=this.state;if(!s)return null;
  if(s.enemies.length>=85) {
   if(!bossId)return null;
   const candidates=s.enemies.filter(e=>!e.boss);
   if(!candidates.length)return null;
   const farthest=candidates.reduce((a,b)=>this.dist(s.player,a)>this.dist(s.player,b)?a:b);
   s.enemies=s.enemies.filter(e=>e!==farthest);
  }
  return spawn.call(this,bossId,angle);
 };
 game.start=function(stage,id) {start.call(this,stage,id);this.state.expeditionId=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);};
 game.updateSkills=function() {
  skills.call(this);const s=this.state;if(!s?.loadout)return;
  const panel=document.getElementById('skills');
  panel.querySelector('.skill-button:not(button)')?.setAttribute('data-active',String(OP.Loadout.active(s,'main')));
  panel.querySelector('#special-skill').setAttribute('aria-label',s.char.special+'. Tecla R');
  panel.querySelector('#special-skill>span').textContent='R · ESPECIAL';
  const control=document.createElement('div');control.className='loadout-controls';
  control.innerHTML=`<button id="previous-skill" aria-label="Habilidad o set anterior">Q ‹</button><button id="manage-skills">${s.loadout.unlocked?'Set '+(s.loadout.activeSet+1)+' / '+s.loadout.unlocked:OP.Loadout.entries(s).find(e=>e.id===s.loadout.selected)?.name}</button><button id="next-skill" aria-label="Siguiente habilidad o set">› E</button>`;
  panel.prepend(control);
  control.querySelector('#previous-skill').onclick=()=>OP.Loadout.cycle(s,-1);
  control.querySelector('#next-skill').onclick=()=>OP.Loadout.cycle(s,1);
  control.querySelector('#manage-skills').onclick=()=>ui.manageSkills();
  panel.querySelector('#special-skill').setAttribute('data-active',String(OP.Loadout.active(s,'special')));
  panel.querySelectorAll('.skill-button:not(button)').forEach((el,i)=>{if(i)el.setAttribute('data-active',String(OP.Loadout.active(s,s.bonusSkills[i-1])))});
 };
 ui.upgradePool=function() {const s=game.state;return pool.call(this).filter(o=>OP.Loadout.allowUpgrade(s,o.id));};
 ui.levelUp=function() {
  const s=game.state;if(!s||s.mode!=='playing')return;
  if(!this.upgradePool().length) {
   if(!s.upgradesExhausted){s.upgradesExhausted=true;this.toast('Todas las mejoras disponibles han alcanzado su máximo.');}
   return;
  }
  levelUp.call(this);
 };
 ui.chooseUpgrade=function(index) {
  const s=game.state,o=this.offers[index];if(!o||!OP.Loadout.allowUpgrade(s,o.id))return;
  const before=s.ranks[o.id]||0;choose.call(this,index);
  if(s.ranks[o.id]===before+1){OP.Loadout.upgraded(s,o.id);game.updateSkills();}
 };
 ui.manageSkills=function() {
  const s=game.state;if(!s||s.mode!=='playing')return;
  s.mode='loadout';game.keys.clear();game.resetTouch();
  const l=s.loadout,entries=OP.Loadout.entries(s);
  const render=()=>{
   this.modal(`<div class="eyebrow">TÉCNICAS DE ${s.char.short.toUpperCase()}</div><h2 id="modal-title">${l.unlocked?'Organiza tus sets':'Elige tu movimiento'}</h2><p>${l.unlocked?'Solo se ejecuta el set seleccionado. Cada técnica ocupa un único espacio.':'Solo se ejecuta el movimiento seleccionado. Q/E cambia la selección; R selecciona y activa la técnica especial.'}</p>${l.unlocked?`<div class="set-editor">${l.sets.slice(0,l.unlocked).map((set,i)=>`<section><button class="wood-button ${i===l.activeSet?'is-selected':''}" data-active-set="${i}">Set ${i+1} · ${set.length}/4 ${i===l.activeSet?'✓':''}</button>${entries.map(e=>`<label><input type="checkbox" data-set="${i}" value="${e.id}" ${set.includes(e.id)?'checked':''} ${l.sets[1-i].includes(e.id)?'disabled':''}> ${e.icon} ${e.name}</label>`).join('')}</section>`).join('')}</div>`:`<div class="movement-picker">${entries.map(e=>`<button class="wood-button ${l.selected===e.id?'is-selected':''}" data-movement="${e.id}">${e.icon} ${e.name}${l.selected===e.id?' ✓':''}</button>`).join('')}</div>`}<div class="passive-list"><strong>Pasivas · ${l.passives.length}/4</strong><p>${s.char.passive}</p>${l.passives.filter(id=>id!=='innate').map(id=>`<span>${({power:'Daño',health:'Vida',speed:'Velocidad',cooldown:'Enfriamiento',range:'Alcance',magnet:'Recogida'})[id]} · Nv. ${s.ranks[id]}</span>`).join('')}</div><p class="loadout-notice" role="status">${l.unlocked<2?'Los sets se habilitan al vencer al primer y segundo jefe principal de la expedición.':''}</p><button class="primary" id="close-loadout">Volver al combate</button>`,true);
   document.querySelectorAll('[data-movement]').forEach(b=>b.onclick=()=>{OP.Loadout.select(s,b.dataset.movement);render()});
   document.querySelectorAll('[data-active-set]').forEach(b=>b.onclick=()=>{l.activeSet=+b.dataset.activeSet;render()});
   document.querySelectorAll('[data-set]').forEach(input=>input.onchange=()=>{
    const index=+input.dataset.set,ids=[...document.querySelectorAll(`[data-set="${index}"]:checked`)].map(el=>el.value);
    if(!OP.Loadout.assign(s,index,ids)) {input.checked=!input.checked;document.querySelector('.loadout-notice').textContent='Cada set admite hasta cuatro técnicas distintas.';return;}
    render();
   });
   document.getElementById('close-loadout').onclick=()=>{s.mode='playing';this.close();game.updateSkills();game.canvas.focus()};
  };
  render();
 };
 ui.finish=function(win,retreat=false) {
  const s=game.state;if(!s||this.finishHandled)return;
  const total=(s.expeditionTime||0)+s.time;
  OP.Journal.settle(s);
  finish.call(this,win,retreat);
  Object.assign(OP.save.records[0],{totalTime:Math.floor(total),expeditionId:s.expeditionId});
  OP.save.bestExpedition=Math.max(OP.save.bestExpedition||0,total);OP.persist();
  if(win&&s.stage.id<OP.chapters.length-1) {
   const next=s.stage.id+1,button=document.getElementById('retry');
   button.textContent='Continuar expedición';
   button.onclick=()=>{
    const carry={};
    for(const key of ['attackMul','cdMul','rangeMul','projectiles','magnet','bonusSkills','ranks','regen','level','xp','nextXp','loadout','special','dash','secondary','cast','upgradesExhausted'])carry[key]=structuredClone(s[key]);
    const health={hp:s.player.hp,max:s.player.max,speed:s.player.speed};
    this.close();this.finishHandled=false;game.start(next,s.char.id);
    Object.assign(game.state,carry,{expeditionTime:total,expeditionId:s.expeditionId});Object.assign(game.state.player,health);
    game.updateSkills();game.hud();game.canvas.focus();
   };
  }
  document.querySelector('.result-stats').insertAdjacentHTML('beforebegin',`<p>Expedición: <strong>${OP.clock(total)}</strong> · Sets habilitados: ${s.loadout.unlocked}/2</p>`);
 };
 ui.localRanking=function() {
  const groups=new Map();
  OP.save.records.forEach((r,index)=>{const key=r.expeditionId||'legacy-'+index,current=groups.get(key);if(!current||(r.totalTime??r.time)>(current.totalTime??current.time))groups.set(key,r)});
  const rows=[...groups.values()].sort((a,b)=>(b.totalTime??b.time)-(a.totalTime??a.time));
  this.modal(`<div class="eyebrow">RÉCORDS DE ESTE NAVEGADOR</div><h2 id="modal-title">Clasificación local</h2><p>Mejor expedición: <strong>${OP.clock(Math.max(OP.save.bestExpedition||0,OP.save.best))}</strong>. Clasificación en línea pendiente de backend.</p>${rows.length?`<div class="ranking-table"><table><thead><tr><th>Puesto</th><th>Pirata</th><th>Tiempo total</th><th>Última isla</th><th>Modo</th></tr></thead><tbody>${rows.map((r,i)=>`<tr><td>${i+1}</td><td>${OP.characters.find(c=>c.id===r.char)?.short||'Pirata'}</td><td>${OP.clock(r.totalTime??r.time)}</td><td>${r.islandTitle||OP.chapters[r.stage]?.title||'—'}</td><td>${r.difficulty==='relaxed'?'Tranquila':'Aventura'}</td></tr>`).join('')}</tbody></table></div>`:'<p>Todavía no hay expediciones registradas.</p>'}<button class="primary" data-dismiss>Volver al puerto</button>`,true);this.bindDismiss();
 };
 ui.bestiary=function() {
  this.modal(`<div class="eyebrow">ENCUENTROS REGISTRADOS</div><h2 id="modal-title">Bestiario</h2><p>Los avistamientos y las derrotas se registran al terminar cada etapa. Los registros antiguos no contienen encuentros individuales.</p><div class="bestiary-entries">${Object.entries(OP.Journal.names).map(([id,name])=>{const entry=OP.save.bestiary?.[id];return `<article class="parchment"><canvas width="120" height="130" data-portrait="${id}" data-large="true"></canvas><div><h3>${name}</h3><p>${entry?`${OP.fmt(entry.seen)} avistamientos · ${OP.fmt(entry.defeated)} derrotas`:'Sin registrar'}</p></div></article>`}).join('')}</div><button class="primary" data-dismiss>Volver al puerto</button>`,true);this.paint();this.bindDismiss();
 };
 ui.goPirate=function(destination) {if(destination==='ranking')return this.localRanking();if(destination==='bestiary')return this.bestiary();return go.call(this,destination)};
 ui.crew=function() {
  crew.call(this);const id=this.crewPreview||OP.save.selected,record=OP.save.characterRecords?.[id];
  const passive=document.querySelector('.crew-passive');if(record)passive.insertAdjacentHTML('beforeend',`<small class="character-record">${OP.fmt(record.stages)} etapas · ${OP.fmt(record.kills)} derrotas · Récord ${OP.clock(record.best)}</small>`);
  document.querySelectorAll('.crew-tech p').forEach(p=>{if(p.textContent.includes('Pulsa E'))p.textContent='Pulsa R durante la expedición.'});
 };
 ui.logbook=function() {
  logbook.call(this);
  const board=document.createElement('section');board.className='mission-board wood-panel';
  board.innerHTML=`<h2>Misiones de East Blue</h2><p>Objetivos y recompensas del prototipo. Los logros adicionales aún no tienen condiciones aprobadas.</p><div>${OP.chapters.map(ch=>`<article class="parchment"><h3>${ch.title}</h3><p>${ch.goal}</p><small>Recompensa de etapa: ฿ ${OP.fmt(ch.reward)}</small><strong>${OP.save.completed.includes(ch.id)?'✓ Completada':OP.stageUnlocked(ch.id)?'Disponible':'Ruta bloqueada'}</strong><button class="wood-button" data-mission="${ch.id}" ${OP.stageUnlocked(ch.id)?'':'disabled'}>${OP.save.completed.includes(ch.id)?'Repetir misión':'Zarpar'}</button></article>`).join('')}</div>`;
  document.getElementById('main').prepend(board);
  board.querySelectorAll('[data-mission]').forEach(button=>button.onclick=()=>this.story(+button.dataset.mission));
 };
 // Keep the original help/pause screens, updating only the changed control labels.
 for(const method of ['help','pause']) {
  const original=ui[method];ui[method]=function(...args){original.apply(this,args);if(document.getElementById('modal').classList.contains('hidden'))return;
   const box=document.getElementById('modal-content');
   if(method==='pause')box.querySelectorAll('tr').forEach(tr=>{if(tr.firstElementChild.textContent==='E')tr.firstElementChild.textContent='R'});
   else box.querySelectorAll('p').forEach(p=>{if(p.innerHTML.includes('<strong>E</strong>'))p.innerHTML=p.innerHTML.replace('<strong>E</strong>','<strong>R</strong>')});
   const note=document.createElement('p');note.textContent='Q/E: recorrer movimientos o sets. Pulsa el nombre de la selección en el HUD para organizar técnicas. En móvil, usa las flechas del HUD.';box.append(note);
  };
 }
})();
