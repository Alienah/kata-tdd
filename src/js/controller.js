import createClient from "./client.js";
import createView from "./view.js";
import store from "./store.js"

export default function createController() {
    let questions = [];
    let questionObtained;
    let linkToIntro;
    let btnStart;
    let btnNext;
    let btnSend;
    let btnStop;
    let statisticsContainer;
    let playerTime;
    let playerCorrectNumber;
    let playerIncorrectNumber;
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
    // createView().prepareDOM()

    seconds = 0;
    timer = null;
    score = 0;
    linkToIntro = document.querySelector('.link-to-explanation');
    linkToIntro.addEventListener('click', createView().showIntroductionInfo);
    const btnHide = document.getElementById('btn-hide');
    btnHide.addEventListener('click', createView().hideIntroductionInfo);
    btnStart = document.getElementById('btn-start');
    btnStart.addEventListener('click', onStartGame);
    timerContainer = document.getElementById('timer-container');
    btnNext = document.getElementById('btn-next');
    btnNext.disabled = true;
    btnNext.classList.add('btn--disabled');
    btnNext.addEventListener('click', goToNextQuestion);
    btnSend = document.getElementById('btn-send');
    btnSend.disabled = true;
    btnSend.classList.add('btn--disabled');
    btnSend.addEventListener('click', recapGame);
    btnStop = document.getElementById('btn-stop');
    btnStop.addEventListener('click', stopGame);
    statisticsContainer = document.getElementById('statistics_container');
    statisticsContainer.classList.add('hide');
    playerTime = document.getElementById('player-time');
    playerCorrectNumber = document.getElementById('player-correct');
    playerIncorrectNumber = document.getElementById('player-incorrect');
    document.form__container.addEventListener('click', handleEventsOfRadios);
    createView().updateUItoInitial();

    saveQuestions();
    updateStore()
    createView().renderRecords(store.records);
};

function saveQuestions() {
    createClient().getQuestions().then((data) => { questions = data })
}

function updateStore() {
    store.records = createClient().getRecords();
    console.log(store);
}

function onStartGame() {
    updateStore();
    hideStatistics();
    showGameInterface();
    startTimer();
};

function showGameInterface() {
    createView().hideIntroductionInfo();
    createView().paintQuestions(getQuestionRamdon());
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
    inputValueOfAnswer = createView().getAnswerOfPlayer(target);
    correctAnswerId = questionObtained.correctAnswerId;
};

function getResultOfComparation() {
    if (isAnswerCorrect(inputValueOfAnswer, correctAnswerId)) {
        createView().showMsgWhenIsCorrect();
        sumToTotalCorrectAnswersOfPlayer();
        showScore(recalculateScoreWhenIsCorrect);
    } else {
        createView().showMsgWhenIsIncorrect();
        sumToTotalIncorrectAnswersOfPlayer();
        showScore(recalculateScoreWhenIsIncorrect);
    }
};

function showScoreWhenNoAnswer() {
    showScore(recalculateScoreWhenNoAnswer);
};

function preventNextQuestion(targetRadio) {
    if (targetRadio.checked) {
        btnNext.disabled = false;
        btnNext.classList.remove('btn--disabled');
    }
    else {
        btnNext.disabled = true;
        btnNext.classList.add('btn--disabled');
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
        createView().changeUIWhenNoMoreQuestions();
        gameOver();
    }
    btnNext.disabled = true;
    btnNext.classList.add('btn--disabled');
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

// function saveDataOfPlayerInStorage() {
//     localStorage.setItem('recordsData', JSON.stringify(store.records));
// };

function manageDataOfPlayer() {
    let playerName = createView().getNameOfPlayer();
    let playerData = {
        name: playerName,
        score: `${score} puntos`
    };
    store.records.push(playerData);

    createClient().saveDataOfPlayerInStorage();
    createView().paintDataOfPlayer(playerName, score);
};

function resetQuestions() {
    saveQuestions();
};

function getTimeAverage() {
    return playerTimeTotal / 4;
};

function showStatistics() {
    statisticsContainer.classList.remove('hide');
    statisticsContainer.classList.add('show');
    playerTime.innerHTML = getTimeAverage();
    playerCorrectNumber.innerHTML = numberOfCorrects;
    playerIncorrectNumber.innerHTML = numberOfIncorrects;
};

function resetStatistics() {
    playerTimeTotal = 0;
    numberOfCorrects = 0;
    numberOfIncorrects = 0;
};

function hideStatistics() {
    statisticsContainer.classList.remove('show');
    statisticsContainer.classList.add('hide');
};

function recapGame() {
    showStatistics();
    resetQuestions();
    manageDataOfPlayer();
    createView().updateUItoInitial();
    resetStatistics();
};

function stopGame() {
    createView().updateUItoInitial();
    stopTimer();
    resetQuestions();
};

return {
    getQuestionRamdon: getQuestionRamdon,
    getInputValueAndCompare: getValuesToCompare,
    startApp
};
};