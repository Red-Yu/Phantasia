import{x as c,a as p,c as u,b as s,g as A,d,w as B,y as M,s as m,D as I,r as g,n as a}from"./index-207df017.js";const R="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAIBSURBVHgB7ZlBTsJAFED/H9SFKxI10R3coPECAokJO+MJxBvgDTiCR4AjsCMaQS4gPYGyJKBJ2Rhj0xl/lSJUYGg7A42ZlxDC5087r/2d/LYABoPBYDCkmCPr3PI/oBkGGvkWQN4Bxju6ZRA0MZVAyE5CDnBWHNn3NmhAi8gCiQBtMspFVkgEaJFRKrKGRIByGWUiESQClMooEYkhEaBMJvHyu0yCjlA/nIviTyyramlOJLL0TCDYgrPLcL4QFBMQPvpKZGKLZK1CbpmE63nFDLhOeIxLMVd4xWUyx1Y5BzGJLeLYj336as4FJxL0n7Ni3EIZKrvmwG71ISaJSmvUe6jQhBo/M5FLBIRlSKIx9LeVgMQXO02o6susKxEwI5NYwkdbr3VM15DHMi+zMZd7+UlJKkdr97tJjEjaMCJpw4ikjX8jsiNLOLRKVUC8CH4LIRpvdrsOGjmwShVEvJoGUHRfn9q1VWOkIrRBatWh8BuALmgGGeSo5SjMhPqyMVKRuHxQO7UL4joUXrsXi4o2kUkDWYcNYVattBG5tFDg2eFpqQYa8fcR9QZDLoLCmbttoRUMAQugk5AEBxjLhshLi2fqsGV2+d6tLCcjS3gfPA/2T/JjOgtl2AIC8GbYu2vJ8tauRP9Rjcs+qwxF1KeJseACHUbVoOs1hMFgMBgMs3wBER7o986w/1MAAAAASUVORK5CYII=",V={class:"mainContent AddCover"},b={__name:"AddCover",props:{isVisible:{type:Boolean,required:!0}},emits:["close"],setup(r,{emit:n}){const e=n,l=()=>{e("close")};return(v,o)=>{const t=c("router-link");return r.isVisible?(p(),u("div",{key:0,class:"modal-overlay",onClick:l},[s("div",{class:"modal-content",onClick:o[0]||(o[0]=M(()=>{},["stop"]))},[o[3]||(o[3]=s("div",{class:"bgc"},null,-1)),s("button",{class:"btm-close",onClick:l},"關閉彈窗"),s("div",V,[o[2]||(o[2]=A('<div class="coverView"><div class="side"></div><div class="side"></div></div><div class="FrontCover"><div class="titleGroup"><p>Front Cover</p><h2>Upload Your Files</h2><div class="subtitle"><span>File should be</span><span class="spanBold">JPG , PNG , PDF</span></div></div><div class="inputFileGroup"><img src="'+R+'"><div class="subtitle"><span>Max. file size</span><span class="spanBold">5MB</span></div><div class="inputFile"><div class="btnKey-M light-border"><p>Select File</p><div class="icon-M"><div class="light-cross"><div class="cols"><span></span><span></span></div><div class="rows"><span></span></div></div></div></div></div></div></div><div class="backCover"><div class="titleGroup"><p>Back Cover</p><h2>Setting The colors</h2></div><div class="inputColorGroup"><input type="color"><img src="" alt=""></div></div>',3)),d(t,{class:"FinishBtn",to:"/Create/CreateInfo/CreateInforMation",onClick:l},{default:B(()=>o[1]||(o[1]=[s("div",{class:"btnKey-M light"},[s("p",null,"SAVE"),s("div",{class:"icon-L"},[s("div",{class:"white-cross"},[s("div",{class:"cols"},[s("span"),s("span")]),s("div",{class:"rows"},[s("span")])])])],-1)])),_:1})])])])):m("",!0)}}};const k={class:"createInfo"},F={class:"InfoInput"},G={class:"stepsGroup"},f={__name:"CreateInfo",setup(r){const n=I(),e=t=>n.name===t,l=g(!1),v=()=>{l.value=!0},o=()=>{l.value=!1};return(t,i)=>{const C=c("router-view");return p(),u("div",k,[s("div",{class:"bookCover"},[s("button",{class:"addCover",onClick:v},i[0]||(i[0]=[A('<div class="btnKey-M light"><p>FRONT COVER SETTING</p><div class="icon-M"><div class="white-cross"><div class="cols"><span></span><span></span></div><div class="rows"><span></span></div></div></div></div>',1)]))]),d(b,{isVisible:l.value,onClose:o},null,8,["isVisible"]),s("div",F,[s("div",G,[s("div",{class:a(["steps",{current:e("CreateCover")}])},i[1]||(i[1]=[s("div",{class:"icon"},[s("div",{class:"frontCover"})],-1),s("p",null,"FRONT COVER",-1)]),2),i[4]||(i[4]=s("span",null,null,-1)),s("div",{class:a(["steps",{current:e("CreateInforMation")}])},i[2]||(i[2]=[s("div",{class:"icon"},[s("div",{class:"information"})],-1),s("p",null,"INFORMATION",-1)]),2),i[5]||(i[5]=s("span",null,null,-1)),s("div",{class:a(["steps",{current:e("CreateConfirm")}])},i[3]||(i[3]=[s("div",{class:"icon"},[s("div",{class:"publish"})],-1),s("p",null,"PUBLISH",-1)]),2)]),d(C)])])}}};export{f as default};
