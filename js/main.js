const app = (function (){
    let questions = [];
    let questionObtained;
    let btnStart;
    let gameContainer;
    let questionsContainer;
    let msgResult;
    let btnNext;
    let btnSend;
    let statisticsContainer;
    let playerTime;
    let playerCorrectNumber;
    let playerIncorrectNumber;
    let seconds;
    let timer;
    let score;
    let playerTimeTotal= 0;
    let numberOfCorrects = 0;
    let numberOfIncorrects = 0;
    let inputValueOfAnswer;
    let correctAnswerId;

    const startApp = () => {
        seconds = 0;
        timer = null;
        score = 0;
        btnStart = document.getElementById('btn-start');
        btnStart.addEventListener('click', onStartGame);
        gameContainer = document.getElementById('game__container');
        // gameContainer.classList.add('hide');
        questionsContainer = document.querySelector('.trivial');
        msgResult = document.getElementById('msg-result');
        btnNext = document.getElementById('btn-next');
        btnNext.disabled = true;
        btnNext.addEventListener('click', goToNextQuestion);
        btnSend = document.getElementById('btn-send');
        btnSend.disabled = true;
        btnSend.addEventListener('click', recapGame);
        statisticsContainer = document.getElementById('statistics_container');
        statisticsContainer.classList.add('hide');
        playerTime = document.getElementById('player-time');
        playerCorrectNumber = document.getElementById('player-correct');
        playerIncorrectNumber = document.getElementById('player-incorrect');
        document.form__container.addEventListener('click', handleEventsOfRadios);

        getQuestions(function (data) {
            questions = data;            
        });
        gameUInotShowed();        
    };

    const onStartGame = () => {
        showGameInterface();
        startTimer();
    };

    const showGameInterface = () => {
        paintQuestions(giveQuestionObtained());
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

    //Darle Vuelta
    const getQuestionRamdon = () => {
        const randomPosition = Math.floor(Math.random()* questions.length);
        let questionToGet = questions[randomPosition];
        removeVisitedQuestion(randomPosition);
        return questionToGet;
    };

    //Darle vuelta
    const giveQuestionObtained = () => {
        questionObtained = getQuestionRamdon();
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
                    <input id="item-${i}" name="answers" type="radio" required value="${answersOfQuestionObtained[i].id}" >${answersOfQuestionObtained[i].text}
                </li>`;
            listOfAnswersContainer += itemListDefinition;
        
        }
        document.getElementById('answers-list').innerHTML = listOfAnswersContainer;
    
    };

    const changeUIWhenNoMoreQuestions = () => {
        questionsContainer.classList.add('hide');
        btnNext.classList.add('hide');
        btnSend.disabled = false;
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
        }
        else {
            btnNext.disabled = true;
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

    const gameUInotShowed = () => {
        gameContainer.classList.remove('show');
        gameContainer.classList.add('hide');
    };

    const recapGame = () => {
        showStatistics();
        resetQuestions();
        gameUInotShowed();
    };

    return {
        getQuestionRamdon: getQuestionRamdon,
        paintQuestions: paintQuestions,
        getInputValueAndCompare: getValuesToCompare,
        startApp       
    };
});


