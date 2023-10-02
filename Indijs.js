const questions = [
    {
        question: "HTML stand for ? ",
        answers:[
            { text: "Hypertension Language", correct: false},
            { text: "HyperMix Language", correct: false},
            { text: "HyperMark Language", correct: false},
            { text: "Hyper Text MarkUp Language", correct: true},
        ]
    },
    {
        question: "Which HTML Tag gives us biggest heading ? ",
        answers:[
            { text: "h4 tag", correct: false},
            { text: "h3 tag", correct: false},
            { text: "h1 tag", correct: true},
            { text: "h2 tag", correct: false},
        ]
    },
    {
        question: "Which type of language is JavaScript ? ",
        answers:[
            { text: "Programming", correct: false},
            { text: "Scripting", correct: false},
            { text: "Markup", correct: false},
            { text: "Both A and B", correct: true},
        ]
    },
    {
        question: "Which tag is used to write the javascript code ? ",
        answers:[
            { text: "script tag", correct: true},
            { text: "javascript tag", correct: false},
            { text: "scr tag", correct: false},
            { text: "js tag", correct: false},
        ]
    },
    {
        question: "CSS stands for ? ",
        answers:[
            { text: "Casecad Style Sheet", correct: false},
            { text: "Cascading Style Sheets", correct: true},
            { text: "Cascading Style Sheet", correct: false},
            { text: "Cascading Sheets Style", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerText = document.getElementById("timer-text")

let currentQuestionIndex = 0;
let score = 0;
let timer = 10;
let timeInterval;

function startTimer(){
    clearInterval(timeInterval);
    timer = 10;
    timerText.textContent = timer + " secs "
    timeInterval = setInterval(()=>{
       if (timer > 0) {
            timer--;
            timerText.textContent = timer + " secs ";
       } else {
        clearInterval(timeInterval);
        timerText.textContent = "0 secs";
        handleNextButton();
        
       }
    },1000)
}

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    startTimer()
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct")
        score++;
    } else {
        selectBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion()
        
    } else {
        showScore();
     }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz()