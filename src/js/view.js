export default function createGameView () {

    const introContainer = document.getElementById('intro-container');
    const explanationContainer = document.getElementById('explanation-container');
    const btnStart = document.getElementById('btn-start');
    const btnHide = document.getElementById('btn-hide');
    let gameContainer;
    gameContainer = document.getElementById('game__container');
    const questionsContainer = document.querySelector('.questions__container');
    const btnNext = document.getElementById('btn-next');
    const msgResult = document.getElementById('msg-result');
    let playerNameInput;
    playerNameInput = document.getElementById('player-name');
    const btnSend = document.getElementById('btn-send');
    let recordTable;
    recordTable = document.querySelector('.record__table');
    // let btnHide;
    // let btnStart;

    function prepareDOM () {
        explanationContainer = document.getElementById('explanation-container');
        btnStart = document.getElementById('btn-start');
        btnHide = document.getElementById('btn-hide');
    }

    function showIntroductionInfo() {
        explanationContainer.classList.remove('hide');
        introContainer.classList.remove('intro__container--minim');
        explanationContainer.classList.add('show');
        btnHide.classList.remove('hide');
        btnHide.classList.add('show');
    };

    function hideIntroductionInfo() {
        explanationContainer.classList.remove('show');
        explanationContainer.classList.add('hide');
        introContainer.classList.add('intro__container--minim');
        btnHide.classList.add('hide');
        btnHide.classList.remove('show');
    };

    function paintQuestions(questionObtained) {
        gameContainer.classList.add('show');
        questionsContainer.classList.remove('hide');
        btnNext.classList.remove('hide');
        const titleOfQuestionObtained = questionObtained.question.text;
        const answersOfQuestionObtained = questionObtained.answers;
        const idOfQuestionObtained = questionObtained.question.id;
        let listOfAnswersContainer = '';

        document.getElementById('question__title').innerHTML = titleOfQuestionObtained;
        for (var i = 0; i < answersOfQuestionObtained.length; i++) {
            var itemListDefinition =
                `<li>
                    <input id="item-${i}" class="answer" name="answers" type="radio" required value="${answersOfQuestionObtained[i].id}" >${answersOfQuestionObtained[i].text}
                </li>`;
            listOfAnswersContainer += itemListDefinition;

        }
        document.getElementById('answers-list').innerHTML = listOfAnswersContainer;

    };

    //Mensajes que se mostrarán en la interfaz
    function showMsgWhenIsCorrect() {
        msgResult.classList.remove('msg--incorrect');
        msgResult.classList.add('msg--correct');
        msgResult.innerHTML = 'Correcto!';
    };

    function showMsgWhenIsIncorrect() {
        msgResult.classList.remove('msg--correct');
        msgResult.classList.add('msg--incorrect');
        msgResult.innerHTML = 'Incorrecto :(';
    };

    function updateUItoInitial() {
        btnStart.disabled = false;
        btnStart.classList.remove('btn--disabled');
        gameContainer.classList.remove('show');
        gameContainer.classList.add('hide');
        playerNameInput.value = '';
        playerNameInput.classList.remove('show');
        playerNameInput.classList.add('hide');
        btnSend.disabled = true;
        btnSend.classList.add('btn--disabled');
    };

    function changeUIWhenNoMoreQuestions() {
        questionsContainer.classList.add('hide');
        btnNext.classList.add('hide');
        playerNameInput.classList.remove('hide');
        playerNameInput.classList.add('show');
        btnSend.disabled = false;
        btnSend.classList.remove('btn--disabled');
    };

    function getNameOfPlayer() {
        return playerNameInput.value;
    }

    function getAnswerOfPlayer(target) {
        return target.value
    }

    function renderRecords(records) {
        for (let index = 0; index < records.length; index++) {
            const itemFromRecords = `
                <tr class="records__table--player" >
                    <td class="player__cell">${records[index].name}</td>
                    <td class="player__cell">${records[index].score}</td>
                </tr >`;
            recordTable.insertAdjacentHTML('afterbegin', itemFromRecords)
        }
    };

    function paintDataOfPlayer(name, score) {
        let newPlayerRecord = `<tr class="records__table--player">
                <td class="player__cell">${name}</td>
                <td class="player__cell">${score} puntos</td>
            </tr>`;
        recordTable.insertAdjacentHTML('afterbegin', newPlayerRecord);
    };

    return ({
        prepareDOM,
        showIntroductionInfo,
        hideIntroductionInfo,
        paintQuestions,
        showMsgWhenIsCorrect,
        updateUItoInitial,
        showMsgWhenIsIncorrect,
        changeUIWhenNoMoreQuestions,
        getNameOfPlayer,
        getAnswerOfPlayer,
        renderRecords,
        paintDataOfPlayer
    })
}