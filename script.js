const questions = [
  { cat: "🧠 CLARIDAD MENTAL",    text: "¿Qué tan clara sientes tu mente en este momento?" },
  { cat: "⚡ ENERGÍA COGNITIVA",  text: "¿Qué tan fácil te resulta concentrarte?" },
  { cat: "🌊 SATURACIÓN",         text: "¿Sentís tu mente saturada o con ruido mental?" },
  { cat: "🎯 FOCO",               text: "¿Podés sostener el foco en una sola tarea?" },
  { cat: "⚖️ DECISIÓN",           text: "¿Te cuesta decidir cosas simples hoy?" },
  { cat: "🔋 RESERVA MENTAL",     text: "¿Sentís que tenés energía mental disponible?" },
  { cat: "💨 DISTRACCIÓN",        text: "¿Te distraés rápido al intentar trabajar?" },
  { cat: "🧩 PRIORIZACIÓN",       text: "¿Podés priorizar con claridad lo que importa?" },
  { cat: "😮‍💨 AGOTAMIENTO",       text: "¿Te sentís mentalmente agotado en este momento?" },
  { cat: "🚀 RENDIMIENTO",        text: "¿Tu energía mental está alta para rendir bien?" }
];

const labels = ["Muy bajo", "Bajo", "Moderado", "Alto", "Muy alto"];

let current = 0;
const answers = new Array(questions.length).fill(0);

function startTest() {
  document.getElementById('start').classList.add('hidden');
  document.getElementById('quiz').classList.remove('hidden');
  renderQuestion();
}

function renderQuestion() {
  const q = questions[current];
  document.getElementById('catLabel').textContent = q.cat;
  document.getElementById('question').textContent = q.text;
  document.getElementById('step').textContent = (current + 1) + ' / ' + questions.length;
  document.getElementById('bar').style.width = ((current / questions.length) * 100) + '%';

  // Reset buttons
  for (let v = 1; v <= 5; v++) {
    const btn = document.getElementById('btn' + v);
    btn.className = '';
    btn.querySelector('.lbl').textContent = labels[v - 1];
  }

  // Restore selection if already answered
  if (answers[current] > 0) {
    document.getElementById('btn' + answers[current]).classList.add('sel-' + answers[current]);
  }

  // Prev button
  const prev = document.getElementById('prevBtn');
  prev.disabled = current === 0;

  updateNextBtn();
}

function selectAnswer(v) {
  answers[current] = v;
  for (let i = 1; i <= 5; i++) {
    document.getElementById('btn' + i).className = '';
  }
  document.getElementById('btn' + v).classList.add('sel-' + v);
  updateNextBtn();

  // Auto-advance after short delay
  setTimeout(() => {
    if (current < questions.length - 1) {
      current++;
      renderQuestion();
    } else {
      showResult();
    }
  }, 420);
}

function updateNextBtn() {
  const btn = document.getElementById('nextBtn');
  const answered = answers[current] > 0;
  btn.classList.remove('active', 'ready');
  if (answered) {
    btn.classList.add('ready');
    btn.textContent = current < questions.length - 1 ? 'Siguiente ›' : 'Ver resultado ›';
  } else {
    btn.classList.add('active');
    btn.textContent = 'Siguiente ›';
  }
}

function nextQ() {
  if (answers[current] === 0) return;
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    showResult();
  }
}

function prevQ() {
  if (current > 0) {
    current--;
    renderQuestion();
  }
}

function showResult() {
  const total = answers.reduce((a, b) => a + b, 0);

  let title, desc, rec, color, orbColor, specPct;

  if (total < 20) {
    title = "Saturación mental";
    desc = "Tu cerebro está sobrecargado. Cualquier decisión ahora es de baja calidad.";
    rec = "Detené toda actividad cognitiva exigente. Realizá una pausa profunda antes de tomar cualquier decisión.";
    color = "#ef4444";
    orbColor = "radial-gradient(circle at 40% 35%, #f87171, #991b1b)";
    specPct = 10;
  } else if (total < 30) {
    title = "Fatiga cognitiva";
    desc = "Estás funcionando, pero con desgaste. Riesgo alto de errores invisibles.";
    rec = "Realizar una pausa cognitiva antes de tomar decisiones relevantes.";
    color = "#f97316";
    orbColor = "radial-gradient(circle at 40% 35%, #fb923c, #c2410c)";
    specPct = 35;
  } else if (total < 40) {
    title = "Modo operativo";
    desc = "Podés rendir, pero no estás en tu mejor nivel. Hay margen de mejora.";
    rec = "Aplicar técnicas de regulación cognitiva para elevar tu estado antes de tareas críticas.";
    color = "#eab308";
    orbColor = "radial-gradient(circle at 40% 35%, #facc15, #a16207)";
    specPct = 60;
  } else if (total < 47) {
    title = "Alta claridad";
    desc = "Este es tu mejor estado para decisiones importantes. Aprovechalo.";
    rec = "Mantené este estado con hábitos de regeneración activa. Es el momento ideal para trabajo profundo.";
    color = "#22c55e";
    orbColor = "radial-gradient(circle at 40% 35%, #4ade80, #15803d)";
    specPct = 82;
  } else {
    title = "Estado RAN®";
    desc = "Rendimiento cognitivo óptimo. Tu mente está en plena capacidad de regulación.";
    rec = "Usá este estado pico para tus decisiones más importantes y trabajo de alto impacto.";
    color = "#06b6d4";
    orbColor = "radial-gradient(circle at 40% 35%, #22d3ee, #0e7490)";
    specPct = 97;
  }

  document.getElementById('resultText').textContent = title;
  document.getElementById('resultText').style.color = color;
  document.getElementById('scoreNum').textContent = total;
  document.getElementById('scoreNum').style.color = color;
  document.getElementById('desc').textContent = desc;
  document.getElementById('rec').textContent = rec;
  document.getElementById('resultOrb').style.background = orbColor;

  document.getElementById('quiz').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');

  // Animate spectrum
  setTimeout(() => {
    document.getElementById('specFill').style.width = specPct + '%';
    document.getElementById('specMarker').style.left = specPct + '%';
  }, 200);
}
