'use strict';
/* Code-native pixel scenery and enemy silhouettes. Existing player sprites stay intact.
 * Character cues: one-piece.com/character/Crocodile/ and /character/Daz_Bonez/.
 */
OP.IslandArt = {
 groundCache:null,groundTheme:null,sprites:{},
 populate(s) {
  const hash=OP.Scenery.hash.bind(OP.Scenery);s.props=[];
  for(let i=0;i<22;i++) {
   const x=220+hash(i,11)*1750,y=240+hash(i,27)*1230;
   if(Math.hypot(x-1100,y-850)<150)continue;
   s.props.push({type:s.stage.theme==='desert'?(i%3?'cactus':'rock'):(i%3?'palm':'rock'),x,y,hp:55,open:false});
  }
  for(const [x,y] of [[600,1300],[1650,400]])s.props.push({type:'chest',x,y,hp:1,open:false});
  for(const [x,y] of [[800,1100],[1400,1200],[1700,900]])s.props.push({type:'barrel',x,y,hp:55,open:false});
  for(const [x,y] of [[600,600],[1570,600],[1100,380]])s.props.push({type:s.stage.theme==='desert'?'desert-house':'sky-ruin',x,y,hp:1e6,open:false});
  s.voyage.colliders=s.props.filter(o=>['desert-house','sky-ruin'].includes(o.type));
  this.groundCache=null;OP.Scenery.cache=null;
 },
 buildGround(s) {
  const canvas=document.createElement('canvas');canvas.width=2200;canvas.height=1700;
  const c=canvas.getContext('2d'),sky=s.stage.theme==='sky',hash=OP.Scenery.hash.bind(OP.Scenery);
  for(let y=0;y<1700;y+=16)for(let x=0;x<2200;x+=16) {
   const n=hash(x,y);c.fillStyle=sky?(n>.6?'#f2ebd5':'#e6dfc3'):(n>.7?'#dfbd7f':n>.3?'#d9b476':'#d2aa6e');c.fillRect(x,y,16,16);
   if(n>.86){c.fillStyle=sky?'#d3c8a6':'#bc945b';c.fillRect(x+3,y+8,9,2);}
  }
  if(sky) {
   c.fillStyle='#88c5db';c.fillRect(0,0,130,1700);c.fillRect(2070,0,130,1700);c.fillRect(0,0,2200,110);c.fillRect(0,1590,2200,110);
   for(let i=0;i<22;i++){const y=i*82;OP.Art.ellipse(c,140,y,95,55,'#fff5df');OP.Art.ellipse(c,2060,y+30,95,55,'#fff5df');}
   c.fillStyle='#cbc39d';c.fillRect(1040,200,120,1280);
   for(let y=210;y<1500;y+=40){c.strokeStyle='#a7a382';c.strokeRect(1040,y,120,32);}
  } else {
   // Low-contrast dune ridges are cached with the ground, never rebuilt per frame.
   c.strokeStyle='#edcf9266';c.lineWidth=6;
   for(let y=100;y<1700;y+=160){c.beginPath();for(let x=0;x<=2200;x+=40){const yy=y+Math.sin(x/220)*30;x?c.lineTo(x,yy):c.moveTo(x,yy)}c.stroke();}
   c.fillStyle='#caa566';c.fillRect(1040,200,120,1280);c.fillRect(400,780,1400,100);
   OP.Art.ellipse(c,380,1240,140,75,'#b5a36d');OP.Art.ellipse(c,380,1240,110,55,'#548f91');OP.Art.ellipse(c,360,1230,75,35,'#72afa6');
  }
  this.groundCache=canvas;this.groundTheme=s.stage.theme;return canvas;
 },
 ground(c,s) {c.drawImage(this.groundCache&&this.groundTheme===s.stage.theme?this.groundCache:this.buildGround(s),0,0)},
 prop(c,o) {
  if(!['cactus','desert-house','sky-ruin'].includes(o.type))return false;
  const A=OP.Art;c.save();c.translate(Math.round(o.x),Math.round(o.y));
  if(o.type==='cactus') {
   A.ellipse(c,3,5,21,8,'#7a623733');c.fillStyle='#577951';c.fillRect(-7,-58,14,61);c.fillRect(-23,-36,21,10);c.fillRect(-23,-52,9,25);c.fillRect(4,-29,22,9);c.fillRect(17,-48,9,26);
   c.fillStyle='#7a965e';c.fillRect(-5,-55,4,53);c.fillRect(-21,-49,3,18);c.fillRect(19,-45,3,20);c.fillStyle='#d0c083';for(let y=-50;y<0;y+=12)c.fillRect(3,y,3,2);
  } else if(o.type==='desert-house') {
   A.ellipse(c,8,8,95,23,'#725b3a33');c.fillStyle='#bd8e55';c.fillRect(-85,-90,170,94);c.fillStyle='#e1c28a';c.fillRect(-80,-86,158,85);c.fillStyle='#f0d7a1';c.fillRect(-88,-98,176,14);
   for(const x of [-65,40]){c.fillStyle='#715533';c.fillRect(x,-68,24,25);c.fillStyle='#9e7a47';c.fillRect(x+3,-65,3,19);}
   c.fillStyle='#705231';c.fillRect(-17,-47,34,50);A.ellipse(c,0,-47,17,12,'#705231');
   c.fillStyle='#e8d2a0';c.fillRect(-58,-119,116,22);A.ellipse(c,0,-119,58,29,'#e8d2a0');
  } else {
   A.ellipse(c,4,7,100,22,'#7a947433');c.fillStyle='#d8d8bb';c.fillRect(-90,-12,180,16);
   for(const x of [-60,48]){c.fillStyle='#b4bda5';c.fillRect(x,-120,20,110);c.fillStyle='#edf0d3';c.fillRect(x,-120,6,110);c.fillRect(x-5,-128,30,10);}
   c.fillStyle='#c9cfb6';c.fillRect(-74,-142,150,18);A.poly(c,[[-84,-142],[0,-184],[86,-142]],'#e7e6ca');
  }
  c.restore();return true;
 },
 sprite(id,variant=0,role='chaser') {
  const key=id+':'+variant+':'+role;
  if(this.sprites[key])return this.sprites[key];
  if(!['baroque','baroque_elite','mr1','crocodile','sky_guard'].includes(id))return null;
  const canvas=document.createElement('canvas');canvas.width=64;canvas.height=88;const c=canvas.getContext('2d');
  const rect=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(x,y,w,h)};
  const croco=id==='crocodile',mr1=id==='mr1',sky=id==='sky_guard';
  const skin=mr1?'#b78357':['#d8ad7e','#bd8c65','#e6bb8d'][variant],coat=croco?'#353e35':mr1?'#293943':id==='baroque_elite'?['#96703d','#74502e','#82683e'][variant]:sky?['#ece5c6','#cfd8cf','#e3d4b0'][variant]:['#6e5e49','#596c60','#785348'][variant];
  rect(20,62,10,20,'#38322d');rect(36,62,10,20,'#38322d');rect(17,80,15,5,'#252826');rect(35,80,16,5,'#252826');
  rect(18,35,30,31,coat);rect(14,39,8,24,skin);rect(46,39,8,24,skin);rect(23,13,23,25,skin);rect(19,18,5,14,skin);
  rect(26,24,4,3,'#282a23');rect(38,24,4,3,'#282a23');rect(29,33,10,2,'#83533c');
  if(croco) {
   rect(13,33,10,43,'#2f4038');rect(46,34,10,43,'#2f4038');rect(15,31,10,12,'#b5a081');rect(44,31,10,12,'#b5a081');
   rect(26,37,17,28,'#c8b589');rect(27,40,16,3,'#6c6757');rect(27,48,16,3,'#6c6757');rect(27,56,16,3,'#6c6757');rect(32,38,4,24,'#6a573c');
   rect(22,10,24,8,'#242d2b');rect(41,13,7,11,'#242d2b');rect(22,26,24,2,'#8c5b46');rect(23,24,2,6,'#8c5b46');rect(44,30,11,3,'#ad8657');rect(54,30,3,3,'#ae5030');
   rect(10,56,8,6,'#d4b45c');rect(8,61,5,12,'#d4b45c');rect(8,70,14,5,'#d4b45c');rect(18,63,5,11,'#d4b45c');
  } else if(mr1) {
   rect(23,11,23,4,skin);rect(27,39,14,14,skin);rect(24,39,3,19,'#535e5d');rect(40,39,3,19,'#535e5d');
   rect(8,40,4,34,'#d5ded6');rect(51,40,4,34,'#d5ded6');rect(12,47,4,22,'#839895');rect(47,47,4,22,'#839895');
  } else if(sky) {
   rect(3,32,13,23,'#faf6df');rect(48,32,13,23,'#faf6df');rect(6,29,7,30,'#d7dac7');rect(52,29,7,30,'#d7dac7');
   rect(22,10,25,8,'#c6b273');rect(30,35,9,27,'#c7b773');rect(57,25,3,53,'#806e44');rect(55,20,7,9,'#e6e7d2');
  } else {
   rect(21,10,26,10,'#322b25');rect(18,17,31,6,id==='baroque_elite'?'#d9b65e':'#c4b68c');rect(29,36,6,20,'#b7a46c');
   rect(27,58,14,4,'#3d3429');
   if(id==='baroque_elite'){rect(18,35,5,8,'#e4c56d');rect(43,35,5,8,'#e4c56d');rect(29,57,8,6,'#e4c56d');}
   if(variant===1){rect(18,21,7,20,coat);rect(40,30,8,5,coat);}
   if(variant===2){rect(17,9,31,8,coat);rect(13,17,39,4,'#aa9566');}
   if(role==='ranged') {rect(48,49,12,7,'#49392c');rect(52,43,5,15,'#a18352');rect(54,29,5,22,'#83918a');rect(53,27,7,3,'#343d38');}
   else {rect(54,38,3,39,'#6a553a');rect(53,30,5,18,'#c5d1c8');rect(50,48,11,3,'#c6a254');if(role==='charger'){rect(5,39,4,29,'#c5d1c8');rect(3,66,9,3,'#c6a254');}}
  }
  this.sprites[key]=canvas;return canvas;
 },
 actor(c,id,x,y,scale,t,moving,flip,flash) {
  const image=this.sprite(id);if(!image)return false;
  c.save();c.imageSmoothingEnabled=false;c.translate(Math.round(x),Math.round(y+(moving?Math.sin(t*9)*1.5:0)));if(flip)c.scale(-1,1);
  OP.Art.ellipse(c,0,3,15*scale,4.5*scale,'#473b293b');if(flash)c.filter='brightness(1.8)';
  c.drawImage(image,-32*scale,-84*scale,64*scale,88*scale);c.restore();return true;
 },
 overlays(game) {
  const s=game.state,c=game.ctx,A=OP.Art;c.save();c.translate(game.width/2,game.height/2);c.scale(game.zoom,game.zoom);c.translate(-s.camera.x,-s.camera.y);
  for(const e of s.enemies) {
   if(e.dead)continue;
   if(e.rank==='elite'||e.rank==='mini'){c.fillStyle=e.rank==='mini'?'#ffdb82':'#ffecaa';c.font='bold 11px Arial';c.textAlign='center';c.fillText(e.rank==='mini'?'MR. 1':'ÉLITE',e.x,e.y-90);}
   if(e.windup) {
    c.save();c.strokeStyle='#b1371e';c.fillStyle='#bf462d44';c.lineWidth=3;
    if(e.windup.kind==='blade'){c.translate(e.x,e.y);c.rotate(e.windup.angle);c.fillRect(0,-14,550,28);c.strokeRect(0,-14,550,28);}
    else {c.beginPath();c.ellipse(e.windup.x,e.windup.y,65,45,0,0,Math.PI*2);c.fill();c.stroke();}
    c.restore();
   }
  }
  for(const h of s.hazards)if(h.kind==='sandstorm'&&h.warn<=0)for(let i=0;i<5;i++) {
   const radius=14+i*10,offset=Math.sin(s.time*8+i)*6;c.strokeStyle=i%2?'#efd69b':'#a8773e';c.lineWidth=5;
   c.beginPath();c.ellipse(h.x+offset,h.y-i*13,radius,radius*.3,0,0,Math.PI*2);c.stroke();
  }
  for(const b of s.bullets)if(b.sandBlade){const angle=Math.atan2(b.vy,b.vx);A.line(c,b.x-Math.cos(angle)*18,b.y-Math.sin(angle)*18,b.x+Math.cos(angle)*18,b.y+Math.sin(angle)*18,'#f3daa2',6);}
  c.restore();
 },
 minimap(s) {
  const c=document.getElementById('minimap').getContext('2d');c.clearRect(0,0,132,100);c.fillStyle=s.stage.theme==='desert'?'#d1ac72':'#e9e6cc';c.fillRect(0,0,132,100);
  c.strokeStyle='#b38c53';c.strokeRect(4,4,124,92);
  for(const o of s.props)if(o.type==='chest'&&!o.open){c.fillStyle='#76501c';c.fillRect(o.x/2200*132-2,o.y/1700*100-2,4,4);}
  for(const e of s.enemies)if(!e.dead){c.fillStyle=e.boss?'#bd271b':e.rank==='mini'?'#a15f18':'#98604a';c.fillRect(e.x/2200*132-1,e.y/1700*100-1,e.boss?4:2,e.boss?4:2);}
  c.fillStyle='#123c75';c.fillRect(s.player.x/2200*132-2,s.player.y/1700*100-2,4,4);
 }
};
(() => {
 const art=OP.Art,sprite=art.sprite,scenery=OP.Scenery,ground=scenery.ground,prop=scenery.prop,resolve=scenery.resolve,render=OP.Game.render;
 art.sprite=function(c,id,...args){return OP.IslandArt.actor(c,id,...args)||sprite.call(this,c,id,...args)};
 scenery.ground=function(c,s){if(s.voyage)return OP.IslandArt.ground(c,s);return ground.call(this,c,s)};
 scenery.prop=function(c,o){return OP.IslandArt.prop(c,o)||prop.call(this,c,o)};
 scenery.resolve=function(x,y,r,props){const pos=resolve.call(this,x,y,r,props);for(const o of OP.Game.state?.voyage?.colliders||[]){const dx=pos.x-o.x,dy=pos.y-(o.y-18),px=90+r-Math.abs(dx),py=20+r-Math.abs(dy);if(px>0&&py>0){if(px<py)pos.x+=Math.sign(dx||1)*px;else pos.y+=Math.sign(dy||1)*py}}return pos};
 OP.Game.render=function(){render.call(this);if(this.state?.voyage)OP.IslandArt.overlays(this)};
})();
