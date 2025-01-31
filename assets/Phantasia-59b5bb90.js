import{_ as M,r as e,u as S,c as q,w as F,o as G,a as J,b as K,d as Q,e as o,f as n,T as _,g as s,h as i,v as r}from"./index-d9421866.js";import{P as W}from"./parallax-b3db3f5f.js";const Z="/Phantasia/assets/bookRows_bgi_day-bc30210f.png",N="/Phantasia/assets/bookRows_bgi_night-33bc7754.png",ss="/Phantasia/assets/pillar_left_day-4ea845e6.png",as="/Phantasia/assets/pillar_left_night-e5dd40af.png",ts="/Phantasia/assets/pillar_right_day-f122e87a.png",es="/Phantasia/assets/pillar_right_night-a74d0311.png",os="/Phantasia/assets/platfrom_front_day-16bb1529.png",ls="/Phantasia/assets/platfrom_front_night-d3a44860.png",ns="/Phantasia/assets/lamp_day-6bb0b9c5.png",B="/Phantasia/assets/lamp_day_hover-5958b843.png",_s="/Phantasia/assets/lamp_night-f777c78a.png",T="/Phantasia/assets/lamp_night_hover-676d8638.png",C="/Phantasia/assets/boy_day_hover-31deab78.png",z="/Phantasia/assets/boy_night_hover-ee800725.png",is="/Phantasia/assets/boy_day-250111cb.png",rs="/Phantasia/assets/boy_night-f691071f.png",E="/Phantasia/assets/book_day_hover-62977bcf.png",I="/Phantasia/assets/book_night_hover-04a2fc5a.png",gs="/Phantasia/assets/book_day-ecb97f80.png",cs="/Phantasia/assets/book_night-fab51e7c.png",ps="/Phantasia/assets/day_magic1-1a123e39.png",ds="/Phantasia/assets/night_magic1-e73b4aeb.png",hs="/Phantasia/assets/day_magic2-c1c0a40c.png",vs="/Phantasia/assets/night_magic2-0e1b30d3.png",us="/Phantasia/assets/day_magic3-1b038ded.png",fs="/Phantasia/assets/night_magic3-338a9f4c.png",bs="/Phantasia/assets/bookRows_lightoff-073b124f.png",ms="/Phantasia/assets/piller_left_lightoff-a7cd9b60.png",ys="/Phantasia/assets/piller_right_lightoff-0453925e.png",As="/Phantasia/assets/platform_lightoff-c3a41bc6.png",Ps="/Phantasia/assets/myCabin_scroll-1d79f345.png",ws="/Phantasia/assets/about_scroll-72d7c0ea.png",Ds="/Phantasia/assets/day_transfer-6e27d855.webm",ks="/Phantasia/assets/night_transfer-33228c67.webm";const Rs={style:{"background-color":"rgba(255, 255, 255, 0)"},class:"wrapper"},xs=["src"],$s={class:"positionArea"},Ls={class:"parallax-wrapper","data-depth":"0.11"},Os=["src"],js={class:"parallax-wrapper","data-depth":"0.11"},Us=["src"],Vs={class:"parallax-wrapper","data-depth":"0.05"},Bs=["src"],Ts={class:"parallax-wrapper","data-depth":"0.05"},Cs=["disabled"],zs=["src"],Es=["src"],Is={class:"parallax-wrapper","data-depth":"0.05"},Hs=["src"],Xs=["src"],Ys={class:"parallax-wrapper","data-depth":"0.05"},Ms=["src"],Ss={class:"magic"},qs=["src"],Fs=["src"],Gs=["src"],Js=["src"],Ks={__name:"Phantasia",setup(Qs){const h=e(null),c=S(),g=e(!0),l=e(!0),p=e(!1),d=e(!1),v=e(!1),u=q(()=>g.value?"day":"night"),f=e(null),b=e(null),m=e(""),y=e(""),A=e(""),P=e(""),w=e(""),D=e(""),k=e(""),R=e(""),x=e(""),$=e(""),L=e(""),O=e(""),j=e(""),U=t=>{m.value=new URL(Object.assign({"../Assets/Day/bookRows_bgi_day.png":Z,"../Assets/Day/bookRows_bgi_night.png":N})[`../Assets/Day/bookRows_bgi_${t}.png`],self.location).href,y.value=new URL(Object.assign({"../Assets/Day/pillar_left_day.png":ss,"../Assets/Day/pillar_left_night.png":as})[`../Assets/Day/pillar_left_${t}.png`],self.location).href,A.value=new URL(Object.assign({"../Assets/Day/pillar_right_day.png":ts,"../Assets/Day/pillar_right_night.png":es})[`../Assets/Day/pillar_right_${t}.png`],self.location).href,P.value=new URL(Object.assign({"../Assets/Day/platfrom_front_day.png":os,"../Assets/Day/platfrom_front_night.png":ls})[`../Assets/Day/platfrom_front_${t}.png`],self.location).href,w.value=new URL(Object.assign({"../Assets/Day/lamp_day.png":ns,"../Assets/Day/lamp_day_hover.png":B,"../Assets/Day/lamp_night.png":_s,"../Assets/Day/lamp_night_hover.png":T})[`../Assets/Day/lamp_${t}.png`],self.location).href,D.value=new URL(Object.assign({"../Assets/Day/lamp_day_hover.png":B,"../Assets/Day/lamp_night_hover.png":T})[`../Assets/Day/lamp_${t}_hover.png`],self.location).href,k.value=new URL(Object.assign({"../Assets/Day/boy_day_hover.png":C,"../Assets/Day/boy_night_hover.png":z})[`../Assets/Day/boy_${t}_hover.png`],self.location).href,R.value=new URL(Object.assign({"../Assets/Day/boy_day.png":is,"../Assets/Day/boy_day_hover.png":C,"../Assets/Day/boy_night.png":rs,"../Assets/Day/boy_night_hover.png":z})[`../Assets/Day/boy_${t}.png`],self.location).href,x.value=new URL(Object.assign({"../Assets/Day/book_day_hover.png":E,"../Assets/Day/book_night_hover.png":I})[`../Assets/Day/book_${t}_hover.png`],self.location).href,$.value=new URL(Object.assign({"../Assets/Day/book_day.png":gs,"../Assets/Day/book_day_hover.png":E,"../Assets/Day/book_night.png":cs,"../Assets/Day/book_night_hover.png":I})[`../Assets/Day/book_${t}.png`],self.location).href,L.value=new URL(Object.assign({"../Assets/Day/day_magic1.png":ps,"../Assets/Day/night_magic1.png":ds})[`../Assets/Day/${t}_magic1.png`],self.location).href,O.value=new URL(Object.assign({"../Assets/Day/day_magic2.png":hs,"../Assets/Day/night_magic2.png":vs})[`../Assets/Day/${t}_magic2.png`],self.location).href,j.value=new URL(Object.assign({"../Assets/Day/day_magic3.png":us,"../Assets/Day/night_magic3.png":fs})[`../Assets/Day/${t}_magic3.png`],self.location).href};F(u,t=>{U(t)});const H=()=>{v.value=!0,l.value=!1;const t=c.currentRoute.value.path;setTimeout(()=>{g.value=!g.value,l.value=!0},1800),setTimeout(()=>{const a=t==="/day"?"/night":"/day";c.push(a)},2e3),g.value?(p.value=!0,d.value=!1,f.value.play()):(d.value=!0,p.value=!1,b.value.play())};G(()=>{if(h.value){const a=h.value;new W(a,{relativeInput:!0,hoverOnly:!0,originY:0,originX:.8,scalarX:5.5,scalarY:6.5})}const t=new Date().getHours();t>=18||t<6?g.value=!1:g.value=!0,U(u.value),c.push(`/${g.value?"day":"night"}`)});const X=()=>{c.push("/About")};return(t,a)=>{const Y=J("router-view");return K(),Q("div",Rs,[o(_,{name:"fade_slow",mode:"out-in"},{default:n(()=>[i(s("img",{src:m.value,alt:"",class:"bgBook"},null,8,xs),[[r,l.value]])]),_:1}),a[11]||(a[11]=s("img",{style:{"z-index":"300"},src:bs,alt:"",class:"bgBook"},null,-1)),s("div",$s,[s("div",{class:"main_container",ref_key:"parallaxContainer",ref:h},[a[6]||(a[6]=s("div",{class:"parallax-wrapper","data-depth":"0.11"},[s("img",{src:ms,alt:"",class:"pillar pillar_left"})],-1)),o(_,{name:"fade_slow",mode:"in-out"},{default:n(()=>[i(s("div",Ls,[s("img",{src:y.value,alt:"",class:"pillar pillar_left"},null,8,Os)],512),[[r,l.value]])]),_:1}),a[7]||(a[7]=s("div",{class:"parallax-wrapper","data-depth":"0.11"},[s("img",{src:ys,alt:"",class:"pillar pillar_right"})],-1)),o(_,{name:"fade_slow",mode:"in-out"},{default:n(()=>[i(s("div",js,[s("img",{src:A.value,alt:"",class:"pillar pillar_right"},null,8,Us)],512),[[r,l.value]])]),_:1}),a[8]||(a[8]=s("div",{class:"parallax-wrapper","data-depth":"0.05"},[s("img",{src:As,alt:"",class:"platform"})],-1)),o(_,{name:"fade_slow",mode:"in-out"},{default:n(()=>[i(s("div",Vs,[s("img",{src:P.value,alt:"",class:"platform"},null,8,Bs)],512),[[r,l.value]])]),_:1}),o(_,{name:"fade",onAfterEnter:a[0]||(a[0]=V=>v.value=!1),mode:"in-out"},{default:n(()=>[i(s("div",Ts,[s("button",{onClick:H,disabled:v.value,class:"hoverAreaLamp"},null,8,Cs),s("img",{src:D.value,alt:"",class:"lamp img_hover"},null,8,zs),s("img",{src:w.value,alt:"",class:"lamp"},null,8,Es)],512),[[r,l.value]])]),_:1}),o(_,{name:"fade_slow",mode:"in-out"},{default:n(()=>[i(s("div",Is,[a[3]||(a[3]=s("a",{href:"",class:"hoverAreaBoy"},[s("div",{class:"hoverAreaBoy1"}),s("div",{class:"hoverAreaBoy2"})],-1)),s("img",{src:k.value,alt:"",class:"boy img_hover"},null,8,Hs),a[4]||(a[4]=s("img",{src:Ps,alt:"",class:"myCabin_scroll scroll"},null,-1)),s("img",{src:R.value,alt:"",class:"boy"},null,8,Xs)],512),[[r,l.value]])]),_:1}),o(_,{name:"fade_slow",mode:"in-out"},{default:n(()=>[i(s("div",Ys,[s("div",{class:"hoverAreaBook",onClick:X}),s("img",{src:x.value,alt:"",class:"book img_hover"},null,8,Ms),a[5]||(a[5]=s("img",{src:ws,alt:"",class:"about_scroll scroll"},null,-1)),s("div",Ss,[s("img",{src:L.value,alt:"",class:"about_magic1",style:{"z-index":"920"}},null,8,qs),s("img",{src:O.value,alt:"",class:"about_magic2",style:{"z-index":"910"}},null,8,Fs),s("img",{src:j.value,alt:"",class:"about_magic3",style:{"z-index":"900"}},null,8,Gs)]),s("img",{src:$.value,alt:"",class:"book"},null,8,Js)],512),[[r,l.value]])]),_:1})],512)]),s("main",null,[o(Y)]),o(_,{name:"fade_Video"},{default:n(()=>[i(s("video",{ref_key:"dayTransferVideo",ref:f,onEnded:a[1]||(a[1]=V=>p.value=!1),preload:"auto",height:"100vh",class:"dayTransferVideo"},a[9]||(a[9]=[s("source",{src:Ds},null,-1)]),544),[[r,p.value]])]),_:1}),o(_,{name:"fade_Video"},{default:n(()=>[i(s("video",{ref_key:"nightTransferVideo",ref:b,onEnded:a[2]||(a[2]=V=>d.value=!1),preload:"auto",height:"100vh",class:"nightTransferVideo"},a[10]||(a[10]=[s("source",{src:ks},null,-1)]),544),[[r,d.value]])]),_:1})])}}},Ns=M(Ks,[["__scopeId","data-v-56f1ad81"]]);export{Ns as default};
