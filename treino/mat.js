/* ===== TREINO COM AULA: MATEMÁTICA (números sorteados a cada questão) ===== */
(function(){
const {tema, pick, rint, mix, sample, quatro, numW, N, fmtU, fr, gcd, lcm, sup, reais, triangulo, R} = TREINO;
const sinal = (v) => v<0 ? "− "+N(-v) : "+ "+N(v);           // "+ 5" ou "− 5" no meio de expressões
const par = v => v<0 ? "("+N(v)+")" : N(v);                   // negativo entre parênteses
const intOk = a => a.filter(x=>Number.isInteger(x));

/* ---------- 1. CONJUNTOS (DIAGRAMA DE VENN) ---------- */
const CTX_CONJ=[["alunos","jogam futebol","jogam vôlei","não jogam nenhum dos dois"],["pessoas","leem jornal","leem revista","não leem nenhum dos dois"],["clientes","compraram suco","compraram salgado","não compraram nenhum dos dois"],["estudantes","gostam de Matemática","gostam de Ciências","não gostam de nenhuma das duas"]];
tema({id:"m-conjuntos", s:1, nome:"Conjuntos e diagrama de Venn",
aula:`<p>Um <b>conjunto</b> é um grupo de elementos. Quando dois grupos têm elementos em comum, usamos o <b>diagrama de Venn</b>: dois círculos que se cruzam.</p>
<svg class="fig" viewBox="0 0 320 160" role="img" aria-label="Diagrama de Venn"><rect x="5" y="5" width="310" height="150" rx="10" fill="none" stroke="currentColor"/><circle cx="120" cy="80" r="58" fill="none" stroke="currentColor" stroke-width="2.5"/><circle cx="200" cy="80" r="58" fill="none" stroke="currentColor" stroke-width="2.5"/><text x="88" y="85" font-size="13" fill="currentColor" text-anchor="middle">só A</text><text x="160" y="85" font-size="13" fill="currentColor" text-anchor="middle" font-weight="700">A e B</text><text x="232" y="85" font-size="13" fill="currentColor" text-anchor="middle">só B</text><text x="280" y="145" font-size="12" fill="currentColor" text-anchor="middle">nenhum</text><text x="70" y="30" font-size="14" fill="currentColor" font-weight="700">A</text><text x="245" y="30" font-size="14" fill="currentColor" font-weight="700">B</text></svg>
<ul><li><b>Intersecção (A ∩ B)</b>: o meio, quem está nos dois.</li><li><b>União (A ∪ B)</b>: tudo dentro dos círculos (pelo menos um).</li><li>Fora dos círculos: quem não está em nenhum.</li></ul>
<h4>A fórmula que resolve quase tudo</h4><p><b>Total = A + B − (A e B) + nenhum</b></p><p>Por que subtrair? Quem está nos dois foi contado <b>duas vezes</b>: uma em A e outra em B.</p>
<h4>Exemplo</h4><p>Turma de 30: 18 jogam futebol, 15 vôlei, 5 nenhum. Quantos jogam os dois?</p><ol><li>Pelo menos um esporte: 30 − 5 = 25.</li><li>Soma dos grupos: 18 + 15 = 33.</li><li>Sobra de 33 − 25 = <b>8</b>: é quem foi contado duas vezes, ou seja, os dois esportes.</li></ol>
<p><b>Dica:</b> sempre comece preenchendo o <b>meio</b> do diagrama. “Só A” = A − meio.</p>`,
gen(){
  const [quem,a,b,nen]=pick(CTX_CONJ), ambos=rint(3,12), soA=rint(3,15), soB=rint(3,15), nenhum=rint(0,8);
  const A=soA+ambos, B=soB+ambos, T=soA+soB+ambos+nenhum, t=R(3);
  if(t===0) return {q:"Em um grupo de "+T+" "+quem+", "+A+" "+a+", "+B+" "+b+" e "+nenhum+" "+nen+". Quantos fazem as duas coisas?",
    como:"1) Quem faz pelo menos uma = "+T+" − "+nenhum+". 2) Some os dois grupos: "+A+" + "+B+". 3) Quem faz as duas foi contado duas vezes: é a diferença entre a soma e o resultado do passo 1.",
    c:N(ambos), w:numW(ambos,[A+B-T,T-nenhum,A+B,nenhum,soA]), e:"Pelo menos uma: "+T+" − "+nenhum+" = "+(T-nenhum)+". Soma: "+A+" + "+B+" = "+(A+B)+". As duas: "+(A+B)+" − "+(T-nenhum)+" = "+ambos+"."};
  if(t===1) return {q:"Em um grupo de "+T+" "+quem+", "+A+" "+a+", "+B+" "+b+" e "+ambos+" fazem as duas coisas. Quantos "+nen+"?",
    como:"Use Total = A + B − (os dois) + nenhum. Calcule primeiro quantos fazem pelo menos uma: "+A+" + "+B+" − "+ambos+". O que faltar para chegar a "+T+" é o “nenhum”.",
    c:N(nenhum), w:numW(nenhum,[T-A-B+2*ambos,Math.abs(T-A-B),ambos,T-A]), e:"Pelo menos uma: "+A+" + "+B+" − "+ambos+" = "+(A+B-ambos)+". Nenhum: "+T+" − "+(A+B-ambos)+" = "+nenhum+"."};
  return {q:"Em um grupo, "+A+" "+quem+" "+a+" e, desses, "+ambos+" também "+b+". Quantos "+a+" mas NÃO "+b+"?",
    como:"No diagrama, o círculo A tem duas partes: o meio (os dois) e o “só A”. Então: só A = A − meio = "+A+" − "+ambos+".",
    c:N(soA), w:numW(soA,[A+ambos,ambos,A,soA+1]), e:"Só A = "+A+" − "+ambos+" = "+soA+"."};
}});

/* ---------- 2. CONJUNTOS NUMÉRICOS ---------- */
const CN=["N (naturais)","Z (inteiros), mas não N","Q (racionais), mas não Z","I (irracionais)","não é um número real"];
const DEF_CN={"N (naturais)":"N = {0, 1, 2, 3, ...}: inteiros não negativos.","Z (inteiros), mas não N":"Z = {..., −2, −1, 0, 1, 2, ...}: inclui os negativos.","Q (racionais), mas não Z":"Q: tudo que pode ser escrito como fração a/b (decimais exatos e dízimas periódicas).","I (irracionais)":"I: decimais infinitos e sem repetição (√2, √3, π).","não é um número real":"Raiz quadrada de número negativo não existe nos reais."};
function numeroCN(tipo){
  const sq=[4,9,16,25,36,49,64,81,100,121,144], nsq=[2,3,5,6,7,8,10,11,12,13,15,17];
  switch(tipo){
    case 0: { const n=pick([rint(0,99),null]); if(n!==null) return [String(n),n+" é inteiro e não negativo"]; const k=pick(sq); return ["√"+k,"√"+k+" = "+Math.sqrt(k)+", número natural"]; }
    case 1: { if(R(2)){ const n=rint(1,50); return ["−"+n,"−"+n+" é inteiro negativo"]; } const k=pick(sq); return ["−√"+k,"−√"+k+" = −"+Math.sqrt(k)+", inteiro negativo"]; }
    case 2: { const o=pick([()=>{const b=pick([3,4,5,7,8]),a=rint(1,b-1);return [a+"/"+b,a+"/"+b+" é fração (não inteira)"];},()=>{const d=pick(["0,5","2,75","−1,25","0,125","3,6"]);return [d,d+" é decimal exato: vira fração"];},()=>{const d=pick(["0,333...","1,212121...","0,777...","2,4545..."]);return [d,d+" é dízima periódica: vira fração"];}]); return o(); }
    case 3: { if(R(3)===0) return ["π","π = 3,14159... não tem período"]; const k=pick(nsq); return ["√"+k,k+" não é quadrado perfeito, então √"+k+" tem infinitas casas sem repetição"]; }
    default: { const k=pick(sq); return ["√−"+k,"não existe número real que, ao quadrado, dê negativo"]; }
  }
}
tema({id:"m-numericos", s:1, nome:"Conjuntos numéricos (N, Z, Q, I, R)",
aula:`<p>Os números são organizados em conjuntos, um dentro do outro: <b>N ⊂ Z ⊂ Q ⊂ R</b>, e <b>I</b> (irracionais) também está dentro de R, mas fora de Q.</p>
<table><tr><th>Conjunto</th><th>O que tem</th><th>Exemplos</th></tr>
<tr><td><b>N</b> naturais</td><td>0 e os inteiros positivos</td><td>0, 1, 2, 3, 50, √49 (= 7)</td></tr>
<tr><td><b>Z</b> inteiros</td><td>N + os negativos</td><td>−3, −1, 0, 5</td></tr>
<tr><td><b>Q</b> racionais</td><td>Tudo que vira fração a/b: decimais exatos e dízimas periódicas</td><td>1/2, 0,75, −2,5, 0,333...</td></tr>
<tr><td><b>I</b> irracionais</td><td>Decimais infinitos <b>sem</b> repetição</td><td>√2, √3, √7, π</td></tr>
<tr><td><b>R</b> reais</td><td>Q + I: todos acima</td><td>—</td></tr></table>
<h4>Como decidir</h4><ol><li>Tem raiz? Calcule: se for exata (√49 = 7), trate como o resultado. Se não for (√7), é <b>irracional</b>.</li><li>Raiz quadrada de negativo (√−4) <b>não é real</b>.</li><li>Dízima <b>periódica</b> (0,333...) é racional. Decimal infinito sem padrão (3,14159...) é irracional.</li><li>Todo natural também é inteiro, racional e real. A pergunta costuma querer o <b>menor</b> conjunto.</li></ol>`,
gen(){
  if(R(2)){ const tipo=R(5), [n,e]=numeroCN(tipo);
    return {q:"O número "+n+" pertence, no máximo, a qual conjunto? (escolha o conjunto mais “restrito”)", como:"Se houver raiz, calcule-a. Depois teste em ordem: é inteiro e não negativo? (N) Inteiro negativo? (Z) Vira fração, decimal exato ou dízima periódica? (Q) Decimal infinito sem repetição? (I) Raiz de negativo? (não real)",
      c:CN[tipo], w:CN.filter((x,i)=>i!==tipo), e:e+". "+DEF_CN[CN[tipo]], def:DEF_CN}; }
  const alvo=pick([3,2,1]), [c,e]=numeroCN(alvo), w=[];
  const outros=[0,1,2,3].filter(t=>t!==alvo); let g=0;
  while(w.length<4 && g++<50){ const v=numeroCN(pick(outros))[0]; if(v!==c && !w.includes(v)) w.push(v); }
  const nomes={1:"inteiro negativo",2:"racional não inteiro",3:"irracional"};
  return {q:"Qual dos números abaixo é "+nomes[alvo]+"?", como:"Analise cada número: calcule as raízes exatas, veja se é negativo, se é fração/decimal exato/dízima (racional) ou decimal infinito sem repetição (irracional).",
    c, w, e:e+"."};
}});

/* ---------- 3. MMC E MDC ---------- */
tema({id:"m-mmc", s:1, nome:"MMC e MDC",
aula:`<h4>MMC: mínimo múltiplo comum</h4><p>É o <b>menor número que é múltiplo dos dois</b> (que aparece na “tabuada” dos dois). Use quando algo <b>se repete e volta a coincidir</b>: luzes piscando juntas, ônibus saindo juntos, remédios no mesmo horário.</p>
<p>Exemplo: MMC(6, 8). Múltiplos de 6: 6, 12, 18, <b>24</b>, 30... Múltiplos de 8: 8, 16, <b>24</b>... → MMC = 24.</p>
<h4>MDC: máximo divisor comum</h4><p>É o <b>maior número que divide os dois</b> sem sobrar resto. Use quando é preciso <b>cortar ou dividir em partes iguais, do maior tamanho possível</b>: tábuas, fitas, grupos com o mesmo número de pessoas.</p>
<p>Exemplo: MDC(12, 18). Divisores de 12: 1, 2, 3, 4, <b>6</b>, 12. Divisores de 18: 1, 2, 3, <b>6</b>, 9, 18 → MDC = 6.</p>
<h4>Método da fatoração simultânea</h4><p>Divida os dois números pelos primos (2, 3, 5, 7...) ao mesmo tempo:</p>
<table><tr><td>12, 18</td><td>2 ✓</td></tr><tr><td>6, 9</td><td>2</td></tr><tr><td>3, 9</td><td>3 ✓</td></tr><tr><td>1, 3</td><td>3</td></tr><tr><td>1, 1</td><td></td></tr></table>
<p><b>MMC</b> = produto de todos os primos: 2 × 2 × 3 × 3 = 36. <b>MDC</b> = produto só dos que dividiram os DOIS ao mesmo tempo (✓): 2 × 3 = 6.</p>
<p><b>Truque:</b> MMC × MDC = produto dos dois números (36 × 6 = 12 × 18).</p>`,
gen(){
  let a,b; do{ [a,b]=sample([4,6,8,9,10,12,14,15,16,18,20,24,30,36],2); }while(lcm(a,b)>180 || gcd(a,b)===1);
  if(a>b) [a,b]=[b,a];
  const m=lcm(a,b), d=gcd(a,b), t=R(4);
  if(t===0) return {q:"Duas luzes acabaram de piscar juntas. Uma pisca a cada "+a+" segundos e a outra a cada "+b+" segundos. Depois de quantos segundos piscarão juntas de novo?",
    como:"Algo que se repete e volta a coincidir → MMC. Liste os múltiplos de "+b+" ("+b+", "+2*b+", "+3*b+"...) e pare no primeiro que também seja múltiplo de "+a+".",
    c:fmtU(m,"s"), w:numW(m,[a*b,d,a+b,b,2*m],"s"), e:"MMC("+a+", "+b+") = "+m+". Depois de "+m+" s."};
  if(t===1) return {q:"Uma costureira tem duas fitas, de "+a+" cm e "+b+" cm. Quer cortá-las em pedaços iguais, do maior tamanho possível, sem sobras. Cada pedaço terá:",
    como:"Dividir em partes iguais, o maior possível → MDC. Procure o maior número que divide "+a+" e "+b+" sem resto.",
    c:fmtU(d,"cm"), w:numW(d,[m,a,b-a,1,a*b],"cm"), e:"MDC("+a+", "+b+") = "+d+" cm. Serão "+(a/d)+" + "+(b/d)+" = "+((a+b)/d)+" pedaços."};
  if(t===2) return {q:"Qual é o MMC de "+a+" e "+b+"?", como:"Liste os múltiplos do maior ("+b+", "+2*b+", "+3*b+"...) e pare no primeiro que "+a+" também divide. Ou fatore os dois juntos e multiplique todos os primos.",
    c:N(m), w:numW(m,[a*b,d,a+b,2*m]), e:"Múltiplos de "+b+": "+[1,2,3,4].map(k=>k*b).join(", ")+"... O primeiro divisível por "+a+" é "+m+"."};
  return {q:"Qual é o MDC de "+a+" e "+b+"?", como:"Liste os divisores de "+a+" e procure o maior que também divide "+b+".",
    c:N(d), w:numW(d,[m,a,b-a,1,2*d]), e:"O maior número que divide "+a+" e "+b+" é "+d+"."};
}});

/* ---------- 4. NÚMEROS INTEIROS ---------- */
tema({id:"m-inteiros", s:1, nome:"Números inteiros e regra de sinais",
aula:`<p>Inteiros incluem os <b>negativos</b>: ..., −3, −2, −1, 0, 1, 2, 3... Pense numa <b>reta</b> ou num <b>termômetro</b>: somar é subir, subtrair é descer.</p>
<h4>Soma e subtração</h4><ul><li>Sinais iguais: <b>soma</b> e mantém o sinal. −3 − 5 = −8; 3 + 5 = 8.</li><li>Sinais diferentes: <b>subtrai</b> e fica o sinal do maior. −8 + 3 = −5; 8 − 3 = 5.</li><li>Menos com menos vira mais: 4 − (−3) = 4 + 3 = 7.</li></ul>
<h4>Multiplicação e divisão: regra de sinais</h4>
<table><tr><th>Sinais</th><th>Resultado</th><th>Exemplo</th></tr><tr><td>+ · +</td><td>+</td><td>3 · 4 = 12</td></tr><tr><td>− · −</td><td>+</td><td>(−3) · (−4) = 12</td></tr><tr><td>+ · −</td><td>−</td><td>3 · (−4) = −12</td></tr><tr><td>− · +</td><td>−</td><td>(−12) ÷ 3 = −4</td></tr></table>
<p><b>Resumo:</b> sinais iguais dão <b>+</b>; sinais diferentes dão <b>−</b>.</p>
<h4>Ordem das operações</h4><p>1º parênteses, 2º potências e raízes, 3º multiplicação e divisão, 4º soma e subtração.</p>`,
gen(){
  const t=R(3);
  if(t===0){ const t0=rint(-10,4), s1=rint(4,14), s2=rint(2,10), f=t0+s1-s2;
    return {q:"Às 6h, a temperatura era de "+N(t0)+" °C. Até o meio-dia subiu "+s1+" °C e, à noite, caiu "+s2+" °C. Qual a temperatura à noite?",
      como:"Use a reta numérica: comece em "+N(t0)+", suba "+s1+" (some) e depois desça "+s2+" (subtraia). Faça uma conta de cada vez: "+N(t0)+" + "+s1+" = ?; depois ? − "+s2+".",
      c:fmtU(f,"°C"), w:numW(f,[t0-s1+s2,-f,t0+s1+s2,t0+s1,f+2],"°C",true), e:N(t0)+" + "+s1+" = "+N(t0+s1)+"; "+N(t0+s1)+" − "+s2+" = "+N(f)+" °C."}; }
  if(t===1){ const a=rint(2,12)*(R(2)?-1:1), b=rint(2,9)*(R(2)?-1:1), op=R(2), x=op?a:a*b;
    const txt=op?par(a)+" · "+par(b):par(x)+" ÷ "+par(b), res=op?a*b:x/b;
    return {q:"Calcule: "+txt, como:"Primeiro faça a conta sem sinal ("+Math.abs(op?a:x)+(op?" · ":" ÷ ")+Math.abs(b)+"). Depois o sinal: sinais iguais → positivo; sinais diferentes → negativo.",
      c:N(res), w:numW(res,[-res,op?a+b:x-b,op?-(a+b):b-x],"",true), e:Math.abs(op?a:x)+(op?" · ":" ÷ ")+Math.abs(b)+" = "+Math.abs(res)+". Sinais "+((op?a:x)*b>0?"iguais → +":"diferentes → −")+". Resultado: "+N(res)+"."}; }
  const a=rint(-9,9), b=rint(1,9), c=rint(-9,9), r=a-(-b)+c;
  return {q:"Qual é o valor de "+N(a)+" − (−"+b+") "+sinal(c)+"?", como:"Elimine os parênteses: menos com menos vira mais, então − (−"+b+") = + "+b+". Depois some da esquerda para a direita.",
    c:N(r), w:numW(r,[a-b+c,-(r),a+b-c,r+2],"",true), e:N(a)+" + "+b+" "+sinal(c)+" = "+N(r)+"."};
}});

/* ---------- 5. FRAÇÕES ---------- */
tema({id:"m-fracoes", s:1, nome:"Frações",
aula:`<p>Uma <b>fração</b> a/b significa: divida o inteiro em <b>b</b> partes iguais (denominador, embaixo) e pegue <b>a</b> partes (numerador, em cima). 3/4 de uma pizza = pizza em 4 pedaços, comi 3.</p>
<h4>Simplificar</h4><p>Divida em cima e embaixo pelo mesmo número: 6/8 = 3/4 (dividi por 2).</p>
<h4>Somar e subtrair</h4><ul><li>Mesmo denominador: some os numeradores. 1/5 + 2/5 = 3/5.</li><li>Denominadores diferentes: deixe todos iguais (use o MMC). 1/2 + 1/3 → MMC = 6 → 3/6 + 2/6 = <b>5/6</b>.</li><li><b>Nunca</b> some os denominadores! 1/2 + 1/3 ≠ 2/5.</li></ul>
<h4>Multiplicar e dividir</h4><ul><li>Multiplicar: em cima × em cima, embaixo × embaixo. 2/3 × 3/4 = 6/12 = 1/2.</li><li>Dividir: mantém a primeira e multiplica pelo <b>inverso</b> da segunda. 1/2 ÷ 1/4 = 1/2 × 4/1 = 2.</li></ul>
<h4>Fração de uma quantidade</h4><p>“3/5 de 40”: divida pelo de baixo e multiplique pelo de cima. 40 ÷ 5 = 8; 8 × 3 = <b>24</b>.</p>
<h4>Comparar</h4><p>Deixe com o mesmo denominador, ou transforme em decimal (divida em cima por embaixo): 3/4 = 0,75; 2/3 ≈ 0,67.</p>`,
gen(){
  const t=R(4), ext=()=>fr(rint(1,11),rint(2,12));
  if(t===0){ const b=pick([2,3,4,5,6]), d=pick([2,3,4,5,6,8].filter(x=>x!==b)), a=rint(1,b-1), c=rint(1,d-1), m=lcm(b,d);
    const resp=fr(a*d+c*b,b*d);
    return {q:"Quanto é "+a+"/"+b+" + "+c+"/"+d+"?", como:"Os denominadores são diferentes: calcule o MMC de "+b+" e "+d+" ("+m+"). Reescreva cada fração com denominador "+m+" (divida "+m+" pelo de baixo e multiplique pelo de cima). Some os numeradores e simplifique.",
      c:resp, w:quatro(resp,[fr(a+c,b+d),fr(a*c,b*d),fr(a+c,m),fr(a*d+c*b,b+d)],ext), e:a+"/"+b+" = "+(a*m/b)+"/"+m+" e "+c+"/"+d+" = "+(c*m/d)+"/"+m+". Soma: "+(a*m/b+c*m/d)+"/"+m+" = "+resp+"."}; }
  if(t===1){ const b=pick([3,4,5,6,8,10]), a=rint(1,b-1), Q=b*rint(2,12), r=Q/b*a, coisa=pick(["alunos","reais","páginas","litros","balas"]);
    return {q:"Quanto é "+a+"/"+b+" de "+Q+" "+coisa+"?", como:"Divida "+Q+" pelo denominador ("+b+") para achar o valor de cada parte. Depois multiplique pelo numerador ("+a+").",
      c:fmtU(r,coisa), w:numW(r,[Q/b,Q*a,Q-r,Q/a],coisa), e:Q+" ÷ "+b+" = "+(Q/b)+"; "+(Q/b)+" × "+a+" = "+r+" "+coisa+"."}; }
  if(t===2){ const b=pick([2,3,4,5,7]), a=rint(1,b-1), k=rint(2,6);
    return {q:"A forma mais simples (irredutível) da fração "+(a*k)+"/"+(b*k)+" é:", como:"Procure um número que divida "+(a*k)+" e "+(b*k)+" ao mesmo tempo (comece por 2, 3, 5...). Divida em cima e embaixo e repita até não dar mais.",
      c:a+"/"+b, w:quatro(a+"/"+b,[b+"/"+a,(a+1)+"/"+b,a+"/"+(b+1),(a*k)+"/"+(b*k+1)],ext), e:"Dividindo "+(a*k)+" e "+(b*k)+" por "+k+": "+a+"/"+b+"."}; }
  const fs=[]; while(fs.length<5){ const d=pick([2,3,4,5,6,8,10]), n=rint(1,d-1), v=n/d; if(!fs.some(f=>Math.abs(f[2]-v)<1e-9)) fs.push([n,d,v]); }
  const maior=fs.reduce((m,f)=>f[2]>m[2]?f:m);
  return {q:"Qual destas frações é a MAIOR?", como:"Transforme cada fração em decimal dividindo o numerador pelo denominador (ex.: 3/4 = 3 ÷ 4 = 0,75) e compare. Outra forma: deixe todas com o mesmo denominador.",
    c:maior[0]+"/"+maior[1], w:fs.filter(f=>f!==maior).map(f=>f[0]+"/"+f[1]), xs:fs.filter(f=>f!==maior).map(f=>f[0]+"/"+f[1]+" ≈ "+N(f[2])+"."), e:fs.map(f=>f[0]+"/"+f[1]+" ≈ "+N(f[2])).join("; ")+". A maior é "+maior[0]+"/"+maior[1]+"."};
}});

/* ---------- 6. DECIMAIS E DINHEIRO ---------- */
tema({id:"m-decimais", s:1, nome:"Números decimais e dinheiro",
aula:`<p>Números decimais têm vírgula: a parte da esquerda é inteira, a da direita são <b>décimos</b> (1ª casa), <b>centésimos</b> (2ª casa), <b>milésimos</b> (3ª). R$ 2,35 = 2 reais e 35 centavos.</p>
<h4>Somar e subtrair</h4><p>Coloque <b>vírgula embaixo de vírgula</b> e complete com zeros: 12,5 − 3,75 → 12,50 − 3,75 = 8,75.</p>
<h4>Multiplicar</h4><p>Multiplique como se não houvesse vírgula e depois <b>conte as casas decimais</b> dos dois números: 0,5 × 0,4 → 5 × 4 = 20 → duas casas → <b>0,20</b> = 0,2.</p>
<h4>Dividir</h4><p>Iguale as casas e tire as vírgulas: 6 ÷ 0,5 = 60 ÷ 5 = <b>12</b>.</p>
<h4>Por 10, 100, 1000</h4><p>Multiplicar: a vírgula anda para a <b>direita</b> (2,35 × 100 = 235). Dividir: anda para a <b>esquerda</b> (2,35 ÷ 10 = 0,235).</p>
<h4>Troco</h4><p>Troco = valor pago − total da compra. Some tudo primeiro, depois subtraia.</p>`,
gen(){
  const t=R(3);
  if(t===0){ const n=rint(2,3), it=Array.from({length:n},()=>rint(150,1290)/100), tot=it.reduce((a,b)=>a+b,0), pago=tot<20?20:tot<50?50:100, tr=Math.round((pago-tot)*100)/100;
    const nomes=sample(["um caderno","uma caneta","um suco","um lanche","uma borracha","uma régua"],n);
    return {q:"Ana comprou "+nomes.map((x,i)=>x+" de "+reais(it[i])).join(", ").replace(/, ([^,]*)$/," e $1")+". Pagou com uma nota de "+reais(pago)+". Qual foi o troco?",
      como:"1) Some os preços com vírgula embaixo de vírgula. 2) Troco = "+reais(pago)+" − total.",
      c:reais(tr), w:quatro(reais(tr),[reais(tr+1),reais(Math.max(0.05,tr-1)),reais(tr+0.1),reais(pago-it[0]),reais(tot)],()=>reais(Math.max(0.05,tr+rint(-30,30)/10))),
      e:"Total: "+it.map(x=>N(x)).join(" + ")+" = "+reais(tot)+". Troco: "+N(pago)+" − "+N(tot)+" = "+reais(tr)+"."}; }
  if(t===1){ const a=rint(1,9)/10, b=rint(1,9)/10, r=Math.round(a*b*100)/100;
    return {q:"Quanto é "+N(a)+" × "+N(b)+"?", como:"Multiplique sem as vírgulas ("+a*10+" × "+b*10+" = "+Math.round(a*b*100)+"). Os dois números têm 1 casa decimal cada, então o resultado tem 2 casas.",
      c:N(r), w:numW(r,[r*10,r*100,a+b,r/10],"",false,0.01), e:Math.round(a*10)+" × "+Math.round(b*10)+" = "+Math.round(a*b*100)+" → 2 casas → "+N(r)+"."}; }
  const p=rint(2,9)*10/100+rint(0,1), q=pick([2,3,4,5,6]), r=Math.round(p*q*100)/100;
  return {q:"Um pacote de figurinhas custa "+reais(p)+". Quanto custam "+q+" pacotes?", como:"Multiplique "+N(p)+" × "+q+". Faça a conta sem a vírgula e depois volte a vírgula duas casas (centavos).",
    c:reais(r), w:quatro(reais(r),[reais(p+q),reais(r*10),reais(r/10),reais(r+p)],()=>reais(r+rint(-5,5)/10)), e:N(p)+" × "+q+" = "+reais(r)+"."};
}});

/* ---------- 7. POTÊNCIAS E RAÍZES ---------- */
tema({id:"m-potencias", s:1, nome:"Potências e raízes",
aula:`<p><b>Potência</b> é multiplicação repetida: 2<sup>3</sup> = 2 × 2 × 2 = 8. O número de baixo é a <b>base</b>, o de cima é o <b>expoente</b> (quantas vezes a base se repete). <b>Cuidado:</b> 2<sup>3</sup> não é 2 × 3!</p>
<h4>Regras importantes</h4><ul><li>Expoente 0: a<sup>0</sup> = 1. Expoente 1: a<sup>1</sup> = a.</li><li>Base negativa: expoente <b>par</b> dá positivo, <b>ímpar</b> dá negativo. (−2)<sup>2</sup> = 4; (−2)<sup>3</sup> = −8.</li><li>Sem parênteses é diferente: −2<sup>2</sup> = −(2 × 2) = −4.</li><li>Potência de 10: 10<sup>n</sup> = 1 seguido de n zeros. 10<sup>4</sup> = 10 000.</li><li>Mesma base, multiplicando: <b>soma</b> os expoentes. 2<sup>3</sup> · 2<sup>4</sup> = 2<sup>7</sup>. Dividindo: <b>subtrai</b>. 5<sup>6</sup> ÷ 5<sup>2</sup> = 5<sup>4</sup>.</li><li>Potência de potência: <b>multiplica</b>. (3<sup>2</sup>)<sup>3</sup> = 3<sup>6</sup>.</li></ul>
<h4>Raiz quadrada</h4><p>√a é o número que, multiplicado por ele mesmo, dá a. √49 = 7, porque 7 × 7 = 49. Decore os quadrados perfeitos: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144.</p>`,
gen(){
  const t=R(4);
  if(t===0){ const b=rint(2,6), e=rint(2,b<=3?5:3), r=b**e;
    return {q:"Qual é o valor de "+b+sup(e)+"?", como:"Potência é multiplicação repetida: escreva "+b+" multiplicado por ele mesmo "+e+" vezes ("+Array(e).fill(b).join(" × ")+") e faça a conta. Não confunda com "+b+" × "+e+".",
      c:N(r), w:numW(r,[b*e,b**(e-1),b+e,e**b]), e:Array(e).fill(b).join(" × ")+" = "+r+"."}; }
  if(t===1){ const b=rint(2,5), e=rint(2,4), r=(-b)**e;
    return {q:"Qual é o valor de (−"+b+")"+sup(e)+"?", como:"Calcule "+b+sup(e)+" normalmente. Depois o sinal: base negativa com expoente par dá positivo; com expoente ímpar dá negativo.",
      c:N(r), w:numW(r,[-r,-b*e,b*e,r+1],"",true), e:"(−"+b+")"+sup(e)+" = "+Array(e).fill("(−"+b+")").join(" · ")+" = "+N(r)+" (expoente "+(e%2?"ímpar → negativo":"par → positivo")+")."}; }
  if(t===2){ const b=pick([2,3,5,7,10]), m=rint(2,6), n=rint(2,6), op=R(2);
    const r=op?m+n:Math.max(m,n)-Math.min(m,n), M=Math.max(m,n), Nn=Math.min(m,n);
    const enun=op?b+sup(m)+" · "+b+sup(n):b+sup(M)+" ÷ "+b+sup(Nn), cc=b+sup(r);
    return {q:"Simplifique: "+enun, como:"Mesma base: na multiplicação, conserve a base e SOME os expoentes; na divisão, conserve a base e SUBTRAIA.",
      c:cc, w:quatro(cc,[b+sup(op?m*n:M+Nn),(b*b)+sup(op?m+n:M-Nn),b+sup(op?m-n:M*Nn),(b*2)+sup(r)].filter(x=>x!==b+sup(0)),()=>b+sup(rint(1,12))), e:"Conserva a base "+b+" e "+(op?"soma: "+m+" + "+n:"subtrai: "+M+" − "+Nn)+" = "+r+". Resultado: "+cc+"."}; }
  const a=rint(2,12), b2=rint(1,4), r=a+b2**2;
  return {q:"Calcule √"+(a*a)+" + "+b2+sup(2)+".", como:"Primeiro resolva a raiz (que número vezes ele mesmo dá "+a*a+"?) e a potência ("+b2+" × "+b2+"). Depois some.",
    c:N(r), w:numW(r,[a*a+b2*2,a+b2*2,a*2+b2**2,a*a+b2**2]), e:"√"+(a*a)+" = "+a+" e "+b2+sup(2)+" = "+b2**2+". Soma: "+r+"."};
}});

/* ---------- 8. NOTAÇÃO CIENTÍFICA ---------- */
function grupos(n){ return String(n).replace(/\B(?=(\d{3})+(?!\d))/g," "); }
tema({id:"m-notacao", s:1, nome:"Notação científica",
aula:`<p>Serve para escrever números <b>muito grandes ou muito pequenos</b> de forma curta: <b>a × 10<sup>n</sup></b>, com <b>a entre 1 e 10</b> (pode ser 1, mas tem de ser menor que 10).</p>
<h4>Números grandes (expoente positivo)</h4><p>Ande com a vírgula para a <b>esquerda</b> até sobrar um só algarismo antes dela. Conte quantas casas andou: esse é o expoente.</p><p>150 000 000 → 1,50000000 → andou 8 casas → <b>1,5 × 10<sup>8</sup></b>.</p>
<h4>Números pequenos (expoente negativo)</h4><p>Ande com a vírgula para a <b>direita</b> até passar o primeiro algarismo diferente de zero. O expoente fica negativo.</p><p>0,00032 → 3,2 → andou 4 casas → <b>3,2 × 10<sup>−4</sup></b>.</p>
<h4>Pegadinha</h4><p>15 × 10<sup>7</sup> tem o mesmo valor que 1,5 × 10<sup>8</sup>, mas <b>não está</b> em notação científica, porque 15 não está entre 1 e 10.</p>`,
gen(){
  const m=pick([1.2,1.5,2,2.5,3,3.6,4,4.8,5,6,7.5,8,9]), e=rint(3,9), neg=R(3)===0;
  const ms=N(m), cc=ms+" × 10"+sup(neg?-e:e);
  let num;
  if(neg){ const dig=String(m).replace(".",""); num="0,"+"0".repeat(e-1)+dig; }
  else num=grupos(Math.round(m*10**e));
  const w=quatro(cc,[ms+" × 10"+sup(neg?-(e+1):e+1),ms+" × 10"+sup(neg?-(e-1):e-1),N(m*10)+" × 10"+sup(neg?-(e+1):e-1),ms+" × 10"+sup(neg?e:-e)]);
  return {q:(neg?"O diâmetro de uma célula é de cerca de ":"A distância entre duas cidades do universo de um jogo é de ")+num+(neg?" m":" km")+". Em notação científica, esse número é:",
    como:"Mova a vírgula até ficar só um algarismo (diferente de zero) antes dela: o número tem de ficar entre 1 e 10. Conte quantas casas a vírgula andou: "+(neg?"para a DIREITA → expoente negativo.":"para a ESQUERDA → expoente positivo."),
    c:cc, w, e:num+" → a vírgula anda "+e+" casas para a "+(neg?"direita":"esquerda")+" → "+cc+"."};
}});

/* ---------- 9. RAZÃO, PROPORÇÃO E ESCALA ---------- */
tema({id:"m-razao", s:1, nome:"Razão, proporção e escala",
aula:`<p><b>Razão</b> é uma comparação por divisão: “3 meninas para cada 2 meninos” = 3/2 ou 3 : 2.</p>
<p><b>Proporção</b> é uma igualdade entre duas razões: 2/3 = 4/6. Propriedade fundamental: <b>produto dos meios = produto dos extremos</b> (multiplicação em cruz): 2 × 6 = 3 × 4.</p>
<h4>Regra de três simples direta</h4><p>Quando uma grandeza aumenta e a outra <b>aumenta junto</b> (mais quilos → mais caro), é direta. Monte a tabela e multiplique em cruz:</p>
<table><tr><th>kg</th><th>R$</th></tr><tr><td>3</td><td>12</td></tr><tr><td>5</td><td>x</td></tr></table><p>3x = 5 × 12 → 3x = 60 → x = <b>20</b>.</p>
<h4>Escala</h4><p>Escala 1 : 100 000 quer dizer: <b>1 cm no mapa = 100 000 cm na realidade</b> = 1 000 m = 1 km.</p><p>Lembre: 1 km = 1 000 m = 100 000 cm. Então divida os centímetros por 100 000 para obter km.</p>`,
gen(){
  const t=R(3);
  if(t===0){ const k=pick([100000,200000,250000,500000,1000000]), d=rint(2,12), km=d*k/100000;
    return {q:"Em um mapa com escala 1 : "+grupos(k)+", a distância entre duas cidades é de "+d+" cm. Qual é a distância real?",
      como:"Escala 1 : "+grupos(k)+" = 1 cm no mapa vale "+grupos(k)+" cm reais. Multiplique "+d+" × "+grupos(k)+" (resultado em cm) e divida por 100 000 para passar para km.",
      c:fmtU(km,"km"), w:numW(km,[km*10,km/10,d*k/1000,km*100,d+k/100000],"km"), e:d+" × "+grupos(k)+" = "+grupos(d*k)+" cm = "+N(km)+" km."}; }
  if(t===1){ const q1=rint(2,6), pu=rint(2,9), q2=rint(2,12); if(q2===q1) return this.gen(); const p1=q1*pu, p2=q2*pu, obj=pick(["kg de arroz","metros de tecido","litros de suco","cadernos"]);
    return {q:q1+" "+obj+" custam "+reais(p1)+". Quanto custam "+q2+" "+obj+"?", como:"Mais quantidade → mais caro: proporção direta. Monte "+q1+" → "+p1+" e "+q2+" → x, e multiplique em cruz: "+q1+" · x = "+q2+" · "+p1+". Ou ache o preço de 1 unidade ("+p1+" ÷ "+q1+").",
      c:reais(p2), w:quatro(reais(p2),[reais(p1*q1/q2),reais(p1+q2),reais(pu),reais(p2+pu)],()=>reais(p2+rint(-5,5))), e:"1 unidade: "+p1+" ÷ "+q1+" = "+pu+". "+q2+" × "+pu+" = "+reais(p2)+"."}; }
  const a=rint(2,9), b=rint(2,9), k=rint(2,6); if(a===b) return this.gen(); const g=gcd(a,b);
  return {q:"Em uma sala há "+(a*k)+" meninas e "+(b*k)+" meninos. A razão entre o número de meninas e o de meninos, na forma mais simples, é:", como:"Razão = primeiro ÷ segundo, na ordem pedida: "+(a*k)+"/"+(b*k)+". Simplifique dividindo os dois pelo mesmo número.",
    c:(a/g)+"/"+(b/g), w:quatro((a/g)+"/"+(b/g),[(b/g)+"/"+(a/g),(a*k)+"/"+((a+b)*k),fr(a,a+b),(a/g+1)+"/"+(b/g)]), e:(a*k)+"/"+(b*k)+" = "+(a/g)+"/"+(b/g)+"."};
}});

/* ---------- 10. REGRA DE TRÊS INVERSA ---------- */
tema({id:"m-inversa", s:1, nome:"Regra de três inversa",
aula:`<p>Duas grandezas são <b>inversamente proporcionais</b> quando uma <b>aumenta</b> e a outra <b>diminui</b> na mesma proporção.</p><ul><li>Mais pedreiros → <b>menos</b> dias para terminar a obra.</li><li>Mais velocidade → <b>menos</b> tempo de viagem.</li><li>Mais torneiras → <b>menos</b> tempo para encher.</li></ul>
<h4>Como resolver</h4><p>Na inversa, o <b>produto</b> das duas grandezas é constante: 5 pedreiros × 12 dias = 60 “dias-pedreiro”. Com 10 pedreiros: 60 ÷ 10 = <b>6 dias</b>.</p>
<p>Ou, com a tabela: <b>inverta uma das colunas</b> e multiplique em cruz.</p>
<h4>Como saber se é direta ou inversa?</h4><p>Pergunte: “se eu <b>dobrar</b> uma, a outra dobra ou cai pela metade?” Dobrou junto → direta. Caiu pela metade → inversa.</p>`,
gen(){
  if(R(2)){ let w1,d1,w2; do{ w1=rint(2,8); d1=rint(4,30); w2=rint(2,12); }while(w2===w1 || (w1*d1)%w2);
    const d2=w1*d1/w2;
    return {q:w1+" pedreiros constroem um muro em "+d1+" dias. Mantendo o ritmo, em quantos dias "+w2+" pedreiros constroem o mesmo muro?",
      como:"Mais pedreiros → menos dias: grandezas inversas. O total de trabalho é constante: "+w1+" × "+d1+". Divida esse total pelo novo número de pedreiros ("+w2+").",
      c:fmtU(d2,"dias"), w:numW(d2,[d1*w2/w1,d1,w1*d1,d1+w2-w1].filter(x=>Number.isInteger(x)),"dias"), e:w1+" × "+d1+" = "+(w1*d1)+". "+(w1*d1)+" ÷ "+w2+" = "+d2+" dias."}; }
  let v1,t1,v2; do{ v1=pick([40,50,60,80,90,100]); t1=rint(2,6); v2=pick([40,50,60,80,90,100,120]); }while(v2===v1 || (v1*t1)%v2);
  const t2=v1*t1/v2;
  return {q:"Um carro a "+v1+" km/h faz uma viagem em "+t1+" horas. A "+v2+" km/h, quanto tempo levaria a mesma viagem?",
    como:"Mais rápido → menos tempo: inversa. Distância = velocidade × tempo = "+v1+" × "+t1+". Divida a distância pela nova velocidade.",
    c:fmtU(t2,"h"), w:numW(t2,[t1*v2/v1,t1,t1+1,v1*t1/100],"h",false,0.5), e:"Distância: "+v1+" × "+t1+" = "+(v1*t1)+" km. Tempo: "+(v1*t1)+" ÷ "+v2+" = "+N(t2)+" h."};
}});

/* ---------- 11. PORCENTAGEM ---------- */
tema({id:"m-porcent", s:1, nome:"Porcentagem, aumentos e descontos",
aula:`<p><b>Porcentagem</b> (%) é uma fração com denominador 100: 25% = 25/100 = 0,25.</p>
<h4>Calcular x% de um valor</h4><ul><li>Transforme em decimal e multiplique: 30% de 200 = 0,30 × 200 = <b>60</b>.</li><li>Ou ache 10% (divida por 10) e use: 10% de 200 = 20 → 30% = 3 × 20 = 60.</li><li>Atalhos: 50% = metade; 25% = um quarto; 10% = ÷ 10; 1% = ÷ 100.</li></ul>
<h4>Aumento e desconto</h4><ul><li>Aumento de 15%: novo = valor × <b>1,15</b> (100% + 15%).</li><li>Desconto de 20%: novo = valor × <b>0,80</b> (100% − 20%).</li><li>Aumento e desconto seguidos <b>não se anulam</b>: +10% e depois −10% de 100 → 110 → 99.</li></ul>
<h4>Qual a porcentagem?</h4><p>“12 de 40 alunos faltaram. Que porcentagem?” → 12/40 = 0,3 = <b>30%</b> (parte ÷ todo × 100).</p>`,
gen(){
  const t=R(4), p=pick([5,10,15,20,25,30,40,50,60,75]), v=pick([40,60,80,120,150,200,240,300,400,500,800]), x=p*v/100;
  if(!Number.isInteger(x)) return this.gen();
  if(t===0) return {q:"Quanto é "+p+"% de "+v+"?", como:"Ache 10% de "+v+" (divida por 10 = "+N(v/10)+") e ajuste, ou faça "+N(p/100)+" × "+v+".",
    c:N(x), w:numW(x,[v-x,p*v/10,v/p,x*10]), e:N(p/100)+" × "+v+" = "+N(x)+"."};
  if(t===1){ const n=v+x; return {q:"Um produto custava "+reais(v)+" e teve aumento de "+p+"%. Qual é o novo preço?", como:"Calcule "+p+"% de "+v+" e SOME ao preço. Ou multiplique direto por "+N(1+p/100)+".",
    c:reais(n), w:quatro(reais(n),[reais(v-x),reais(x),reais(v+p),reais(v*(1+p/10))],()=>reais(n+rint(-6,6)*5)), e:p+"% de "+v+" = "+x+". Novo preço: "+v+" + "+x+" = "+reais(n)+"."}; }
  if(t===2){ const n=v-x; return {q:"Uma camisa de "+reais(v)+" está com "+p+"% de desconto. Quanto ela custa agora?", como:"Calcule "+p+"% de "+v+" e SUBTRAIA do preço. Ou multiplique por "+N(1-p/100)+" (o que sobra: 100% − "+p+"%).",
    c:reais(n), w:quatro(reais(n),[reais(v+x),reais(x),reais(v-p),reais(Math.max(1,v-p*10))],()=>reais(Math.max(1,n+rint(-6,6)*5))), e:p+"% de "+v+" = "+x+". Preço: "+v+" − "+x+" = "+reais(n)+"."}; }
  return {q:"De "+v+" pessoas, "+x+" responderam “sim”. Que porcentagem isso representa?", como:"Porcentagem = parte ÷ todo × 100 = "+x+" ÷ "+v+" × 100.",
    c:p+"%", w:quatro(p+"%",[(100-p)+"%",x+"%",(p*2)+"%",(p/2)+"%"],()=>rint(1,19)*5+"%"), e:x+" ÷ "+v+" = "+N(p/100)+" = "+p+"%."};
}});

/* ---------- 12. JUROS SIMPLES ---------- */
tema({id:"m-juros", s:1, nome:"Juros simples",
aula:`<p><b>Juros</b> é o “aluguel” do dinheiro: quem empresta recebe a mais; quem pega emprestado paga a mais.</p>
<p><b>J = C · i · t</b></p><ul><li><b>C</b> = capital (valor inicial)</li><li><b>i</b> = taxa (em decimal: 2% = 0,02), por período</li><li><b>t</b> = tempo (no mesmo período da taxa: taxa ao mês → tempo em meses)</li></ul>
<p><b>Montante</b> (valor final) = <b>M = C + J</b>.</p>
<h4>Exemplo</h4><p>R$ 1 000 a 3% ao mês por 4 meses: J = 1 000 × 0,03 × 4 = <b>R$ 120</b>. M = 1 000 + 120 = R$ 1 120.</p>
<p><b>Dica:</b> nos juros simples, o juro de cada mês é sempre o mesmo (3% de 1 000 = 30 por mês). Basta multiplicar pelos meses.</p>`,
gen(){
  const C=pick([200,500,800,1000,1200,1500,2000,3000,5000]), i=pick([1,2,3,4,5,10]), t=rint(2,12), J=C*i*t/100;
  if(!Number.isInteger(J)) return this.gen();
  if(R(2)) return {q:"Qual é o juro simples produzido por "+reais(C)+" aplicados a "+i+"% ao mês durante "+t+" meses?",
    como:"Calcule o juro de 1 mês ("+i+"% de "+C+") e multiplique pelo número de meses ("+t+"). É a fórmula J = C · i · t.",
    c:reais(J), w:quatro(reais(J),[reais(C*i/100),reais(C+J),reais(J*10),reais(C*i*t/10)],()=>reais(J+rint(-5,5)*10)), e:"J = "+C+" × "+N(i/100)+" × "+t+" = "+reais(J)+"."};
  return {q:"Uma pessoa aplicou "+reais(C)+" a juros simples de "+i+"% ao mês por "+t+" meses. Qual o montante (valor final)?",
    como:"1) Juro de 1 mês: "+i+"% de "+C+". 2) Multiplique por "+t+" meses. 3) Montante = capital + juros.",
    c:reais(C+J), w:quatro(reais(C+J),[reais(J),reais(C+C*i/100),reais(C-J),reais(C+J*2)],()=>reais(C+J+rint(-5,5)*10)), e:"J = "+C+" × "+N(i/100)+" × "+t+" = "+J+". M = "+C+" + "+J+" = "+reais(C+J)+"."};
}});

/* ---------- 13. EXPRESSÕES ALGÉBRICAS E PRODUTOS NOTÁVEIS ---------- */
const termo=(k,v)=>k===0?"":(k<0?" − ":" + ")+(Math.abs(k)===1&&v?"":Math.abs(k))+v;
tema({id:"m-algebra", s:1, nome:"Expressões algébricas e produtos notáveis",
aula:`<p>Expressões algébricas misturam <b>números e letras</b> (as letras representam números). Para achar o <b>valor numérico</b>, troque cada letra pelo valor dado e faça as contas: se x = 3, então 2x + 1 = 2 · 3 + 1 = 7.</p>
<h4>Produtos notáveis (decore!)</h4>
<table><tr><th>Produto</th><th>Resultado</th><th>Em palavras</th></tr>
<tr><td>(a + b)²</td><td>a² + 2ab + b²</td><td>quadrado do 1º + 2 × 1º × 2º + quadrado do 2º</td></tr>
<tr><td>(a − b)²</td><td>a² − 2ab + b²</td><td>igual, com o meio negativo</td></tr>
<tr><td>(a + b)(a − b)</td><td>a² − b²</td><td>quadrado do 1º menos quadrado do 2º</td></tr></table>
<p><b>Erro clássico:</b> (x + 3)² <b>não é</b> x² + 9. Falta o termo do meio: (x + 3)² = x² + <b>6x</b> + 9.</p>
<h4>Fatoração</h4><p>É o caminho inverso: transformar soma em multiplicação.</p><ul><li><b>Fator comum</b>: 3x + 6 = 3(x + 2); x² − 5x = x(x − 5).</li><li><b>Diferença de quadrados</b>: x² − 49 = (x + 7)(x − 7).</li><li><b>Trinômio quadrado perfeito</b>: x² + 10x + 25 = (x + 5)².</li></ul>`,
gen(){
  const t=R(4), a=rint(1,9);
  if(t===0){ const x=rint(-4,6), y=rint(-4,6), p=rint(2,5), q=rint(1,5)*(R(2)?1:-1), r=p*x+q*y;
    return {q:"Qual o valor numérico de "+p+"x"+termo(q,"y")+" para x = "+N(x)+" e y = "+N(y)+"?", como:"Troque x por "+par(x)+" e y por "+par(y)+": "+p+" · "+par(x)+" "+(q<0?"−":"+")+" "+Math.abs(q)+" · "+par(y)+". Faça as multiplicações primeiro, depois a soma.",
      c:N(r), w:numW(r,[p*x+q+y,p+x+q*y,-r,p*y+q*x],"",true), e:p+" · "+par(x)+" = "+N(p*x)+"; "+Math.abs(q)+" · "+par(y)+" = "+N(Math.abs(q)*y)+". Resultado: "+N(r)+"."}; }
  if(t===1){ const neg=R(2), c="x² "+(neg?"−":"+")+" "+(2*a)+"x + "+(a*a);
    return {q:"Desenvolvendo (x "+(neg?"−":"+")+" "+a+")², obtém-se:", como:"Use (a "+(neg?"−":"+")+" b)² = a² "+(neg?"−":"+")+" 2ab + b², com a = x e b = "+a+": quadrado do primeiro, "+(neg?"menos":"mais")+" duas vezes o primeiro vezes o segundo, mais o quadrado do segundo.",
      c, w:quatro(c,["x² + "+(a*a),"x² "+(neg?"+":"−")+" "+(2*a)+"x + "+(a*a),"x² "+(neg?"−":"+")+" "+a+"x + "+(a*a),"2x "+(neg?"−":"+")+" "+(2*a),"x² "+(neg?"−":"+")+" "+(2*a)+"x − "+(a*a)]), e:"x² "+(neg?"−":"+")+" 2 · x · "+a+" + "+a+"² = "+c+"."}; }
  if(t===2){ const c="(x + "+a+")(x − "+a+")";
    return {q:"A forma fatorada de x² − "+(a*a)+" é:", como:"É uma diferença de dois quadrados: x² − "+(a*a)+" = x² − "+a+"². Use a² − b² = (a + b)(a − b).",
      c, w:quatro(c,["(x − "+a+")²","(x + "+a+")²","x(x − "+(a*a)+")","(x − "+(a*a)+")(x + 1)"]), e:a*a+" = "+a+"². Então x² − "+a+"² = "+c+"."}; }
  const k=rint(2,9), c="x(x − "+k+")";
  return {q:"Fatorando x² − "+k+"x pelo fator comum, obtém-se:", como:"Procure o que aparece nos dois termos (x² = x · x e "+k+"x = "+k+" · x): o x. Coloque-o em evidência e divida cada termo por ele.",
    c, w:quatro(c,["x(x + "+k+")",k+"x(x − 1)","(x − "+k+")²","x² (1 − "+k+")"]), e:"x² ÷ x = x e "+k+"x ÷ x = "+k+". Então x² − "+k+"x = "+c+"."};
}});

/* ---------- 14. EQUAÇÃO DO 1º GRAU ---------- */
tema({id:"m-eq1", s:1, nome:"Equação do 1º grau",
aula:`<p>Equação é uma <b>igualdade com um valor desconhecido</b> (x). Resolver é descobrir que número deixa a igualdade verdadeira.</p>
<h4>A regra da balança</h4><p>O que você faz de um lado, faz do outro. Na prática: <b>passe os números para o outro lado com a operação inversa</b>.</p><ul><li>Somando passa subtraindo (e vice-versa).</li><li>Multiplicando passa dividindo (e vice-versa).</li></ul>
<h4>Exemplo: 3x + 5 = 20</h4><ol><li>Tire o 5: 3x = 20 − 5 → 3x = 15.</li><li>Tire o 3 (que multiplica): x = 15 ÷ 3 → <b>x = 5</b>.</li><li>Confira: 3 · 5 + 5 = 20 ✓</li></ol>
<h4>Problemas com texto</h4><p>Traduza para a equação: “o dobro de um número” = 2x; “um número aumentado de 7” = x + 7; “a metade” = x/2; “o triplo de um número menos 4” = 3x − 4.</p>
<p><b>Sempre confira</b> substituindo o valor encontrado na equação original.</p>`,
gen(){
  const x=rint(-5,12), a=rint(2,9), b=rint(1,20)*(R(2)?1:-1), c=a*x+b;
  if(R(3)) return {q:"Qual é a solução da equação "+a+"x "+(b<0?"−":"+")+" "+Math.abs(b)+" = "+N(c)+"?",
    como:"1) Passe o "+Math.abs(b)+" para o outro lado com a operação inversa ("+(b<0?"somando":"subtraindo")+"). 2) Passe o "+a+" (que multiplica o x) dividindo. 3) Confira substituindo.",
    c:"x = "+N(x), w:quatro("x = "+N(x),intOk([(c+b)/a,c-b,-x,(c-b)*a,x+1]).map(v=>"x = "+N(v)),()=>"x = "+N(x+rint(-6,6))), e:a+"x = "+N(c)+" "+(b<0?"+":"−")+" "+Math.abs(b)+" = "+N(c-b)+". x = "+N(c-b)+" ÷ "+a+" = "+N(x)+"."};
  const n=rint(2,20), m=pick([2,3,4]), s=rint(1,15), r=m*n+s, nome={2:"o dobro",3:"o triplo",4:"o quádruplo"}[m];
  return {q:"Pensei em um número. Somando "+s+" a "+nome+" dele, obtive "+r+". Em que número pensei?", como:"Traduza: "+nome+" de x = "+m+"x. A equação é "+m+"x + "+s+" = "+r+". Resolva: passe o "+s+" subtraindo e o "+m+" dividindo.",
    c:N(n), w:numW(n,[(r+s)/m,r-s,(r/m)-s,n+1].filter(Number.isInteger)), e:m+"x + "+s+" = "+r+" → "+m+"x = "+(r-s)+" → x = "+n+"."};
}});

/* ---------- 15. INEQUAÇÕES ---------- */
tema({id:"m-ineq", s:1, nome:"Inequações do 1º grau",
aula:`<p>Inequação usa <b>&lt;</b> (menor), <b>&gt;</b> (maior), <b>≤</b> (menor ou igual) ou <b>≥</b> (maior ou igual). A resposta não é um número só, mas um <b>intervalo</b> de números.</p>
<h4>Resolve igual à equação, com UMA diferença</h4><p>Se você <b>multiplicar ou dividir por um número negativo</b>, o sinal <b>inverte</b>: −2x &lt; 6 → x &gt; −3.</p>
<h4>Exemplo: 2x − 7 &lt; 9</h4><ol><li>2x &lt; 9 + 7 → 2x &lt; 16.</li><li>x &lt; 8.</li><li>Maior inteiro que serve: <b>7</b> (8 não serve, pois 8 não é menor que 8).</li></ol>
<p><b>Atenção:</b> com &lt;, o próprio número do limite <b>não</b> entra; com ≤, ele <b>entra</b>.</p>`,
gen(){
  const a=rint(2,6), k=rint(-3,12), b=rint(1,15)*(R(2)?1:-1), c=a*k+b, tipo=pick(["<","≤",">","≥"]);
  const resp={"<":k-1,"≤":k,">":k+1,"≥":k}[tipo], pede=(tipo==="<"||tipo==="≤")?"MAIOR":"MENOR";
  return {q:"Qual é o "+pede+" número inteiro que satisfaz "+a+"x "+(b<0?"−":"+")+" "+Math.abs(b)+" "+tipo+" "+N(c)+"?",
    como:"Resolva como equação: passe o "+Math.abs(b)+" para o outro lado e divida por "+a+". Você vai achar x "+tipo+" um número. Depois veja se esse número "+(tipo.length===1&&tipo!=="≤"&&tipo!=="≥"?"NÃO entra (sinal sem “ou igual”)":"entra (sinal com “ou igual”)")+" e pegue o inteiro "+pede.toLowerCase()+" possível.",
    c:N(resp), w:numW(resp,[k,k-1,k+1,c-b,k+2].filter(v=>v!==resp),"",true), e:a+"x "+tipo+" "+N(c-b)+" → x "+tipo+" "+N(k)+". O "+pede.toLowerCase()+" inteiro é "+N(resp)+"."};
}});

/* ---------- 16. SISTEMAS DE EQUAÇÕES ---------- */
tema({id:"m-sistemas", s:1, nome:"Sistemas de equações",
aula:`<p>Sistema é um conjunto de <b>duas equações com duas incógnitas</b> (x e y) que valem ao mesmo tempo.</p>
<h4>Método da adição (o mais rápido quando há + y e − y)</h4><p>x + y = 10 e x − y = 4. Some as duas: 2x = 14 → x = 7. Volte numa delas: 7 + y = 10 → y = 3.</p>
<h4>Método da substituição</h4><p>Isole uma letra numa equação e coloque na outra. x + y = 10 → x = 10 − y. Na outra: (10 − y) − y = 4 → 10 − 2y = 4 → y = 3 → x = 7.</p>
<h4>Problema clássico: galinhas e coelhos</h4><p>Num quintal há 10 cabeças e 28 patas. Galinha (g) tem 2 patas; coelho (c) tem 4.</p><ul><li>g + c = 10</li><li>2g + 4c = 28</li></ul><p>Truque: se todos fossem galinhas, haveria 20 patas. Sobram 28 − 20 = 8 patas; cada coelho tem 2 patas a mais → 8 ÷ 2 = <b>4 coelhos</b> e 6 galinhas.</p>`,
gen(){
  if(R(2)){ const y=rint(1,20), x=y+rint(1,20), S=x+y, D=x-y;
    return {q:"A soma de dois números é "+S+" e a diferença entre eles é "+D+". Qual é o MAIOR número?", como:"Monte x + y = "+S+" e x − y = "+D+". Some as duas equações (o y some): 2x = "+S+" + "+D+". Divida por 2.",
      c:N(x), w:numW(x,[y,S-D,S+D,S/2].filter(Number.isInteger)), e:"2x = "+(S+D)+" → x = "+x+". (O outro é "+y+".)"}; }
  const g=rint(2,15), c=rint(1,12), H=g+c, P=2*g+4*c;
  return {q:"Num quintal há galinhas e coelhos: ao todo, "+H+" cabeças e "+P+" patas. Quantos coelhos há?", como:"Imagine que todos são galinhas: seriam "+H+" × 2 = "+2*H+" patas. As patas que sobram ("+P+" − "+2*H+") são as 2 patas extras de cada coelho: divida por 2.",
    c:N(c), w:numW(c,[g,(P-2*H),P/4,H-c+1].filter(v=>Number.isInteger(v)&&v>0)), e:P+" − "+2*H+" = "+(P-2*H)+"; "+(P-2*H)+" ÷ 2 = "+c+" coelhos (e "+g+" galinhas)."};
}});

/* ---------- 17. EQUAÇÃO DO 2º GRAU ---------- */
function poli(b,c){ return "x²"+(b?(b<0?" − ":" + ")+(Math.abs(b)===1?"":Math.abs(b))+"x":"")+(c?(c<0?" − ":" + ")+Math.abs(c):"")+" = 0"; }
const raizes=(r1,r2)=>{ const [a,b]=[r1,r2].sort((x,y)=>x-y); return a===b?"somente "+N(a):N(a)+" e "+N(b); };
tema({id:"m-eq2", s:1, nome:"Equação do 2º grau (Bhaskara)",
aula:`<p>Tem a forma <b>ax² + bx + c = 0</b> (a ≠ 0) e pode ter até <b>duas soluções</b> (raízes).</p>
<h4>Fórmula de Bhaskara</h4><ol><li><b>Δ = b² − 4ac</b> (delta)</li><li><b>x = (−b ± √Δ) ÷ 2a</b></li></ol><p>Δ &gt; 0: duas raízes diferentes. Δ = 0: uma raiz (dupla). Δ &lt; 0: nenhuma raiz real.</p>
<h4>Exemplo: x² − 5x + 6 = 0</h4><p>a = 1, b = −5, c = 6. Δ = 25 − 24 = 1. x = (5 ± 1) ÷ 2 → <b>x = 3 ou x = 2</b>.</p>
<h4>Atalho: soma e produto</h4><p>Em x² + bx + c = 0 (com a = 1): as raízes <b>somam −b</b> e <b>multiplicam c</b>. Em x² − 5x + 6: dois números que somam 5 e multiplicam 6 → 2 e 3.</p>
<h4>Equações incompletas (sem Bhaskara)</h4><ul><li><b>Sem c</b>: x² − 5x = 0 → x(x − 5) = 0 → x = 0 ou x = 5.</li><li><b>Sem b</b>: x² − 49 = 0 → x² = 49 → x = 7 ou x = −7.</li></ul>`,
gen(){
  const t=R(3);
  if(t===0){ let r1=rint(-6,8), r2=rint(-6,8); if(r1===0&&r2===0) r2=3;
    const b=-(r1+r2), c=r1*r2, cc=raizes(r1,r2);
    return {q:"Quais são as raízes da equação "+poli(b,c)+"?", como:"Atalho da soma e produto: procure dois números que SOMAM "+N(-b)+" e MULTIPLICAM "+N(c)+". Se não achar, use Bhaskara: Δ = b² − 4ac, depois x = (−b ± √Δ) ÷ 2.",
      c:cc, w:quatro(cc,[raizes(-r1,-r2),raizes(r1,-r2),raizes(-r1,r2),"somente "+N(r1+r2),raizes(r1+1,r2+1)],()=>raizes(r1+rint(-3,3),r2+rint(-3,3))), e:"Soma "+N(r1)+" + "+N(r2)+" = "+N(-b)+" e produto "+N(r1)+" × "+N(r2)+" = "+N(c)+". Raízes: "+cc+". (Δ = "+(b*b-4*c)+")"}; }
  if(t===1){ const k=rint(2,12), cc=raizes(-k,k);
    return {q:"As soluções de "+poli(0,-k*k)+" são:", como:"Não tem termo com x: isole o x². Passe o "+k*k+" para o outro lado (x² = "+k*k+") e tire a raiz. Lembre: tanto o positivo quanto o negativo, ao quadrado, dão "+k*k+".",
      c:cc, w:quatro(cc,["somente "+k,"somente "+(k*k),"0 e "+k,(k*k)+" e −"+(k*k)]), e:"x² = "+k*k+" → x = ±√"+k*k+" = ±"+k+"."}; }
  const k=rint(2,12), cc=raizes(0,k);
  return {q:"As soluções de "+poli(-k,0)+" são:", como:"Não tem termo independente: coloque x em evidência, x(x − "+k+") = 0. Um produto é zero se um dos fatores for zero.",
    c:cc, w:quatro(cc,["somente "+k,raizes(0,-k),raizes(-k,k),raizes(1,k)]), e:"x(x − "+k+") = 0 → x = 0 ou x = "+k+"."};
}});

/* ---------- 18. MEDIDAS ---------- */
const CONV=[["km","m",1000],["m","cm",100],["m","mm",1000],["cm","mm",10],["kg","g",1000],["g","mg",1000],["t","kg",1000],["L","mL",1000],["m³","L",1000],["dm³","L",1],["cm³","mL",1]];
tema({id:"m-medidas", s:1, nome:"Medidas: comprimento, massa, capacidade e volume",
aula:`<h4>Comprimento</h4><p>km → hm → dam → <b>m</b> → dm → cm → mm. Cada degrau para a direita: <b>× 10</b>. Para a esquerda: <b>÷ 10</b>.</p><p>1 km = 1 000 m · 1 m = 100 cm · 1 cm = 10 mm.</p>
<h4>Massa</h4><p>1 t (tonelada) = 1 000 kg · 1 kg = 1 000 g · 1 g = 1 000 mg.</p>
<h4>Capacidade</h4><p>1 L = 1 000 mL. (Uma garrafa de 500 mL tem meio litro.)</p>
<h4>Volume</h4><p>Volume do bloco (paralelepípedo) = comprimento × largura × altura. As unidades são cúbicas (m³, dm³, cm³). Cada degrau vale <b>× 1 000</b>.</p>
<h4>A ponte volume ↔ capacidade (cai muito!)</h4><table><tr><th>Volume</th><th>Capacidade</th></tr><tr><td>1 m³</td><td>1 000 L</td></tr><tr><td>1 dm³</td><td>1 L</td></tr><tr><td>1 cm³</td><td>1 mL</td></tr></table>
<p><b>Regra prática:</b> de unidade <b>maior para menor, multiplica</b> (o número fica maior); de <b>menor para maior, divide</b>.</p>`,
gen(){
  if(R(4)===0){ const c=rint(2,8)*10, l=rint(2,6)*10, h=rint(2,6)*10, vol=c*l*h/1000;
    return {q:"Uma caixa-d’água em forma de bloco mede "+c+" cm × "+l+" cm × "+h+" cm. Quantos litros cabem nela?", como:"Volume = comprimento × largura × altura (em cm³). Depois use 1 000 cm³ = 1 dm³ = 1 L: divida por 1 000.",
      c:fmtU(vol,"L"), w:numW(vol,[vol*1000,vol*10,vol/10,c+l+h],"L"), e:c+" × "+l+" × "+h+" = "+grupos(c*l*h)+" cm³ = "+N(vol)+" L."}; }
  const [de,para,f]=pick(CONV), inv=R(2), v=inv?pick([1,2,3,5,8,10,15,25,40,250,500,1200,2500,3000]):pick([0.5,1,1.5,2,2.5,3,4,7,12]);
  const [u1,u2,fat]=inv?[para,de,1/f]:[de,para,f], r=v*fat;
  return {q:"Quanto vale "+N(v)+" "+u1+" em "+u2+"?", como:(fat>=1?"De unidade maior para menor: MULTIPLIQUE por "+grupos(f)+".":"De unidade menor para maior: DIVIDA por "+grupos(f)+".")+" Lembre: 1 "+de+" = "+grupos(f)+" "+para+".",
    c:fmtU(r,u2), w:numW(r,[fat>=1?v/f:v*f,r*10,r/10,r*100,r/100].filter(x=>x>=0.001),u2,false,r>=1?Math.max(1,Math.round(r/4)):r), e:"1 "+de+" = "+grupos(f)+" "+para+". Então "+N(v)+" "+u1+" = "+N(r)+" "+u2+"."};
}});

/* ---------- 19. MEDIDAS DE TEMPO ---------- */
const hm=m=>{ const h=Math.floor(m/60), mi=m%60; return (h?h+"h":"")+(mi?String(mi).padStart(h?2:1,"0")+"min":(h?"":"0min")); };
const relogio=m=>{ m=((m%1440)+1440)%1440; return Math.floor(m/60)+"h"+String(m%60).padStart(2,"0"); };
tema({id:"m-tempo", s:1, nome:"Medidas de tempo",
aula:`<p>O tempo <b>não</b> é decimal: 1 hora = <b>60</b> minutos, 1 minuto = <b>60</b> segundos. Por isso não dá para fazer conta como se fosse número com vírgula.</p>
<ul><li>1 h = 60 min · 1 min = 60 s · 1 h = 3 600 s</li><li>1 dia = 24 h · 1 semana = 7 dias</li><li>Meia hora = 30 min · 1/4 de hora = 15 min · 1,5 h = 1h30min (e não 1h50!)</li></ul>
<h4>Calcular duração: use “degraus”</h4><p>Filme das 19h45 às 22h10:</p><ol><li>Até a próxima hora cheia: 19h45 → 20h00 = 15 min.</li><li>De hora cheia em hora cheia: 20h → 22h = 2 h.</li><li>O resto: 22h00 → 22h10 = 10 min.</li><li>Total: 2h + 15 + 10 = <b>2h25min</b>.</li></ol>
<h4>Converter</h4><p>Horas → minutos: × 60 (2,5 h = 2,5 × 60 = 150 min). Minutos → horas: ÷ 60 (135 min = 2 h e 15 min).</p>`,
gen(){
  if(R(2)){ const ini=rint(6*60,17*60), dur=rint(5,44)*5; const i=ini-ini%5, f=i+dur;
    const erroDec=(()=>{ const a=Math.floor(f/60)*100+f%60, b=Math.floor(i/60)*100+i%60, d=a-b; return Math.floor(d/100)*60+d%100; })();
    return {q:"Um evento começou às "+relogio(i)+" e terminou às "+relogio(f)+". Quanto tempo durou?", como:"Não subtraia como número decimal! Vá em degraus: de "+relogio(i)+" até a próxima hora cheia; depois as horas cheias; depois os minutos que sobram. Some tudo.",
      c:hm(dur), w:quatro(hm(dur),[erroDec!==dur&&erroDec>0?hm(erroDec):null,hm(dur+10),hm(Math.max(5,dur-10)),hm(dur+60),hm(Math.max(5,dur-60))],()=>hm(Math.max(5,dur+rint(-8,8)*5))),
      e:"De "+relogio(i)+" até "+relogio(f)+" passam "+dur+" minutos = "+hm(dur)+"."}; }
  if(R(2)){ const h=pick([1.5,2.5,0.75,1.25,3.5,0.25,2.25]), m=h*60;
    return {q:"Quantos minutos há em "+N(h)+" hora(s)?", como:"Multiplique por 60. Dica: 0,5 h = 30 min; 0,25 h = 15 min; 0,75 h = 45 min.",
      c:fmtU(m,"min"), w:numW(m,[h*100,Math.floor(h)*60+Math.round((h%1)*10),m+10,h*30],"min"), e:N(h)+" × 60 = "+m+" min."}; }
  const m=rint(65,400);
  return {q:"Um trabalho levou "+m+" minutos. Isso equivale a:", como:"Divida "+m+" por 60: o quociente são as horas e o resto são os minutos.",
    c:hm(m), w:quatro(hm(m),[Math.floor(m/100)+"h"+String(m%100).padStart(2,"0")+"min",hm(m+60),hm(m-30),(m/60).toFixed(1).replace(".",",")+"min"],()=>hm(m+rint(-6,6)*5)), e:m+" ÷ 60 = "+Math.floor(m/60)+" e sobram "+m%60+" → "+hm(m)+"."};
}});

/* ---------- 20. ÂNGULOS ---------- */
tema({id:"m-angulos", s:1, nome:"Ângulos",
aula:`<p>Ângulo é a “abertura” entre duas semirretas, medida em graus (°). Volta inteira = 360°; meia volta = 180°; ângulo reto = 90° (o “cantinho” do quadrado).</p>
<ul><li><b>Agudo</b>: menor que 90° · <b>Reto</b>: 90° · <b>Obtuso</b>: entre 90° e 180° · <b>Raso</b>: 180°.</li></ul>
<h4>Pares de ângulos</h4><ul><li><b>Complementares</b>: somam <b>90°</b>. Complemento de 30° = 60°.</li><li><b>Suplementares</b>: somam <b>180°</b>. Suplemento de 70° = 110°.</li><li><b>Opostos pelo vértice</b> (formados por duas retas que se cruzam, um de frente para o outro): são <b>iguais</b>.</li></ul>
<p><i>Truque: “<b>C</b>omplemento” e “<b>C</b>anto” (90°); “<b>S</b>uplemento” e “<b>S</b>emicírculo/reta” (180°).</i></p>
<h4>Triângulo</h4><p>A soma dos três ângulos internos de qualquer triângulo é <b>180°</b>.</p>
<h4>Retas paralelas cortadas por transversal</h4><p>Ângulos <b>alternos</b> e <b>correspondentes</b> são iguais. <b>Colaterais</b> (do mesmo lado) somam 180°.</p>`,
gen(){
  const t=R(4);
  if(t===0){ const a=rint(5,85); return {q:"O complemento de um ângulo de "+a+"° mede:", como:"Complementares somam 90°. Faça 90° − "+a+"°.",
    c:a===45?"45°":(90-a)+"°", w:quatro((90-a)+"°",[(180-a)+"°",(360-a)+"°",a+"°",(90+a)+"°"],()=>rint(1,170)+"°"), e:"90° − "+a+"° = "+(90-a)+"°."}; }
  if(t===1){ const a=rint(10,170); if(a===90) return this.gen(); return {q:"O suplemento de um ângulo de "+a+"° mede:", como:"Suplementares somam 180°. Faça 180° − "+a+"°.",
    c:(180-a)+"°", w:quatro((180-a)+"°",[(90-a>0?90-a:270-a)+"°",(360-a)+"°",a+"°",(180+a)+"°"],()=>rint(1,170)+"°"), e:"180° − "+a+"° = "+(180-a)+"°."}; }
  if(t===2){ const a=rint(20,100), b=rint(20,150-a), c=180-a-b;
    return {q:"Dois ângulos de um triângulo medem "+a+"° e "+b+"°. Quanto mede o terceiro?", como:"A soma dos ângulos de um triângulo é 180°. Some os dois que você conhece e subtraia de 180°.",
      c:c+"°", w:quatro(c+"°",[(360-a-b)+"°",(a+b)+"°",(90-Math.min(a,b))+"°",(c+10)+"°"],()=>rint(5,170)+"°"), e:a+" + "+b+" = "+(a+b)+"; 180 − "+(a+b)+" = "+c+"°."}; }
  const x=rint(5,20), k=rint(2,4), lado=k*x, d=rint(5,40), a=lado+d;
  return {q:"Duas retas se cruzam formando ângulos opostos pelo vértice. Um deles mede "+a+"° e o outro mede ("+k+"x + "+d+")°. Qual o valor de x?",
    como:"Ângulos opostos pelo vértice são IGUAIS. Monte a equação "+k+"x + "+d+" = "+a+" e resolva: passe o "+d+" subtraindo e o "+k+" dividindo.",
    c:N(x), w:numW(x,[(180-a-d)/k,(a+d)/k,a/k,x+5].filter(Number.isInteger)), e:k+"x + "+d+" = "+a+" → "+k+"x = "+lado+" → x = "+x+"."};
}});

/* ---------- 21. POLÍGONOS ---------- */
const POL={3:"triângulo",4:"quadrilátero",5:"pentágono",6:"hexágono",7:"heptágono",8:"octógono",9:"eneágono",10:"decágono",12:"dodecágono"};
tema({id:"m-poligonos", s:1, nome:"Polígonos e soma dos ângulos internos",
aula:`<p><b>Polígono</b> é uma figura plana fechada formada por segmentos de reta (lados).</p>
<table><tr><th>Lados</th><th>Nome</th><th>Lados</th><th>Nome</th></tr><tr><td>3</td><td>triângulo</td><td>7</td><td>heptágono</td></tr><tr><td>4</td><td>quadrilátero</td><td>8</td><td>octógono</td></tr><tr><td>5</td><td>pentágono</td><td>9</td><td>eneágono</td></tr><tr><td>6</td><td>hexágono</td><td>10</td><td>decágono</td></tr></table>
<h4>Soma dos ângulos internos</h4><p><b>S = (n − 2) × 180°</b>, em que n é o número de lados.</p><p>Por quê? De um vértice, dá para dividir o polígono em (n − 2) triângulos, e cada triângulo tem 180°. Quadrilátero: (4 − 2) × 180 = 360°.</p>
<h4>Polígono regular</h4><p>Todos os lados e ângulos iguais. Cada ângulo interno = <b>S ÷ n</b>. Hexágono regular: 720° ÷ 6 = 120°.</p>
<h4>Diagonais</h4><p><b>d = n(n − 3) ÷ 2</b>. Pentágono: 5 × 2 ÷ 2 = 5 diagonais.</p>`,
gen(){
  const n=pick([3,4,5,6,8,9,10,12]), S=(n-2)*180, t=R(3);
  if(t===0) return {q:"Qual a soma dos ângulos internos de um "+POL[n]+" ("+n+" lados)?", como:"Use S = (n − 2) × 180°, com n = "+n+": ("+n+" − 2) × 180.",
    c:S+"°", w:quatro(S+"°",[n*180+"°",(n-1)*180+"°",(n-3)*180+"°",n*90+"°"].filter(x=>x!=="0°"),()=>rint(2,12)*90+"°"), e:"("+n+" − 2) × 180 = "+(n-2)+" × 180 = "+S+"°."};
  if(t===1) return {q:"Quanto mede cada ângulo interno de um "+POL[n]+" REGULAR?", como:"1) Soma: S = ("+n+" − 2) × 180°. 2) Regular = todos os ângulos iguais: divida S por "+n+".",
    c:N(S/n)+"°", w:quatro(N(S/n)+"°",[N(360/n)+"°",S+"°",N(180/n)+"°",N((n-1)*180/n)+"°"],()=>rint(4,30)*5+"°"), e:"S = "+S+"°. "+S+" ÷ "+n+" = "+N(S/n)+"°."};
  const d=n*(n-3)/2;
  return {q:"Quantas diagonais tem um "+POL[n]+" ("+n+" lados)?", como:"Use d = n(n − 3) ÷ 2, com n = "+n+".",
    c:N(d), w:numW(d,[n*(n-3),n*(n-2)/2,n,n-3].filter(x=>x!==d)), e:n+" × ("+n+" − 3) ÷ 2 = "+n+" × "+(n-3)+" ÷ 2 = "+d+"."};
}});

/* ---------- 22. ÁREAS E PERÍMETROS ---------- */
tema({id:"m-areas", s:1, nome:"Áreas e perímetros",
aula:`<p><b>Perímetro</b> = <b>soma dos lados</b> (o “contorno”, medido em m, cm). <b>Área</b> = o espaço de dentro (medida em m², cm²).</p>
<table><tr><th>Figura</th><th>Área</th></tr>
<tr><td>Quadrado de lado ℓ</td><td>ℓ × ℓ = ℓ²</td></tr>
<tr><td>Retângulo</td><td>base × altura</td></tr>
<tr><td>Triângulo</td><td>(base × altura) ÷ 2</td></tr>
<tr><td>Paralelogramo</td><td>base × altura</td></tr>
<tr><td>Trapézio</td><td>(base maior + base menor) × altura ÷ 2</td></tr>
<tr><td>Losango</td><td>(diagonal maior × diagonal menor) ÷ 2</td></tr>
<tr><td>Círculo de raio r</td><td>π × r² (π ≈ 3,14)</td></tr></table>
<p><b>Comprimento da circunferência</b> (o contorno do círculo): C = 2 × π × r.</p>
<h4>Pisos e azulejos</h4><p>Quantas peças cobrem um chão? Divida a <b>área do chão</b> pela <b>área de uma peça</b>, nas mesmas unidades. Sala 6 m × 4 m = 24 m²; peça 0,5 × 0,5 = 0,25 m² → 24 ÷ 0,25 = 96 peças.</p>
<p><b>Erro comum:</b> esquecer de dividir por 2 no triângulo, ou confundir área com perímetro.</p>`,
gen(){
  const t=R(6);
  if(t===0){ const b=rint(3,20), h=rint(2,15), A=b*h, P=2*(b+h), pa=R(2);
    return {q:"Um terreno retangular mede "+b+" m por "+h+" m. Qual é "+(pa?"o seu perímetro":"a sua área")+"?", como:pa?"Perímetro = soma dos 4 lados: "+b+" + "+h+" + "+b+" + "+h+" (ou 2 × ("+b+" + "+h+")).":"Área do retângulo = base × altura = "+b+" × "+h+".",
      c:pa?fmtU(P,"m"):fmtU(A,"m²"), w:pa?numW(P,[A,b+h,4*b,P+2],"m"):numW(A,[P,b+h,A/2,A+b],"m²"), e:pa?"2 × ("+b+" + "+h+") = "+P+" m.":b+" × "+h+" = "+A+" m²."}; }
  if(t===1){ const b=rint(2,12)*2, h=rint(2,14), A=b*h/2;
    return {q:"Um triângulo tem base de "+b+" cm e altura de "+h+" cm. Qual a sua área?", como:"Área do triângulo = (base × altura) ÷ 2. Não esqueça de dividir por 2!",
      c:fmtU(A,"cm²"), w:numW(A,[b*h,b+h,2*A+b,A+h],"cm²"), e:"("+b+" × "+h+") ÷ 2 = "+(b*h)+" ÷ 2 = "+A+" cm²."}; }
  if(t===2){ const r=rint(1,10), A=Math.round(3.14*r*r*100)/100, C=Math.round(2*3.14*r*100)/100, ar=R(2);
    return {q:"Um círculo tem raio de "+r+" m. Usando π = 3,14, "+(ar?"qual a sua área?":"qual o comprimento da sua circunferência (contorno)?"), como:ar?"Área = π × r² = 3,14 × "+r+" × "+r+".":"Comprimento = 2 × π × r = 2 × 3,14 × "+r+".",
      c:ar?fmtU(A,"m²"):fmtU(C,"m"), w:ar?numW(A,[C,3.14*r*2*r,3.14*r,A*2],"m²",false,3.14):numW(C,[A,3.14*r,2*r,C*2],"m",false,3.14), e:ar?"3,14 × "+(r*r)+" = "+N(A)+" m².":"2 × 3,14 × "+r+" = "+N(C)+" m."}; }
  if(t===3){ const B=rint(6,16), b=rint(2,B-2), h=rint(2,10)*2, A=(B+b)*h/2;
    return {q:"Um trapézio tem base maior "+B+" cm, base menor "+b+" cm e altura "+h+" cm. Qual a sua área?", como:"Área do trapézio = (base maior + base menor) × altura ÷ 2.",
      c:fmtU(A,"cm²"), w:numW(A,[(B+b)*h,B*b*h/2,(B+b+h),B*h/2],"cm²"), e:"("+B+" + "+b+") × "+h+" ÷ 2 = "+(B+b)+" × "+h+" ÷ 2 = "+A+" cm²."}; }
  if(t===4){ const l=rint(2,15), q=R(2);
    return {q:"Um quadrado tem lado de "+l+" cm. Qual é "+(q?"a sua área":"o seu perímetro")+"?", como:q?"Área do quadrado = lado × lado.":"Perímetro = 4 lados iguais: 4 × lado.",
      c:q?fmtU(l*l,"cm²"):fmtU(4*l,"cm"), w:q?numW(l*l,[4*l,2*l,l*l*2],"cm²"):numW(4*l,[l*l,2*l,3*l],"cm"), e:q?l+" × "+l+" = "+(l*l)+" cm².":"4 × "+l+" = "+(4*l)+" cm."}; }
  const L=rint(3,8), W=rint(2,6), s=pick([0.5,0.25,1]), n=L*W/(s*s);
  return {q:"Uma sala de "+L+" m × "+W+" m será coberta com pisos quadrados de "+N(s)+" m de lado. Quantos pisos serão necessários?", como:"1) Área da sala: "+L+" × "+W+". 2) Área de um piso: "+N(s)+" × "+N(s)+". 3) Divida a área da sala pela área do piso.",
    c:N(n), w:numW(n,[L*W/s,L*W,2*(L+W)/s,n/2]), e:"Sala: "+L*W+" m². Piso: "+N(s*s)+" m². "+L*W+" ÷ "+N(s*s)+" = "+n+" pisos."};
}});

/* ---------- 23. TALES E SEMELHANÇA ---------- */
tema({id:"m-tales", s:1, nome:"Teorema de Tales e semelhança",
aula:`<h4>Teorema de Tales</h4><p>Quando <b>retas paralelas</b> cortam duas transversais, os segmentos formados são <b>proporcionais</b>. Se numa transversal os pedaços medem 4 e 6, e na outra o primeiro mede 10, então 4/6 = 10/x → 4x = 60 → x = 15.</p>
<h4>Triângulos semelhantes</h4><p>Têm a <b>mesma forma</b> (ângulos iguais), mas tamanhos diferentes: um é uma “ampliação” do outro. Os lados correspondentes são proporcionais.</p>
<h4>O problema da sombra (clássico!)</h4><p>No mesmo horário, o Sol bate com a mesma inclinação em tudo. Então altura e sombra são proporcionais:</p><p><b>altura do objeto ÷ sombra do objeto = altura da pessoa ÷ sombra da pessoa</b></p><p>Pessoa de 1,8 m faz sombra de 1,2 m; um prédio faz sombra de 10 m. Prédio: x/10 = 1,8/1,2 → x = 15 m.</p>
<p><b>Como montar:</b> escreva as razões sempre na mesma ordem (altura/sombra = altura/sombra) e multiplique em cruz.</p>`,
gen(){
  if(R(2)){ const h=pick([1.5,1.6,1.8,2]), s=pick([0.5,1,1.2,2,2.5,3]), k=rint(2,8), S=s*k, H=h*k;
    return {q:"No mesmo instante, uma pessoa de "+N(h)+" m projeta uma sombra de "+N(s)+" m, e um poste projeta uma sombra de "+N(S)+" m. Qual a altura do poste?", como:"Altura e sombra são proporcionais: altura do poste ÷ "+N(S)+" = "+N(h)+" ÷ "+N(s)+". Multiplique em cruz: altura = "+N(h)+" × "+N(S)+" ÷ "+N(s)+".",
      c:fmtU(H,"m"), w:numW(H,[S*s/h,S+h-s,S,h*S],"m",false,h), e:N(h)+" × "+N(S)+" ÷ "+N(s)+" = "+N(H)+" m."}; }
  const a=rint(2,8), b=rint(2,9), k=rint(2,4), c=a*k, x=b*k; if(a===b) return this.gen();
  return {q:"Três retas paralelas cortam duas transversais. Na primeira, os segmentos medem "+a+" cm e "+b+" cm. Na segunda, o segmento correspondente ao de "+a+" cm mede "+c+" cm. Quanto mede o outro?", como:"Pelo Teorema de Tales: "+a+"/"+b+" = "+c+"/x. Multiplique em cruz: "+a+" · x = "+b+" · "+c+".",
    c:fmtU(x,"cm"), w:numW(x,[a*c/b,c+b-a,b*c,c-a+b+1].filter(Number.isInteger),"cm"), e:a+"x = "+(b*c)+" → x = "+x+" cm."};
}});

/* ---------- 24. PITÁGORAS ---------- */
const TRIPLAS=[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[12,16,20],[7,24,25],[15,20,25],[10,24,26],[20,21,29]];
tema({id:"m-pitagoras", s:1, nome:"Teorema de Pitágoras",
aula:`<p>Vale <b>só para triângulos retângulos</b> (com um ângulo de 90°).</p>
`+triangulo({hor:"cateto b",ver:"cateto c",hip:"hipotenusa a",ang:""})+`
<ul><li><b>Hipotenusa</b>: o lado <b>maior</b>, oposto (de frente) ao ângulo reto.</li><li><b>Catetos</b>: os dois lados que formam o ângulo reto.</li></ul>
<p><b>a² = b² + c²</b> → “o quadrado da hipotenusa é igual à soma dos quadrados dos catetos”.</p>
<h4>Achar a hipotenusa</h4><p>Catetos 6 e 8: a² = 36 + 64 = 100 → a = √100 = <b>10</b>.</p>
<h4>Achar um cateto</h4><p>Hipotenusa 13, cateto 5: 13² = 5² + c² → 169 = 25 + c² → c² = 144 → c = <b>12</b>. (Subtraia!)</p>
<h4>Ternos que aparecem sempre</h4><p>3-4-5 e seus múltiplos (6-8-10, 9-12-15, 12-16-20), 5-12-13, 8-15-17, 7-24-25. Se reconhecer, nem precisa calcular.</p>
<p><b>Erro clássico:</b> somar os lados (6 + 8 = 14). É preciso elevar ao quadrado, somar e depois tirar a raiz.</p>`,
gen(){
  const [b,c,a]=pick(TRIPLAS), ctx=pick(["uma escada apoiada num muro","um terreno triangular","uma rampa","um fio esticado do alto de um poste até o chão"]);
  if(R(2)) return {q:"Em "+ctx+", forma-se um triângulo retângulo com catetos de "+b+" m e "+c+" m. Quanto mede a hipotenusa?", fig:triangulo({hor:b+" m",ver:c+" m",hip:"?",ang:""}),
    como:"Use a² = b² + c²: eleve cada cateto ao quadrado ("+b+"² e "+c+"²), some e tire a raiz quadrada do resultado.",
    c:fmtU(a,"m"), w:numW(a,[b+c,b*b+c*c,Math.abs(c-b),a+1],"m"), e:b+"² + "+c+"² = "+(b*b)+" + "+(c*c)+" = "+(a*a)+". √"+(a*a)+" = "+a+" m."};
  return {q:"Um triângulo retângulo tem hipotenusa de "+a+" cm e um cateto de "+b+" cm. Quanto mede o outro cateto?", fig:triangulo({hor:b+" cm",ver:"?",hip:a+" cm",ang:""}),
    como:"a² = b² + c² → "+a+"² = "+b+"² + c². Para achar um cateto, SUBTRAIA: c² = "+a+"² − "+b+"². Depois tire a raiz.",
    c:fmtU(c,"cm"), w:numW(c,[a-b,a+b,a*a-b*b,Math.round(Math.sqrt(a*a+b*b))],"cm"), e:a+"² − "+b+"² = "+(a*a)+" − "+(b*b)+" = "+(c*c)+". √"+(c*c)+" = "+c+" cm."};
}});

/* ---------- 25. TRIGONOMETRIA (SOHCAHTOA) ---------- */
const COR={op:"var(--bad)",adj:"var(--brand)",hip:"var(--ok)"};
const RAZ=["seno","cosseno","tangente"];
tema({id:"m-trigo", s:1, nome:"Trigonometria no triângulo retângulo (SOHCAHTOA)",
aula:`<p>A trigonometria relaciona os <b>ângulos</b> com os <b>lados</b> de um triângulo retângulo. Tudo começa nomeando os lados <b>a partir do ângulo que você está usando</b> (chamado de α, “alfa”):</p>
`+triangulo({hor:"cateto ADJACENTE",ver:"cateto OPOSTO",hip:"HIPOTENUSA",ang:"α",cores:{hor:COR.adj,ver:COR.op,hip:COR.hip}})+`
<ul><li><b style="color:var(--ok)">Hipotenusa (H)</b>: o maior lado, de frente para o ângulo reto. Ela nunca muda.</li>
<li><b style="color:var(--bad)">Cateto oposto (O)</b>: o lado “de frente” para o ângulo α, que <b>não encosta</b> nele.</li>
<li><b style="color:var(--brand)">Cateto adjacente (A)</b>: o cateto que <b>encosta</b> no ângulo α (adjacente = vizinho).</li></ul>
<p><i>Atenção: oposto e adjacente <b>trocam</b> se você usar o outro ângulo agudo. Sempre olhe de qual ângulo a questão fala.</i></p>
<h4>SOHCAHTOA: a palavra mágica</h4>
<table><tr><th>Pedaço</th><th>Lê-se</th><th>Fórmula</th></tr>
<tr><td><b>SOH</b></td><td><b>S</b>eno = <b>O</b>posto ÷ <b>H</b>ipotenusa</td><td>sen α = O / H</td></tr>
<tr><td><b>CAH</b></td><td><b>C</b>osseno = <b>A</b>djacente ÷ <b>H</b>ipotenusa</td><td>cos α = A / H</td></tr>
<tr><td><b>TOA</b></td><td><b>T</b>angente = <b>O</b>posto ÷ <b>A</b>djacente</td><td>tg α = O / A</td></tr></table>
<p>Fale “<b>SOH-CAH-TOA</b>” (sô-cá-tôa) em voz alta algumas vezes. Funciona em português também: Seno-Oposto-Hipotenusa, Cosseno-Adjacente-Hipotenusa, Tangente-Oposto-Adjacente.</p>
<h4>Ângulos notáveis (decore)</h4>
<table><tr><th></th><th>30°</th><th>45°</th><th>60°</th></tr>
<tr><td>sen</td><td>1/2</td><td>√2/2</td><td>√3/2</td></tr>
<tr><td>cos</td><td>√3/2</td><td>√2/2</td><td>1/2</td></tr>
<tr><td>tg</td><td>√3/3</td><td>1</td><td>√3</td></tr></table>
<p><b>Truque para decorar:</b> a linha do seno é <b>1, 2, 3</b> (√1/2, √2/2, √3/2) e a do cosseno é o contrário, <b>3, 2, 1</b>. Tangente = seno ÷ cosseno.</p>
<h4>Como resolver qualquer problema (4 passos)</h4><ol><li>Desenhe o triângulo e marque o ângulo dado.</li><li>Identifique: qual lado eu <b>tenho</b> e qual lado eu <b>quero</b> (O, A ou H)?</li><li>Escolha a razão que usa esses dois: O e H → <b>seno</b>; A e H → <b>cosseno</b>; O e A → <b>tangente</b>.</li><li>Monte a equação e resolva.</li></ol>
<h4>Exemplo</h4><p>Escada de 6 m apoiada no muro, formando 30° com o chão. Que altura ela alcança?</p><ul><li>Tenho a escada = <b>hipotenusa</b> (6). Quero a altura = lado de frente para os 30° = <b>oposto</b>.</li><li>O e H → seno (SOH). sen 30° = O / 6 → 1/2 = O / 6 → O = <b>3 m</b>.</li></ul>`,
gen(){
  const t=R(4);
  if(t===0){ // identificar a razão em um triângulo 3-4-5 (ou múltiplo)
    const k=rint(1,4), O=3*k, A=4*k, H=5*k, troca=R(2); const [o,a]=troca?[A,O]:[O,A];
    const qual=pick(RAZ), val={seno:fr(o,H),cosseno:fr(a,H),tangente:fr(o,a)}[qual];
    const cand=[fr(o,H),fr(a,H),fr(o,a),fr(a,o),fr(H,o),fr(H,a)];
    return {q:"No triângulo retângulo da figura, o cateto oposto ao ângulo α mede "+o+", o adjacente mede "+a+" e a hipotenusa mede "+H+". Qual é o "+qual+" de α?",
      fig:triangulo({hor:String(a),ver:String(o),hip:String(H),ang:"α",cores:{hor:COR.adj,ver:COR.op,hip:COR.hip}}),
      como:"Use SOHCAHTOA: "+(qual==="seno"?"SOH → seno = Oposto ÷ Hipotenusa.":qual==="cosseno"?"CAH → cosseno = Adjacente ÷ Hipotenusa.":"TOA → tangente = Oposto ÷ Adjacente.")+" Na figura: vermelho = oposto, azul = adjacente, verde = hipotenusa. Depois simplifique a fração.",
      c:val, w:quatro(val,cand), e:qual+" α = "+(qual==="seno"?o+"/"+H:qual==="cosseno"?a+"/"+H:o+"/"+a)+" = "+val+"."}; }
  if(t===1){ // achar um lado com ângulo notável
    const caso=pick([
      {ang:30,f:"seno",tem:"hip",quer:"op",v:"1/2",ctx:"Uma escada de {H} m está apoiada em um muro, formando 30° com o chão. Que altura do muro ela alcança?",fig:{hor:"",ver:"?",hip:"{H} m",ang:"30°"}},
      {ang:60,f:"cosseno",tem:"hip",quer:"adj",v:"1/2",ctx:"Uma rampa de {H} m forma 60° com o chão. Qual a distância horizontal que ela ocupa no chão?",fig:{hor:"?",ver:"",hip:"{H} m",ang:"60°"}},
      {ang:45,f:"tangente",tem:"adj",quer:"op",v:"1",ctx:"De um ponto a {A} m da base de uma árvore, vê-se o topo dela sob um ângulo de 45°. Qual a altura da árvore?",fig:{hor:"{A} m",ver:"?",hip:"",ang:"45°"}},
      {ang:30,f:"seno",tem:"op",quer:"hip",v:"1/2",ctx:"Uma pipa está a {O} m de altura, e a linha, bem esticada, forma 30° com o chão. Qual o comprimento da linha?",fig:{hor:"",ver:"{O} m",hip:"?",ang:"30°"}}]);
    const k=rint(2,15)*(caso.tem==="hip"?2:1), base=k; let resp;
    if(caso.quer==="op"&&caso.tem==="hip") resp=base/2; else if(caso.quer==="adj") resp=base/2; else if(caso.f==="tangente") resp=base; else resp=base*2;
    const sub=s=>s.replace("{H}",base).replace("{A}",base).replace("{O}",base), f=caso.fig;
    const nomes={op:"cateto oposto",adj:"cateto adjacente",hip:"hipotenusa"};
    return {q:sub(caso.ctx)+" (Use "+(caso.f==="seno"?"sen":caso.f==="cosseno"?"cos":"tg")+" "+caso.ang+"° = "+caso.v+".)", fig:triangulo({hor:sub(f.hor),ver:sub(f.ver),hip:sub(f.hip),ang:f.ang}),
      como:"1) Você TEM a "+nomes[caso.tem]+" ("+base+" m) e QUER o "+nomes[caso.quer]+". 2) "+({seno:"Oposto e Hipotenusa → SOH → seno.",cosseno:"Adjacente e Hipotenusa → CAH → cosseno.",tangente:"Oposto e Adjacente → TOA → tangente."})[caso.f]+" 3) Monte "+(caso.f==="seno"?"sen":caso.f==="cosseno"?"cos":"tg")+" "+caso.ang+"° = ... e troque pelo valor "+caso.v+". 4) Resolva multiplicando em cruz.",
      c:fmtU(resp,"m"), w:numW(resp,[base,base*2,base/2,base+caso.ang/10,resp*3].filter(x=>x!==resp),"m",false,Math.max(1,resp/4)),
      e:({seno:caso.quer==="hip"?"sen 30° = O/H → 1/2 = "+base+"/H → H = "+resp+" m.":"sen 30° = O/H → 1/2 = O/"+base+" → O = "+resp+" m.",cosseno:"cos 60° = A/H → 1/2 = A/"+base+" → A = "+resp+" m.",tangente:"tg 45° = O/A → 1 = O/"+base+" → O = "+resp+" m."})[caso.f]}; }
  if(t===2){ // razão dada em decimal (triângulo 3-4-5)
    const k=rint(1,6), H=10*k, op=6*k, ad=8*k, caso=pick(["sen","cos","tg"]);
    if(caso==="sen") return {q:"Num triângulo retângulo, sen α = 0,6 e a hipotenusa mede "+H+" cm. Quanto mede o cateto oposto a α?", fig:triangulo({hor:"",ver:"?",hip:H+" cm",ang:"α"}),
      como:"SOH: sen α = Oposto ÷ Hipotenusa. Monte 0,6 = O ÷ "+H+" e isole O multiplicando: O = 0,6 × "+H+".", c:fmtU(op,"cm"), w:numW(op,[ad,H/0.6,H-op/2,op+H/10].filter(x=>x!==op),"cm",false,k*2), e:"O = 0,6 × "+H+" = "+op+" cm."};
    if(caso==="cos") return {q:"Num triângulo retângulo, cos α = 0,8 e a hipotenusa mede "+H+" cm. Quanto mede o cateto adjacente a α?", fig:triangulo({hor:"?",ver:"",hip:H+" cm",ang:"α"}),
      como:"CAH: cos α = Adjacente ÷ Hipotenusa. Monte 0,8 = A ÷ "+H+" → A = 0,8 × "+H+".", c:fmtU(ad,"cm"), w:numW(ad,[op,H/0.8,H-2*k,ad+H/10].filter(x=>x!==ad),"cm",false,k*2), e:"A = 0,8 × "+H+" = "+ad+" cm."};
    return {q:"Num triângulo retângulo, tg α = 0,75 e o cateto adjacente a α mede "+ad+" cm. Quanto mede o cateto oposto?", fig:triangulo({hor:ad+" cm",ver:"?",hip:"",ang:"α"}),
      como:"TOA: tg α = Oposto ÷ Adjacente. Monte 0,75 = O ÷ "+ad+" → O = 0,75 × "+ad+".", c:fmtU(op,"cm"), w:numW(op,[H,ad/0.75,ad-op/3,op+k].filter(x=>x!==op),"cm",false,k*2), e:"O = 0,75 × "+ad+" = "+op+" cm."}; }
  // conceito
  const C=pick([["cateto oposto ÷ hipotenusa","seno"],["cateto adjacente ÷ hipotenusa","cosseno"],["cateto oposto ÷ cateto adjacente","tangente"]]);
  return {q:"Em um triângulo retângulo, a razão “"+C[0]+"” de um ângulo agudo é chamada de:", como:"Lembre do SOHCAHTOA: SOH (Seno = Oposto/Hipotenusa), CAH (Cosseno = Adjacente/Hipotenusa), TOA (Tangente = Oposto/Adjacente).",
    c:C[1], w:quatro(C[1],["seno","cosseno","tangente","hipotenusa","teorema de Pitágoras"]), e:"SOHCAHTOA: "+C[0]+" = "+C[1]+"."};
}});

/* ---------- 26. ESTATÍSTICA ---------- */
tema({id:"m-estat", s:1, nome:"Estatística: média, mediana e moda",
aula:`<ul><li><b>Média aritmética</b>: some todos os valores e divida pela quantidade. (2, 4, 9) → 15 ÷ 3 = 5.</li>
<li><b>Mediana</b>: coloque os valores <b>em ordem</b> e pegue o do <b>meio</b>. Se a quantidade for par, faça a média dos dois do meio. (3, 7, <b>8</b>, 10, 15) → 8.</li>
<li><b>Moda</b>: o valor que <b>mais se repete</b>. (2, 5, <b>5</b>, <b>5</b>, 7) → 5.</li>
<li><b>Amplitude</b>: maior − menor.</li></ul>
<h4>Média ponderada</h4><p>Quando os valores têm “pesos” diferentes: multiplique cada valor pelo seu peso, some e divida pela soma dos pesos. Prova (peso 2) nota 8 e trabalho (peso 1) nota 5: (8·2 + 5·1) ÷ 3 = 21 ÷ 3 = 7.</p>
<p><b>Erro comum:</b> achar a mediana sem ordenar os dados. Sempre ordene primeiro!</p>`,
gen(){
  const n=pick([5,5,7]), base=Array.from({length:n-1},()=>rint(10,30)); base.push(base[0]); // garante moda
  let soma=base.reduce((a,b)=>a+b,0); const ajuste=(n-soma%n)%n; base[1]+=ajuste;
  const v=mix(base), ord=v.slice().sort((a,b)=>a-b), media=v.reduce((a,b)=>a+b,0)/n, mediana=ord[(n-1)/2];
  const cont={}; v.forEach(x=>cont[x]=(cont[x]||0)+1); const max=Math.max(...Object.values(cont)), modas=Object.keys(cont).filter(k=>cont[k]===max);
  const qual=modas.length===1?pick(["média","mediana","moda","amplitude"]):pick(["média","mediana","amplitude"]);
  const val={"média":media,"mediana":mediana,"moda":+modas[0],"amplitude":ord[n-1]-ord[0]}[qual];
  const como={"média":"Some todos os "+n+" valores e divida por "+n+".","mediana":"Coloque os valores em ordem crescente e pegue o do meio (o "+((n+1)/2)+"º).","moda":"Procure o valor que aparece mais vezes.","amplitude":"Subtraia o menor valor do maior."}[qual];
  return {q:"As notas de um campeonato foram: "+v.join(", ")+". Qual é a "+qual+"?", como,
    c:N(val), w:numW(val,[media,mediana,+modas[0],ord[n-1]-ord[0],v[(n-1)/2],soma].filter(x=>x!==val)),
    e:{"média":"Soma "+v.reduce((a,b)=>a+b,0)+" ÷ "+n+" = "+N(media)+".","mediana":"Em ordem: "+ord.join(", ")+". O do meio é "+mediana+".","moda":"O "+modas[0]+" aparece "+max+" vezes.","amplitude":ord[n-1]+" − "+ord[0]+" = "+(ord[n-1]-ord[0])+"."}[qual]};
}});

/* ---------- 27. PROBABILIDADE ---------- */
tema({id:"m-prob", s:1, nome:"Probabilidade",
aula:`<p><b>Probabilidade</b> mede a chance de algo acontecer:</p><p><b>P = casos favoráveis ÷ casos possíveis</b></p>
<ul><li>Dado: 6 resultados possíveis. Chance de sair número par (2, 4, 6) = 3/6 = <b>1/2</b> = 50%.</li><li>Moeda: cara ou coroa = 1/2.</li><li>Urna com 3 bolas vermelhas e 5 azuis: chance de vermelha = 3/8.</li></ul>
<p>A probabilidade vai de <b>0</b> (impossível) a <b>1</b> (certeza, 100%).</p>
<h4>Dois eventos seguidos (“e”)</h4><p>Multiplique: duas caras seguidas = 1/2 × 1/2 = 1/4.</p>
<h4>Dica</h4><p>Escreva a lista de casos possíveis e marque os que interessam. Conte os dois e monte a fração. Simplifique no final.</p>`,
gen(){
  const t=R(3);
  if(t===0){ const ev=pick([["um número par",[2,4,6]],["um número ímpar",[1,3,5]],["um número maior que 4",[5,6]],["um número menor que 3",[1,2]],["o número 6",[6]],["um múltiplo de 3",[3,6]],["um número primo",[2,3,5]]]);
    const cc=fr(ev[1].length,6);
    return {q:"Ao lançar um dado comum (faces de 1 a 6), qual a probabilidade de sair "+ev[0]+"?", como:"Casos possíveis: 6 (1, 2, 3, 4, 5, 6). Liste os favoráveis (os que são "+ev[0]+"), conte e faça favoráveis ÷ 6. Simplifique.",
      c:cc, w:quatro(cc,[ev[1].length+"/"+(6-ev[1].length),fr(6-ev[1].length,6),"1/"+ev[1].length,fr(ev[1].length,12),"1/6"],()=>fr(rint(1,5),6)), e:"Favoráveis: "+ev[1].join(", ")+" ("+ev[1].length+"). P = "+ev[1].length+"/6 = "+cc+"."}; }
  if(t===1){ const r=rint(2,8), a=rint(2,8), v=R(2)?0:rint(2,6), T=r+a+v, cc=fr(r,T);
    return {q:"Uma urna tem "+r+" bolas vermelhas, "+a+" azuis"+(v?" e "+v+" verdes":"")+". Tirando uma bola ao acaso, qual a probabilidade de ser vermelha?", como:"Casos possíveis = total de bolas ("+r+" + "+a+(v?" + "+v:"")+"). Favoráveis = vermelhas ("+r+"). P = vermelhas ÷ total.",
      c:cc, w:quatro(cc,[r+"/"+(a+v),fr(a,T),"1/"+T,fr(r,T+1),fr(T-r,T)],()=>fr(rint(1,T),T)), e:"Total: "+T+". P = "+r+"/"+T+" = "+cc+"."}; }
  const n=pick([2,3]), cc="1/"+(2**n);
  return {q:"Lançando uma moeda "+n+" vezes, qual a probabilidade de sair cara em TODAS?", como:"Cada lançamento tem chance 1/2 de cara. Para acontecer em todos (“e”), multiplique: 1/2 × 1/2"+(n===3?" × 1/2":"")+".",
    c:cc, w:quatro(cc,["1/2","1/"+(2*n),"3/4","1/"+n,"1/"+(2**(n+1))],()=>"1/"+rint(3,10)), e:Array(n).fill("1/2").join(" × ")+" = "+cc+"."};
}});

})();
