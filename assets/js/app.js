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
var rankingList = document.getElementById("ranking");
var topNamesList = document.getElementById("top-names");
var topScoresList = document.getElementById("top-scores");
var form = document.getElementById("form");

var timerInt;
var timer;
var questionTimeout;
var highScoreTimeout;
var highScores = JSON.parse(localStorage.getItem("high-scores"));
var currentScore = 0;
var correctAnswer = "";
var questions = loadQuestions();

// Randomizes questions and removes from array to prevent duplicate question
function randomQuestion(arr) {
    var index = Math.floor(Math.random() * arr.length)
    var randQuestion = arr[index];
    // Removes question from array
    questions.splice(index, 1)
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

    // Creates new user object
    var newUser = usernameInput.value.toUpperCase();
    var newUserObj = {
        username: newUser,
        highScore: currentScore
    }

    // Push new objects and sorts new array
    highScores.push(newUserObj);
    sortHighScores();

    // Resets and displays high score view
    topNamesList.innerHTML = "";
    topScoresList.innerHTML = "";
    rankingList.innerHTML = "";
    displayHighScores();

    // Stores high scores in local storage
    localStorage.setItem("high-scores", JSON.stringify(highScores));
    
    // Clears input
    usernameInput.value = "";

    // Automatically displays "Game Over" and start button after submission
    highScoreTimeout = setInterval(displayGameOver, 5000)
}

function sortHighScores() {
    highScores.sort((a, b) => (a.highScore <= b.highScore) ? 1 : -1);
    // Keeps top 10 scores
    if (highScores.length === 11) {
        highScores.pop();
    }
}

function displayHighScores() {
    // Resets, sorts scores, and displays each score
    rankingList.innerHTML = ""
    topNamesList.innerHTML = "";
    topScoresList.innerHTML = "";
    sortHighScores();
    highScores.forEach(displayEachScore)
}

function displayEachScore(item, index) {
    // Dynamically creates and displays data
    var rank = document.createElement("p");
    var scoreName = document.createElement("p");
    var scoreNumber = document.createElement("p");
    
    rank.textContent = (index + 1) + ".";
    scoreName.textContent = item.username 
    scoreNumber.textContent = item.highScore;
    
    rankingList.appendChild(rank);
    topNamesList.appendChild(scoreName);
    topScoresList.appendChild(scoreNumber); 
}

function displayGameOver() {
    highScoreDisplay.style.display = "none";
    gameOver.style.display = "block";
    startButton.style.display = "block";
}

// Sets/Displays high score
if (highScores != null) {
    highScores = JSON.parse(localStorage.getItem("high-scores"));
} else {
    highScores = loadDefaultScores();
}

highScoreButton.addEventListener("click", newHighScore);

startButton.addEventListener("click", function() {

    clearTimeout(highScoreTimeout);
    
    // Sets/Resets starting game variables
    questions = loadQuestions();
    timerInt = 60;
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
            timerSpan.style.visibility = "hidden";

            // Clears game timer and question interval
            clearInterval(timer);
            clearTimeout(questionTimeout);

            // Stores high score
            if (currentScore <= highScores[9].highScore) {
                highScoreDisplay.style.display = "block";
                displayHighScores();
                form.style.visibility = "hidden";
                highScoreTimeout = setInterval(displayGameOver, 5000)
            } else {
                highScoreDisplay.style.display = "block";
                displayHighScores();
            }
        }
    }, 1000);
});