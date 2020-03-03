var main = document.getElementById("main");
var gameOver = document.getElementById("game-over");
var display = document.getElementById("display");
var questionDisplay = document.getElementById("question");
var answersDisplay = document.getElementById("answers");
var highScoreDisplay = document.getElementById("high-score");
var currentScoreDisplay = document.getElementById("current-score");
var timerSpan = document.getElementById("timer");
var timerDisplay = document.getElementById("timer-display");
var startButton = document.getElementById("start-button");

var timerInt;
var timer;
var questionTimeout;
var highScore = localStorage.getItem("high-score");
var currentScore = 0;
var correctAnswer = "";
var questions = loadQuestions();

// Randomizes questions and removes from array to prevent duplicate question
function randomQuestion(arr) {
    var randQuestion = arr[Math.floor(Math.random() * arr.length)];
    questions.splice(randQuestion, 1)
    return randQuestion;
};

function displayQuestion() {

    // Clears questions timer and reset display
    clearTimeout();
    questionDisplay.innerHTML = "";
    answersDisplay.innerHTML = "";

    // Stores random question and answer for current round
    var set = randomQuestion(questions);
    correctAnswer = set.correctAnswer;

    // Displays Question
    var questionDiv = document.createElement("h2");
    questionDiv.innerText = set.question;
    questionDisplay.appendChild(questionDiv);

    // Randomizes answers
    var answerArr = set.answers.sort(() => Math.random() - 0.5);

    // Displays answers
    for (var i = 0; i < answerArr.length; i++) {
        var answerDiv = document.createElement("div");
        answerDiv.setAttribute("data-answer", set.answers[i]);
        answerDiv.setAttribute("class", "answer");
        answerDiv.innerText = answerArr[i];
        answerDiv.addEventListener("click", selectedAnswer);
        answersDisplay.appendChild(answerDiv);
    }
};

function selectedAnswer(event) {
    var answers = document.getElementsByClassName("answer");

    // Prevents user from clicking other choices
    for (var j = 0; j < answers.length; j++) {
        answers[j].removeEventListener("click", selectedAnswer);
    }

    // Displays answer color
    // Adjusts scores
    // Sets 2 sec timer to show next question
    if (event.target.dataset.answer === correctAnswer) {
        event.target.setAttribute("id", "correct");
        currentScore = currentScore + 5;
        currentScoreDisplay.innerHTML = currentScore;
        questionTimeout = setTimeout(displayQuestion, 2000);
    } else {
        event.target.setAttribute("id", "incorrect");
        currentScore = currentScore - 3;
        currentScoreDisplay.innerHTML = currentScore;
        questionTimeout = setTimeout(displayQuestion, 2000);
    }
};


// Sets/Displays high score
if (highScore === null ) {
    highScore = 0;
};

highScoreDisplay.innerHTML = highScore;
currentScoreDisplay.innerHTML = currentScore;

startButton.addEventListener("click", function() {
    
    // Sets/Resets starting game variables
    questions = loadQuestions();
    timerInt = 60;
    currentScore = 0;

    // Displays score
    currentScoreDisplay.innerHTML = currentScore;
    highScoreDisplay.innerHTML = highScore;
    
    // Sets questions and displays/hide other elements
    displayQuestion();
    timerDisplay.style.display = "block";
    timerSpan.innerHTML = timerInt;
    startButton.style.display = "none";
    gameOver.style.display = "none";

    // Game timer
    var timer = setInterval(function() {
        timerInt--;
        timerSpan.innerHTML = timerInt;

        // End of game logic
        if (timerInt === 0) {

            // Clears in-game elements
            answersDisplay.innerHTML = "";
            questionDisplay.innerHTML = "";

            // Shows start elements
            startButton.style.display = "block";
            gameOver.style.display = "block";
            timerDisplay.style.display = "none";

            // Clears game timer and question interval
            clearInterval(timer);
            clearTimeout(questionTimeout);

            // Stores high score
            if (currentScore > highScore) {
                highScore = currentScore;
                highScoreDisplay.innerHTML = highScore;
                localStorage.setItem("high-score", currentScore);
            }
        }
    }, 1000);
});