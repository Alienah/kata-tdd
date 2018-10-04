export default function createGameView() {

    const introContainer = document.getElementById('intro-container');
    const explanationContainer = document.getElementById('explanation-container');
    const btnStart = document.getElementById('btn-start');
    const btnHide = document.getElementById('btn-hide');
    const gameContainer = document.getElementById('game__container');
    const questionsContainer = document.querySelector('.questions__container');
    const btnNext = document.getElementById('btn-next');
    const msgResult = document.getElementById('msg-result');
    const playerNameInput = document.getElementById('player-name');
    const btnSend = document.getElementById('btn-send');
    const scoreContainer = document.getElementById('score-container');
    const recordTable = document.querySelector('.record__table');
    const statisticsContainer = document.getElementById('statistics_container');

    function show(element) {
        element.classList.remove('hide');
        element.classList.add('show');
    }

    function hide(element) {
        element.classList.remove('show');
        element.classList.add('hide');
    }

    function addClass(element, classInString) {
        element.classList.add(classInString)
    }

    function removeClass(element, classInString) {
        element.classList.remove(classInString)
    }

    function enable(element) {
        element.disabled = false;
        element.classList.remove('btn--disabled');
    }

    function enableBtnNext() {
        enable(btnNext);
    }

    function disableBtnNext() {
        disable(btnNext);
    }

    function disable(element) {
        element.disabled = true;
        element.classList.add('btn--disabled');
    }

    function showIntroductionInfo() {
        show(explanationContainer);
        removeClass(introContainer, 'intro__container--minim');
        hide(scoreContainer);
        show(btnHide);
    };

    function hideIntroductionInfo() {
        hide(explanationContainer);
        addClass(introContainer, 'intro__container--minim');
        show(scoreContainer);
        hide(btnHide);
    };

    function updateUIOnStart() {
        show(scoreContainer);
        disable(btnStart);
        show(gameContainer);
        show(questionsContainer);
        show(btnNext);
    }

    //Mensajes que se mostrarán en la interfaz
    function showMsgWhenIsCorrect() {
        msgResult.classList.remove('msg--incorrect');
        msgResult.classList.add('msg--correct');
        msgResult.innerHTML = 'Correcto!';
        show(msgResult);
    };

    function showMsgWhenIsIncorrect() {
        msgResult.classList.remove('msg--correct');
        msgResult.classList.add('msg--incorrect');
        msgResult.innerHTML = 'Incorrecto :(';
        show(msgResult);
    };

    function showStatistics(timeAverage, numberOfCorrects, numberOfIncorrects) {
        const playerTime = document.getElementById('player-time');
        playerTime.innerHTML = timeAverage;
        const playerCorrectNumber = document.getElementById('player-correct');
        playerCorrectNumber.innerHTML = numberOfCorrects;
        const playerIncorrectNumber = document.getElementById('player-incorrect'); 
        playerIncorrectNumber.innerHTML = numberOfIncorrects;        
        show(statisticsContainer);
    };

    function hideContainersOnStart() {
        hide(statisticsContainer);
        hide(msgResult);
    };

    function changeUIWhenNoMoreQuestions() {
        hide(questionsContainer);
        hide(btnNext);
        show(playerNameInput);
        enable(btnSend);
    };

    function updateUItoInitial() {
        enable(btnStart);
        hide(gameContainer);
        playerNameInput.value = '';
        hide(playerNameInput);
        disable(btnSend);
    };

    function getNameOfPlayer() {
        return playerNameInput.value;
    }

    function getAnswerOfPlayer(target) {
        return target.value
    }

    function paintQuestions(questionObtained) {
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
        showIntroductionInfo,
        hideIntroductionInfo,
        updateUIOnStart,
        paintQuestions,
        showMsgWhenIsCorrect,
        updateUItoInitial,
        showMsgWhenIsIncorrect,
        enableBtnNext,
        disableBtnNext,
        changeUIWhenNoMoreQuestions,
        showStatistics,
        hideContainersOnStart,
        getNameOfPlayer,
        getAnswerOfPlayer,
        renderRecords,
        paintDataOfPlayer
    })
}