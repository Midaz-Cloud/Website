import{r as z,a as x}from"./index._OACqPSs.js";var C={exports:{}},v={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var S;function E(){if(S)return v;S=1;var a=z(),c=Symbol.for("react.element"),t=Symbol.for("react.fragment"),u=Object.prototype.hasOwnProperty,y=a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,h={key:!0,ref:!0,__self:!0,__source:!0};function j(p,o,m){var l,d={},f=null,w=null;m!==void 0&&(f=""+m),o.key!==void 0&&(f=""+o.key),o.ref!==void 0&&(w=o.ref);for(l in o)u.call(o,l)&&!h.hasOwnProperty(l)&&(d[l]=o[l]);if(p&&p.defaultProps)for(l in o=p.defaultProps,o)d[l]===void 0&&(d[l]=o[l]);return{$$typeof:c,type:p,key:f,ref:w,props:d,_owner:y.current}}return v.Fragment=t,v.jsx=j,v.jsxs=j,v}var $;function I(){return $||($=1,C.exports=E()),C.exports}var e=I();/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),_=(...a)=>a.filter((c,t,u)=>!!c&&c.trim()!==""&&u.indexOf(c)===t).join(" ").trim();/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var D={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=x.forwardRef(({color:a="currentColor",size:c=24,strokeWidth:t=2,absoluteStrokeWidth:u,className:y="",children:h,iconNode:j,...p},o)=>x.createElement("svg",{ref:o,...D,width:c,height:c,stroke:a,strokeWidth:u?Number(t)*24/Number(c):t,className:_("lucide",y),...p},[...j.map(([m,l])=>x.createElement(m,l)),...Array.isArray(h)?h:[h]]));/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=(a,c)=>{const t=x.forwardRef(({className:u,...y},h)=>x.createElement(O,{ref:h,iconNode:c,className:_(`lucide-${T(a)}`,u),...y}));return t.displayName=`${a}`,t};/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=g("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=g("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=g("ChartColumn",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=g("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=g("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=g("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=g("Monitor",[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=g("Smartphone",[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=g("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),M={businessName:"",rif:"",email:"",phone:"",employeeCount:null,monthlyVolume:null,solution:null,plan:null},V={agora:[{id:"emprendedor",name:"Emprendedor",price:"$49",period:"/mes",description:"Para negocios que inician",features:["Facturación fiscal","Inventario básico","1 usuario","Soporte email"],recommended:!1},{id:"empresarial",name:"Empresarial",price:"$99",period:"/mes",description:"Para negocios en crecimiento",features:["Todo en Emprendedor","Multi-almacén","5 usuarios","Reportes avanzados","Soporte prioritario"],recommended:!0}],web:[{id:"mensual",name:"Mensual",price:"$29",period:"/mes",description:"Pago flexible",features:["Software completo","Conexión HKA/Bixolon","Actualizaciones","Soporte técnico"],recommended:!1},{id:"anual",name:"Anual",price:"$290",period:"/año",description:"Ahorra 2 meses",features:["Todo en Mensual","Soporte prioritario","Ahorro de $58"],recommended:!0}],gestion:[{id:"gratuito",name:"Gratuito",price:"$0",period:"",description:"Para empezar",features:["Control de inventario","1 ubicación","Reportes básicos"],recommended:!1},{id:"pro",name:"Pro",price:"$19",period:"/mes",description:"Control total",features:["Todo en Gratuito","Multi-ubicación","Multi-usuario","Soporte dedicado"],recommended:!0}]},B=`
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOutUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-30px);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes pulse-ring {
        0% {
            transform: scale(0.8);
            opacity: 0.8;
        }
        50% {
            transform: scale(1.2);
            opacity: 0.4;
        }
        100% {
            transform: scale(0.8);
            opacity: 0.8;
        }
    }
    
    .step-enter {
        animation: fadeInUp 0.5s ease-out forwards;
    }
    
    .step-exit {
        animation: fadeOutUp 0.3s ease-in forwards;
    }
    
    .card-enter {
        animation: scaleIn 0.4s ease-out forwards;
    }
    
    .slide-in {
        animation: slideInRight 0.5s ease-out forwards;
    }
    
    .stagger-1 { animation-delay: 0.1s; opacity: 0; }
    .stagger-2 { animation-delay: 0.2s; opacity: 0; }
    .stagger-3 { animation-delay: 0.3s; opacity: 0; }
    .stagger-4 { animation-delay: 0.4s; opacity: 0; }
`;function Y(){const[a,c]=x.useState(0),[t,u]=x.useState(M),[y,h]=x.useState(!1),[j,p]=x.useState("next");x.useEffect(()=>{const s=localStorage.getItem("midaz-onboarding-v4");if(s)try{const i=JSON.parse(s);u(i.formData||M),c(i.currentStep||0)}catch(i){console.error("Error loading onboarding state",i)}},[]),x.useEffect(()=>{localStorage.setItem("midaz-onboarding-v4",JSON.stringify({formData:t,currentStep:a}))},[t,a]);const o=(s,i="next")=>{p(i),h(!0),setTimeout(()=>{c(s),h(!1)},300)},m=()=>o(a+1,"next"),l=()=>o(a-1,"prev"),d=s=>{u(i=>({...i,...s}))},f=()=>{switch(a){case 1:return t.businessName&&t.email;case 2:return t.employeeCount!==null;case 3:return t.monthlyVolume!==null;case 4:return t.solution!==null;case 5:return t.plan!==null;default:return!0}},w=()=>{localStorage.removeItem("midaz-onboarding-v4"),window.location.href="/"},n="#0a0a1a",r="#d4a853";return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:B}),e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden",children:[e.jsxs("div",{className:"fixed inset-0 overflow-hidden pointer-events-none",children:[e.jsx("div",{className:"absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-orange-200/20 rounded-full blur-3xl"}),e.jsx("div",{className:"absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/20 rounded-full blur-3xl"})]}),e.jsx("header",{className:"fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50",children:e.jsxs("div",{className:"max-w-6xl mx-auto px-6 py-4 flex items-center justify-between",children:[e.jsx("a",{href:"/",className:"flex items-center gap-2",children:e.jsx("img",{src:"/images/midaz-logo.png",alt:"Midaz",className:"h-8 w-auto"})}),a>0&&a<6&&e.jsx("div",{className:"flex items-center gap-2",children:[1,2,3,4,5].map(s=>e.jsx("div",{className:`h-2 rounded-full transition-all duration-500 ${s<=a?"w-8":"w-2"}`,style:{backgroundColor:s<=a?r:"#e5e7eb"}},s))}),e.jsx("a",{href:"/",className:"text-sm text-gray-400 hover:text-gray-600 transition-colors",children:"Salir"})]})}),e.jsxs("main",{className:`pt-24 min-h-screen ${y?"step-exit":"step-enter"}`,children:[a===0&&e.jsx("div",{className:"min-h-[calc(100vh-96px)] flex flex-col items-center justify-center px-6",children:e.jsxs("div",{className:"text-center max-w-lg",children:[e.jsx("div",{className:"mb-8 card-enter",children:e.jsxs("div",{className:"w-24 h-24 mx-auto rounded-3xl flex items-center justify-center shadow-2xl relative",style:{background:`linear-gradient(135deg, ${r}, #b8963f)`},children:[e.jsx("span",{className:"text-4xl",children:"✨"}),e.jsx("div",{className:"absolute inset-0 rounded-3xl",style:{background:`linear-gradient(135deg, ${r}, #b8963f)`,animation:"pulse-ring 2s ease-in-out infinite",opacity:.3}})]})}),e.jsx("h1",{className:"text-4xl md:text-5xl font-bold mb-4 slide-in",style:{color:n},children:"Bienvenido a Midaz"}),e.jsx("p",{className:"text-xl text-gray-500 mb-12 slide-in stagger-1",children:"Configura tu negocio en minutos y comienza a vender hoy mismo."}),e.jsxs("button",{onClick:m,className:"group inline-flex items-center gap-3 px-10 py-5 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl slide-in stagger-2",style:{backgroundColor:r},children:["Comenzar",e.jsx(R,{className:"w-5 h-5 group-hover:translate-x-1 transition-transform"})]}),e.jsx("p",{className:"mt-8 text-sm text-gray-400 slide-in stagger-3",children:"⏱️ Solo 2 minutos • Sin tarjeta de crédito"})]})}),a===1&&e.jsx("div",{className:"min-h-[calc(100vh-96px)] flex items-center justify-center px-6 py-12",children:e.jsxs("div",{className:"w-full max-w-md",children:[e.jsxs("div",{className:"text-center mb-10",children:[e.jsx("div",{className:"w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 card-enter",style:{backgroundColor:`${r}20`},children:e.jsx("span",{className:"text-3xl",children:"🏪"})}),e.jsx("h2",{className:"text-3xl font-bold mb-2 slide-in",style:{color:n},children:"Tu negocio"}),e.jsx("p",{className:"text-gray-500 slide-in stagger-1",children:"Cuéntanos un poco sobre ti"})]}),e.jsxs("div",{className:"space-y-5 slide-in stagger-2",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Nombre del negocio *"}),e.jsx("input",{type:"text",value:t.businessName,onChange:s=>d({businessName:s.target.value}),className:"w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-400 focus:shadow-lg",placeholder:"Mi Negocio C.A."})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Correo electrónico *"}),e.jsx("input",{type:"email",value:t.email,onChange:s=>d({email:s.target.value}),className:"w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-400 focus:shadow-lg",placeholder:"correo@empresa.com"})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:["RIF ",e.jsx("span",{className:"text-gray-400",children:"(opcional)"})]}),e.jsx("input",{type:"text",value:t.rif,onChange:s=>d({rif:s.target.value.toUpperCase()}),className:"w-full px-5 py-4 bg-white border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-amber-400 focus:shadow-lg",placeholder:"J-12345678-9"})]})]}),e.jsxs("div",{className:"flex items-center justify-between mt-10 slide-in stagger-3",children:[e.jsxs("button",{onClick:l,className:"flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors",children:[e.jsx(N,{className:"w-4 h-4"}),"Atrás"]}),e.jsxs("button",{onClick:m,disabled:!f(),className:`flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${f()?"text-white hover:scale-105 hover:shadow-xl":"bg-gray-100 text-gray-400 cursor-not-allowed"}`,style:{backgroundColor:f()?r:void 0},children:["Continuar",e.jsx(R,{className:"w-4 h-4"})]})]})]})}),a===2&&e.jsx("div",{className:"min-h-[calc(100vh-96px)] flex items-center justify-center px-6 py-12",children:e.jsxs("div",{className:"w-full max-w-lg",children:[e.jsxs("div",{className:"text-center mb-10",children:[e.jsx("div",{className:"w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 card-enter",style:{backgroundColor:`${r}20`},children:e.jsx(J,{className:"w-8 h-8",style:{color:r}})}),e.jsx("h2",{className:"text-3xl font-bold mb-2 slide-in",style:{color:n},children:"¿Cuántas personas trabajan contigo?"}),e.jsx("p",{className:"text-gray-500 slide-in stagger-1",children:"Esto nos ayuda a recomendarte el plan ideal"})]}),e.jsx("div",{className:"grid grid-cols-2 gap-4 slide-in stagger-2",children:[{value:"solo",label:"Solo yo",emoji:"🧑"},{value:"small",label:"2-5 personas",emoji:"👥"},{value:"medium",label:"6-20 personas",emoji:"👨‍👩‍👧‍👦"},{value:"large",label:"Más de 20",emoji:"🏢"}].map((s,i)=>e.jsxs("button",{onClick:()=>{d({employeeCount:s.value}),setTimeout(m,400)},className:`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl ${t.employeeCount===s.value?"bg-amber-50 shadow-lg":"bg-white border-gray-100 hover:border-amber-200"}`,style:{borderColor:t.employeeCount===s.value?r:void 0,animationDelay:`${i*.1}s`},children:[e.jsx("span",{className:"text-3xl mb-3 block",children:s.emoji}),e.jsx("span",{className:"font-semibold text-gray-900",children:s.label}),t.employeeCount===s.value&&e.jsx("div",{className:"absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center",style:{backgroundColor:r},children:e.jsx(b,{className:"w-4 h-4 text-white"})})]},s.value))}),e.jsx("div",{className:"flex items-center justify-start mt-10 slide-in stagger-3",children:e.jsxs("button",{onClick:l,className:"flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors",children:[e.jsx(N,{className:"w-4 h-4"}),"Atrás"]})})]})}),a===3&&e.jsx("div",{className:"min-h-[calc(100vh-96px)] flex items-center justify-center px-6 py-12",children:e.jsxs("div",{className:"w-full max-w-lg",children:[e.jsxs("div",{className:"text-center mb-10",children:[e.jsx("div",{className:"w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 card-enter",style:{backgroundColor:`${r}20`},children:e.jsx(L,{className:"w-8 h-8",style:{color:r}})}),e.jsx("h2",{className:"text-3xl font-bold mb-2 slide-in",style:{color:n},children:"¿Cuánto vendes al mes?"}),e.jsx("p",{className:"text-gray-500 slide-in stagger-1",children:"Aproximadamente, no te preocupes si no es exacto"})]}),e.jsx("div",{className:"grid grid-cols-2 gap-4 slide-in stagger-2",children:[{value:"low",label:"Menos de $5,000",emoji:"💵"},{value:"medium",label:"$5,000 - $20,000",emoji:"💰"},{value:"high",label:"$20,000 - $100,000",emoji:"💎"},{value:"enterprise",label:"Más de $100,000",emoji:"🚀"}].map((s,i)=>e.jsxs("button",{onClick:()=>{d({monthlyVolume:s.value}),setTimeout(m,400)},className:`group relative p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:scale-105 hover:shadow-xl ${t.monthlyVolume===s.value?"bg-amber-50 shadow-lg":"bg-white border-gray-100 hover:border-amber-200"}`,style:{borderColor:t.monthlyVolume===s.value?r:void 0,animationDelay:`${i*.1}s`},children:[e.jsx("span",{className:"text-3xl mb-3 block",children:s.emoji}),e.jsx("span",{className:"font-semibold text-gray-900 text-sm",children:s.label}),t.monthlyVolume===s.value&&e.jsx("div",{className:"absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center",style:{backgroundColor:r},children:e.jsx(b,{className:"w-4 h-4 text-white"})})]},s.value))}),e.jsx("div",{className:"flex items-center justify-start mt-10 slide-in stagger-3",children:e.jsxs("button",{onClick:l,className:"flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors",children:[e.jsx(N,{className:"w-4 h-4"}),"Atrás"]})})]})}),a===4&&e.jsx("div",{className:"min-h-[calc(100vh-96px)] flex items-center justify-center px-6 py-12",children:e.jsxs("div",{className:"w-full max-w-4xl",children:[e.jsxs("div",{className:"text-center mb-12",children:[e.jsx("div",{className:"w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 card-enter",style:{backgroundColor:`${r}20`},children:e.jsx("span",{className:"text-3xl",children:"🎯"})}),e.jsx("h2",{className:"text-3xl font-bold mb-2 slide-in",style:{color:n},children:"Elige tu solución"}),e.jsx("p",{className:"text-gray-500 slide-in stagger-1",children:"¿Qué necesitas para tu negocio?"})]}),e.jsx("div",{className:"grid md:grid-cols-3 gap-6 slide-in stagger-2",children:[{id:"agora",icon:F,name:"Midaz Ágora",description:"Dispositivo N82 todo-en-uno con impresora fiscal",tag:"Más popular",tagColor:"bg-green-100 text-green-700",ideal:"Tiendas y comercios"},{id:"web",icon:U,name:"Midaz Web",description:"Software para PC con tu impresora fiscal existente",tag:"Disponible",tagColor:"bg-blue-100 text-blue-700",ideal:"Oficinas y servicios"},{id:"gestion",icon:q,name:"Gestión",description:"Control de inventario sin facturación fiscal",tag:"Gratis",tagColor:"bg-amber-100 text-amber-700",ideal:"Emprendedores"}].map((s,i)=>{const k=s.icon;return e.jsxs("button",{onClick:()=>{d({solution:s.id,plan:null}),setTimeout(m,400)},className:`group relative p-8 rounded-3xl border-2 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl ${t.solution===s.id?"bg-amber-50 shadow-xl":"bg-white border-gray-100 hover:border-amber-200"}`,style:{borderColor:t.solution===s.id?r:void 0,animationDelay:`${i*.15}s`},children:[e.jsx("div",{className:"absolute top-4 right-4",children:e.jsx("span",{className:`px-3 py-1 rounded-full text-xs font-semibold ${s.tagColor}`,children:s.tag})}),e.jsx("div",{className:"w-14 h-14 rounded-2xl flex items-center justify-center mb-6",style:{backgroundColor:n},children:e.jsx(k,{className:"w-7 h-7 text-white"})}),e.jsx("h3",{className:"text-xl font-bold mb-2",style:{color:n},children:s.name}),e.jsx("p",{className:"text-gray-500 text-sm mb-4",children:s.description}),e.jsxs("p",{className:"text-xs text-gray-400",children:["Ideal para: ",s.ideal]}),t.solution===s.id&&e.jsx("div",{className:"absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center",style:{backgroundColor:r},children:e.jsx(b,{className:"w-5 h-5 text-white"})})]},s.id)})}),e.jsx("div",{className:"flex items-center justify-start mt-10 slide-in stagger-3",children:e.jsxs("button",{onClick:l,className:"flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors",children:[e.jsx(N,{className:"w-4 h-4"}),"Atrás"]})})]})}),a===5&&t.solution&&e.jsx("div",{className:"min-h-[calc(100vh-96px)] flex items-center justify-center px-6 py-12",children:e.jsxs("div",{className:"w-full max-w-3xl",children:[e.jsxs("div",{className:"text-center mb-12",children:[e.jsx("div",{className:"w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 card-enter",style:{backgroundColor:`${r}20`},children:e.jsx("span",{className:"text-3xl",children:"💎"})}),e.jsx("h2",{className:"text-3xl font-bold mb-2 slide-in",style:{color:n},children:"Selecciona tu plan"}),e.jsx("p",{className:"text-gray-500 slide-in stagger-1",children:"Puedes cambiar de plan en cualquier momento"})]}),e.jsx("div",{className:"grid md:grid-cols-2 gap-6 slide-in stagger-2",children:V[t.solution].map((s,i)=>e.jsxs("button",{onClick:()=>{d({plan:s.id}),setTimeout(m,400)},className:`group relative p-8 rounded-3xl border-2 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl ${t.plan===s.id?"bg-amber-50 shadow-xl":"bg-white border-gray-100 hover:border-amber-200"}`,style:{borderColor:t.plan===s.id?r:void 0,animationDelay:`${i*.15}s`},children:[s.recommended&&e.jsx("div",{className:"absolute -top-3 left-6 px-4 py-1 rounded-full text-white text-xs font-semibold",style:{backgroundColor:r},children:"Recomendado"}),e.jsxs("div",{className:"flex justify-between items-start mb-6",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-2xl font-bold",style:{color:n},children:s.name}),e.jsx("p",{className:"text-gray-500 text-sm",children:s.description})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("div",{className:"text-3xl font-bold",style:{color:n},children:s.price}),e.jsx("div",{className:"text-gray-400 text-sm",children:s.period})]})]}),e.jsx("ul",{className:"space-y-3",children:s.features.map((k,A)=>e.jsxs("li",{className:"flex items-center gap-3 text-sm text-gray-600",children:[e.jsx(b,{className:"w-4 h-4 flex-shrink-0",style:{color:r}}),k]},A))}),t.plan===s.id&&e.jsx("div",{className:"absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center",style:{backgroundColor:r},children:e.jsx(b,{className:"w-5 h-5 text-white"})})]},s.id))}),e.jsx("div",{className:"flex items-center justify-start mt-10 slide-in stagger-3",children:e.jsxs("button",{onClick:l,className:"flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors",children:[e.jsx(N,{className:"w-4 h-4"}),"Atrás"]})})]})}),a===6&&e.jsx("div",{className:"min-h-[calc(100vh-96px)] flex items-center justify-center px-6 py-12",children:e.jsxs("div",{className:"max-w-lg text-center",children:[e.jsx("div",{className:"mb-8 card-enter",children:e.jsxs("div",{className:"w-24 h-24 mx-auto rounded-full flex items-center justify-center shadow-2xl relative",style:{backgroundColor:r},children:[e.jsx(b,{className:"w-12 h-12 text-white"}),e.jsx("div",{className:"absolute inset-0 rounded-full",style:{backgroundColor:r,animation:"pulse-ring 2s ease-in-out infinite",opacity:.3}})]})}),e.jsx("h1",{className:"text-4xl font-bold mb-4 slide-in",style:{color:n},children:"¡Todo listo! 🎉"}),e.jsx("p",{className:"text-xl text-gray-500 mb-8 slide-in stagger-1",children:"Tu cuenta ha sido creada exitosamente"}),e.jsxs("div",{className:"bg-gray-50 rounded-3xl p-6 mb-8 text-left slide-in stagger-2",children:[e.jsx("h3",{className:"text-sm font-medium text-gray-400 mb-4",children:"Resumen"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Negocio"}),e.jsx("span",{className:"font-semibold",style:{color:n},children:t.businessName})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Solución"}),e.jsx("span",{className:"font-semibold",style:{color:n},children:t.solution==="agora"?"Midaz Ágora":t.solution==="web"?"Midaz Web":"Gestión"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-gray-600",children:"Plan"}),e.jsx("span",{className:"font-semibold capitalize",style:{color:n},children:t.plan})]})]})]}),e.jsx("div",{className:"rounded-2xl p-6 mb-8 text-left slide-in stagger-3",style:{backgroundColor:`${r}15`},children:e.jsxs("p",{style:{color:n},children:[e.jsx("strong",{children:"📧 Revisa tu correo:"})," Te hemos enviado los pasos para comenzar."]})}),e.jsxs("button",{onClick:w,className:"group inline-flex items-center gap-3 px-10 py-5 text-white rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl slide-in stagger-4",style:{backgroundColor:r},children:["Ir al inicio",e.jsx(P,{className:"w-5 h-5 group-hover:translate-x-1 transition-transform"})]})]})})]})]})]})}export{Y as default};
