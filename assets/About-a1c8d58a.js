import{j as E,_ as T,u as A,r as w,o as U,a as B,c as C,b as t,d as m,w as p,T as g,n as h,e as b,v as y,f as S}from"./index-7f341a7c.js";const j="/Phantasia/assets/dragon_video-7f95f2fc.webm",V="/Phantasia/assets/sword_video-4c842613.webm",L="/Phantasia/assets/knight_video-ae002caa.webm";var D={exports:{}};(function(l,k){/*!
 * Lettering.JS 0.7.0
 *
 * Copyright 2010, Dave Rupert http://daverupert.com
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 *
 * Thanks to Paul Irish - http://paulirish.com - for the feedback.
 *
 * Date: Mon Sep 20 17:14:00 2010 -0600
 */(function(a){l.exports=a(E)})(function(a){function v(c,_,x,I){var n=c.text(),s=n.split(_),e="";s.length&&(a(s).each(function(r,o){e+='<span class="'+x+(r+1)+'" aria-hidden="true">'+o+"</span>"+I}),c.attr("aria-label",n).empty().append(e))}var d={init:function(){return this.each(function(){v(a(this),"","char","")})},words:function(){return this.each(function(){v(a(this)," ","word"," ")})},lines:function(){return this.each(function(){var c="eefec303079ad17405c889e092e105b0";v(a(this).children("br").replaceWith(c).end(),c,"line","")})}};a.fn.lettering=function(c){return c&&d[c]?d[c].apply(this,[].slice.call(arguments,1)):c==="letters"||!c?d.init.apply(this,[].slice.call(arguments,0)):(a.error("Method "+c+" does not exist on jQuery.lettering"),this)}})})(D);(function(l){function k(n){return/In/.test(n)||l.inArray(n,l.fn.textillate.defaults.inEffects)>=0}function a(n){return/Out/.test(n)||l.inArray(n,l.fn.textillate.defaults.outEffects)>=0}function v(n){return n!=="true"&&n!=="false"?n:n==="true"}function d(n){var s=n.attributes||[],e={};return s.length&&l.each(s,function(r,o){var i=o.nodeName.replace(/delayscale/,"delayScale");/^data-in-*/.test(i)?(e.in=e.in||{},e.in[i.replace(/data-in-/,"")]=v(o.nodeValue)):/^data-out-*/.test(i)?(e.out=e.out||{},e.out[i.replace(/data-out-/,"")]=v(o.nodeValue)):/^data-*/.test(i)&&(e[i.replace(/data-/,"")]=v(o.nodeValue))}),e}function c(n){for(var s,e,r=n.length;r;s=parseInt(Math.random()*r),e=n[--r],n[r]=n[s],n[s]=e);return n}function _(n,s,e){n.addClass("animated "+s).css("visibility","visible").show(),n.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",function(){n.removeClass("animated "+s),e&&e()})}function x(n,s,e){var r=n.length;if(!r){e&&e();return}s.shuffle&&(n=c(n)),s.reverse&&(n=n.toArray().reverse()),l.each(n,function(o,i){var u=l(i);function f(){k(s.effect)?u.css("visibility","visible"):a(s.effect)&&u.css("visibility","hidden"),r-=1,!r&&e&&e()}var O=s.sync?s.delay:s.delay*o*s.delayScale;u.text()?setTimeout(function(){_(u,s.effect,f)},O):f()})}var I=function(n,s){var e=this,r=l(n);e.init=function(){e.$texts=r.find(s.selector),e.$texts.length||(e.$texts=l('<ul class="texts"><li>'+r.html()+"</li></ul>"),r.html(e.$texts)),e.$texts.hide(),e.$current=l("<span>").html(e.$texts.find(":first-child").html()).prependTo(r),k(s.in.effect)?e.$current.css("visibility","hidden"):a(s.out.effect)&&e.$current.css("visibility","visible"),e.setOptions(s),e.timeoutRun=null,setTimeout(function(){e.options.autoStart&&e.start()},e.options.initialDelay)},e.setOptions=function(o){e.options=o},e.triggerEvent=function(o){var i=l.Event(o+".tlt");return r.trigger(i,e),i},e.in=function(o,i){o=o||0;var u=e.$texts.find(":nth-child("+((o||0)+1)+")"),f=l.extend(!0,{},e.options,u.length?d(u[0]):{}),O;u.addClass("current"),e.triggerEvent("inAnimationBegin"),r.attr("data-active",u.data("id")),e.$current.html(u.html()).lettering("words"),e.options.type=="char"&&e.$current.find('[class^="word"]').css({display:"inline-block","-webkit-transform":"translate3d(0,0,0)","-moz-transform":"translate3d(0,0,0)","-o-transform":"translate3d(0,0,0)",transform:"translate3d(0,0,0)"}).each(function(){l(this).lettering()}),O=e.$current.find('[class^="'+e.options.type+'"]').css("display","inline-block"),k(f.in.effect)?O.css("visibility","hidden"):a(f.in.effect)&&O.css("visibility","visible"),e.currentIndex=o,x(O,f.in,function(){e.triggerEvent("inAnimationEnd"),f.in.callback&&f.in.callback(),i&&i(e)})},e.out=function(o){var i=e.$texts.find(":nth-child("+((e.currentIndex||0)+1)+")"),u=e.$current.find('[class^="'+e.options.type+'"]'),f=l.extend(!0,{},e.options,i.length?d(i[0]):{});e.triggerEvent("outAnimationBegin"),x(u,f.out,function(){i.removeClass("current"),e.triggerEvent("outAnimationEnd"),r.removeAttr("data-active"),f.out.callback&&f.out.callback(),o&&o(e)})},e.start=function(o){setTimeout(function(){e.triggerEvent("start"),function i(u){e.in(u,function(){var f=e.$texts.children().length;u+=1,!e.options.loop&&u>=f?(e.options.callback&&e.options.callback(),e.triggerEvent("end")):(u=u%f,e.timeoutRun=setTimeout(function(){e.out(function(){i(u)})},e.options.minDisplayTime))})}(o||0)},e.options.initialDelay)},e.stop=function(){e.timeoutRun&&(clearInterval(e.timeoutRun),e.timeoutRun=null)},e.init()};l.fn.textillate=function(n,s){return this.each(function(){var e=l(this),r=e.data("textillate"),o=l.extend(!0,{},l.fn.textillate.defaults,d(this),typeof n=="object"&&n);r?typeof n=="string"?r[n].apply(r,[].concat(s)):r.setOptions.call(r,o):e.data("textillate",r=new I(this,o))})},l.fn.textillate.defaults={selector:".texts",loop:!1,minDisplayTime:2e3,initialDelay:0,in:{effect:"fadeInLeftBig",delayScale:1.5,delay:50,sync:!1,reverse:!1,shuffle:!1,callback:function(){}},out:{effect:"hinge",delayScale:1.5,delay:50,sync:!1,reverse:!1,shuffle:!1,callback:function(){}},autoStart:!0,inEffects:[],outEffects:["hinge"],callback:function(){},type:"char"}})(jQuery);const M={class:"aboutWrapper"},R={class:"content"},W={class:"leftContent"},H={class:"contentBox"},q={class:"menu"},N={class:"aboutUs_button"},Y={class:"ourOrigin_button"},P={class:"ourServices_button"},z={class:"rightContent"},Q={class:"aboutContents"},J={class:"aboutUsContent"},F={__name:"About",setup(l){const k=A();w(null);const a=w(null),v=w(null),d=w(null),c=w(null),_=w(null),x=w(null),I=w(!1),n=o=>{a.value=o,v.value=o,d.value=o;const i=s(d.value);i&&(i.load(),i.play()),e()},s=o=>{switch(o){case"aboutUs":return c.value;case"ourOrigin":return _.value;case"ourServices":return x.value;default:return c.value}},e=()=>{$(".title1").textillate("start"),$(".title2").textillate("start"),$(".title3").textillate("start")},r=()=>{I.value=!0,setTimeout(()=>{k.push("/")},375)};return U(()=>{setTimeout(()=>{a.value="aboutUs",v.value="aboutUs",d.value="aboutUs";const o=s(d.value);o&&(o.load(),o.play())},200),$(".flipInY").textillate({in:{effect:"flipInY",shuffle:!0,delay:170},out:{effect:"fadeOut",delay:50}}),$(".fadeIn").textillate({in:{effect:"fadeIn",shuffle:!0,delay:120}}),$(".rollIn").textillate({in:{effect:"rollIn",shuffle:!0,delay:70}}),$(".menuIn").textillate({in:{effect:"fadeIn",sequence:!0,delay:60}})}),(o,i)=>(B(),C("div",M,[t("div",{class:h(["about slideArea",{sliding:I.value}])},[t("div",R,[t("div",W,[t("div",H,[m(g,{name:"fade",mode:"out-in"},{default:p(()=>[b(t("div",{class:h(["slogon box",{show:a.value==="aboutUs",hide:a.value!=="aboutUs"}])},i[3]||(i[3]=[t("h1",{class:"title1 flipInY"},"Reading",-1),t("h2",{class:"title2 fadeIn"},"is more than words—",-1),t("h6",{class:"title3 rollIn"},"An interactive journey of exploration.",-1)]),2),[[y,a.value==="aboutUs"]])]),_:1}),m(g,{name:"fade",mode:"out-in"},{default:p(()=>[b(t("div",{class:h(["slogon box",{show:a.value==="ourOrigin",hide:a.value!=="ourOrigin"}])},i[4]||(i[4]=[t("h1",{class:"title1 flipInY"},"Learning",-1),t("h2",{class:"title2 fadeIn"},"is a window to magic—",-1),t("h6",{class:"title3 rollIn"},"A magical adventure through stories.",-1)]),2),[[y,a.value==="ourOrigin"]])]),_:1}),m(g,{name:"fade",mode:"out-in"},{default:p(()=>[b(t("div",{class:h(["slogon box",{show:a.value==="ourServices",hide:a.value!=="ourServices"}])},i[5]||(i[5]=[t("h1",{class:"title1 flipInY"},"Wonder",-1),t("h2",{class:"title2 fadeIn"},"is a trail to phantasia—",-1),t("h6",{class:"title3 rollIn"},"Explore new worlds with every click.",-1)]),2),[[y,a.value==="ourServices"]])]),_:1}),t("div",q,[t("div",N,[t("button",{onClick:i[0]||(i[0]=u=>n("aboutUs")),class:h(["btnLink white menuIn",{active:v.value==="aboutUs"}])}," About Us ",2)]),t("div",Y,[t("button",{onClick:i[1]||(i[1]=u=>n("ourOrigin")),class:h(["btnLink white menuIn",{active:v.value==="ourOrigin"}])}," Our Origin ",2)]),t("div",P,[t("button",{onClick:i[2]||(i[2]=u=>n("ourServices")),class:h(["btnLink white menuIn",{active:v.value==="ourServices"}])}," Our Services ",2)]),t("div",{class:"backToHome_button"},[t("button",{onClick:r,class:"btnLink white backToHome menuIn"}," Back to home ")])])])]),t("div",z,[t("div",Q,[t("div",J,[m(g,{name:"fade",mode:"out-in"},{default:p(()=>[b(t("div",{class:h(["aboutUsBox box",{show:a.value==="aboutUs",hide:a.value!=="aboutUs"}])},i[6]||(i[6]=[t("h3",null,"About Us",-1),t("span",null,[t("p",null," In today’s fast-paced digital era, we are committed to creating a safe and nurturing online space for parents and children. Our platform focuses on the creation and sharing of interactive picture books, blending stories, special effects, and engaging interactions to transform reading into a new way for children to explore the world. "),t("p",null," We offer more than just one-page story websites; we provide a platform full of creativity and possibilities: "),t("ul",null,[t("li",null," Designed for creators: Anyone can upload their images and story texts, and we’ll help transform them into vibrant, interactive picture books while offering sales and profit-sharing services. "),t("li",null," Supporting children’s growth: In an age flooded with information, we believe reading should be both safe and enjoyable. Our interactive picture books aim to inspire children’s creativity, nurture their imagination, and give parents peace of mind. ")]),t("p",null," Our vision is to merge technology with storytelling, becoming a trusted companion on children’s journey of growth and bringing warmth and hope to the digital age.Join us and discover the endless possibilities of interactive picture books! ")],-1)]),2),[[y,a.value==="aboutUs"]])]),_:1}),m(g,{name:"fade",mode:"out-in"},{default:p(()=>[b(t("div",{class:h(["ourOriginBox box",{show:a.value==="ourOrigin",hide:a.value!=="ourOrigin"}])},i[7]||(i[7]=[t("h3",null,"Our Origin",-1),t("span",null,[t("p",null," In today’s rapidly evolving technological era, children are accessing the internet at an increasingly younger age, leaving parents concerned about how to find beneficial and safe resources amidst an overwhelming sea of content. This question became the foundation of our platform. "),t("p",null," We firmly believe that reading and learning should be filled with warmth and inspiration, not just cold data and text. By combining storytelling, art, and technology, we aim to create an interactive picture book platform that sparks children’s creativity and offers parents a safe and reliable choice. Reading is no longer limited to printed pages—it becomes an engaging and exploratory experience. "),t("p",null," Additionally, we have created a platform specifically for parents and creators passionate about children’s education. It empowers them to transform their stories and ideas into vibrant, interactive picture books, benefitting even more families. This is our founding mission and the driving force behind our journey. ")],-1)]),2),[[y,a.value==="ourOrigin"]])]),_:1}),m(g,{name:"fade",mode:"out-in"},{default:p(()=>[b(t("div",{class:h(["ourServicesBox box",{show:a.value==="ourServices",hide:a.value!=="ourServices"}])},i[8]||(i[8]=[t("h3",null,"Our Services",-1),t("span",null,[t("h4",null,"Safe Picture Book Subscription"),t("p",null," We provide parents with a worry-free option. By subscribing to our membership, children can access a curated collection of high-quality interactive picture books crafted with care. These stories offer rich content and educational value, making reading both safe and enjoyable. "),t("h4",null,"Magical Effects and Interactive Experiences"),t("p",null," Our platform features innovative, magic-themed effects and engaging interactions, creating an immersive storytelling experience for children. Additionally, kids can design their own unique magical avatar in the member center, enhancing their sense of exploration and participation, making each story journey truly special. "),t("h4",null,"Supporting Creators’ Educational Aspirations"),t("p",null," If you are a parent passionate about children’s education or an aspiring creator, we welcome you to join our creator platform. Transform your stories and ideas into interactive picture books and share them with more families. We are dedicated to supporting anyone who wishes to contribute to children’s education, bringing more outstanding stories to light. ")],-1)]),2),[[y,a.value==="ourServices"]])]),_:1})]),i[9]||(i[9]=t("div",{class:"bgBlack"},null,-1))])])]),m(g,{name:"fade",mode:"out-in"},{default:p(()=>[b(t("div",{class:h(["aboutUsBox box",{show:a.value==="aboutUs",hide:a.value!=="aboutUs"}])},[t("video",{ref_key:"aboutUsVideo",ref:c,class:"video"},i[10]||(i[10]=[t("source",{src:j,type:"video/webm"},null,-1),S(" 您的瀏覽器不支援 HTML5 視頻標籤。 ")]),512)],2),[[y,d.value==="aboutUs"]])]),_:1}),m(g,{name:"fade",mode:"out-in"},{default:p(()=>[b(t("div",{class:h(["ourOriginBox box",{show:a.value==="ourOrigin",hide:a.value!=="ourOrigin"}])},[t("video",{ref_key:"ourOriginVideo",ref:_,class:"video"},i[11]||(i[11]=[t("source",{src:V,type:"video/webm"},null,-1),S(" 您的瀏覽器不支援 HTML5 視頻標籤。 ")]),512)],2),[[y,d.value==="ourOrigin"]])]),_:1}),m(g,{name:"fade",mode:"out-in"},{default:p(()=>[b(t("div",{class:h(["ourServicesBox box",{show:a.value==="ourServices",hide:a.value!=="ourServices"}])},[t("video",{ref_key:"ourServicesVideo",ref:x,class:"video"},i[12]||(i[12]=[t("source",{src:L,type:"video/webm"},null,-1),S(" 您的瀏覽器不支援 HTML5 視頻標籤。 ")]),512)],2),[[y,d.value==="ourServices"]])]),_:1})],2)]))}},K=T(F,[["__scopeId","data-v-061bfe9b"]]);export{K as default};
