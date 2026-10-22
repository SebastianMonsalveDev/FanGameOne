'use strict';
/* Additive v1 save migration. No ticket grants, purchases or draws. */
(() => {
 const defaults = OP.defaultSave;
 const load = OP.load;
 const tickets = value => Number.isSafeInteger(value) && value >= 0 ? value : 0;
 OP.normalizeProgress = save => ({...save, tickets:tickets(save.tickets)});
 OP.defaultSave = () => ({...defaults(), tickets:0});
 OP.load = () => OP.normalizeProgress(load());
 OP.save = OP.normalizeProgress(OP.save);
 OP.recruitmentRules = Object.freeze({
  enabled:false,
  costs:Object.freeze({1:1,5:5}),
  rates:Object.freeze([
   Object.freeze({id:'legendary',name:'Legendario',percent:1}),
   Object.freeze({id:'epic',name:'Épico',percent:5}),
   Object.freeze({id:'rare',name:'Raro',percent:24}),
   Object.freeze({id:'common',name:'Común',percent:70})
  ])
 });
})();
