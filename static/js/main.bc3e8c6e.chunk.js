(this["webpackJsonpoptical-spectrum-analyzer"]=this["webpackJsonpoptical-spectrum-analyzer"]||[]).push([[0],{172:function(e,t,a){},173:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(52),r=a.n(o),s=(a(60),a(61),a(3)),u=a(8),i=a.n(u),l=a(53),m=(a(172),function(){var e=Object(n.useState)(!1),t=Object(s.a)(e,2),a=t[0],o=t[1],r=Object(n.useState)(""),u=Object(s.a)(r,2),m=u[0],p=u[1],h=Object(n.useState)(""),d=Object(s.a)(h,2),b=d[0],f=d[1],g=Object(n.useState)(""),k=Object(s.a)(g,2),S=(k[0],k[1]),O=Object(n.useState)(""),j=Object(s.a)(O,2),y=j[0],E=j[1],N=Object(n.useState)(""),v=Object(s.a)(N,2),w=v[0],x=v[1],C=Object(n.useState)(""),T=Object(s.a)(C,2),A=T[0],I=T[1],R=Object(n.useState)([]),z=Object(s.a)(R,2),J=z[0],B=z[1],G=Object(n.useState)([]),L=Object(s.a)(G,2),M=L[0],P=L[1];Object(n.useEffect)((function(){i.a.get("https://cors-anywhere.herokuapp.com/http://flaskosa.herokuapp.com/cmd/PING").then((function(e){200===e.status&&o(!0)})).catch((function(e){console.log("error",e)}))}),[]);var W=function(e){p(e.target.id),i.a.get("https://cors-anywhere.herokuapp.com/http://flaskosa.herokuapp.com/cmd/"+m).then((function(e){200===e.status&&(f(JSON.stringify(e.data).substring(0,200)),"START"===m&&q())})).catch((function(e){console.log("error",e),f(e.message)}))},q=function(){i.a.get("https://cors-anywhere.herokuapp.com/http://flaskosa.herokuapp.com/cmd/LIM").then((function(e){200===e.status&&(x(e.data.substring(8,12)),I(e.data.substring(13,18)))})).catch((function(e){console.log("error",e)})),i.a.get("https://cors-anywhere.herokuapp.com/http://flaskosa.herokuapp.com/cmd/TRACE").then((function(e){if(200===e.status){var t=e.data.xdata.filter((function(e,t){return t>Number(w)&&t<Number(A)}));S(e.data.xlabel),E(e.data.ylabel),B(t),P(e.data.ydata)}})).catch((function(e){console.log("error",e)}))},D={labels:[J],datasets:[{label:y,data:M,fill:!0,backgroundColor:"rgba(75,192,192,0.2)",borderColor:"rgba(75,192,192,1)"}]};return c.a.createElement("div",{className:"command"},a?c.a.createElement("div",null,c.a.createElement("input",{className:"command--input",type:"text",value:m,onChange:function(e){return p(e.target.value.toUpperCase())},placeholder:"eg - IDN"}),c.a.createElement("button",{onClick:function(){i.a.get("https://cors-anywhere.herokuapp.com/http://flaskosa.herokuapp.com/cmd/"+m).then((function(e){200===e.status&&(f(JSON.stringify(e.data).substring(0,200)),"START"===m&&q())})).catch((function(e){console.log("error",e),f(e.message)}))},className:"commmand-query"},"Query"),c.a.createElement("div",{className:"command--actions"},c.a.createElement("button",{onClick:W,id:"START",className:"command--action"},"Start"),c.a.createElement("button",{onClick:W,id:"STOP",className:"command--action"},"Stop"),c.a.createElement("button",{onClick:W,id:"SINGLE",className:"command--action"},"Single Trace")),c.a.createElement("h1",null,"Instrument Response"),c.a.createElement("div",{className:"command--response"},b),c.a.createElement(l.a,{width:900,height:550,data:D,options:{scales:{xAxes:[{ticks:{display:!1,min:Number(w),max:Number(A),stepSize:1e-4}}],yAxes:[{ticks:{max:M[0],stepSize:1e-4}}]}}})):"Server not responding...")}),p=function(){return c.a.createElement(m,null)};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},55:function(e,t,a){e.exports=a(173)},60:function(e,t,a){},61:function(e,t,a){}},[[55,1,2]]]);
//# sourceMappingURL=main.bc3e8c6e.chunk.js.map