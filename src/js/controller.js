export default function createController(client, view, store) {
    let questions = [];
    let questionObtained;
    let seconds;
    let timer;
    let timerContainer;
    let score;
    let playerTimeTotal = 0;
    let numberOfCorrects = 0;
    let numberOfIncorrects = 0;
    let inputValueOfAnswer;
    let correctAnswerId;

function startApp() {
    seconds = 0;
    timer = null;
    score = 0;
    timerContainer = document.getElementById('timer-container');
    
    subscribeButtonsToEvents();
    view.updateUItoInitial();
    saveQuestions();
    updateStore()
    view.renderRecords(store.records);
};

function subscribeButtonsToEvents (){
    const linkToIntro = document.querySelector('.link-to-explanation');
    linkToIntro.addEventListener('click', view.showIntroductionInfo);

    const btnHide = document.getElementById('btn-hide');
    btnHide.addEventListener('click', view.hideIntroductionInfo);

    const btnStart = document.getElementById('btn-start');
    btnStart.addEventListener('click', onStartGame);

    const btnNext = document.getElementById('btn-next');
    btnNext.addEventListener('click', goToNextQuestion);

    const btnSend = document.getElementById('btn-send');
    btnSend.addEventListener('click', recapGame);

    const btnStop = document.getElementById('btn-stop');
    btnStop.addEventListener('click', stopGame);

    document.form__container.addEventListener('click', handleEventsOfRadios);
}

function saveQuestions() {
    client.getQuestions().then((data) => { questions = data })
}

function updateStore() {
    store.records = client.getRecords();
}

function onStartGame() {
    updateStore();
    view.hideContainersOnStart();
    showGameInterface();
    startTimer();
};

function showGameInterface() {
    view.hideIntroductionInfo();
    view.updateUIOnStart();
    view.paintQuestions(getQuestionRamdon());
};

function getQuestionRamdon() {
    const randomPosition = Math.floor(Math.random() * questions.length);
    questionObtained = questions[randomPosition];
    removeVisitedQuestion(randomPosition);

    return questionObtained;
};

function removeVisitedQuestion(randomPosition) {
    questions.splice(randomPosition, 1);
};

function isAnswerCorrect(answerCorrect, answerOfUser) {
    return (answerCorrect == answerOfUser);
};

function getValuesToCompare(target) {
    inputValueOfAnswer = view.getAnswerOfPlayer(target);
    correctAnswerId = questionObtained.correctAnswerId;
};

function getResultOfComparation() {
    if (isAnswerCorrect(inputValueOfAnswer, correctAnswerId)) {
        view.showMsgWhenIsCorrect();
        sumToTotalCorrectAnswersOfPlayer();
        showScore(recalculateScoreWhenIsCorrect);
    } else {
        view.showMsgWhenIsIncorrect();
        sumToTotalIncorrectAnswersOfPlayer();
        showScore(recalculateScoreWhenIsIncorrect);
    }
};

function showScoreWhenNoAnswer() {
    showScore(recalculateScoreWhenNoAnswer);
};

function preventNextQuestion(targetRadio) {
    if (targetRadio.checked) {
        view.enableBtnNext();
    }
    else {
        view.disableBtnNext();
    }
};

function handleEventsOfRadios(event) {
    const target = event.target;
    getValuesToCompare(target);
    preventNextQuestion(target);
};

function sumToTotalCorrectAnswersOfPlayer() {
    numberOfCorrects = numberOfCorrects + 1;
};

function sumToTotalIncorrectAnswersOfPlayer() {
    numberOfIncorrects = numberOfIncorrects + 1;
};

//Recalcular marcador
function recalculateScoreWhenIsCorrect(score, seconds) {
    if (seconds <= 2) {
        return score + 2;
    }
    if (seconds <= 10) {
        return score + 1;
    }
    if (seconds > 10) {
        return score;
    }
};

function recalculateScoreWhenIsIncorrect(score, seconds) {
    if (seconds > 10) {
        return score - 2;
    }
    if (seconds <= 10) {
        return score - 1;
    }
};

function recalculateScoreWhenNoAnswer(score) {
    return score - 3;
};

function showScore(myRecalculateFunction) {
    score = myRecalculateFunction(score, seconds);
    return console.log(`La puntuación es ${score}`);
};

//Funciones de temporizador
function startTimer() {
    if (!timer) {
        timer = setInterval(function () { updateTimer(onNextQuestion); }, 1000);
    }
};

function updateTimer(onTimeOut) {
    seconds++;
    timerContainer.innerHTML = seconds;
    console.log(seconds);
    if (seconds > 20) {
        onTimeOut();
        resetAnswerTimer();
    }
};

function onNextQuestion() {
    updateUI();
    updateScore();
};

function updateUI() {
    if (questions.length > 0) {
        showGameInterface();
    } else {
        view.changeUIWhenNoMoreQuestions();
        gameOver();
    }
    view.disableBtnNext();
    console.log(`Tiempo transcurrido ${seconds} segundos`);
    playerTimeTotal = playerTimeTotal + seconds;
};

function updateScore() {
    showScoreWhenNoAnswer();
};

function doBeforeNextQuestion() {
    getResultOfComparation();
    updateUI();
    resetAnswerTimer();
};

function goToNextQuestion() {
    doBeforeNextQuestion();
};

function stopTimer() {
    if (timer) {
        clearInterval(timer);
    }
    timer = null;
    resetAnswerTimer();
};

function gameOver() {
    stopTimer();
};

function resetAnswerTimer() {
    seconds = 0;
};

function manageDataOfPlayer() {
    let playerName = view.getNameOfPlayer();
    let playerData = {
        name: playerName,
        score: `${score} puntos`
    };
    store.records.push(playerData);

    client.saveDataOfPlayerInStorage();
    view.paintDataOfPlayer(playerName, score);
};

function resetQuestions() {
    saveQuestions();
};

function getTimeAverage() {
    return playerTimeTotal / 4;
};

function resetStatistics() {
    playerTimeTotal = 0;
    numberOfCorrects = 0;
    numberOfIncorrects = 0;
};

function recapGame() {
    view.showStatistics(getTimeAverage(), numberOfCorrects, numberOfIncorrects);
    resetQuestions();
    manageDataOfPlayer();
    view.updateUItoInitial();
    resetStatistics();
};

function stopGame() {
    view.updateUItoInitial();
    stopTimer();
    resetQuestions();
};

return {
    getQuestionRamdon: getQuestionRamdon,
    getInputValueAndCompare: getValuesToCompare,
    startApp
};
};