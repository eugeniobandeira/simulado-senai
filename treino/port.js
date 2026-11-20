/* ===== TREINO COM AULA: LÍNGUA PORTUGUESA ===== */
(function(){
const {tema, pick, mix, sample, quatro, outras, R, esc} = TREINO;

/* Questão de classificar: linha = [frase/palavra, rótulo correto, explicação]. def explica cada rótulo errado. */
function classifica(linhas, rotulos, enun, como, def){
  return function(){
    const l = pick(linhas), c = l[1];
    return {q: enun(l), como, c, w: quatro(c, mix(rotulos.filter(r=>r!==c))), e: l[2], def};
  };
}
/* Questão "qual está certa / qual tem erro": pares = [certa, errada, regra] */
function certoErrado(pares, enunCerta, enunErrada, como){
  return function(){
    const outrosPares = sample(pares, 5), alvo = outrosPares[0], resto = outrosPares.slice(1);
    if(R(3)){ // procurar a certa
      return {q: enunCerta, como, c: alvo[0], w: resto.map(p=>p[1]),
        e: "“"+alvo[0]+"” está correta. "+alvo[2], xs: resto.map(p=>"Errada. O certo é “"+p[0]+"”. "+p[2])};
    }
    return {q: enunErrada, como, c: alvo[1], w: resto.map(p=>p[0]),
      e: "O erro está em “"+alvo[1]+"”. O certo é “"+alvo[0]+"”. "+alvo[2], xs: resto.map(p=>"Está correta. "+p[2])};
  };
}

/* ---------- 1. CLASSES DE PALAVRAS ---------- */
const CLASSES = ["substantivo","adjetivo","artigo","numeral","pronome","verbo","advérbio","preposição","conjunção","interjeição"];
const DEF_CLASSE = {
  substantivo:"Substantivo dá nome a seres, objetos, lugares, sentimentos (casa, Maria, alegria).",
  adjetivo:"Adjetivo dá uma característica ao substantivo (bonito, azul, cansado).",
  artigo:"Artigo vem antes do substantivo para defini-lo (o, a, os, as) ou indefini-lo (um, uma).",
  numeral:"Numeral indica quantidade ou ordem (dois, terceiro, dobro, metade).",
  pronome:"Pronome substitui ou acompanha o substantivo (ele, meu, este, alguém).",
  verbo:"Verbo indica ação, estado ou fenômeno e muda com o tempo (correr, ser, chover).",
  "advérbio":"Advérbio modifica verbo, adjetivo ou outro advérbio e indica circunstância (ontem, aqui, muito, bem, não).",
  "preposição":"Preposição liga duas palavras (de, com, para, sobre, sem).",
  "conjunção":"Conjunção liga orações ou termos (e, mas, porque, embora).",
  "interjeição":"Interjeição exprime emoção ou apelo (Oba!, Ai!, Psiu!)."
};
const FRASES_CLASSE = [
 ["A menina comprou um livro novo.","livro","substantivo","“Livro” dá nome a um objeto. Tem artigo antes (“um livro”): sinal de substantivo."],
 ["Comprei um livro novo.","novo","adjetivo","“Novo” dá uma característica ao substantivo “livro”."],
 ["O cachorro latiu a noite toda.","O","artigo","“O” vem antes de “cachorro” e o define (um cachorro específico): artigo definido."],
 ["Comprei três cadernos.","três","numeral","“Três” indica quantidade exata: numeral cardinal."],
 ["Ela é a primeira da fila.","primeira","numeral","“Primeira” indica ordem: numeral ordinal."],
 ["Ganhei o dobro do prêmio.","dobro","numeral","“Dobro” indica multiplicação de uma quantidade: numeral multiplicativo."],
 ["Ela chegou cedo à escola.","Ela","pronome","“Ela” está no lugar do nome de uma pessoa: pronome pessoal."],
 ["Este caderno é meu.","Este","pronome","“Este” aponta o caderno que está perto de quem fala: pronome demonstrativo."],
 ["Alguém deixou a porta aberta.","Alguém","pronome","“Alguém” se refere a uma pessoa de modo vago: pronome indefinido."],
 ["A nossa casa é azul.","nossa","pronome","Aqui “nossa” indica posse (a casa pertence a nós): pronome possessivo."],
 ["Os alunos estudaram para a prova.","estudaram","verbo","“Estudaram” é uma ação e está no passado: verbo."],
 ["O sol brilhava forte.","brilhava","verbo","“Brilhava” indica ação e pode mudar de tempo (brilha, brilhará): verbo."],
 ["Vamos jantar fora hoje.","jantar","verbo","Aqui “jantar” é a ação de comer à noite: verbo no infinitivo."],
 ["O jantar estava ótimo.","jantar","substantivo","Com o artigo “o” antes, “jantar” passou a dar nome à refeição: substantivo."],
 ["Ele chegou cedo.","cedo","advérbio","“Cedo” mostra quando ele chegou (tempo) e modifica o verbo “chegou”."],
 ["O dia estava muito quente.","muito","advérbio","“Muito” intensifica o adjetivo “quente”: advérbio de intensidade."],
 ["Ela canta bem.","bem","advérbio","“Bem” mostra o modo como ela canta: advérbio de modo."],
 ["Moro aqui há dez anos.","aqui","advérbio","“Aqui” indica lugar: advérbio de lugar."],
 ["Talvez chova hoje.","Talvez","advérbio","“Talvez” indica dúvida: advérbio de dúvida."],
 ["Ele não veio à festa.","não","advérbio","“Não” nega o verbo: advérbio de negação."],
 ["Ele correu rapidamente.","rapidamente","advérbio","Palavras terminadas em -mente que dizem “como” são advérbios de modo."],
 ["O livro está sobre a mesa.","sobre","preposição","“Sobre” liga “livro está” a “a mesa”, com ideia de lugar: preposição."],
 ["Comprei pão com manteiga.","com","preposição","“Com” liga “pão” a “manteiga”: preposição."],
 ["Ninguém saiu de casa.","de","preposição","“De” liga o verbo “saiu” a “casa”: preposição."],
 ["Estudei, mas não passei.","mas","conjunção","“Mas” liga duas orações com ideia de oposição: conjunção adversativa."],
 ["Saí cedo porque tinha prova.","porque","conjunção","“Porque” liga duas orações e indica a causa: conjunção."],
 ["Ele chegou e sentou.","e","conjunção","“E” liga duas ações (orações), somando: conjunção aditiva."],
 ["Estude, pois a prova é amanhã.","pois","conjunção","“Pois” liga orações e explica o motivo do pedido: conjunção explicativa."],
 ["Nossa! Que susto!","Nossa","interjeição","Aqui “Nossa!” expressa espanto, sozinha e com exclamação: interjeição."],
 ["Ai, machuquei o dedo!","Ai","interjeição","“Ai” expressa dor: interjeição."],
 ["Psiu! Fale baixo.","Psiu","interjeição","“Psiu” é um apelo para fazer silêncio: interjeição."],
 ["A alegria tomou conta da sala.","alegria","substantivo","“Alegria” dá nome a um sentimento: substantivo (abstrato)."],
 ["A professora parecia cansada.","cansada","adjetivo","“Cansada” dá uma característica à professora: adjetivo."],
 ["A casa amarela fica na esquina.","amarela","adjetivo","“Amarela” é a característica (cor) da casa: adjetivo."],
 ["O filme era chato.","chato","adjetivo","“Chato” é a característica do filme: adjetivo."],
 ["Quero aquela blusa.","aquela","pronome","“Aquela” aponta uma blusa longe de quem fala: pronome demonstrativo."]
];
const LISTAS_CLASSE = {
  substantivo:["mesa","alegria","cidade","amor","cardume","João","janela","saudade"],
  adjetivo:["bonito","feliz","azul","cansado","inteligente","veloz","gelado","tímido"],
  verbo:["correr","cantar","ser","estudar","partir","dormir","chover","escrever"],
  "advérbio":["ontem","aqui","muito","não","talvez","depressa","sempre","lá"],
  "preposição":["de","com","sem","para","entre","sobre","até","contra"],
  "conjunção":["mas","porque","embora","portanto","porém","contudo","quando","logo que"],
  pronome:["eu","nós","meu","este","alguém","quem","ninguém","aquele"],
  "interjeição":["oba","ai","ufa","psiu","eita","ah","ui","credo"]
};
tema({id:"p-classes", s:0, nome:"Classes de palavras",
aula:`<p>Toda palavra da língua pertence a uma <b>classe gramatical</b>, de acordo com o <b>papel que ela tem na frase</b>. São 10 classes:</p>
<table><tr><th>Classe</th><th>O que faz</th><th>Exemplos</th></tr>
<tr><td><b>Substantivo</b></td><td>Dá nome a tudo: pessoas, objetos, lugares, sentimentos.</td><td>casa, Maria, Brasil, alegria</td></tr>
<tr><td><b>Adjetivo</b></td><td>Dá característica ao substantivo.</td><td>casa <i>bonita</i>, menino <i>alto</i></td></tr>
<tr><td><b>Artigo</b></td><td>Vem antes do substantivo. Definido: o, a, os, as. Indefinido: um, uma, uns, umas.</td><td><i>o</i> livro, <i>uma</i> ideia</td></tr>
<tr><td><b>Numeral</b></td><td>Quantidade ou ordem.</td><td>dois, terceiro, dobro, metade</td></tr>
<tr><td><b>Pronome</b></td><td>Substitui ou acompanha o substantivo.</td><td>ele, meu, este, alguém, quem</td></tr>
<tr><td><b>Verbo</b></td><td>Ação, estado ou fenômeno da natureza. Muda com o tempo (passado, presente, futuro).</td><td>correr, ser, estar, chover</td></tr>
<tr><td><b>Advérbio</b></td><td>Modifica verbo, adjetivo ou outro advérbio. Indica circunstância: tempo, lugar, modo, intensidade, negação, afirmação, dúvida.</td><td>ontem, aqui, bem, muito, não, sim, talvez</td></tr>
<tr><td><b>Preposição</b></td><td>Liga duas palavras.</td><td>a, de, em, com, para, por, sem, sobre</td></tr>
<tr><td><b>Conjunção</b></td><td>Liga orações (ou termos), dando sentido de soma, oposição, causa...</td><td>e, mas, porque, embora, portanto</td></tr>
<tr><td><b>Interjeição</b></td><td>Expressa emoção ou apelo, geralmente com “!”.</td><td>Oba! Ai! Psiu! Ufa!</td></tr></table>
<h4>Variáveis e invariáveis</h4>
<p>Seis classes <b>mudam</b> (gênero, número ou tempo): substantivo, adjetivo, artigo, numeral, pronome e verbo. Quatro <b>não mudam</b>: advérbio, preposição, conjunção e interjeição.</p>
<h4>Truque importante: a classe depende do uso</h4>
<p>A mesma palavra pode mudar de classe conforme a frase:</p>
<ul><li>“Vamos <b>jantar</b>.” → verbo (ação). “O <b>jantar</b> esfriou.” → substantivo (tem artigo antes).</li>
<li>“A <b>nossa</b> casa.” → pronome (posse). “<b>Nossa</b>! Que susto!” → interjeição (emoção).</li>
<li>“Ele fala <b>alto</b>.” → advérbio (modo de falar). “Ele é <b>alto</b>.” → adjetivo (característica).</li></ul>
<h4>Perguntas que ajudam</h4>
<ul><li>Dá para colocar <b>o/a/um</b> antes? Provavelmente é substantivo.</li>
<li>Responde “<b>como é</b>?” sobre um substantivo? Adjetivo.</li>
<li>Dá para mudar o tempo (ontem/amanhã)? Verbo.</li>
<li>Responde “<b>quando? onde? como? quanto?</b>” sobre o verbo? Advérbio.</li></ul>`,
gen(){
  if(R(4)){
    const [f,p,c,e]=pick(FRASES_CLASSE);
    return {q:"Na frase “"+f+"”, a palavra “"+p+"” é um(a):",
      como:"Olhe o papel da palavra nesta frase, não a palavra solta. Pergunte: ela dá nome a algo? (substantivo) Dá característica a um substantivo? (adjetivo) É ação/estado que muda com o tempo? (verbo) Diz quando, onde, como ou quanto? (advérbio) Liga palavras? (preposição) Liga orações? (conjunção) Expressa emoção? (interjeição)",
      c, w:quatro(c,mix(CLASSES.filter(x=>x!==c))), e, def:DEF_CLASSE};
  }
  const cls=Object.keys(LISTAS_CLASSE), alvo=pick(cls), outrasCls=mix(cls.filter(x=>x!==alvo));
  const c=sample(LISTAS_CLASSE[alvo],3).join(", ");
  const w=outrasCls.slice(0,4).map((o,i)=>{ const a=sample(LISTAS_CLASSE[alvo],2); a.splice(R(3),0,pick(LISTAS_CLASSE[o])); return a.join(", "); });
  const xs=outrasCls.slice(0,4).map(o=>"Tem um(a) "+o+" no meio: "+DEF_CLASSE[o]);
  return {q:"Assinale a alternativa que contém apenas palavras da classe: "+alvo.toUpperCase()+".",
    como:"Lembre a definição: "+DEF_CLASSE[alvo]+" Teste cada palavra da alternativa; basta uma ser de outra classe para a alternativa estar errada.",
    c, w, xs, e:"Todas são "+alvo+"s. "+DEF_CLASSE[alvo]};
}});

/* ---------- 2. SUBSTANTIVOS E ADJETIVOS ---------- */
const COLETIVOS=[["cardume","peixes"],["alcateia","lobos"],["enxame","abelhas"],["rebanho","ovelhas ou bois"],["matilha","cães"],["manada","elefantes ou búfalos"],["constelação","estrelas"],["arquipélago","ilhas"],["biblioteca","livros organizados"],["banda","músicos"],["frota","navios ou veículos"],["cacho","bananas ou uvas"],["vocabulário","palavras"],["multidão","pessoas"],["elenco","atores"],["esquadrilha","aviões"],["pinacoteca","quadros (pinturas)"],["flora","plantas de uma região"],["fauna","animais de uma região"],["bando","aves"],["acervo","obras de um museu"],["álbum","fotografias"],["cordilheira","montanhas"],["colmeia","abelhas em sua casa"]];
const LOCUCOES=[["de pai","paterno"],["de mãe","materno"],["de chuva","pluvial"],["de rio","fluvial"],["de aluno","discente"],["de professor","docente"],["de cabelo","capilar"],["de boca","bucal"],["de olho","ocular"],["de gato","felino"],["de cão","canino"],["de cavalo","equino"],["de estrela","estelar"],["da Lua","lunar"],["do Sol","solar"],["da noite","noturno"],["de guerra","bélico"],["de ouro","áureo"],["de leite","lácteo"],["de criança","infantil"],["da cidade","urbano"],["do campo","rural"],["de dedo","digital"],["do coração","cardíaco"],["de osso","ósseo"],["de irmão","fraterno"],["de fogo","ígneo"],["de vidro","vítreo"]];
const ABSTRATOS=["amor","saudade","beleza","coragem","medo","alegria","tristeza","justiça","viagem","corrida","bondade","inveja"];
const CONCRETOS=["mesa","fada","vento","casa","Deus","cachorro","ar","sereia","árvore","computador","chuva","fantasma"];
tema({id:"p-subst", s:0, nome:"Substantivos e adjetivos (coletivos e locuções)",
aula:`<h4>Substantivo</h4><p>É a palavra que <b>dá nome</b>. Tipos que caem em prova:</p>
<ul><li><b>Comum</b> (nome geral: cidade, menino) × <b>Próprio</b> (nome específico, com maiúscula: São Paulo, Ana).</li>
<li><b>Concreto</b>: nomeia algo que existe por si só, real ou imaginário (mesa, vento, fada, Deus). <b>Abstrato</b>: nomeia sentimento, ação, estado ou qualidade, que depende de alguém para existir (amor, saudade, beleza, corrida, viagem).<br><i>Dica: “fada” e “fantasma” são concretos! Concreto não quer dizer “que dá pra tocar”, e sim que o ser existe por si (mesmo na imaginação).</i></li>
<li><b>Coletivo</b>: no singular, indica um conjunto. Cardume (peixes), alcateia (lobos), enxame (abelhas), matilha (cães), constelação (estrelas), arquipélago (ilhas), frota (navios/veículos), elenco (atores), esquadrilha (aviões), pinacoteca (quadros), fauna (animais de uma região), flora (plantas de uma região).</li></ul>
<h4>Adjetivo e locução adjetiva</h4><p><b>Adjetivo</b> dá característica ao substantivo. <b>Locução adjetiva</b> são duas ou mais palavras com o mesmo papel, geralmente “de + substantivo”. Muitas têm um adjetivo equivalente, vindo do latim:</p>
<table><tr><th>Locução</th><th>Adjetivo</th><th>Locução</th><th>Adjetivo</th></tr>
<tr><td>de pai</td><td>paterno</td><td>de mãe</td><td>materno</td></tr>
<tr><td>de chuva</td><td>pluvial</td><td>de rio</td><td>fluvial</td></tr>
<tr><td>de aluno</td><td>discente</td><td>de professor</td><td>docente</td></tr>
<tr><td>de cabelo</td><td>capilar</td><td>de olho</td><td>ocular</td></tr>
<tr><td>de gato</td><td>felino</td><td>de cão</td><td>canino</td></tr>
<tr><td>da Lua</td><td>lunar</td><td>de estrela</td><td>estelar</td></tr>
<tr><td>de guerra</td><td>bélico</td><td>de leite</td><td>lácteo</td></tr>
<tr><td>da cidade</td><td>urbano</td><td>do campo</td><td>rural</td></tr></table>
<p>Exemplo: “água <b>de chuva</b>” = “água <b>pluvial</b>”.</p>`,
gen(){
  const t=R(3);
  if(t===0){ const l=pick(COLETIVOS);
    return {q:"Qual é o coletivo de "+l[1]+"?", como:"Coletivo é o substantivo que, mesmo no singular, indica um grupo. Lembre da lista da aula e associe: peixes → cardume, lobos → alcateia, estrelas → constelação...",
      c:l[0], w:outras(COLETIVOS,l,x=>x[0]).slice(0,4), e:"“"+l[0]+"” é o conjunto de "+l[1]+"."}; }
  if(t===1){ const l=pick(LOCUCOES);
    return {q:"Na expressão “"+pick(["um cuidado","um problema","um costume","um tratamento","um hábito"])+" "+l[0]+"”, a locução adjetiva “"+l[0]+"” equivale ao adjetivo:",
      como:"Locução adjetiva é “de + substantivo” com papel de adjetivo. Procure o adjetivo que significa “relativo a "+l[0].replace(/^d[eoa]s? /,"")+"”. Muitos vêm do latim (pai = pater → paterno).",
      c:l[1], w:outras(LOCUCOES,l,x=>x[1]).slice(0,4), e:"“"+l[0]+"” = "+l[1]+"."}; }
  const c=pick(ABSTRATOS);
  return {q:"Qual destes substantivos é ABSTRATO?", como:"Abstrato nomeia sentimento, qualidade, estado ou ação: algo que depende de alguém para existir (o amor depende de quem ama). Concreto nomeia um ser que existe por si, mesmo que imaginário (fada, Deus).",
    c, w:sample(CONCRETOS,4), e:"“"+c+"” é abstrato: nomeia sentimento, qualidade ou ação. As outras palavras nomeiam seres que existem por si (concretos), mesmo os imaginários."};
}});

/* ---------- 3. VERBOS: TEMPOS E MODOS ---------- */
const VERBOS=["cantar","estudar","falar","andar","comprar","trabalhar","nadar","gostar","ajudar","morar","comer","vender","beber","correr","aprender","escrever","partir","abrir","dividir","assistir","decidir","permitir"];
const TEMPOS=[ // [nome, prefixo, terminações eu (ar, er, ir), nós (ar, er, ir)]
 ["presente do indicativo","eu",["o","o","o"],["amos","emos","imos"]],
 ["pretérito perfeito do indicativo","eu",["ei","i","i"],["amos","emos","imos"]],
 ["pretérito imperfeito do indicativo","eu",["ava","ia","ia"],["ávamos","íamos","íamos"]],
 ["pretérito mais-que-perfeito do indicativo","eu",["ara","era","ira"],["áramos","êramos","íramos"]],
 ["futuro do presente do indicativo","eu",["arei","erei","irei"],["aremos","eremos","iremos"]],
 ["futuro do pretérito do indicativo","eu",["aria","eria","iria"],["aríamos","eríamos","iríamos"]],
 ["presente do subjuntivo","que eu",["e","a","a"],["emos","amos","amos"]],
 ["pretérito imperfeito do subjuntivo","se eu",["asse","esse","isse"],["ássemos","êssemos","íssemos"]],
 ["futuro do subjuntivo","quando eu",["ar","er","ir"],["armos","ermos","irmos"]]
];
const PREF_NOS={"eu":"nós","que eu":"que nós","se eu":"se nós","quando eu":"quando nós"};
const DEF_TEMPO={
 "presente do indicativo":"Presente do indicativo: fato atual ou hábito (eu canto).",
 "pretérito perfeito do indicativo":"Pretérito perfeito: ação acabada no passado (eu cantei).",
 "pretérito imperfeito do indicativo":"Pretérito imperfeito: ação que se repetia ou durava no passado (eu cantava).",
 "pretérito mais-que-perfeito do indicativo":"Mais-que-perfeito: passado anterior a outro passado (eu cantara = eu tinha cantado).",
 "futuro do presente do indicativo":"Futuro do presente: algo que vai acontecer (eu cantarei).",
 "futuro do pretérito do indicativo":"Futuro do pretérito: algo que aconteceria sob uma condição (eu cantaria).",
 "presente do subjuntivo":"Presente do subjuntivo: desejo ou dúvida, com “que” (que eu cante).",
 "pretérito imperfeito do subjuntivo":"Imperfeito do subjuntivo: hipótese, com “se” (se eu cantasse).",
 "futuro do subjuntivo":"Futuro do subjuntivo: possibilidade futura, com “quando/se” (quando eu cantar)."
};
function conj(v,ti,nos){ const r=v.slice(0,-2), k=["ar","er","ir"].indexOf(v.slice(-2)); const t=TEMPOS[ti]; return (nos?PREF_NOS[t[1]]:t[1])+" "+r+(nos?t[3][k]:t[2][k]); }
tema({id:"p-verbos", s:0, nome:"Verbos: tempos, modos e formas nominais",
aula:`<p><b>Verbo</b> indica ação (correr), estado (estar) ou fenômeno da natureza (chover). Ele muda conforme a <b>pessoa</b> (eu, tu, ele, nós, vós, eles), o <b>tempo</b> e o <b>modo</b>.</p>
<h4>Conjugações</h4><p>1ª: terminados em <b>-ar</b> (cantar) · 2ª: <b>-er</b> (comer) · 3ª: <b>-ir</b> (partir). “Pôr” e derivados entram na 2ª.</p>
<h4>Os três modos</h4><ul><li><b>Indicativo</b>: certeza. “Eu canto.”</li><li><b>Subjuntivo</b>: dúvida, desejo, hipótese. Vem com <b>que</b>, <b>se</b>, <b>quando</b>: “que eu cante”, “se eu cantasse”, “quando eu cantar”.</li><li><b>Imperativo</b>: ordem, pedido. “Cante!”, “Não cante!”</li></ul>
<h4>Tempos, com o verbo CANTAR (eu)</h4>
<table><tr><th>Tempo</th><th>Forma</th><th>Ideia</th></tr>
<tr><td>Presente</td><td>eu canto</td><td>agora ou sempre</td></tr>
<tr><td>Pretérito perfeito</td><td>eu cantei</td><td>passado terminado</td></tr>
<tr><td>Pretérito imperfeito</td><td>eu cantava</td><td>passado que se repetia (“quando criança, eu cantava”)</td></tr>
<tr><td>Pretérito mais-que-perfeito</td><td>eu cantara</td><td>passado antes de outro passado (= “tinha cantado”)</td></tr>
<tr><td>Futuro do presente</td><td>eu cantarei</td><td>vai acontecer</td></tr>
<tr><td>Futuro do pretérito</td><td>eu cantaria</td><td>aconteceria (se...)</td></tr>
<tr><td>Presente do subjuntivo</td><td>que eu cante</td><td>desejo/dúvida</td></tr>
<tr><td>Imperfeito do subjuntivo</td><td>se eu cantasse</td><td>hipótese</td></tr>
<tr><td>Futuro do subjuntivo</td><td>quando eu cantar</td><td>possibilidade futura</td></tr></table>
<p><b>Dica das terminações:</b> -va/-ia = imperfeito; -rei/-rá = futuro do presente; -ria = futuro do pretérito; -sse = imperfeito do subjuntivo.</p>
<h4>Formas nominais</h4><ul><li><b>Infinitivo</b>: o nome do verbo, termina em -r (cantar).</li><li><b>Gerúndio</b>: ação em andamento, termina em -ndo (cantando).</li><li><b>Particípio</b>: ação concluída, termina em -ado/-ido (cantado, partido).</li></ul>`,
gen(){
  const v=pick(VERBOS), t=R(3);
  if(t===2){
    const r=v.slice(0,-2), k=["ar","er","ir"].indexOf(v.slice(-2));
    const formas=[["infinitivo",v],["gerúndio",r+["ando","endo","indo"][k]],["particípio",r+["ado","ido","ido"][k]]];
    const f=pick(formas);
    return {q:"A forma verbal “"+f[1]+"” está no:", como:"Olhe a terminação: -r = infinitivo (nome do verbo); -ndo = gerúndio (ação acontecendo); -ado/-ido = particípio (ação concluída). Formas como “cantei”, “cantava” estão conjugadas em algum tempo.",
      c:f[0], w:["gerúndio","particípio","infinitivo","imperativo","pretérito perfeito do indicativo"].filter(x=>x!==f[0]).slice(0,4),
      e:"“"+f[1]+"” termina em "+(f[0]==="infinitivo"?"-r":f[0]==="gerúndio"?"-ndo":"-ado/-ido")+": é "+f[0]+"."};
  }
  const ti=R(TEMPOS.length), nos=t===1 && ti!==0 && ti!==1; // nós no presente e no perfeito têm a mesma forma em -ar e -ir
  const forma=conj(v,ti,nos), c=TEMPOS[ti][0];
  return {q:"A forma verbal “"+forma+"” (verbo "+v+") está no:",
    como:"Comece pelo modo: tem “que”, “se” ou “quando” antes? Então é subjuntivo. Depois olhe a terminação: -va/-ia (imperfeito), -ra (mais-que-perfeito), -rei/-remos (futuro do presente), -ria (futuro do pretérito), -sse (imperfeito do subjuntivo). Na dúvida, troque por “cantar” na mesma pessoa e compare com a tabela da aula.",
    c, w:quatro(c,mix(TEMPOS.map(x=>x[0]))), e:DEF_TEMPO[c]+" Aqui: “"+forma+"”.", def:DEF_TEMPO};
}});

/* ---------- 4. ADVÉRBIOS ---------- */
const TIPOS_ADV=["tempo","lugar","modo","intensidade","negação","afirmação","dúvida"];
const DEF_ADV={tempo:"Tempo responde “quando?” (ontem, hoje, amanhã, cedo, sempre, já).",lugar:"Lugar responde “onde?” (aqui, ali, lá, longe, perto).",modo:"Modo responde “como?” (bem, mal, devagar, depressa, palavras em -mente).",intensidade:"Intensidade responde “quanto?” e reforça (muito, pouco, bastante, tão, demais).","negação":"Negação: não, nunca (também tempo), jamais.","afirmação":"Afirmação: sim, certamente, realmente.","dúvida":"Dúvida: talvez, provavelmente, possivelmente."};
const ADVS=[["Chegaremos amanhã.","amanhã","tempo"],["Ontem choveu muito na cidade.","Ontem","tempo"],["Ela sempre acorda cedo.","sempre","tempo"],["Já terminei a lição.","Já","tempo"],["Volto logo.","logo","tempo"],["Hoje é dia de prova.","Hoje","tempo"],
 ["Moro aqui desde criança.","aqui","lugar"],["O gato está lá no telhado.","lá","lugar"],["Coloque a caixa ali.","ali","lugar"],["Ele mora longe da escola.","longe","lugar"],["Fique perto de mim.","perto","lugar"],
 ["Ela canta bem.","bem","modo"],["Fale devagar, por favor.","devagar","modo"],["Ele saiu depressa.","depressa","modo"],["Resolveu tudo calmamente.","calmamente","modo"],["O time jogou mal.","mal","modo"],
 ["Estou muito cansado.","muito","intensidade"],["Comeu demais no almoço.","demais","intensidade"],["Ela é bastante esforçada.","bastante","intensidade"],["A sopa está pouco salgada.","pouco","intensidade"],["O exercício era tão fácil!","tão","intensidade"],
 ["Não saia agora.","Não","negação"],["Jamais esquecerei aquele dia.","Jamais","negação"],
 ["Sim, eu vou à festa.","Sim","afirmação"],["Certamente ele virá.","Certamente","afirmação"],["Realmente, o filme é bom.","Realmente","afirmação"],
 ["Talvez eu viaje no feriado.","Talvez","dúvida"],["Provavelmente vai chover.","Provavelmente","dúvida"],["Possivelmente ela já saiu.","Possivelmente","dúvida"]];
tema({id:"p-adverbios", s:0, nome:"Advérbios e locuções adverbiais",
aula:`<p><b>Advérbio</b> é a palavra que <b>modifica um verbo, um adjetivo ou outro advérbio</b>, indicando uma <b>circunstância</b>. Ele é <b>invariável</b>: não muda para feminino nem plural.</p>
<ul><li>Modificando verbo: “Ela canta <b>bem</b>.”</li><li>Modificando adjetivo: “Estou <b>muito</b> cansado.”</li><li>Modificando advérbio: “Ela canta <b>muito</b> bem.”</li></ul>
<table><tr><th>Tipo</th><th>Pergunta</th><th>Exemplos</th></tr>
<tr><td>Tempo</td><td>Quando?</td><td>ontem, hoje, amanhã, cedo, tarde, sempre, nunca, já, logo</td></tr>
<tr><td>Lugar</td><td>Onde?</td><td>aqui, aí, ali, lá, longe, perto, dentro, fora</td></tr>
<tr><td>Modo</td><td>Como?</td><td>bem, mal, devagar, depressa, assim, e quase todos em <b>-mente</b> (calmamente)</td></tr>
<tr><td>Intensidade</td><td>Quanto?</td><td>muito, pouco, bastante, tão, demais, mais, menos</td></tr>
<tr><td>Negação</td><td>—</td><td>não, jamais, nunca</td></tr>
<tr><td>Afirmação</td><td>—</td><td>sim, certamente, realmente</td></tr>
<tr><td>Dúvida</td><td>—</td><td>talvez, provavelmente, possivelmente, acaso</td></tr></table>
<h4>Locução adverbial</h4><p>Duas ou mais palavras com valor de advérbio: <b>à noite</b>, <b>de repente</b>, <b>às vezes</b>, <b>com certeza</b>, <b>de manhã</b>, <b>em cima</b>, <b>às pressas</b>.</p>
<h4>Cuidado: advérbio × adjetivo</h4><p>“Ela comeu <b>bastante</b>.” (quanto comeu → advérbio, não varia) × “Há <b>bastantes</b> livros.” (acompanha substantivo → adjetivo, varia). “Ela ficou <b>meio</b> triste.” (= um pouco → advérbio, nunca “meia triste”).</p>`,
gen(){
  const [f,a,c]=pick(ADVS);
  return {q:"Em “"+f+"”, o advérbio “"+a+"” indica circunstância de:",
    como:"Faça a pergunta ao verbo (ou ao adjetivo) da frase: quando? (tempo) onde? (lugar) como? (modo) quanto? (intensidade). Se não responder a nenhuma, veja se nega, afirma ou expressa dúvida.",
    c, w:quatro(c,mix(TIPOS_ADV)), e:"“"+a+"” → "+DEF_ADV[c], def:DEF_ADV};
}});

/* ---------- 5. CONJUNÇÕES E CONECTIVOS ---------- */
const DEF_CONJ={
 "adição":"Adição (aditiva): soma ideias. e, nem, não só... mas também.",
 "oposição":"Oposição (adversativa): contraria o que veio antes. mas, porém, contudo, todavia, entretanto, no entanto.",
 "alternância":"Alternância (alternativa): uma coisa ou outra. ou... ou, ora... ora.",
 "conclusão":"Conclusão (conclusiva): tira consequência do que foi dito. portanto, logo, por isso, então.",
 "explicação":"Explicação (explicativa): justifica uma ordem ou opinião. pois, porque (depois de pedido/ordem).",
 "causa":"Causa (causal): diz o motivo de um fato. porque, já que, visto que, como (no início).",
 "concessão":"Concessão (concessiva): ideia contrária que não impede o fato. embora, ainda que, mesmo que, apesar de que.",
 "condição":"Condição (condicional): o fato depende de algo. se, caso, contanto que.",
 "tempo":"Tempo (temporal): quando acontece. quando, assim que, logo que, enquanto.",
 "finalidade":"Finalidade (final): para quê. para que, a fim de que.",
 "consequência":"Consequência (consecutiva): resultado de uma intensidade. tão... que, tanto... que.",
 "comparação":"Comparação (comparativa): compara. como, mais... do que, menos... do que.",
 "conformidade":"Conformidade (conformativa): de acordo com. conforme, segundo, como (= conforme).",
 "proporção":"Proporção (proporcional): uma coisa cresce junto com a outra. à medida que, à proporção que, quanto mais... mais."
};
const CONJ_FRASES=[
 ["Estudei muito, mas não passei.","mas","oposição"],["Ele é inteligente; porém, não se esforça.","porém","oposição"],["O dia estava lindo; no entanto, ficamos em casa.","no entanto","oposição"],["Treinou bastante, contudo perdeu a final.","contudo","oposição"],
 ["Chegou cedo e arrumou a sala.","e","adição"],["Não comeu nem bebeu nada.","nem","adição"],
 ["Ou você estuda, ou vai reprovar.","ou... ou","alternância"],["Ora ri, ora chora.","ora... ora","alternância"],
 ["Choveu muito; portanto, a rua alagou.","portanto","conclusão"],["Ele treinou todos os dias, logo está preparado.","logo","conclusão"],["Perdi o ônibus, por isso cheguei atrasado.","por isso","conclusão"],
 ["Leve o guarda-chuva, pois vai chover.","pois","explicação"],["Fale baixo, porque o bebê está dormindo.","porque","explicação"],
 ["Não fui à aula porque estava doente.","porque","causa"],["Como estava cansado, dormiu cedo.","Como","causa"],["Já que você chegou, podemos começar.","Já que","causa"],["Visto que choveu, o jogo foi adiado.","Visto que","causa"],
 ["Embora estivesse cansado, terminou a corrida.","Embora","concessão"],["Mesmo que chova, iremos ao passeio.","Mesmo que","concessão"],["Ainda que fosse difícil, ele não desistiu.","Ainda que","concessão"],
 ["Se estudar, você vai passar.","Se","condição"],["Caso chova, o jogo será adiado.","Caso","condição"],
 ["Quando o sinal tocou, todos saíram.","Quando","tempo"],["Assim que chegar, me ligue.","Assim que","tempo"],["Enquanto ela cozinhava, ele lavava a louça.","Enquanto","tempo"],
 ["Estudou para que pudesse passar.","para que","finalidade"],["Economizou a fim de que pudesse viajar.","a fim de que","finalidade"],
 ["Correu tanto que ficou sem fôlego.","tanto... que","consequência"],["Estava tão cansado que dormiu no sofá.","tão... que","consequência"],
 ["Ela é mais alta do que o irmão.","mais... do que","comparação"],["Ele nada como um peixe.","como","comparação"],
 ["Fiz o bolo conforme a receita.","conforme","conformidade"],["Segundo o jornal, vai esfriar.","Segundo","conformidade"],
 ["À medida que estudava, aprendia mais.","À medida que","proporção"],["Quanto mais treina, mais melhora.","Quanto mais... mais","proporção"]];
const GRUPOS_CONJ={"oposição":["mas","porém","contudo","todavia","entretanto","no entanto"],"conclusão":["portanto","logo","por isso","por conseguinte"],"causa":["já que","visto que","uma vez que"],"concessão":["embora","ainda que","mesmo que","apesar de que"],"condição":["se","caso","contanto que"],"tempo":["quando","assim que","logo que"],"finalidade":["para que","a fim de que"],"conformidade":["conforme","segundo","consoante"]};
tema({id:"p-conjuncoes", s:0, nome:"Conjunções e conectivos (sentido)",
aula:`<p><b>Conjunção</b> é a palavra que <b>liga orações</b> (ou termos) e, ao ligar, cria uma <b>relação de sentido</b>. A prova adora perguntar “a palavra X indica qual ideia?” ou “qual conectivo pode substituir X?”.</p>
<h4>Coordenativas (ligam orações independentes)</h4>
<table><tr><th>Ideia</th><th>Conjunções</th><th>Exemplo</th></tr>
<tr><td>Adição</td><td>e, nem, não só... mas também</td><td>Chegou <b>e</b> sentou.</td></tr>
<tr><td>Oposição (adversativa)</td><td>mas, porém, contudo, todavia, entretanto, no entanto</td><td>Estudei, <b>mas</b> não passei.</td></tr>
<tr><td>Alternância</td><td>ou... ou, ora... ora</td><td><b>Ou</b> estuda, <b>ou</b> trabalha.</td></tr>
<tr><td>Conclusão</td><td>portanto, logo, por isso, então</td><td>Choveu; <b>portanto</b>, alagou.</td></tr>
<tr><td>Explicação</td><td>pois, porque (após ordem ou opinião)</td><td>Leve casaco, <b>pois</b> esfriou.</td></tr></table>
<h4>Subordinativas adverbiais (uma oração depende da outra)</h4>
<table><tr><th>Ideia</th><th>Conjunções</th><th>Exemplo</th></tr>
<tr><td>Causa</td><td>porque, já que, visto que, como (no início)</td><td><b>Como</b> estava cansado, dormiu.</td></tr>
<tr><td>Concessão</td><td>embora, ainda que, mesmo que, apesar de que</td><td><b>Embora</b> cansado, correu.</td></tr>
<tr><td>Condição</td><td>se, caso, contanto que</td><td><b>Se</b> chover, fico.</td></tr>
<tr><td>Tempo</td><td>quando, assim que, logo que, enquanto</td><td><b>Quando</b> chegou, saí.</td></tr>
<tr><td>Finalidade</td><td>para que, a fim de que</td><td>Estudou <b>para que</b> passasse.</td></tr>
<tr><td>Consequência</td><td>tão... que, tanto... que</td><td>Correu <b>tanto que</b> cansou.</td></tr>
<tr><td>Comparação</td><td>como, mais... do que</td><td>Nada <b>como</b> um peixe.</td></tr>
<tr><td>Conformidade</td><td>conforme, segundo, como</td><td>Fiz <b>conforme</b> a receita.</td></tr>
<tr><td>Proporção</td><td>à medida que, quanto mais... mais</td><td><b>À medida que</b> treina, melhora.</td></tr></table>
<h4>Oposição × concessão (a dúvida mais comum)</h4><p>As duas mostram ideias contrárias. <b>Mas</b> (oposição) vem <b>no meio</b>, depois do fato: “Estava cansado, <b>mas</b> correu.” <b>Embora</b> (concessão) apresenta o obstáculo que <b>não impediu</b> o fato e pede o verbo no subjuntivo: “<b>Embora</b> estivesse cansado, correu.”</p>
<h4>Causa × explicação</h4><p>“Não fui <b>porque</b> estava doente” = causa de um fato. “Fale baixo, <b>porque</b> o bebê dorme” = explica um pedido/ordem.</p>
<h4>Conclusão × consequência</h4><p>“Choveu; <b>portanto</b>, alagou” = conclusão. “Choveu <b>tanto que</b> alagou” = consequência de uma intensidade (tanto/tão).</p>`,
gen(){
  if(R(3)){
    const [f,cj,c]=pick(CONJ_FRASES);
    return {q:"Em “"+f+"”, o conectivo “"+cj+"” expressa ideia de:",
      como:"Leia as duas partes da frase e pergunte qual é a relação entre elas: uma soma à outra? contraria? é a causa? a condição? o momento? a finalidade? Compare com a tabela da aula. Atenção: “mas” (oposição) × “embora” (concessão).",
      c, w:quatro(c,mix(Object.keys(DEF_CONJ))), e:DEF_CONJ[c], def:DEF_CONJ};
  }
  const g=pick(Object.keys(GRUPOS_CONJ)), [a,b]=sample(GRUPOS_CONJ[g],2);
  const outrosG=mix(Object.keys(GRUPOS_CONJ).filter(x=>x!==g)).slice(0,4);
  return {q:"Qual conectivo tem o MESMO sentido de “"+a+"”?",
    como:"Descubra primeiro a ideia de “"+a+"” (oposição? causa? conclusão? concessão?). Depois procure, nas alternativas, a palavra do mesmo grupo na tabela da aula.",
    c:b, w:outrosG.map(o=>pick(GRUPOS_CONJ[o])), xs:outrosG.map(o=>"Indica "+o+", não "+g+"."),
    e:"“"+a+"” e “"+b+"” indicam "+g+". "+DEF_CONJ[g]};
}});

/* ---------- 6. PRONOMES ---------- */
const TIPOS_PRON=["pessoal do caso reto","pessoal do caso oblíquo","possessivo","demonstrativo","indefinido","interrogativo","relativo","de tratamento"];
const DEF_PRON={"pessoal do caso reto":"Pessoal reto: eu, tu, ele/ela, nós, vós, eles/elas. Normalmente é o sujeito.","pessoal do caso oblíquo":"Pessoal oblíquo: me, te, se, o, a, lhe, nos, vos, os, as, lhes, mim, comigo... É complemento.","possessivo":"Possessivo: indica posse. meu, teu, seu, nosso, vosso.","demonstrativo":"Demonstrativo: indica posição (perto/longe). este, esse, aquele, isto, isso, aquilo.","indefinido":"Indefinido: refere-se de modo vago. alguém, ninguém, algum, nenhum, todo, tudo, nada, cada.","interrogativo":"Interrogativo: usado em perguntas. que, quem, qual, quanto.","relativo":"Relativo: retoma uma palavra anterior e inicia outra oração. que, quem, o qual, onde, cujo.","de tratamento":"Tratamento: você, senhor(a), Vossa Excelência, Vossa Senhoria."};
const PRONS=[["Nós vamos ao parque.","Nós","pessoal do caso reto"],["Ela chegou atrasada.","Ela","pessoal do caso reto"],["Eu adoro chocolate.","Eu","pessoal do caso reto"],
 ["Encontrei-o na rua.","o","pessoal do caso oblíquo"],["Ele me deu um presente.","me","pessoal do caso oblíquo"],["Entreguei-lhe a carta.","lhe","pessoal do caso oblíquo"],["Venha comigo.","comigo","pessoal do caso oblíquo"],
 ["Meu caderno sumiu.","Meu","possessivo"],["Esta é a nossa escola.","nossa","possessivo"],["Os seus pais chegaram.","seus","possessivo"],
 ["Este livro aqui é ótimo.","Este","demonstrativo"],["Aquela casa lá no morro é antiga.","Aquela","demonstrativo"],["Isso que você disse é verdade.","Isso","demonstrativo"],
 ["Ninguém respondeu.","Ninguém","indefinido"],["Algumas pessoas faltaram.","Algumas","indefinido"],["Tudo ficou pronto.","Tudo","indefinido"],["Cada aluno recebeu uma folha.","Cada","indefinido"],
 ["Quem quebrou o vaso?","Quem","interrogativo"],["Qual é o seu nome?","Qual","interrogativo"],["Quantos anos você tem?","Quantos","interrogativo"],
 ["O livro que comprei é ótimo.","que","relativo"],["A cidade onde nasci é pequena.","onde","relativo"],["O menino cujo pai é médico faltou.","cujo","relativo"],
 ["Você vem ao jogo?","Você","de tratamento"],["O senhor deseja algo?","senhor","de tratamento"],["Vossa Excelência pode falar.","Vossa Excelência","de tratamento"]];
tema({id:"p-pronomes", s:0, nome:"Pronomes",
aula:`<p><b>Pronome</b> é a palavra que <b>substitui</b> ou <b>acompanha</b> um substantivo, indicando a pessoa do discurso: 1ª (quem fala: eu, nós), 2ª (com quem se fala: tu, vós) e 3ª (de quem se fala: ele, eles).</p>
<table><tr><th>Tipo</th><th>Palavras</th><th>Exemplo</th></tr>
<tr><td>Pessoal reto (sujeito)</td><td>eu, tu, ele/ela, nós, vós, eles/elas</td><td><b>Nós</b> saímos.</td></tr>
<tr><td>Pessoal oblíquo (complemento)</td><td>me, te, se, o, a, lhe, nos, vos, os, as, lhes, mim, ti, comigo, contigo</td><td>Vi-<b>o</b> ontem. Deu-<b>me</b> um livro.</td></tr>
<tr><td>Tratamento</td><td>você, senhor(a), Vossa Excelência (autoridades), Vossa Majestade (reis)</td><td><b>Você</b> vem?</td></tr>
<tr><td>Possessivo</td><td>meu, teu, seu, nosso, vosso (e femininos/plurais)</td><td><b>Meu</b> livro.</td></tr>
<tr><td>Demonstrativo</td><td>este/isto (perto de quem fala), esse/isso (perto de quem ouve), aquele/aquilo (longe dos dois)</td><td><b>Este</b> caderno aqui.</td></tr>
<tr><td>Indefinido</td><td>alguém, ninguém, algum, nenhum, todo, tudo, nada, cada, outro, vários</td><td><b>Ninguém</b> veio.</td></tr>
<tr><td>Interrogativo</td><td>que, quem, qual, quanto (em perguntas)</td><td><b>Quem</b> chegou?</td></tr>
<tr><td>Relativo</td><td>que, quem, o qual, onde (lugar), cujo (posse)</td><td>A casa <b>onde</b> moro.</td></tr></table>
<h4>Dicas</h4><ul><li>Depois de preposição, use “mim”: “Isto é para <b>mim</b>.” Mas antes de verbo no infinitivo, use “eu”: “Isto é para <b>eu</b> fazer.” (eu é o sujeito de fazer).</li>
<li>O pronome <b>relativo</b> sempre retoma uma palavra que veio antes: “O livro <b>que</b> comprei” (que = o livro).</li>
<li><b>Cujo</b> indica posse e não leva artigo depois: “o menino <b>cujo</b> pai...” (nunca “cujo o pai”).</li>
<li><b>Onde</b> só para lugar físico: “a cidade onde nasci”.</li></ul>`,
gen(){
  const [f,p,c]=pick(PRONS);
  return {q:"Em “"+f+"”, o pronome “"+p+"” é classificado como:",
    como:"Veja o que o pronome faz: é o sujeito (reto)? é complemento do verbo (oblíquo)? indica posse (possessivo)? posição perto/longe (demonstrativo)? algo vago (indefinido)? está numa pergunta (interrogativo)? retoma uma palavra anterior e começa outra oração (relativo)?",
    c, w:quatro(c,mix(TIPOS_PRON)), e:DEF_PRON[c], def:DEF_PRON};
}});

/* ---------- 7. ACENTUAÇÃO E TONICIDADE ---------- */
const TON={1:"oxítona",2:"paroxítona",3:"proparoxítona"};
// [palavra, sílabas, posição da tônica contando do fim]
const PALAVRAS=[["café","ca-fé",1],["sofá","so-fá",1],["jacaré","ja-ca-ré",1],["você","vo-cê",1],["avô","a-vô",1],["também","tam-bém",1],["parabéns","pa-ra-béns",1],["caju","ca-ju",1],["amor","a-mor",1],["papel","pa-pel",1],["urubu","u-ru-bu",1],["feliz","fe-liz",1],["computador","com-pu-ta-dor",1],["maracujá","ma-ra-cu-já",1],["funil","fu-nil",1],["atrás","a-trás",1],["anzol","an-zol",1],["Paraná","Pa-ra-ná",1],
 ["casa","ca-sa",2],["mesa","me-sa",2],["livro","li-vro",2],["escola","es-co-la",2],["fácil","fá-cil",2],["açúcar","a-çú-car",2],["lápis","lá-pis",2],["táxi","tá-xi",2],["órfão","ór-fão",2],["vírus","ví-rus",2],["álbum","ál-bum",2],["jovem","jo-vem",2],["hífen","hí-fen",2],["caneta","ca-ne-ta",2],["janela","ja-ne-la",2],["amável","a-má-vel",2],["útil","ú-til",2],["tórax","tó-rax",2],["ideia","i-dei-a",2],["cadeira","ca-dei-ra",2],["saúde","sa-ú-de",2],
 ["lâmpada","lâm-pa-da",3],["médico","mé-di-co",3],["página","pá-gi-na",3],["árvore","ár-vo-re",3],["pássaro","pás-sa-ro",3],["matemática","ma-te-má-ti-ca",3],["sábado","sá-ba-do",3],["música","mú-si-ca",3],["fósforo","fós-fo-ro",3],["cálculo","cál-cu-lo",3],["xícara","xí-ca-ra",3],["relâmpago","re-lâm-pa-go",3],["público","pú-bli-co",3],["ônibus","ô-ni-bus",3],["máquina","má-qui-na",3],["número","nú-me-ro",3],["sílaba","sí-la-ba",3],["último","úl-ti-mo",3]];
const REGRAS=[["sofá","oxítona terminada em -a(s), -e(s), -o(s), -em(-ens)"],["café","oxítona terminada em -a(s), -e(s), -o(s), -em(-ens)"],["avô","oxítona terminada em -a(s), -e(s), -o(s), -em(-ens)"],["também","oxítona terminada em -a(s), -e(s), -o(s), -em(-ens)"],["parabéns","oxítona terminada em -a(s), -e(s), -o(s), -em(-ens)"],
 ["fácil","paroxítona terminada em -l, -n, -r, -x, -ps"],["açúcar","paroxítona terminada em -l, -n, -r, -x, -ps"],["tórax","paroxítona terminada em -l, -n, -r, -x, -ps"],["hífen","paroxítona terminada em -l, -n, -r, -x, -ps"],["bíceps","paroxítona terminada em -l, -n, -r, -x, -ps"],
 ["órfão","paroxítona terminada em -ã(s), -ão(s), -i(s), -us, -um(-uns)"],["lápis","paroxítona terminada em -ã(s), -ão(s), -i(s), -us, -um(-uns)"],["vírus","paroxítona terminada em -ã(s), -ão(s), -i(s), -us, -um(-uns)"],["álbum","paroxítona terminada em -ã(s), -ão(s), -i(s), -us, -um(-uns)"],["júri","paroxítona terminada em -ã(s), -ão(s), -i(s), -us, -um(-uns)"],
 ["história","paroxítona terminada em ditongo"],["série","paroxítona terminada em ditongo"],["água","paroxítona terminada em ditongo"],["colégio","paroxítona terminada em ditongo"],
 ["lâmpada","toda proparoxítona é acentuada"],["médico","toda proparoxítona é acentuada"],["sábado","toda proparoxítona é acentuada"],["música","toda proparoxítona é acentuada"],["pássaro","toda proparoxítona é acentuada"],
 ["saúde","i ou u tônico formando hiato com a vogal anterior"],["país","i ou u tônico formando hiato com a vogal anterior"],["baú","i ou u tônico formando hiato com a vogal anterior"],["saída","i ou u tônico formando hiato com a vogal anterior"],
 ["pé","monossílabo tônico terminado em -a(s), -e(s), -o(s)"],["pá","monossílabo tônico terminado em -a(s), -e(s), -o(s)"],["pó","monossílabo tônico terminado em -a(s), -e(s), -o(s)"],["mês","monossílabo tônico terminado em -a(s), -e(s), -o(s)"]];
const REGRA_TIPOS=[...new Set(REGRAS.map(r=>r[1]))];
tema({id:"p-acento", s:0, nome:"Acentuação: oxítonas, paroxítonas e proparoxítonas",
aula:`<h4>1. Sílaba tônica</h4><p>Em toda palavra com mais de uma sílaba, uma delas é falada <b>mais forte</b>: a <b>sílaba tônica</b>. Para achar, fale a palavra “chamando” alguém: ca-<b>FÉ</b>, <b>CA</b>-sa, <b>LÂM</b>-pa-da. Ela pode ter acento escrito ou não (em “ca-<b>NE</b>-ta” não tem).</p>
<h4>2. Classificação (conte de trás para frente!)</h4>
<table><tr><th>Nome</th><th>Tônica é a...</th><th>Exemplos</th></tr>
<tr><td><b>Oxítona</b></td><td>última sílaba</td><td>ca-<b>fé</b>, ca-<b>ju</b>, a-<b>mor</b>, pa-<b>pel</b></td></tr>
<tr><td><b>Paroxítona</b></td><td>penúltima</td><td><b>ca</b>-sa, <b>fá</b>-cil, a-<b>çú</b>-car, <b>lá</b>-pis</td></tr>
<tr><td><b>Proparoxítona</b></td><td>antepenúltima (3ª de trás pra frente)</td><td><b>lâm</b>-pa-da, <b>mé</b>-di-co, <b>sá</b>-ba-do</td></tr></table>
<p><i>Truque: “oxi” = 1 (última), “paroxi” = 2 (penúltima), “proparoxi” = 3 (antepenúltima). A maioria das palavras do português é paroxítona sem acento (casa, mesa, livro).</i></p>
<h4>3. Regras de acento gráfico</h4>
<ul><li><b>Proparoxítonas: TODAS são acentuadas.</b> (lâmpada, música, pássaro, ônibus)</li>
<li><b>Oxítonas</b>: acentuadas se terminam em <b>-a(s), -e(s), -o(s), -em(-ens)</b>: sofá, café, avô, também, parabéns. Por isso “caju”, “amor”, “papel” não têm acento.</li>
<li><b>Paroxítonas</b>: acentuadas se terminam em <b>-l, -n, -r, -x, -ps</b> (fácil, hífen, açúcar, tórax, bíceps), <b>-ã(s), -ão(s), -i(s), -us, -um(-uns)</b> (ímã, órfão, lápis, vírus, álbum) ou em <b>ditongo</b> (história, série, água). É o contrário das oxítonas: “casa”, “jovem” não têm acento.</li>
<li><b>Monossílabos tônicos</b> terminados em -a(s), -e(s), -o(s): pá, pé, pó, mês.</li>
<li><b>Hiato com i ou u tônico</b> (sozinho na sílaba ou com s): sa-<b>ú</b>-de, pa-<b>ís</b>, ba-<b>ú</b>, sa-<b>í</b>-da.</li></ul>
<h4>4. Novo Acordo Ortográfico</h4><p>Perderam o acento: os ditongos abertos <b>éi/ói</b> em paroxítonas (ideia, heroico, assembleia), o <b>êem/ôo</b> (leem, creem, voo, enjoo) e o trema (linguiça, frequente).</p>`,
gen(){
  const t=R(4);
  if(t===0){ const alvo=pick([1,2,3]), c=sample(PALAVRAS.filter(p=>p[2]===alvo),3);
    const w=[0,1,2,3].map(()=>{ const a=sample(PALAVRAS.filter(p=>p[2]===alvo),2); a.splice(R(3),0,pick(PALAVRAS.filter(p=>p[2]!==alvo))); return a; });
    return {q:"Assinale a alternativa em que TODAS as palavras são "+TON[alvo]+"s.", como:"Separe cada palavra em sílabas, ache a mais forte e conte de trás para frente: 1ª = oxítona, 2ª = paroxítona, 3ª = proparoxítona. Basta uma palavra fora do padrão para a alternativa estar errada.",
      c:c.map(p=>p[0]).join(", "), w:w.map(a=>a.map(p=>p[0]).join(", ")), xs:w.map(a=>{ const f=a.find(p=>p[2]!==alvo); return "“"+f[0]+"” ("+f[1]+") é "+TON[f[2]]+"."; }),
      e:c.map(p=>p[1]).join(" · ")+": tônica na "+["última","penúltima","antepenúltima"][alvo-1]+" sílaba."}; }
  if(t===1){ const p=pick(PALAVRAS);
    const sil=p[1].split("-"), ton=sil[sil.length-p[2]];
    return {q:"A palavra “"+p[0]+"” é classificada, quanto à sílaba tônica, como:", como:"Separe as sílabas ("+sil.length+" sílabas), fale a palavra em voz alta e descubra qual é a mais forte. Depois conte a partir do fim: última = oxítona; penúltima = paroxítona; antepenúltima = proparoxítona.",
      c:TON[p[2]], w:quatro(TON[p[2]],["oxítona","paroxítona","proparoxítona","monossílaba átona","monossílaba tônica"]), e:p[1]+": a sílaba tônica é “"+ton+"”, a "+["última","penúltima","antepenúltima"][p[2]-1]+". Então é "+TON[p[2]]+".",
      def:{"oxítona":"Oxítona: tônica na última sílaba.","paroxítona":"Paroxítona: tônica na penúltima sílaba.","proparoxítona":"Proparoxítona: tônica na antepenúltima sílaba.","monossílaba átona":"Monossílabo tem uma sílaba só; esta palavra tem "+sil.length+".","monossílaba tônica":"Monossílabo tem uma sílaba só; esta palavra tem "+sil.length+"."}}; }
  if(t===2){ const alvo=pick([1,2,3]), c=pick(PALAVRAS.filter(p=>p[2]===alvo)), w=sample(PALAVRAS.filter(p=>p[2]!==alvo),4);
    return {q:"Qual destas palavras é "+TON[alvo]+"?", como:"Divida cada palavra em sílabas e ache a tônica. Conte do fim: "+(alvo===1?"a tônica tem de ser a última.":alvo===2?"a tônica tem de ser a penúltima.":"a tônica tem de ser a antepenúltima (e toda proparoxítona tem acento!)."),
      c:c[0], w:w.map(p=>p[0]), xs:w.map(p=>p[1]+" é "+TON[p[2]]+"."), e:c[1]+" é "+TON[alvo]+"."}; }
  const r=pick(REGRAS);
  return {q:"A palavra “"+r[0]+"” recebe acento gráfico porque é:", como:"1) Classifique a palavra (oxítona, paroxítona, proparoxítona, monossílabo). 2) Veja a terminação. 3) Compare com as regras da aula. Se há i/u tônico sozinho na sílaba depois de vogal, é a regra do hiato.",
    c:r[1], w:quatro(r[1],mix(REGRA_TIPOS)), e:"“"+r[0]+"”: "+r[1]+"."};
}});

/* ---------- 8. DIVISÃO SILÁBICA ---------- */
const DIV=[["carro","car-ro",["ca-rro","c-ar-ro"]],["pássaro","pás-sa-ro",["pá-ssa-ro","páss-a-ro"]],["nascer","nas-cer",["na-scer","nasc-er"]],["exceção","ex-ce-ção",["e-xce-ção","exc-e-ção"]],["chuva","chu-va",["c-hu-va","chuv-a"]],["ninho","ni-nho",["nin-ho","ninh-o"]],["palha","pa-lha",["pal-ha","palh-a"]],["queijo","quei-jo",["qu-ei-jo","que-i-jo"]],["saída","sa-í-da",["saí-da","s-aí-da"]],["poesia","po-e-si-a",["poe-si-a","po-e-sia"]],["ideia","i-dei-a",["i-de-i-a","ide-ia"]],["Paraguai","Pa-ra-guai",["Pa-ra-gu-ai","Pa-rag-uai"]],["guerra","guer-ra",["gu-er-ra","gue-rra"]],["piano","pi-a-no",["pia-no","p-ia-no"]],["coelho","co-e-lho",["coe-lho","co-el-ho"]],["advogado","ad-vo-ga-do",["a-dvo-ga-do","adv-o-ga-do"]],["psicólogo","psi-có-lo-go",["p-si-có-lo-go","psic-ó-lo-go"]],["ritmo","rit-mo",["ri-tmo","r-it-mo"]],["caatinga","ca-a-tin-ga",["caa-tin-ga","ca-at-in-ga"]],["cooperar","co-o-pe-rar",["coo-pe-rar","co-op-e-rar"]],["descer","des-cer",["de-scer","desc-er"]],["subir","su-bir",["sub-ir","s-ub-ir"]],["saúde","sa-ú-de",["saú-de","sa-ú-d-e"]],["máquina","má-qui-na",["má-qu-i-na","máq-ui-na"]],["adolescente","a-do-les-cen-te",["a-do-le-scen-te","ad-o-les-cen-te"]],["país","pa-ís",["país","p-aís"]],["cadeira","ca-dei-ra",["ca-de-i-ra","cad-ei-ra"]],["excelente","ex-ce-len-te",["e-xce-len-te","exc-e-len-te"]],["ficção","fic-ção",["fi-cção","f-ic-ção"]],["tatu","ta-tu",["tat-u","t-a-tu"]]];
tema({id:"p-silabas", s:0, nome:"Divisão silábica",
aula:`<p><b>Sílaba</b> é cada pedaço de som que sai numa só emissão de voz. <b>Toda sílaba tem uma vogal</b> (a, e, i, o, u). Para separar, fale a palavra devagar, batendo palmas: <b>ca-mi-nhão</b>.</p>
<h4>NÃO se separam</h4><ul><li><b>Ditongos e tritongos</b> (vogal + semivogal na mesma sílaba): <b>pai</b>, <b>cai</b>-xa, <b>quei</b>-jo, Pa-ra-<b>guai</b>.</li>
<li><b>Dígrafos ch, lh, nh, qu, gu</b>: <b>chu</b>-va, pa-<b>lha</b>, ni-<b>nho</b>, <b>que</b>-ri-do, <b>guer</b>-ra.</li>
<li><b>Encontros consonantais</b> com l ou r como 2ª letra, e os do início da palavra: <b>pr</b>a-to, <b>bl</b>u-sa, <b>pn</b>eu, <b>ps</b>i-có-lo-go.</li></ul>
<h4>SE separam</h4><ul><li><b>rr, ss, sc, sç, xc</b>: car-<b>ro</b>, pás-<b>sa</b>-ro, nas-<b>cer</b>, des-<b>ça</b>, ex-<b>ce</b>-ção.</li>
<li><b>Hiatos</b> (duas vogais fortes em sílabas diferentes): sa-<b>ú</b>-de, po-<b>e</b>-si-a, ca-<b>a</b>-tin-ga, co-<b>o</b>-pe-rar, pi-<b>a</b>-no.</li>
<li><b>Consoantes mudas no meio</b> (sem vogal depois): a<b>d</b>-vo-ga-do, ri<b>t</b>-mo, fi<b>c</b>-ção, o<b>b</b>-je-to.</li></ul>
<h4>Ditongo × hiato</h4><p>Ditongo = duas vogais na <b>mesma</b> sílaba, uma forte e uma fraca (cai-xa). Hiato = duas vogais em sílabas <b>diferentes</b> (sa-í-da). Se a vogal i/u tem acento ou é bem forte, geralmente é hiato.</p>`,
gen(){
  const [p,c,erros]=pick(DIV);
  if(R(4)===0){ const n=c.split("-").length;
    return {q:"Quantas sílabas tem a palavra “"+p+"”?", como:"Fale a palavra devagar batendo palmas. Lembre: rr, ss, sc se separam; ch, lh, nh, qu, gu e ditongos ficam juntos; hiatos se separam.",
      c:String(n), w:quatro(String(n),["1","2","3","4","5","6"].filter(x=>x!==String(n))), e:"“"+p+"” → "+c+" = "+n+" sílabas."};
  }
  const sil=c.split("-"), auto=[];
  for(let i=0;i<sil.length-1;i++){ const a=sil.slice(); a.splice(i,2,sil[i]+sil[i+1]); auto.push(a.join("-")); }
  sil.forEach((s,i)=>{ if(s.length>2){ const a=sil.slice(); a.splice(i,1,s.slice(0,1),s.slice(1)); auto.push(a.join("-")); } });
  return {q:"A separação silábica correta da palavra “"+p+"” é:", como:"Fale devagar. Separe rr, ss, sc, xc e os hiatos (vogais em sílabas diferentes). Não separe ditongos (ai, ei, ou...), nem ch, lh, nh, qu, gu. Toda sílaba precisa de uma vogal.",
    c, w:quatro(c,erros.concat(mix(auto)),()=>{ const L=p.split(""), cortes=new Set(); const k=1+R(Math.min(L.length-1,sil.length+1)); while(cortes.size<k) cortes.add(1+R(L.length-1)); return L.map((x,i)=>(cortes.has(i)?"-":"")+x).join(""); }), e:"“"+p+"” → "+c+"."};
}});

/* ---------- 9. FONÉTICA ---------- */
const TIPOS_FON=["ditongo","tritongo","hiato","encontro consonantal","dígrafo"];
const DEF_FON={ditongo:"Ditongo: vogal + semivogal na mesma sílaba (pai, cai-xa).",tritongo:"Tritongo: semivogal + vogal + semivogal na mesma sílaba (Pa-ra-guai).",hiato:"Hiato: duas vogais em sílabas separadas (sa-í-da).","encontro consonantal":"Encontro consonantal: duas consoantes juntas, cada uma com seu som (pr-ato, bl-usa).","dígrafo":"Dígrafo: duas letras que fazem um só som (ch, lh, nh, rr, ss, qu, gu, sc)."};
const FON=[["pai","ai","ditongo","pai: a + i na mesma sílaba"],["cadeira","ei","ditongo","ca-dei-ra: e + i na mesma sílaba"],["mãe","ãe","ditongo","mãe: ã + e na mesma sílaba"],["céu","éu","ditongo","céu: é + u na mesma sílaba"],["caixa","ai","ditongo","cai-xa"],["Paraguai","uai","tritongo","Pa-ra-guai: u + a + i na mesma sílaba"],["iguais","uai","tritongo","i-guais: u + a + i juntos"],["saguão","uão","tritongo","sa-guão: u + ã + o juntos"],["saída","aí","hiato","sa-í-da: a e í em sílabas diferentes"],["lua","ua","hiato","lu-a: u e a em sílabas diferentes"],["poesia","oe","hiato","po-e-si-a"],["país","aí","hiato","pa-ís"],["prato","pr","encontro consonantal","p e r soam os dois"],["blusa","bl","encontro consonantal","b e l soam os dois"],["livro","vr","encontro consonantal","li-vro: v e r soam"],["flor","fl","encontro consonantal","f e l soam"],["ritmo","tm","encontro consonantal","rit-mo: t e m soam (em sílabas diferentes)"],["chuva","ch","dígrafo","ch = um só som"],["filho","lh","dígrafo","lh = um só som"],["ninho","nh","dígrafo","nh = um só som"],["carro","rr","dígrafo","rr = um só som (r forte)"],["pássaro","ss","dígrafo","ss = um só som de s"],["queijo","qu","dígrafo","o u não é pronunciado: qu = som de k"],["guerra","gu","dígrafo","o u não é pronunciado: gu = som de g"],["nascer","sc","dígrafo","sc = um só som de s"]];
const FONEMAS=[["chuva",5,4,"ch = 1 som"],["hora",4,3,"h não tem som"],["carro",5,4,"rr = 1 som"],["ninho",5,4,"nh = 1 som"],["táxi",4,5,"x = ks (2 sons)"],["fixo",4,5,"x = ks (2 sons)"],["campo",5,4,"am = som nasal único"],["guerra",6,4,"gu = g, rr = 1 som"],["galinha",7,6,"nh = 1 som"],["hoje",4,3,"h não tem som"],["queijo",6,5,"qu = som de k"],["pássaro",7,6,"ss = 1 som"],["mala",4,4,"cada letra, um som"],["pato",4,4,"cada letra, um som"]];
tema({id:"p-fonetica", s:0, nome:"Fonética: letras, fonemas, encontros e dígrafos",
aula:`<h4>Letra × fonema</h4><p><b>Letra</b> é o sinal escrito. <b>Fonema</b> é o som. Nem sempre batem: “<b>h</b>ora” tem 4 letras e 3 fonemas (o h não soa); “tá<b>x</b>i” tem 4 letras e 5 fonemas (o x soa “ks”); “<b>ch</b>uva” tem 5 letras e 4 fonemas.</p>
<h4>Encontros vocálicos</h4><ul><li><b>Ditongo</b>: vogal + semivogal na <b>mesma sílaba</b>: p<b>ai</b>, m<b>ãe</b>, c<b>éu</b>, cad<b>ei</b>ra.</li>
<li><b>Tritongo</b>: três sons vocálicos na mesma sílaba: Parag<b>uai</b>, ig<b>uais</b>, sag<b>uão</b>.</li>
<li><b>Hiato</b>: duas vogais em <b>sílabas diferentes</b>: sa-<b>í</b>-da, l<b>u-a</b>, p<b>o-e</b>-si-a.</li></ul>
<h4>Encontro consonantal</h4><p>Duas ou mais consoantes juntas, <b>cada uma com seu som</b>: <b>pr</b>ato, <b>bl</b>usa, <b>fl</b>or, li<b>vr</b>o, ri<b>tm</b>o, <b>pn</b>eu.</p>
<h4>Dígrafo</h4><p>Duas letras que representam <b>um único som</b>:</p><ul><li>Consonantais: <b>ch</b> (chuva), <b>lh</b> (filho), <b>nh</b> (ninho), <b>rr</b> (carro), <b>ss</b> (pássaro), <b>sc</b> (nascer), <b>sç</b> (desça), <b>xc</b> (exceção), <b>qu</b> e <b>gu</b> quando o u não soa (queijo, guerra).</li>
<li>Vocálicos (nasais): <b>am, an, em, en, im, in, om, on, um, un</b> (c<b>am</b>po, t<b>em</b>po, m<b>un</b>do).</li></ul>
<p><b>Atenção:</b> em “<b>qu</b>adro” e “ág<b>u</b>a” o u <b>é pronunciado</b>, então não é dígrafo. E “lh”, “nh”, “ch” <b>não são</b> encontros consonantais: são dígrafos (um som só).</p>
<h4>Encontro consonantal × dígrafo</h4><p>Pergunte: <b>quantos sons</b> as duas letras fazem? Dois sons (p-r em prato) = encontro consonantal. Um som só (ch em chuva) = dígrafo.</p>`,
gen(){
  if(R(3)){ const [p,g,c,e]=pick(FON);
    return {q:"Na palavra “"+p+"”, o grupo destacado “"+g+"” forma um(a):", como:"Se são vogais: estão na mesma sílaba (ditongo/tritongo) ou em sílabas diferentes (hiato)? Separe as sílabas para ver. Se são consoantes: fazem dois sons (encontro consonantal) ou um só som (dígrafo)?",
      c, w:quatro(c,mix(TIPOS_FON)), e:DEF_FON[c]+" Em “"+p+"”: "+e+".", def:DEF_FON}; }
  const [p,l,f,e]=pick(FONEMAS);
  return {q:"A palavra “"+p+"” tem "+l+" letras. Quantos fonemas (sons) ela tem?", como:"Fale a palavra devagar e conte os sons, não as letras. Lembre: h no início não soa; dígrafos (ch, lh, nh, rr, ss, qu, gu) são um som só; x em táxi/fixo vale dois sons (ks).",
    c:String(f), w:quatro(String(f),[l,l-1,l+1,l-2,f+1,f-1].filter(x=>x>0).map(String),()=>String(1+R(9))), e:"“"+p+"”: "+f+" fonemas ("+e+")."};
}});

/* ---------- 10. ORTOGRAFIA ---------- */
const ORTO=[["pesquisa","pesquiza","vem de “pesquisar”; som de z entre vogais, mas escrito com s"],["beleza","belesa","substantivo que vem de adjetivo (belo → beleza) usa -eza"],["empresa","empreza","grafia com s"],["princesa","princeza","feminino de título usa -esa"],["francesa","franceza","origem (França → francês, francesa) usa -ês/-esa"],["análise","análize","grafia com s; daí analisar"],["realizar","realisar","verbo formado de palavra sem s no final (real) usa -izar"],["paralisar","paralizar","vem de “paralisia”, que tem s: -isar"],["caixa","caicha","depois de ditongo usa-se x (cai-xa, pei-xe)"],["peixe","peiche","depois de ditongo usa-se x"],["enxada","enchada","depois de “en” usa-se x"],["enxergar","enchergar","depois de “en” usa-se x"],["mexer","mecher","depois de “me” usa-se x (exceção: mecha)"],["cachorro","caxorro","grafia com ch"],["chuva","xuva","grafia com ch"],["garagem","garajem","substantivos em -agem usam g"],["ferrugem","ferrujem","terminação -ugem com g"],["laranja","laranga","grafia com j"],["gengiva","jengiva","grafia com g"],["jeito","geito","grafia com j"],["exceção","excessão","escreve-se com xc e ç"],["excesso","exceço","escreve-se com xc e ss"],["nascer","naser","grafia com sc"],["piscina","pissina","grafia com sc"],["açúcar","assúcar","grafia com ç"],["cansaço","cansasso","terminação -aço com ç"],["atrasado","atrazado","vem de “atrás”, com s"],["certeza","certesa","substantivo de adjetivo (certo → certeza) usa -eza"],["tijolo","tigolo","grafia com j"],["majestade","magestade","grafia com j"],["lixo","licho","grafia com x"],["xícara","chícara","grafia com x"],["ameixa","ameicha","depois de ditongo usa-se x"],["enxugar","enchugar","depois de “en” usa-se x"],["chave","xave","grafia com ch"],["gostoso","gostozo","adjetivos em -oso usam s"],["poetisa","poetiza","feminino de profissão em -isa usa s"],["obrigação","obrigassão","terminação -ação com ç"]];
tema({id:"p-orto", s:0, nome:"Ortografia (s/z, ç/ss, x/ch, g/j)",
aula:`<p>Ortografia é a <b>escrita correta</b> das palavras. Algumas regras ajudam muito:</p>
<h4>S ou Z?</h4><ul><li><b>-ês / -esa</b> para origem e títulos: português, francesa, princesa, duquesa.</li>
<li><b>-isa</b> para profissões femininas: poetisa, profetisa.</li>
<li><b>-oso / -osa</b> nos adjetivos: gostoso, famosa, cheiroso.</li>
<li><b>-eza</b> nos substantivos que vêm de adjetivos: belo → bel<b>eza</b>, certo → cert<b>eza</b>, pobre → pobr<b>eza</b>.</li>
<li><b>-isar</b> se a palavra de origem já tem s: pesquisa → pesquisar, análise → analisar. <b>-izar</b> se não tem: real → realizar, útil → utilizar.</li></ul>
<h4>X ou CH?</h4><ul><li>Depois de <b>ditongo</b>: cai<b>x</b>a, pei<b>x</b>e, amei<b>x</b>a.</li><li>Depois de <b>en-</b>: en<b>x</b>ada, en<b>x</b>ergar, en<b>x</b>ugar (exceção: encher, que vem de cheio).</li><li>Depois de <b>me-</b>: me<b>x</b>er, me<b>x</b>erica (exceção: mecha).</li></ul>
<h4>Ç, SS, SC</h4><ul><li><b>Ç</b> nunca começa palavra e só vem antes de a, o, u: açúcar, cansaço.</li><li><b>SC</b> em palavras como nascer, piscina, descer, adolescente.</li><li><b>XC</b> em exceção, excelente, exceto, excesso.</li></ul>
<h4>G ou J?</h4><ul><li>Terminações <b>-agem, -igem, -ugem</b> com g: garagem, vertigem, ferrugem (exceções: pajem, lambujem).</li><li>Verbos em <b>-jar</b> mantêm o j: viajar → que eles via<b>j</b>em (verbo). Mas a via<b>g</b>em (substantivo).</li><li>Palavras de origem tupi ou africana usam j: jiboia, pajé, canjica.</li></ul>`,
gen: certoErrado(ORTO.map(o=>[o[0],o[1],"Regra: "+o[2]+"."]),"Assinale a palavra escrita corretamente.","Assinale a palavra escrita INCORRETAMENTE.","Leia cada palavra e lembre das regras da aula: -eza em substantivos de adjetivos, x depois de ditongo e de “en”, -agem com g, -isar quando a origem tem s. Se uma palavra “parece estranha”, procure uma palavra da mesma família (pesquisa → pesquisar).")});

/* ---------- 11. PONTUAÇÃO ---------- */
const VIRG=[["Maria, feche a porta.","isolar o vocativo (chamamento)"],["Carlos, venha cá!","isolar o vocativo (chamamento)"],["Pedro, meu vizinho, viajou ontem.","isolar o aposto (explicação)"],["São Paulo, a maior cidade do país, fica no Sudeste.","isolar o aposto (explicação)"],["Comprei arroz, feijão, carne e salada.","separar itens de uma enumeração"],["Na mochila havia livros, cadernos e lápis.","separar itens de uma enumeração"],["Ontem à noite, choveu muito.","isolar adjunto adverbial deslocado"],["Depois do almoço, saímos para passear.","isolar adjunto adverbial deslocado"],["Estudei muito, mas não passei.","separar oração coordenada iniciada por “mas”"],["Ela queria ir, mas estava doente.","separar oração coordenada iniciada por “mas”"],["Campinas, 10 de março de 2027.","separar o lugar da data"],["Cheguei, vi, venci.","separar orações coordenadas sem conjunção"]];
const FUNC_VIRG=[...new Set(VIRG.map(v=>v[1]))];
const PONT=[["Maria, feche a porta.","Maria feche, a porta.","Vocativo (Maria) é separado por vírgula; não se separa verbo do complemento."],["Os alunos chegaram cedo.","Os alunos, chegaram cedo.","Não se separa o sujeito (os alunos) do verbo."],["Comprei pão, leite e café.","Comprei, pão leite e café.","Vírgula separa os itens da lista, não o verbo do complemento."],["O menino quebrou a janela.","O menino quebrou, a janela.","Não se separa o verbo do objeto."],["Pedro, meu primo, chegou.","Pedro meu primo, chegou.","O aposto (meu primo) fica entre vírgulas."],["Ontem, fomos ao cinema.","Ontem fomos, ao cinema.","A vírgula pode isolar o adjunto deslocado “ontem”, mas não separa verbo e complemento."],["Ele disse: — Vou sair agora.","Ele disse — Vou sair agora:","Os dois-pontos anunciam a fala; o travessão marca quem fala."],["Que dia lindo!","Que dia lindo?","Frase que expressa emoção termina com ponto de exclamação."],["Você vai à festa?","Você vai à festa.","Pergunta direta termina com ponto de interrogação."],["Levei tudo: caderno, lápis e borracha.","Levei: tudo caderno, lápis e borracha.","Os dois-pontos vêm antes da enumeração que explica “tudo”."],["Estudei muito, mas não passei.","Estudei muito mas, não passei.","A vírgula vem antes do “mas”, não depois."],["A professora corrigiu as provas.","A professora, corrigiu as provas.","Não se separa o sujeito do verbo."]];
tema({id:"p-pontuacao", s:0, nome:"Pontuação",
aula:`<h4>Vírgula: quando USAR</h4><ul><li><b>Enumeração</b>: “Comprei arroz<b>,</b> feijão e carne.”</li><li><b>Vocativo</b> (chamar alguém): “<b>Maria,</b> venha cá.”</li><li><b>Aposto</b> (explicação sobre um termo): “Pedro<b>, meu vizinho,</b> viajou.”</li><li><b>Adjunto adverbial deslocado</b> (circunstância no início): “<b>Ontem à noite,</b> choveu.”</li><li><b>Antes de mas, porém, contudo, pois</b>: “Estudei<b>,</b> mas não passei.”</li><li><b>Conjunções no meio</b> da oração: “Ele<b>, porém,</b> não veio.”</li><li><b>Data</b>: “Campinas<b>,</b> 10 de março.”</li></ul>
<h4>Vírgula: quando NÃO usar (erro clássico!)</h4><ul><li>Entre <b>sujeito e verbo</b>: “Os alunos<s>,</s> chegaram.” ✗</li><li>Entre <b>verbo e complemento</b>: “Comprei<s>,</s> pão.” ✗</li></ul><p><i>Truque: leia a frase na ordem sujeito → verbo → complemento. Nessa ordem direta, não entra vírgula.</i></p>
<h4>Outros sinais</h4><ul><li><b>Ponto e vírgula (;)</b>: pausa maior que a vírgula; separa ideias ligadas ou itens longos.</li><li><b>Dois-pontos (:)</b>: anunciam fala, enumeração ou explicação.</li><li><b>Travessão (—)</b>: marca fala de personagem ou destaca uma explicação.</li><li><b>Aspas (“ ”)</b>: citação, ironia, palavra estrangeira.</li><li><b>Reticências (...)</b>: pensamento interrompido, hesitação.</li><li><b>! e ?</b>: emoção e pergunta direta.</li></ul>`,
gen(){
  if(R(2)){ const [f,c]=pick(VIRG);
    return {q:"Em “"+f+"”, a vírgula foi usada para:", como:"Veja o que está separado pela vírgula: um nome chamado (vocativo)? uma explicação sobre alguém (aposto)? itens de uma lista? uma circunstância (tempo, lugar) no início da frase? uma oração com “mas”?",
      c, w:quatro(c,mix(FUNC_VIRG)), e:"A vírgula foi usada para "+c+"."}; }
  return certoErrado(PONT,"Assinale a frase pontuada corretamente.","Assinale a frase com ERRO de pontuação.","Leia em ordem direta (sujeito + verbo + complemento): nessa ordem não pode haver vírgula. Vírgula é para vocativo, aposto, enumeração, adjunto deslocado e antes de “mas”. Pergunta termina com “?”, emoção com “!”.")();
}});

/* ---------- 12. CONCORDÂNCIA ---------- */
const CONC=[["Havia muitas pessoas na fila.","Haviam muitas pessoas na fila.","“Haver” no sentido de existir não tem sujeito e fica sempre no singular."],["Faz dois anos que não o vejo.","Fazem dois anos que não o vejo.","“Fazer” indicando tempo decorrido fica no singular."],["Chegaram os convidados.","Chegou os convidados.","O sujeito “os convidados” está no plural, mesmo depois do verbo."],["Ela ficou meio nervosa.","Ela ficou meia nervosa.","“Meio” = um pouco é advérbio e não varia."],["Comi meia pizza.","Comi meio pizza.","“Meia” = metade concorda com o substantivo (pizza, feminino)."],["Seguem anexas as fotos.","Segue anexo as fotos.","“Anexo” concorda com o substantivo: as fotos seguem anexas."],["“Muito obrigada”, disse a menina.","“Muito obrigado”, disse a menina.","“Obrigado” concorda com quem fala: mulher diz “obrigada”."],["Havia menos pessoas hoje.","Havia menas pessoas hoje.","“Menos” é invariável; “menas” não existe."],["Eu e você vamos ao cinema.","Eu e você vai ao cinema.","Sujeito composto com “eu” leva o verbo para “nós”: vamos."],["Existem muitos problemas.","Existe muitos problemas.","“Existir” tem sujeito (muitos problemas) e concorda com ele no plural."],["Elas mesmas fizeram o bolo.","Elas mesmo fizeram o bolo.","“Mesmo” com sentido de “próprio” concorda: elas mesmas."],["Faltam dez minutos para o fim.","Falta dez minutos para o fim.","O sujeito é “dez minutos” (plural): faltam."],["Deve haver soluções.","Devem haver soluções.","Com “haver” = existir, o verbo auxiliar também fica no singular."],["Sobraram dois pães.","Sobrou dois pães.","O sujeito “dois pães” está no plural."],["Os meninos estavam quietos.","Os meninos estavam quieto.","O adjetivo concorda com o substantivo: meninos quietos."],["Mais de um aluno faltou.","Mais de um aluno faltaram.","Com “mais de um”, o verbo fica no singular."]];
tema({id:"p-concord", s:0, nome:"Concordância verbal e nominal",
aula:`<h4>Concordância verbal</h4><p>O <b>verbo concorda com o sujeito</b> em número (singular/plural) e pessoa. Para acertar, ache o sujeito perguntando “quem?” ao verbo.</p>
<ul><li>Sujeito depois do verbo também manda: “<b>Chegaram</b> os convidados.” (os convidados chegaram).</li>
<li>Sujeito composto → plural: “Ana e Pedro <b>viajaram</b>.” Com “eu” no meio → nós: “Eu e você <b>vamos</b>.”</li>
<li><b>Haver = existir</b> fica no singular: “<b>Havia</b> muitas pessoas.” (nunca “haviam”). Já <b>existir</b> concorda: “<b>Existem</b> pessoas.”</li>
<li><b>Fazer/haver = tempo passado</b> no singular: “<b>Faz</b> dois anos.” “<b>Há</b> dez dias.”</li>
<li>Locução com haver também fica no singular: “<b>Deve</b> haver soluções.”</li></ul>
<h4>Concordância nominal</h4><p>Artigo, adjetivo, numeral e pronome <b>concordam com o substantivo</b> em gênero e número: “os meninos quiet<b>os</b>”, “as camisas nov<b>as</b>”.</p>
<ul><li><b>Meio</b>: = “um pouco” não varia (ela está <b>meio</b> cansada); = “metade” varia (<b>meia</b> hora, <b>meia</b> pizza).</li>
<li><b>Anexo, obrigado, mesmo, próprio, quite</b> variam: “seguem <b>anexas</b> as fotos”, “ela disse: obrigad<b>a</b>”, “elas <b>mesmas</b>”.</li>
<li><b>Menos</b> nunca varia (“menas” não existe). <b>Alerta</b> também não varia.</li>
<li><b>É proibido / é proibida</b>: “É proibido entrada” (sem artigo, não varia) × “É proibid<b>a</b> <b>a</b> entrada” (com artigo, varia).</li></ul>`,
gen: certoErrado(CONC,"Assinale a frase escrita de acordo com a norma-padrão quanto à concordância.","Assinale a frase com ERRO de concordância.","Ache o sujeito de cada verbo (pergunte “quem?”) e veja se o verbo está no mesmo número. Lembre das armadilhas: “haver” = existir e “fazer” = tempo ficam no singular; “meio” = um pouco não varia; “menos” não varia; “anexo”, “obrigado” e “mesmo” concordam.")});

/* ---------- 13. TERMOS DA ORAÇÃO ---------- */
const TIPOS_SUJ=["simples","composto","oculto (desinencial)","indeterminado","oração sem sujeito"];
const DEF_SUJ={"simples":"Simples: um só núcleo (Os meninos jogaram).","composto":"Composto: dois ou mais núcleos (Ana e Pedro viajaram).","oculto (desinencial)":"Oculto: não aparece, mas a terminação do verbo mostra quem é (Fomos = nós).","indeterminado":"Indeterminado: existe alguém, mas não se sabe quem (Roubaram minha bicicleta; Precisa-se de ajuda).","oração sem sujeito":"Sem sujeito: fenômenos da natureza, haver = existir, fazer = tempo (Choveu; Há alunos; Faz frio)."};
const SUJS=[["Os meninos jogaram bola.","simples","o sujeito é “os meninos”, um só núcleo (meninos)"],["Ninguém saiu da sala.","simples","o sujeito é “ninguém”"],["Chegaram as encomendas.","simples","o sujeito “as encomendas” vem depois do verbo"],["Ana e Pedro viajaram.","composto","dois núcleos: Ana e Pedro"],["O cachorro e o gato dormem juntos.","composto","dois núcleos: cachorro e gato"],["Fomos ao cinema ontem.","oculto (desinencial)","a terminação “-mos” mostra que é “nós”"],["Estudei a noite toda.","oculto (desinencial)","a terminação mostra que é “eu”"],["Vendemos o carro.","oculto (desinencial)","“-mos” = nós"],["Roubaram minha bicicleta.","indeterminado","verbo na 3ª pessoa do plural sem dizer quem"],["Precisa-se de vendedores.","indeterminado","verbo + se, com preposição (de): não se sabe quem precisa"],["Disseram que vai chover.","indeterminado","3ª do plural, sem referência a quem disse"],["Choveu muito ontem.","oração sem sujeito","fenômeno da natureza"],["Há três alunos na sala.","oração sem sujeito","“haver” = existir não tem sujeito"],["Faz frio no inverno.","oração sem sujeito","“fazer” indicando clima/tempo"],["Ventou forte no litoral.","oração sem sujeito","fenômeno da natureza"],["Amanheceu nublado.","oração sem sujeito","fenômeno da natureza"]];
const FUNCOES=["sujeito","objeto direto","objeto indireto","adjunto adverbial","predicativo do sujeito","adjunto adnominal","aposto","vocativo"];
const DEF_FUNC={"sujeito":"Sujeito: de quem se fala; responde “quem?” ao verbo.","objeto direto":"Objeto direto: completa o verbo sem preposição (comprei um livro).","objeto indireto":"Objeto indireto: completa o verbo com preposição (gosto de chocolate).","adjunto adverbial":"Adjunto adverbial: circunstância de tempo, lugar, modo... (chegou cedo).","predicativo do sujeito":"Predicativo do sujeito: característica do sujeito, geralmente com verbo de ligação (está nublado).","adjunto adnominal":"Adjunto adnominal: acompanha o substantivo e o especifica (o livro de história).","aposto":"Aposto: explica um termo, entre vírgulas (Paulo, meu primo, ...).","vocativo":"Vocativo: chamamento (Carlos, venha cá!)."};
const TERMOS=[["Comprei um livro novo.","um livro novo","objeto direto","quem compra, compra algo: complemento sem preposição"],["Vi o filme ontem.","o filme","objeto direto","quem vê, vê algo: sem preposição"],["Encontrei a chave.","a chave","objeto direto","quem encontra, encontra algo: sem preposição"],["Gosto de chocolate.","de chocolate","objeto indireto","quem gosta, gosta de algo: com preposição"],["Ela entregou o bilhete ao porteiro.","ao porteiro","objeto indireto","entregar a alguém: com preposição"],["Ele precisa de ajuda.","de ajuda","objeto indireto","precisar de algo: com preposição"],["Obedeça aos pais.","aos pais","objeto indireto","obedecer a alguém: com preposição"],["Os alunos fizeram a prova.","Os alunos","sujeito","quem fez a prova? os alunos"],["A chuva alagou a rua.","A chuva","sujeito","quem alagou? a chuva"],["Chegamos cedo.","cedo","adjunto adverbial","indica tempo (quando chegamos)"],["Moro em Campinas.","em Campinas","adjunto adverbial","indica lugar"],["Trabalhou com dedicação.","com dedicação","adjunto adverbial","indica modo"],["O céu está nublado.","nublado","predicativo do sujeito","característica do céu ligada pelo verbo “está”"],["Ela parece feliz.","feliz","predicativo do sujeito","característica dela ligada por “parece”"],["O menino ficou triste.","triste","predicativo do sujeito","característica do menino ligada por “ficou”"],["Paulo, meu primo, chegou.","meu primo","aposto","explica quem é Paulo"],["Carlos, venha cá!","Carlos","vocativo","é um chamamento"],["O livro de história sumiu.","de história","adjunto adnominal","especifica o substantivo “livro”"]];
tema({id:"p-termos", s:0, nome:"Termos da oração: sujeito e complementos",
aula:`<p><b>Oração</b> é a frase organizada em torno de um <b>verbo</b>. Seus termos principais são o <b>sujeito</b> (de quem se fala) e o <b>predicado</b> (o que se diz do sujeito, sempre com verbo).</p>
<h4>Como achar o sujeito</h4><p>Pergunte “<b>quem?</b>” ou “<b>o quê?</b>” antes do verbo: “Os alunos fizeram a prova.” → Quem fez? <b>Os alunos</b>.</p>
<table><tr><th>Tipo de sujeito</th><th>Exemplo</th></tr>
<tr><td><b>Simples</b> (1 núcleo)</td><td><b>Os meninos</b> jogaram.</td></tr>
<tr><td><b>Composto</b> (2+ núcleos)</td><td><b>Ana e Pedro</b> viajaram.</td></tr>
<tr><td><b>Oculto/desinencial</b> (a terminação mostra)</td><td>Fomos ao cinema. (nós)</td></tr>
<tr><td><b>Indeterminado</b> (não se sabe quem)</td><td>Roubaram meu celular. / Precisa-se de ajuda.</td></tr>
<tr><td><b>Oração sem sujeito</b></td><td>Choveu. / Há três alunos. / Faz frio.</td></tr></table>
<h4>Complementos e outros termos</h4>
<ul><li><b>Objeto direto</b>: completa o verbo <b>sem preposição</b>. “Comprei <b>um livro</b>.”</li>
<li><b>Objeto indireto</b>: completa o verbo <b>com preposição</b> (a, de, em, para...). “Gosto <b>de chocolate</b>.” “Entreguei o livro <b>ao professor</b>.”</li>
<li><b>Adjunto adverbial</b>: circunstância (tempo, lugar, modo). “Cheguei <b>cedo</b>.” “Moro <b>em Campinas</b>.”</li>
<li><b>Predicativo do sujeito</b>: característica do sujeito, ligada por <b>verbo de ligação</b> (ser, estar, parecer, ficar, permanecer, continuar). “O céu está <b>nublado</b>.”</li>
<li><b>Adjunto adnominal</b>: acompanha o substantivo. “O livro <b>de história</b>.”</li>
<li><b>Aposto</b>: explica um termo, entre vírgulas. “Paulo, <b>meu primo</b>, chegou.”</li>
<li><b>Vocativo</b>: chamamento. “<b>Carlos</b>, venha cá!”</li></ul>
<p><i>Truque do objeto: “quem compra, compra <b>algo</b>” (direto); “quem gosta, gosta <b>de</b> algo” (indireto).</i></p>`,
gen(){
  if(R(2)){ const [f,c,e]=pick(SUJS);
    return {q:"Em “"+f+"”, o sujeito é classificado como:", como:"Pergunte “quem?” ao verbo. Se a resposta aparece na frase: conte os núcleos (1 = simples, 2+ = composto). Se não aparece mas a terminação do verbo mostra (fomos = nós): oculto. Se alguém fez, mas não se sabe quem: indeterminado. Se é chuva/vento, haver = existir ou fazer = tempo: sem sujeito.",
      c, w:quatro(c,TIPOS_SUJ), e:DEF_SUJ[c]+" Aqui: "+e+".", def:DEF_SUJ}; }
  const [f,t,c,e]=pick(TERMOS);
  return {q:"Em “"+f+"”, o termo “"+t+"” funciona como:", como:"Ache o verbo. O termo responde “quem?” antes do verbo (sujeito)? Completa o verbo sem preposição (objeto direto) ou com preposição (objeto indireto)? Indica tempo, lugar ou modo (adjunto adverbial)? É uma característica do sujeito com verbo de ligação (predicativo)? Explica um termo entre vírgulas (aposto) ou chama alguém (vocativo)?",
    c, w:quatro(c,mix(FUNCOES)), e:DEF_FUNC[c]+" Aqui: "+e+".", def:DEF_FUNC};
}});

/* ---------- 14. TIPOS DE PREDICADO ---------- */
const PRED=["verbal","nominal","verbo-nominal"];
const DEF_PRED={"verbal":"Verbal: o núcleo é um verbo de ação (Os alunos estudaram).","nominal":"Nominal: verbo de ligação + característica do sujeito (A prova estava difícil).","verbo-nominal":"Verbo-nominal: verbo de ação + característica do sujeito (Os alunos saíram felizes)."};
const PREDS=[["Os alunos estudaram a matéria.","verbal","“estudaram” é ação"],["O menino correu no parque.","verbal","“correu” é ação"],["Ela comprou um vestido.","verbal","“comprou” é ação"],["Choveu a noite toda.","verbal","“choveu” é fenômeno da natureza (verbo significativo)"],["A prova estava difícil.","nominal","“estava” é verbo de ligação; “difícil” é o predicativo"],["O céu ficou escuro.","nominal","“ficou” (verbo de ligação) + “escuro”"],["Meu pai é engenheiro.","nominal","“é” (verbo de ligação) + “engenheiro”"],["Ela parece cansada.","nominal","“parece” (ligação) + “cansada”"],["A sala permaneceu vazia.","nominal","“permaneceu” (ligação) + “vazia”"],["Os alunos saíram felizes.","verbo-nominal","“saíram” é ação e “felizes” é o estado do sujeito"],["O time voltou campeão.","verbo-nominal","“voltou” (ação) + “campeão” (característica do time)"],["A menina chegou cansada.","verbo-nominal","“chegou” (ação) + “cansada”"],["Ele acordou animado.","verbo-nominal","“acordou” (ação) + “animado”"]];
tema({id:"p-predicado", s:0, nome:"Tipos de predicado e verbos de ligação",
aula:`<p>O <b>predicado</b> é tudo o que se diz do sujeito. Há três tipos, e tudo depende do <b>verbo</b>:</p>
<h4>Verbo de ligação × verbo significativo</h4><p><b>Verbo de ligação</b> não indica ação: só <b>liga</b> o sujeito a uma característica. Os principais: <b>ser, estar, parecer, ficar, permanecer, continuar, andar</b> (= estar), <b>virar</b> (= tornar-se). <b>Verbo significativo</b> (de ação) indica o que o sujeito faz: correr, comprar, estudar.</p>
<table><tr><th>Tipo</th><th>Como é</th><th>Exemplo</th></tr>
<tr><td><b>Verbal</b></td><td>Núcleo = verbo de ação</td><td>Os alunos <b>estudaram</b> a matéria.</td></tr>
<tr><td><b>Nominal</b></td><td>Verbo de ligação + predicativo (característica)</td><td>A prova <b>estava difícil</b>.</td></tr>
<tr><td><b>Verbo-nominal</b></td><td>Verbo de ação + predicativo (dois núcleos)</td><td>Os alunos <b>saíram felizes</b>.</td></tr></table>
<p><b>Truque do verbo-nominal:</b> dá para dividir em duas frases: “Os alunos saíram felizes” = “Os alunos saíram” + “Os alunos estavam felizes”.</p>
<p><b>Cuidado:</b> “andar” pode ser ação (Ele andou no parque → verbal) ou ligação (Ele anda triste = está triste → nominal). Sempre veja o sentido.</p>`,
gen(){ const [f,c,e]=pick(PREDS);
  return {q:"Em “"+f+"”, o predicado é:", como:"Ache o verbo. Ele é de ligação (ser, estar, parecer, ficar, permanecer...)? Então é nominal. É de ação? Veja se há também uma característica do sujeito (saíram felizes): se houver, verbo-nominal; se não, verbal.",
    c, w:quatro(c,["verbal","nominal","verbo-nominal","inexistente, pois não há verbo","nominal, pois tem objeto direto"]), e:DEF_PRED[c]+" Aqui: "+e+".", def:Object.assign({"inexistente, pois não há verbo":"Toda oração tem verbo, e todo predicado tem um verbo.","nominal, pois tem objeto direto":"Objeto direto aparece em predicado verbal, não define o nominal."},DEF_PRED)}; }});

/* ---------- 15. ORAÇÕES COORDENADAS E SUBORDINADAS ---------- */
const ORAC=[["Estudei muito, mas não passei.","coordenada sindética adversativa","ligadas por “mas” (oposição)"],["Ela canta e ele toca violão.","coordenada sindética aditiva","ligadas por “e” (soma)"],["Ou você estuda, ou trabalha.","coordenada sindética alternativa","ligadas por “ou... ou”"],["Choveu muito, portanto a rua alagou.","coordenada sindética conclusiva","ligadas por “portanto” (conclusão)"],["Volte cedo, pois vai chover.","coordenada sindética explicativa","“pois” explica o pedido"],["Cheguei, tomei banho, dormi.","coordenada assindética","sem conjunção, só vírgulas"],["Não fui à aula porque estava doente.","subordinada adverbial causal","“porque” indica a causa"],["Embora estivesse cansado, ele correu.","subordinada adverbial concessiva","“embora” indica concessão"],["Se chover, o jogo será adiado.","subordinada adverbial condicional","“se” indica condição"],["Quando o sinal tocou, todos saíram.","subordinada adverbial temporal","“quando” indica tempo"],["Estudou para que pudesse passar.","subordinada adverbial final","“para que” indica finalidade"],["Espero que você venha.","subordinada substantiva objetiva direta","“que você venha” é o objeto de “espero” (espero isso)"],["O livro que comprei é ótimo.","subordinada adjetiva restritiva","“que comprei” caracteriza o livro, como um adjetivo"]];
const TIPOS_ORAC=[...new Set(ORAC.map(o=>o[1]))];
tema({id:"p-oracoes", s:0, nome:"Orações coordenadas e subordinadas",
aula:`<p><b>Período</b> é a frase com um ou mais verbos. Cada verbo forma uma <b>oração</b>. Período com mais de uma oração é <b>composto</b>, e as orações se ligam de dois jeitos:</p>
<h4>Coordenação (orações independentes)</h4><p>Cada oração tem sentido completo sozinha. “Estudei muito. | Não passei.”</p>
<ul><li><b>Assindética</b>: sem conjunção, só vírgula. “Cheguei, vi, venci.”</li><li><b>Sindética</b>: com conjunção. Classifica-se pela ideia: <b>aditiva</b> (e, nem), <b>adversativa</b> (mas, porém), <b>alternativa</b> (ou... ou), <b>conclusiva</b> (portanto, logo), <b>explicativa</b> (pois, porque).</li></ul>
<h4>Subordinação (uma depende da outra)</h4><p>A oração subordinada faz papel de um termo da principal.</p>
<ul><li><b>Adverbiais</b> (papel de advérbio): causal (porque, já que), concessiva (embora), condicional (se, caso), temporal (quando), final (para que), consecutiva (tão... que), comparativa, conformativa (conforme), proporcional (à medida que).</li>
<li><b>Substantivas</b> (papel de substantivo), quase sempre com “que” ou “se” integrante: “Espero <b>que você venha</b>” = espero <b>isso</b> (objeto direto).</li>
<li><b>Adjetivas</b> (papel de adjetivo), com pronome relativo: “O livro <b>que comprei</b> é ótimo” = o livro comprado.</li></ul>
<p><i>Truque: tire a oração. Se a outra fica “capenga”, sem sentido, é porque uma dependia da outra (subordinação).</i></p>`,
gen(){ const [f,c,e]=pick(ORAC);
  return {q:"No período “"+f+"”, a segunda oração (ou a oração destacada pela conjunção) é:", como:"1) Há conjunção? Se não, e as orações são separadas por vírgula, é coordenada assindética. 2) Se há, identifique a ideia dela (oposição, soma, causa, condição, tempo...). 3) “Mas, e, ou, portanto, pois” = coordenadas. “Porque (causa), embora, se, quando, para que” = subordinadas adverbiais. “Que” depois de verbo como “espero, quero” = substantiva; “que” depois de substantivo = adjetiva.",
    c, w:quatro(c,mix(TIPOS_ORAC)), e:"É "+c+": "+e+"."}; }});

/* ---------- 16. VOZES VERBAIS ---------- */
const VOZ=[["Os fiscais recolheram as provas.","As provas foram recolhidas pelos fiscais.",["As provas serão recolhidas pelos fiscais.","As provas recolheram os fiscais.","Os fiscais foram recolhidos pelas provas.","As provas são recolhidas pelos fiscais."]],["O menino quebrou a janela.","A janela foi quebrada pelo menino.",["A janela é quebrada pelo menino.","O menino foi quebrado pela janela.","A janela quebrou o menino.","A janela será quebrada pelo menino."]],["Os alunos pintaram o muro.","O muro foi pintado pelos alunos.",["O muro foi pintado pelo aluno.","Os alunos foram pintados pelo muro.","O muro será pintado pelos alunos.","O muro pinta os alunos."]],["A professora corrige as redações.","As redações são corrigidas pela professora.",["As redações foram corrigidas pela professora.","A professora é corrigida pelas redações.","As redações serão corrigidas pela professora.","As redações corrigem a professora."]],["O cachorro mordeu o carteiro.","O carteiro foi mordido pelo cachorro.",["O cachorro foi mordido pelo carteiro.","O carteiro é mordido pelo cachorro.","O carteiro será mordido pelo cachorro.","O carteiro mordeu o cachorro."]],["Os bombeiros salvarão as vítimas.","As vítimas serão salvas pelos bombeiros.",["As vítimas foram salvas pelos bombeiros.","Os bombeiros serão salvos pelas vítimas.","As vítimas são salvas pelos bombeiros.","As vítimas salvarão os bombeiros."]]];
const TIPOS_VOZ=["ativa","passiva analítica","passiva sintética","reflexiva"];
const DEF_VOZ={"ativa":"Ativa: o sujeito pratica a ação (O menino quebrou a janela).","passiva analítica":"Passiva analítica: o sujeito sofre a ação; ser + particípio + agente (A janela foi quebrada pelo menino).","passiva sintética":"Passiva sintética: verbo + se, e o sujeito sofre a ação (Vendem-se casas = casas são vendidas).","reflexiva":"Reflexiva: o sujeito pratica e recebe a ação (Ela se penteou = penteou a si mesma)."};
const VOZES=[["O menino quebrou a janela.","ativa"],["A professora explicou a matéria.","ativa"],["A janela foi quebrada pelo menino.","passiva analítica"],["O bolo foi feito pela avó.","passiva analítica"],["As provas serão corrigidas amanhã.","passiva analítica"],["Vendem-se casas.","passiva sintética"],["Alugam-se apartamentos.","passiva sintética"],["Consertam-se bicicletas.","passiva sintética"],["Ela se penteou diante do espelho.","reflexiva"],["O menino se machucou na queda.","reflexiva"],["Ele se olhou no espelho.","reflexiva"]];
tema({id:"p-vozes", s:0, nome:"Vozes verbais (ativa, passiva, reflexiva)",
aula:`<p>A <b>voz do verbo</b> mostra se o sujeito <b>pratica</b> ou <b>sofre</b> a ação.</p>
<ul><li><b>Ativa</b>: o sujeito faz. “<b>Os fiscais</b> recolheram as provas.”</li>
<li><b>Passiva analítica</b>: o sujeito sofre. Forma: <b>ser + particípio</b> + <b>agente</b> (por/pelo). “<b>As provas</b> foram recolhidas <b>pelos fiscais</b>.”</li>
<li><b>Passiva sintética</b>: verbo + <b>se</b>. “Vendem-<b>se</b> casas.” (= casas são vendidas). O verbo concorda com o sujeito: vend<b>em</b>-se casa<b>s</b>.</li>
<li><b>Reflexiva</b>: o sujeito faz e recebe. “Ela <b>se</b> penteou.” (penteou a si mesma)</li></ul>
<h4>Como passar da ativa para a passiva (3 passos)</h4><ol><li>O <b>objeto direto</b> vira <b>sujeito</b>: “as provas”.</li><li>O verbo vira <b>ser + particípio</b>, <b>no mesmo tempo</b> do verbo original: recolheram (passado) → <b>foram</b> recolhidas. Recolhem → <b>são</b> recolhidas. Recolherão → <b>serão</b> recolhidas.</li><li>O antigo sujeito vira <b>agente da passiva</b>, com “por/pelo(s)/pela(s)”: pelos fiscais.</li></ol>
<p><i>Erro mais comum: mudar o tempo do verbo. Se a ativa está no passado, a passiva também tem de estar.</i></p>`,
gen(){
  if(R(2)){ const [a,c,w]=pick(VOZ);
    return {q:"Passando “"+a+"” para a voz passiva, obtém-se:", como:"1) O objeto direto vira sujeito. 2) Use ser + particípio no MESMO tempo do verbo original (passado → foi/foram; presente → é/são; futuro → será/serão). 3) O antigo sujeito vira agente com “pelo(s)/pela(s)”. Confira concordância e tempo.",
      c, w:sample(w,4), e:"Objeto vira sujeito, verbo no mesmo tempo com ser + particípio, e o agente com “por”: “"+c+"”."}; }
  const [f,c]=pick(VOZES);
  return {q:"Em “"+f+"”, o verbo está na voz:", como:"O sujeito faz a ação (ativa) ou sofre (passiva)? Há “ser + particípio” (foi feito)? Passiva analítica. Há verbo + “se” e dá para trocar por “são ...ados”? Passiva sintética. O sujeito faz em si mesmo? Reflexiva.",
    c, w:quatro(c,TIPOS_VOZ.concat(["passiva, pois o sujeito pratica a ação"])), e:DEF_VOZ[c], def:Object.assign({"passiva, pois o sujeito pratica a ação":"Na passiva o sujeito sofre a ação, não pratica."},DEF_VOZ)};
}});

/* ---------- 17. COLOCAÇÃO PRONOMINAL ---------- */
const COLOC=[["Ninguém me avisou.","Ninguém avisou-me.","Palavra negativa (ninguém) atrai o pronome: próclise."],["Não me deixe sozinho.","Não deixe-me sozinho.","“Não” atrai o pronome para antes do verbo."],["Nunca lhe disse a verdade.","Nunca disse-lhe a verdade.","“Nunca” atrai o pronome."],["Disseram-me que a prova mudou.","Me disseram que a prova mudou.","Não se começa frase com pronome oblíquo (na norma-padrão): ênclise."],["Entregue-me o caderno.","Me entregue o caderno.","No início da frase e no imperativo afirmativo, usa-se ênclise."],["Quem te contou isso?","Quem contou-te isso?","Pronome interrogativo (quem) atrai o pronome."],["Espero que me ligue.","Espero que ligue-me.","A conjunção “que” atrai o pronome."],["Tudo se resolveu.","Tudo resolveu-se.","Pronome indefinido (tudo) atrai o pronome."],["Aqui se fala inglês.","Aqui fala-se inglês.","Advérbio (aqui) sem vírgula atrai o pronome."],["Já te expliquei a matéria.","Já expliquei-te a matéria.","O advérbio “já” atrai o pronome."],["Dir-te-ei a verdade.","Direi-te a verdade.","No futuro do presente, sem palavra atrativa, usa-se mesóclise (pronome no meio)."],["Far-se-á a reunião amanhã.","Fará-se a reunião amanhã.","Futuro do presente no início: mesóclise."]];
tema({id:"p-coloc", s:0, nome:"Colocação pronominal",
aula:`<p>É a <b>posição dos pronomes oblíquos átonos</b> (me, te, se, o, a, lhe, nos, vos, os, as, lhes) em relação ao verbo.</p>
<table><tr><th>Nome</th><th>Posição</th><th>Exemplo</th></tr>
<tr><td><b>Próclise</b></td><td>antes do verbo</td><td>Não <b>me</b> avisou.</td></tr>
<tr><td><b>Ênclise</b></td><td>depois do verbo, com hífen</td><td>Avisou-<b>me</b>.</td></tr>
<tr><td><b>Mesóclise</b></td><td>no meio do verbo (só futuro)</td><td>Avisar-<b>me</b>-á.</td></tr></table>
<h4>Próclise é obrigatória com palavras que “atraem” o pronome</h4><ul><li><b>Negativas</b>: não, nunca, jamais, ninguém, nada. “<b>Não</b> me deixe.”</li><li><b>Advérbios</b> (sem vírgula depois): já, aqui, sempre, talvez. “<b>Aqui</b> se fala inglês.”</li><li><b>Pronomes</b> indefinidos, relativos e interrogativos: tudo, alguém, que, quem. “<b>Quem</b> te contou?”</li><li><b>Conjunções subordinativas</b>: que, se, quando, embora. “Espero <b>que</b> me ligue.”</li></ul>
<h4>Ênclise</h4><ul><li><b>Início de frase</b>: na norma-padrão não se começa frase com pronome oblíquo. “<b>Disseram-me</b>...” (e não “Me disseram”).</li><li><b>Imperativo afirmativo</b>: “Entregue-<b>me</b>.”</li><li>Depois de vírgula/pausa.</li></ul>
<h4>Mesóclise</h4><p>Só com <b>futuro do presente</b> e <b>futuro do pretérito</b>, sem palavra atrativa: “Dir-<b>te</b>-ei”, “Far-<b>se</b>-ia”. Com palavra atrativa, volta a próclise: “Não te direi”.</p>`,
gen: certoErrado(COLOC,"Assinale a frase com a colocação pronominal de acordo com a norma-padrão.","Assinale a frase com colocação pronominal INCORRETA segundo a norma-padrão.","Procure palavras atrativas antes do verbo (não, nunca, ninguém, que, quem, tudo, já, aqui): se houver, o pronome vai antes (próclise). Frase começando com verbo: pronome depois (ênclise). Futuro sem atrativo: mesóclise.")});

/* ---------- 18. CRASE ---------- */
const CRASE=[["Vou à escola amanhã.","Vou a escola amanhã.","Quem vai, vai a algum lugar (a) + a escola (a) = à. Teste: “vou ao colégio”."],["Entreguei o convite à diretora.","Entreguei o convite a diretora.","Entregar a alguém (a) + a diretora (a) = à."],["Chegamos às 10 horas.","Chegamos as 10 horas.","Horas exatas levam crase: às 10h."],["Fomos à praia no domingo.","Fomos a praia no domingo.","Ir a + a praia = à. Teste: “fomos ao clube”."],["Ele saiu às pressas.","Ele saiu as pressas.","Locução adverbial feminina (às pressas, às vezes, à noite) leva crase."],["Comi bife à milanesa.","Comi bife a milanesa.","“À moda de” (à milanesa) leva crase."],["Fui a pé até a escola.","Fui à pé até a escola.","Não há crase antes de palavra masculina (pé)."],["Estamos dispostos a ajudar.","Estamos dispostos à ajudar.","Não há crase antes de verbo."],["Ela viaja a partir de segunda.","Ela viaja à partir de segunda.","“Partir” é verbo: sem crase."],["Assisti a um filme ótimo.","Assisti à um filme ótimo.","Não há crase antes de artigo indefinido (um, uma)."],["Fiquei cara a cara com ele.","Fiquei cara à cara com ele.","Entre palavras repetidas não há crase."],["Entreguei o livro a ela.","Entreguei o livro à ela.","Não há crase antes de pronome pessoal (ela)."],["Dirijo-me a Vossa Excelência.","Dirijo-me à Vossa Excelência.","Não há crase antes de pronomes de tratamento (exceto senhora, dona, senhorita)."],["Falei a várias pessoas.","Falei à várias pessoas.","“A” no singular antes de palavra no plural é só preposição: sem crase."],["Volto à noite.","Volto a noite.","“À noite” é locução adverbial feminina: crase."]];
tema({id:"p-crase", s:0, nome:"Crase",
aula:`<p><b>Crase</b> é a fusão de <b>a</b> (preposição) + <b>a</b> (artigo feminino) = <b>à</b>. O acento grave (`+"`"+`) mostra essa fusão. Só existe crase se as <b>duas</b> coisas aparecem: um verbo/nome que pede “a” <b>e</b> uma palavra feminina que aceita “a”.</p>
<h4>Truques que resolvem quase tudo</h4><ul><li><b>Troque por uma palavra masculina</b>. Se aparecer “<b>ao</b>”, tem crase: “Vou <b>à</b> escola” → “Vou <b>ao</b> colégio” ✓. “Comprei a blusa” → “Comprei o casaco” (sem “ao”) → sem crase.</li>
<li><b>Lugares: “vou a, volto da, crase há; vou a, volto de, crase pra quê?”</b> Volto <b>da</b> Bahia → Vou <b>à</b> Bahia. Volto <b>de</b> Campinas → Vou <b>a</b> Campinas.</li></ul>
<h4>Sempre tem crase</h4><ul><li><b>Horas</b>: às 10h, à uma hora.</li><li><b>Locuções femininas</b>: às vezes, à noite, à tarde, às pressas, à direita, à esquerda, à vontade.</li><li><b>À moda de</b>: bife à milanesa, arroz à grega.</li></ul>
<h4>Nunca tem crase</h4><ul><li>Antes de <b>palavra masculina</b>: a pé, a cavalo.</li><li>Antes de <b>verbo</b>: a partir, a ajudar.</li><li>Antes de <b>pronomes pessoais e de tratamento</b>: a ela, a você, a Vossa Excelência (exceção: à senhora).</li><li>Antes de <b>artigo indefinido</b>: a uma, a um.</li><li><b>Palavras repetidas</b>: cara a cara, gota a gota.</li><li>“<b>a</b>” singular antes de <b>plural</b>: a pessoas, a várias.</li></ul>`,
gen: certoErrado(CRASE,"Em qual frase o uso (ou a ausência) do acento indicativo de crase está correto?","Em qual frase há ERRO no uso do acento indicativo de crase?","Faça o teste da troca: coloque uma palavra masculina no lugar da feminina. Se surgir “ao”, tem crase. Lembre: nunca há crase antes de verbo, palavra masculina, pronome pessoal, “um/uma” e palavras repetidas; sempre há em horas e locuções femininas (às vezes, à noite).")});

/* ---------- 19. PARÔNIMOS E HOMÔNIMOS (com dicionário) ---------- */
const DIC_PAR={absolver:"declarar inocente, perdoar",absorver:"sugar, puxar para dentro",eminente:"ilustre, importante, famoso",iminente:"prestes a acontecer",descrição:"ato de descrever, contar como algo é","discrição":"qualidade de quem é discreto, reserva",infringir:"desrespeitar uma regra ou lei",infligir:"aplicar pena ou castigo",flagrante:"percebido no exato momento em que acontece",fragrante:"perfumado, cheiroso",emigrar:"sair do próprio país para viver em outro",imigrar:"entrar em um país estrangeiro para viver nele",retificar:"corrigir",ratificar:"confirmar, validar",comprimento:"medida de uma ponta à outra (extensão)",cumprimento:"saudação; ato de cumprir",mandado:"ordem judicial escrita",mandato:"período em que alguém exerce um cargo eleito","tráfego":"trânsito, movimento de veículos","tráfico":"comércio ilegal","sessão":"reunião; tempo de uma apresentação (de cinema)","seção":"divisão, setor, departamento","cessão":"ato de ceder, de dar",cela:"pequeno quarto de prisão",sela:"assento posto no lombo do cavalo",concerto:"apresentação musical; acordo",conserto:"reparo, ato de consertar",acender:"pôr fogo; ligar a luz",ascender:"subir, elevar-se",censo:"contagem oficial da população",senso:"juízo, capacidade de entender e julgar",mau:"ruim (adjetivo, o contrário de bom)",mal:"de modo ruim (advérbio, o contrário de bem); ou doença","há":"verbo haver: indica tempo que já passou",a:"indica tempo futuro ou distância (daqui a dois dias)"};
const PAR=[["O juiz decidiu ___ o réu por falta de provas.","absolver",["absorver"]],["A esponja serve para ___ a água derramada.","absorver",["absolver"]],["O perigo era ___: a ponte ia cair a qualquer momento.","iminente",["eminente"]],["O congresso recebeu um ___ cientista, famoso no mundo todo.","eminente",["iminente"]],["Ele guardou o segredo com total ___.","discrição",["descrição"]],["Faça uma ___ detalhada do local do acidente.","descrição",["discrição"]],["Quem avança o sinal vermelho comete o erro de ___ a lei.","infringir",["infligir"]],["O juiz vai ___ uma pena severa ao culpado.","infligir",["infringir"]],["A câmera registrou o ladrão em ___.","flagrante",["fragrante"]],["O perfume de rosas deixou o ar ___.","fragrante",["flagrante"]],["Ele decidiu ___ do Brasil para trabalhar no Japão.","emigrar",["imigrar"]],["O professor precisou ___ a nota que estava errada.","retificar",["ratificar"]],["O presidente vai ___ o acordo, confirmando o que foi combinado.","ratificar",["retificar"]],["A mesa tem dois metros de ___.","comprimento",["cumprimento"]],["Ele fez um ___ educado ao chegar à festa.","cumprimento",["comprimento"]],["O policial chegou com um ___ de prisão assinado pelo juiz.","mandado",["mandato"]],["O ___ do prefeito dura quatro anos.","mandato",["mandado"]],["O ___ de veículos está intenso na avenida.","tráfego",["tráfico"]],["A polícia combate o ___ de animais silvestres.","tráfico",["tráfego"]],["A ___ de cinema começa às 20h.","sessão",["seção","cessão"]],["Procure os livros na ___ de literatura da biblioteca.","seção",["sessão","cessão"]],["O preso voltou para a ___ depois do banho de sol.","cela",["sela"]],["O cavaleiro ajeitou a ___ no lombo do cavalo.","sela",["cela"]],["O técnico fez o ___ da geladeira.","conserto",["concerto"]],["A orquestra apresentou um belo ___ no teatro.","concerto",["conserto"]],["Está escuro; é preciso ___ a luz da sala.","acender",["ascender"]],["O balão começou a ___ ao céu.","ascender",["acender"]],["O IBGE faz o ___ para contar a população.","censo",["senso"]],["Ele tem bom ___ e sempre age com juízo.","senso",["censo"]],["Ele é um ___ aluno: nunca faz a lição.","mau",["mal"]],["Ele dormiu ___ por causa do barulho.","mal",["mau"]],["Moro nesta cidade ___ dez anos.","há",["a"]],["Daqui ___ duas semanas, começam as férias.","a",["há"]]];
tema({id:"p-paronimos", s:0, nome:"Parônimos e homônimos (com dicionário)",
aula:`<p><b>Parônimos</b> são palavras <b>parecidas</b> na escrita e no som, mas com <b>sentidos diferentes</b>. <b>Homônimos</b> têm a <b>mesma pronúncia</b> (e às vezes a mesma escrita), com sentidos diferentes. A prova cobra o significado: por isso, decore os pares abaixo.</p>
<table><tr><th>Palavra</th><th>Significado</th><th>Palavra</th><th>Significado</th></tr>
<tr><td>absolver</td><td>declarar inocente</td><td>absorver</td><td>sugar, puxar para dentro</td></tr>
<tr><td>eminente</td><td>ilustre, importante</td><td>iminente</td><td>prestes a acontecer</td></tr>
<tr><td>descrição</td><td>ato de descrever</td><td>discrição</td><td>reserva, ser discreto</td></tr>
<tr><td>infringir</td><td>desrespeitar regra</td><td>infligir</td><td>aplicar pena/castigo</td></tr>
<tr><td>flagrante</td><td>visto no momento do ato</td><td>fragrante</td><td>perfumado</td></tr>
<tr><td>emigrar</td><td>sair do país</td><td>imigrar</td><td>entrar em outro país</td></tr>
<tr><td>retificar</td><td>corrigir</td><td>ratificar</td><td>confirmar</td></tr>
<tr><td>comprimento</td><td>extensão, medida</td><td>cumprimento</td><td>saudação; ato de cumprir</td></tr>
<tr><td>mandado</td><td>ordem judicial</td><td>mandato</td><td>período de cargo eleito</td></tr>
<tr><td>tráfego</td><td>trânsito</td><td>tráfico</td><td>comércio ilegal</td></tr>
<tr><td>sessão</td><td>reunião, apresentação</td><td>seção / cessão</td><td>divisão, setor / ato de ceder</td></tr>
<tr><td>cela</td><td>quarto de prisão</td><td>sela</td><td>assento do cavalo</td></tr>
<tr><td>concerto</td><td>show musical; acordo</td><td>conserto</td><td>reparo</td></tr>
<tr><td>acender</td><td>pôr fogo, ligar</td><td>ascender</td><td>subir</td></tr>
<tr><td>censo</td><td>contagem da população</td><td>senso</td><td>juízo, entendimento</td></tr>
<tr><td>mau</td><td>contrário de <b>bom</b></td><td>mal</td><td>contrário de <b>bem</b></td></tr>
<tr><td>há</td><td>tempo passado (há 2 anos)</td><td>a</td><td>tempo futuro (daqui a 2 anos)</td></tr></table>
<p><b>Truques:</b> <i>mau/mal</i>: troque por bom/bem (“um <b>mau</b> aluno” → “um bom aluno”). <i>Emigrar</i>: <b>E</b> de <b>E</b>xit (sair); <i>imigrar</i>: <b>I</b> de <b>I</b>n (entrar). <i>Iminente</i>: “<b>i</b>ndo acontecer”. <i>Ascender</i>: o <b>s</b> de <b>s</b>ubir.</p>`,
gen(){
  const [f,c,par]=pick(PAR);
  const extras=mix(Object.keys(DIC_PAR).filter(p=>p!==c && !par.includes(p) && p!=="a" && p!=="há"));
  const w=quatro(c,par.concat(extras));
  return {q:"Complete corretamente: “"+f.replace("___","______")+"”", como:"Leia a frase e descubra o SENTIDO que falta (inocentar? sugar? prestes a acontecer?). Depois veja, no dicionário abaixo das alternativas (aparece após responder) ou na aula, qual palavra tem esse sentido. Cuidado com o par parecido: "+[c].concat(par).join(" × ")+".",
    c, w, xs:w.map(p=>"“"+p+"” significa: "+DIC_PAR[p]+"."),
    e:"“"+c+"” significa "+DIC_PAR[c]+". Fica: “"+f.replace("___",c)+"”",
    g:[c].concat(w).map(p=>[p,DIC_PAR[p]])};
}});

/* ---------- 20. SINÔNIMOS E ANTÔNIMOS (com dicionário) ---------- */
const SIN=[["prolixo","que fala ou escreve demais, que se alonga","verboso","conciso"],["conciso","que diz muito em poucas palavras","breve","prolixo"],["taxativo","firme, que não deixa dúvida","categórico","hesitante"],["efêmero","que dura pouco","passageiro","duradouro"],["perene","que dura muito ou para sempre","duradouro","efêmero"],["loquaz","que fala muito","falante","calado"],["benévolo","que tem boa vontade, bondoso","bondoso","malévolo"],["íntegro","honesto, correto","honesto","corrupto"],["obsoleto","fora de uso, ultrapassado","ultrapassado","moderno"],["exímio","excelente no que faz","excelente","medíocre"],["árduo","difícil, cansativo","penoso","fácil"],["cauteloso","que age com cuidado","prudente","imprudente"],["astuto","esperto, sagaz","esperto","ingênuo"],["escasso","que existe em pouca quantidade","raro","abundante"],["abundante","que existe em grande quantidade","farto","escasso"],["diligente","cuidadoso e esforçado","aplicado","negligente"],["negligente","descuidado, desatento","descuidado","zeloso"],["ríspido","áspero, grosseiro no jeito de tratar","grosseiro","gentil"],["afável","gentil, agradável no trato","amável","ríspido"],["inerte","sem movimento, parado","parado","ativo"],["cético","que duvida de tudo","descrente","crédulo"],["remoto","distante no espaço ou no tempo","distante","próximo"],["oneroso","caro, que custa muito","custoso","barato"],["modesto","simples, que não se exibe","humilde","arrogante"],["inócuo","que não faz mal","inofensivo","nocivo"],["nocivo","que faz mal","prejudicial","inofensivo"],["ávido","que deseja muito, ansioso","sedento","indiferente"],["sóbrio","moderado, simples","comedido","exagerado"],["tênue","fino, fraco, delicado","frágil","intenso"],["lícito","permitido por lei","legal","ilícito"]];
const DIC_SIN={verboso:"que usa palavras demais",breve:"curto, de pouca duração",categórico:"firme, que não admite dúvida",hesitante:"que hesita, que tem dúvida",passageiro:"que passa logo, temporário",duradouro:"que dura muito",falante:"que fala muito",calado:"que fala pouco ou nada",bondoso:"que tem bondade",malévolo:"que deseja o mal",honesto:"que age com honestidade",corrupto:"desonesto, que se deixa subornar",ultrapassado:"que ficou velho, fora de moda",moderno:"atual, recente",excelente:"muito bom",medíocre:"comum, de qualidade baixa",penoso:"que causa sofrimento ou cansaço","fácil":"que se faz sem esforço",prudente:"que age com cuidado",imprudente:"que age sem cuidado",esperto:"inteligente, sagaz","ingênuo":"que acredita em tudo, inocente",raro:"que aparece pouco",farto:"em grande quantidade",aplicado:"esforçado, dedicado",zeloso:"cuidadoso, que tem zelo",descuidado:"que não tem cuidado",grosseiro:"sem educação, rude",gentil:"educado, delicado","amável":"que se faz amar, gentil",parado:"sem movimento",ativo:"que age, que se movimenta",descrente:"que não acredita","crédulo":"que acredita facilmente",distante:"longe","próximo":"perto",custoso:"caro, difícil",barato:"de preço baixo",humilde:"modesto, simples",arrogante:"que se acha superior",inofensivo:"que não faz mal",prejudicial:"que causa prejuízo, mal",sedento:"que tem sede; que deseja muito",indiferente:"que não se interessa",comedido:"moderado, controlado",exagerado:"em excesso","frágil":"que quebra fácil",intenso:"forte",legal:"de acordo com a lei","ilícito":"proibido por lei"};
SIN.forEach(s=>{ DIC_SIN[s[0]]=s[1]; });
/* palavras de sentido próximo: nunca entram juntas como "erradas", para não haver duas respostas possíveis */
const GRUPOS_PROX=[["gentil","amável","bondoso","benévolo","afável"],["ingênuo","crédulo"],["honesto","íntegro","lícito","legal"],["prudente","cauteloso","zeloso","diligente","aplicado","comedido","sóbrio"],["descuidado","negligente","imprudente"],["raro","escasso"],["distante","remoto"],["parado","inerte"],["grosseiro","ríspido","arrogante"],["breve","conciso","passageiro","efêmero"],["prejudicial","nocivo"],["excelente","exímio"],["calado","modesto","humilde"],["ultrapassado","obsoleto"],["frágil","tênue"],["sedento","ávido"]];
function relacionadas(ps){
  const out=new Set(ps);
  let mudou=true;
  while(mudou){ mudou=false;
    SIN.forEach(e=>{ if(e.some((x,i)=>i!==1 && out.has(x))) [e[0],e[2],e[3]].forEach(x=>{ if(!out.has(x)){ out.add(x); mudou=true; } }); });
    GRUPOS_PROX.forEach(g=>{ if(g.some(x=>out.has(x))) g.forEach(x=>{ if(!out.has(x)){ out.add(x); mudou=true; } }); });
  }
  return out;
}
tema({id:"p-sinonimos", s:0, nome:"Sinônimos e antônimos (com dicionário)",
aula:`<p><b>Sinônimos</b> são palavras de <b>sentido parecido</b> (bonito = belo). <b>Antônimos</b> têm <b>sentido oposto</b> (alto × baixo). A prova costuma usar palavras pouco comuns. Para resolver:</p>
<ol><li>Descubra o sentido da palavra pelo <b>contexto</b> da frase, se houver.</li><li>Pense numa frase simples com ela (“um texto <b>prolixo</b>, que não acaba nunca”).</li><li>Para <b>antônimo</b>, descarte primeiro os sinônimos que aparecem nas alternativas (é a pegadinha mais comum).</li></ol>
<h4>Palavras que mais caem</h4>
<table><tr><th>Palavra</th><th>Significado</th><th>Sinônimo</th><th>Antônimo</th></tr>
<tr><td>prolixo</td><td>que se alonga demais</td><td>verboso</td><td>conciso</td></tr>
<tr><td>efêmero</td><td>que dura pouco</td><td>passageiro</td><td>duradouro, perene</td></tr>
<tr><td>taxativo</td><td>firme, sem dúvida</td><td>categórico</td><td>hesitante</td></tr>
<tr><td>obsoleto</td><td>ultrapassado</td><td>antiquado</td><td>moderno</td></tr>
<tr><td>exímio</td><td>excelente</td><td>excelente</td><td>medíocre</td></tr>
<tr><td>escasso</td><td>pouco</td><td>raro</td><td>abundante</td></tr>
<tr><td>inócuo</td><td>que não faz mal</td><td>inofensivo</td><td>nocivo</td></tr>
<tr><td>afável</td><td>gentil</td><td>amável</td><td>ríspido</td></tr>
<tr><td>diligente</td><td>esforçado</td><td>aplicado</td><td>negligente</td></tr>
<tr><td>cético</td><td>que duvida</td><td>descrente</td><td>crédulo</td></tr></table>
<p>Depois de responder, aparece um <b>dicionário</b> com o significado de todas as palavras das alternativas.</p>`,
gen(){
  const s=pick(SIN), ant=R(2)===0, c=ant?s[3]:s[2];
  const proibidas=relacionadas([s[0],s[2],s[3]]);
  const pool=mix(Object.keys(DIC_SIN).filter(p=>!proibidas.has(p)));
  const w=quatro(c,(ant?[s[2]]:[]).concat(pool));
  return {q:(ant?"O ANTÔNIMO (sentido oposto)":"O SINÔNIMO (sentido parecido)")+" de “"+s[0]+"” é:",
    como:"Primeiro entenda “"+s[0]+"”: significa “"+s[1]+"”. Agora procure a alternativa com sentido "+(ant?"OPOSTO. Cuidado: se aparecer um sinônimo, ele é a pegadinha.":"IGUAL ou muito próximo.")+" O dicionário de todas as palavras aparece depois de responder.",
    c, w, xs:w.map(p=>"“"+p+"” = "+DIC_SIN[p]+"."), e:"“"+s[0]+"” = "+s[1]+". "+(ant?"Oposto":"Sinônimo")+": “"+c+"” ("+DIC_SIN[c]+").",
    g:[s[0]].concat([c],w).map(p=>[p,DIC_SIN[p]])};
}});

/* ---------- 21. FIGURAS DE LINGUAGEM ---------- */
const FIG={"metáfora":"Metáfora: comparação sem “como”; diz que uma coisa É outra (Seus olhos são estrelas).","comparação":"Comparação: aproxima duas coisas usando “como”, “feito”, “tal qual” (Forte como um touro).","hipérbole":"Hipérbole: exagero proposital (Estou morrendo de fome).","eufemismo":"Eufemismo: suaviza algo triste ou duro (Ele partiu desta para melhor = morreu).","ironia":"Ironia: diz o contrário do que se pensa, com tom de crítica (Que belo serviço! — para algo malfeito).","personificação":"Personificação (prosopopeia): dá ação ou sentimento humano a coisas ou animais (O vento cantava).","metonímia":"Metonímia: troca uma palavra por outra relacionada (Li Machado de Assis = li a obra dele; bebi um copo = a água do copo).","antítese":"Antítese: aproxima ideias opostas (Riso e choro, amor e ódio).","paradoxo":"Paradoxo: ideias opostas que parecem impossíveis juntas (Estou cego de tanto ver).","onomatopeia":"Onomatopeia: palavra que imita um som (tique-taque, au-au, cocoricó).","pleonasmo":"Pleonasmo: repetição de ideia para reforçar (Vi com meus próprios olhos)."};
const FIGS=[["Seus olhos são duas estrelas.","metáfora"],["A vida é uma viagem.","metáfora"],["Meu irmão é uma rocha.","metáfora"],["Ela é forte como um touro.","comparação"],["Ele corre feito um raio.","comparação"],["Estou morrendo de fome.","hipérbole"],["Já te falei um milhão de vezes!","hipérbole"],["Chorou rios de lágrimas.","hipérbole"],["Ele partiu desta para melhor.","eufemismo"],["Ela faltou com a verdade.","eufemismo"],["Que belo serviço! Quebrou tudo.","ironia"],["Que aluno estudioso: tirou zero de novo!","ironia"],["O vento cantava na janela.","personificação"],["As estrelas sorriam para nós.","personificação"],["A cidade dormia em silêncio.","personificação"],["Adoro ler Monteiro Lobato.","metonímia"],["Bebeu dois copos de suco.","metonímia"],["O estádio inteiro aplaudiu.","metonímia"],["Entre o riso e o choro, escolheu o riso.","antítese"],["Nasce o sol e morre a noite.","antítese"],["O amor é fogo que arde sem se ver.","paradoxo"],["Estou cego de tanto ver.","paradoxo"],["O relógio fazia tique-taque.","onomatopeia"],["Ouvi o au-au do cachorro.","onomatopeia"],["Vi com meus próprios olhos.","pleonasmo"],["Subiu lá para cima.","pleonasmo"]];
tema({id:"p-figuras", s:0, nome:"Figuras de linguagem",
aula:`<p><b>Figuras de linguagem</b> são recursos que deixam a linguagem mais expressiva, fugindo do sentido literal (ao pé da letra). As que mais caem:</p>
<table><tr><th>Figura</th><th>O que faz</th><th>Exemplo</th></tr>
<tr><td><b>Comparação</b></td><td>Compara com conectivo (<b>como</b>, feito, tal qual)</td><td>Forte <b>como</b> um touro.</td></tr>
<tr><td><b>Metáfora</b></td><td>Compara <b>sem</b> conectivo: diz que é</td><td>Seus olhos <b>são</b> estrelas.</td></tr>
<tr><td><b>Hipérbole</b></td><td>Exagero</td><td>Estou morrendo de fome.</td></tr>
<tr><td><b>Eufemismo</b></td><td>Suaviza (contrário da hipérbole)</td><td>Partiu desta para melhor.</td></tr>
<tr><td><b>Ironia</b></td><td>Diz o contrário do que pensa</td><td>Que belo serviço! (estragou tudo)</td></tr>
<tr><td><b>Personificação</b></td><td>Dá traço humano a coisas/animais</td><td>O vento <b>cantava</b>.</td></tr>
<tr><td><b>Metonímia</b></td><td>Troca por algo relacionado (autor pela obra, recipiente pelo conteúdo)</td><td>Li Machado. Bebi um copo.</td></tr>
<tr><td><b>Antítese</b></td><td>Ideias opostas lado a lado</td><td>Riso e choro.</td></tr>
<tr><td><b>Paradoxo</b></td><td>Opostos que parecem impossíveis juntos</td><td>Fogo que arde sem se ver.</td></tr>
<tr><td><b>Onomatopeia</b></td><td>Imita som</td><td>tique-taque, au-au</td></tr>
<tr><td><b>Pleonasmo</b></td><td>Repete a ideia</td><td>Vi com meus próprios olhos.</td></tr></table>
<p><b>Metáfora × comparação:</b> tem “como”? É comparação. Não tem? Metáfora.<br><b>Antítese × paradoxo:</b> na antítese os opostos convivem (riso e choro); no paradoxo eles se juntam numa ideia “impossível” (cego de tanto ver).</p>`,
gen(){ const [f,c]=pick(FIGS);
  return {q:"Em “"+f+"”, ocorre a figura de linguagem chamada:", como:"Pergunte: há exagero? (hipérbole) Suaviza algo triste? (eufemismo) Compara com “como”? (comparação) Sem “como”? (metáfora) Coisa agindo como gente? (personificação) Diz o contrário com crítica? (ironia) Opostos? (antítese/paradoxo) Imita som? (onomatopeia)",
    c, w:quatro(c,mix(Object.keys(FIG))), e:FIG[c], def:FIG}; }});

/* ---------- 22. TIPOS E GÊNEROS DE TEXTO ---------- */
const TIPOS_TXT={"narrativo":"Narrativo: conta uma história, com personagens, ações em sequência, tempo e lugar.","descritivo":"Descritivo: mostra como algo é (características), com muitos adjetivos e sensações.","dissertativo-argumentativo":"Dissertativo-argumentativo: defende uma opinião (tese) com argumentos.","injuntivo (instrucional)":"Injuntivo: ensina ou orienta, com verbos no imperativo (misture, abra, ligue).","expositivo":"Expositivo: informa ou explica um assunto, sem defender opinião."};
const TXTS=[["Era uma vez um menino que morava perto do rio. Certo dia, ele encontrou um barco abandonado e decidiu consertá-lo.","narrativo"],["Quando cheguei em casa, a porta estava aberta. Entrei devagar e ouvi um barulho na cozinha.","narrativo"],["A sala era ampla e clara, com paredes amarelas, cortinas leves e um cheiro de café fresco.","descritivo"],["O cachorro tinha pelo dourado, olhos castanhos e orelhas caídas, macias como veludo.","descritivo"],["A escola deveria ter mais aulas de educação financeira, pois muitos jovens chegam à vida adulta sem saber lidar com dinheiro. Portanto, esse ensino é urgente.","dissertativo-argumentativo"],["O uso excessivo de celular prejudica o sono dos adolescentes. Por isso, é preciso limitar o tempo de tela à noite.","dissertativo-argumentativo"],["Misture os ovos com o açúcar. Acrescente a farinha aos poucos e leve ao forno por 40 minutos.","injuntivo (instrucional)"],["Conecte o cabo na tomada, aperte o botão vermelho e aguarde a luz verde acender.","injuntivo (instrucional)"],["A fotossíntese é o processo pelo qual as plantas produzem o próprio alimento usando luz, água e gás carbônico.","expositivo"],["O Sistema Solar é formado pelo Sol e por oito planetas, além de luas, asteroides e cometas.","expositivo"]];
const GENEROS=[["Texto curto e atual, publicado em jornal, que informa um fato com o quê, quem, quando e onde.","notícia"],["Texto com lista de ingredientes e modo de preparo.","receita"],["Texto que tenta convencer o leitor a comprar um produto, com imagem e frase de efeito.","anúncio publicitário"],["Narrativa curta, com poucos personagens e um só conflito.","conto"],["Texto curto sobre um fato do dia a dia, publicado em jornal ou revista, muitas vezes com humor e reflexão.","crônica"],["Narrativa curta com animais que agem como pessoas e uma moral no final.","fábula"],["Texto escrito em versos e estrofes, com ritmo e às vezes rima.","poema"],["Texto que mistura imagens e falas em balões, contando uma história em quadrinhos.","história em quadrinhos"],["Texto de opinião assinado pelo jornal, sem autor individual.","editorial"],["Texto com data, saudação, assunto e despedida, enviado a alguém.","carta"]];
tema({id:"p-textos", s:0, nome:"Interpretação: tipos e gêneros de texto",
aula:`<h4>Tipos de texto (a “estrutura” do texto)</h4>
<table><tr><th>Tipo</th><th>Objetivo</th><th>Marcas</th></tr>
<tr><td><b>Narrativo</b></td><td>Contar uma história</td><td>Personagens, ações em sequência, tempo e lugar, verbos no passado</td></tr>
<tr><td><b>Descritivo</b></td><td>Mostrar como algo é</td><td>Adjetivos, cores, cheiros, sons; pouca ação</td></tr>
<tr><td><b>Dissertativo-argumentativo</b></td><td>Defender uma opinião</td><td>Tese + argumentos + conclusão (portanto, logo, por isso)</td></tr>
<tr><td><b>Expositivo</b></td><td>Informar, explicar</td><td>Definições, dados, sem opinião</td></tr>
<tr><td><b>Injuntivo</b></td><td>Ensinar, orientar</td><td>Verbos no imperativo: misture, abra, ligue</td></tr></table>
<h4>Gêneros (o “formato” do texto no dia a dia)</h4><p>Notícia, reportagem, crônica, conto, fábula, poema, receita, bula, manual, anúncio, carta, e-mail, editorial, artigo de opinião, tirinha. Um gênero pode misturar tipos: a receita é injuntiva; a notícia é narrativa/expositiva; o artigo de opinião é argumentativo.</p>
<h4>Como interpretar na prova</h4><ol><li>Leia a pergunta <b>antes</b> do texto, para saber o que procurar.</li><li>A resposta tem de ter <b>apoio no texto</b>. Desconfie de alternativas com “sempre”, “nunca”, “todos” ou que falam de algo que o texto não menciona.</li><li><b>Tese</b> é a opinião principal; <b>argumento</b> é o que sustenta a tese; a <b>conclusão</b> costuma vir com “portanto”, “logo”.</li><li>Inferência = o que dá para <b>concluir</b> pelas pistas, mesmo sem estar escrito com todas as letras.</li></ol>`,
gen(){
  if(R(2)){ const [t,c]=pick(TXTS);
    return {t:esc(t), q:"O trecho acima é predominantemente:", como:"Pergunte: está contando uma história com ações em sequência? (narrativo) Mostrando características? (descritivo) Defendendo uma opinião com argumentos? (argumentativo) Ensinando a fazer algo com verbos de ordem? (injuntivo) Só explicando um assunto? (expositivo)",
      c, w:quatro(c,Object.keys(TIPOS_TXT).concat(["poético"])), e:TIPOS_TXT[c], def:Object.assign({"poético":"Poético seria escrito em versos e estrofes, o que não ocorre aqui."},TIPOS_TXT)}; }
  const [d,c]=pick(GENEROS);
  return {q:"“"+d+"” Essa é a descrição do gênero:", como:"Pense em onde o texto aparece (jornal, livro, embalagem) e qual é o objetivo dele (informar, divertir, convencer, ensinar). Compare com os gêneros da aula.",
    c, w:outras(GENEROS,[d,c],x=>x[1]).slice(0,4), e:"É o gênero "+c+"."};
}});

})();
