let i = 0;
let totalScore = 0;

const questions = [
"¿Qué tan fácil te resulta concentrarte?",
"¿Sentís tu mente saturada?",
"¿Te cuesta decidir cosas simples?",
"¿Tu cabeza está clara ahora mismo?",
"¿Te distraés rápido?",
"¿Podés sostener foco?",
"¿Te sentís mentalmente agotado?",
"¿Te cuesta priorizar?",
"¿Estás enfocado?",
"¿Tu energía mental es alta?"
];

// referencias reales al DOM
const startScreen = document.getElementById("start");
const quizScreen = document.getElementById("quiz");
const resultScreen = document.getElementById("result");

const questionEl = document.getElementById("question");
const bar = document.getElementById("bar");
const step = document.getElementById("step");

const resultTextEl = document.getElementById("resultText");
const scoreEl = document.getElementById("score");
const descEl = document.getElementById("desc");

// iniciar
function startTest() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  questionEl.innerText = questions[i];
  bar.style.width = ((i / questions.length) * 100) + "%";
  step.innerText = (i + 1) + " / " + questions.length;
}

function answer(value) {
  totalScore += value;
  i++;

  if (i < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  let text = "";
  let desc = "";

  if (totalScore < 20) {
    text = "Saturación mental";
    desc = "Tu cerebro está sobrecargado. Cualquier decisión ahora es de baja calidad.";
  } else if (totalScore < 30) {
    text = "Fatiga cognitiva";
    desc = "Estás funcionando, pero con desgaste. Riesgo alto de errores invisibles.";
  } else if (totalScore < 40) {
    text = "Modo operativo";
    desc = "Podés rendir, pero no estás en tu mejor nivel.";
  } else {
    text = "Alta claridad";
    desc = "Este es tu mejor estado para decisiones importantes.";
  }

  resultTextEl.innerText = text;
  scoreEl.innerText = totalScore + "/50";
  descEl.innerText = desc;
}