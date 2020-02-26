var questionDisplay = document.getElementById("question");
var answersDisplay = document.getElementById("answers");
var correctDisplay = document.getElementById("correct-answer");

function randomQuestion(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function displayQuestion() {
    var { question, answers, correctAnswer } = randomQuestion(data);

    var questionDiv = document.createElement("h2");
    questionDiv.innerText = question;
    questionDisplay.appendChild(questionDiv);

    for (var i = 0; i < answers.length; i++) {
        var answerDiv = document.createElement("div");
        answerDiv.setAttribute("id", answers[i]);
        answerDiv.innerText = answers[i];
        answersDisplay.appendChild(answerDiv);
    }
}

displayQuestion();