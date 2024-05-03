import{$ as E,A as d,Ad as x,Bd as S,Ed as U,Ld as V,Oc as f,Pc as I,Rc as g,S as p,V as w,aa as z,j as n,k as c,m as u,p as B,ud as v,wd as R,yd as L}from"./chunk-LCVDR2E5.js";import{a as D,d as M,g as O}from"./chunk-LYCM6NQH.js";var j=(()=>{let t=class t{};t.type="[Setting] Get Setting";let r=t;return r})(),F=(()=>{let t=class t{constructor(e){this.payload=e}};t.type="[Setting] Create Table";let r=t;return r})(),k=(()=>{let t=class t{constructor(e){this.payload=e}};t.type="[Setting] Update Table";let r=t;return r})(),A=(()=>{let t=class t{constructor(e){this.payload=e}};t.type="[Setting] Remove Table";let r=t;return r})(),G=(()=>{let t=class t{constructor(e){this.payload=e}};t.type="[Setting] Create Video";let r=t;return r})(),N=(()=>{let t=class t{constructor(e){this.payload=e}};t.type="[Setting] Update Video";let r=t;return r})(),q=(()=>{let t=class t{constructor(e){this.payload=e}};t.type="[Setting] Create Value Dolar";let r=t;return r})(),H=(()=>{let t=class t{constructor(e){this.payload=e}};t.type="[Setting] Update Value Dolar";let r=t;return r})();var J=(()=>{let t=class t{constructor(e){this.firestore=e}getSettings(){let e=v(this.firestore,"settings");return c(U(e)).pipe(B(a=>{let o=[];return a.forEach(h=>{o.push(D({id:h.id},h.data()))}),o}))}createTable(e){let a=v(this.firestore,"settings"),o=e.rows.map(T=>T.reduce((b,y,C)=>(b[C]=y||"",b),{})),h={columns:e.columns,rows:o};return c(L(a,h))}updateTable(e,a){let o=S(this.firestore,"settings",e),h=a.rows.map(b=>b.reduce((y,C,K)=>(y[K]=C||"",y),{})),T={columns:a.columns,rows:h};return c(V(o,T))}removeTable(e){return c(x(S(this.firestore,"settings",e)))}createVideo(e){let a=v(this.firestore,"settings");return c(L(a,{url:e}))}updateVideo(e,a){let o=S(this.firestore,"settings",e);return c(V(o,{url:a}))}createValueDolar(e){let a=v(this.firestore,"settings");return c(L(a,{valueDolar:e}))}updateValueDolar(e,a){let o=S(this.firestore,"settings",e);return c(V(o,{valueDolar:a}))}};t.\u0275fac=function(a){return new(a||t)(E(R))},t.\u0275prov=w({token:t,factory:t.\u0275fac,providedIn:"root"});let r=t;return r})();var l=M(O());var m,s=(m=class{constructor(){this.settingsService=z(J)}static settingsLoading(t){return t.loading}static updateTableLoading(t){return t.tableLoading}static updateVideoLoading(t){return t.videoLoading}static updateValueDolarLoading(t){return t.valueDolarLoading}static removeTableLoading(t){return t.removeTableLoading}static valueDolar(t){return t.valueDolar?.value}getSettings(t,i){return t.patchState({loading:!0}),this.settingsService.getSettings().pipe(p(e=>{let a={};e.forEach(o=>{o.rows&&o.columns&&(a.tables={id:o.id,rows:o.rows,columns:o.columns}),o.url&&(a.videos={id:o.id,url:o.url}),o.valueDolar&&(a.valueDolar={id:o.id,value:o.valueDolar})}),t.patchState(D({},a)),t.patchState({loading:!1})}),d(e=>(l.default.fire({position:"top-end",icon:"error",title:"Error al cargar configuraci\xF3n",showConfirmButton:!1,timer:1500}),u(()=>e))))}createTable(t,i){let{table:e}=i.payload;return this.settingsService.createTable(e).pipe(p(a=>{t.patchState(a),l.default.fire({position:"top-end",icon:"success",title:"Tabla creada con \xE9xito",showConfirmButton:!1,timer:1500})}),d(a=>(l.default.fire({position:"top-end",icon:"error",title:"Error al crear tabla",showConfirmButton:!1,timer:1500}),u(()=>a))))}updateTable(t,i){let{id:e,table:a}=i.payload;return t.patchState({tableLoading:!0}),this.settingsService.updateTable(e,a).pipe(p(o=>{t.patchState({tableLoading:!1}),l.default.fire({position:"top-end",icon:"success",title:"Tabla actualizada con \xE9xito",showConfirmButton:!1,timer:1500})}),d(o=>(t.patchState({tableLoading:!1}),l.default.fire({position:"top-end",icon:"error",title:"Error al actualizar tabla",showConfirmButton:!1,timer:1500}),u(()=>o))))}removeTable(t,i){return t.patchState({removeTableLoading:!0}),this.settingsService.removeTable(i.payload).pipe(p(e=>{t.patchState(e),t.patchState({removeTableLoading:!1}),l.default.fire({position:"top-end",icon:"success",title:"Tabla eliminada con \xE9xito",showConfirmButton:!1,timer:1500})}),d(e=>(l.default.fire({position:"top-end",icon:"error",title:"Error eliminando tabla",showConfirmButton:!1,timer:1500}),u(()=>e))))}createVideo(t,i){return this.settingsService.createVideo(i.payload.url).pipe(p(e=>{t.patchState(e),l.default.fire({position:"top-end",icon:"success",title:"Video creado con \xE9xito",showConfirmButton:!1,timer:1500})}),d(e=>(l.default.fire({position:"top-end",icon:"error",title:"Error creando video",showConfirmButton:!1,timer:1500}),u(()=>e))))}updateVideo(t,i){let{videoId:e,url:a}=i.payload;return t.patchState({videoLoading:!0}),this.settingsService.updateVideo(e,a).pipe(p(o=>{o&&t.patchState(o),t.patchState({videoLoading:!1}),l.default.fire({position:"top-end",icon:"success",title:"Video actualizado con \xE9xito",showConfirmButton:!1,timer:1500})}),d(o=>(t.patchState({videoLoading:!1}),l.default.fire({position:"top-end",heightAuto:!0,icon:"error",title:"Error actualizando video",showConfirmButton:!1,timer:1500}),u(()=>o))))}createValueDolar(t,i){let{value:e}=i.payload;return this.settingsService.createValueDolar(Number(e)).pipe(p(a=>{t.patchState(a),l.default.fire({position:"top-end",icon:"success",title:"Valor del d\xF3lar actualizado con \xE9xito",showConfirmButton:!1,timer:1500})}),d(a=>(l.default.fire({position:"top-end",icon:"error",title:"Error actualizando valor del d\xF3lar",showConfirmButton:!1,timer:1500}),u(()=>a))))}updateValueDolar(t,i){let{id:e,valueDolar:a}=i.payload;return t.patchState({valueDolarLoading:!0}),this.settingsService.updateValueDolar(e,a).pipe(p(o=>{o&&t.patchState(o),t.patchState({valueDolarLoading:!1}),l.default.fire({position:"top-end",icon:"success",title:"Valor del d\xF3lar actualizado con \xE9xito",showConfirmButton:!1,timer:1500})}),d(o=>(t.patchState({valueDolarLoading:!1}),l.default.fire({position:"top-end",icon:"error",title:"Error actualizando valor del d\xF3lar",showConfirmButton:!1,timer:1500}),u(()=>o))))}},m.\u0275fac=function(i){return new(i||m)},m.\u0275prov=w({token:m,factory:m.\u0275fac,providedIn:"root"}),m);n([f(j,{cancelUncompleted:!0})],s.prototype,"getSettings",null);n([f(F)],s.prototype,"createTable",null);n([f(k)],s.prototype,"updateTable",null);n([f(A)],s.prototype,"removeTable",null);n([f(G)],s.prototype,"createVideo",null);n([f(N)],s.prototype,"updateVideo",null);n([f(q)],s.prototype,"createValueDolar",null);n([f(H)],s.prototype,"updateValueDolar",null);n([g()],s,"settingsLoading",null);n([g()],s,"updateTableLoading",null);n([g()],s,"updateVideoLoading",null);n([g()],s,"updateValueDolarLoading",null);n([g()],s,"removeTableLoading",null);n([g()],s,"valueDolar",null);s=n([I({name:"settings",defaults:{loading:!1,tableLoading:!1,videoLoading:!1,valueDolarLoading:!1,removeTableLoading:!1,tables:[],videos:[],valueDolar:void 0}})],s);export{j as a,F as b,k as c,A as d,G as e,N as f,q as g,H as h,s as i};