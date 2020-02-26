var questionDisplay = document.getElementById("question");
var answersDisplay = document.getElementById("answers");
var highScoreDisplay = document.getElementById("high-score");
var timerDisplay = document.getElementById("timer");
var startButton = document.getElementById("start-button");

var timer = 60;
var highScore;
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
        setTimeout(displayQuestion, 1000);
    } else {
        event.target.setAttribute("style", "color: red");
        setTimeout(displayQuestion, 1000);
    }
};

if (localStorage.getItem("high-score")) {
    highScore = localStorage.getItem("high-score");
} else {
    highScore = 0;
}

highScoreDisplay.innerHTML = highScore;

startButton.addEventListener("click", function() {
    timerDisplay.innerHTML = timer;
    startButton.style.display = "none";
    setInterval(function() {
        timer--;
        timerDisplay.innerHTML = timer;
    }, 1000)
});

answersDisplay.addEventListener("click", selectedAnswer);

displayQuestion();