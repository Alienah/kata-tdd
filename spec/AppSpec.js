/* TO DO - list
*
*   velocidad de respuesta, acierto o fallo,
*
*       Si no hay preguntas.
*
*       Si acierto pregunta en menos de 2 segundos - sumo 2 puntos
*           (0 puntos, correcta, 1 segundo) -> 2 puntos
*           (2 puntos, correcta, 0 segundo) -> 4 puntos 
*    
*       Si acierto pregunta entre 2 y 10 segundos - sumo 1 punto
*           (1 punto, correcta, 8 segundos) -> 2 puntos
*
*       Si acierto y tardo mas de 10 segundos - 0 puntos
*           (0 punto, correcta, 11 segundos) -> 0 puntos
*
*       No se puede pasar sin responder
*           (!(''))
*
*       Si en 20 segundos no has respondido , pasa a siguiente pregunta y pierdes 3 punto
*           (4 punto, '', 20 segundos) -> 1 puntos
*
*       Si fallo pregunta en mas de 10 segundos - resto 2 puntos
*           (6, fallo, 11 segundos) -> 4 puntos
*
*       Si fallo antes de 10 segundos - resto 1 punto
*           (0, fallo, 9 segundos) -> -1 puntos
*
* */
/*
*      Condiciones para generar preguntas:

    Si contesta, genera automáticamente otra pregunta
        Si hace click en respuesta, borra la pregunta y se genera una nueva
    Si no contesta, a los 20 segundos se genera otra pregunta
        Se guarda la pregunta no contestada para el final?
        Se borra?
*
*
*
*/

describe('comprobador de respuestas', function() {
    function checkAnswer(question, answer){
        return question.correct===parseInt(answer);
    }
    var questionTest = {
        question : '¿Capital de Honduras?',
        answers : [
            'Tegucigalpa',
            'Tokio',
            'Madrid'
        ],
        correct: 0
    };
   
  it('comprobar si ha acertado', function(){
    expect(checkAnswer(questionTest, 0)).toBeTruthy();
  }); 
});

describe('comprobador de respuestas', function() {
    /* comprobamos que la respuesta correcta sea de tipo number;
        que respuestas sea de tipo array y que no este vacío, 
        que pregunta sea string */

        function checkObject(question){
            return typeof question.correct === 'number' && question.answers instanceof Array && typeof question.question === 'string' && question.answers.length === 3;       
        }
        var questionTestTwo = {
            question : '¿Capital de Honduras?',
            answers : [
                'Tegucigalpa',
                'Madrid',
                'Lima'
            ],
            correct: 0
        };
  it('comprobar el formato del objeto pregunta', function(){
    expect(checkObject(questionTestTwo)).toBeTruthy();
  }); 
});

describe('calculo de marcador', function(){
    // funcion true
    // funcion false
    function recalculateWhenNoAnswer(score, seconds){
        if (seconds === ''){
            return score - 2;
        }
        if (seconds > 20){
            return score - 3;
        }
    }

    function recalculateScoreWhenIsCorrect(score, seconds){
        if (seconds <= 2){
            return score + 2;
        }
        if (seconds >= 2 && seconds < 10){
            return ++score;
        }
        if (seconds > 10){
            return score;
        }
    }

    function recalculateScoreWhenIsIncorrect(score, seconds){
        if (seconds > 10){
            return score - 2;
        }
        if (seconds <= 10){
            return score - 1;
        }
    }

    it("suma mas puntos si acierta muy rapido en menos de 2 segundos", function(){
        expect(recalculateScoreWhenIsCorrect(0, 1)).toBe(2);
    });

    it("suma 1 punto si acierta entre 2 y 10 segundos", function(){
        expect(recalculateScoreWhenIsCorrect(3, 3)).toBe(4);
    });

    it("suma 0 puntos si acierta en más de 10 segundos", function(){
        expect(recalculateScoreWhenIsCorrect(10, 15)).toBe(10);
    });

    // it("Si no se responde no se puede seguir", function(){
    //     expect(recalcularNoContesta(0)).toBe(-2);
    // });

    it("Si en 20 segundos no has respondido, pasa a siguiente pregunta", function(){
        expect(recalculateWhenNoAnswer(3, 21)).toBe(0);
    }); 

    it("Si fallas en mas de 10 segundos pierdes puntos", function(){
        expect(recalculateScoreWhenIsIncorrect(3, 21)).toBe(1);
    });

    it("Si fallas en menos de 10 segundos pierdes puntos", function(){
        expect(recalculateScoreWhenIsIncorrect(0, 9)).toBe(-1);
    });
});