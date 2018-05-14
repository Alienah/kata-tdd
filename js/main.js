const app = (function (){
    let records;
    let questions = [];
    let questionObtained;
    let linkToIntro;
    let introContainer;
    let btnHide;
    let btnStart;
    let gameContainer;
    let questionsContainer;
    let msgResult;
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
    let playerNameInput;
    let recordTable;
    let playerTimeTotal= 0;
    let numberOfCorrects = 0;
    let numberOfIncorrects = 0;
    let inputValueOfAnswer;
    let correctAnswerId;

    const startApp = () => {
        seconds = 0;
        timer = null;
        score = 0;
        linkToIntro = document.querySelector('.link-to-explanation');
        linkToIntro.addEventListener('click', showIntroductionInfo);
        introContainer = document.getElementById('explanation-container');
        btnHide = document.getElementById('btn-hide');
        btnHide.addEventListener('click', hideIntroductionInfo);
        btnStart = document.getElementById('btn-start');
        btnStart.addEventListener('click', onStartGame);
        gameContainer = document.getElementById('game__container');
        timerContainer = document.getElementById('timer-container');
        questionsContainer = document.querySelector('.questions__container');
        msgResult = document.getElementById('msg-result');
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
        playerNameInput = document.getElementById('player-name');
        recordTable = document.querySelector('.record__table');
        playerTime = document.getElementById('player-time');
        playerCorrectNumber = document.getElementById('player-correct');
        playerIncorrectNumber = document.getElementById('player-incorrect');
        document.form__container.addEventListener('click', handleEventsOfRadios);
        updateUItoInitial();

        getQuestions(function (data) {
            questions = data;            
        });
                 
        records = localStorage.getItem('recordsData') ? JSON.parse(localStorage.getItem('recordsData')) : [];

        showScoreRecords();        
    };

    const onStartGame = () => {
        records = localStorage.getItem('recordsData') ? JSON.parse(localStorage.getItem('recordsData')) : [];
        hideStatistics();
        showGameInterface();
        startTimer();
    };

    const hideIntroductionInfo = () => {
        introContainer.classList.remove('show');
        introContainer.classList.add('hide');
        btnHide.classList.add('hide');
        btnStart.disabled = true;
        btnStart.classList.add('btn--disabled');
    };

    const showIntroductionInfo = () => {
        introContainer.classList.remove('hide');
        introContainer.classList.add('show');
        btnHide.classList.remove('hide');
        btnHide.classList.add('show');
    };

    const showGameInterface = () => {
        hideIntroductionInfo();
        paintQuestions(getQuestionRamdon());
    };
    
    const showScoreRecords = () => {
        let recordsPanel = records.map(player =>{
            return(
            `<tr class="records__table--player">
                <td class="player__name">${player.name}</td>
                <td class="player__score">${player.score}</td>
            </tr>`);
          
        });
        recordTable.innerHTML += recordsPanel;
    };
 
    const getQuestions = callback => {
        const serverData = [
            {
                question: 
                    { 
                        id: 1, text: '¿Capital de Honduras?' 
                    },
                answers: [
                            { 
                                id: 1, text: 'Tegucigalpa' 
                            }, 
                            { 
                                id: 2, text: 'Lima' 
                            }, 
                            { 
                                id: 3, text: 'Buenos Aires' 
                            }
                        ],
                correctAnswerId: 1
            },
            {
                question: 
                    {
                    id: 2, text: 'Rio que pasa por Toledo' 
                    },
                answers: [
                            { 
                                id: 4, text: 'Miño' 
                            }, 
                            { 
                                id: 5, text: 'Tajo' 
                            }, 
                            { 
                                id: 6, text: 'Duero' 
                            }
                        ],
                correctAnswerId: 5
            },
            {
                question: 
                    { 
                        id: 3, text: 'Color Bandera de Argentina' 
                    },
                answers: [
                            { 
                                id: 7, text: 'Rojo Blanco' 
                            }, 
                            { 
                                id: 8, text: 'Blanco y Verde' 
                            }, 
                            {
                                id: 9, text: 'Azul Blanco Azul' 
                                }
                        ],
                correctAnswerId: 9
            },
            {
                question: 
                    { 
                        id: 3, text: '¿Quién pintó la capilla sixtina?' 
                    },
                answers: [
                            { 
                                id: 7, text: 'Picasso' 
                            }, 
                            { 
                                id: 8, text: 'Velazquez' 
                            }, 
                            {
                                id: 9, text: 'Miguel Angel' 
                                }
                        ],
                correctAnswerId: 9
            },
        ];
        callback(serverData);
    };

    const getQuestionRamdon = () => {
        const randomPosition = Math.floor(Math.random() * questions.length);
        questionObtained = questions[randomPosition];
        removeVisitedQuestion(randomPosition);

        return questionObtained;
    };

    const removeVisitedQuestion = (randomPosition) => {
        questions.splice(randomPosition, 1);
    };

    const paintQuestions = (questionObtained) => {
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

    const changeUIWhenNoMoreQuestions = () => {
        questionsContainer.classList.add('hide');
        btnNext.classList.add('hide');
        playerNameInput.classList.remove('hide');
        playerNameInput.classList.add('show');
        btnSend.disabled = false;
        btnSend.classList.remove('btn--disabled');
    };

    const isAnswerCorrect = (answerCorrect, answerOfUser) => {
        return (answerCorrect == answerOfUser);     
    };

    const getValuesToCompare = (target) => {    
        inputValueOfAnswer = target.value;
        correctAnswerId = questionObtained.correctAnswerId;
    };

    const getResultOfComparation = () => {
        if(isAnswerCorrect(inputValueOfAnswer, correctAnswerId)) {
            showMsgWhenIsCorrect();
            sumToTotalCorrectAnswersOfPlayer();
            showScore(recalculateScoreWhenIsCorrect);
        } else {
            showMsgWhenIsIncorrect();
            sumToTotalIncorrectAnswersOfPlayer();
            showScore(recalculateScoreWhenIsIncorrect);            
        }      
    };

    const showScoreWhenNoAnswer = () => {
        showScore(recalculateScoreWhenNoAnswer);
    };

    const preventNextQuestion = (targetRadio) => {
        if (targetRadio.checked) {
            btnNext.disabled = false;
            btnNext.classList.remove('btn--disabled');
        }
        else {
            btnNext.disabled = true;
            btnNext.classList.add('btn--disabled');
        }
    };

    const handleEventsOfRadios = (event) => {
        const target = event.target;
        getValuesToCompare(target);
        preventNextQuestion(target);
    };

    //Mensajes que se mostrarán en la interfaz
    const showMsgWhenIsCorrect = () => {
        msgResult.classList.remove('msg--incorrect');
        msgResult.classList.add('msg--correct');
        msgResult.innerHTML = 'Correcto!';
    };     

    const showMsgWhenIsIncorrect = () => {
        msgResult.classList.remove('msg--correct');
        msgResult.classList.add('msg--incorrect');
        msgResult.innerHTML = 'Incorrecto :(';
    }; 

    const sumToTotalCorrectAnswersOfPlayer = () => {
        numberOfCorrects = numberOfCorrects + 1;
    };

    const sumToTotalIncorrectAnswersOfPlayer = () => {
        numberOfIncorrects = numberOfIncorrects + 1;
    };

    //Recalcular marcador
    const recalculateScoreWhenIsCorrect = (score, seconds) => {
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

    const recalculateScoreWhenIsIncorrect = (score, seconds) => {
        if (seconds > 10) {
            return score - 2;
        }
        if (seconds <= 10) {
            return score - 1;
        }
    };

    const recalculateScoreWhenNoAnswer = (score) => {
        return score - 3;
    };

    const showScore = (myRecalculateFunction) => {
        score = myRecalculateFunction(score, seconds);
        return console.log(`La puntuación es ${score}`);
    };

    //Funciones de temporizador
    const startTimer = () => {
        if (!timer) {
            timer = setInterval(function () {updateTimer(onNextQuestion);}, 1000);
        }
    };

    const updateTimer = (onTimeOut) => {
        seconds++;
        timerContainer.innerHTML = seconds;
        console.log(seconds);            
            if (seconds > 20) {
                onTimeOut();                
                resetAnswerTimer();
            }       
    };

    const onNextQuestion = () => {
        updateUI();
        updateScore();   
    };

    const updateUI = () => {
        if (questions.length > 0) {
            showGameInterface();
        } else {
            changeUIWhenNoMoreQuestions();
            gameOver();
        }
        btnNext.disabled = true;
        btnNext.classList.add('btn--disabled');
        console.log(`Tiempo transcurrido ${seconds} segundos`);
        playerTimeTotal = playerTimeTotal + seconds;
    };

    const updateScore = () => {
        showScoreWhenNoAnswer();
    };

    const doBeforeNextQuestion = () => {
        getResultOfComparation();
        updateUI();
        resetAnswerTimer();
    };

    const goToNextQuestion = () => {
        doBeforeNextQuestion();
    };

    const stopTimer = () => {
        if (timer) {
            clearInterval(timer);        
        }
        timer = null;
        resetAnswerTimer();
    };

    const gameOver = () => {
        stopTimer();
    };

    const resetAnswerTimer = () => {
        seconds = 0;
    };

    const paintDataOfPlayer = (name, score) => {
        let newPlayerRecord = `<tr class="records__table--player">
                <td class="player__name">${name}</td>
                <td class="player__score">${score} puntos</td>
            </tr>`;
        recordTable.insertAdjacentHTML('afterbegin', newPlayerRecord);
    };

    const saveDataOfPlayerInStorage = () => {
        localStorage.setItem('recordsData', JSON.stringify(records));
    };

    const manageDataOfPlayer = () => {
        let playerName = playerNameInput.value;
        let playerData = {
            name: playerName,
            score: `${score} puntos`
        };
        records.push(playerData);

        saveDataOfPlayerInStorage();
        paintDataOfPlayer(playerName, score);
    };
 
    const resetQuestions = () => {
        getQuestions(function (data) {
            questions = data;
        });
    };

    const getTimeAverage = () => {
        return playerTimeTotal / 4 ;
    };

    const showStatistics = () => {
        statisticsContainer.classList.remove('hide');
        statisticsContainer.classList.add('show');
        playerTime.innerHTML = getTimeAverage();
        playerCorrectNumber.innerHTML = numberOfCorrects;
        playerIncorrectNumber.innerHTML = numberOfIncorrects;
    };

    const resetStatistics = () => {
        playerTimeTotal = 0;
        numberOfCorrects = 0;
        numberOfIncorrects = 0;
    };

    const hideStatistics = () => {
        statisticsContainer.classList.remove('show');
        statisticsContainer.classList.add('hide');
    };

    const updateUItoInitial = () => {
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

    const recapGame = () => {
        showStatistics();
        resetQuestions();
        manageDataOfPlayer();     
        updateUItoInitial();
        resetStatistics();
    };

    const stopGame = () => {
        updateUItoInitial();
        stopTimer();
        resetQuestions();
    };

    return {
        getQuestionRamdon: getQuestionRamdon,
        paintQuestions: paintQuestions,
        getInputValueAndCompare: getValuesToCompare,
        startApp       
    };
});


