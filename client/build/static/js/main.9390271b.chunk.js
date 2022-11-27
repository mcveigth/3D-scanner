(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{213:function(e,t,n){},215:function(e,t,n){},389:function(e,t,n){"use strict";n.r(t);var r,a=n(0),c=n(24),s=n.n(c),i=(n(213),n(214),n(215),n(105)),o=n(29),l=n(22),u=n.n(l),d=n(30),p=n(45),j=n(393),h=n(205),b=n(394),f=n(391),x=n(398),O=n(87),m=n(57),g=n(98),v=n.n(g),w=n(118),y=n(64),k=n.n(y),S=function(){var e=Object(d.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.next=2;break;case 2:return e.next=4,k.a.post("/api/clients",t);case 4:return n=e.sent,e.abrupt("return",n.data.client_id);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),C=function(){var e=Object(d.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.next=2;break;case 2:return e.next=4,k.a.get("/api/clients/".concat(t));case 4:return n=e.sent,e.abrupt("return",n.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),T=function(){var e=Object(d.a)(u.a.mark((function e(t,n){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k.a.post("/api/clients/".concat(t,"/session"),n);case 3:return r=e.sent,e.abrupt("return",r.data);case 7:return e.prev=7,e.t0=e.catch(0),h.b.error("Something went wrong, check connection with the machine"),e.abrupt("return",e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t,n){return e.apply(this,arguments)}}(),N=function(){var e=Object(d.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.get("/api/clients/".concat(t,"/session"));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),I=function(){var e=Object(d.a)(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.delete("/api/clients/".concat(t,"/session"));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),P=function(){var e=Object(d.a)(u.a.mark((function e(t,n){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I(t);case 2:return e.next=4,T(t,n);case 4:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),D=function(){var e=Object(d.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,k.a.get("/api/status");case 2:return t=e.sent,e.abrupt("return",t.data.status);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),F=n(7),_=function(){var e=Object(o.f)(),t=Object(a.useState)(null),n=Object(p.a)(t,2),r=n[0],c=n[1],s=j.a.useForm(),i=Object(p.a)(s,1)[0],l=function(){var t=Object(d.a)(u.a.mark((function t(n){var r;return u.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(n.phone.length<10)){t.next=4;break}return h.b.error("Check all fields!"),c("Phone number needs to be a length of at least 10"),t.abrupt("return");case 4:return t.next=6,S({name:n.name,email:n.email,phone:parseInt(n.phone.replace(/\D/g,"")),address:n.address});case 6:r=t.sent,e.push("/sessions/".concat(r));case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return Object(F.jsxs)(w.Content,{children:[Object(F.jsx)(b.a.Title,{className:"page-head",level:3,children:"Dashboard"}),Object(F.jsx)(f.a,{}),Object(F.jsxs)(j.a,{form:i,className:"dashboard-form",onFinish:l,labelCol:{span:8},wrapperCol:{span:16},children:[Object(F.jsx)(b.a.Paragraph,{style:{textAlign:"center"},children:"Enter the name, email and phone number of the subject"}),Object(F.jsx)(v.a,{label:"name",name:"name",children:Object(F.jsx)(x.a,{minLength:3})}),Object(F.jsx)(v.a,{label:"email",name:"email",children:Object(F.jsx)(x.a,{type:"email"})}),Object(F.jsx)(v.a,{label:"phone",name:"phone",children:Object(F.jsx)(x.a,{type:"tel",minLength:10})}),Object(F.jsx)(v.a,{label:"address",name:"address",children:Object(F.jsx)(x.a,{type:"address"})}),Object(F.jsxs)(O.a,{justify:"space-between",children:[Object(F.jsx)(m.a,{danger:!0,onClick:function(){i.resetFields()},children:"Reset"}),Object(F.jsx)(m.a,{htmlType:"submit",type:"primary",children:"Start Session"})]}),r&&Object(F.jsx)("p",{className:"error",children:r})]})]})},E=n(397),B=n(396),L=n(392),A=function(){return Object(F.jsx)(m.a,{type:"link",style:{position:"fixed",right:20,bottom:20},onClick:function(){window.scrollTo(0,0),console.log("")},children:"\u2934\ufe0f Scroll To Top"})},J=function(e){var t=e.clientId,n=Object(a.useState)(null),r=Object(p.a)(n,2),c=r[0],s=r[1],i=Object(a.useState)(null),o=Object(p.a)(i,2),l=o[0],j=o[1],h=Object(a.useState)(JSON.parse(window.localStorage.getItem("focusPhotos")||"[]")),f=Object(p.a)(h,2),x=f[0],m=f[1];Object(a.useEffect)((function(){var e=function(){var e=Object(d.a)(u.a.mark((function e(){var n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(c&&c.length>=89)){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,N(t);case 4:n=e.sent,(r=n.photos).length&&s(r);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),n=setInterval(e,250);return function(){return clearInterval(n)}}),[t,c]);var g=function(){return j(null)};if(!(null===c||void 0===c?void 0:c.length))return null;var v=c.sort((function(e,t){return e.split("_")[0].localeCompare(t.split("_")[0])})),w=c.length/89,y=v.filter((function(e){var t=e.split("_")[0];return x.includes(t)}));return Object(F.jsxs)(F.Fragment,{children:[Object(F.jsx)(E.a,{visible:!!l,onOk:g,footer:null,onCancel:g,width:"50%",children:Object(F.jsx)("img",{width:"100%",onClick:g,src:"".concat("","/output/").concat(t,"/").concat(l),alt:"large modal"})}),Object(F.jsxs)(O.a,{align:"middle",justify:"space-around",style:{display:"flex",width:"100%"},children:[Object(F.jsx)(b.a.Title,{style:{margin:"0.5rem 1rem 0.7rem"},level:3,children:"Session Pictures"}),Object(F.jsxs)(b.a.Text,{children:[c.length,"/ 89 loaded"]}),Object(F.jsx)(b.a.Text,{children:"Select Featured Photos:"}),Object(F.jsx)(B.a,{mode:"multiple",allowClear:!0,placeholder:"Please select featured",style:{width:"35%"},defaultValue:x,value:x,onChange:function(e){console.log("SEelcted",e),window.localStorage.setItem("focusPhotos",JSON.stringify(e)),m(e)},children:v.map((function(e){var t=e.split("_")[0];return Object(F.jsx)(B.a.Option,{value:t,children:t})}))})]}),Object(F.jsx)("div",{className:"loading-bar-container",children:Object(F.jsx)("div",{className:"loading-bar",style:{width:"".concat(100*w,"%"),background:"hsl(".concat(Math.floor(120*w),", 90%, 70%)")}})}),Object(F.jsx)("div",{className:"featured-photos",style:{marginTop:"2rem"},children:y.map((function(e){return Object(F.jsx)("img",{onClick:function(){return j(e)},src:"".concat("","/output/").concat(t,"/").concat(e),alt:"lol"})}))}),Object(F.jsx)("div",{className:"photo-wall",children:v.map((function(e){return Object(F.jsx)(L.a,{className:"photo",title:e.split("_")[0],children:Object(F.jsx)("img",{onClick:function(){return j(e)},src:"".concat("","/output/").concat(t,"/").concat(e),alt:"lol"})},e)}))}),Object(F.jsx)(A,{})]})},W=n(400);!function(e){e[e["Standing By..."]=0]="Standing By...",e[e["Warming Up..."]=1]="Warming Up...",e[e["Capturing Photo"]=2]="Capturing Photo",e[e["Capturing Grid"]=3]="Capturing Grid",e[e["Writing To Disk"]=4]="Writing To Disk",e[e["Downloading!"]=5]="Downloading!"}(r||(r={}));var G=["lime","gold","volcano","magenta","geekblue"],R=function(e){var t=e.poll,n=Object(a.useState)(r["Standing By..."]),c=Object(p.a)(n,2),s=c[0],i=c[1];return Object(a.useEffect)((function(){var e=function(){var e=Object(d.a)(u.a.mark((function e(){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,D();case 4:n=e.sent,i(n);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),n=setInterval(e,250);return function(){return clearInterval(n)}}),[t]),Object(F.jsx)(W.a,{color:G[s],style:{display:"flex"},children:Object(F.jsx)("span",{style:{margin:"auto"},children:r[s]})})},V=n(399),q=n(395),U=function(e){var t=Object(o.f)(),n=e.match.params.clientId,r=Object(a.useState)(null),c=Object(p.a)(r,2),s=c[0],i=c[1],l=Object(a.useState)(!1),j=Object(p.a)(l,2),f=j[0],g=j[1],v=Object(a.useState)(parseInt(window.localStorage.getItem("lightTime")||"5000")),y=Object(p.a)(v,2),k=y[0],S=y[1],N=function(e){window.localStorage.setItem("lightTime",e.toString()),S(e)},D=function(){var e=Object(d.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h.b.loading("Photo sequence starting! Stand by..."),e.next=3,T(n,{light_time:k});case 3:g(!0);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(){var e=Object(d.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return g(!1),h.b.loading("Deleting photos & restarting capture sequence! Stand by..."),e.next=4,P(n,{light_time:k});case 4:g(!0);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),E=function(){var e=Object(d.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.push("/");case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),B=function(){var e=Object(d.a)(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I(n);case 2:h.b.success("Photos Deleted! Going back to dashboard"),t.push("/");case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(a.useEffect)((function(){var e=function(){var e=Object(d.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,C(n);case 2:t=e.sent,i(t),t.has_photos&&g(!0);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[n]),Object(F.jsxs)(w.Content,{children:[Object(F.jsx)(b.a.Title,{className:"page-head",level:3,children:"Session View"}),Object(F.jsxs)(O.a,{className:"client-info",children:[Object(F.jsxs)(b.a.Text,{children:[Object(F.jsx)("strong",{children:"Name:"})," ",null===s||void 0===s?void 0:s.name]}),Object(F.jsxs)(b.a.Text,{children:[Object(F.jsx)("strong",{children:"Email:"})," ",null===s||void 0===s?void 0:s.email]}),Object(F.jsxs)(b.a.Text,{children:[Object(F.jsx)("strong",{children:"Phone:"})," ",null===s||void 0===s?void 0:s.phone]}),Object(F.jsxs)(b.a.Text,{children:[Object(F.jsx)("strong",{children:"Address:"})," ",null===s||void 0===s?void 0:s.address]})]}),Object(F.jsxs)("div",{className:"toolbar",children:[Object(F.jsxs)(O.a,{justify:"center",className:"session-toolbar",children:[Object(F.jsx)(m.a,{onClick:E,children:"Back To Dashboard"},"finish"),Object(F.jsx)(m.a,{disabled:f,type:"primary",onClick:D,children:"Capture"},"startsession"),Object(F.jsx)(V.a,{disabled:!f,title:"Re-capture set?",onConfirm:_,children:Object(F.jsx)(m.a,{type:"default",disabled:!f,children:"Retry Capture"})},"retry"),Object(F.jsx)(V.a,{disabled:!f,title:"Delete all photos and return to dashboard?",onConfirm:B,children:Object(F.jsx)(m.a,{danger:!0,disabled:!f,children:"Abort Session"})},"nuke"),Object(F.jsx)(R,{poll:!0})]}),Object(F.jsxs)(O.a,{className:"session-toolbar",children:[Object(F.jsx)("h3",{children:"Light Duration (ms)"}),Object(F.jsx)(q.a,{value:k,onChange:N}),Object(F.jsx)(x.a,{className:"slider",type:"range",onChange:function(e){return N(parseInt(e.target.value))},value:k,min:500,max:1e4,step:500})]})]}),Object(F.jsx)(O.a,{className:"controls",children:f&&Object(F.jsx)(J,{clientId:n})})]})};console.log("ENV","production");var M=function(){return Object(F.jsx)(i.a,{children:Object(F.jsx)("div",{className:"App",children:Object(F.jsxs)(o.c,{children:[Object(F.jsx)(o.a,{path:"/sessions/:clientId",component:U}),Object(F.jsx)(o.a,{exact:!0,path:"/",component:_})]})})})},z=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,401)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))};s.a.render(Object(F.jsx)(M,{}),document.getElementById("root")),z()}},[[389,1,2]]]);
//# sourceMappingURL=main.9390271b.chunk.js.map