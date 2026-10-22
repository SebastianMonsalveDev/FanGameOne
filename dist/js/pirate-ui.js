'use strict';
/* Presentation only. Progression, purchases and combat remain in the original systems. */
(() => {
 const ui = OP.UI;
 const navigate = ui.navigate;
 const modal = ui.modal;
 const roster = () => ['luffy','zoro','nami','sanji','usopp'].map(id => OP.characters.find(c => c.id === id));
 const art = {luffy:'ref_luffy',zoro:'ref_zoro',nami:'ref_nami',sanji:'ref_sanji',usopp:'ref_usopp'};
 const glyphs = {sail:'☸',crew:'♟',workshop:'⚒',missions:'▤',ranking:'♜',bestiary:'☠',news:'▥',tavern:'♧'};
 const face = (id, full = false, cls = '') => `<canvas class="${cls}" width="${full?280:100}" height="${full?340:100}" data-portrait="${art[id]||id}" ${full?'data-large="true"':''} aria-label="${OP.characters.find(c=>c.id===id)?.short||id.replace('ref_','')}"></canvas>`;
 const title = (text, subtitle) => `<header class="pirate-title"><h1>${text}</h1><p>${subtitle}</p></header>`;
 const back = () => '<button class="wood-button scene-back" data-go="adventure" aria-label="Volver al menú principal">‹ <span>Volver al puerto</span></button>';
 const navItems = [
  ['sail','Zarpar','Comienza la aventura'],['crew','Tripulación','Gestiona y mejora'],
  ['workshop','Astillero','Mejora tu barco'],['missions','Misiones y Logros','Completa desafíos'],
  ['ranking','Clasificación','Compite con otros'],['bestiary','Bestiario','Descubre enemigos'],
  ['news','Noticias','Eventos y novedades'],['tavern','Taberna','Reclutamiento de piratas']
 ];
 Object.assign(ui, {
  navigate(page) {
   document.body.dataset.portPage = page;
   navigate.call(this, page);
  },
  modal(html, wide = false) {
   const alreadyOpen=!document.getElementById('modal').classList.contains('hidden');
   const returnFocus=this.lastFocus;
   modal.call(this, html, wide);
   if(alreadyOpen)this.lastFocus=returnFocus;
   document.getElementById('modal-content').scrollTop=0;
   document.getElementById('modal-content').classList.toggle('level-dialog', html.includes('level-heading'));
  },
  bindPirateNavigation(root = document.getElementById('main')) {
   root.querySelectorAll('[data-go]').forEach(b => b.onclick = () => this.goPirate(b.dataset.go));
  },
  goPirate(page) {
   if(page==='sail') { this.story(OP.save.chapter); return; }
   if(page==='missions') { this.navigate('logbook'); return; }
   if(page==='news') { this.news(); return; }
   if(page==='ranking') {
    this.modal('<h2 id="modal-title">Clasificación</h2><p>Tu mejor supervivencia: <strong>'+OP.clock(OP.save.best)+'</strong></p><p>La clasificación en línea estará disponible en una futura travesía.</p><button class="primary" data-dismiss>Volver</button>');
    this.bindDismiss(); return;
   }
   if(page==='bestiary') {
    this.modal(`<h2 id="modal-title">Bestiario de East Blue</h2><div class="bestiary-list">${OP.chapters.map(ch=>`<article>${face(ch.bossType,true)}<strong>${ch.boss}</strong><small>${ch.title}</small></article>`).join('')}</div><button class="primary" data-dismiss>Volver</button>`,true);
    this.paint(); this.bindDismiss(); return;
   }
   this.navigate(page);
  },
  bindDismiss() { document.querySelector('[data-dismiss]').onclick = () => this.close(); },
  news() {
   this.modal('<div class="eyebrow">CUADERNO DEL CAPITÁN</div><h2 id="modal-title">Noticias de los mares</h2><h3>Rumbo a nuevos horizontes</h3><p>La Isla del Cielo forma parte del viaje planeado. La aventura jugable actual recorre cinco capítulos de East Blue.</p><h3>Reúne a tus nakamas</h3><p>Libera las islas para incorporar a los cinco compañeros del prototipo.</p><button class="primary" data-dismiss>Volver al puerto</button>');
   this.bindDismiss();
  },
  adventure() {
   document.getElementById('main').innerHTML = `<section class="pirate-scene port-scene" aria-label="Menú principal de Endless Pirates">
    <h1 class="sr-only">Endless Pirates</h1>
    <div class="port-tools"><button class="wood-button" id="port-route">⌖ Elegir isla</button><button class="wood-button" id="port-settings" aria-label="Ajustes">⚙</button></div>
    <aside class="port-news parchment"><div class="panel-heading"><h2>⚑ Noticias</h2><button data-go="news">Ver todas ›</button></div><button class="news-story" data-go="news"><span class="news-island" role="img" aria-label="Isla del Cielo"></span><span><small>EN EL HORIZONTE</small><strong>Isla del Cielo</strong><span>Explora ruinas antiguas y enemigos legendarios.</span><em>Próximamente</em></span></button><div class="news-dots" aria-hidden="true">● <span>● ● ●</span></div></aside>
    <aside class="port-crew parchment"><div class="panel-heading"><h2>☠ Mi Tripulación</h2><span>${roster().filter(c=>OP.unlocked(c)).length} / 5 nakamas</span></div><div class="port-portraits">${roster().map(c=>`<button data-preview="${c.id}" class="portrait-tile ${c.id===OP.save.selected?'is-selected':''}" style="--accent:${c.color}" aria-label="Ver a ${c.short}">${face(c.id)}<strong>${c.short}</strong><small>${OP.unlocked(c)?'Disponible':'Por reclutar'}</small></button>`).join('')}</div></aside>
    <nav class="port-menu" aria-label="Destinos del puerto">${navItems.map(([id,name,sub])=>`<button class="parchment menu-destination ${id==='sail'?'sail-button':''}" data-go="${id}"><span class="destination-icon" aria-hidden="true">${glyphs[id]}</span><span><strong>${name}</strong><small>${sub}</small></span><b aria-hidden="true">›</b></button>`).join('')}</nav>
   </section>`;
   this.bindPirateNavigation();
   document.querySelectorAll('[data-preview]').forEach(b=>b.onclick=()=>{this.crewPreview=b.dataset.preview;this.navigate('crew')});
   document.getElementById('port-settings').onclick=()=>this.settings();
   document.getElementById('port-route').onclick=()=>this.routePicker();
   this.paint();
  },
  routePicker() {
   this.modal(`<h2 id="modal-title">Traza tu rumbo</h2><button class="wood-button campaign-preview" id="campaign-route">⌖ Travesía de 30 minutos · ver itinerario</button><h3>East Blue · aventura jugable actual</h3><div class="route-picker">${OP.chapters.map((ch,i)=>`<button class="parchment route-choice" data-route="${i}" ${OP.stageUnlocked(i)?'':'disabled'}><canvas width="260" height="140" data-island="${i}"></canvas><strong>${ch.title}</strong><small>${OP.save.chapter===i?'✓ Destino seleccionado':OP.stageUnlocked(i)?'Elegir destino':'Bloqueado'}</small></button>`).join('')}</div><button class="secondary" data-dismiss>Volver</button>`,true);
   this.paint(); this.bindDismiss();
   document.getElementById('campaign-route').onclick=()=>this.campaignRoute();
   document.querySelectorAll('[data-route]').forEach(b=>b.onclick=()=>{const i=+b.dataset.route;if(!OP.stageUnlocked(i))return;OP.save.chapter=i;OP.persist();this.close();this.adventure()});
  },
  campaignRoute() {
   this.modal(`<div class="eyebrow">TRAVESÍA CONTINUA · ESTRUCTURA APROBADA</div><h2 id="modal-title">Diez islas. Un solo viaje.</h2><p>Cada isla dura tres minutos. El Mar del Caos comienza a los 30:00.</p><ol class="campaign-itinerary">${OP.Campaign.stages.map(stage=>`<li><span>${OP.clock(stage.start)}–${OP.clock(stage.end)}</span><div><strong>${stage.title}</strong><small>${stage.adversaries}</small></div></li>`).join('')}<li class="chaos-destination"><span>30:00 →</span><div><strong>Mar del Caos</strong><small>Regreso de los jefes vencidos durante la partida</small></div></li></ol><p class="campaign-pending">Itinerario en preparación: los encuentros y su balance aún no están configurados. La aventura de East Blue sigue disponible.</p><button class="primary" id="return-routes">Volver a East Blue</button>`,true);
   document.getElementById('return-routes').onclick=()=>this.routePicker();
   requestAnimationFrame(()=>{
    const heading=document.getElementById('modal-title');
    heading.tabIndex=-1;heading.focus({preventScroll:true});
    document.getElementById('modal-content').scrollTop=0;
   });
  },
  crew() {
   const c = OP.characters.find(c=>c.id===(this.crewPreview||OP.save.selected))||OP.characters[0];
   const unlocked = OP.unlocked(c);
   const forms = {luffy:[['ref_luffy','Base'],['ref_gear2','Gear 2'],['ref_gear5','Gear 5'],['ref_ace','Ace (sombrero)']],zoro:[['ref_zoro','Base'],['ref_zorowano','Wano']],sanji:[['ref_sanji','Base'],['ref_sanjiifrit','Ifrit Jambe']],nami:[['ref_nami','Base']],usopp:[['ref_usopp','Base']]}[c.id];
   const tech = [{name:c.weapon,desc:'Ataque principal automático contra enemigos a tu alcance.'},{name:c.special,desc:'Técnica especial · R'},...OP.techniques[c.id]];
   document.getElementById('main').innerHTML = `<section class="pirate-scene crew-scene" aria-label="Tripulación">
    ${title('Tripulación','Gestiona a tus nakamas')}${back()}
    <p class="crew-scroll parchment">¡Una tripulación más fuerte<br>para llegar al One Piece!<br>Mejora, desbloquea<br>técnicas y nuevas formas.</p>
    <aside class="roster wood-panel">${roster().map(ch=>`<button class="roster-row ${ch.id===c.id?'is-selected':''}" data-inspect="${ch.id}" style="--accent:${ch.color}" aria-pressed="${ch.id===c.id}">${face(ch.id)}<span><strong>${ch.short}</strong><small>${OP.unlocked(ch)?'Disponible':'Por reclutar'}</small></span><span class="roster-role">${ch.icon}<small>${ch.role}</small></span></button>`).join('')}<button class="parchment roster-all" id="crew-collection">♟ Ver toda la tripulación</button></aside>
    <div class="crew-name red-banner"><h2>${c.short}</h2><span>☠ ${c.role}</span></div>
    <div class="crew-quote parchment">${c.id==='luffy'?'“¡Voy a ser<br>el Rey de los Piratas!”':c.tag}</div>
    <div class="crew-character wood-panel">${face(c.id,true)}<button class="wood-button ${unlocked?'gold-button':''}" id="choose-captain" ${!unlocked||OP.save.selected===c.id?'disabled':''}>${OP.save.selected===c.id?'✓ Capitán seleccionado':unlocked?'Elegir a '+c.short:'Completa '+OP.chapters[c.unlock-1].title}</button></div>
    <section class="crew-stats wood-panel" aria-label="Estadísticas"><h3>ESTADÍSTICAS <small>Base</small></h3><dl><div><dt>♥ Vida</dt><dd>${c.hp}</dd></div><div><dt>⚔ Ataque</dt><dd>${c.attack}</dd></div><div><dt>◈ Alcance</dt><dd>${c.range}</dd></div><div><dt>➤ Velocidad</dt><dd>${c.speed}</dd></div></dl></section>
    <nav class="crew-tabs wood-panel" aria-label="Detalles de personaje">${[['overview','☠','Tripulación'],['techniques','✊','Técnicas'],['appearances','♜','Apariencias']].map(([id,icon,name])=>`<button class="wood-button ${id===(this.crewTab||'overview')?'is-selected':''}" data-crew-tab="${id}" aria-pressed="${id===(this.crewTab||'overview')}"><span>${icon}</span>${name}</button>`).join('')}</nav>
    <section class="crew-tech wood-panel" id="crew-tech"><h3>▤ Técnicas <button id="more-tech">Ver más ›</button></h3><div>${tech.slice(0,2).map((t,i)=>`<article><span class="tech-icon">${i?'✊':c.icon}</span><div><strong>${t.name}</strong><small>${i?'ESPECIAL':'ACTIVA'}</small><p>${i?'Pulsa E durante la expedición.':t.desc}</p></div></article>`).join('')}</div></section>
    <section class="crew-passive wood-panel"><h3>▤ Habilidad pasiva</h3><div><span>✦</span><p>${c.passive}</p></div></section>
    <section class="crew-forms wood-panel" id="crew-forms"><h3>♜ Apariencias y transformaciones <small>Galería visual</small></h3><div>${forms.map(([id,name],i)=>`<button class="form-tile ${i===0?'is-selected':''}" data-form="${id}" aria-label="Ver ${name}">${face(id,true)}<strong>${name}${i?' · 🔒':' ✓'}</strong></button>`).join('')}<div class="form-tile coming-form"><span>?</span><strong>Próximamente 🔒</strong></div></div></section>
   </section>`;
   this.bindPirateNavigation();
   document.querySelectorAll('[data-inspect]').forEach(b=>b.onclick=()=>{this.crewPreview=b.dataset.inspect;this.crew()});
   document.getElementById('choose-captain').onclick=()=>{if(!unlocked)return;OP.save.selected=c.id;OP.persist();this.crew();this.toast(c.short+' está listo para zarpar.')};
   document.getElementById('crew-collection').onclick=()=>this.navigate('gallery');
   const showTech = () => {
    this.modal(`<h2 id="modal-title">Técnicas de ${c.short}</h2>${tech.map(t=>`<h3>${t.name}</h3><p>${t.desc}</p>`).join('')}<button class="primary" data-dismiss>Volver</button>`);this.bindDismiss();
   };
   document.getElementById('more-tech').onclick=showTech;
   document.querySelectorAll('[data-crew-tab]').forEach(b=>b.onclick=()=>{
    this.crewTab=b.dataset.crewTab;
    document.querySelectorAll('[data-crew-tab]').forEach(tab=>{tab.classList.toggle('is-selected',tab===b);tab.setAttribute('aria-pressed',String(tab===b))});
    if(this.crewTab==='techniques')showTech();
    else document.getElementById(this.crewTab==='appearances'?'crew-forms':'choose-captain').scrollIntoView({block:'nearest'});
   });
   document.querySelectorAll('[data-form]').forEach(b=>b.onclick=()=>{
    this.galleryDetail(b.dataset.form);
   });
   this.paint();
  },
  tavern() {
   const recruits=['ref_luffy','ref_zoro','ref_nami','ref_sanji','ref_ace','ref_law','ref_shanks','ref_gear5','ref_mihawk','ref_robin','ref_chopper','ref_yamato'];
   const names={ref_gear5:'Luffy Gear 5'};
   document.getElementById('main').innerHTML=`<section class="pirate-scene tavern-scene" aria-label="Taberna y reclutamiento">
    <header class="tavern-resources wood-panel"><button class="wood-button tavern-back" data-go="adventure" aria-label="Volver al menú principal">‹ <span>Menú principal</span></button><div class="tavern-balances" aria-label="Recursos disponibles"><div class="tavern-wallet"><span aria-hidden="true">▱</span> <strong id="tavern-tickets">${OP.fmt(OP.save.tickets)}</strong><small>Tickets disponibles</small></div><div class="tavern-wallet"><span aria-hidden="true">฿</span> <strong id="tavern-berries">${OP.fmt(OP.save.berries)}</strong><small>Berries</small></div></div></header>
    <h1 class="tavern-heading">Taberna<small>Reclutamiento de piratas</small></h1>
    <section class="tavern-banner" aria-label="Reclutas destacados: Shanks, Luffy Gear 5 y Mihawk"><span class="sr-only">¡Más piratas legendarios te esperan!</span></section>
    <section class="tavern-odds parchment"><h2>Probabilidades</h2>${OP.recruitmentRules.rates.map(rate=>`<div class="${rate.id}"><span>★ ${rate.name}</span><strong>${rate.percent.toFixed(1)}%</strong></div>`).join('')}<small>Provisionales · rarezas por asignar</small></section>
    <div class="tavern-welcome parchment">¡Bienvenido<br>a la tripulación!</div>
    <section class="tavern-reveal" aria-label="Zoro, espadachín de los sueños">${face('zoro',true)}<div class="reveal-stars">★★★★★</div><div class="wood-panel"><strong>Zoro</strong><small>Espadachín de los sueños</small></div></section>
    <section class="tavern-recruits wood-panel"><h2>♧ Posibles reclutas <button id="tavern-all">Ver todos ›</button></h2><div>${recruits.map(id=>`<button class="recruit-tile" data-recruit="${id}" title="Ilustración · rareza pendiente" aria-label="Ver ${names[id]||OP.gallery.find(a=>a[0]===id)?.[1]}">${face(id)}<small>Ver retrato</small></button>`).join('')}</div></section>
    <div class="tavern-open" aria-describedby="recruitment-pending">${[1,5].map(count=>`<button class="wood-button ${count===1?'blue-button':'gold-button'}" data-open="${count}" disabled title="Reclutamiento pendiente de definir rarezas, duplicados y obtención de tickets"><strong>▱ Abrir ${count}</strong><span>▱ ${OP.recruitmentRules.costs[count]}</span></button>`).join('')}<small id="recruitment-pending">Reclutamiento pendiente · no consume tickets</small></div>
   </section>`;
   this.bindPirateNavigation();
   document.querySelectorAll('[data-recruit]').forEach(b=>b.onclick=()=>this.galleryDetail(b.dataset.recruit));
   document.getElementById('tavern-all').onclick=()=>this.navigate('gallery');
   this.paint();
  },
  upgradeCards(s) {
   return `<div class="level-heading"><span aria-hidden="true">☠</span><h2 id="modal-title">¡Sube de nivel!</h2><strong class="red-banner">Nv. ${Math.max(1,s.level-1)} → ${s.level}</strong><p>¡Elige una mejora!</p></div><div class="choices pirate-choices">${this.offers.map((o,i)=>`<button class="choice pirate-choice choice-${i}" data-choice="${i}"><h3>${o.name}</h3><span class="choice-art"><span>${o.icon}</span>${face(s.char.id,true)}</span><small class="choice-rank">${s.ranks[o.id]?'Nv. '+s.ranks[o.id]+' » '+(s.ranks[o.id]+1):'Nueva mejora'}</small><p>${o.desc}</p><span class="choice-select">Elegir <kbd>${i+1}</kbd></span></button>`).join('')}</div>`;
  }
 });
})();
