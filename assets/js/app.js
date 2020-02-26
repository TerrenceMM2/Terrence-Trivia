var questionDisplay = document.getElementById("question");
var answersDisplay = document.getElementById("answers");
var correctDisplay = document.getElementById("correct-answer");
var correctAnswer = "";

function randomQuestion(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function displayQuestion() {
    var set = randomQuestion(data);
    correctAnswer = set.correctAnswer;

    var questionDiv = document.createElement("h2");
    questionDiv.innerText = set.question;
    questionDisplay.appendChild(questionDiv);

    for (var i = 0; i < set.answers.length; i++) {
        var answerDiv = document.createElement("div");
        answerDiv.setAttribute("data-answer", set.answers[i]);
        answerDiv.innerText = set.answers[i];
        answersDisplay.appendChild(answerDiv);
    }
}

function selectedAnswer(event) {
    if (event.target.dataset.answer === correctAnswer) {
        event.target.setAttribute("style", "color: green");
    } else {
        event.target.setAttribute("style", "color: red");
    }
}

document.addEventListener("click", selectedAnswer);

displayQuestion();