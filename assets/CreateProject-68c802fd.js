import{F as u}from"./FileItem-1d194490.js";import{x as B,a,c as d,b as e,d as g,w as M,y,s as b,r as n,g as E,n as A,F as v,k as f,f as k,z as w}from"./index-207df017.js";const Q="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADYSURBVHgB7ZPBDYIwFIbfe5E7iQygG3BwgGoYwBFcwQl0BSfQEbgbEwbQhBG4q0nvwEOKEgziwVIvpP+p7f/1pS+vP8JLni8EEAlgkBlwKOMogZb6MPg0gw1SsX3jJTDNr/Exbgr0Y3DsL1ZEuIdPyZTzafkiaYIhxGIJ3XIdcCZV2wYYQiD5BYBilLpVEQMMMUHYZZbDS27nKFJrEwzdLycF7Fq+zBHW9cYEg/WJNwvKL8lCmRnzQQ24dckY81c1HdnA/sjYwGozNrDasoHVZmxgtZnhBfYB/9rWsOKW3JsAAAAASUVORK5CYII=",x="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAUCAYAAACeXl35AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAACySURBVHgB7dVRDcIwEAbg/79u70s2AZPQBAMNGJgDLOCAogAcgARwgIRJQEKfWdajw0ObLNn30PbtTy+5O7b2MAhxB9EgM43qJYUNJcIWFHpR8oNSyJHL3e5SWVWz/3KK8YnN6rGxrjciZ5QQ+apq0qfcI0oQDLKcpaQeDJXR2k/8BmH+PoyzeWCzev/h3VnnCOmRUQTDjHlkZ/entKeuKEHxFlAdSiGcQM0tPQMKIPTyA8giKtPSCEnQAAAAAElFTkSuQmCC",z={class:"mainContent CreateNewProject"},J={__name:"CreateNewProject",props:{isVisible:{type:Boolean,required:!0}},emits:["close"],setup(m,{emit:l}){const r=l,o=()=>{r("close")};return(c,s)=>{const p=B("router-link");return m.isVisible?(a(),d("div",{key:0,class:"modal-overlay",onClick:o},[e("div",{class:"modal-content",onClick:s[0]||(s[0]=y(()=>{},["stop"]))},[s[4]||(s[4]=e("div",{class:"bgc"},null,-1)),e("button",{class:"btm-close",onClick:o},"關閉彈窗"),e("div",z,[s[2]||(s[2]=e("div",{class:"project"},null,-1)),s[3]||(s[3]=e("input",{type:"text",placeholder:"Enter project name"},null,-1)),g(p,{to:"/Create"},{default:M(()=>s[1]||(s[1]=[e("div",{class:"btnKey-M dark"},[e("p",null,"CREATE"),e("div",{class:"icon-L"},[e("div",{class:"white-cross"},[e("div",{class:"cols"},[e("span"),e("span")]),e("div",{class:"rows"},[e("span")])])])],-1)])),_:1})])])])):b("",!0)}}};const V={class:"CreateProject"},N={class:"recent-file"},Y={class:"modeFunction"},R={class:"view-mode-buttons"},S={class:"file-manager"},j={__name:"CreateProject",setup(m){const l=n(!1),r=()=>{l.value=!0},o=()=>{l.value=!1},c=n("grid"),s=n("list"),p=n([{id:1,name:"報告.pdf",size:120,type:"application/pdf",time:"Jan 11, 2025 7:08 AM",url:""},{id:2,name:"圖片.pdf",size:420,type:"application/pdf",time:"Jan 11, 2025 7:08 AM",url:""},{id:3,name:"文件.docx",size:80,type:"application/docx",time:"Jan 11, 2025 7:08 AM",url:""},{id:4,name:"音樂.mp3",size:3200,type:"audio/mp3",time:"Jan 11, 2025 7:08 AM",url:""}]),C=n([{id:1,name:"報告.pdf",size:120,type:"application/pdf",time:"Jan 11, 2025 7:08 AM",url:""},{id:2,name:"圖片.pdf",size:420,type:"application/pdf",time:"Jan 11, 2025 7:08 AM",url:""},{id:3,name:"文件.docx",size:80,type:"application/docx",time:"Jan 11, 2025 7:08 AM",url:""},{id:4,name:"音樂.mp3",size:3200,type:"audio/mp3",time:"Jan 11, 2025 7:08 AM",url:""},{id:5,name:"報告.pdf",size:120,type:"application/pdf",time:"Jan 11, 2025 7:08 AM",url:""},{id:6,name:"圖片.pdf",size:420,type:"application/pdf",time:"Jan 11, 2025 7:08 AM",url:""},{id:7,name:"文件.docx",size:80,type:"application/docx",time:"Jan 11, 2025 7:08 AM",url:""}]);return(I,i)=>(a(),d("div",V,[e("nav",{class:"topBar"},[i[3]||(i[3]=e("div",{class:"searchFunction"},[e("input",{class:"fileSearch",id:"search",name:"search",type:"text",placeholder:"Search"}),e("div",{class:"icon-M"},[e("div",{class:"dark-search"})])],-1)),e("button",{class:"CreateNewProject",onClick:r},i[2]||(i[2]=[E('<div class="btnKey-M dark"><p>New Project</p><div class="icon-L"><div class="white-cross"><div class="cols"><span></span><span></span></div><div class="rows"><span></span></div></div></div></div>',1)]))]),g(J,{isVisible:l.value,onClose:o},null,8,["isVisible"]),e("nav",N,[e("div",Y,[i[6]||(i[6]=e("h3",{class:"title"},"Recent",-1)),e("div",R,[e("button",{onClick:i[0]||(i[0]=t=>s.value="grid"),class:A({active:s.value==="grid"})},i[4]||(i[4]=[e("img",{src:Q,class:"button-icon"},null,-1)]),2),e("button",{onClick:i[1]||(i[1]=t=>s.value="list"),class:A({active:s.value==="list"})},i[5]||(i[5]=[e("img",{src:x,class:"button-icon"},null,-1)]),2)])]),e("div",{class:A(["Recent-file-list",c.value])},[(a(!0),d(v,null,f(p.value,t=>(a(),w(u,{key:t.id,file:t,mode:c.value},null,8,["file","mode"]))),128))],2)]),e("div",S,[i[7]||(i[7]=e("div",{class:"titleBar"},[e("h3",{class:"file-name"},"Project Name"),e("h3",{class:"file-time"},[k(" Last Access "),e("div",{class:"arrow"})])],-1)),e("div",{class:A(["file-list",s.value])},[(a(!0),d(v,null,f(C.value,t=>(a(),w(u,{key:t.id,file:t,mode:s.value},null,8,["file","mode"]))),128))],2)])]))}};export{j as default};
