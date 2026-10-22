'use strict';
/* Catálogo de habilidades y mejoras de subida de nivel de Grand Line Survivors.
 * Extraído de data.js (OP.techniques) y ui.js (upgradePool/fallbackPool) sin cambiar valores ni lógica.
 * Cada entrada: {id,icon,name,desc,max?,apply}; `s` es OP.Game.state. La interfaz solo pide las ofertas a OP.Skills. */
OP.techniques={luffy:[{name:'Gomu Gomu no Muchi',desc:'Un barrido de pierna de goma golpea a los enemigos cercanos.'},{name:'Gomu Gomu no Fusen',desc:'Infla el cuerpo, empuja a los enemigos y obtiene una breve protección.'}],zoro:[{name:'Tora Gari',desc:'Un corte de Santoryu alcanza a varios enemigos frente a ti.'},{name:'Tatsu Maki',desc:'Un giro de tres espadas despeja a los enemigos a tu alrededor.'}],nami:[{name:'Barrido de bastón',desc:'Un barrido amplio con el bastón aparta a los enemigos cercanos.'},{name:'Contraataque de bastón',desc:'Un golpe circular con el bastón mantiene a raya a la horda.'}],usopp:[{name:'Hissatsu Namari Boshi',desc:'Dispara varias bolas de plomo con el tirachinas.'},{name:'Hissatsu Kaen Boshi',desc:'Lanza munición incendiaria que explota al alcanzar un enemigo.'}],sanji:[{name:'Poitrine Shoot',desc:'Una patada al pecho alcanza al enemigo y a quienes tenga cerca.'},{name:'Concassé',desc:'Un potente golpe descendente de pierna despeja un área cercana.'}]};
OP.Skills={
 levelPool(s){const pool=[
  {id:'power',icon:'⚔',name:'Fuerza de voluntad',desc:'+20% de daño en todos tus ataques.',apply:()=>s.attackMul*=1.2},
  {id:'range',icon:'⌖',name:'Más allá del alcance',desc:'+18% de alcance en tu ataque principal.',apply:()=>s.rangeMul=Math.min(2.5,s.rangeMul*1.18)},
  {id:'health',icon:'♡',name:'Espíritu inquebrantable',desc:'+25 de vida máxima y recupera 35 de vida.',apply:()=>{s.player.max+=25;s.player.hp=Math.min(s.player.max,s.player.hp+35)}},
  {id:'speed',icon:'↗',name:'Viento a favor',desc:'+12% de velocidad para escapar de las oleadas.',apply:()=>s.player.speed=Math.min(350,s.player.speed*1.12)},
  {id:'cooldown',icon:'◷',name:'Instinto de combate',desc:'Tus ataques automáticos se recargan un 12% más rápido.',apply:()=>s.cdMul=Math.max(.25,s.cdMul*.88)},
  {id:'magnet',icon:'✧',name:'Brújula del destino',desc:'+35% de alcance para recoger experiencia.',apply:()=>s.magnet=Math.min(400,s.magnet*1.35)},
  {id:'heal',icon:'✚',name:'Banquete de piratas',desc:'Recupera el 45% de tu vida máxima ahora.',apply:()=>s.player.hp=Math.min(s.player.max,s.player.hp+s.player.max*.45)},
  {id:'daggers',icon:'➶',name:OP.techniques[s.char.id][0].name,desc:OP.techniques[s.char.id][0].desc,max:4,apply:()=>{if(!s.bonusSkills.includes('daggers'))s.bonusSkills.push('daggers')}},
  {id:'aura',icon:'◉',name:OP.techniques[s.char.id][1].name,desc:OP.techniques[s.char.id][1].desc,max:4,apply:()=>{if(!s.bonusSkills.includes('aura'))s.bonusSkills.push('aura')}},
  {id:'multi',icon:'✦',name:'Ataque combinado',desc:s.char.id==='usopp'?'Añade un proyectil al tirachinas.':'Añade un golpe a la combinación: +20% de daño base.',max:3,apply:()=>s.projectiles++}];return pool.filter(p=>(s.ranks[p.id]||0)<(p.max||6))},
 fallbackPool(s){return [
  {id:'fb-heal',fallback:true,icon:'✚',name:'Banquete del capitán',desc:'Recuperas el 50% de tu vida máxima.',apply:()=>{s.player.hp=Math.min(s.player.max,s.player.hp+s.player.max*.5)}},
  {id:'fb-gold',fallback:true,icon:'฿',name:'Botín del mar',desc:'+40 berries para esta expedición.',apply:()=>{s.gold+=40}},
  {id:'fb-power',fallback:true,icon:'⚔',name:'Entrenamiento sin fin',desc:'+4% de daño en todos tus ataques.',apply:()=>{s.attackMul*=1.04}}]}
};
