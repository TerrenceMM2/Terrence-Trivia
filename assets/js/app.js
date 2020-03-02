var questionDisplay = document.getElementById("question");
var answersDisplay = document.getElementById("answers");
var highScoreDisplay = document.getElementById("high-score");
var currentScoreDisplay = document.getElementById("current-score");
var timerDisplay = document.getElementById("timer");
var startButton = document.getElementById("start-button");

var timerInt;
var timer;
var questionTimeout;
var highScore = localStorage.getItem("high-score");
var currentScore = 0;
var correctAnswer = "";

function randomQuestion(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

function displayQuestion() {
    clearTimeout();
    questionDisplay.innerHTML = "";
    answersDisplay.innerHTML = "";

    var set = randomQuestion(data);
    correctAnswer = set.correctAnswer;

    var questionDiv = document.createElement("h2");
    questionDiv.innerText = set.question;
    questionDisplay.appendChild(questionDiv);

    for (var i = 0; i < set.answers.length; i++) {
        var answerDiv = document.createElement("div");
        answerDiv.setAttribute("data-answer", set.answers[i]);
        answerDiv.setAttribute("class", "answer");
        answerDiv.innerText = set.answers[i];
        answerDiv.addEventListener("click", selectedAnswer);
        answersDisplay.appendChild(answerDiv);
    }
};

function selectedAnswer(event) {
    var answers = document.getElementsByClassName("answer");

    for (var j = 0; j < answers.length; j++) {
        answers[j].removeEventListener("click", selectedAnswer);
    }

    if (event.target.dataset.answer === correctAnswer) {
        event.target.classList.add("correct");
        currentScore = currentScore + 5;
        currentScoreDisplay.innerHTML = currentScore;
        questionTimeout = setTimeout(displayQuestion, 3000);
    } else {
        event.target.classList.add("incorrect");
        currentScore = currentScore - 3;
        currentScoreDisplay.innerHTML = currentScore;
        questionTimeout = setTimeout(displayQuestion, 3000);
    }
};

if (highScore === null ) {
    highScore = 0;
};

highScoreDisplay.innerHTML = highScore;
currentScoreDisplay.innerHTML = currentScore;

startButton.addEventListener("click", function() {
    timerInt = 60;
    currentScore = 0;
    currentScoreDisplay.innerHTML = currentScore;
    highScoreDisplay.innerHTML = highScore;
    displayQuestion();
    timerDisplay.innerHTML = timerInt;
    startButton.style.display = "none";
    var timer = setInterval(function() {
        timerInt--;
        timerDisplay.innerHTML = timerInt;
        if (timerInt === 0) {
            questionDisplay.innerHTML = "<h2>GAME OVER!</h2>";
            answersDisplay.innerHTML = "";
            startButton.style.display = "block";
            clearInterval(timer);
            clearTimeout(questionTimeout);
            if (currentScore > highScore) {
                highScore = currentScore;
                highScoreDisplay.innerHTML = highScore;
                localStorage.setItem("high-score", currentScore);
            }
        }
    }, 1000);
});