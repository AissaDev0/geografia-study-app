// Tab Navigation Logic
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Reset classes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active to clicked tab
        btn.classList.add('active');
        const targetId = btn.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
    });
});

// Quiz Questions Array
const questions = [
    {
        question: "Què s'entén per 'terciarització' de l'economia en un país desenvolupat?",
        options: [
            "L'èxode rural cap a centres industrials.",
            "Que la riquesa i ocupació es basen fonamentalment en el sector serveis.",
            "Quan el sector agrari passa a ser la principal font de riquesa.",
            "L'eliminació del tercer sector (ONGs i associacions)."
        ],
        correct: 1
    },
    {
        question: "Dins de quina categoria entren els serveis de sanitat i educació?",
        options: [
            "Serveis al consumidor",
            "Serveis a les empreses",
            "Serveis de distribució",
            "Serveis socials"
        ],
        correct: 3
    },
    {
        question: "El 'Tercer Sector' format per ONGs i fundacions es caracteritza principalment per...",
        options: [
            "Ser d'origen exclusivament públic.",
            "Obtenir els majors beneficis i imposar preus de mercat.",
            "Ser entitats privades SENSE ànim de lucre que sobreviuen de donacions.",
            "Estar encarregades de mantenir carreteres i ports."
        ],
        correct: 2
    },
    {
        question: "El transport és un sector estratègic. Quina destas opcions NO és una de les seves tres funcions principals?",
        options: [
            "Funció econòmica",
            "Funció geològica",
            "Funció política",
            "Funció social"
        ],
        correct: 1
    },
    {
        question: "Més de 10 milions de productes es transporten a l'any dins de contenidors usant aquest sistema. De quin mitjà parlem?",
        options: [
            "Transport Ferroviari",
            "Transport per Carretera",
            "Transport Aeri",
            "Transport Marítim"
        ],
        correct: 3
    },
    {
        question: "Quin és el dany o inconvenient principal de la infraestructura del Transport Aeri?",
        options: [
            "És molt lent per viatges internacionals.",
            "Fa difícil trobar accessibilitat porta a porta.",
            "Només serveix per mercaderies pesades.",
            "Provoca gran contaminació acústica i atmosfèrica amb alta inversió."
        ],
        correct: 3
    },
    {
        question: "Quan parlem d'evolució del transport: què és la 'intermodalitat'?",
        options: [
            "Fomentar l'ús del cotxe privat per a tots els desplaçaments.",
            "Combinar diferents mitjans de transport en un sol viatge (ex. metro i bus).",
            "Substituir tots els trens per avions de baix cost.",
            "L'enviament directe i ràpid de productes des d'Àsia cap a Europa."
        ],
        correct: 1
    },
    {
        question: "En logística d'enviament, què són exactament les 'plataformes logístiques'?",
        options: [
            "Aplicacions de mòbil per comprar productes d'oferta.",
            "Gran naus emmagatzemants en zones ben comunicades per preparar comandes ràpidament.",
            "Les terminals als aeroports per on passen els viatgers de Low Cost.",
            "Sistemes instal·lats per mesurar les emissions dels cotxes a la ciutat."
        ],
        correct: 1
    },
    {
        question: "Quin és el repte més gran conegut com a enviament de 'l'última milla' a les ciutats?",
        options: [
            "Creuar camions fins a l'estranger.",
            "Vendre online en el temps més curt possible.",
            "El lliurament directe al client a casa seva, intentant reduir congestions i temps.",
            "Recollir el producte del magatzem del venedor d'origen."
        ],
        correct: 2
    },
    {
        question: "Com afecta generalment l'evolució brutal i els avenços del sector terciari al medi ambient?",
        options: [
            "No suposa absolutament cap repte.",
            "Té un impacte zero per què són activitats que no 'generen' béns.",
            "L'ha beneficiat immediatament reduint tota la contaminació des de l'any 2000.",
            "L'ha afectat negativament originant grans emissions, i per això requereix repensar-se sota models propis de l'energia sostenible (cotxes elèctrics, etc.)."
        ],
        correct: 3
    }
];

