import{a as se}from"./chunk-G5EHCWGQ.js";import"./chunk-WXI33M2S.js";import{a as me}from"./chunk-PB3AUL2M.js";import{f as B,k as C,o as _,u as F}from"./chunk-42JZZIBE.js";import{d as R}from"./chunk-ZVXUN7V6.js";import{$d as ee,Cb as f,Db as S,E as x,Ic as E,Jc as U,Mc as $,Nd as Y,Qb as a,Qc as z,Qd as H,Rb as L,Rd as u,Sb as j,Sd as K,Td as Z,Ub as h,V as T,Wd as J,Xd as Q,Ya as s,Yb as G,Yd as W,Za as A,Zb as q,_d as X,aa as p,ab as I,ae as te,be as re,ce as oe,da as y,de as ie,ee as ae,fe as ne,he as le,ia as D,ie as de,j as V,ja as O,lb as m,rb as k,sb as v,tb as w,ub as r,uc as P,vb as t,wb as c,zb as M}from"./chunk-LCVDR2E5.js";import{d as be,g as ye}from"./chunk-LYCM6NQH.js";function he(d,e){if(d&1&&(r(0,"option",8),a(1),t()),d&2){let l=e.$implicit;m("value",l.value),s(),L(l.label)}}function xe(d,e){if(d&1){let l=M();r(0,"div",23)(1,"div",24),a(2),t(),c(3,"hr",25),r(4,"div",26)(5,"label",27),a(6,"Selecciona un archivo"),t(),r(7,"input",28),f("change",function(n){let b=D(l).$index,ge=S();return O(ge.onFileSelected(b,n))}),t(),r(8,"label",17),a(9,"Cantidad Impresiones"),t(),c(10,"input",29),t()()}if(d&2){let l=e.$index,o=S();m("formGroup",o.getFormGroup(l)),s(2),j("Archivo ",l+1,"")}}var pe=(()=>{let e=class e{constructor(o){this.fb=o,this.typesEnum=me,this.TYPE_VALUES=[{value:this.typesEnum.PAPEL,label:"Papel"},{value:this.typesEnum.DTF,label:"DTF"},{value:this.typesEnum.TELA,label:"Tela"},{value:this.typesEnum.YZBEK,label:"Yzbek"},{value:this.typesEnum.DEPORTIVAS,label:"Deportivas"}],this.isLoading=!1,this.formValues=new I}ngOnInit(){this.form=this.fb.group({workName:["",u.required],mode:[null,u.required],type:[null,u.required],note:[""],filesCount:["1",[u.required,u.min(1),u.max(10)]],files:this.fb.array([this.createFile()])})}get files(){return this.form.controls.files}createFile(){return this.fb.group({file:["",u.required],count:["1",u.required]})}getFormGroup(o){return this.files.controls[o]}updateFiles(){let o=this.form.value.filesCount||0;for(;this.files.length<o;)this.files.push(this.createFile());for(;this.files.length>o;)this.files.removeAt(this.files.length-1)}onFileSelected(o,n){let i=n.target.files?.[0];i&&this.getFormGroup(o).patchValue({file:i})}sendFormValues(){this.form.value.mode=Number(this.form.value.mode),this.form.value.type=Number(this.form.value.type),this.form.value.workName=this.form.value.workName.toLowerCase(),this.formValues.emit(this.form.value)}};e.\u0275fac=function(n){return new(n||e)(A(le))},e.\u0275cmp=y({type:e,selectors:[["app-make-order-form"]],inputs:{isLoading:"isLoading"},outputs:{formValues:"formValues"},standalone:!0,features:[h],decls:45,vars:5,consts:[[3,"formGroup"],[1,"space-y-4"],[1,"text-left","py-4","text-3xl","tracking-tight","font-semibold","text-gray-900"],[1,"xs:flex-col","lg:flex","justify-between","pb-4"],["for","workName",1,"block","mb-2","text-sm","font-medium","text-gray-900","dark:text-white"],["type","text","name","workName","formControlName","workName","id","workName","placeholder","Nombre para tu trabajo","required","",1,"bg-gray-50","md:min-w-96","border","border-gray-300","text-gray-900","text-sm","rounded-lg","focus:ring-blue-500","focus:border-blue-500","block","w-full","p-2.5","dark:bg-gray-600","dark:border-gray-500","dark:placeholder-gray-400","dark:text-white"],["for","mode",1,"block","mb-2","text-sm","font-medium","text-gray-900","dark:text-white"],["name","mode","formControlName","mode","id","mode",1,"bg-gray-50","border","border-gray-300","text-gray-900","text-sm","rounded-lg","focus:ring-blue-500","focus:border-blue-500","block","w-full","p-2.5","dark:bg-gray-700","dark:border-gray-600","dark:placeholder-gray-400","dark:text-white","dark:focus:ring-blue-500","dark:focus:border-blue-500"],[3,"value"],[1,"flex","justify-between"],["for","type",1,"block","mb-2","text-sm","font-medium","text-gray-900","dark:text-white"],["name","type","formControlName","type","id","type",1,"bg-gray-50","border","border-gray-300","text-gray-900","text-sm","rounded-lg","focus:ring-blue-500","focus:border-blue-500","block","md:min-w-96","p-2.5","dark:bg-gray-700","dark:border-gray-600","dark:placeholder-gray-400","dark:text-white","dark:focus:ring-blue-500","dark:focus:border-blue-500"],["for","note",1,"block","mb-2","text-sm","font-medium","text-gray-900","dark:text-white"],["type","text","name","note","id","note","formControlName","note","placeholder","Nombre para tu trabajo","required","",1,"bg-gray-50","md:w-[32rem]","border","border-gray-300","text-gray-900","text-sm","rounded-lg","focus:ring-blue-500","focus:border-blue-500","block","w-full","p-2.5","dark:bg-gray-600","dark:border-gray-500","dark:placeholder-gray-400","dark:text-white"],[1,"h-px","mt-8","bg-gray-200","border-0","dark:bg-gray-700"],[1,"py-4"],[1,"flex","justify-between","pb-4"],["for","count",1,"block","mb-2","text-sm","font-medium","text-gray-900","dark:text-white"],["title","count","type","number","formControlName","filesCount","min","1","max","10",1,"bg-gray-50","border","border-gray-300","text-gray-900","text-sm","rounded-lg","focus:ring-blue-500","focus:border-blue-500","block","w-32","p-2.5","dark:bg-gray-600","dark:border-gray-500","dark:placeholder-gray-400","dark:text-white",3,"input"],["formArrayName","files",1,"grid","grid-cols-1","sm:grid-cols-2","order-last","gap-x-32","gap-y-6","overflow-auto","max-h-[36rem]"],[1,"h-px","mt-8","bg-gray-200","border-0","dark:bg-gray-700","my-6"],[1,"flex","justify-end"],["classes","text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800",3,"isLoading","isDisabled","click"],[1,"w-full","sm:w-[29rem]","p-6","bg-white","border","border-gray-200","rounded-lg","shadow","dark:bg-gray-800","dark:border-gray-700",3,"formGroup"],[1,"text-lg","text-slate-500","font-light"],[1,"h-px","bg-gray-200","border-0","dark:bg-gray-700","my-4"],[1,"space-y-4","py-2"],["for","file_input",1,"block","mb-2","text-sm","font-medium","text-gray-900","dark:text-white"],["id","file_input","type","file",1,"block","w-full","text-sm","text-gray-900","border","border-gray-300","rounded-lg","cursor-pointer","bg-gray-50","dark:text-gray-400","focus:outline-none","dark:bg-gray-700","dark:border-gray-600","dark:placeholder-gray-400",3,"change"],["id","count","type","number","min","1","title","count","formControlName","count",1,"bg-gray-50","border","w-16","border-gray-300","text-gray-900","text-sm","rounded-lg","focus:ring-blue-500","focus:border-blue-500","block","p-2.5","dark:bg-gray-700","dark:border-gray-600","dark:placeholder-gray-400","dark:text-white","dark:focus:ring-blue-500","dark:focus:border-blue-500"],["class","w-full sm:w-[29rem] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",3,"formGroup"]],template:function(n,i){n&1&&(r(0,"form",0)(1,"section",1)(2,"h3",2),a(3," Completa los datos \u{1F4DD} "),t(),r(4,"div",3)(5,"div")(6,"label",4),a(7,"Nombre del trabajo"),t(),c(8,"input",5),t(),r(9,"div")(10,"label",6),a(11,"Modo"),t(),r(12,"select",7)(13,"option",8),a(14,"Normal (24 a 96h)"),t(),r(15,"option",8),a(16," Urgente (entrega en 24h, costo 25% extra, sujeto a disponibilidad) "),t()()()(),r(17,"div",9)(18,"div")(19,"label",10),a(20,"Tipo"),t(),r(21,"select",11),v(22,he,2,2,"option",8,k),t()(),r(24,"div")(25,"label",12),a(26,"Nota"),t(),r(27,"textarea",13),a(28,"        "),t()()()(),c(29,"hr",14),r(30,"section",15)(31,"div",16)(32,"h3",2),a(33," Archivos \u{1F4C1} "),t(),r(34,"div")(35,"label",17),a(36,"Cantidad archivos* "),t(),r(37,"input",18),f("input",function(){return i.updateFiles()}),t()()(),r(38,"div",19),v(39,xe,11,2,"div",30,k),t()(),c(41,"hr",20),r(42,"div",21)(43,"app-button",22),f("click",function(){return i.sendFormValues()}),a(44,"Hacer pedido"),t()()()),n&2&&(m("formGroup",i.form),s(13),m("value",0),s(2),m("value",1),s(7),w(i.TYPE_VALUES),s(17),w(i.files.controls),s(4),m("isLoading",i.isLoading)("isDisabled",i.form.invalid))},dependencies:[de,J,re,oe,H,Q,te,K,Z,ne,ae,ie,W,ee,X,Y]});let d=e;return d})();var fe=be(ye());var ce=(()=>{let e=class e{constructor(){this.currentId=0}generateUniqueId(){return this.currentId++,this.pad(this.currentId,2)}pad(o,n){let i=o+"";for(;i.length<n;)i="0"+i;return i}};e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=T({token:e,factory:e.\u0275fac,providedIn:"root"});let d=e;return d})();var g=class g{constructor(){this.store=p($),this.actions=p(U),this.toastrService=p(se),this.router=p(B),this.idGenerator=p(ce)}saveOrder(e){e||this.toastrService.error("Error al guardar la orden"),this.store.dispatch(new _(e.files)),this.actions.pipe(E(_),x(1)).subscribe(()=>{let l=this.store.selectSnapshot(F).currentFiles,o=e.files.map((i,b)=>({count:i.count,file:l[b],type:i.file.type})),n={workName:e.workName,mode:e.mode,type:e.type,note:e.note,files:o,status:0,creationDate:new Date().valueOf(),userId:this.store.selectSnapshot(R).preferences.uid};this.store.dispatch(new C(n)),this.actions.pipe(E(C),x(1)).subscribe(()=>{fe.default.fire("Pedido realizado","El pedido ha sido realizado con \xE9xito","success"),this.router.navigate(["/usuario/ordenes"])})})}};g.\u0275fac=function(l){return new(l||g)},g.\u0275cmp=y({type:g,selectors:[["app-make-order"]],standalone:!0,features:[h],decls:8,vars:3,consts:[[1,"py-8","bg-gray-50"],[1,"text-center","text-6xl","tracking-tight","font-semibold","text-gray-900"],[1,"pt-8","flex","justify-center"],[1,"w-full","max-w-6xl","p-4","bg-white","border","border-gray-200","rounded-lg","shadow","sm:p-6","md:p-8","dark:bg-gray-800","dark:border-gray-700"],[3,"isLoading","formValues"]],template:function(l,o){l&1&&(r(0,"section",0)(1,"header")(2,"h1",1),a(3,"Haz tu pedido \u{1F4E6}"),t()(),r(4,"main",2)(5,"div",3)(6,"app-make-order-form",4),f("formValues",function(i){return o.saveOrder(i)}),G(7,"async"),t()()()()),l&2&&(s(6),m("isLoading",q(7,1,o.loading$)))},dependencies:[pe,P]});var N=g;V([z(F.isLoading)],N.prototype,"loading$",void 0);export{N as MakeOrderComponent};