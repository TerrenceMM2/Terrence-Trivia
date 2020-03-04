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
var highScoreButton = document.getElementById("hs-button");
var usernameInput = document.getElementById("username");
var topNamesList = document.getElementById("top-names");
var topScoresList = document.getElementById("top-scores");

var timerInt;
var timer;
var questionTimeout;
// var highScores = localStorage.getItem("high-scores");

var highScores = [
    {
        username: "Terrence",
        highScore: 10
    },
    {
        username: "Helene",
        highScore: 5
    },
    {
        username: "Alfie",
        highScore: 25
    },
    {
        username: "Hunter",
        highScore: 13
    },
    {
        username: "Kody",
        highScore: 2
    },
    {
        username: "Ev",
        highScore: 15
    },
    {
        username: "Kent",
        highScore: 40
    },
    {
        username: "Brittany",
        highScore: 32
    },
    {
        username: "Pete",
        highScore: 18
    },
    {
        username: "Alec",
        highScore: 50
    }
]
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
        currentScore += 5;
        currentScoreDisplay.innerHTML = currentScore;
        questionTimeout = setTimeout(displayQuestion, 2000);
    } else {
        event.target.setAttribute("id", "incorrect");
        currentScore -= 3;
        currentScoreDisplay.innerHTML = currentScore;
        questionTimeout = setTimeout(displayQuestion, 2000);
    }
};

function newHighScore(event) {
    event.preventDefault();
    var newUser = usernameInput.value;
    var newUserObj = {
        username: newUser,
        highScore: currentScore
    }

    highScores.push(newUserObj);
    sortHighScores();
    topNamesList.innerHTML = "";
    topScoresList.innerHTML = "";
    displayHighScores();

    console.log(highScores)
    // localStorage.setItem("high-scores", highScores);
    
    usernameInput.value = "";
}

function sortHighScores() {
    highScores.sort((a, b) => (a.highScore < b.highScore) ? 1 : -1);
    if (highScores.length === 11) {
        highScores.pop();
    }
}

function displayHighScores() {
    sortHighScores();
    highScores.forEach(score => {
        var scoreName = document.createElement("p");
        var scoreNumber = document.createElement("p");
        scoreName.textContent = score.username 
        scoreNumber.textContent = score.highScore;
        topNamesList.appendChild(scoreName);
        topScoresList.appendChild(scoreNumber);
    })
}

function displayGameOver() {
    gameOver.style.display = "block";
}


// Sets/Displays high score
if (highScores === null ) {
    highScores = [];
};

currentScoreDisplay.innerHTML = currentScore;

highScoreButton.addEventListener("click", newHighScore);

startButton.addEventListener("click", function() {
    
    // Sets/Resets starting game variables
    questions = loadQuestions();
    timerInt = 5;
    currentScore = 0;

    // Displays score
    currentScoreDisplay.innerHTML = currentScore;

    // Sets questions and displays/hide other elements
    displayQuestion();
    timerSpan.style.visibility = "initial";
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
            // startButton.style.display = "block";
            // gameOver.style.display = "block";
            timerSpan.style.visibility = "hidden";

            // Clears game timer and question interval
            clearInterval(timer);
            clearTimeout(questionTimeout);

            // Stores high score
            highScoreDisplay.style.display = "block";
            displayHighScores();
        }
    }, 1000);
});