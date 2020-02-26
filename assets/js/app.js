var questionDisplay = document.getElementById("question");
var answersDisplay = document.getElementById("answers");
var highScoreDisplay = document.getElementById("high-score");
var currentScoreDisplay = document.getElementById("current-score");
var timerDisplay = document.getElementById("timer");
var startButton = document.getElementById("start-button");

var timerInt = 5;
var timer;
var highScore;
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
        answersDisplay.appendChild(answerDiv);
    }
};

function selectedAnswer(event) {
    if (event.target.dataset.answer === correctAnswer) {
        event.target.setAttribute("style", "color: green");
        currentScore = currentScore + 5;
        currentScoreDisplay.innerHTML = currentScore;
        setTimeout(displayQuestion, 1000);
    } else {
        event.target.setAttribute("style", "color: red");
        currentScore = currentScore - 3;
        currentScoreDisplay.innerHTML = currentScore;
        setTimeout(displayQuestion, 1000);
    }
};

if (localStorage.getItem("high-score")) {
    highScore = localStorage.getItem("high-score");
} else {
    highScore = 0;
}

highScoreDisplay.innerHTML = highScore;
currentScoreDisplay.innerHTML = currentScore;

startButton.addEventListener("click", function() {
    timerDisplay.innerHTML = timerInt;
    startButton.style.display = "none";
    timer = setInterval(function() {
        timerInt--;
        timerDisplay.innerHTML = timerInt;
        if (timerInt === 0) {
            questionDisplay.innerHTML = "<h1>GAME OVER!</h1>";
            clearInterval(timer);
        }
    }, 1000)
});

answersDisplay.addEventListener("click", selectedAnswer);

displayQuestion();