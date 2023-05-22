(()=>{"use strict";var s={};s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(s){if("object"==typeof window)return window}}(),(()=>{var e;s.g.importScripts&&(e=s.g.location+"");var t=s.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var c=t.getElementsByTagName("script");if(c.length)for(var o=c.length-1;o>-1&&!e;)e=c[o--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),s.p=e})(),(()=>{const e=s.p+"ef50a43ca7f4c8dad8520cd45917479e.mp3",t=s.p+"bc0ddc4484b16aadb038faf2b7e05df9.mp3",c=s.p+"b64a3cd7092bd0b2794803e7e281c7ae.mp3",o=new Audio(e),i=new Audio(t),l=new Audio(c);function a(){const s=JSON.stringify(Q);localStorage.setItem("resultsYourLastGame",s),localStorage.setItem("field",D.innerHTML),localStorage.setItem("time-seconds",v),localStorage.setItem("time-minutes",f),localStorage.setItem("timer-value",u.innerText),localStorage.setItem("steps",m),localStorage.setItem("flags-count",q.innerText),localStorage.setItem("how-need-boms",r),localStorage.setItem("difficult-slider",C.classList),localStorage.setItem("playing-field-size",d),localStorage.setItem("difficult",(()=>{const s=document.querySelectorAll(".difficult-dtn");let e="";return s.forEach((s=>{s.classList.contains("active")&&(e=s.innerText)})),e})());const e=document.querySelector(".topic-selection");localStorage.setItem("topic-selection",e.classList),localStorage.setItem("sound-on-off",X.classList)}function n(){if(localStorage.getItem("resultsYourLastGame")&&(Q=JSON.parse(localStorage.resultsYourLastGame)),localStorage.getItem("field")&&(D.innerHTML=localStorage.getItem("field")),localStorage.getItem("playing-field-size")&&(d=1*localStorage.getItem("playing-field-size")),localStorage.getItem("steps")&&(m=1*localStorage.getItem("steps"),x.innerText=`Steps: ${m}`,document.querySelectorAll(".item").forEach((s=>{O(s)}))),(localStorage.getItem("time-seconds")||localStorage.getItem("time-minutes"))&&(v=1*localStorage.getItem("time-seconds"),f=1*localStorage.getItem("time-minutes"),document.querySelector(".layout-save-plaing-field.active")?clearTimeout(p):(v>0||f>0)&&g()),localStorage.getItem("timer-value")&&(u.innerText=localStorage.getItem("timer-value")),localStorage.getItem("flags-count")&&(q.innerText=localStorage.getItem("flags-count")),localStorage.getItem("how-need-boms")&&(r=1*localStorage.getItem("how-need-boms")),localStorage.getItem("difficult")){const s=localStorage.getItem("difficult"),e=document.querySelectorAll(".difficult-dtn");e.forEach((s=>{s.classList.remove("active")})),e.forEach((e=>{e.classList.contains(s)&&e.classList.add("active")})),A.value=r}if(localStorage.getItem("difficult-slider")&&(C.classList=localStorage.getItem("difficult-slider")),localStorage.getItem("topic-selection")){const s=document.querySelector(".topic-selection");s.classList=localStorage.getItem("topic-selection"),ss(s.classList)}localStorage.getItem("sound-on-off")&&(X.classList=localStorage.getItem("sound-on-off")),P();const s=document.querySelector(".close-state");s&&s.addEventListener("click",(()=>{document.querySelector(".state-window").classList.toggle("active")}))}window.addEventListener("beforeunload",a),window.addEventListener("load",n);let d=10,m=0,r=10;const L=document.querySelector("body");L.classList.add("body"),document.addEventListener("contextmenu",(s=>{s.preventDefault()}));const b=document.createElement("h1");b.classList.add("title"),b.innerText="Minesweeper",L.append(b);const h=document.createElement("div");h.classList.add("control-panel"),L.append(h);const N=document.createElement("div");N.classList.add("timer");const u=document.createElement("time");u.innerText="Timer: 00:00",h.append(N),N.append(u);let p,v=0,f=0;function g(){v++,v<10&&f<10?u.innerText=`Timer: 0${f}:0${v}`:v>9&&v<60&&f<10?u.innerText=`Timer: 0${f}:${v}`:v>59&&f<10?(f++,v=0,f<10?u.innerText=`Timer: 0${f}:0${v}`:f>9&&(u.innerText=`Timer: ${f}:0${v}`)):f>9&&v<10?u.innerText=`Timer: ${f}:0${v}`:f>9&&v>9&&v<60?u.innerText=`Timer: ${f}:${v}`:f>9&&v>59&&(f++,v=0,u.innerText=`Timer: ${f}:0${v}`),p=setTimeout((()=>{g()}),1e3)}const y=document.createElement("div");function E(){C.classList.remove("active"),clearTimeout(p),v=0,f=0,u.innerText="Timer: 00:00",q.innerText=`x ${r}`,m=0,w(),document.querySelector(".playing-field").remove(),Y(d),J(),P()}y.classList.add("refresh-btn"),y.innerText="New Game",h.append(y),y.addEventListener("click",(()=>{E()}));const S=document.createElement("div");S.classList.add("game-save-continue-container"),h.append(S);const T=document.createElement("div");T.classList.add("game-save-btn"),T.innerHTML="<p>Save Game</p>",S.append(T);const B=document.createElement("div");B.classList.add("game-continue-btn"),B.innerHTML="<p>Continue</p>",S.append(B);const x=document.createElement("div");function w(){x.innerText=`Steps: ${m}`}x.classList.add("click-count-panel"),x.innerText=`Steps: ${m}`,h.append(x);const I=document.createElement("div");I.classList.add("checked-bombs");const $=document.createElement("div");$.classList.add("bomb-img"),h.append(I),I.append($);const q=document.createElement("div");function k(s){const e=document.querySelectorAll(".maybeBomb").length;q.innerText="x "+(s-e)}q.classList.add("checked-bombs-count"),I.append(q),q.innerText=`x ${r}`;const M=document.createElement("div");M.classList.add("select-bombs-count"),I.append(M);const A=document.createElement("input");A.type="range",A.min=10,A.max=99,A.value=10,A.classList.add("select-line-input"),M.append(A);const H=()=>{q.innerText=`x ${A.value}`,r=A.value};A.addEventListener("mousedown",(()=>{A.addEventListener("mousemove",(()=>{H()})),A.addEventListener("mouseup",(()=>{H()}))}));const C=document.createElement("div");C.classList.add("select-bombs-count-blur"),M.append(C);const G=document.createElement("div");G.classList.add("difficult"),h.append(G);const z=document.createElement("p");z.classList.add("difficult-title"),z.innerText="Difficult",G.append(z),["Easy","Medium","Hard"].forEach((s=>{const e=document.createElement("div");e.classList.add("difficult-dtn",`${s}`),"Easy"===s&&0===m&&e.classList.add("active"),e.innerText=`${s}`,G.append(e)})),function(){const s=document.querySelectorAll(".difficult-dtn");s.forEach((e=>{e.addEventListener("click",(()=>{e.classList.toggle("active"),e.classList.contains("Easy")?(d=10,r=10):e.classList.contains("Medium")?(d=15,r=42):e.classList.contains("Hard")&&(d=25,r=99),A.value=r,s.forEach((s=>{s.classList.remove("active")})),e.classList.add("active"),E()}))}))}();const D=document.createElement("div");function Y(s){const e=document.createElement("div");e.classList.add("playing-field",`playing-field-${s}`);for(let t=0;t<s;t++){const c=document.createElement("div");c.classList.add("row",`row-${t}`);for(let e=0;e<s;e++){const s=document.createElement("div");s.classList.add("item",`item-${e}`),c.append(s)}e.append(c)}D.append(e);const t=document.createElement("div");t.classList.add("state-window"),e.append(t);const c=document.createElement("div");c.classList.add("state-table-container"),t.append(c);const o=document.createElement("div");o.classList.add("layout-save-plaing-field"),o.innerHTML='<p>Game saved.<br>To continue the game, press the button "Continue"</p>',e.append(o)}function j(s){let e=Math.floor(Math.random()*d);const t=document.getElementsByClassName("row");let c=Math.floor(Math.random()*d);const o=t[e].childNodes[c];o.classList.contains("bomb")||o.classList.contains("no-bomb")?j(s):(o.classList.add("bomb"),--s>0&&j(s))}function J(){document.querySelectorAll(".item").forEach((s=>{s.classList.add("close"),O(s)}))}function O(s){s.addEventListener("click",(()=>{if(0===m)X.classList.contains("active")||o.play(),C.classList.add("active"),s.classList.add("no-bomb"),s.classList.remove("close"),m++,j(r),document.querySelectorAll(".item").forEach((s=>{const e=1*s.parentElement.classList[1].split("-")[1],t=1*s.classList[1].split("-")[1],c=document.getElementsByClassName("row");let o=0;s.classList.contains("bomb")||(0===e?0===t?(c[e].childNodes[t+1].classList.contains("bomb")&&o++,c[e+1].childNodes[t+1].classList.contains("bomb")&&o++,c[e+1].childNodes[t].classList.contains("bomb")&&o++):t===d-1?(c[e].childNodes[t-1].classList.contains("bomb")&&o++,c[e+1].childNodes[t-1].classList.contains("bomb")&&o++,c[e+1].childNodes[t].classList.contains("bomb")&&o++):(c[e].childNodes[t-1].classList.contains("bomb")&&o++,c[e+1].childNodes[t-1].classList.contains("bomb")&&o++,c[e+1].childNodes[t].classList.contains("bomb")&&o++,c[e+1].childNodes[t+1].classList.contains("bomb")&&o++,c[e].childNodes[t+1].classList.contains("bomb")&&o++):e===d-1?0===t?(c[e].childNodes[t+1].classList.contains("bomb")&&o++,c[e-1].childNodes[t+1].classList.contains("bomb")&&o++,c[e-1].childNodes[t].classList.contains("bomb")&&o++):t===d-1?(c[e].childNodes[t-1].classList.contains("bomb")&&o++,c[e-1].childNodes[t-1].classList.contains("bomb")&&o++,c[e-1].childNodes[t].classList.contains("bomb")&&o++):(c[e].childNodes[t-1].classList.contains("bomb")&&o++,c[e-1].childNodes[t-1].classList.contains("bomb")&&o++,c[e-1].childNodes[t].classList.contains("bomb")&&o++,c[e-1].childNodes[t+1].classList.contains("bomb")&&o++,c[e].childNodes[t+1].classList.contains("bomb")&&o++):0===t?(c[e-1].childNodes[t].classList.contains("bomb")&&o++,c[e-1].childNodes[t+1].classList.contains("bomb")&&o++,c[e].childNodes[t+1].classList.contains("bomb")&&o++,c[e+1].childNodes[t+1].classList.contains("bomb")&&o++,c[e+1].childNodes[t].classList.contains("bomb")&&o++):t===d-1?(c[e-1].childNodes[t].classList.contains("bomb")&&o++,c[e-1].childNodes[t-1].classList.contains("bomb")&&o++,c[e].childNodes[t-1].classList.contains("bomb")&&o++,c[e+1].childNodes[t-1].classList.contains("bomb")&&o++,c[e+1].childNodes[t].classList.contains("bomb")&&o++):(c[e-1].childNodes[t-1].classList.contains("bomb")&&o++,c[e-1].childNodes[t].classList.contains("bomb")&&o++,c[e-1].childNodes[t+1].classList.contains("bomb")&&o++,c[e].childNodes[t-1].classList.contains("bomb")&&o++,c[e].childNodes[t+1].classList.contains("bomb")&&o++,c[e+1].childNodes[t-1].classList.contains("bomb")&&o++,c[e+1].childNodes[t].classList.contains("bomb")&&o++,c[e+1].childNodes[t+1].classList.contains("bomb")&&o++)),0!==o&&s.classList.add(`int${o}`)})),g(),3===s.classList.length&&K(s);else if(!s.classList.contains("maybeBomb")&&s.classList.contains("close"))if(s.classList.remove("close"),m++,s.classList.contains("bomb")){X.classList.contains("active")||i.play();for(let s of F)s.classList.contains("bomb")&&s.classList.remove("close");const s=document.querySelector(".playing-field"),e=document.createElement("div");e.classList.add("layout-on-plaing-field"),e.innerHTML="<p>ПОТРАЧЕНО =(</p>",s.append(e),clearTimeout(p),v=0,f=0}else 2===s.classList.length?(X.classList.contains("active")||(o.currentTime=0,o.play()),K(s)):X.classList.contains("active")||(o.currentTime=0,o.play());!function(){if(document.querySelectorAll(".close").length===r){X.classList.contains("active")||l.play();const s=document.querySelector(".playing-field"),e=document.createElement("div");e.classList.add("layout-on-plaing-field-win"),e.innerHTML="<p>Congratulations!!!</p>",s.append(e),clearTimeout(p),v=0,f=0,R(e.classList[0])}}(),w()}))}D.classList.add("field-container"),L.append(D),Y(d),J();const F=document.getElementsByClassName("item");function P(){for(let s of F)s.addEventListener("contextmenu",(s=>{s.target.classList.contains("close")&&!s.target.classList.contains("maybeBomb")&&0!==m?(X.classList.contains("active")||(o.currentTime=0,o.play()),s.target.classList.add("maybeBomb")):s.target.classList.contains("close")&&s.target.classList.contains("maybeBomb")&&0!==m&&(X.classList.contains("active")||(o.currentTime=0,o.play()),s.target.classList.remove("maybeBomb")),k(r)}))}function K(s){const e=1*s.parentElement.classList[1].split("-")[1],t=1*s.classList[1].split("-")[1],c=document.getElementsByClassName("row");(s.classList.contains("no-bomb")||2===s.classList.length)&&(0===e?0===t?(!c[e].childNodes[t+1].classList.contains("close")||c[e].childNodes[t+1].classList.contains("bomb")||c[e].childNodes[t+1].classList.contains("maybeBomb")||(c[e].childNodes[t+1].classList.remove("close"),K(c[e].childNodes[t+1])),!c[e+1].childNodes[t+1].classList.contains("close")||c[e+1].childNodes[t+1].classList.contains("bomb")||c[e+1].childNodes[t+1].classList.contains("maybeBomb")||(c[e+1].childNodes[t+1].classList.remove("close"),K(c[e+1].childNodes[t+1])),!c[e+1].childNodes[t].classList.contains("close")||c[e+1].childNodes[t].classList.contains("bomb")||c[e+1].childNodes[t].classList.contains("maybeBomb")||(c[e+1].childNodes[t].classList.remove("close"),K(c[e+1].childNodes[t]))):t===d-1?(!c[e].childNodes[t-1].classList.contains("close")||c[e].childNodes[t-1].classList.contains("bomb")||c[e].childNodes[t-1].classList.contains("maybeBomb")||(c[e].childNodes[t-1].classList.remove("close"),K(c[e].childNodes[t-1])),!c[e+1].childNodes[t-1].classList.contains("close")||c[e+1].childNodes[t-1].classList.contains("bomb")||c[e+1].childNodes[t-1].classList.contains("maybeBomb")||(c[e+1].childNodes[t-1].classList.remove("close"),K(c[e+1].childNodes[t-1])),!c[e+1].childNodes[t].classList.contains("close")||c[e+1].childNodes[t].classList.contains("bomb")||c[e+1].childNodes[t].classList.contains("maybeBomb")||(c[e+1].childNodes[t].classList.remove("close"),K(c[e+1].childNodes[t]))):(!c[e].childNodes[t-1].classList.contains("close")||c[e].childNodes[t-1].classList.contains("bomb")||c[e].childNodes[t-1].classList.contains("maybeBomb")||(c[e].childNodes[t-1].classList.remove("close"),K(c[e].childNodes[t-1])),!c[e+1].childNodes[t-1].classList.contains("close")||c[e+1].childNodes[t-1].classList.contains("bomb")||c[e+1].childNodes[t-1].classList.contains("maybeBomb")||(c[e+1].childNodes[t-1].classList.remove("close"),K(c[e+1].childNodes[t-1])),!c[e].childNodes[t+1].classList.contains("close")||c[e].childNodes[t+1].classList.contains("bomb")||c[e].childNodes[t+1].classList.contains("maybeBomb")||(c[e].childNodes[t+1].classList.remove("close"),K(c[e].childNodes[t+1])),!c[e+1].childNodes[t+1].classList.contains("close")||c[e+1].childNodes[t+1].classList.contains("bomb")||c[e+1].childNodes[t+1].classList.contains("maybeBomb")||(c[e+1].childNodes[t+1].classList.remove("close"),K(c[e+1].childNodes[t+1])),!c[e+1].childNodes[t].classList.contains("close")||c[e+1].childNodes[t].classList.contains("bomb")||c[e+1].childNodes[t].classList.contains("maybeBomb")||(c[e+1].childNodes[t].classList.remove("close"),K(c[e+1].childNodes[t]))):e===d-1?0===t?(!c[e].childNodes[t+1].classList.contains("close")||c[e].childNodes[t+1].classList.contains("bomb")||c[e].childNodes[t+1].classList.contains("maybeBomb")||(c[e].childNodes[t+1].classList.remove("close"),K(c[e].childNodes[t+1])),!c[e-1].childNodes[t+1].classList.contains("close")||c[e-1].childNodes[t+1].classList.contains("bomb")||c[e-1].childNodes[t+1].classList.contains("maybeBomb")||(c[e-1].childNodes[t+1].classList.remove("close"),K(c[e-1].childNodes[t+1])),!c[e-1].childNodes[t].classList.contains("close")||c[e-1].childNodes[t].classList.contains("bomb")||c[e-1].childNodes[t].classList.contains("maybeBomb")||(c[e-1].childNodes[t].classList.remove("close"),K(c[e-1].childNodes[t]))):t===d-1?(!c[e].childNodes[t-1].classList.contains("close")||c[e].childNodes[t-1].classList.contains("bomb")||c[e].childNodes[t-1].classList.contains("maybeBomb")||(c[e].childNodes[t-1].classList.remove("close"),K(c[e].childNodes[t-1])),!c[e-1].childNodes[t-1].classList.contains("close")||c[e-1].childNodes[t-1].classList.contains("bomb")||c[e-1].childNodes[t-1].classList.contains("maybeBomb")||(c[e-1].childNodes[t-1].classList.remove("close"),K(c[e-1].childNodes[t-1])),!c[e-1].childNodes[t].classList.contains("close")||c[e-1].childNodes[t].classList.contains("bomb")||c[e-1].childNodes[t].classList.contains("maybeBomb")||(c[e-1].childNodes[t].classList.remove("close"),K(c[e-1].childNodes[t]))):(!c[e].childNodes[t-1].classList.contains("close")||c[e].childNodes[t-1].classList.contains("bomb")||c[e].childNodes[t-1].classList.contains("maybeBomb")||(c[e].childNodes[t-1].classList.remove("close"),K(c[e].childNodes[t-1])),!c[e-1].childNodes[t-1].classList.contains("close")||c[e-1].childNodes[t-1].classList.contains("bomb")||c[e-1].childNodes[t-1].classList.contains("maybeBomb")||(c[e-1].childNodes[t-1].classList.remove("close"),K(c[e-1].childNodes[t-1])),!c[e].childNodes[t+1].classList.contains("close")||c[e].childNodes[t+1].classList.contains("bomb")||c[e].childNodes[t+1].classList.contains("maybeBomb")||(c[e].childNodes[t+1].classList.remove("close"),K(c[e].childNodes[t+1])),!c[e-1].childNodes[t+1].classList.contains("close")||c[e-1].childNodes[t+1].classList.contains("bomb")||c[e-1].childNodes[t+1].classList.contains("maybeBomb")||(c[e-1].childNodes[t+1].classList.remove("close"),K(c[e-1].childNodes[t+1])),!c[e-1].childNodes[t].classList.contains("close")||c[e-1].childNodes[t].classList.contains("bomb")||c[e-1].childNodes[t].classList.contains("maybeBomb")||(c[e-1].childNodes[t].classList.remove("close"),K(c[e-1].childNodes[t]))):0===t?(!c[e+1].childNodes[t].classList.contains("close")||c[e+1].childNodes[t].classList.contains("bomb")||c[e+1].childNodes[t].classList.contains("maybeBomb")||(c[e+1].childNodes[t].classList.remove("close"),K(c[e+1].childNodes[t])),!c[e+1].childNodes[t+1].classList.contains("close")||c[e+1].childNodes[t+1].classList.contains("bomb")||c[e+1].childNodes[t+1].classList.contains("maybeBomb")||(c[e+1].childNodes[t+1].classList.remove("close"),K(c[e+1].childNodes[t+1])),!c[e].childNodes[t+1].classList.contains("close")||c[e].childNodes[t+1].classList.contains("bomb")||c[e].childNodes[t+1].classList.contains("maybeBomb")||(c[e].childNodes[t+1].classList.remove("close"),K(c[e].childNodes[t+1])),!c[e-1].childNodes[t+1].classList.contains("close")||c[e-1].childNodes[t+1].classList.contains("bomb")||c[e-1].childNodes[t+1].classList.contains("maybeBomb")||(c[e-1].childNodes[t+1].classList.remove("close"),K(c[e-1].childNodes[t+1])),!c[e-1].childNodes[t].classList.contains("close")||c[e-1].childNodes[t].classList.contains("bomb")||c[e-1].childNodes[t].classList.contains("maybeBomb")||(c[e-1].childNodes[t].classList.remove("close"),K(c[e-1].childNodes[t]))):t===d-1?(!c[e-1].childNodes[t].classList.contains("close")||c[e-1].childNodes[t].classList.contains("bomb")||c[e-1].childNodes[t].classList.contains("maybeBomb")||(c[e-1].childNodes[t].classList.remove("close"),K(c[e-1].childNodes[t])),!c[e-1].childNodes[t-1].classList.contains("close")||c[e-1].childNodes[t-1].classList.contains("bomb")||c[e-1].childNodes[t-1].classList.contains("maybeBomb")||(c[e-1].childNodes[t-1].classList.remove("close"),K(c[e-1].childNodes[t-1])),!c[e].childNodes[t-1].classList.contains("close")||c[e].childNodes[t-1].classList.contains("bomb")||c[e].childNodes[t-1].classList.contains("maybeBomb")||(c[e].childNodes[t-1].classList.remove("close"),K(c[e].childNodes[t-1])),!c[e+1].childNodes[t-1].classList.contains("close")||c[e+1].childNodes[t-1].classList.contains("bomb")||c[e+1].childNodes[t-1].classList.contains("maybeBomb")||(c[e+1].childNodes[t-1].classList.remove("close"),K(c[e+1].childNodes[t-1])),!c[e+1].childNodes[t].classList.contains("close")||c[e+1].childNodes[t].classList.contains("bomb")||c[e+1].childNodes[t].classList.contains("maybeBomb")||(c[e+1].childNodes[t].classList.remove("close"),K(c[e+1].childNodes[t]))):(!c[e].childNodes[t-1].classList.contains("close")||c[e].childNodes[t-1].classList.contains("bomb")||c[e].childNodes[t-1].classList.contains("maybeBomb")||(c[e].childNodes[t-1].classList.remove("close"),K(c[e].childNodes[t-1])),!c[e+1].childNodes[t-1].classList.contains("close")||c[e+1].childNodes[t-1].classList.contains("bomb")||c[e+1].childNodes[t-1].classList.contains("maybeBomb")||(c[e+1].childNodes[t-1].classList.remove("close"),K(c[e+1].childNodes[t-1])),!c[e+1].childNodes[t].classList.contains("close")||c[e+1].childNodes[t].classList.contains("bomb")||c[e+1].childNodes[t].classList.contains("maybeBomb")||(c[e+1].childNodes[t].classList.remove("close"),K(c[e+1].childNodes[t])),!c[e+1].childNodes[t+1].classList.contains("close")||c[e+1].childNodes[t+1].classList.contains("bomb")||c[e+1].childNodes[t+1].classList.contains("maybeBomb")||(c[e+1].childNodes[t+1].classList.remove("close"),K(c[e+1].childNodes[t+1])),!c[e].childNodes[t+1].classList.contains("close")||c[e].childNodes[t+1].classList.contains("bomb")||c[e].childNodes[t+1].classList.contains("maybeBomb")||(c[e].childNodes[t+1].classList.remove("close"),K(c[e].childNodes[t+1])),!c[e-1].childNodes[t+1].classList.contains("close")||c[e-1].childNodes[t+1].classList.contains("bomb")||c[e-1].childNodes[t+1].classList.contains("maybeBomb")||(c[e-1].childNodes[t+1].classList.remove("close"),K(c[e-1].childNodes[t+1])),!c[e-1].childNodes[t].classList.contains("close")||c[e-1].childNodes[t].classList.contains("bomb")||c[e-1].childNodes[t].classList.contains("maybeBomb")||(c[e-1].childNodes[t].classList.remove("close"),K(c[e-1].childNodes[t])),!c[e-1].childNodes[t-1].classList.contains("close")||c[e-1].childNodes[t-1].classList.contains("bomb")||c[e-1].childNodes[t-1].classList.contains("maybeBomb")||(c[e-1].childNodes[t-1].classList.remove("close"),K(c[e-1].childNodes[t-1]))))}P();let Q=[];const R=()=>{const s=document.querySelector(".difficult-dtn.active"),e=new class{constructor(s,e,t,c){this.time=s.split(" ")[1],this.steps=e,this.difficult=t,this.boms=c}}(u.innerText,m,s.innerText,r);10===Q.length?(Q.unshift(e),Q.pop()):Q.unshift(e)},U=document.createElement("div");U.classList.add("footer"),L.append(U);const V=document.createElement("div");V.classList.add("topic-selection"),U.append(V);const W=document.createElement("div");W.classList.add("topic-selection-item"),V.append(W);const X=document.createElement("div");X.classList.add("sound-on"),U.append(X),X.addEventListener("click",(()=>{X.classList.toggle("active")}));const Z=document.createElement("div");Z.classList.add("state-btn");const _=document.createElement("p");function ss(s){const e=document.querySelector(".body"),t=document.querySelectorAll(".timer, .refresh-btn, .refresh-btn, .game-save-btn, .game-continue-btn, .click-count-panel, .difficult, .topic-selection, .state-btn, .sound-on"),c=document.querySelectorAll(".difficult-dtn");s.contains("dark")?(e.classList.add("dark"),t.forEach((s=>{s.classList.add("dark")})),c.forEach((s=>{s.classList.add("dark")}))):(e.classList.remove("dark"),t.forEach((s=>{s.classList.remove("dark")})),c.forEach((s=>{s.classList.remove("dark")})))}_.classList.add("state-btn-title"),_.innerText="Statistics",Z.append(_),U.append(Z),Z.addEventListener("click",(()=>{const s=document.querySelector(".state-window");if(s.classList.toggle("active"),s.classList.contains("active")){const e=document.querySelector(".state-table-container");e.innerHTML="";const t=document.createElement("div");t.classList.add("close-state"),e.append(t),t.addEventListener("click",(()=>{s.classList.toggle("active")}));const c=document.createElement("h2");c.classList.add("table-tittle"),c.innerText="Statistics last 10 games",e.append(c);const o=document.createElement("table");o.classList.add("table"),e.append(o),["№","Time","Steps","Difficult","Bombs"].forEach((s=>{const e=document.createElement("th");e.classList.add("header-name",`header-${s}`),e.innerText=`${s}`,o.append(e)}));let i=1;Q.forEach((s=>{const e=document.createElement("tr");e.classList.add("table-item"),o.append(e);const t=document.createElement("td");t.classList.add("table-row","table-row-№"),e.append(t),t.innerText=`${i}`,i++;for(let t in s){const c=document.createElement("td");c.classList.add("table-row",`table-row-${t}`),e.append(c),c.innerText=`${s[t]}`}}))}})),T.addEventListener("click",(()=>{const s=document.querySelector(".layout-save-plaing-field");s.classList.contains("active")||(clearTimeout(p),s.classList.add("active"),a())})),B.addEventListener("click",(()=>{document.querySelector(".layout-save-plaing-field").classList.contains("active")&&(n(),document.querySelector(".layout-save-plaing-field").classList.remove("active"),0!==m&&g())})),V.addEventListener("click",(()=>{V.classList.toggle("dark"),ss(V.classList)}))})()})();