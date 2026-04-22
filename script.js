let i = 0;
let score = 0;

const q = [
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

function startTest() {
    start.classList.add("hidden");
    quiz.classList.remove("hidden");
    load();
}

function load() {
    question.innerText = q[i];
    bar.style.width = ((i / q.length) * 100) + "%";
    step.innerText = (i+1) + " / " + q.length;
}

function answer(v) {
    score += v;
    
    // Add color class to the clicked button
    const buttons = document.querySelectorAll('.options button');
    buttons[v - 1].classList.add('answered-' + v);
    
    // Disable all buttons temporarily
    buttons.forEach(btn => btn.disabled = true);
    
    // Wait 500ms before moving to next question
    setTimeout(() => {
        i++;
        buttons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('answered-1', 'answered-2', 'answered-3', 'answered-4', 'answered-5');
        });
        
        if (i < q.length) {
            load();
        } else {
            show();
        }
    }, 500);
}

function show() {
    quiz.classList.add("hidden");
    result.classList.remove("hidden");

    let text = "";
    let desc = "";

    if (score < 20) {
        text = "Saturación mental";
        desc = "Tu cerebro está sobrecargado. Cualquier decisión ahora es de baja calidad.";
    } else if (score < 30) {
        text = "Fatiga cognitiva";
        desc = "Estás funcionando, pero con desgaste. Riesgo alto de errores invisibles.";
    } else if (score < 40) {
        text = "Modo operativo";
        desc = "Podés rendir, pero no estás en tu mejor nivel.";
    } else {
        text = "Alta claridad";
        desc = "Este es tu mejor estado para decisiones importantes.";
    }

    resultText.innerText = text;
    score.innerText = score + "/50";
    desc.innerText = desc;
}
