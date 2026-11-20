/* ===== TREINO COM AULA: base comum =====
 Cada tema se registra com TREINO.tema({id, s, nome, aula, gen}).
   s: 0 = Português, 1 = Matemática, 2 = Ciências
   aula: HTML da explicação do conteúdo (texto fixo, escrito aqui)
   gen(): sorteia uma questão nova e devolve
     {q: enunciado, como: passo a passo para resolver (aparece junto do enunciado),
      c: alternativa correta, w: [4 erradas], e: resolução completa,
      xs?: [motivo de cada errada, na ordem de w], def?: {alternativa: explicação},
      g?: [[palavra, significado], ...] (dicionário), fig?: HTML (figura), t?: texto de apoio}
 As questões são mais fáceis que as da prova e são geradas na hora: números e itens sorteados. */
window.TREINO = (function(){
  const temas = [];
  const R = n => Math.floor(Math.random()*n);
  const pick = a => a[R(a.length)];
  const rint = (a,b) => a + R(b-a+1);
  function mix(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){ const j=R(i+1); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  const sample = (a,n) => mix(a).slice(0,n);
  // número no formato brasileiro (vírgula decimal)
  const N = x => { const v=Math.round(x*1000)/1000; return v.toLocaleString("pt-BR",{maximumFractionDigits:3}).replace("-","−"); };
  const SUP={"0":"⁰","1":"¹","2":"²","3":"³","4":"⁴","5":"⁵","6":"⁶","7":"⁷","8":"⁸","9":"⁹","-":"⁻"};
  const sup = n => String(n).split("").map(c=>SUP[c]||c).join("");
  const reais = x => "R$ "+x.toFixed(2).replace(".",",");
  const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

  /* 4 erradas distintas entre si e diferentes da correta, na ordem de preferência; completa com extra() */
  function quatro(c, cands, extra){
    const out=[], vistos=new Set([String(c)]);
    const add = x => { if(x===undefined||x===null) return; const k=String(x); if(out.length<4 && k!=="" && !vistos.has(k)){ vistos.add(k); out.push(x); } };
    cands.forEach(add);
    let guarda=0; while(out.length<4 && extra && guarda++<300) add(extra());
    return out;
  }
  /* Erradas numéricas: primeiro os erros típicos, depois vizinhos da resposta.
     u = unidade ("cm", "°C"...), neg = aceita negativos */
  function numW(c, erros, u, neg, passo){
    const f = x => N(x)+(u?" "+u:"");
    passo = passo || Math.max(1, Math.round(Math.abs(c)/8));
    const ok = x => isFinite(x) && (neg || x>0 || c===0) && Math.abs(x-c)>1e-9 && (Math.abs(x)>=0.001 || x===0);
    return quatro(f(c), erros.filter(ok).map(f), ()=>{ const x=c+(R(2)?1:-1)*rint(1,4)*passo; return ok(x)?f(x):null; });
  }
  const fmtU = (x,u) => N(x)+(u?" "+u:"");
  /* respostas de outras linhas de uma tabela, sem repetir */
  function outras(linhas, atual, f){
    const alvo=f(atual), vist=new Set([alvo]), r=[];
    mix(linhas).forEach(l=>{ const v=f(l); if(!vist.has(v)){ vist.add(v); r.push(v); } });
    return r;
  }
  function gcd(a,b){ while(b){ [a,b]=[b,a%b]; } return Math.abs(a); }
  const lcm = (a,b) => a/gcd(a,b)*b;
  function fr(n,d){ if(d<0){n=-n;d=-d;} const g=gcd(n,d)||1; n/=g; d/=g; return d===1?String(n):n+"/"+d; }

  /* Triângulo retângulo em SVG. Ângulo marcado no vértice da esquerda, ângulo reto embaixo à direita.
     lados: {hor, ver, hip} = rótulos; cores opcionais para a aula de trigonometria */
  function triangulo(o){
    o=o||{};
    const c=o.cores||{};
    const lado=(x1,y1,x2,y2,cor)=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+(cor||"currentColor")+'" stroke-width="3" stroke-linecap="round"/>';
    const txt=(x,y,s,cor,anc)=>s?'<text x="'+x+'" y="'+y+'" fill="'+(cor||"currentColor")+'" font-size="15" font-weight="700" text-anchor="'+(anc||"middle")+'">'+esc(s)+'</text>':'';
    return '<svg class="fig" viewBox="0 0 420 200" role="img" aria-label="Triângulo retângulo">'+
      lado(40,165,260,165,c.hor)+lado(260,165,260,35,c.ver)+lado(40,165,260,35,c.hip)+
      '<rect x="246" y="151" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5"/>'+
      '<path d="M 82 165 A 42 42 0 0 0 76 144" fill="none" stroke="currentColor" stroke-width="2"/>'+
      txt(92,155,o.ang,null,"start")+
      txt(150,188,o.hor,c.hor)+txt(270,105,o.ver,c.ver,"start")+txt(135,88,o.hip,c.hip,"end")+
      (o.vert?txt(28,180,"A")+txt(272,180,"B")+txt(268,30,"C","","start"):"")+
      '</svg>';
  }

  function tema(t){ temas.push(t); }
  return {temas, tema, sup, reais, R, pick, rint, mix, sample, N, esc, quatro, numW, fmtU, outras, gcd, lcm, fr, triangulo};
})();
