
let sections = [];
fetch('sections.json').then(r=>r.json()).then(data=>{
  sections=data;
  renderNav();
  renderContent();
});

function renderNav(filter=''){
  const nav=document.getElementById('toc');
  nav.innerHTML='';
  const cats={};
  sections.forEach(s=>{
    if(filter && !JSON.stringify(s).toLowerCase().includes(filter.toLowerCase())) return;
    if(!cats[s.category]) cats[s.category]=[];
    cats[s.category].push(s);
  });
  Object.keys(cats).forEach(cat=>{
    const d=document.createElement('div');
    d.innerHTML=`<div class="cat">${cat}</div>`+cats[cat].map(s=>`<a href="#${s.id}">${s.icon||''} ${s.title}</a>`).join('');
    nav.appendChild(d);
  });
}

function renderContent(filter=''){
  const main=document.getElementById('content');
  main.innerHTML='';
  sections.forEach(s=>{
    if(filter && !JSON.stringify(s).toLowerCase().includes(filter.toLowerCase())) return;
    const sec=document.createElement('section');
    sec.id=s.id;
    sec.innerHTML=`<span class="badge">${s.category}</span><h2>${s.title}</h2><div>${s.content}</div>`;
    main.appendChild(sec);
  });
}

document.getElementById('search').addEventListener('input', e=>{
  renderNav(e.target.value);
  renderContent(e.target.value);
});
