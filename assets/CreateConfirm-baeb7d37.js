import{a as r,c as d,b as s,t as b,x as k,g as h,d as i,w as f,y as C,s as g,r as I,F as u,k as m}from"./index-207df017.js";const L={class:"InfoData"},w={class:"titleGroup"},x={class:"infoContent"},v={__name:"InfoData",props:{info:{type:Object,required:!0}},setup(c){return(o,l)=>(r(),d("div",L,[s("div",w,[l[0]||(l[0]=s("span",{class:"icon-feather"},null,-1)),s("h4",null,b(c.info.title),1)]),s("p",x,b(c.info.content),1)]))}},M={class:"mainContent PublishSuccess"},S={class:"btnGroup"},V={__name:"PublishSuccess",props:{isVisible:{type:Boolean,required:!0}},emits:["close"],setup(c,{emit:o}){const l=o,a=()=>{l("close")};return(y,t)=>{const p=k("router-link");return c.isVisible?(r(),d("div",{key:0,class:"modal-overlay",onClick:a},[s("div",{class:"modal-content",onClick:t[0]||(t[0]=C(()=>{},["stop"]))},[t[4]||(t[4]=s("div",{class:"bgc"},null,-1)),s("button",{class:"btm-close",onClick:a},"關閉彈窗"),s("div",M,[t[3]||(t[3]=h('<div class="titleGroup"><p class="top"><span class="large">L</span><span class="middle">AUNCHED</span></p><p class="mid"><span class="line"></span><span class="little">Is</span><span class="line"></span></p><p class="btm"><span class="large">A</span><span class="middle">LREADY</span></p></div>',1)),s("div",S,[i(p,{class:"backToCreate",to:"/CreateProject",onClick:a},{default:f(()=>t[1]||(t[1]=[s("div",{class:"btnKey-L light"},[s("p",null,"Back To Creating"),s("div",{class:"icon-L"},[s("div",{class:"white-cross"},[s("div",{class:"cols"},[s("span"),s("span")]),s("div",{class:"rows"},[s("span")])])])],-1)])),_:1}),i(p,{class:"listOfShelves",to:"/MemberCenter/MyProjects",onClick:a},{default:f(()=>t[2]||(t[2]=[s("div",{class:"btnKey-L light-border"},[s("p",null,"List Of Works On The Shelves"),s("div",{class:"icon-L"},[s("div",{class:"light-cross"},[s("div",{class:"cols"},[s("span"),s("span")]),s("div",{class:"rows"},[s("span")])])])],-1)])),_:1})])])])])):g("",!0)}}},A={class:"InfoConfirm"},G={class:"InfoGroup"},D={class:"Group ContentIntroduction"},P={class:"infoDataGroup"},$={class:"Group AboutTheAuthor"},B={class:"Group Information"},N={class:"StepFunction"},T={class:"back"},E={class:"next"},j={__name:"CreateConfirm",setup(c){const o=I(!1),l=()=>{o.value=!0},a=()=>{o.value=!1},y=[{id:1,title:"Title",content:"the printing and typesetting industry."},{id:2,title:"Subtitle",content:"the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type"},{id:3,title:"Summary",content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "}],t=[{id:4,title:"Author ",content:"Lorem Ipsum is simply"},{id:5,title:"Illustrator",content:"Lorem Ipsum is simply"},{id:6,title:"Author bio",content:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. "}],p=[{id:7,title:"Publication Date",content:"2025 / 01 /23"},{id:8,title:"Language",content:"English (UK)"},{id:9,title:"Suitable reading age",content:"4-7"}];return(K,n)=>{const _=k("router-link");return r(),d("div",A,[s("div",G,[s("div",D,[n[0]||(n[0]=s("h3",null,"Content introduction",-1)),s("div",P,[(r(),d(u,null,m(y,e=>i(v,{key:e,info:e},null,8,["info"])),64))])]),s("div",$,[n[1]||(n[1]=s("h3",null,"About the author",-1)),(r(),d(u,null,m(t,e=>i(v,{key:e,info:e},null,8,["info"])),64))]),s("div",B,[n[2]||(n[2]=s("h3",null,"Information",-1)),(r(),d(u,null,m(p,e=>i(v,{key:e,info:e},null,8,["info"])),64))])]),s("div",N,[s("div",T,[i(_,{to:"/Create/CreateInfo/CreateInforMation",class:"btnLink dark"},{default:f(()=>n[3]||(n[3]=[s("div",{class:"icon-M"},[s("div",{class:"dark-cross"},[s("div",{class:"cols"},[s("span"),s("span")]),s("div",{class:"rows"},[s("span")])])],-1),s("p",null,"Back",-1)])),_:1})]),s("div",E,[s("div",{class:"PublishSuccess",onClick:l},n[4]||(n[4]=[h('<div class="btnKey-M dark"><p>Publish</p><div class="icon-M"><div class="white-cross"><div class="cols"><span></span><span></span></div><div class="rows"><span></span></div></div></div></div>',1)])),i(V,{isVisible:o.value,onClose:a},null,8,["isVisible"])])])])}}};export{j as default};
