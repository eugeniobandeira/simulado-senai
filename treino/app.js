/* ===== TREINO COM AULA: tela =====
 Usa do index.html: show(), lsGet(), lsSet(), LETRAS, BLOCOS, renderGlossario(). */
(function(){
const T=window.TREINO, $=id=>document.getElementById(id), esc=T.esc;
const LS_AULA="senaiSim.aula.v1";       // acertos por tema: {id:{n,ok}}
let est=lsGet(LS_AULA,{}); if(!est||typeof est!=="object") est={};
let ses=null;

const porId=id=>T.temas.find(t=>t.id===id);
const pctTema=id=>{ const o=est[id]; return o&&o.n?Math.round(o.ok/o.n*100):null; };
const temasDe=d=>T.temas.filter(t=>d==="all"||t.s===+d);

function montaSelTema(){
  const d=$("aDisc").value, sel=$("aTemaSel"), atual=sel.value;
  let h='<option value="">🎲 Tema sorteado (muda a cada questão)</option>';
  [0,1,2].forEach(s=>{
    const l=temasDe(d).filter(t=>t.s===s); if(!l.length) return;
    h+='<optgroup label="'+BLOCOS[s]+'">'+l.map(t=>{ const p=pctTema(t.id), o=est[t.id];
      return '<option value="'+t.id+'">'+esc(t.nome)+(p===null?'':' — '+o.ok+'/'+o.n+' ('+p+'%)')+'</option>'; }).join("")+'</optgroup>';
  });
  sel.innerHTML=h;
  if([...sel.options].some(o=>o.value===atual)) sel.value=atual;
  const tot=Object.values(est).reduce((a,o)=>[a[0]+o.ok,a[1]+o.n],[0,0]);
  $("aResumo").textContent=T.temas.length+" temas com aula. "+(tot[1]?"Você já respondeu "+tot[1]+" questões neste modo, com "+Math.round(tot[0]/tot[1]*100)+"% de acerto.":"Questões geradas na hora: os números e os itens mudam a cada vez.");
}

/* sorteio que favorece temas pouco treinados ou com mais erros */
function sorteiaTema(){
  const todos=temasDe(ses.disc), ult=ses.atual&&ses.atual.tema.id;
  const l=todos.length>1?todos.filter(t=>t.id!==ult):todos; // evita repetir o tema da questão anterior
  const pesos=l.map(t=>{ const p=pctTema(t.id); return p===null?3:1+(100-p)/40; });
  let r=Math.random()*pesos.reduce((a,b)=>a+b,0);
  for(let i=0;i<l.length;i++){ r-=pesos[i]; if(r<=0) return l[i]; }
  return l[l.length-1];
}

function iniciar(){
  ses={disc:$("aDisc").value, fixo:$("aTemaSel").value||null, n:0, ok:0, vistos:{}, recentes:[], atual:null};
  show("aula"); proxima();
}
function proxima(){
  const tema=ses.fixo?porId(ses.fixo):sorteiaTema();
  let q, k, tent=0;
  do{ q=tema.gen(); k=q.q+"|"+q.c; }while(ses.recentes.includes(k) && tent++<40);
  ses.recentes.push(k); if(ses.recentes.length>40) ses.recentes.shift();
  const ord=T.mix([0,1,2,3,4]);
  const alts=ord.map(j=>j?q.w[j-1]:q.c);
  const xs=ord.map(j=>j?((q.xs&&q.xs[j-1])||(q.def&&q.def[q.w[j-1]])||""):"");
  const primeira=!ses.vistos[tema.id]; ses.vistos[tema.id]=1;
  ses.atual={tema, q, alts, xs, c:ord.indexOf(0), r:-1};
  render(primeira);
  window.scrollTo(0,0);
}
function responder(i){
  const a=ses.atual; if(!a||a.r>=0) return;
  a.r=i; ses.n++; const ok=i===a.c; if(ok) ses.ok++;
  const o=est[a.tema.id]||(est[a.tema.id]={n:0,ok:0}); o.n++; if(ok) o.ok++;
  lsSet(LS_AULA,est);
  render(false);
}
function render(abrirAula){
  const a=ses.atual, q=a.q, t=a.tema;
  $("aBloco").textContent=BLOCOS[t.s];
  $("aNome").textContent=t.nome;
  $("aPlacar").textContent=ses.n?ses.ok+" de "+ses.n+" certas ("+Math.round(ses.ok/ses.n*100)+"%)":"Nenhuma respondida ainda";
  $("aAulaBody").innerHTML=t.aula;
  if(abrirAula!==false) $("aAula").open=!!abrirAula;
  $("aFig").innerHTML=q.fig||""; $("aFig").classList.toggle("hidden",!q.fig);
  $("aTexto").innerHTML=q.t||""; $("aTexto").classList.toggle("hidden",!q.t);
  $("aEnun").textContent=q.q;
  $("aComo").textContent=q.como;
  const box=$("aAlts");
  if(a.r<0){
    box.classList.remove("review"); box.innerHTML="";
    a.alts.forEach((x,i)=>{ const b=document.createElement("button"); b.className="alt";
      b.innerHTML='<span class="l">'+LETRAS[i]+'</span><span></span>'; b.lastChild.textContent=x;
      b.onclick=()=>responder(i); box.appendChild(b); });
    $("aDepois").classList.add("hidden");
  } else {
    box.classList.add("review");
    const ok=a.r===a.c;
    box.innerHTML='<div class="feedback '+(ok?"ok":"no")+'">'+(ok?"✓ Você acertou!":"✗ Você marcou "+LETRAS[a.r]+". A correta é "+LETRAS[a.c]+".")+'</div>'+
      a.alts.map((x,k)=>{ const right=k===a.c, cls=right?" right":(k===a.r?" wrong":"");
        const why=right?'<b>✓ Resposta certa.</b>':(a.xs[k]?'<b>✗ '+(k===a.r?'Sua resposta. ':'')+'</b>'+esc(a.xs[k]):(k===a.r?'<b>✗ Sua resposta.</b>':''));
        return '<div class="alt'+cls+'"><span class="l">'+LETRAS[k]+'</span><span>'+esc(x)+(why?'<span class="why">'+why+'</span>':'')+'</span></div>'; }).join("");
    $("aResol").innerHTML='<b>Resolução:</b> '+esc(q.e);
    $("aGlos").innerHTML=q.g?renderGlossario(q.g):"";
    $("aDepois").classList.remove("hidden");
    if(!ok) $("aAula").open=true; // errou: deixa a aula aberta para revisar
  }
}
function sair(){ ses=null; montaSelTema(); show("start"); }

$("aDisc").onchange=montaSelTema;
$("btnAula").onclick=iniciar;
$("aProx").onclick=proxima;
$("aSair").onclick=sair;
$("aTrocar").onclick=()=>{ ses.fixo=null; proxima(); };
document.addEventListener("keydown",e=>{
  if(!ses || $("aula").classList.contains("hidden") || e.target.tagName==="SELECT") return;
  const k=e.key.toLowerCase();
  if(["a","b","c","d","e"].includes(k)) responder("abcde".indexOf(k));
  else if(e.key==="Enter" && ses.atual && ses.atual.r>=0){ e.preventDefault(); proxima(); }
});
montaSelTema();
})();
