// Quiz data with 10+ questions
const quizData = [
    {
        question: "At what age do babies start learning language?",
        options: ["From birth", "At 4 months old", "At 1 year old", "At 2 years old"],
        correct: 0,
        explanation: "Babies start learning language from birth! They begin by recognizing their mother's voice and gradually learn to distinguish different sounds."
    },
    {
        question: "Which area of the brain is responsible for speech production?",
        options: ["Broca's Area", "Wernicke's Area", "Frontal Lobe", "Temporal Lobe"],
        correct: 0,
        explanation: "Broca's Area, located in the frontal lobe, is responsible for speech production. Damage to this area can cause difficulty in speaking while still understanding language."
    },
    {
        question: "What is one of the first sounds babies learn to replicate?",
        options: ["Muh", "Lah", "Sss", "Guh"],
        correct: 0,
        explanation: "'Muh' is one of the first sounds babies learn to replicate because it uses the front of the mouth, making it easier for them to see and imitate."
    },
    {
        question: "By what age can babies distinguish between languages?",
        options: ["6 months", "1 year", "2 years", "3 years"],
        correct: 0,
        explanation: "By 6 months, babies can start distinguishing between different languages. They become specialized in the sounds of their native language by their first birthday."
    },
    {
        question: "Which of these languages is considered easier for babies to learn?",
        options: ["Spanish", "Mandarin", "Arabic", "Russian"],
        correct: 0,
        explanation: "Spanish is considered easier for babies to learn because it's highly phonetic (words sound like they're spelled) with clear vowel sounds and simple syllables."
    },
    {
        question: "When do babies typically say their first words?",
        options: ["6-12 months", "12-18 months", "18-24 months", "2-3 years"],
        correct: 1,
        explanation: "Most babies say their first words between 12-18 months, though they understand many words before they can speak them."
    },
    {
        question: "What is 'babbling' in baby language development?",
        options: ["Crying for attention", "Repeating consonant-vowel combinations", "First attempts at sentences", "Imitating animal sounds"],
        correct: 1,
        explanation: "Babbling is when babies experiment with repeating consonant-vowel combinations like 'ba-ba-ba' or 'da-da-da', which typically begins around 6 months."
    },
    {
        question: "How do babies primarily learn language?",
        options: ["Through formal instruction", "By watching educational videos", "Through social interaction and listening", "By reading books"],
        correct: 2,
        explanation: "Babies learn language primarily through social interaction, listening to those around them, and gradually figuring out patterns in the language they hear."
    },
    {
        question: "What is 'child-directed speech' or 'parentese'?",
        options: ["Correcting children's grammar errors", "The simplified, melodic way adults speak to babies", "Teaching babies sign language", "Reading complex literature to infants"],
        correct: 1,
        explanation: "Child-directed speech (often called 'parentese') is the simplified, slower, higher-pitched, and more melodic way adults naturally speak to babies, which helps capture their attention and facilitate language learning."
    },
    {
        question: "By what age do most children have a vocabulary of about 50 words?",
        options: ["12 months", "18 months", "2 years", "3 years"],
        correct: 1,
        explanation: "By around 18 months, most children have a vocabulary of about 50 words and begin combining them into simple two-word sentences."
    },
    {
        question: "What is the 'vocabulary explosion' or 'naming explosion'?",
        options: ["When babies learn to shout", "A period of rapid vocabulary growth around 18 months", "When children learn to read", "When toddlers start using bad words"],
        correct: 1,
        explanation: "The 'vocabulary explosion' refers to the period around 18 months when children suddenly begin learning new words at a remarkably rapid pace, sometimes several words per day."
    },
    {
        question: "How does gesturing relate to language development in babies?",
        options: ["It delays speech development", "It's unrelated to language development", "It's a sign of language difficulties", "It supports and predicts language development"],
        correct: 3,
        explanation: "Gesturing (like pointing) actually supports and predicts language development. Babies who gesture more tend to develop larger vocabularies and earlier sentence construction."
    }
];

// Audio elements
const correctSound = document.getElementById('correctSound');
const endSound = document.getElementById('endSound');

// Randomize questions
function getRandomQuestions() {
    const shuffled = [...quizData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10); // Select 10 random questions
}

// Wake up polar bear function
function wakeUpBear() {
    const bear = document.querySelector('.polar-bear');
    const speechBubble = document.getElementById('speechBubble');
    
    bear.classList.add('wake-up');
    
    // Show speech bubble
    speechBubble.classList.add('visible');
    
    // Hide speech bubble after 3 seconds
    setTimeout(() => {
        speechBubble.classList.remove('visible');
        bear.classList.remove('wake-up');
    }, 3000);
}

// Modified checkAnswer function to play sounds
function checkAnswer() {
    const selectedOption = userAnswers[currentQuestion];
    const correctOption = currentQuestions[currentQuestion].correct;
    const isCorrect = selectedOption === correctOption;
    
    // Mark this question as submitted
    quizSubmitted[currentQuestion] = true;
    
    // Show feedback
    showFeedback();
    
    // Disable submit button
    document.getElementById('submitBtn').disabled = true;
    
    // Enable next button
    document.getElementById('nextBtn').disabled = false;
    
    // If correct, show confetti and play sound
    if (isCorrect) {
        createConfetti();
        correctSound.play();
    }
}

// Modified showResults function to play end sound
function showResults() {
    // Calculate score
    let score = 0;
    for (let i = 0; i < currentQuestions.length; i++) {
        if (userAnswers[i] === currentQuestions[i].correct) {
            score++;
        }
    }
    
    // Display score
    document.getElementById('scoreValue').textContent = score;
    document.getElementById('totalQuestions').textContent = currentQuestions.length;
    document.getElementById('quizScore').style.display = 'block';
    
    // Hide quiz container
    document.getElementById('quizContainer').style.display = 'none';
    
    // Play end sound
    endSound.play();
    
    // Add celebration animation for good scores
    if (score >= currentQuestions.length - 2) {
        document.getElementById('quizScore').classList.add('tada');
        createConfetti();
    }
}

// Initialize quiz with random questions
let currentQuestions = [];

function initQuiz() {
    currentQuestions = getRandomQuestions();
    currentQuestion = 0;
    userAnswers = new Array(currentQuestions.length).fill(null);
    quizSubmitted = new Array(currentQuestions.length).fill(false);
    displayQuestion();
    updateNavigation();
    document.getElementById('quizScore').style.display = 'none';
    document.getElementById('quizContainer').style.display = 'block';
}

// Update displayQuestion function to use currentQuestions
function displayQuestion() {
    const question = currentQuestions[currentQuestion];
    document.getElementById('quizProgress').textContent = `Question ${currentQuestion + 1} of ${currentQuestions.length}`;
    document.getElementById('quizQuestion').textContent = question.question;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        if (userAnswers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(optionElement, index);
        optionsContainer.appendChild(optionElement);
    });
    
    // Reset feedback and submit button
    document.getElementById('quizFeedback').className = 'quiz-feedback';
    document.getElementById('feedbackText').innerHTML = '';
    document.getElementById('submitBtn').disabled = userAnswers[currentQuestion] === null;
    
    // If already submitted this question, show the feedback
    if (quizSubmitted[currentQuestion]) {
        showFeedback();
    }
}

// Rest of your JavaScript code from previous implementation