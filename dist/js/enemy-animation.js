'use strict';
/* Presentation only: poses follow combat events; no damage, RNG, balance or save writes.
 * Frames are shared across enemies, never generated per individual or per render. */
OP.EnemyAnimation = {
 frames:new Map(),atlas:null,
 islandIds:new Set(['baroque','baroque_elite','mr1','crocodile','sky_guard']),
 load() {
  const image=new Image();
  image.onload=()=>{
   if(image.width!==1248||image.height!==640)return;
   this.atlas=image;this.frames.clear();
  };
  // Procedural skins remain the offline/load-failure fallback.
  image.src='assets/enemies-grand-line.png?v=07';
 },
 tick(e,dt) {
  if(e.visualAttack)e.visualAttack.time=Math.max(0,e.visualAttack.time-dt);
  if(e.charge>0&&e.charge<=dt){this.attack(e,'charge',Math.atan2(e.cy,e.cx));e.visualAttack.time=.22;}
 },
 attack(e,kind,angle) {
  e.visualAttack={kind,angle,time:.48};
 },
 appearance(e) {
  // Reuse the existing identity, without consuming the simulation random stream.
  return e.boss||e.id==='mr1'?0:Math.floor((e.uid||0)*997)%3;
 },
 pose(e,t,moving) {
  if(e.dead)return {name:'fall',frame:Math.min(2,Math.floor((.35-e.life)*9))};
  if(e.windup||e.warning>0)return {name:'prepare',frame:Math.floor(t*8)%2};
  if(e.charge>0)return {name:'strike',frame:1};
  const attack=e.visualAttack;
  if(attack?.time>0)return attack.time>.22?{name:'strike',frame:Math.min(2,Math.floor((.48-attack.time)*12))}:{name:'recover',frame:attack.time>.1?0:1};
  if(e.flash>0)return {name:'hurt',frame:0};
  if(e.visualReady)return {name:'prepare',frame:Math.floor(t*8)%2};
  if((e.kind==='ranged'||['buggy','krieg'].includes(e.id))&&e.skill>0&&e.skill<.35)return {name:'prepare',frame:0};
  return {name:moving?'walk':'idle',frame:moving?Math.floor(t*9)%4:0};
 },
 frame(e,pose) {
  const variant=this.appearance(e),key=[e.id,variant,e.kind,pose.name,pose.frame].join(':');
  if(this.frames.has(key))return this.frames.get(key);
  if(this.atlas)return this.atlasFrame(e,pose,key,variant);
  const base=OP.IslandArt.sprite(e.id,variant,e.kind),canvas=document.createElement('canvas');
  canvas.width=160;canvas.height=128;const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;c.translate(48,16);
  const step=pose.name==='walk'?[0,4,0,-4][pose.frame]:0;
  const ready=pose.name==='prepare',strike=pose.name==='strike',recover=pose.name==='recover';
  const swing=ready?-.65: strike?[.1,1.3,.65][pose.frame]:recover?.3:step*.035;
  // Independent boots, torso and weapon arms give actual joint motion to the pixel skins.
  c.drawImage(base,16,64,18,24,16,64+step,18,24);
  c.drawImage(base,34,64,20,24,34,64-step,20,24);
  const arm=(sx,width,pivot,rotation)=>{c.save();c.translate(pivot,39);c.rotate(rotation);c.drawImage(base,sx,35,width,45,sx-pivot,-4,width,45);c.restore()};
  arm(0,18,18,swing*.7);
  c.drawImage(base,18,0,30,64,18,0,30,64);
  // Preserve wide hats, wings and Crocodile's hair/cigar outside the torso slice.
  c.drawImage(base,0,0,18,35,0,0,18,35);c.drawImage(base,48,0,16,35,48,0,16,35);
  arm(48,16,48,-swing);
  this.frames.set(key,canvas);return canvas;
 },
 atlasFrame(e,pose,key,variant) {
  const row=['baroque','baroque_elite','mr1','crocodile','sky_guard'].indexOf(e.id);
  const column=pose.name==='walk'?[0,1,0,2][pose.frame]:pose.name==='prepare'?3:pose.name==='strike'?4:pose.name==='recover'?5:0;
  const canvas=document.createElement('canvas');canvas.width=208;canvas.height=128;
  const c=canvas.getContext('2d');c.imageSmoothingEnabled=false;
  c.drawImage(this.atlas,column*208,row*128,208,128,0,0,208,128);
  if(variant){c.globalCompositeOperation='source-atop';c.fillStyle=variant===1?'#50796133':'#b4744933';c.fillRect(0,0,208,128);c.globalCompositeOperation='source-over';}
  // Existing ranged/charger roles keep visible equipment without changing their mechanics.
  if(e.kind==='ranged'&&e.id.startsWith('baroque')) {
   c.fillStyle='#46372b';c.fillRect(117,64,17,6);c.fillStyle='#a3afa7';c.fillRect(128,62,17,4);c.fillStyle='#b58e50';c.fillRect(120,66,4,9);
  }
  if(e.kind==='charger'&&e.id==='baroque'){c.fillStyle='#d8e2dc';c.fillRect(81,64,3,21);c.fillStyle='#c5a35f';c.fillRect(78,83,9,3);}
  this.frames.set(key,canvas);return canvas;
 },
 draw(original,c,id,x,y,scale=1,t=0,moving=false,flip=false,flash=0,e=null) {
  if(!e||e.hero)return original.call(OP.Art,c,id,x,y,scale,t,moving,flip,flash);
  const pose=this.pose(e,t,moving),attack=e.visualAttack;
  const strike=pose.name==='strike',ready=pose.name==='prepare';
  c.save();c.translate(Math.round(x),Math.round(y));
  if(e.dead){const fall=1-e.life/.35;c.translate(0,fall*6);c.rotate((flip?-1:1)*fall*1.2);c.scale(1,1-fall*.3);}
  else if(pose.name==='hurt')c.translate(flip?3:-3,0);
  else if(ready){c.translate(flip?2:-2,1);c.rotate((flip?1:-1)*(.06+pose.frame*.025));}
  else if(strike){c.translate(flip?-4:4,0);c.rotate((flip?-1:1)*[.05,.15,.09][pose.frame]);}
  else if(pose.name==='recover')c.rotate((flip?-1:1)*.04);
  if(this.islandIds.has(id)) {
   OP.Art.ellipse(c,0,3,15*scale,4.5*scale,'#473b293b');
   const image=this.frame(e,pose);c.save();c.scale(scale*(flip?-1:1),scale);c.imageSmoothingEnabled=false;
   if(flash)c.filter='brightness(1.8)';
   c.drawImage(image,-image.width/2,-100+(pose.name==='walk'?Math.abs(Math.sin(t*9))*2:0));c.restore();
  } else original.call(OP.Art,c,id,0,0,scale,t,moving,flip,flash);
  c.restore();
  if(!e.dead)this.effects(c,e,scale,t,pose,attack);
 },
 effects(c,e,scale,t,pose,attack) {
  if(!OP.save.settings.effects)return;
  const angle=e.windup?.angle??(e.charge>0?Math.atan2(e.cy,e.cx):attack?.angle??(e.flip?Math.PI:0));
  c.save();c.translate(e.x,e.y-28*scale);c.rotate(angle);
  if(pose.name==='prepare') {
   c.strokeStyle=e.id==='crocodile'?'#edcf89':'#e7ba67';c.lineWidth=2;
   c.globalAlpha=.6+.25*Math.sin(t*20);c.beginPath();c.arc(12,0,10+(Math.floor(t*8)%2)*3,-1.3,1.3);c.stroke();
   if(e.id==='crocodile')for(let i=0;i<5;i++){const a=t*7+i*1.26;c.fillStyle='#e9ca8e';c.fillRect(14+Math.cos(a)*18,Math.sin(a)*13,3,3);}
  }
  if(pose.name==='strike') {
   const ranged=attack?.kind==='shot'&&e.charge<=0;
   if(e.id==='crocodile') {
    c.strokeStyle='#eed295';c.lineWidth=5;c.beginPath();c.arc(10,0,23,-1.15,1.15);c.stroke();
   } else if(ranged) {
    if(attack.time>.36){OP.Art.poly(c,[[18,-4],[32,-11],[28,-3],[41,0],[28,4],[31,11],[18,5]],'#ffe3a0');}
   } else {
    c.strokeStyle=e.id==='mr1'?'#dfefea':'#f0d5a1';c.lineWidth=e.id==='mr1'?4:3;
    c.beginPath();c.arc(9,0,26,-1.15,1.15);c.stroke();
    if(e.id==='mr1'){c.beginPath();c.arc(3,2,34,-1.05,1.05);c.stroke();}
   }
  }
  if(e.charge>0){c.globalAlpha=.55;c.strokeStyle=e.id==='mr1'?'#dbece5':'#e4c899';c.lineWidth=2;for(let i=-1;i<=1;i++){c.beginPath();c.moveTo(-45,i*9);c.lineTo(-18,i*9);c.stroke();}}
  c.restore();
 }
};
(() => {
 const art=OP.Art.actor,bullet=OP.Game.enemyBullet;
 OP.Art.actor=function(...args){return OP.EnemyAnimation.draw(art,...args)};
 OP.Game.enemyBullet=function(e,angle,color){OP.EnemyAnimation.attack(e,'shot',angle);return bullet.call(this,e,angle,color)};
 OP.EnemyAnimation.load();
})();