// Reference Elements
let currentQuestionIndex = 0;
let score = 0;

const startBtn = document.getElementById('start-btn');
const quizHeader = document.getElementById('quiz-header');
const quizBody = document.getElementById('quiz-body');
const quizResults = document.getElementById('quiz-results');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress-bar');
const currentQSpan = document.getElementById('current-q');
const totalQSpan = document.getElementById('total-q');
const scoreText = document.getElementById('score-text');
const retryBtn = document.getElementById('retry-btn');
const scoreMessage = document.getElementById('score-message');

totalQSpan.innerText = questions.length;

// Start Quiz Flow
startBtn.addEventListener('click', () => {
    quizHeader.classList.add('hidden');
    quizBody.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
});

function loadQuestion() {
    // Reset Buttons container
    nextBtn.classList.add('hidden');
    nextBtn.disabled = true;
    optionsContainer.innerHTML = '';
    
    // Set Question Content
    const currentQData = questions[currentQuestionIndex];
    questionText.innerText = currentQData.question;
    currentQSpan.innerText = currentQuestionIndex + 1;
    
    // Update Progress Bar
    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progress.style.width = `${progressPercent}%`;

    // Render Options
    currentQData.options.forEach((optionText, idx) => {
        const optionBtn = document.createElement('button');
        optionBtn.classList.add('option-btn');
        optionBtn.innerText = optionText;
        
        optionBtn.addEventListener('click', () => {
            selectOption(optionBtn, idx, currentQData.correct);
        });
        
        optionsContainer.appendChild(optionBtn);
    });
}

function selectOption(selectedBtn, selectedIdx, correctIdx) {
    const allOptionBtns = optionsContainer.querySelectorAll('.option-btn');
    
    // Block multiple clicks
    allOptionBtns.forEach(btn => {
        btn.disabled = true;
    });
    
    // Evaluate correctness
    if(selectedIdx === correctIdx) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('wrong');
        // Visually show correct answer
        allOptionBtns[correctIdx].classList.add('correct');
    }
    
    // Enable go to next
    nextBtn.classList.remove('hidden');
    nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        // Complete the progress to 100 on last question
        progress.style.width = '100%';
        setTimeout(showResults, 400); // delay smooth finish
    }
});

function showResults() {
    quizBody.classList.add('hidden');
    quizResults.classList.remove('hidden');
    
    scoreText.innerText = `${score}/${questions.length}`;
    
    if(score === questions.length) {
        scoreMessage.innerText = "🌟 Increïble! T'ho saps de memòria. 10/10!";
        document.querySelector('.score-circle').style.borderColor = "#10b981"; // green accent
    } else if(score >= 7) {
        scoreMessage.innerText = "👏 Molt bé! Tens el temari molt per la mà.";
        document.querySelector('.score-circle').style.borderColor = "#6366f1"; // base primary
    } else if(score >= 5) {
        scoreMessage.innerText = "👍 Has aprovat! Però fes-hi un cop d'ull ràpid l'apartat d'apunts abans de l'examen.";
        document.querySelector('.score-circle').style.borderColor = "#f59e0b"; // yellow accent
    } else {
        scoreMessage.innerText = "😅 Ja saps què toca... Torna a llegir la teoria i repeteix el test!";
        document.querySelector('.score-circle').style.borderColor = "#ef4444"; // red accent
    }
}

retryBtn.addEventListener('click', () => {
    quizResults.classList.add('hidden');
    // Scroll to top or switch tab realistically
    document.getElementById('apunts').scrollIntoView({ behavior: 'smooth' });
    quizHeader.classList.remove('hidden');
    // Optionally auto-shift to apunts tab to force reading
    document.querySelector('.tab-btn[data-tab="apunts"]').click();
});
