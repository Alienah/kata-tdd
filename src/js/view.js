export default function createGameView () {

    const introContainer = document.getElementById('explanation-container');
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
        introContainer = document.getElementById('explanation-container');
        btnStart = document.getElementById('btn-start');
        btnHide = document.getElementById('btn-hide');
    }

    function showIntroductionInfo() {
        introContainer.classList.remove('hide');
        introContainer.classList.add('show');
        btnHide.classList.remove('hide');
        btnHide.classList.add('show');
    };

    function hideIntroductionInfo() {
        introContainer.classList.remove('show');
        introContainer.classList.add('hide');
        btnHide.classList.add('hide');
        btnStart.disabled = true;
        btnStart.classList.add('btn--disabled');
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
        let recordsPanel = records.map(player => {
            return (
                `<tr class="records__table--player">
                <td class="player__name">${player.name}</td>
                <td class="player__score">${player.score}</td>
            </tr>`);

        });
        recordTable.innerHTML += recordsPanel;
    };

    function paintDataOfPlayer(name, score) {
        let newPlayerRecord = `<tr class="records__table--player">
                <td class="player__name">${name}</td>
                <td class="player__score">${score} puntos</td>
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