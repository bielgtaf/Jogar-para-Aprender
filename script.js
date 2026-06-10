const perguntas = [
{
pergunta: "O que é programação?",
opcoes: [
"Fazer desenhos",
"Criar instruções para um computador",
"Consertar computadores",
"Navegar na internet"
],
correta: 1
},
{
pergunta: "O que é um algoritmo?",
opcoes: [
"Um jogo",
"Uma sequência de passos para resolver um problema",
"Um navegador",
"Uma imagem"
],
correta: 1
},
{
pergunta: "Para que serve o HTML?",
opcoes: [
"Criar a estrutura de uma página web",
"Fazer cálculos",
"Criar jogos",
"Editar fotos"
],
correta: 0
},
{
pergunta: "Para que serve o CSS?",
opcoes: [
"Guardar dados",
"Estilizar páginas web",
"Criar banco de dados",
"Fazer downloads"
],
correta: 1
},
{
pergunta: "Para que serve o JavaScript?",
opcoes: [
"Tornar o site interativo",
"Pintar imagens",
"Instalar programas",
"Criar PDFs"
],
correta: 0
}
];

// Embaralha as perguntas
perguntas.sort(() => Math.random() - 0.5);

let perguntaAtual = 0;

// Carrega dados salvos
let xp = parseInt(localStorage.getItem("xp")) || 0;
let nivel = parseInt(localStorage.getItem("nivel")) || 1;
let pontos = parseInt(localStorage.getItem("pontos")) || 0;
let respondidas = parseInt(localStorage.getItem("respondidas")) || 0;

let nomeJogador =
localStorage.getItem("nomeJogador");

if(!nomeJogador){

nomeJogador = prompt("Digite seu nome:");

if(!nomeJogador || nomeJogador.trim() === ""){
nomeJogador = "Jogador";
}

localStorage.setItem(
"nomeJogador",
nomeJogador
);

}

let ranking =
JSON.parse(
localStorage.getItem("ranking")
) || [];

function salvarPerfil(){

localStorage.setItem("xp", xp);
localStorage.setItem("nivel", nivel);
localStorage.setItem("pontos", pontos);
localStorage.setItem("respondidas", respondidas);

}

function carregarPerfil(){

document.getElementById("xp").textContent = xp;
document.getElementById("nivel").textContent = nivel;

const pontosEl =
document.getElementById("pontos");

if(pontosEl){
pontosEl.textContent = pontos;
}

const respondidasEl =
document.getElementById("respondidas");

if(respondidasEl){
respondidasEl.textContent = respondidas;
}

}

function mostrarPergunta(){

document.getElementById("resultado").innerHTML = "";

document.getElementById("pergunta").innerText =
perguntas[perguntaAtual].pergunta;

const opcoes =
document.getElementById("opcoes");

opcoes.innerHTML = "";

perguntas[perguntaAtual].opcoes.forEach(
(opcao, indice) => {

const botao =
document.createElement("button");

botao.innerText = opcao;

botao.onclick = () =>
verificarResposta(indice);

opcoes.appendChild(botao);

});

}

function verificarResposta(indice){

const resultado =
document.getElementById("resultado");

respondidas++;

if(indice === perguntas[perguntaAtual].correta){

xp += 50;
pontos += 10;

if(xp >= 100){

nivel++;
xp = xp - 100;

}

salvarPerfil();
carregarPerfil();

resultado.innerHTML = `
<h2>✅ Resposta Correta!</h2>
<p>+10 pontos</p>
<button onclick="proximaPergunta()">
Continuar
</button>
`;

}else{

salvarPerfil();
carregarPerfil();

resultado.innerHTML = `
<h2>❌ Resposta Incorreta!</h2>
<p>Tente novamente!</p>
<button onclick="proximaPergunta()">
Continuar
</button>
`;

}

document.getElementById("opcoes").innerHTML = "";

}

function proximaPergunta(){

perguntaAtual++;

if(perguntaAtual < perguntas.length){

mostrarPergunta();

}else{

fimDoJogo();

}

}

function fimDoJogo(){

ranking.push({
nome: nomeJogador,
pontos: pontos,
nivel: nivel
});

ranking.sort(
(a,b) => b.pontos - a.pontos
);

localStorage.setItem(
"ranking",
JSON.stringify(ranking)
);

let htmlRanking = "";

ranking.slice(0,10).forEach(jogador => {

htmlRanking += `
<li>
${jogador.nome}
 - ${jogador.pontos} pts
 (Nível ${jogador.nivel})
</li>
`;

});

const lista =
document.getElementById("rankingLista");

if(lista){
lista.innerHTML = htmlRanking;
}

document.getElementById("quiz").innerHTML = `
<h1>🏆 Fase Concluída!</h1>

<p><b>Jogador:</b> ${nomeJogador}</p>

<p><b>Pontos:</b> ${pontos}</p>

<p><b>Nível:</b> ${nivel}</p>

<p><b>XP:</b> ${xp}</p>

<button onclick="location.reload()">
🔄 Jogar Novamente
</button>

<button onclick="novoJogador()">
👤 Novo Jogador
</button>
`;

}

function novoJogador(){

localStorage.removeItem("nomeJogador");
localStorage.removeItem("xp");
localStorage.removeItem("nivel");
localStorage.removeItem("pontos");
localStorage.removeItem("respondidas");

location.reload();

}

function carregarRanking(){

let htmlRanking = "";

ranking.slice(0,10).forEach(jogador => {

htmlRanking += `
<li>
${jogador.nome}
 - ${jogador.pontos} pts
</li>
`;

});

const lista =
document.getElementById("rankingLista");

if(lista){
lista.innerHTML = htmlRanking;
}

}

carregarPerfil();
carregarRanking();
mostrarPergunta();