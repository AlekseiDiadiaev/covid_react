"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[916],{6916:function(e,t,n){n.r(t);var a=n(4942),s=n(885),l=n(2791),i=n(3623),o=n(5967),r=(n(1874),n(1528)),u=n(2677),d=n(4849),c=n(5630),p=n(184);t.default=function(e){var t,n,f=e.dateTo,x=e.dateFrom,m=e.getDataByDays,h=e.countriesList,y=e.wasCharOpen,g=(0,l.useState)(null),v=(0,s.Z)(g,2),b=v[0],Z=v[1],j=(0,l.useState)("all"),w=(0,s.Z)(j,2),z=w[0],C=w[1],S=(0,l.useState)(!1),k=(0,s.Z)(S,2),D=k[0],E=k[1],L=(0,l.useState)(null),N=(0,s.Z)(L,2),F=N[0],T=N[1],B=(0,l.useState)(null),_=(0,s.Z)(B,2),O=_[0],W=_[1];(0,l.useEffect)((function(){var e=function(){E(window.innerWidth<992)};return e(),window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),(0,l.useEffect)((function(){setTimeout((function(){m(z).then((function(e){Z(e)}))}),150)}),[z]),(0,l.useEffect)((function(){y&&(x===F&&f===O||(W(f),T(x),f&&x&&setTimeout((function(){m(z).then((function(e){Z(e)}))}),150)))}),[f,x,y]),h&&(n=h.map((function(e,t){return(0,p.jsx)("option",{value:e,children:e},t)}))),o.kL.register(o.uw,o.f$,o.od,o.jn,o.Dx,o.u,o.De,o.FB);var $={datasets:[{label:"\u0417\u0430\u0431\u043e\u043b\u0435\u0432\u0430\u043d\u0438\u044f",data:b?b.map((function(e){return{x:e.date,y:e.cases}})):[],borderColor:"#ffc107",backgroundColor:"#ffc107",pointStyle:!1,tension:.1},{label:"\u0421\u043c\u0435\u0440\u0442\u0438",data:b?b.map((function(e){return{x:e.date,y:e.deaths}})):[],borderColor:"#dc3545",backgroundColor:"#dc3545",pointStyle:!1,tension:.1}]},q={responsive:!0,plugins:{legend:{position:"top",display:!0,labels:{font:{size:20}}},title:{display:!0,text:"\u0413\u0440\u0430\u0444\u0438\u043a \u0437\u0430\u0431\u043e\u043b\u0435\u0432\u0430\u0435\u043c\u043e\u0441\u0442\u0438 \u0438 \u0441\u043c\u0435\u0440\u0442\u043d\u043e\u0441\u0442\u0438",font:{size:24}}},scales:{x:{adapters:{date:{locale:r.Z}},type:"time"},y:{title:{display:!0,text:"\u041a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0441\u043b\u0443\u0447\u0430\u0435\u0432"}}}},A={responsive:!1,plugins:{legend:(t={position:"left",align:"start"},(0,a.Z)(t,"position","top"),(0,a.Z)(t,"display",!0),(0,a.Z)(t,"labels",{font:{size:14}}),t),title:{align:"start",display:!0,text:"\u0413\u0440\u0430\u0444\u0438\u043a \u0437\u0430\u0431\u043e\u043b\u0435\u0432\u0430\u0435\u043c\u043e\u0441\u0442\u0438 \u0438 \u0441\u043c\u0435\u0440\u0442\u043d\u043e\u0441\u0442\u0438",font:{size:16}},zoom:{zoom:{enabled:!0,mode:"x"},pan:{enabled:!0,mode:"x"}}},scales:{x:{adapters:{date:{locale:r.Z}},type:"time"},y:{title:{display:!0}}}},G=D&&b?(0,p.jsx)(i.x1,{width:800,height:400,data:$,options:A}):null,H=!G&&b?(0,p.jsx)(i.x1,{data:$,options:q}):null,I=H||G?null:(0,p.jsx)(u.Z,{className:"d-flex justify-content-center",children:(0,p.jsx)(d.Z,{animation:"border",role:"status",className:"m-2",children:(0,p.jsx)("span",{className:"visually-hidden",children:"Loading..."})})});return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(c.Z.Select,{"aria-label":"Default select example",value:z,onChange:function(e){return C(e.target.value)},children:[(0,p.jsx)("option",{value:"all",children:"\u0412\u0441\u0435 \u0441\u0442\u0440\u0430\u043d\u044b"}),";",n]}),(0,p.jsxs)(u.Z,{className:"overflow-auto",children:[G,H,I]})]})}}}]);
//# sourceMappingURL=916.f1b78b30.chunk.js.map