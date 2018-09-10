const offline=document.querySelector(".offline"),main=document.querySelector("main"),search=document.querySelector("input"),button=document.querySelector("button"),template=document.getElementById("cat"),observer=new IntersectionObserver(a=>{a.forEach(a=>{if(0<a.intersectionRatio){const b=a.target;if(observer.unobserve(b),"IMG"===b.nodeName)return b.src=`${b.dataset.src}${/\?/.test(b.dataset.src)?"&":"?"}${Math.random().toString().substr(2)}`;const c=b.classList;if(c.contains("photos"))return loadPhotos(b);if(c.contains("reviews"))return loadReviews(b);if(c.contains("offers"))return loadOffers(b)}})}),getCats=async a=>{const b=`https://commons.wikimedia.org/w/api.php
      ?action=query
      &generator=categorymembers
      &gcmlimit=max
      &gcmtype=file
      &gcmtitle=Category:${encodeURIComponent(a.replace(/\s/g," "))}
      &prop=imageinfo
      &iiurlheight=100
      &iiprop=extmetadata|url
      &iiextmetadatafilter=ImageDescription
      &format=json&origin=*`.replace(/\n\s*/g,"");return fetch(b).then(a=>{if(!a.ok)throw new TypeError(`Could not load ${b}`);return a.json()}).then(a=>Object.keys(a.query.pages).map(b=>{let c=a.query.pages[b];try{c=c.imageinfo[0];const a=c.thumburl,b=c.descriptionshorturl,d=c.thumbwidth,e=c.thumbheight,f=c.extmetadata.ImageDescription.value;return{url:b,src:a,description:f,width:d,height:e}}catch(a){}}).filter(a=>"undefined"!=typeof a)).catch(a=>console.error(a))},renderCats=(a,b,c)=>{var d=Math.floor;const e=document.createDocumentFragment();a.forEach((c,f)=>{var g=Math.round;const h=document.importNode(b.content,!0),i=h.querySelector("figure img");i.alt=`Illustrative ${search.value.toLowerCase()} image`,i.classList.add("lazyload"),i.dataset.src=c.src;const j=h.querySelector("figcaption");j.textContent=(j.innerHTML=c.description,j.textContent);const k=h.querySelector(".stars");k.textContent=`Cuteness rating: ${"\uD83D\uDE3B".repeat(d(5*Math.random())+1)}`;const l=h.querySelector(".price");l.textContent=`Price range: ${"\uD83D\uDCB0".repeat(d(3*Math.random())+1)}`;const m=h.querySelector(".outlink");m.href=`./forward.html?url=${encodeURIComponent(c.url)}`,m.textContent="View Deal";const a=h.querySelector(".tabs");a.addEventListener("click",()=>{lazyLoadInit(a)});const n=a.querySelectorAll("label");a.querySelectorAll("input").forEach((a,b)=>{const c=Math.random().toString().substr(2);a.name=`tabgroup${f}`,a.id=c,n[b].setAttribute("for",c)});const o=a.querySelector(".map"),p=g(1e5*(90*((.5>Math.random()?-1:1)*Math.random())))/1e5,q=g(1e5*(180*((.5>Math.random()?-1:1)*Math.random())))/1e5;o.dataset.src=`https://maps.googleapis.com/maps/api/staticmap
        ?autoscale=1
        &size=200x150
        &maptype=terrain
        &key=AIzaSyBWZnCRi6oar3MTjR0HkR1lK52_mTe0Rks
        &format=png
        &markers=size:small%7Ccolor:0xfffb00%7C${p},${q}`.replace(/\n\s*/g,""),o.alt=`Map centered on latitude ${p} and longitude ${q}`,a.querySelector(".lat").textContent=p,a.querySelector(".long").textContent=q,e.appendChild(h)}),c.innerHTML="",c.appendChild(e)},loadOffers=a=>{const b=document.createDocumentFragment(),c=`https://www.random.org/integers/
      ?num=${Math.floor(5*Math.random())+2}
      &min=5&max=20&col=1&base=10&format=plain&rnd=new`.replace(/\n\s*/g,"");fetch(c).then(a=>{if(!a.ok)throw new TypeError(`Could not load ${c}`);return a.text()}).then(c=>{let d=c.split(/\n/g);d.splice(-1,1),d.map(a=>isNaN(parseInt(a,10))?a:parseInt(a+"9",10)).sort((c,a)=>c-a).map((a,c)=>{const d=document.createElement("li");d.textContent=/\d+/.test(a)?`From $${a} at Affiliate ${c}`:a,b.appendChild(d)}),a.innerHTML="",a.appendChild(b)}).catch(a=>console.error(a))},loadReviews=a=>{var b=Math.floor;const c=document.createDocumentFragment(),d=[];for(let c=0,e=b(6*Math.random())+2;c<e;c++){const a=`https://baconipsum.com/api/?type=all-meat&paras=${b(3*Math.random())+1}&start-with-lorem=1&random=${c}`;d[c]=fetch(a).then(b=>{if(!b.ok)throw new TypeError(`Could not load ${a}`);return b.json()}).then(a=>`<li>${a.map(a=>`<p>${a}</p>`).join("")}</li>`).catch(a=>console.error(a))}Promise.all(d).then(a=>a.join("")).then(b=>{const d=document.createElement("ul");d.innerHTML=b,c.appendChild(d),a.innerHTML="",a.appendChild(c)})},loadPhotos=a=>{var b=Math.floor;const c=document.createDocumentFragment(),d=document.createElement("div");d.classList.add("gallery"),c.appendChild(d);const e=[];for(let c=0,d=b(15*Math.random())+2;c<d;c++){const a=10*(b(10*Math.random())+10),d=10*(b(5*Math.random())+10),f=`https://placekitten.com/${a}/${d}?random=${c}`;e[c]=fetch(f).then(a=>{if(!a.ok)throw new TypeError(`Could not load ${f}`);return a.blob()}).then(b=>({width:a,height:d,blob:b}))}Promise.all(e).then(b=>{b.forEach(a=>{const b=new Image(a.width,a.height);b.alt=`Illustrative ${search.value.toLowerCase()} image`,b.src=URL.createObjectURL(a.blob),d.appendChild(b)}),a.innerHTML="",a.appendChild(c)}).catch(a=>console.error(a))},lazyLoadInit=(a=!1)=>{const b=a?a.querySelectorAll(".lazyload"):document.querySelectorAll(".lazyload");b.forEach(a=>{observer.observe(a)})};window.addEventListener("offline",()=>{offline.hidden=!1,search.disabled=!0,button.disabled=!0}),window.addEventListener("online",()=>{offline.hidden=!0,search.disabled=!1,button.disabled=!1,"false"===main.dataset.hydrated&&init(),lazyLoadInit()});const firstTimeSetup=()=>{document.querySelector("form").addEventListener("submit",a=>{a.preventDefault(),init()});for(let a=0;3>a;a++){const b=template.content,c=b.querySelectorAll("label");b.querySelectorAll("input").forEach((b,d)=>{const e=Math.random().toString().substr(2);b.name=`tabgroup${a}`,b.id=e,c[d].setAttribute("for",e)}),main.appendChild(document.importNode(b,!0))}const a=navigator.onLine;offline.hidden=a,search.disabled=!a,button.disabled=!a,a&&init(),"serviceWorker"in navigator&&navigator.serviceWorker.register("./sw.js").then(a=>{console.log(`Service worker registered for scope ${a.scope}`),a.onupdatefound=cachePolyfills}).catch(a=>console.error(a))},cachePolyfills=async()=>{const a=async a=>{const b=new Request(a,{mode:"no-cors"});return fetch(b).then(a=>{if(!a.ok)throw new TypeError("Bad response status");return c.put(b,a)})},b=await caches.keys(),c=await caches.open(b.filter(a=>/^offline_/.test(a))[0]);for(let b=0;b<localStorage.length;b++){const c=localStorage.key(b);"polyfill"===localStorage.getItem(c)&&("IntersectionObserver"===c?a("https://unpkg.com/intersection-observer@0.5.0/intersection-observer.js"):"PWACompat"===c?a("https://cdn.jsdelivr.net/npm/pwacompat@2.0.7/pwacompat.min.js"):"URLSearchParams"===c?a("https://unpkg.com/url-search-params@1.1.0/build/url-search-params.js"):void 0)}},init=async()=>{const a=search.value||"Felis_silvestris_catus",b=await getCats(a);b&&b.length&&(main.dataset.hydrated="true",renderCats(b,template,main)),lazyLoadInit()};firstTimeSetup();